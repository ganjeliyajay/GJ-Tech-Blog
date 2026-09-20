import ArticleCardSkeleton from '@/components/HomePage/ArticleCardSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#080c14] text-slate-900 dark:text-slate-100">
      
      {/* Hero placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="h-8 w-40 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />

        <div className="mt-6 h-12 w-[70%] rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />

        <div className="mt-4 h-5 w-[50%] rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </section>

      {/* Featured article placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-[400px] rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </section>

      {/* Article cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="mt-4 h-10 w-64 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))}
        </div>
      </section>

    </div>
  );
}