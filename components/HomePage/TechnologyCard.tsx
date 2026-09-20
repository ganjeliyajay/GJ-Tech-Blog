'use client';

import React from 'react';

import Link from 'next/link';

import {
  Code2,
  Atom,
  Layers,
  FileCode,
  Server,
  Database,
  Cpu,
  GitBranch,
  ArrowRight,
} from 'lucide-react';

import { TechnologyTopic } from '@/types/blog';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Atom,
  Layers,
  FileCode,
  Server,
  Database,
  Cpu,
  GitBranch,
};

interface TechnologyCardProps {
  topic: TechnologyTopic;
}

export default function TechnologyCard({
  topic,
}: TechnologyCardProps) {
  const Icon = iconMap[topic.iconName] || Code2;

  return (
    <Link
      href={`/?category=${encodeURIComponent(topic.category || topic.name)}#categories`}
      className="group relative block p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900/90 hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden"
    >
      {/* Ambient hover glow inside card */}
      <div
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
        style={{ backgroundColor: topic.color }}
      />

      <div className="flex items-center justify-between mb-4">

        {/* Tech Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shadow-inner group-hover:scale-110 transition-transform"
          style={{ color: topic.color }}
        >
          <Icon className="w-6 h-6" />
        </div>

        {/* Count pill */}
        <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 group-hover:border group-hover:border-cyan-500/20 transition-colors">
          {topic.articleCount} Articles
        </span>
      </div>

      <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
        {topic.name}
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
        {topic.description}
      </p>

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
        <span>Explore Topic</span>

        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
      </div>
    </Link>
  );
}