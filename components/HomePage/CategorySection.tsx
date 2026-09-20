'use client';

import { useState, useEffect } from 'react';
import CategoryExplorer from './CategoryExplorer';
import ArticleGrid from './ArticleGrid';
import { CategoryFilter, Article } from '@/types/blog';

interface CategorySectionProps {
  posts: Article[];
}

export default function CategorySection({
  posts,
}: CategorySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const catParam = params.get('category');
        if (catParam) {
          return catParam as CategoryFilter;
        }
      } catch {
        // ignore
      }
    }
    return 'All';
  });

  useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const catParam = params.get('category');
        if (catParam) {
          setSelectedCategory(catParam as CategoryFilter);
        } else {
          setSelectedCategory('All');
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter(
          (post) => post.category === selectedCategory
        );

  return (
    <>
      <CategoryExplorer
        posts={posts}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <ArticleGrid
        posts={filteredPosts}
        selectedCategory={selectedCategory}
      />
    </>
  );
}