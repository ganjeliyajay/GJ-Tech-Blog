'use client';

import Link from 'next/link';
import Image from 'next/image';

import { motion, useScroll, useSpring } from 'framer-motion';

import {
  ChevronRight,
  Calendar,
  Clock,
  Tag,
  Lightbulb,
  AlertTriangle,
  Info,
  CheckCircle,
  ArrowLeft,
  User,
} from 'lucide-react';

import TableOfContents from './TableOfContents';
import CodeBlock from './CodeBlock';
import ShareButtons from './ShareButtons';
import RelatedArticles from './RelatedArticles';

import { Article } from '@/types/blog';
import { useTranslations } from "@/lib/i18n/useTranslations";
import { localizedPath } from "@/lib/i18n/routes";

interface BlogDetailViewProps {
  article: Article;
  articles: Article[];
}

export default function BlogDetailView({
  article,
  articles,
}: BlogDetailViewProps) {
  const { t, locale } = useTranslations();

  const homePath = localizedPath(locale);

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t.blogDetails.articleNotFound}
          </h1>

          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-4 text-sm text-cyan-500 hover:text-cyan-400"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.blogDetails.backToHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 origin-left z-50"
        style={{ scaleX }}
      />

      <article key={article.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-8 overflow-x-auto whitespace-nowrap pb-1">

          <Link
            href={homePath}
            className="hover:text-cyan-400 transition flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.blogDetails.home}
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />

          <Link
            href={`${homePath}/#categories`}
            className="hover:text-cyan-400 transition"
          >
            {t.blogDetails.articles}
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />

          <span className="text-cyan-600 dark:text-cyan-400 font-semibold uppercase">
            {article.category}
          </span>
        </nav>

        {/* Article Header */}
        <header className="space-y-6 max-w-4xl mx-auto text-left mb-12">

          {/* Category */}
          {article.category && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
              {article.category}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] font-sans">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              {article.excerpt}
            </p>
          )}

          {/* Meta & Share */}
          <div className="pt-6 border-y border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">

            {/* Author */}
            <div className="flex items-center gap-3">

              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/40">

                {article.author?.avatar ? (
                  <Image
                    src={article.author.avatar}
                    alt={
                      article.author?.name ||
                      t.blogDetails.author
                    }
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <User className="p-2 w-full h-full text-slate-400" />
                )}

              </div>

              <div>
                <span className="block text-sm font-bold text-slate-900 dark:text-white">
                  {
                    article.author?.name ||
                    t.blogDetails.unknownAuthor
                  }
                </span>

                {article.author?.role && (
                  <span className="block text-xs font-mono text-cyan-600 dark:text-cyan-400">
                    {article.author.role}
                  </span>
                )}
              </div>
            </div>

            {/* Date & Read Time */}
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">

              {article.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-cyan-500" />
                  {article.date}
                </span>
              )}

              {article.date && article.readingTime && (
                <span>•</span>
              )}

              {article.readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-500" />
                  {article.readingTime}
                </span>
              )}
            </div>

            {/* Share */}
            <ShareButtons
              title={article.title}
              slug={article.slug}
            />

          </div>
        </header>

        {/* Hero Image */}
        {article.image && (
          <div className="relative h-72 sm:h-96 md:h-[480px] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl bg-slate-950">

            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              unoptimized
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          </div>
        )}

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Table of Contents */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <TableOfContents
              sections={article.sections || []}
            />
          </aside>

          {/* Main Article Content */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-12 text-slate-700 dark:text-slate-300 leading-relaxed font-sans text-base sm:text-lg">

            {article.sections?.map((section, sectionIndex) => (
              <section
                key={section.id || `section-${sectionIndex}`}
                id={section.id || undefined}
                className="scroll-mt-28 space-y-5"
              >

                {/* Section Title */}
                {section.title && (
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800/80 flex items-center gap-2">

                    <span className="text-cyan-500 font-mono text-lg select-none">
                      #
                    </span>

                    {section.title}
                  </h2>
                )}

                {/* Paragraphs */}
                {section.content?.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}

                {/* Callout */}
                {section.callout?.text && (
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 my-4 ${section.callout.type === 'tip'
                      ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-900 dark:text-cyan-200'
                      : section.callout.type === 'important'
                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200'
                        : 'border-indigo-500/30 bg-indigo-500/10 text-indigo-900 dark:text-indigo-200'
                      }`}
                  >

                    {section.callout.type === 'tip' && (
                      <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    )}

                    {section.callout.type === 'important' && (
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    )}

                    {section.callout.type === 'note' && (
                      <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    )}

                    <div className="text-sm font-sans leading-relaxed">
                      {section.callout.text}
                    </div>

                  </div>
                )}

                {/* Code Snippet */}
                {section.codeSnippet?.code && (
                  <CodeBlock
                    code={section.codeSnippet.code}
                    language={section.codeSnippet.language || 'text'}
                    filename={section.codeSnippet.filename}
                  />
                )}

                {/* Bullets */}
                {section.bullets?.length ? (
                  <ul className="space-y-3 my-4">

                    {section.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-3 text-sm sm:text-base"
                      >
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />

                        <span>{bullet}</span>
                      </li>
                    ))}

                  </ul>
                ) : null}

              </section>
            ))}

            {/* Tags */}
            {/* Tags */}
            {article.tags?.length ? (
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t.blogDetails.articleTags}
                </span>

                <div className="flex flex-wrap gap-2">
                  {Array.from(
                    new Set(
                      article.tags
                        .filter(
                          (tag): tag is string =>
                            typeof tag === "string" && tag.trim().length > 0,
                        )
                        .map((tag) => tag.trim()),
                    ),
                  ).map((tag) => (
                    <span
                      key={`article-tag-${tag}`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                    >
                      <Tag className="w-3 h-3 text-cyan-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Bottom Author Card */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">

              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-500/40 shrink-0">

                {article.author?.avatar ? (
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name || 'Author'}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <User className="p-2 w-full h-full text-slate-400" />
                )}

              </div>

              <div className="space-y-2">

                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  {t.blogDetails.writtenBy}
                </span>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {article.author?.name || 'Unknown Author'}
                </h3>

                {article.author?.role && (
                  <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                    {article.author.role}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.blogDetails.authorBio}
                </p>

              </div>
            </div>

          </div>
        </div>

        {/* Related Articles */}
        <RelatedArticles
          currentArticle={article}
          articles={articles}
        />

      </article>
    </div>
  );
}