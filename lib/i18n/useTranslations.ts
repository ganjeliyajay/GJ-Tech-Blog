"use client";

import { usePathname } from "next/navigation";

import en from "./dictionaries/en.json";
import gu from "./dictionaries/gu.json";
import hi from "./dictionaries/hi.json";

import {
  defaultLocale,
  isValidLocale,
  type Locale,
} from "./config";

const dictionaries = {
  en,
  gu,
  hi,
} as const;

export function useTranslations() {
  const pathname = usePathname();

  const firstSegment = pathname.split("/")[1];

  const locale: Locale = isValidLocale(firstSegment)
    ? firstSegment
    : defaultLocale;

  return {
    t: dictionaries[locale],
    locale,
  };
}