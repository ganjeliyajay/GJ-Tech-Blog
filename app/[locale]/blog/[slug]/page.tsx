import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { client } from "@/lib/sanity";

import {
  postBySlugQuery,
  postsQuery,
} from "@/lib/queries";

import BlogDetailView from "@/components/BlogDetails/BlogDetailView";
import Newsletter from "@/components/HomePage/Newsletter";

import {
  defaultLocale,
  isValidLocale,
  type Locale,
} from "@/lib/i18n/config";

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* =========================================================
   METADATA
   ========================================================= */

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale: localeParam } =
    await params;

  const locale: Locale = isValidLocale(
    localeParam
  )
    ? localeParam
    : defaultLocale;

  const article = await client.fetch(
    postBySlugQuery,
    {
      slug,
      locale,
    },
    {
      cache: "no-store",
    }
  );

  if (!article) {
    return {
      title: "Article Not Found — GJ Tech",
    };
  }

  return {
    title: `${article.title} — GJ Tech`,

    description:
      article.excerpt ||
      "Practical engineering guide on GJ Tech.",

    keywords: article.tags || [],

    authors: article.author?.name
      ? [
          {
            name: article.author.name,
          },
        ]
      : undefined,

    alternates: {
      canonical: `/${locale}/blog/${slug}`,
    },

    openGraph: {
      title: article.title,

      description:
        article.excerpt ||
        "Practical engineering guide on GJ Tech.",

      type: "article",

      publishedTime: article.date,

      locale,

      images: article.image
        ? [
            {
              url: article.image,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",

      title: article.title,

      description:
        article.excerpt ||
        "Practical engineering guide on GJ Tech.",

      images: article.image
        ? [article.image]
        : undefined,
    },
  };
}

/* =========================================================
   BLOG POST PAGE
   ========================================================= */

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const {
    slug,
    locale: localeParam,
  } = await params;

  const locale: Locale = isValidLocale(
    localeParam
  )
    ? localeParam
    : defaultLocale;

  const [article, articles] =
    await Promise.all([
      client.fetch(
        postBySlugQuery,
        {
          slug,
          locale,
        },
        {
          cache: "no-store",
        }
      ),

      client.fetch(
        postsQuery,
        {
          locale,
        },
        {
          cache: "no-store",
        }
      ),
    ]);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#080c14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <main className="flex-1">
        <BlogDetailView
          article={article}
          articles={articles}
        />

        <Newsletter />
      </main>
    </div>
  );
}