import type { Metadata } from "next";
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
  title: "GJ Tech — IT & Developer Publication",
  description: "Practical insights, tutorials and architectural deep-dives for developers building the modern web. JavaScript, React, Next.js, TypeScript, Node.js, and AI engineering.",
  keywords: ["JavaScript", "React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Web Development", "AI Engineering"],
  authors: [{ name: "Ganjeliya Jay" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`} suppressHydrationWarning>
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
