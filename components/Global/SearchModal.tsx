"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Search,
  X,
  BookOpen,
  Clock,
  Tag,
  ArrowRight,
  CornerDownLeft,
  Loader2,
} from "lucide-react";

import Link from "next/link";

type SearchResult = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readingTime?: string;
  date?: string;
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({
  isOpen,
  onClose,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [results, setResults] = useState<
    SearchResult[]
  >([]);

  const [categories, setCategories] = useState<
    string[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 80);

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const controller = new AbortController();

    const timer = window.setTimeout(
      async () => {
        try {
          setLoading(true);
          setError("");

          const params = new URLSearchParams();

          if (query.trim()) {
            params.set("q", query.trim());
          }

          if (selectedCategory !== "All") {
            params.set(
              "category",
              selectedCategory,
            );
          }

          const response = await fetch(
            `/api/search?${params.toString()}`,
            {
              signal: controller.signal,
              cache: "no-store",
            },
          );

          if (!response.ok) {
            throw new Error(
              "Search request failed",
            );
          }

          const data = await response.json();

          const rawResults = Array.isArray(
            data.results,
          )
            ? data.results
            : [];

          const rawCategories = Array.isArray(
            data.categories,
          )
            ? data.categories
            : [];

          const uniqueResults =
            rawResults.filter(
              (
                article: SearchResult,
                index: number,
                array: SearchResult[],
              ) => {
                const articleKey =
                  article.id ||
                  article.slug ||
                  `article-${index}`;

                return (
                  array.findIndex(
                    (item) =>
                      (item.id ||
                        item.slug) ===
                      articleKey,
                  ) === index
                );
              },
            );

          const uniqueCategories = Array.from(
            new Set(
              rawCategories
                .filter(
                  (category: unknown) =>
                    typeof category ===
                    "string" &&
                    category.trim().length > 0,
                )
                .map((category: string) =>
                  category.trim(),
                ),
            ),
          );

          setResults(uniqueResults);
          setCategories(
            rawCategories.filter(
              (category: unknown): category is string =>
                typeof category === "string" && category.trim().length > 0
            )
          );
        } catch (err) {
          if (
            (err as Error).name ===
            "AbortError"
          ) {
            return;
          }

          setResults([]);
          setError(
            "Unable to load articles right now. Please try again.",
          );
        } finally {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        }
      },
      220,
    );

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [
    isOpen,
    query,
    selectedCategory,
  ]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedCategory("All");
      setResults([]);
      setCategories([]);
      setError("");
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6 md:p-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: -20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: -20,
            }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 350,
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-dialog-title"
            className="relative z-10 my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
          >
            <div className="border-b border-slate-800/80 p-5">
              <div className="mb-3 flex items-center justify-between">
                <span
                  id="search-dialog-title"
                  className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400"
                >
                  <BookOpen className="h-3.5 w-3.5" />

                  Knowledge Base Search
                </span>

                <div className="flex items-center gap-2">
                  <span className="hidden rounded border border-slate-700 bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-400 sm:inline-flex">
                    ESC to close
                  </span>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative flex items-center">
                <Search className="pointer-events-none absolute left-4 h-5 w-5 text-cyan-400" />

                <input
                  ref={inputRef}
                  id="search-articles-input"
                  type="search"
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  placeholder="Search articles, technologies, topics..."
                  autoComplete="off"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-3.5 pl-12 pr-10 text-base text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() =>
                      setQuery("")
                    }
                    className="absolute right-3 rounded-md p-1 text-slate-400 hover:text-slate-200"
                    aria-label="Clear query"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="no-scrollbar mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {[
                  "All",
                  ...categories,
                ].map(
                  (
                    category,
                    index,
                  ) => (
                    <button
                      type="button"
                      key={`${category}-${index}`}
                      onClick={() =>
                        setSelectedCategory(
                          category,
                        )
                      }
                      className={`whitespace-nowrap rounded-lg px-2.5 py-1 font-mono transition-colors ${selectedCategory ===
                        category
                        ? "bg-cyan-500 font-semibold text-slate-950"
                        : "bg-slate-800/80 text-slate-400 hover:bg-slate-700"
                        }`}
                    >
                      {category}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-800/50 bg-slate-950/40 px-5 py-2.5 text-xs text-slate-400">
              <span className="font-mono">
                Search Results:{" "}
                <strong className="text-cyan-400">
                  {loading
                    ? "…"
                    : results.length}
                </strong>{" "}
                article
                {results.length === 1
                  ? ""
                  : "s"}{" "}
                found
              </span>

              {query && (
                <span className="max-w-[200px] truncate">
                  Query: &ldquo;
                  {query}
                  &rdquo;
                </span>
              )}
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {loading ? (
                <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-slate-500">
                  <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />

                  Searching Sanity articles...
                </div>
              ) : error ? (
                <div className="py-12 text-center text-sm text-slate-500">
                  {error}
                </div>
              ) : results.length === 0 ? (
                <div className="py-12 text-center">
                  <BookOpen className="mx-auto mb-3 h-10 w-10 text-slate-600" />

                  <p className="text-sm font-medium text-slate-300">
                    No articles found
                    {query
                      ? ` matching “${query}”`
                      : ""}
                    .
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Try another topic,
                    category, or keyword.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {results.map(
                    (
                      article,
                      articleIndex,
                    ) => {
                      const articleKey =
                        article.id ||
                        article.slug ||
                        `article-${articleIndex}`;

                      const safeTags =
                        Array.from(
                          new Set(
                            (
                              article.tags ??
                              []
                            )
                              .filter(
                                (
                                  tag,
                                ) =>
                                  typeof tag ===
                                  "string" &&
                                  tag.trim()
                                    .length >
                                  0,
                              )
                              .map(
                                (tag) =>
                                  tag.trim(),
                              ),
                          ),
                        ).slice(0, 3);

                      return (
                        <Link
                          key={articleKey}
                          href={`/blog/${article.slug}`}
                          onClick={
                            handleClose
                          }
                          className="group block rounded-xl border border-slate-800/60 bg-slate-900/50 p-4 transition-all hover:border-cyan-500/40 hover:bg-slate-800/50"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1 space-y-1.5">
                              <div className="flex flex-wrap items-center gap-2">
                                {article.category && (
                                  <span className="rounded border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                                    {
                                      article.category
                                    }
                                  </span>
                                )}

                                {article.readingTime && (
                                  <span className="flex items-center gap-1 font-mono text-xs text-slate-400">
                                    <Clock className="h-3 w-3" />

                                    {
                                      article.readingTime
                                    }
                                  </span>
                                )}
                              </div>

                              <h4 className="text-base font-semibold text-slate-100 transition-colors group-hover:text-cyan-400">
                                {article.title}
                              </h4>

                              <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">
                                {
                                  article.excerpt
                                }
                              </p>

                              {safeTags.length >
                                0 && (
                                  <div className="flex items-center gap-1.5 pt-1">
                                    {safeTags.map(
                                      (
                                        tag,
                                        tagIndex,
                                      ) => (
                                        <span
                                          key={`${articleKey}-tag-${tagIndex}-${tag}`}
                                          className="flex items-center gap-0.5 font-mono text-[10px] text-slate-500"
                                        >
                                          <Tag className="h-2.5 w-2.5" />

                                          {tag}
                                        </span>
                                      ),
                                    )}
                                  </div>
                                )}
                            </div>

                            <div className="shrink-0 self-center rounded-lg bg-slate-800/80 p-2 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-400">
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>
                        </Link>
                      );
                    },
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-800/80 bg-slate-950/60 px-5 py-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5 font-mono">
                <CornerDownLeft className="h-3.5 w-3.5 text-cyan-400" />

                Select an article to read the full
                deep-dive
              </span>

              <span className="font-mono text-cyan-400/80">
                GJ Tech Knowledge Base
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}