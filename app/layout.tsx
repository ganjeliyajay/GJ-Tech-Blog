import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import { ToastProvider } from "@/context/ToastContext";
import Footer from "@/components/Global/Footer";
import Navbar from "@/components/Global/Navbar";

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
  metadataBase: new URL("https://gj-tech-blog.vercel.app"),

  title: {
    default: "GJ Tech — Developer Blog",
    template: "%s | GJ Tech",
  },

  description:
    "GJ Tech is a developer publication featuring practical tutorials, insights, and guides on React, Next.js, JavaScript, TypeScript, Node.js, AI, APIs, and modern web development.",

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
    locale: "en_IN",
    url: "https://gj-tech-blog.vercel.app",
    siteName: "GJ Tech",

    title: "GJ Tech — Developer Blog",

    description:
      "Practical insights, tutorials, and ideas for developers building the modern web.",

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

    title: "GJ Tech — Developer Blog",

    description:
      "Practical insights, tutorials, and ideas for modern web developers.",

    images: ["/opengraph-image.png"],
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
        <ToastProvider>
          <Navbar />

          {children}

          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}