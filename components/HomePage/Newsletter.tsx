'use client';

import React, { useState } from 'react';

import {
  Mail,
  Sparkles,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

import { useToast } from '@/context/ToastContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      showToast(
        'Please provide a valid developer email address',
        'error'
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: trimmedEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        showToast(
          data.message || 'Unable to subscribe. Please try again.',
          'error'
        );
        return;
      }

      setSubscribed(true);
      setEmail('');

      if (data.alreadySubscribed) {
        showToast(
          "You're already subscribed to GJ Tech.",
          'info'
        );
      } else {
        showToast(
          'Welcome to GJ Tech! Practical insights incoming.',
          'success'
        );
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);

      showToast(
        'Something went wrong. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter-section"
      className="py-16 sm:py-24 relative overflow-hidden"
    >
      {/* Background visual accents */}
      <div className="absolute inset-0 tech-grid-pattern opacity-30 pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl p-8 sm:p-14 text-center shadow-2xl space-y-6">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            WEEKLY ARCHITECTURAL DISPATCH
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans leading-tight">
            Level Up Your Development
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Get practical tutorials, developer tips and technology insights
            delivered straight to your inbox. Zero spam. Pure engineering.
          </p>

          {/* Form */}
          {subscribed ? (
            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-3 max-w-lg mx-auto">
              <CheckCircle2 className="w-6 h-6 shrink-0" />

              <div className="text-left text-sm font-medium">
                <p className="font-bold">
                  Subscription confirmed!
                </p>

                <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80">
                  You are now part of the GJ Tech community.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@company.com"
                  disabled={loading}
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm font-mono shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span>Join the Newsletter</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono pt-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Unsubscribe anytime with 1-click. Never shared.</span>
          </div>

        </div>
      </div>
    </section>
  );
}