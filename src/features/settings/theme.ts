import type { ThemeOption } from "./types";
import chroma from "chroma-js";
import { isTauri } from "@tauri-apps/api/core";
import { getCurrentWebview } from "@tauri-apps/api/webview";

export const DEFAULT_ACCENT_COLOR = "#2d5a3d";

export function normalizeAccentColor(value?: string | null): string {
  return value && /^#[0-9a-f]{6}$/i.test(value) ? value.toLowerCase() : DEFAULT_ACCENT_COLOR;
}

export function applyUiScale(value?: number): void {
  const scale = typeof value === "number" && Number.isFinite(value)
    ? Math.min(1.8, Math.max(0.8, value))
    : 1;
  localStorage.setItem("ui-scale", String(scale));
  if (isTauri()) {
    document.documentElement.style.zoom = "";
    void getCurrentWebview().setZoom(scale).catch(() => {
      document.documentElement.style.zoom = String(scale);
    });
  } else {
    document.documentElement.style.zoom = String(scale);
  }
}

export function applyAccentColor(value?: string | null): void {
  const root = document.documentElement;
  const color = normalizeAccentColor(value);
  const dark = root.getAttribute("data-theme") === "dark";
  if (color === DEFAULT_ACCENT_COLOR) {
    root.style.setProperty("--color-bamboo", dark ? "#4faa70" : "#2d5a3d");
    root.style.setProperty("--color-bamboo-light", dark ? "#5fc085" : "#3a7a52");
    root.style.setProperty("--color-bamboo-mist", dark ? "#1c2e22" : "#e8f0eb");
    root.style.setProperty("--color-bamboo-glow", dark ? "#243a2c" : "#d4e8da");
    localStorage.setItem("accent-color", color);
    return;
  }
  // Keep text and controls legible even when the chosen color is very light or dark.
  const primary = chroma(color).luminance(dark ? 0.32 : 0.14).hex();
  const secondary = chroma(color).luminance(dark ? 0.43 : 0.22).hex();
  const surface = dark ? "#1a1917" : "#ffffff";
  root.style.setProperty("--color-bamboo", primary);
  root.style.setProperty("--color-bamboo-light", secondary);
  root.style.setProperty("--color-bamboo-mist", chroma.mix(surface, primary, dark ? 0.17 : 0.1).hex());
  root.style.setProperty("--color-bamboo-glow", chroma.mix(surface, primary, dark ? 0.25 : 0.18).hex());
  localStorage.setItem("accent-color", color);
}

function resolveTheme(option: ThemeOption): "light" | "dark" {
  if (option === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return option;
}

export function applyTheme(option: ThemeOption, accentColor?: string): void {
  const root = document.documentElement;
  const resolved = resolveTheme(option);
  // Cache to localStorage so the blocking script in index.html can set
  // data-theme before first paint, preventing a flash of wrong theme.
  localStorage.setItem("theme-option", option);
  localStorage.setItem("theme-resolved", resolved);
  if (root.getAttribute("data-theme") !== resolved) {
    root.classList.add("theme-transition");
    root.setAttribute("data-theme", resolved);
    setTimeout(() => root.classList.remove("theme-transition"), 400);
  }
  applyAccentColor(accentColor ?? localStorage.getItem("accent-color"));
}

let systemListener: (() => void) | null = null;

export function watchSystemTheme(option: ThemeOption, accentColor?: string): () => void {
  if (systemListener) {
    systemListener();
    systemListener = null;
  }

  if (option !== "system") return () => {};

  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = () => applyTheme("system", accentColor);
  mql.addEventListener("change", handler);

  const cleanup = () => {
    mql.removeEventListener("change", handler);
    // 仅当自己仍是当前单例时才清空全局引用；否则会把后来者
    // （如设置面板刚注册的监听）的注销入口抹掉，造成监听泄漏
    if (systemListener === cleanup) {
      systemListener = null;
    }
  };
  systemListener = cleanup;
  return cleanup;
}
