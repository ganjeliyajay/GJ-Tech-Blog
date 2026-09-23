import type {
    Metadata,
    Viewport,
} from "next";

import { notFound } from "next/navigation";

import { ToastProvider } from "@/context/ToastContext";

import Footer from "@/components/Global/Footer";
import Navbar from "@/components/Global/Navbar";

import {
    locales,
    isValidLocale,
    type Locale,
} from "@/lib/i18n/config";

interface LocaleLayoutProps {
    children: React.ReactNode;

    params: Promise<{
        locale: string;
    }>;
}

export async function generateStaticParams() {
    return locales.map((locale) => ({
        locale,
    }));
}

export async function generateMetadata({
    params,
}: LocaleLayoutProps): Promise<Metadata> {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        return {};
    }

    const localeMetadata: Record<
        Locale,
        {
            title: string;
            description: string;
            ogLocale: string;
        }
    > = {
        en: {
            title: "GJ Tech — Developer Blog",

            description:
                "GJ Tech is a developer publication featuring practical tutorials, insights, and guides on React, Next.js, JavaScript, TypeScript, Node.js, AI, APIs, and modern web development.",

            ogLocale: "en_IN",
        },

        gu: {
            title: "GJ Tech — Developer Blog",

            description:
                "GJ Tech પર React, Next.js, JavaScript, TypeScript, Node.js, AI, APIs અને modern web development વિશે practical tutorials અને guides.",

            ogLocale: "gu_IN",
        },

        hi: {
            title: "GJ Tech — Developer Blog",

            description:
                "GJ Tech पर React, Next.js, JavaScript, TypeScript, Node.js, AI, APIs और modern web development से जुड़े practical tutorials और guides.",

            ogLocale: "hi_IN",
        },
    };

    const current = localeMetadata[locale];

    return {
        title: {
            default: current.title,
            template: "%s | GJ Tech",
        },

        description: current.description,

        keywords: [
            "GJ Tech",
            "developer blog",
            "web development",
            "JavaScript",
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "AI",
            "MERN",
            "frontend development",
            "backend development",
            "software development",
            "programming tutorials",
        ],

        authors: [
            {
                name: "Ganjeliya Jay",
            },
        ],

        creator: "Ganjeliya Jay",

        publisher: "GJ Tech",

        applicationName: "GJ Tech",

        icons: {
            icon: "/icon.svg",
            shortcut: "/icon.svg",
            apple: "/icon.svg",
        },

        openGraph: {
            type: "website",

            locale: current.ogLocale,

            siteName: "GJ Tech",

            title: current.title,

            description: current.description,

            images: [
                {
                    url: "/opengraph-image.png",

                    width: 1200,

                    height: 630,

                    alt: "GJ Tech — Developer Blog",
                },
            ],
        },

        twitter: {
            card: "summary_large_image",

            title: current.title,

            description: current.description,

            images: [
                "/opengraph-image.png",
            ],
        },

        robots: {
            index: true,

            follow: true,

            googleBot: {
                index: true,

                follow: true,

                "max-image-preview": "large",

                "max-snippet": -1,

                "max-video-preview": -1,
            },
        },

        category: "technology",

        alternates: {
            canonical: `/${locale}`,

            languages: {
                en: "/en",
                gu: "/gu",
                hi: "/hi",
            },
        },
    };
}

export const viewport: Viewport = {
    width: "device-width",

    initialScale: 1,

    maximumScale: 5,
};

export default async function LocaleLayout({
    children,
    params,
}: LocaleLayoutProps) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        notFound();
    }

    return (
        <ToastProvider>
            <Navbar />

            {children}

            <Footer />
        </ToastProvider>
    );
}