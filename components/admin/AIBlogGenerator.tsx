"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Sparkles,
    WandSparkles,
    FileText,
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
    Calendar,
    RefreshCw,
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

type QueueTopic = {
    _id: string;
    topic: string;
    status: "pending" | "processing" | "completed" | "failed";
    createdAt: string;
    scheduledAt?: string;
    processedAt?: string;
    error?: string;
};

export default function AIBlogGenerator() {
    const router = useRouter();
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [result, setResult] = useState<GeneratedData | null>(null);
    const [copiedId, setCopiedId] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const [queueTopics, setQueueTopics] = useState<QueueTopic[]>([]);
    const [queueTopicInput, setQueueTopicInput] = useState("");
    const [queueLoading, setQueueLoading] = useState(false);
    const [queueMessage, setQueueMessage] = useState("");
    const [queueScheduledAt, setQueueScheduledAt] = useState("");

    const loadQueueTopics = async () => {
        setQueueLoading(true);

        try {
            const response = await fetch("/api/automation/topics", {
                cache: "no-store",
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || "Failed to load topic queue.");
            }

            setQueueTopics(data.topics ?? []);
        } catch (error) {
            setQueueMessage(
                error instanceof Error ? error.message : "Failed to load topic queue."
            );
        } finally {
            setQueueLoading(false);
        }
    };

    useEffect(() => {
        void loadQueueTopics();
    }, []);

    const handleAddQueueTopic = async () => {
        const value = queueTopicInput.trim();

        if (value.length < 3 || value.length > 200) {
            setQueueMessage("Topic must be between 3 and 200 characters.");
            return;
        }

        const scheduledDate = queueScheduledAt
            ? new Date(queueScheduledAt)
            : null;

        if (
            scheduledDate &&
            (Number.isNaN(scheduledDate.getTime()) ||
                scheduledDate.getTime() <= Date.now())
        ) {
            setQueueMessage("Please choose a future date and time.");
            return;
        }

        setQueueLoading(true);
        setQueueMessage("");

        try {
            const response = await fetch("/api/automation/topics", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic: value,
                    scheduledAt: scheduledDate?.toISOString(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || "Failed to add topic.");
            }

            setQueueTopicInput("");
            setQueueScheduledAt("");
            setQueueMessage("Topic added to the queue.");
            await loadQueueTopics();
        } catch (error) {
            setQueueMessage(
                error instanceof Error ? error.message : "Failed to add topic."
            );
        } finally {
            setQueueLoading(false);
        }
    };

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

        }
    };

    const isSuccessMessage = message === "Blog generated successfully.";

    const getStatusBadge = (status: QueueTopic["status"]) => {
        switch (status) {
            case "completed":
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        Completed
                    </span>
                );
            case "processing":
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                        Processing
                    </span>
                );
            case "failed":
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                        Failed
                    </span>
                );
            case "pending":
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                        Pending
                    </span>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#090d16] text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-zinc-100 relative">
            {/* Top subtle ambient glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-500/[0.04] via-indigo-500/[0.02] to-transparent blur-3xl -z-10"
            />

            {/* Header */}
            <header className="sticky top-0 z-30 w-full border-b border-zinc-800/80 bg-[#090d16]/85 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <Link
                            href="/"
                            className="flex items-center gap-2.5 text-zinc-100 hover:text-white transition-colors group shrink-0"
                        >
                            <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-950 font-bold text-xs flex items-center justify-center tracking-tight shadow-sm group-hover:scale-105 transition-transform">
                                GJ
                            </div>
                            <span className="text-sm sm:text-base font-semibold tracking-tight text-zinc-200 group-hover:text-white">
                                GJ Tech Blog
                            </span>
                        </Link>
                        <div className="h-3.5 w-px bg-zinc-800 hidden sm:block" />
                        <span className="text-xs font-medium text-zinc-400 hidden sm:inline truncate">
                            AI Blog Automation
                        </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-300 bg-zinc-900/80 border border-zinc-800 shadow-sm">
                            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="hidden xs:inline">Admin</span>
                        </div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-zinc-800/60 hover:border-zinc-700 transition-colors disabled:opacity-50 cursor-pointer"
                            title="Sign out of Admin Dashboard"
                        >
                            {loggingOut ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-400" />
                            ) : (
                                <LogOut className="w-3.5 h-3.5 text-zinc-400" />
                            )}
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
                {/* Page Introduction Hero */}
                <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-semibold tracking-wider uppercase text-cyan-400 flex items-center gap-1.5">
                                    <Sparkles className="w-3 h-3" />
                                    AI Content Studio
                                </span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
                                AI Blog Automation
                            </h1>
                        </div>

                        <div className="self-start sm:self-center inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>AI Pipeline Ready</span>
                        </div>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                        Generate multilingual technical blog drafts with AI and review them directly in Sanity before publishing.
                    </p>
                </div>

                {/* Status Message Banner */}
                {message && (
                    <div
                        role="alert"
                        className={`rounded-xl p-4 border flex items-start gap-3 text-xs sm:text-sm transition-all shadow-sm ${isSuccessMessage
                            ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-200"
                            : "bg-rose-950/30 border-rose-500/30 text-rose-200"
                            }`}
                    >
                        {isSuccessMessage ? (
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 shrink-0 mt-0.5" />
                        )}
                        <div className="font-medium leading-relaxed break-words min-w-0 flex-1">
                            {message}
                        </div>
                    </div>
                )}

                {/* Section 1: Generate New Blog */}
                <section
                    aria-labelledby="workspace-heading"
                    className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-4 sm:p-6 lg:p-7 shadow-xl shadow-black/20 space-y-5 sm:space-y-6"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800/80">
                        <div>
                            <h2
                                id="workspace-heading"
                                className="text-base sm:text-lg font-semibold text-zinc-100 flex items-center gap-2"
                            >
                                <WandSparkles className="w-4 h-4 text-cyan-400" />
                                <span>Generate New Blog</span>
                            </h2>
                            <p className="text-xs text-zinc-400 mt-0.5">
                                Enter a topic to produce synchronized English, Gujarati, and Hindi drafts.
                            </p>
                        </div>
                    </div>

                    {/* Topic Form Field */}
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <label
                                htmlFor="blog-topic"
                                className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
                            >
                                Blog Topic
                            </label>
                            <span className="text-[11px] text-zinc-400 font-mono bg-zinc-800/60 px-2 py-0.5 rounded border border-zinc-700/50">
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
                            placeholder="e.g., Understanding React Server Components and Server Actions"
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm sm:text-base text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed font-normal shadow-inner"
                        />

                        {/* Example helper */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 pt-0.5">
                            <span className="text-zinc-500 font-medium">Suggestion:</span>
                            <button
                                type="button"
                                onClick={() => setTopic("React Server Components Explained for Beginners")}
                                disabled={loading}
                                className="text-zinc-300 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-700/50 transition-colors cursor-pointer disabled:pointer-events-none text-left break-words max-w-full"
                            >
                                React Server Components Explained for Beginners
                            </button>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-zinc-800/80">
                        <p className="text-xs text-zinc-400 flex items-center gap-1.5 order-2 sm:order-1">
                            <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                            <span>Outputs 3 localized drafts directly into Sanity Content Lake.</span>
                        </p>

                        <button
                            type="button"
                            onClick={handleGenerate}
                            disabled={loading}
                            className="order-1 sm:order-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-950 bg-zinc-100 hover:bg-white active:scale-[0.99] transition-all shadow-md shadow-white/5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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

                {/* Section 2: Topic Queue */}
                <section
                    aria-labelledby="topic-queue-heading"
                    className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-4 sm:p-6 lg:p-7 shadow-xl shadow-black/20 space-y-5 sm:space-y-6"
                >
                    <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2.5">
                                <h2
                                    id="topic-queue-heading"
                                    className="text-base sm:text-lg font-semibold text-zinc-100"
                                >
                                    Topic Queue
                                </h2>
                                {queueTopics.length > 0 && (
                                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                                        {queueTopics.length}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-zinc-400 mt-1 truncate">
                                Add topics for scheduled multilingual blog generation.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => void loadQueueTopics()}
                            disabled={queueLoading}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-800/40 hover:bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
                            title="Refresh topic queue"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${queueLoading ? "animate-spin" : ""}`} />
                            <span className="hidden xs:inline">{queueLoading ? "Loading..." : "Refresh"}</span>
                        </button>
                    </div>

                    {/* Queue Form: Responsive Grid */}
                    <form
                        className="space-y-3"
                        onSubmit={(event) => {
                            event.preventDefault();
                            void handleAddQueueTopic();
                        }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-end">
                            <div className="md:col-span-6 lg:col-span-7 space-y-1.5">
                                <label
                                    htmlFor="queue-topic-input"
                                    className="block text-xs font-medium text-zinc-300"
                                >
                                    Blog Topic
                                </label>
                                <input
                                    id="queue-topic-input"
                                    value={queueTopicInput}
                                    onChange={(event) => setQueueTopicInput(event.target.value)}
                                    placeholder="Enter a technical blog topic to queue..."
                                    maxLength={200}
                                    className="w-full min-w-0 rounded-xl border border-zinc-800 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition shadow-inner"
                                />
                            </div>

                            <div className="md:col-span-4 lg:col-span-3 space-y-1.5">
                                <label
                                    htmlFor="queue-scheduled-at"
                                    className="block text-xs font-medium text-zinc-300"
                                >
                                    Schedule Date & Time
                                </label>
                                <input
                                    id="queue-scheduled-at"
                                    type="datetime-local"
                                    value={queueScheduledAt}
                                    onChange={(event) => setQueueScheduledAt(event.target.value)}
                                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition shadow-inner [color-scheme:dark]"
                                />
                            </div>

                            <div className="md:col-span-2 lg:col-span-2">
                                <button
                                    type="submit"
                                    disabled={queueLoading}
                                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-white active:scale-[0.99] transition disabled:opacity-50 cursor-pointer shadow-sm"
                                >
                                    {queueLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                                            <span>Adding...</span>
                                        </>
                                    ) : (
                                        <span>Add Topic</span>
                                    )}
                                </button>
                            </div>
                        </div>

                        <p className="text-[11px] text-zinc-500">
                            Leave schedule empty to process using the automatic queue runner.
                        </p>
                    </form>

                    {/* Queue Message Banner */}
                    {queueMessage && (
                        <div
                            role="status"
                            className="rounded-lg p-3 bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2"
                        >
                            <AlertCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span className="break-words">{queueMessage}</span>
                        </div>
                    )}

                    {/* Queue List */}
                    <div className="space-y-3 pt-1">
                        {queueTopics.length === 0 && !queueLoading ? (
                            <div className="rounded-xl border border-dashed border-zinc-800 p-8 text-center space-y-2">
                                <Clock3 className="w-6 h-6 text-zinc-600 mx-auto" />
                                <p className="text-sm text-zinc-400 font-medium">No topics in the queue yet</p>
                                <p className="text-xs text-zinc-500">Add technical ideas above to schedule them for automated creation.</p>
                            </div>
                        ) : (
                            queueTopics.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700/80 transition-colors p-4"
                                >
                                    <div className="min-w-0 flex-1 space-y-1.5">
                                        <p className="break-words text-sm font-semibold text-zinc-100 leading-snug">
                                            {item.topic}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                                            <span className="inline-flex items-center gap-1.5 text-zinc-500">
                                                <Clock3 className="w-3 h-3 text-zinc-500" />
                                                <span>Added {new Date(item.createdAt).toLocaleString()}</span>
                                            </span>

                                            {item.scheduledAt && (
                                                <span className="inline-flex items-center gap-1.5 text-sky-400 font-medium">
                                                    <Calendar className="w-3 h-3 text-sky-400" />
                                                    <span>Scheduled for {new Date(item.scheduledAt).toLocaleString()}</span>
                                                </span>
                                            )}
                                        </div>

                                        {item.error && (
                                            <p className="mt-2 break-words text-xs text-rose-300 bg-rose-950/30 border border-rose-500/20 rounded-md p-2">
                                                {item.error}
                                            </p>
                                        )}
                                    </div>

                                    <div className="shrink-0 self-start sm:self-center">
                                        {getStatusBadge(item.status)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Section 3: Generation in Progress (Loading State) */}
                {loading && (
                    <section
                        aria-live="polite"
                        className="rounded-2xl border border-cyan-500/30 bg-zinc-900/40 backdrop-blur-sm p-5 sm:p-6 space-y-4 shadow-xl shadow-cyan-950/10"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                                    AI Pipeline in Progress
                                </span>
                            </div>
                            <span className="text-xs text-zinc-400 font-mono bg-zinc-800/60 px-2 py-0.5 rounded border border-zinc-700/50">
                                3 language targets
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-cyan-500/30 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-2 text-xs font-medium text-zinc-100">
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                                        EN
                                    </span>
                                    <span>English</span>
                                </div>
                                <span className="inline-flex items-center gap-1.5 text-xs text-cyan-300">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    <span>Generating...</span>
                                </span>
                            </div>

                            <div className="p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800/70 flex items-center justify-between opacity-70">
                                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800/80 text-zinc-400">
                                        GU
                                    </span>
                                    <span>Gujarati</span>
                                </div>
                                <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                                    <Clock3 className="w-3 h-3" />
                                    <span>Waiting...</span>
                                </span>
                            </div>

                            <div className="p-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800/70 flex items-center justify-between opacity-70">
                                <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800/80 text-zinc-400">
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

                {/* Section 4: Generation Result Area */}
                {result && (
                    <section aria-labelledby="results-heading" className="space-y-5 pt-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
                            <div>
                                <h2
                                    id="results-heading"
                                    className="text-base sm:text-lg font-semibold text-zinc-100 flex items-center gap-2"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                    <span>Generated Drafts</span>
                                </h2>
                                <p className="text-xs text-zinc-400 mt-0.5">
                                    3 language drafts created successfully in Sanity Content Lake
                                </p>
                            </div>

                            {/* Translation ID Tag & Copy Button */}
                            {result.translationId && (
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-300 self-start sm:self-center">
                                    <span className="text-zinc-500 text-[11px] uppercase tracking-wider font-sans">
                                        Translation ID:
                                    </span>
                                    <span className="truncate max-w-[130px] sm:max-w-none select-all text-zinc-200">
                                        {result.translationId}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => copyTranslationId(result.translationId)}
                                        className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
                                        title="Copy Translation ID"
                                    >
                                        {copiedId ? (
                                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5 text-zinc-400" />
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* 3-Column Responsive Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                            {/* English Card */}
                            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:border-cyan-500/40 transition-all p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-lg shadow-black/20">
                                <div className="space-y-3.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 rounded-md text-xs font-bold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                EN
                                            </span>
                                            <span className="text-xs text-zinc-300 font-medium">English</span>
                                        </div>

                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/40">
                                            <FileText className="w-3 h-3 text-zinc-400" />
                                            <span>Sanity Draft</span>
                                        </span>
                                    </div>

                                    <h3 className="text-sm sm:text-base font-semibold text-zinc-100 leading-snug break-words">
                                        {result.blogs.english.title}
                                    </h3>

                                    <div className="space-y-1.5">
                                        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
                                            Slug
                                        </span>
                                        <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-950/80 border border-zinc-800/80 text-xs font-mono text-zinc-300 select-all overflow-hidden">
                                            <Hash className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                                            <span className="truncate">{result.slugs.english}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-zinc-800/60">
                                    <button
                                        type="button"
                                        onClick={() => openDraft(result.blogs.english.id)}
                                        className="group w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-zinc-200 hover:text-white bg-zinc-800/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-600 transition-all cursor-pointer shadow-sm"
                                    >
                                        <span>Open in Studio</span>
                                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            {/* Gujarati Card */}
                            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:border-emerald-500/40 transition-all p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-lg shadow-black/20">
                                <div className="space-y-3.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 rounded-md text-xs font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                GU
                                            </span>
                                            <span className="text-xs text-zinc-300 font-medium">ગુજરાતી</span>
                                        </div>

                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/40">
                                            <FileText className="w-3 h-3 text-zinc-400" />
                                            <span>Sanity Draft</span>
                                        </span>
                                    </div>

                                    <h3 className="text-sm sm:text-base font-semibold text-zinc-100 leading-snug break-words">
                                        {result.blogs.gujarati.title}
                                    </h3>

                                    <div className="space-y-1.5">
                                        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
                                            Slug
                                        </span>
                                        <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-950/80 border border-zinc-800/80 text-xs font-mono text-zinc-300 select-all overflow-hidden">
                                            <Hash className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                                            <span className="truncate">{result.slugs.gujarati}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-zinc-800/60">
                                    <button
                                        type="button"
                                        onClick={() => openDraft(result.blogs.gujarati.id)}
                                        className="group w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-zinc-200 hover:text-white bg-zinc-800/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-600 transition-all cursor-pointer shadow-sm"
                                    >
                                        <span>Open in Studio</span>
                                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            {/* Hindi Card */}
                            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:border-violet-500/40 transition-all p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-lg shadow-black/20 md:col-span-2 lg:col-span-1">
                                <div className="space-y-3.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 rounded-md text-xs font-bold tracking-wider uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20">
                                                HI
                                            </span>
                                            <span className="text-xs text-zinc-300 font-medium">हिन्दी</span>
                                        </div>

                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/40">
                                            <FileText className="w-3 h-3 text-zinc-400" />
                                            <span>Sanity Draft</span>
                                        </span>
                                    </div>

                                    <h3 className="text-sm sm:text-base font-semibold text-zinc-100 leading-snug break-words">
                                        {result.blogs.hindi.title}
                                    </h3>

                                    <div className="space-y-1.5">
                                        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">
                                            Slug
                                        </span>
                                        <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-950/80 border border-zinc-800/80 text-xs font-mono text-zinc-300 select-all overflow-hidden">
                                            <Hash className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                                            <span className="truncate">{result.slugs.hindi}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-zinc-800/60">
                                    <button
                                        type="button"
                                        onClick={() => openDraft(result.blogs.hindi.id)}
                                        className="group w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-zinc-200 hover:text-white bg-zinc-800/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-600 transition-all cursor-pointer shadow-sm"
                                    >
                                        <span>Open in Studio</span>
                                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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