'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';
import DeveloperTerminal from '../BlogDetails/DeveloperTerminal';
import { useTranslations } from '@/lib/i18n/useTranslations';

export default function Hero() {
  const { t } = useTranslations();
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/60 dark:border-slate-800/80">
      {/* Background Decorative Tech Grid & Gradients */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Editorial Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-500/10 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-cyan-700 dark:text-cyan-300">
                {t.hero.badge}
              </span>
            </div>

            {/* Large Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] font-sans">
              {t.hero.code}
              {' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500">
                {t.hero.create}
              </span>
              {' '}
              {t.hero.build}
              {' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
                {t.hero.evolve}
              </span>
            </h1>

            {/* Supporting Subtext */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-sans">
              {t.hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#articles"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] group"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t.hero.exploreArticles}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#categories"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/40 transition-all backdrop-blur-sm"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>{t.hero.exploreTechTopics}</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 flex items-center gap-6 sm:gap-10 border-t border-slate-200 dark:border-slate-800/60 text-xs font-mono text-slate-500 dark:text-slate-400">
              <div>
                <strong className="block text-base font-bold text-slate-900 dark:text-white">
                  12+
                </strong>
                <span>{t.hero.deepDiveGuides}</span>
              </div>

              <div className="h-7 w-px bg-slate-200 dark:bg-slate-800" />

              <div>
                <strong className="block text-base font-bold text-slate-900 dark:text-white">
                  10+
                </strong>
                <span>{t.hero.techTopics}</span>
              </div>

              <div className="h-7 w-px bg-slate-200 dark:bg-slate-800" />

              <div>
                <strong className="block text-base font-bold text-cyan-600 dark:text-cyan-400">
                  100%
                </strong>
                <span>{t.hero.developerFocus}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Signature Developer Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <DeveloperTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
