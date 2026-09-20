'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { motion } from 'framer-motion';

import {
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  User,
} from 'lucide-react';

import { Article } from '@/types/blog';

interface ArticleCardProps {
  article: Article;
  variant?: 'featured' | 'standard' | 'highlight';
  index?: number;
}

export default function ArticleCard({
  article,
  variant = 'standard',
  index = 0,
}: ArticleCardProps) {
  const isHighlight = variant === 'highlight' || index === 0;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: (index % 6) * 0.05,
      }}
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 overflow-hidden ${
        isHighlight
          ? 'border-slate-300 dark:border-slate-800 bg-gradient-to-b from-white via-white to-slate-50 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-slate-950/80 shadow-lg hover:border-cyan-500/50 hover:shadow-cyan-500/10'
          : 'border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 hover:border-cyan-500/40 hover:bg-slate-50 dark:hover:bg-slate-900/70 shadow-sm hover:shadow-xl'
      } hover:-translate-y-1.5`}
    >
      {/* ================= IMAGE ================= */}

      <Link href={`/blog/${article?.slug}`} className="block relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">

        {article?.image ? (
          <>
            {/* ================= ACTUAL IMAGE ================= */}

            <Image
              src={article.image}
              alt={article.title || 'Article image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
              className={`object-cover transition-all duration-500 ease-out ${
                imageLoaded
                  ? 'opacity-100'
                  : 'opacity-0'
              } group-hover:scale-[1.04]`}
              onLoad={() => {
                setImageLoaded(true);
              }}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />

            {/* ================= IMAGE SKELETON ================= */}

            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 z-20 overflow-hidden bg-slate-200 dark:bg-slate-800">

                {/* Base Skeleton */}
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />

                {/* Shimmer */}
                <div className="absolute inset-y-0 -left-full w-1/2 animate-skeleton-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              </div>
            )}

            {/* ================= IMAGE ERROR ================= */}

            {imageError && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900">
                <div className="text-center">

                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                    <Sparkles className="h-5 w-5 text-cyan-400" />
                  </div>

                  <span className="text-xs font-mono text-slate-500">
                    Image unavailable
                  </span>

                </div>
              </div>
            )}
          </>
        ) : (
          /* ================= NO IMAGE ================= */

          <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
            <div className="text-center">

              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                <Sparkles className="h-5 w-5 text-cyan-400" />
              </div>

              <span className="text-xs font-mono text-slate-500">
                No Image
              </span>

            </div>
          </div>
        )}

        {/* ================= IMAGE GRADIENT ================= */}

        {imageLoaded && !imageError && (
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        )}

        {/* ================= CATEGORY ================= */}

        {imageLoaded && !imageError && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
              {article?.category}
            </span>
          </div>
        )}

        {/* ================= READING TIME ================= */}

        {imageLoaded && !imageError && (
          <div className="absolute bottom-3 right-3 z-10">
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-950/80 backdrop-blur-md text-slate-300 border border-slate-700/50">
              <Clock className="w-3 h-3 text-cyan-400" />
              {article?.readingTime}
            </span>
          </div>
        )}
      </Link>

      {/* ================= CONTENT ================= */}

      <div className="p-5 sm:p-6 space-y-3">

        {/* Date + Author */}

        <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">

          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-cyan-500" />
            {article?.date}
          </span>

          <span className="text-slate-400 dark:text-slate-500 font-medium">
            By {article?.author?.name?.split(' ')[0] || 'GJ'}
          </span>

        </div>

        {/* Title */}

        <Link href={`/blog/${article?.slug}`}>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
            {article?.title}
          </h3>
        </Link>

        {/* Excerpt */}

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {article?.excerpt}
        </p>
      </div>


      <div className="p-5 sm:p-6 pt-0 mt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">

        {/* Author */}

        <div className="flex items-center gap-2.5">

          <div className="relative w-7 h-7 shrink-0 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">

            {article?.author?.avatar ? (
              <Image
                src={article.author.avatar}
                alt={article.author.name || 'Author'}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            )}

          </div>

          <span className="text-xs font-medium text-slate-700 dark:text-slate-300 font-mono">
            {article?.author?.name || 'GJ'}
          </span>

        </div>

        {/* Read */}

        <Link
          href={`/blog/${article?.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 transition-colors"
          aria-label={`Read ${article?.title}`}
        >
          <span className="hidden sm:inline">
            Read
          </span>

          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </Link>

      </div>
    </motion.div>
  );
}