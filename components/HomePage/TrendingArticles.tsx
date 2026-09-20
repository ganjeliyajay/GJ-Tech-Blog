"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  TrendingUp,
  Clock,
  ArrowRight,
  User,
} from "lucide-react";

import { Article } from "@/types/blog";

interface TrendingArticlesProps {
  article: Article[];
}

export default function TrendingArticles({
  article,
}: TrendingArticlesProps) {
  const safeArticles = Array.isArray(article)
    ? article
    : [];

  const trendingArticles = [...safeArticles]
    .filter(
      (item) =>
        item.trendingRank !== undefined &&
        item.trendingRank !== null,
    )
    .sort(
      (a, b) =>
        (a.trendingRank ?? 99) -
        (b.trendingRank ?? 99),
    )
    .slice(0, 5);

  return (
    <section className="py-12 border-y border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Trending This Week
            </h2>
          </div>

          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            HIGH READERSHIP
          </span>
        </div>

        {trendingArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingArticles.map((item, idx) => {
              const formattedRank = String(
                idx + 1,
              ).padStart(2, "0");

              return (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="group relative flex items-start gap-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="font-mono text-3xl sm:text-4xl font-black tracking-tighter text-slate-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-cyan-400 group-hover:to-indigo-500 transition-all select-none shrink-0 w-12">
                    {formattedRank}
                  </div>

                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="font-bold text-cyan-400 uppercase tracking-wider">
                        {item.category}
                      </span>

                      <span className="text-slate-600">
                        •
                      </span>

                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.readingTime}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-1">
                      {item.excerpt}
                    </p>

                    <div className="pt-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="relative w-7 h-7 shrink-0 rounded-full overflow-hidden border border-cyan-500/30 bg-slate-800 flex items-center justify-center">
                          {item.author?.avatar ? (
                            <Image
                              src={item.author.avatar}
                              alt={
                                item.author.name ||
                                "Author"
                              }
                              fill
                              sizes="28px"
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <User className="w-3.5 h-3.5 text-slate-500" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <span className="block text-[11px] font-semibold text-slate-300 truncate">
                            {item.author?.name ||
                              "GJ"}
                          </span>

                          <span className="block text-[9px] font-mono text-cyan-400 truncate">
                            {item.author?.role ||
                              "Author"}
                          </span>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 shrink-0 text-cyan-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center rounded-2xl border border-dashed border-slate-800">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-slate-500" />

            <p className="text-sm font-medium text-slate-400">
              No trending articles yet.
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Mark articles with a trending rank from
              Sanity Studio.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}