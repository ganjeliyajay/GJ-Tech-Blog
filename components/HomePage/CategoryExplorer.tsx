'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles } from 'lucide-react';

import { CategoryFilter, Article } from '@/types/blog';

interface CategoryExplorerProps {
  posts: Article[];
  selectedCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
}

export default function CategoryExplorer({
  posts,
  selectedCategory,
  onSelectCategory,
}: CategoryExplorerProps) {
  /*
   * Build categories dynamically from Sanity posts
   */
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        posts
          .map((post) => post.category)
          .filter(
            (category): category is Article['category'] =>
              typeof category === 'string' && category.trim().length > 0
          )
      )
    );

    return uniqueCategories.sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const allCategories: CategoryFilter[] = [
    'All',
    ...categories,
  ] as CategoryFilter[];

  /*
   * Dynamic article count
   */
  const getArticleCount = (category: CategoryFilter) => {
    if (category === 'All') {
      return posts.length;
    }

    return posts.filter(
      (post) => post.category === category
    ).length;
  };

  const selectedCount = getArticleCount(selectedCategory);

  return (
    <section id="categories" className="py-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Layers className="w-4 h-4" />
              </span>

              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400">
                DISCOVER CONTENT
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
              Explore by Technology
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />

            <span>Active: </span>

            <strong className="text-cyan-600 dark:text-cyan-400 font-bold">
              {selectedCategory} · {selectedCount} Article
              {selectedCount === 1 ? '' : 's'}
            </strong>
          </div>
        </div>

        {/* Scrollable Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 no-scrollbar">
          {allCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = getArticleCount(cat);

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono whitespace-nowrap transition-colors duration-200 flex items-center gap-2 shrink-0 border ${isSelected
                    ? 'text-slate-950 font-bold border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-slate-400 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 z-0"
                    transition={{
                      type: 'spring',
                      bounce: 0.2,
                      duration: 0.5,
                    }}
                  />
                )}

                <span className="relative z-10">
                  {cat}
                </span>

                <span
                  className={`relative z-10 px-1.5 py-0.5 rounded-md text-[10px] font-bold ${isSelected
                      ? 'bg-slate-950/20 text-slate-950'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}