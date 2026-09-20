import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.",
  );
}

if (!dataset) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_DATASET environment variable.",
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-09-19",
  useCdn: false,
});