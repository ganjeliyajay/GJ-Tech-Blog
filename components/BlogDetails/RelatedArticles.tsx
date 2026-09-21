'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';

import { Article } from '@/types/blog';

interface RelatedArticlesProps {
  currentArticle: Article;
  articles: Article[];
}

export default function RelatedArticles({
  currentArticle,
  articles,
}: RelatedArticlesProps) {
  const related = [...articles]
    .filter((article) => article.id !== currentArticle.id)
    .sort((a, b) => {
      const aSameCategory =
        a.category === currentArticle.category;

      const bSameCategory =
        b.category === currentArticle.category;

      if (aSameCategory && !bSameCategory) {
        return -1;
      }

      if (!aSameCategory && bSameCategory) {
        return 1;
      }

      return 0;
    })
    .slice(0, 3);

  return (
    <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <BookOpen className="w-4 h-4" />
          </span>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
            Continue Reading
          </h2>
        </div>

        <Link
          href="/#articles"
          className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
        >
          View all articles

          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Related Articles */}
      {related.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group flex flex-col justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900/90 hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Image */}
                <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4 bg-slate-950">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-slate-600" />
                    </div>
                  )}

                  {/* Category */}
                  {article.category && (
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-950/80 text-cyan-300 border border-cyan-500/30">
                      {article.category}
                    </span>
                  )}
                </div>

                {/* Reading Time */}
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                  <Clock className="w-3 h-3 text-cyan-400" />

                  <span>
                    {article.readingTime || '5 min read'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                <span>Read Deep-Dive</span>

                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
          No related articles available yet.
        </div>
      )}
    </section>
  );
}