import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import { searchPostsQuery } from "@/lib/queries";

interface RawPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags?: string[];
  readingTime?: string;
  date?: string;
  image?: string;
  sections?: Array<{
    title?: string;
    content?: string[];
  }>;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").trim().toLowerCase();
    const category = (searchParams.get("category") || "All").trim();

    const posts: RawPost[] = await client.fetch(searchPostsQuery);

    if (!posts || !Array.isArray(posts)) {
      return NextResponse.json({ success: true, posts: [] });
    }

    const filtered = posts.filter((post: RawPost) => {
      const matchCategory = category === "All" || post.category === category;
      if (!matchCategory) return false;

      if (!q) return true;

      const titleMatch = post.title?.toLowerCase().includes(q);
      const excerptMatch = post.excerpt?.toLowerCase().includes(q);
      const categoryMatch = post.category?.toLowerCase().includes(q);
      const tagMatch = post.tags?.some((t: string) => t.toLowerCase().includes(q));
      const sectionMatch = post.sections?.some(
        (s) =>
          s.title?.toLowerCase().includes(q) ||
          s.content?.some((p: string) => p.toLowerCase().includes(q))
      );

      return titleMatch || excerptMatch || categoryMatch || tagMatch || sectionMatch;
    });

    return NextResponse.json({
      success: true,
      posts: filtered,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to search articles.",
        posts: [],
      },
      { status: 500 }
    );
  }
}
