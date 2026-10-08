"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    AlertCircle,
    Loader2,
} from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || "Login failed.");
            }

            router.push("/admin/ai-blog");
            router.refresh();
        } catch (error) {
            setError(error instanceof Error ? error.message : "Login failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#090d16] text-zinc-100 flex flex-col justify-between items-center p-4 sm:p-6 font-sans selection:bg-zinc-800 selection:text-zinc-100">
            {/* Top Minimal Brand Bar */}
            <div className="w-full max-w-sm flex justify-center pt-4 sm:pt-8">
                <Link
                    href="/"
                    className="flex items-center gap-2.5 text-zinc-300 hover:text-white transition-colors group"
                >
                    <div className="w-7 h-7 rounded-md bg-zinc-100 text-zinc-950 font-bold text-xs flex items-center justify-center tracking-tight shadow-sm">
                        GJ
                    </div>
                    <span className="text-sm font-semibold tracking-tight">
                        GJ Tech Blog
                    </span>
                </Link>
            </div>

            {/* Centered Login Panel */}
            <div className="w-full max-w-sm my-auto py-8">
                <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-black/40 space-y-6">
                    {/* Header */}
                    <div className="space-y-1.5 text-left">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400">
                                Admin Portal
                            </span>
                        </div>
                        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
                            Welcome back
                        </h1>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            Sign in to manage your AI-powered blog automation.
                        </p>
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div
                            role="alert"
                            className="rounded-lg p-3 border border-rose-500/20 bg-rose-950/20 text-rose-300 text-xs flex items-start gap-2.5 transition-colors"
                        >
                            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                            <span className="font-medium leading-relaxed">{error}</span>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="email"
                                className="block text-xs font-medium text-zinc-300 uppercase tracking-wider"
                            >
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="Enter your admin email"
                                    autoComplete="email"
                                    disabled={loading}
                                    required
                                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/30 transition disabled:opacity-60 disabled:cursor-not-allowed font-normal"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="password"
                                className="block text-xs font-medium text-zinc-300 uppercase tracking-wider"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                                    <LockKeyhole className="w-4 h-4" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    disabled={loading}
                                    required
                                    className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/30 transition disabled:opacity-60 disabled:cursor-not-allowed font-normal"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    disabled={loading}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer disabled:pointer-events-none"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Sign in button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-950 bg-zinc-100 hover:bg-white active:bg-zinc-200 transition shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin text-zinc-900" />
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign in</span>
                                        <ArrowRight className="w-4 h-4 text-zinc-900" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Security Indicator */}
                    <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-center gap-1.5 text-zinc-400 text-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Protected Admin Area</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full max-w-sm text-center pb-4 text-xs text-zinc-400">
                <span>GJ Tech Blog · Admin Portal</span>
            </footer>
        </main>
    );
}