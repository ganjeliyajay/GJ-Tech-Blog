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

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),

  title: {
    default: 'GJ Tech — Developer Blog',
    template: '%s | GJ Tech',
  },

  description:
    'GJ Tech is a developer publication featuring practical tutorials, insights, and guides on React, Next.js, JavaScript, TypeScript, Node.js, AI, APIs, and modern web development.',

  keywords: [
    'GJ Tech',
    'developer blog',
    'web development',
    'JavaScript',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'AI',
    'MERN',
    'frontend development',
    'backend development',
    'software development',
    'programming tutorials',
  ],

  authors: [
    {
      name: 'GJ Tech',
    },
  ],

  creator: 'GJ Tech',
  publisher: 'GJ Tech',

  applicationName: 'GJ Tech',

  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://your-domain.com',
    siteName: 'GJ Tech',
    title: 'GJ Tech — Developer Blog',
    description:
      'Practical insights, tutorials, and ideas for developers building the modern web.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'GJ Tech — Developer Blog',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'GJ Tech — Developer Blog',
    description:
      'Practical insights, tutorials, and ideas for modern web developers.',
    images: ['/opengraph-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  category: 'technology',
};
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

