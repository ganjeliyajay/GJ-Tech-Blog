'use client';

import React from 'react';
import { 
  Code2, 
  FileCode, 
  Atom, 
  Layers, 
  Server, 
  Terminal, 
  Database, 
  GitBranch, 
  Palette, 
  Cpu 
} from 'lucide-react';
import { TECH_STRIP_ITEMS } from '@/data/articles';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  FileCode,
  Atom,
  Layers,
  Server,
  Terminal,
  Database,
  GitBranch,
  Palette,
  Cpu,
};

export default function TechStackStrip() {
  // Duplicate array to achieve seamless infinite loop
  const duplicatedItems = [...TECH_STRIP_ITEMS, ...TECH_STRIP_ITEMS, ...TECH_STRIP_ITEMS];

  return (
    <div className="relative py-4 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/60 overflow-hidden select-none">
      {/* Edge Gradient Masks for clean fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-[#080c14] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-[#080c14] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-6 sm:gap-10">
        {duplicatedItems.map((item, index) => {
          const Icon = iconMap[item.icon] || Code2;
          return (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs hover:border-cyan-500/40 hover:shadow-cyan-500/10 transition-all group shrink-0"
            >
              <div 
                className="w-5 h-5 rounded-md flex items-center justify-center text-xs group-hover:scale-110 transition-transform"
                style={{ color: item.color }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
