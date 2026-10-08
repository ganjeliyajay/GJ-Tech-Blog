import { createClient } from "@sanity/client";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET;

const token =
  process.env.SANITY_API_TOKEN;

if (!projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID"
  );
}

if (!dataset) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_DATASET"
  );
}

if (!token) {
  throw new Error(
    "Missing SANITY_API_TOKEN"
  );
}

export const adminClient =
  createClient({
    projectId,
    dataset,
    apiVersion: "2026-10-08",
    token,
    useCdn: false,
  });