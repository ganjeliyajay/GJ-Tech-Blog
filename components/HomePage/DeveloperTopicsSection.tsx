"use client";

import React from "react";

import { Cpu, Compass } from "lucide-react";

import TechnologyCard from "./TechnologyCard";

import { TechnologyTopic } from "@/types/blog";
import { useTranslations } from "@/lib/i18n/useTranslations";

interface DeveloperTopicsSectionProps {
  topics: TechnologyTopic[];
}

export default function DeveloperTopicsSection({
  topics,
}: DeveloperTopicsSectionProps) {
  const { t } = useTranslations();

  return (
    <section className="py-16 sm:py-20 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>

            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              {t.developerTopics.ecosystemArchitecture}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
              {t.developerTopics.title}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              {t.developerTopics.description}
            </p>

          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <Compass className="w-4 h-4 text-cyan-400" />

            <span>
              {topics.length}{" "}
              {t.developerTopics.specializedTracks}
            </span>
          </div>
        </div>

        {/* Topics Grid */}

        {topics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((topic) => (
              <TechnologyCard
                key={topic.category || topic.name}
                topic={topic}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
            <Cpu className="w-8 h-8 mx-auto mb-3 text-slate-400" />

            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {t.developerTopics.noTopics}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              {t.developerTopics.noTopicsDescription}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}