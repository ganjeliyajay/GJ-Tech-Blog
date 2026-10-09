import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function isValidEmail(email: string) {
  return (
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

export async function POST(request: Request) {
  const supabase = getSupabase();

  if (!supabase) {
    return NextResponse.json(
      {
        success: false,
        message: "Newsletter service is temporarily unavailable.",
      },
      { status: 503 }
    );
  }

  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("email" in body) ||
      typeof body.email !== "string"
    ) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const email = body.email.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { data: existing, error: lookupError } = await supabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", email)
      .maybeSingle();

    if (lookupError) {
      return NextResponse.json(
        { success: false, message: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    if (existing?.status === "active") {
      return NextResponse.json({
        success: true,
        alreadySubscribed: true,
        message: "You're already subscribed to the newsletter.",
      });
    }

    if (existing) {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .update({
          status: "active",
          subscribed_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      if (error) {
        return NextResponse.json(
          { success: false, message: "Unable to subscribe. Please try again." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        alreadySubscribed: false,
        message: "Welcome back! You're subscribed again.",
      });
    }

    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email,
        status: "active",
        subscribed_at: new Date().toISOString(),
      });

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json({
          success: true,
          alreadySubscribed: true,
          message: "You're already subscribed to the newsletter.",
        });
      }

      return NextResponse.json(
        { success: false, message: "Unable to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      alreadySubscribed: false,
      message: "You're subscribed! Thanks for joining.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 400 }
    );
  }
}