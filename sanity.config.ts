"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { postType } from "./sanity/schemaTypes/post";
import { authorType } from "./sanity/schemaTypes/author";

export default defineConfig({
  name: "default",
  title: "Blog Studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: "/studio",

  plugins: [
    structureTool(),
  ],

  schema: {
    types: [
      postType,
      authorType,
    ],
  },
});