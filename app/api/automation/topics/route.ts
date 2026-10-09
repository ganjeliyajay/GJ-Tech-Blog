
import { NextRequest, NextResponse } from "next/server";

import { adminClient } from "@/lib/sanity-admin";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const topics = await adminClient.fetch(
            `*[_type == "blogAutomationTopic"] | order(createdAt asc) {
                _id,
                topic,
                status,
                createdAt,
                scheduledAt,
                processedAt,
                translationId,
                error
            }`
        );

        return NextResponse.json({ success: true, topics });
    } catch {
        return NextResponse.json(
            { success: false, error: "Failed to fetch topics." },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();
        const topic = typeof body?.topic === "string" ? body.topic.trim() : "";

        const scheduledAt =
            typeof body?.scheduledAt === "string"
                ? new Date(body.scheduledAt)
                : new Date();

        if (Number.isNaN(scheduledAt.getTime())) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid scheduled date and time.",
                },
                { status: 400 }
            );
        }

        if (topic.length < 3 || topic.length > 200) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Topic must be between 3 and 200 characters.",
                },
                { status: 400 }
            );
        }

        const document = await adminClient.create({
            _type: "blogAutomationTopic",
            topic,
            status: "pending",
            createdAt: new Date().toISOString(),
            scheduledAt: scheduledAt.toISOString(),

        });

        return NextResponse.json(
            { success: true, topic: document },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            { success: false, error: "Failed to add topic." },
            { status: 500 }
        );
    }
}
