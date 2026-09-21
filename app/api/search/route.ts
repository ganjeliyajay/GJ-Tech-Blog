import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import { searchPostsQuery } from "@/lib/queries";

interface RawPost {
  id: string;
  slug: string;
  title?: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  readingTime?: string;
  date?: string;
  image?: string;
  sections?: Array<{
    title?: string;
    content?: string[];
  }>;
}

const normalize = (value: unknown) =>
  typeof value === "string" ? value.trim().toLowerCase() : "";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = normalize(searchParams.get("q"));
    const selectedCategory = (
      searchParams.get("category") || "All"
    ).trim();

    const posts: RawPost[] = await client.fetch(searchPostsQuery);

    if (!Array.isArray(posts)) {
      return NextResponse.json({
        success: true,
        results: [],
        posts: [],
        categories: [],
      });
    }

    /*
     * Build unique categories from Sanity data.
     * Empty categories are ignored.
     */
    const categories = Array.from(
      new Set(
        posts
          .map((post) => post.category?.trim())
          .filter((category): category is string => Boolean(category)),
      ),
    ).sort((a, b) => a.localeCompare(b));

    const filteredPosts = posts.filter((post) => {
      /*
       * Category filter
       */
      const postCategory = post.category?.trim() || "";

      const categoryMatches =
        selectedCategory.toLowerCase() === "all" ||
        postCategory.toLowerCase() === selectedCategory.toLowerCase();

      if (!categoryMatches) {
        return false;
      }

      /*
       * Empty search query:
       * return all posts matching the selected category.
       */
      if (!query) {
        return true;
      }

      /*
       * Searchable article content
       */
      const titleMatch = normalize(post.title).includes(query);

      const excerptMatch = normalize(post.excerpt).includes(query);

      const categoryMatch = normalize(post.category).includes(query);

      const tagMatch =
        Array.isArray(post.tags) &&
        post.tags.some((tag) => normalize(tag).includes(query));

      const sectionMatch =
        Array.isArray(post.sections) &&
        post.sections.some((section) => {
          const sectionTitleMatch = normalize(section.title).includes(query);

          const contentMatch =
            Array.isArray(section.content) &&
            section.content.some((paragraph) =>
              normalize(paragraph).includes(query),
            );

          return sectionTitleMatch || contentMatch;
        });

      return (
        titleMatch ||
        excerptMatch ||
        categoryMatch ||
        tagMatch ||
        sectionMatch
      );
    });

    /*
     * Remove duplicate posts safely.
     * Prefer Sanity id, then slug.
     */
    const uniquePosts = Array.from(
      new Map(
        filteredPosts.map((post, index) => {
          const key =
            post.id?.trim() ||
            post.slug?.trim() ||
            `post-${index}`;

          return [key, post] as const;
        }),
      ).values(),
    );

    return NextResponse.json({
      success: true,
      results: uniquePosts,
      posts: uniquePosts,
      categories,
    });
  } catch (error) {
    console.error("Search API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to search articles.",
        results: [],
        posts: [],
        categories: [],
      },
      { status: 500 },
    );
  }
}