import { describe, expect, test } from "vitest";
import {
  SUPPORTED_LOCALES,
  normalizeLocale,
  resolveAppLocale,
} from "./locale-whitelist";

describe("locale whitelist", () => {
  test("normalizes supported locales and known aliases", () => {
    expect(normalizeLocale("zh-CN")).toBe("zh-CN");
    expect(normalizeLocale("zh-cn")).toBe("zh-CN");
    expect(normalizeLocale("zh-TW")).toBe("zh-CN");
    expect(normalizeLocale("en-GB")).toBeNull();
  });

  test("supports only simplified Chinese", () => {
    expect(SUPPORTED_LOCALES).toEqual(["zh-CN"]);
  });

  test("returns null for unsupported locales", () => {
    expect(normalizeLocale("fr-FR")).toBeNull();
    expect(normalizeLocale("")).toBeNull();
    expect(normalizeLocale(undefined)).toBeNull();
  });

  test("uses simplified Chinese for stored and browser locales", () => {
    expect(resolveAppLocale("en-US", "zh-CN")).toBe("zh-CN");
    expect(resolveAppLocale(undefined, "zh-HK")).toBe("zh-CN");
    expect(resolveAppLocale(undefined, "fr-FR")).toBe("zh-CN");
  });
});
