import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

export async function POST(request: Request) {
    try {
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

        const body = await request.json();
        const email = body.email?.trim().toLowerCase();

        // Validate email
        if (!email) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email is required.",
                },
                { status: 400 }
            );
        }

        if (email.length > 254) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email address is too long.",
                },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please enter a valid email address.",
                },
                { status: 400 }
            );
        }

        // Check existing subscriber
        const { data: existingSubscriber, error: existingError } =
            await supabase
                .from("newsletter_subscribers")
                .select("id, status")
                .eq("email", email)
                .maybeSingle();

        if (existingError) {
            console.error("Check subscriber error:", existingError);

            return NextResponse.json(
                {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
                { status: 500 }
            );
        }

        if (existingSubscriber) {
            if (existingSubscriber.status === "active") {
                return NextResponse.json({
                    success: true,
                    alreadySubscribed: true,
                    message: "You're already subscribed to the newsletter.",
                });
            }

            // Reactivate previously unsubscribed email
            const { error: updateError } = await supabase
                .from("newsletter_subscribers")
                .update({
                    status: "active",
                    subscribed_at: new Date().toISOString(),
                })
                .eq("id", existingSubscriber.id);

            if (updateError) {
                console.error("Reactivate subscriber error:", updateError);

                return NextResponse.json(
                    {
                        success: false,
                        message: "Unable to subscribe. Please try again.",
                    },
                    { status: 500 }
                );
            }

            return NextResponse.json({
                success: true,
                alreadySubscribed: false,
                message: "Welcome back! You're subscribed again.",
            });
        }

        // Create new subscriber
        const { error: insertError } = await supabase
            .from("newsletter_subscribers")
            .insert({
                email,
                status: "active",
            });

        if (insertError) {
            console.error("Newsletter insert error:", insertError);

            return NextResponse.json(
                {
                    success: false,
                    message: "Unable to subscribe. Please try again.",
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            alreadySubscribed: false,
            message: "🎉 You're subscribed! Thanks for joining.",
        });
    } catch (error) {
        console.error("Newsletter API error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong. Please try again.",
            },
            { status: 500 }
        );
    }
}