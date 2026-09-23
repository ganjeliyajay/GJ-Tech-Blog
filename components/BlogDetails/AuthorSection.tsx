"use client";

import React from "react";

import {
  User,
  ArrowRight,
  BriefcaseBusiness,
} from "lucide-react";

import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  XIcon,
} from "@/components/icons/SocialIcons";

import { useToast } from "@/context/ToastContext";
import { Author } from "@/types/blog";
import { useTranslations } from "@/lib/i18n/useTranslations";

interface AuthorProps {
  author: Author;
}

export default function AuthorSection({
  author,
}: AuthorProps) {
  const { showToast } = useToast();
  const { t } = useTranslations();

  if (!author) return null;

  const handleSocialClick = (platform: string) => {
    showToast(
      `${t.authorSection.opening} ${platform} ${t.authorSection.profile}...`,
      "info"
    );
  };

  return (
    <section
      id="about"
      className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-slate-800/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-slate-950 p-8 sm:p-12 overflow-hidden shadow-2xl">

          {/* Subtle background glow */}

          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">

            {/* Left: Author Avatar & Quick Badges */}

            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">

              <div className="relative mb-6">

                {/* Glow ring */}

                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-70 blur-md animate-pulse" />

                <div
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-2xl bg-cover bg-center select-none"
                  style={{
                    backgroundImage: author.avatar
                      ? `url(${author.avatar})`
                      : undefined,
                  }}
                  onContextMenu={(e) =>
                    e.preventDefault()
                  }
                  draggable={false}
                  aria-label={author.name}
                />

                <div className="absolute bottom-1 right-2 px-2.5 py-1 rounded-full bg-slate-950 border border-cyan-500/40 text-[11px] font-mono font-bold text-cyan-300 shadow-md">
                  {t.authorSection.active}
                </div>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
                {author.name}
              </h3>

              <p className="text-sm font-mono text-cyan-600 dark:text-cyan-400 mt-1">
                {author.role}
              </p>

              {/* Social Link Badges */}

              <div className="flex items-center gap-2.5 mt-5">

                {author.socials?.github && (
                  <a
                    href={author.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      handleSocialClick("GitHub")
                    }
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:border-cyan-500/40 transition-colors shadow-sm"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}

                {author.socials?.linkedin && (
                  <a
                    href={author.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      handleSocialClick("LinkedIn")
                    }
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:border-cyan-500/40 transition-colors shadow-sm"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}

                {author.socials?.twitter && (
                  <a
                    href={author.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      handleSocialClick("X / Twitter")
                    }
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:border-cyan-500/40 transition-colors shadow-sm"
                    aria-label="Twitter Profile"
                  >
                    <XIcon className="w-4 h-4" />
                  </a>
                )}

                {author.socials?.instagram && (
                  <a
                    href={author.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      handleSocialClick("Instagram")
                    }
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:border-cyan-500/40 transition-colors shadow-sm"
                    aria-label="Instagram Profile"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}

              </div>
            </div>

            {/* Right: Author Bio, Technical Stacks & Vision */}

            <div className="lg:col-span-8 space-y-6">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold uppercase tracking-wider">
                <User className="w-3.5 h-3.5" />
                {t.authorSection.editorialPerspective}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans leading-tight">
                {t.authorSection.heading}
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                {author?.bio}
              </p>

              {/* Technology Badges */}

              <div>
                <span className="block text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  {t.authorSection.coreEngineeringArsenal}
                </span>

                <div className="flex flex-wrap gap-2">
                  {author?.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-xs hover:border-cyan-500/40 hover:text-cyan-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}

              {author.socials?.portfolio && (
                <div className="pt-2">
                  <a
                    href={author.socials?.portfolio || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-cyan-500/40 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-sm group"
                  >
                    <BriefcaseBusiness className="w-4 h-4" />

                    <span>
                      {t.authorSection.viewPortfolio}
                    </span>

                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}