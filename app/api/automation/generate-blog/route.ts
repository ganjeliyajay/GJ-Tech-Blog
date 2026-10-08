import { NextRequest, NextResponse } from "next/server";

import {
    createSanityDraft,
    generateEnglishBlog,
    translateBlog,
} from "@/lib/blog-automation";

import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
        return NextResponse.json(
            { success: false, error: "Unauthorized." },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();
        const topic = typeof body?.topic === "string" ? body.topic.trim() : "";

        if (!topic) {
            return NextResponse.json(
                { success: false, error: "Topic is required." },
                { status: 400 }
            );
        }

        const translationId = crypto.randomUUID();
        const englishBlog = await generateEnglishBlog(topic);
        const gujaratiBlog = await translateBlog(englishBlog, "gu");
        const hindiBlog = await translateBlog(englishBlog, "hi");

        const baseSlug = englishBlog.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

        const englishSlug = baseSlug;
        const gujaratiSlug = `${baseSlug}-gu`;
        const hindiSlug = `${baseSlug}-hi`;

        if (!englishSlug) {
            throw new Error("Could not generate a valid English slug.");
        }

        const englishDraft = await createSanityDraft(
            englishBlog,
            "en",
            translationId,
            englishSlug
        );

        const gujaratiDraft = await createSanityDraft(
            gujaratiBlog,
            "gu",
            translationId,
            gujaratiSlug
        );

        const hindiDraft = await createSanityDraft(
            hindiBlog,
            "hi",
            translationId,
            hindiSlug
        );

        return NextResponse.json(
            {
                success: true,
                message: "English, Gujarati and Hindi blogs generated successfully and saved as Sanity drafts.",
                data: {
                    topic,
                    translationId,
                    slugs: {
                        english: englishSlug,
                        gujarati: gujaratiSlug,
                        hindi: hindiSlug,
                    },
                    blogs: {
                        english: {
                            id: englishDraft.draftId,
                            title: englishBlog.title,
                            language: "en",
                            slug: englishSlug,
                        },
                        gujarati: {
                            id: gujaratiDraft.draftId,
                            title: gujaratiBlog.title,
                            language: "gu",
                            slug: gujaratiSlug,
                        },
                        hindi: {
                            id: hindiDraft.draftId,
                            title: hindiBlog.title,
                            language: "hi",
                            slug: hindiSlug,
                        },
                    },
                },
            },
            { status: 200 }
        );
    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "Failed to generate localized blogs.";

        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}

export async function GET() {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
        return NextResponse.json(
            { success: false, error: "Unauthorized." },
            { status: 401 }
        );
    }

    return NextResponse.json(
        {
            success: true,
            message: "Blog automation API is running.",
            endpoint: "/api/automation/generate-blog",
            method: "POST",
            example: {
                topic: "React Server Components Explained for Beginners",
            },
            flow: [
                "Generate English blog",
                "Translate to Gujarati",
                "Translate to Hindi",
                "Create 3 Sanity drafts",
                "Review drafts in Sanity Studio",
                "Manually publish",
            ],
        },
        { status: 200 }
    );
}         