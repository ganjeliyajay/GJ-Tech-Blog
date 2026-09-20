'use client';

import React, { useState } from 'react';
import { Share2, Link2, Check, MessageCircle } from 'lucide-react';
import { LinkedinIcon, XIcon } from '@/components/icons/SocialIcons';
import { useToast } from '@/context/ToastContext';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const getUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/blog/${slug}`;
    }
    return `https://gj-tech.dev/blog/${slug}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      showToast('Link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('Failed to copy link', 'error');
    }
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(getUrl());
    const text = encodeURIComponent(`Read "${title}" by @GanjeliyaJay on GJ Tech`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(getUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const url = encodeURIComponent(getUrl());
    const text = encodeURIComponent(`Check out this article: "${title}" - ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5 text-cyan-400" />
        Share:
      </span>

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition shadow-xs"
        aria-label="Copy article link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Copied</span>
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* Twitter / X */}
      <button
        onClick={handleShareTwitter}
        className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition shadow-xs"
        aria-label="Share on X"
        title="Share on X (Twitter)"
      >
        <XIcon className="w-3.5 h-3.5" />
      </button>

      {/* LinkedIn */}
      <button
        onClick={handleShareLinkedIn}
        className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition shadow-xs"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <LinkedinIcon className="w-3.5 h-3.5" />
      </button>

      {/* WhatsApp */}
      <button
        onClick={handleShareWhatsApp}
        className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition shadow-xs"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
