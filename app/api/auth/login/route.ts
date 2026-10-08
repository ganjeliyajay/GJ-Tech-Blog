import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const email = typeof body?.email === "string" ? body.email.trim() : "";
        const password = typeof body?.password === "string" ? body.password : "";

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: "Email and password are required." },
                { status: 400 }
            );
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            return NextResponse.json(
                { success: false, error: "Admin authentication is not configured." },
                { status: 500 }
            );
        }

        if (email !== adminEmail || password !== adminPassword) {
            return NextResponse.json(
                { success: false, error: "Invalid email or password." },
                { status: 401 }
            );
        }

        const response = NextResponse.json(
            { success: true, message: "Login successful." },
            { status: 200 }
        );

        response.cookies.set("admin_session", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return response;
    } catch {
        return NextResponse.json(
            { success: false, error: "Invalid request." },
            { status: 400 }
        );
    }
}