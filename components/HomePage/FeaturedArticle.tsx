"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Sparkles,
  Clock,
  Calendar,
  ArrowRight,
  User,
} from "lucide-react";

import { useTranslations } from "@/lib/i18n/useTranslations";
import { localizedPath } from "@/lib/i18n/routes";

interface FeaturedArticleData {
  id: string;
  title: string;
  image: string;
  slug: string;
  tags: string[];
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatar: string | null;
  };
  category: string;
  date: string;
  excerpt: string;
}

interface FeaturedArticleProps {
  featuredArticle: FeaturedArticleData;
}

export default function FeaturedArticle({
  featuredArticle,
}: FeaturedArticleProps) {
  const { t,locale } = useTranslations();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!featuredArticle) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= SECTION HEADER ================= */}

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-4 h-4" />
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
              {t.featuredArticle.title}
            </h2>
          </div>

          <span className="text-xs font-mono text-cyan-500 uppercase tracking-wider font-semibold">
            {t.featuredArticle.editorsChoice}
          </span>
        </div>

        {/* ================= FEATURED CARD ================= */}

        <Link
          href={`${localizedPath(locale)}/blog/${featuredArticle?.slug}`}
          className="group block relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden shadow-xl hover:shadow-2xl hover:border-cyan-500/50 transition-all duration-500"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

            {/* ================= LEFT IMAGE ================= */}

            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[440px] overflow-hidden bg-slate-950">

              {featuredArticle?.image && !imageError ? (
                <>
                  <Image
                    src={featuredArticle?.image}
                    alt={
                      featuredArticle?.title ||
                      t.featuredArticle.imageAlt
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    unoptimized
                    priority
                    className={`object-cover transition-all duration-500 ease-out ${
                      imageLoaded
                        ? "opacity-100"
                        : "opacity-0"
                    } group-hover:scale-[1.04]`}
                    onLoad={() => {
                      setImageLoaded(true);
                    }}
                    onError={() => {
                      setImageError(true);
                      setImageLoaded(true);
                    }}
                  />

                  {/* Image Skeleton */}

                  {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 z-20 overflow-hidden bg-slate-200 dark:bg-slate-800">

                      {/* Base */}

                      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />

                      {/* Shimmer */}

                      <div className="absolute inset-y-0 -left-full w-1/2 animate-skeleton-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    </div>
                  )}

                  {/* Image Gradient */}

                  {imageLoaded && (
                    <>
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/60" />
                    </>
                  )}

                  {/* Category */}

                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30">
                      {featuredArticle?.category}
                    </span>
                  </div>
                </>
              ) : (

                /* ================= NO IMAGE / ERROR ================= */

                <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                  <div className="text-center">

                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                      <Sparkles className="h-5 w-5 text-cyan-400" />
                    </div>

                    <span className="text-xs font-mono text-slate-500">
                      {imageError
                        ? t.featuredArticle.imageUnavailable
                        : t.featuredArticle.noImage}
                    </span>

                  </div>
                </div>
              )}

              {/* ================= CATEGORY WHEN ERROR ================= */}

              {imageError && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30">
                    {featuredArticle?.category}
                  </span>
                </div>
              )}
            </div>

            {/* ================= RIGHT CONTENT ================= */}

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">

              <div className="space-y-4">

                {/* Meta */}

                <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">

                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {featuredArticle?.date}
                  </span>

                  <span>•</span>

                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {featuredArticle?.readingTime}
                  </span>

                </div>

                {/* Title */}

                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
                  {featuredArticle?.title}
                </h3>

                {/* Description */}

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {featuredArticle?.excerpt}
                </p>

                {/* Tech Tags */}

                <div className="flex flex-wrap gap-2 pt-2">
                  {featuredArticle.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ================= AUTHOR FOOTER ================= */}

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">

                {/* Author */}

                <div className="flex items-center gap-3">

                  <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden border border-cyan-500/30 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">

                    {featuredArticle?.author?.avatar ? (
                      console.log(featuredArticle?.author?.avatar),
                      <Image
                        src={featuredArticle.author.avatar}
                        alt={
                          featuredArticle.author.name ||
                          t.featuredArticle.author
                        }
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    )}

                  </div>

                  <div className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {featuredArticle?.author?.name || "GJ"}
                    </span>

                    <span className="block text-xs font-mono text-cyan-600 dark:text-cyan-400 truncate">
                      {featuredArticle?.author?.role ||
                        t.featuredArticle.author}
                    </span>
                  </div>

                </div>

                {/* Read Article */}

                <div className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">

                  <span className="hidden sm:inline">
                    {t.featuredArticle.readArticle}
                  </span>

                  <ArrowRight className="w-4 h-4" />

                </div>

              </div>
            </div>

          </div>
        </Link>
      </div>
    </section>
  );
}