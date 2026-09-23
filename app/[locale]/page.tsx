import Hero from "@/components/HomePage/Hero";
import TechStackStrip from "@/components/HomePage/TechStackStrip";
import FeaturedArticle from "@/components/HomePage/FeaturedArticle";
import TrendingArticles from "@/components/HomePage/TrendingArticles";
import DeveloperTopicsSection from "@/components/HomePage/DeveloperTopicsSection";
import AuthorSection from "@/components/BlogDetails/AuthorSection";
import Newsletter from "@/components/HomePage/Newsletter";
import CategorySection from "@/components/HomePage/CategorySection";

import { client } from "@/lib/sanity";

import {
  authorQuery,
  featuredArticleQuery,
  postsQuery,
} from "@/lib/queries";

import { getTopicsFromPosts } from "@/lib/topics";

import {
  isValidLocale,
  defaultLocale,
  type Locale,
} from "@/lib/i18n/config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HomePage({
  params,
}: HomePageProps) {
  const { locale: localeParam } = await params;

  const locale: Locale = isValidLocale(
    localeParam
  )
    ? localeParam
    : defaultLocale;

  const [featuredArticle, posts, author] =
    await Promise.all([
      client.fetch(
        featuredArticleQuery,
        {
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

      client.fetch(
        authorQuery,
        {},
        {
          cache: "no-store",
        }
      ),
    ]);

  const topics = getTopicsFromPosts(posts);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#080c14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <main className="flex-1">
        <Hero />

        <TechStackStrip />

        <FeaturedArticle
          featuredArticle={featuredArticle}
        />

        <CategorySection
          posts={posts}
        />

        <TrendingArticles
          article={posts}
        />

        <DeveloperTopicsSection
          topics={topics}
        />

        <AuthorSection
          author={author}
        />

        <Newsletter />
      </main>
    </div>
  );
}