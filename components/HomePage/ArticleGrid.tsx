'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';

import ArticleCard from './ArticleCard';
import ArticleCardSkeleton from './ArticleCardSkeleton';
import { Article } from '@/types/blog';

interface ArticleGridProps {
  posts: Article[];
  selectedCategory?: string;
  loading?: boolean;
}

export default function ArticleGrid({
  posts,
  selectedCategory = 'All',
  loading = false,
}: ArticleGridProps) {
  return (
    <section
      id="articles"
      className="py-12 sm:py-16 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            LATEST PUBLICATIONS
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
            Latest Articles
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Fresh ideas, practical tutorials and lessons from the world of software development.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
          </div>
        ) : posts.length === 0 ? (

          /* Empty State */
          <div className="py-20 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
            <BookOpen className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-600 mb-3" />

            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              No articles found in &ldquo;{selectedCategory}&rdquo;
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Select &ldquo;All&rdquo; or explore other technology categories.
            </p>
          </div>

        ) : (

          /* Articles */
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {posts.map((post, index) => (
                <ArticleCard
                  key={post.id}
                  article={post}
                  index={index}
                />
              ))}
            </div>
          </AnimatePresence>

        )}
      </div>
    </section>
  );
}