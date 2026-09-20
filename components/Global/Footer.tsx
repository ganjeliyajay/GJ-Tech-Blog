"use client"

import React from "react"
import Link from "next/link"
import { ArrowUp, Code2 } from "lucide-react"
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from "@/components/icons/SocialIcons"
import { useToast } from "@/context/ToastContext"

export default function Footer() {
  const { showToast } = useToast()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleConnectClick = (platform: string) => {
    showToast(`Opening ${platform} profile...`, "info")
  }

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#060911] text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-violet-600 font-mono font-black text-slate-950 text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                GJ
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
                  GJ Tech
                </span>
                <span className="block text-[10px] text-cyan-500 font-mono tracking-wider">
                  DEV PUBLICATION
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Building, learning and sharing ideas about the modern web. Curated
              tutorials, architectural teardowns, and deep-dive engineering
              manuals.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/ganjeliyajay/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleConnectClick("GitHub")}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-cyan-400 hover:border-cyan-500/40 transition"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/ganjeliya-jay/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleConnectClick("LinkedIn")}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-cyan-400 hover:border-cyan-500/40 transition"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/ganjeliya_jay_0745"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleConnectClick("Instagram")}
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
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/#articles"
                  className="hover:text-cyan-400 transition"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/#categories"
                  className="hover:text-cyan-400 transition"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-cyan-400 transition">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Topics */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Topics
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/#categories"
                  className="hover:text-cyan-400 transition"
                >
                  JavaScript
                </Link>
              </li>
              <li>
                <Link
                  href="/#categories"
                  className="hover:text-cyan-400 transition"
                >
                  React
                </Link>
              </li>
              <li>
                <Link
                  href="/#categories"
                  className="hover:text-cyan-400 transition"
                >
                  Next.js
                </Link>
              </li>
              <li>
                <Link
                  href="/#categories"
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
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://github.com/ganjeliyajay/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleConnectClick("GitHub")}
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
                  onClick={() => handleConnectClick("LinkedIn")}
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
                  onClick={() => handleConnectClick("Instagram")}
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
                Back to top
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div>© 2026 GJ Tech. Built with Next.js.</div>
          <div className="flex items-center gap-1">
            <span>Designed for builders</span>
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>by Ganjeliya Jay</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
