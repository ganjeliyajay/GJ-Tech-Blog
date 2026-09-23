import type { Locale } from "./config";

export function localizedPath(
  locale: Locale,
  path: string = ""
) {
  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  if (normalizedPath === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalizedPath}`;
}