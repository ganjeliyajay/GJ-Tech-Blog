"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, Sparkles } from "lucide-react";
import Image from "next/image";

import SearchModal from "./SearchModal";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";

import { useTranslations } from "@/lib/i18n/useTranslations";
import { locales, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/routes";

type SectionId =
  | "home"
  | "categories"
  | "about";

type NavLink = {
  name: string;
  id: SectionId;
  href: string;
};

function getLocaleFromPathname(
  pathname: string
): Locale {
  const firstSegment = pathname.split("/")[1];

  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }

  return "en";
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState<SectionId>("home");

  const pathname = usePathname();
  const router = useRouter();

  const { t } = useTranslations();

  const currentLocale =
    getLocaleFromPathname(pathname);

  const isHomepage =
    pathname === `/${currentLocale}` ||
    pathname === `/${currentLocale}/`;

  const navLinks: NavLink[] = [
    {
      name: t.nav.home,
      id: "home",
      href: localizedPath(currentLocale),
    },
    {
      name: t.nav.categories,
      id: "categories",
      href: `${localizedPath(
        currentLocale
      )}/#categories`,
    },
    {
      name: t.nav.about,
      id: "about",
      href: `${localizedPath(
        currentLocale
      )}/#about`,
    },
  ];

  const sectionIds: SectionId[] = [
    "categories",
    "about",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        setSearchOpen((prev) => !prev);
        setMobileMenuOpen(false);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      searchOpen || mobileMenuOpen
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen, mobileMenuOpen]);

  useEffect(() => {
    if (!isHomepage) {
      return;
    }

    const updateActiveSection = () => {
      const scrollY = window.scrollY;

      if (scrollY < 300) {
        setActiveSection("home");
        return;
      }

      const offset = 140;

      let currentSection: SectionId = "home";

      for (const id of sectionIds) {
        const element =
          document.getElementById(id);

        if (!element) {
          continue;
        }

        const top =
          element.getBoundingClientRect().top +
          window.scrollY;

        if (scrollY + offset >= top) {
          currentSection = id;
        }
      }

      setActiveSection(currentSection);
    };

    const handleHashChange = () => {
      const hash =
        window.location.hash.replace("#", "");

      if (
        hash === "categories" ||
        hash === "about"
      ) {
        setActiveSection(
          hash as SectionId
        );
      } else {
        updateActiveSection();
      }
    };

    updateActiveSection();

    window.addEventListener(
      "scroll",
      updateActiveSection,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "hashchange",
      handleHashChange
    );

    window.addEventListener(
      "popstate",
      handleHashChange
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateActiveSection
      );

      window.removeEventListener(
        "hashchange",
        handleHashChange
      );

      window.removeEventListener(
        "popstate",
        handleHashChange
      );
    };
  }, [isHomepage]);

  const scrollToSection = (
    id: SectionId
  ) => {
    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setActiveSection("home");

      if (window.location.hash) {
        window.history.pushState(
          null,
          "",
          `/${currentLocale}`
        );
      }

      return;
    }

    const element =
      document.getElementById(id);

    if (!element) {
      return;
    }

    const offset = 90;

    const targetPosition =
      element.getBoundingClientRect().top +
      window.scrollY -
      offset;

    setActiveSection(id);

    window.history.pushState(
      null,
      "",
      `/${currentLocale}/#${id}`
    );

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    link: NavLink
  ) => {
    if (!isHomepage) {
      return;
    }

    event.preventDefault();

    scrollToSection(link.id);
  };

  const handleSubscribeClick = () => {
    const scrollToNewsletter = () => {
      const element =
        document.getElementById(
          "newsletter-section"
        );

      if (!element) {
        return;
      }

      const offset = 90;

      const targetPosition =
        element.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    };

    if (isHomepage) {
      scrollToNewsletter();
      return;
    }

    router.push(
      `/${currentLocale}/#newsletter-section`
    );

    setTimeout(() => {
      scrollToNewsletter();
    }, 500);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#080c14]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
            : "bg-[#080c14]/40 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={localizedPath(
              currentLocale
            )}
            className="group flex items-center gap-3"
            onClick={(event) => {
              if (isHomepage) {
                event.preventDefault();
                scrollToSection("home");
              }
            }}
          >
            <div className="relative flex items-center justify-center h-10 w-10 rounded-xl overflow-hidden bg-[#080c14] shadow-[0_0_20px_rgba(6,182,212,0.35)] group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all">
              <Image
                src="/icon.svg"
                alt="GJ Tech"
                width={40}
                height={40}
                className="h-10 w-10 object-contain scale-125"
                priority
              />

              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight font-mono text-white group-hover:text-cyan-400 transition-colors">
                GJ Tech
              </span>

              <span className="text-[10px] tracking-wider font-mono font-medium text-cyan-400/80 uppercase">
                DEV PUBLICATION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                isHomepage &&
                activeSection === link.id;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(event) =>
                    handleNavClick(
                      event,
                      link
                    )
                  }
                  aria-current={
                    isActive
                      ? "page"
                      : undefined
                  }
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-cyan-400 font-semibold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.name}

                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="navbar-search-btn"
              type="button"
              onClick={() => {
                setSearchOpen(true);
                setMobileMenuOpen(false);
              }}
              aria-label="Search articles (Cmd+K)"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-cyan-500/40 text-slate-400 hover:text-slate-200 transition group text-xs"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />

              <span className="font-sans">
                {t.nav.search}...
              </span>

              <kbd className="ml-1.5 px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">
                ⌘K
              </kbd>
            </button>

            <button
              id="navbar-subscribe-btn"
              type="button"
              onClick={
                handleSubscribeClick
              }
              className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)]"
            >
              <Sparkles className="w-3.5 h-3.5" />

              {t.newsletter.subscribe}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => {
                setSearchOpen(true);
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition-colors"
              aria-label="Open search"
            >
              <Search className="w-4 h-4 text-cyan-400" />
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(true);
                setSearchOpen(false);
              }}
              className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white transition-colors"
              aria-label="Open navigation menu"
              aria-expanded={
                mobileMenuOpen
              }
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() =>
          setSearchOpen(false)
        }
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() =>
          setMobileMenuOpen(false)
        }
        activeSection={activeSection}
        onNavigateSection={(id) => {
          setMobileMenuOpen(false);

          if (!isHomepage) {
            router.push(
              id === "home"
                ? localizedPath(
                    currentLocale
                  )
                : `${localizedPath(
                    currentLocale
                  )}/#${id}`
            );

            return;
          }

          scrollToSection(
            id as SectionId
          );
        }}
        onOpenSearch={() => {
          setMobileMenuOpen(false);
          setSearchOpen(true);
        }}
        onOpenSubscribe={() => {
          setMobileMenuOpen(false);
          handleSubscribeClick();
        }}
      />
    </>
  );
}