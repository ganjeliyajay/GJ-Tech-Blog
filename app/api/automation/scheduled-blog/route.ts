import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

import {
  createSanityDraft,
  generateEnglishBlog,
  translateBlog,
} from "@/lib/blog-automation";
import { adminClient } from "@/lib/sanity-admin";

export const runtime = "nodejs";
export const maxDuration = 300;

const topicQuery = `*[
  _type == "blogAutomationTopic" &&
  status == "pending"
] | order(createdAt asc)[0] {
  _id,
  _rev,
  topic,
  translationId
}`;

function createSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;

  return Boolean(
    secret &&
      request.headers.get("authorization") === `Bearer ${secret}`
  );
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  let topicDocument: {
    _id: string;
    _rev: string;
    topic: string;
    translationId?: string;
  } | null = null;

  let claimed = false;
  let translationId = "";

  try {
    topicDocument = await adminClient.fetch(topicQuery);

    if (!topicDocument) {
      return NextResponse.json({
        success: true,
        message: "No pending topics in the queue.",
      });
    }

    translationId = topicDocument.translationId ?? randomUUID();

    try {
      await adminClient
        .patch(topicDocument._id)
        .ifRevisionId(topicDocument._rev)
        .set({
          status: "processing",
          translationId,
          error: "",
        })
        .commit();

      claimed = true;
    } catch {
      return NextResponse.json({
        success: true,
        message: "Topic was claimed by another request or has changed.",
      });
    }

    const englishBlog = await generateEnglishBlog(topicDocument.topic);
    const gujaratiBlog = await translateBlog(englishBlog, "gu");
    const hindiBlog = await translateBlog(englishBlog, "hi");

    const slug = createSlug(englishBlog.title);

    if (!slug) {
      throw new Error("Could not generate a valid blog slug.");
    }

    const drafts = await Promise.all([
      createSanityDraft(englishBlog, "en", translationId, slug),
      createSanityDraft(gujaratiBlog, "gu", translationId, slug),
      createSanityDraft(hindiBlog, "hi", translationId, slug),
    ]);

    await adminClient
      .patch(topicDocument._id)
      .set({
        status: "completed",
        processedAt: new Date().toISOString(),
        translationId,
        error: "",
      })
      .commit();

    return NextResponse.json({
      success: true,
      message: "Blog drafts generated successfully.",
      topic: topicDocument.topic,
      drafts,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Blog generation failed.";

    if (topicDocument && claimed) {
      try {
        await adminClient
          .patch(topicDocument._id)
          .set({
            status: "failed",
            processedAt: new Date().toISOString(),
            error: message.slice(0, 2000),
          })
          .commit();
      } catch {
        // Preserve the original generation failure.
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Scheduled blog generation failed.",
        error: message,
      },
      { status: 500 }
    );
  }
}