"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
    Sparkles,
    WandSparkles,
    FileText,
    Languages,
    LogOut,
    CheckCircle2,
    Loader2,
    Copy,
    Check,
    Clock3,
    Hash,
    ShieldCheck,
    ArrowUpRight,
    AlertCircle,
} from "lucide-react";

type GeneratedBlog = {
    id: string;
    title: string;
    language: string;
    slug: string;
};

type GeneratedData = {
    topic: string;
    translationId: string;
    slugs: {
        english: string;
        gujarati: string;
        hindi: string;
    };
    blogs: {
        english: GeneratedBlog;
        gujarati: GeneratedBlog;
        hindi: GeneratedBlog;
    };
};

export default function AIBlogGenerator() {
    const router = useRouter();

    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [result, setResult] = useState<GeneratedData | null>(null);
    const [copiedId, setCopiedId] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Logout failed.");
            }

            router.push("/admin/login");
            router.refresh();
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Logout failed.");
        } finally {
            setLoggingOut(false);
        }
    };

    const openDraft = (id: string) => {
        const url = `/studio/intent/edit/id=${encodeURIComponent(id)};type=post`;
        window.open(url, "_blank");
    };

    const handleGenerate = async () => {
        if (!topic.trim()) {
            setMessage("Please enter a blog topic.");
            return;
        }

        setLoading(true);
        setMessage("");
        setResult(null);

        try {
            const response = await fetch("/api/automation/generate-blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic: topic.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || "Failed to generate blog.");
            }

            setResult(data.data);
            setMessage("Blog generated successfully.");
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Failed to generate blog.");
        } finally {
            setLoading(false);
        }
    };

    const copyTranslationId = async (id: string) => {
        try {
            await navigator.clipboard.writeText(id);
            setCopiedId(true);
            setTimeout(() => setCopiedId(false), 2000);
        } catch {
            // Clipboard fallback
        }
    };

    const isSuccessMessage = message === "Blog generated successfully.";

    return (
        <div className="min-h-screen bg-[#090d16] text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-zinc-100">
            {/* Top Header */}
            <header className="sticky top-0 z-30 w-full border-b border-zinc-800/80 bg-[#090d16]/85 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    {/* Left: Brand mark & Section label */}
                    <div className="flex items-center gap-3 min-w-0">
                        <Link
                            href="/"
                            className="flex items-center gap-2.5 text-zinc-100 hover:text-white transition-colors group"
                        >
                            <div className="w-6 h-6 rounded-md bg-zinc-100 text-zinc-950 font-bold text-xs flex items-center justify-center tracking-tight shadow-sm">
                                GJ
                            </div>
                            <span className="text-sm font-semibold tracking-tight text-zinc-200 group-hover:text-white">
                                GJ Tech Blog
                            </span>
                        </Link>
                        <div className="h-3.5 w-px bg-zinc-800 hidden sm:block" />
                        <span className="text-xs font-medium text-zinc-400 hidden sm:inline">
                            AI Blog Automation
                        </span>
                    </div>

                    {/* Right: Admin Status & Logout */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800">
                            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Admin</span>
                        </div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors disabled:opacity-50 cursor-pointer"
                            title="Sign out of Admin Dashboard"
                        >
                            {loggingOut ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-400" />
                            ) : (
                                <LogOut className="w-3.5 h-3.5 text-zinc-400" />
                            )}
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Dashboard Workspace */}
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-7">
                {/* Page Introduction */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400">
                                    AI Content Studio
                                </span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">
                                AI Blog Automation
                            </h1>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-zinc-300 bg-zinc-900/80 border border-zinc-800 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                            <span>AI Generation Ready</span>
                        </div>
                    </div>

                    <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
                        Generate multilingual technical blog drafts with AI and review them directly in Sanity before publishing.
                    </p>
                </div>

                {/* Notifications Banner */}
                {message && (
                    <div
                        role="alert"
                        className={`rounded-lg p-3.5 border flex items-start gap-2.5 text-xs sm:text-sm transition-colors ${isSuccessMessage
                            ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-300"
                            : "bg-rose-950/20 border-rose-500/20 text-rose-300"
                            }`}
                    >
                        {isSuccessMessage ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                        <div className="font-medium leading-relaxed">{message}</div>
                    </div>
                )}

                {/* AI Blog Generation Workspace */}
                <section
                    aria-labelledby="workspace-heading"
                    className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-7 shadow-sm space-y-6"
                >
                    <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
                        <div>
                            <h2
                                id="workspace-heading"
                                className="text-base font-semibold text-zinc-100"
                            >
                                Generate New Blog
                            </h2>
                            <p className="text-xs text-zinc-400 mt-0.5">
                                Enter a topic to produce synchronized English, Gujarati, and Hindi drafts.
                            </p>
                        </div>
                    </div>

                    {/* Topic Form Field */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="blog-topic"
                                className="text-xs font-medium text-zinc-300 uppercase tracking-wider"
                            >
                                Blog Topic
                            </label>
                            <span className="text-[11px] text-zinc-400 font-mono">
                                Technical article
                            </span>
                        </div>

                        <input
                            id="blog-topic"
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !loading) {
                                    e.preventDefault();
                                    handleGenerate();
                                }
                            }}
                            placeholder="Enter a technical topic..."
                            disabled={loading}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/30 transition disabled:opacity-60 disabled:cursor-not-allowed font-normal"
                        />

                        {/* Example helper */}
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 pt-0.5">
                            <span className="text-zinc-400">Example:</span>
                            <button
                                type="button"
                                onClick={() => setTopic("React Server Components Explained for Beginners")}
                                disabled={loading}
                                className="text-zinc-300 hover:text-zinc-100 underline underline-offset-2 decoration-zinc-700 hover:decoration-zinc-400 transition-colors cursor-pointer disabled:pointer-events-none text-left"
                            >
                                React Server Components Explained for Beginners
                            </button>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-zinc-800/80">
                        <p className="text-xs text-zinc-400 order-2 sm:order-1">
                            Outputs 3 localized drafts directly into Sanity Content Lake.
                        </p>

                        <button
                            type="button"
                            onClick={handleGenerate}
                            disabled={loading}
                            className="order-1 sm:order-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-zinc-950 bg-zinc-100 hover:bg-white active:bg-zinc-200 transition shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin text-zinc-900" />
                                    <span>Generating Blogs...</span>
                                </>
                            ) : (
                                <>
                                    <WandSparkles className="w-4 h-4 text-zinc-900" />
                                    <span>Generate Blog</span>
                                </>
                            )}
                        </button>
                    </div>
                </section>

                {/* Professional Loading State */}
                {loading && (
                    <section
                        aria-live="polite"
                        className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-zinc-300" />
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                                    Pipeline in Progress
                                </span>
                            </div>
                            <span className="text-xs text-zinc-500 font-mono">
                                3 language targets
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs font-medium text-zinc-200">
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300">
                                        EN
                                    </span>
                                    <span>English</span>
                                </div>
                                <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    <span>Generating...</span>
                                </span>
                            </div>

                            <div className="p-3 rounded-lg bg-zinc-950/30 border border-zinc-800/60 flex items-center justify-between opacity-70">
                                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800/60 text-zinc-400">
                                        GU
                                    </span>
                                    <span>Gujarati</span>
                                </div>
                                <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                                    <Clock3 className="w-3 h-3" />
                                    <span>Waiting...</span>
                                </span>
                            </div>

                            <div className="p-3 rounded-lg bg-zinc-950/30 border border-zinc-800/60 flex items-center justify-between opacity-70">
                                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800/60 text-zinc-400">
                                        HI
                                    </span>
                                    <span>Hindi</span>
                                </div>
                                <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                                    <Clock3 className="w-3 h-3" />
                                    <span>Waiting...</span>
                                </span>
                            </div>
                        </div>
                    </section>
                )}

                {/* Generation Result Area */}
                {result && (
                    <section aria-labelledby="results-heading" className="space-y-5 pt-1">
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                            <div>
                                <h2
                                    id="results-heading"
                                    className="text-base font-semibold text-zinc-100 flex items-center gap-2"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    <span>Generated Drafts</span>
                                </h2>
                                <p className="text-xs text-zinc-400 mt-0.5">
                                    3 language drafts created successfully
                                </p>
                            </div>
                        </div>

                        {/* 3-Column Responsive Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                            {/* English Card */}
                            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/80 transition-colors p-5 flex flex-col justify-between space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <span className="px-2 py-0.5 rounded-md text-xs font-semibold tracking-wider uppercase bg-zinc-800 text-zinc-200 border border-zinc-700/60">
                                                EN
                                            </span>
                                            <span className="text-xs text-zinc-400 font-medium">English</span>
                                        </div>

                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/40">
                                            <FileText className="w-3 h-3 text-zinc-400" />
                                            <span>Sanity Draft</span>
                                        </span>
                                    </div>

                                    <h3 className="text-sm font-semibold text-zinc-100 leading-snug break-words">
                                        {result.blogs.english.title}
                                    </h3>

                                    <div className="space-y-1">
                                        <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
                                            Slug
                                        </span>
                                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-950/70 border border-zinc-800/80 text-xs font-mono text-zinc-300 truncate select-all">
                                            <Hash className="w-3 h-3 text-zinc-500 shrink-0" />
                                            <span className="truncate">{result.slugs.english}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-zinc-800/60">
                                    <button
                                        type="button"
                                        onClick={() => openDraft(result.blogs.english.id)}
                                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-200 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-zinc-600 transition-colors cursor-pointer"
                                    >
                                        <span>Open Draft</span>
                                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Gujarati Card */}
                            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/80 transition-colors p-5 flex flex-col justify-between space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <span className="px-2 py-0.5 rounded-md text-xs font-semibold tracking-wider uppercase bg-zinc-800 text-zinc-200 border border-zinc-700/60">
                                                GU
                                            </span>
                                            <span className="text-xs text-zinc-400 font-medium">ગુજરાતી</span>
                                        </div>

                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/40">
                                            <FileText className="w-3 h-3 text-zinc-400" />
                                            <span>Sanity Draft</span>
                                        </span>
                                    </div>

                                    <h3 className="text-sm font-semibold text-zinc-100 leading-snug break-words">
                                        {result.blogs.gujarati.title}
                                    </h3>

                                    <div className="space-y-1">
                                        <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
                                            Slug
                                        </span>
                                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-950/70 border border-zinc-800/80 text-xs font-mono text-zinc-300 truncate select-all">
                                            <Hash className="w-3 h-3 text-zinc-500 shrink-0" />
                                            <span className="truncate">{result.slugs.gujarati}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-zinc-800/60">
                                    <button
                                        type="button"
                                        onClick={() => openDraft(result.blogs.gujarati.id)}
                                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-200 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-zinc-600 transition-colors cursor-pointer"
                                    >
                                        <span>Open Draft</span>
                                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Hindi Card */}
                            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/80 transition-colors p-5 flex flex-col justify-between space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <span className="px-2 py-0.5 rounded-md text-xs font-semibold tracking-wider uppercase bg-zinc-800 text-zinc-200 border border-zinc-700/60">
                                                HI
                                            </span>
                                            <span className="text-xs text-zinc-400 font-medium">हिन्दी</span>
                                        </div>

                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/40">
                                            <FileText className="w-3 h-3 text-zinc-400" />
                                            <span>Sanity Draft</span>
                                        </span>
                                    </div>

                                    <h3 className="text-sm font-semibold text-zinc-100 leading-snug break-words">
                                        {result.blogs.hindi.title}
                                    </h3>

                                    <div className="space-y-1">
                                        <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
                                            Slug
                                        </span>
                                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-950/70 border border-zinc-800/80 text-xs font-mono text-zinc-300 truncate select-all">
                                            <Hash className="w-3 h-3 text-zinc-500 shrink-0" />
                                            <span className="truncate">{result.slugs.hindi}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-zinc-800/60">
                                    <button
                                        type="button"
                                        onClick={() => openDraft(result.blogs.hindi.id)}
                                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-200 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-zinc-600 transition-colors cursor-pointer"
                                    >
                                        <span>Open Draft</span>
                                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}