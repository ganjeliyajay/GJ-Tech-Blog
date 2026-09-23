"use client";

import {
    usePathname,
    useRouter,
} from "next/navigation";

import {
    Languages,
    Loader2,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import {
    locales,
    type Locale,
} from "@/lib/i18n/config";

const localeLabels: Record<
    Locale,
    string
> = {
    en: "English",
    gu: "ગુજરાતી",
    hi: "हिन्दी",
};

const localeShortLabels: Record<
    Locale,
    string
> = {
    en: "EN",
    gu: "ગુ",
    hi: "हि",
};

interface TranslationVariant {
    id: string;
    slug: string;
    title: string;
    language: Locale;
    translationId: string;
}

function getLocaleFromPathname(
    pathname: string
): Locale {
    const firstSegment =
        pathname.split("/")[1];

    if (
        locales.includes(
            firstSegment as Locale
        )
    ) {
        return firstSegment as Locale;
    }

    return "en";
}

function getBlogSlug(
    pathname: string
): string | null {
    const segments = pathname
        .split("/")
        .filter(Boolean);

    /*
     * Expected:
     *
     * /en/blog/my-post
     *
     * segments:
     * ["en", "blog", "my-post"]
     */

    if (
        segments.length >= 3 &&
        locales.includes(
            segments[0] as Locale
        ) &&
        segments[1] === "blog"
    ) {
        return segments[2];
    }

    return null;
}

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();

    const currentLocale =
        getLocaleFromPathname(pathname);

    const [isOpen, setIsOpen] =
        useState(false);

    const [
        translations,
        setTranslations,
    ] = useState<
        TranslationVariant[]
    >([]);

    const [
        isLoading,
        setIsLoading,
    ] = useState(false);

    const blogSlug =
        getBlogSlug(pathname);

    const isBlogPost =
        Boolean(blogSlug);

    /*
     * Load all translated versions
     * of the current article.
     */
    useEffect(() => {
        let cancelled = false;

        async function loadTranslations() {
            if (!blogSlug) {
                setTranslations([]);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);

                const response =
                    await fetch(
                        `/api/translations?slug=${encodeURIComponent(
                            blogSlug
                        )}`,
                        {
                            cache: "no-store",
                        }
                    );

                if (!response.ok) {
                    throw new Error(
                        "Failed to load translations"
                    );
                }

                const data =
                    await response.json();

                if (!cancelled) {
                    setTranslations(
                        Array.isArray(
                            data.variants
                        )
                            ? data.variants
                            : []
                    );
                }
            } catch (error) {
                console.error(
                    "Failed to load article translations:",
                    error
                );

                if (!cancelled) {
                    setTranslations([]);
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        loadTranslations();

        return () => {
            cancelled = true;
        };
    }, [blogSlug]);

    /*
     * Build the correct localized URL.
     */
    const getLocalizedPath = (
        nextLocale: Locale
    ): string => {
        /*
         * BLOG ARTICLE
         *
         * Example:
         *
         * Current:
         * /en/blog/react-guide
         *
         * Gujarati:
         * /gu/blog/react-guide-gu
         */
        if (isBlogPost) {
            const translatedArticle =
                translations.find(
                    (item) =>
                        item.language ===
                        nextLocale
                );

            /*
             * Translation exists.
             * Use BOTH:
             *
             * 1. nextLocale
             * 2. translated slug
             */
            if (translatedArticle) {
                return `/${nextLocale}/blog/${translatedArticle.slug}`;
            }

            /*
             * Translation does not exist.
             * Do not create an invalid combination
             * such as:
             *
             * /en/blog/gujarati-slug
             *
             * Instead go to localized homepage.
             */
            return `/${nextLocale}`;
        }

        /*
         * NORMAL PAGES / HOMEPAGE
         *
         * Example:
         * /en
         * -> /gu
         *
         * /en/#categories
         * -> /gu/#categories
         */

        const segments =
            pathname.split("/");

        if (
            locales.includes(
                segments[1] as Locale
            )
        ) {
            segments[1] = nextLocale;

            return (
                segments.join("/") ||
                `/${nextLocale}`
            );
        }

        return `/${nextLocale}${pathname === "/"
                ? ""
                : pathname
            }`;
    };

    const handleLocaleChange = (
        nextLocale: Locale
    ) => {
        /*
         * Already on selected language.
         */
        if (
            nextLocale === currentLocale
        ) {
            setIsOpen(false);
            return;
        }

        /*
         * For blog articles, wait until
         * translation data is available.
         */
        if (
            isBlogPost &&
            isLoading
        ) {
            return;
        }

        const nextPath =
            getLocalizedPath(
                nextLocale
            );

        setIsOpen(false);

        router.push(nextPath);
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() =>
                    setIsOpen(
                        (previous) =>
                            !previous
                    )
                }
                aria-label="Change language"
                aria-expanded={isOpen}
                className="flex items-center gap-2 rounded-lg border border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-900/70 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 backdrop-blur-md transition-all duration-200 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400"
            >
                <Languages className="h-4 w-4" />

                <span>
                    {
                        localeShortLabels[
                        currentLocale
                        ]
                    }
                </span>
            </button>

            {isOpen && (
                <>
                    <button
                        type="button"
                        aria-label="Close language menu"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() =>
                            setIsOpen(false)
                        }
                    />

                    <div className="absolute right-0 top-full z-50 mt-2 min-w-[170px] overflow-hidden rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-white dark:bg-slate-900 shadow-xl shadow-slate-900/10 dark:shadow-black/30 backdrop-blur-xl">
                        {locales.map(
                            (locale) => {
                                const active =
                                    locale ===
                                    currentLocale;

                                /*
                                 * On normal pages all
                                 * languages are available.
                                 *
                                 * On blog article pages,
                                 * only languages having
                                 * a translation are enabled.
                                 */
                                const translationAvailable =
                                    !isBlogPost ||
                                    locale ===
                                    currentLocale ||
                                    translations.some(
                                        (
                                            item
                                        ) =>
                                            item.language ===
                                            locale
                                    );

                                const disabled =
                                    isLoading ||
                                    !translationAvailable ||
                                    active;

                                return (
                                    <button
                                        key={locale}
                                        type="button"
                                        disabled={
                                            disabled
                                        }
                                        onClick={() =>
                                            handleLocaleChange(
                                                locale
                                            )
                                        }
                                        className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors duration-150 ${active
                                                ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                                                : disabled
                                                    ? "cursor-not-allowed text-slate-400 dark:text-slate-600"
                                                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                            }`}
                                    >
                                        <span>
                                            {
                                                localeLabels[
                                                locale
                                                ]
                                            }
                                        </span>

                                        {isLoading &&
                                            active ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : active ? (
                                            <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                                                ✓
                                            </span>
                                        ) : null}
                                    </button>
                                );
                            }
                        )}
                    </div>
                </>
            )}
        </div>
    );
}