import Hero from '@/components/HomePage/Hero';
import TechStackStrip from '@/components/HomePage/TechStackStrip';
import FeaturedArticle from '@/components/HomePage/FeaturedArticle';
import TrendingArticles from '@/components/HomePage/TrendingArticles';
import DeveloperTopicsSection from '@/components/HomePage/DeveloperTopicsSection';
import AuthorSection from '@/components/BlogDetails/AuthorSection';
import Newsletter from '@/components/HomePage/Newsletter';
import CategorySection from '@/components/HomePage/CategorySection';
import { client } from '@/lib/sanity';
import { authorQuery, featuredArticleQuery, postsQuery } from '@/lib/queries';
import { getTopicsFromPosts } from '@/lib/topics';
export default async function HomePage() {

  const [featuredArticle, posts] = await Promise.all([
    client.fetch(featuredArticleQuery),
    client.fetch(postsQuery),
  ]);

  const author = await client.fetch(authorQuery);

  const topics = getTopicsFromPosts(posts);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#080c14] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Sticky Modern Navbar */}
      <main className="flex-1">

        <Hero />
        <TechStackStrip />

        <FeaturedArticle
          featuredArticle={featuredArticle}
        />

        <CategorySection posts={posts} />

        <TrendingArticles article={posts} />

        <DeveloperTopicsSection topics={topics} />

        <AuthorSection author={author} />

        <Newsletter />
      </main>


    </div>
  );
}

