import zhCN from "./zh-CN/translation.json";

export interface TranslationTree {
  [key: string]: string | TranslationTree;
}

export const translationOverrides = { "zh-CN": zhCN } as const;
export const resolvedTranslations = translationOverrides;
export const resources = { "zh-CN": { translation: zhCN } } as const;
