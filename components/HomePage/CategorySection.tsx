"use client";

import {
    useEffect,
    useState,
} from "react";

import CategoryExplorer from "./CategoryExplorer";
import ArticleGrid from "./ArticleGrid";

import {
    CategoryFilter,
    Article,
} from "@/types/blog";

import { useToast } from "@/context/ToastContext";

interface CategorySectionProps {
    posts: Article[];
}

const ARTICLES_PER_PAGE = 6;

export default function CategorySection({
    posts,
}: CategorySectionProps) {
    const { showToast } = useToast();

    const [selectedCategory, setSelectedCategory] =
        useState<CategoryFilter>("All");

    const [visibleCount, setVisibleCount] =
        useState(ARTICLES_PER_PAGE);

    /*
     * Read category from URL
     */
    useEffect(() => {
        try {
            const params = new URLSearchParams(
                window.location.search
            );

            const category =
                params.get("category");

            if (category) {
                setSelectedCategory(
                    category as CategoryFilter
                );
            } else {
                setSelectedCategory("All");
            }
        } catch (error) {
            console.error(
                "Failed to read category from URL:",
                error
            );

            showToast(
                "Something went wrong",
                "error"
            );

            setSelectedCategory("All");
        }
    }, [showToast]);

    /*
     * Handle browser back / forward
     */
    useEffect(() => {
        const handlePopState = () => {
            try {
                const params =
                    new URLSearchParams(
                        window.location.search
                    );

                const category =
                    params.get("category");

                setSelectedCategory(
                    category
                        ? (category as CategoryFilter)
                        : "All"
                );
            } catch (error) {
                console.error(
                    "Failed to update category from URL:",
                    error
                );

                showToast(
                    "Something went wrong",
                    "error"
                );

                setSelectedCategory("All");
            }
        };

        window.addEventListener(
            "popstate",
            handlePopState
        );

        return () => {
            window.removeEventListener(
                "popstate",
                handlePopState
            );
        };
    }, [showToast]);

    /*
     * Filter posts by category
     */
    const filteredPosts =
        selectedCategory === "All"
            ? posts
            : posts.filter(
                  (post) =>
                      post.category ===
                      selectedCategory
              );

    /*
     * Reset pagination whenever category changes
     */
    useEffect(() => {
        setVisibleCount(ARTICLES_PER_PAGE);
    }, [selectedCategory]);

    /*
     * Only show currently visible articles
     */
    const visiblePosts = filteredPosts.slice(
        0,
        visibleCount
    );

    /*
     * Check whether more articles exist
     */
    const hasMoreArticles =
        visibleCount < filteredPosts.length;

    /*
     * Load next 6 articles
     */
    const handleViewMore = () => {
        setVisibleCount(
            (previous) =>
                Math.min(
                    previous + ARTICLES_PER_PAGE,
                    filteredPosts.length
                )
        );
    };

    return (
        <>
            <CategoryExplorer
                posts={posts}
                selectedCategory={
                    selectedCategory
                }
                onSelectCategory={
                    setSelectedCategory
                }
            />

            <ArticleGrid
                posts={visiblePosts}
                selectedCategory={
                    selectedCategory
                }
            />

            {hasMoreArticles && (
                <div className="flex justify-center mt-10 mb-16">
                    <button
                        type="button"
                        onClick={handleViewMore}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 backdrop-blur-md transition-all duration-200 hover:border-cyan-500/50 hover:text-cyan-500 dark:hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10"
                    >
                        View More
                    </button>
                </div>
            )}
        </>
    );
}