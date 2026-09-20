'use client';

import React, { useState, useEffect } from 'react';
import { List, ChevronDown, ChevronUp, Bookmark } from 'lucide-react';
import { ArticleSection } from '@/types/blog';

interface TableOfContentsProps {
  sections: ArticleSection[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || '');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveId(id);
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Collapsible Accordion */}
      <div className="lg:hidden mb-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-sm">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between text-sm font-semibold text-slate-900 dark:text-white"
        >
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs uppercase tracking-wider">Table of Contents</span>
          </div>
          {mobileOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {mobileOpen && (
          <nav className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`w-full text-left py-1.5 px-2.5 rounded-lg text-xs font-medium transition ${
                  activeId === sec.id
                    ? 'bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block sticky top-28 space-y-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 backdrop-blur-sm shadow-sm">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80">
            <List className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              ON THIS PAGE
            </span>
          </div>

          <nav className="space-y-1">
            {sections.map((sec) => {
              const isActive = activeId === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left py-2 px-3 rounded-xl text-xs font-medium transition flex items-center justify-between group ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold border-l-2 border-cyan-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <span className="truncate">{sec.title}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
