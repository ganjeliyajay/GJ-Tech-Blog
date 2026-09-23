import type {
    Metadata,
    Viewport,
} from "next";

import {
    Inter,
    JetBrains_Mono,
} from "next/font/google";

import "@/app/globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(
        "https://gj-tech-blog.vercel.app"
    ),

    title: {
        default: "GJ Tech",
        template: "%s | GJ Tech",
    },

    description:
        "GJ Tech — Developer Blog",

    icons: {
        icon: "/icon.svg",
        shortcut: "/icon.svg",
        apple: "/icon.svg",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${jetbrainsMono.variable} dark`}
            suppressHydrationWarning
        >
            <body className="min-h-screen flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
                {children}
            </body>
        </html>
    );
}