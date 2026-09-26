export const SUPPORTED_LOCALES = ["zh-CN"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = "zh-CN";

export function normalizeLocale(locale?: string | null): SupportedLocale | null {
  if (!locale) return null;
  return /^zh(?:-|$)/i.test(locale.trim()) ? DEFAULT_LOCALE : null;
}

export function resolveAppLocale(_preferredLocale?: string | null, _browserLocale?: string | null): SupportedLocale {
  return DEFAULT_LOCALE;
}
