"use client";

import React from "react";
import Link from "next/link";

import { ArrowUp, Code2 } from "lucide-react";

import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from "@/components/icons/SocialIcons";

import { useToast } from "@/context/ToastContext";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { localizedPath } from "@/lib/i18n/routes";

import Image from "next/image";

export default function Footer() {
  const { showToast } = useToast();
  const { t, locale } = useTranslations();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleConnectClick = (platform: string) => {
    showToast(
      `${t.footer.opening} ${platform} ${t.footer.profile}...`,
      "info"
    );
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#060911] text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Col */}

          <div className="lg:col-span-2 space-y-4">
            <Link
              href={localizedPath(locale)}
              className="group inline-flex items-center gap-3"
            >
              {/* Logo */}

              <div className="relative flex items-center justify-center h-10 w-10 rounded-xl overflow-hidden bg-[#080c14] border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.35)] group-hover:scale-105 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all duration-300">
                <Image
                  src="/icon.svg"
                  alt="GJ Tech"
                  width={40}
                  height={40}
                  priority
                  className="h-10 w-10 object-contain scale-110"
                />
              </div>

              {/* Brand Text */}

              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-mono group-hover:text-cyan-400 transition-colors duration-300">
                  GJ Tech
                </span>

                <span className="block text-[10px] text-cyan-500 font-mono tracking-wider">
                  {t.footer.devPublication}
                </span>
              </div>
            </Link>

            {/* Description */}

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              {t.footer.description}
            </p>

            {/* Social Links */}

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/ganjeliyajay/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  handleConnectClick("GitHub")
                }
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-cyan-400 hover:border-cyan-500/40 transition"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/ganjeliya-jay/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  handleConnectClick("LinkedIn")
                }
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-cyan-400 hover:border-cyan-500/40 transition"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.instagram.com/ganjeliya_jay_0745"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  handleConnectClick("Instagram")
                }
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-cyan-400 hover:border-cyan-500/40 transition"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Links */}

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footer.explore}
            </h4>

            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href={`${localizedPath(locale)}/#categories`}
                  className="hover:text-cyan-400 transition"
                >
                  {t.footer.categories}
                </Link>
              </li>

              <li>
                <Link
                  href={`${localizedPath(locale)}/#categories`}
                  className="hover:text-cyan-400 transition"
                >
                  {t.footer.categories}
                </Link>
              </li>

              <li>
                <Link
                  href={`${localizedPath(locale)}/#about`}
                  className="hover:text-cyan-400 transition"
                >
                  {t.footer.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Topics */}

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footer.topics}
            </h4>

            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href={`${localizedPath(locale)}/#categories`}
                  className="hover:text-cyan-400 transition"
                >
                  JavaScript
                </Link>
              </li>

              <li>
                <Link
                  href={`${localizedPath(locale)}/#categories`}
                  className="hover:text-cyan-400 transition"
                >
                  React
                </Link>
              </li>

              <li>
                <Link
                  href={`${localizedPath(locale)}/#categories`}
                  className="hover:text-cyan-400 transition"
                >
                  Next.js
                </Link>
              </li>

              <li>
                <Link
                  href={`${localizedPath(locale)}/#categories`}
                  className="hover:text-cyan-400 transition"
                >
                  Node.js
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Top Button */}

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footer.connect}
            </h4>

            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://github.com/ganjeliyajay/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    handleConnectClick("GitHub")
                  }
                  className="hover:text-cyan-400 transition text-left inline-block"
                >
                  GitHub
                </a>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/ganjeliya-jay/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    handleConnectClick("LinkedIn")
                  }
                  className="hover:text-cyan-400 transition text-left inline-block"
                >
                  LinkedIn
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/ganjeliya_jay_0745"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    handleConnectClick("Instagram")
                  }
                  className="hover:text-cyan-400 transition text-left inline-block"
                >
                  Instagram
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono hover:text-cyan-400 hover:border-cyan-500/40 transition"
              >
                <ArrowUp className="w-3.5 h-3.5" />

                {t.footer.backToTop}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">

          <div>
            {t.footer.copyright}
          </div>

          <div className="flex items-center gap-1">
            <span>
              {t.footer.designedForBuilders}
            </span>

            <Code2 className="w-3.5 h-3.5 text-cyan-400" />

            <span>
              {t.footer.byAuthor}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}