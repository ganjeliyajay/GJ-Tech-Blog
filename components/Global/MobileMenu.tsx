'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, Search, Sparkles, BookOpen, Layers, User, ArrowRight } from 'lucide-react';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  onOpenSubscribe: () => void;
  activeSection?: string;
  onNavigateSection?: (sectionId: string) => void;
  categories?: string[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  onOpenSearch,
  onOpenSubscribe,
  activeSection = 'home',
  onNavigateSection,
  categories = [],
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (isOpen) {
        unlockScroll();
      }
    };
  }, [isOpen, onClose]);

  const navLinks = [
    { name: 'Home', id: 'home', href: '/', icon: Sparkles },
    { name: 'Articles', id: 'articles', href: '/#articles', icon: BookOpen },
    { name: 'Categories', id: 'categories', href: '/#categories', icon: Layers },
    { name: 'About', id: 'about', href: '/#about', icon: User },
  ];

  const handleLinkClick = (id: string) => {
    onClose();
    if (onNavigateSection) {
      onNavigateSection(id);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl z-10"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center font-mono font-black text-slate-950 text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                    GJ
                  </div>
                  <div>
                    <span className="font-bold tracking-tight text-slate-900 dark:text-white font-mono text-base">GJ Tech</span>
                    <span className="block text-[10px] text-cyan-600 dark:text-cyan-400 font-mono tracking-wider">DEV PUBLICATION</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Shortcut */}
              <div className="mt-5">
                <button
                  onClick={() => {
                    onClose();
                    onOpenSearch();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500/50 transition text-sm font-sans"
                >
                  <Search className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                  <span>Search articles, topics...</span>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeSection.toLowerCase() === link.id.toLowerCase();
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => handleLinkClick(link.id)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition ${isActive
                          ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500'}`} />
                        <span>{link.name}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-40" />
                    </Link>
                  );
                })}
              </nav>

              {/* Popular Categories */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Key Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {categories.slice(0, 8).map((cat) => (
                    <Link
                      key={cat}
                      href={`/?category=${encodeURIComponent(cat)}#categories`}
                      onClick={() => handleLinkClick('categories')}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/30 transition"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80">
              <button
                onClick={() => {
                  onClose();
                  onOpenSubscribe();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-semibold text-slate-950 hover:brightness-110 transition shadow-[0_0_20px_rgba(6,182,212,0.3)] text-sm"
              >
                Subscribe to Newsletter
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
