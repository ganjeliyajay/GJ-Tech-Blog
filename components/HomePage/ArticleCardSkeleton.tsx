'use client';

import React from 'react';

export default function ArticleCardSkeleton() {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
      
      {/* Shimmer Layer */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <div className="absolute inset-y-0 -left-full w-1/2 animate-skeleton-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div>
        {/* Image Skeleton */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
          <div className="absolute inset-0 bg-slate-300 dark:bg-slate-800" />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">

          {/* Date + Author */}
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <div className="h-5 w-[90%] rounded-md bg-slate-200 dark:bg-slate-700" />
            <div className="h-5 w-[65%] rounded-md bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Excerpt */}
          <div className="space-y-2 pt-1">
            <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-[85%] rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 sm:p-6 pt-0 mt-2 border-t border-slate-100 dark:border-slate-800/60">
        <div className="flex items-center justify-between pt-4">

          {/* Author */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700" />

            <div className="h-3 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Arrow */}
          <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}