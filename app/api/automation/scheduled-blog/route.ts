
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

const STALE_AFTER_MS = 15 * 60 * 1000;

const topicQuery = `*[
  _type == "blogAutomationTopic" &&
  (
    (
      status == "pending" &&
      (
        !defined(scheduledAt) ||
        scheduledAt <= $now
      )
    ) ||
    (
      status == "processing" &&
      processingAt < $staleBefore
    )
  )
] | order(coalesce(scheduledAt, createdAt) asc)[0] {
  _id,
  _rev,
  topic,
  scheduledAt,
  translationId,
  status,
  processingAt
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

function jsonError(message: string, status: number) {
  return NextResponse.json(
    { success: false, message },
    { status }
  );
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return jsonError("Unauthorized", 401);
  }

  const startedAt = Date.now();
  const now = new Date();
  const staleBefore = new Date(
    now.getTime() - STALE_AFTER_MS
  ).toISOString();

  let topicDocument: {
    _id: string;
    _rev: string;
    topic: string;
    scheduledAt?: string;
    translationId?: string;
    status: string;
    processingAt?: string;
  } | null = null;

  let claimed = false;
  let translationId = "";

  try {
    topicDocument = await adminClient.fetch(topicQuery, {
      now: now.toISOString(),
      staleBefore,
    });

    if (!topicDocument) {
      return NextResponse.json({
        success: true,
        message: "No due topics found.",
      });
    }

    translationId =
      topicDocument.translationId ?? randomUUID();

    // Optimistic locking: only one request can claim
    // this exact revision successfully.
    try {
      await adminClient
        .patch(topicDocument._id)
        .ifRevisionId(topicDocument._rev)
        .set({
          status: "processing",
          processingAt: now.toISOString(),
          translationId,
          error: "",
        })
        .commit();

      claimed = true;
    } catch {
      return NextResponse.json({
        success: true,
        message: "Topic changed or was claimed by another request.",
      });
    }

    console.info("[scheduled-blog] Claimed topic", {
      topicId: topicDocument._id,
      topic: topicDocument.topic,
    });

    const englishBlog = await generateEnglishBlog(
      topicDocument.topic
    );

    const slug = createSlug(englishBlog.title);

    if (!slug) {
      throw new Error("Could not generate a valid blog slug.");
    }

    // Keep the three language drafts linked together.
    // Each function must finish within the remaining function time.
    const remainingMs = () =>
      285_000 - (Date.now() - startedAt);

    if (remainingMs() < 30_000) {
      throw new Error(
        "Insufficient time remaining to safely continue blog generation."
      );
    }

    const gujaratiBlog = await translateBlog(
      englishBlog,
      "gu"
    );

    if (remainingMs() < 20_000) {
      throw new Error(
        "Insufficient time remaining before Hindi translation."
      );
    }

    const hindiBlog = await translateBlog(
      englishBlog,
      "hi"
    );

    if (remainingMs() < 15_000) {
      throw new Error(
        "Insufficient time remaining to create all drafts."
      );
    }

    const drafts = await Promise.all([
      createSanityDraft(
        englishBlog,
        "en",
        translationId,
        slug
      ),
      createSanityDraft(
        gujaratiBlog,
        "gu",
        translationId,
        slug
      ),
      createSanityDraft(
        hindiBlog,
        "hi",
        translationId,
        slug
      ),
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

    console.info("[scheduled-blog] Completed topic", {
      topicId: topicDocument._id,
      durationMs: Date.now() - startedAt,
    });

    return NextResponse.json({
      success: true,
      message: "Blog drafts generated successfully.",
      topic: topicDocument.topic,
      translationId,
      drafts,
      durationMs: Date.now() - startedAt,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Blog generation failed.";

    console.error("[scheduled-blog] Failed", {
      topicId: topicDocument?._id,
      error: message,
      durationMs: Date.now() - startedAt,
    });

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
      } catch (statusError) {
        console.error(
          "[scheduled-blog] Could not update failure status",
          statusError
        );
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
