
import { NextRequest, NextResponse } from "next/server";

import { adminClient } from "@/lib/sanity-admin";
import { isAdminAuthenticated } from "@/lib/admin-auth";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function PATCH(
    request: NextRequest,
    context: RouteContext
) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const { id } = await context.params;
        const body = await request.json();

        const existing = await adminClient.fetch(
            `*[_type == "blogAutomationTopic" && _id == $id][0]{
                _id, status
            }`,
            { id }
        );

        if (!existing) {
            return NextResponse.json(
                { success: false, error: "Topic not found." },
                { status: 404 }
            );
        }

        if (body?.action !== "retry" || existing.status !== "failed") {
            return NextResponse.json(
                {
                    success: false,
                    error: "Only failed topics can be retried.",
                },
                { status: 400 }
            );
        }

        const topic = await adminClient
            .patch(id)
            .set({ status: "pending" })
            .unset(["error", "processedAt"])
            .commit();

        return NextResponse.json({ success: true, topic });
    } catch {
        return NextResponse.json(
            { success: false, error: "Failed to update topic." },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: NextRequest,
    context: RouteContext
) {
    if (!(await isAdminAuthenticated())) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const { id } = await context.params;

        const existing = await adminClient.fetch(
            `*[_type == "blogAutomationTopic" && _id == $id][0]{
                _id, status
            }`,
            { id }
        );

        if (!existing) {
            return NextResponse.json(
                { success: false, error: "Topic not found." },
                { status: 404 }
            );
        }

        if (
            existing.status !== "pending" &&
            existing.status !== "failed"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Only pending or failed topics can be deleted.",
                },
                { status: 409 }
            );
        }

        await adminClient.delete(id);

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { success: false, error: "Failed to delete topic." },
            { status: 500 }
        );
    }
}
