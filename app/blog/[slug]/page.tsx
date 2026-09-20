import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { client } from '@/lib/sanity';
import {
  postBySlugQuery,
  postsQuery,
} from '@/lib/queries';
import BlogDetailView from '@/components/BlogDetails/BlogDetailView';
import Newsletter from '@/components/HomePage/Newsletter';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await client.fetch(postBySlugQuery, { slug });

  if (!article) {
    return {
      title: 'Article Not Found — GJ Tech',
    };
  }

  return {
    title: `${article.title} — GJ Tech`,
    description: article.excerpt || 'Practical engineering guide on GJ Tech.',
    keywords: article.tags || [],
    authors: article.author?.name ? [{ name: article.author.name }] : undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      images: article.image ? [{ url: article.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;

  const [article, articles] = await Promise.all([
    client.fetch(postBySlugQuery, { slug }),
    client.fetch(postsQuery),
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