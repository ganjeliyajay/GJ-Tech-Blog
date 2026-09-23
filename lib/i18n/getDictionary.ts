import type { Locale } from "./config";

import en from "./dictionaries/en.json";
import gu from "./dictionaries/gu.json";
import hi from "./dictionaries/hi.json";

const dictionaries = {
  en,
  gu,
  hi,
} as const;

export async function getDictionary(locale: Locale) {
  return dictionaries[locale];
}