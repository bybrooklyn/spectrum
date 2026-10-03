/**
 * Shared shape of every locale file. Only the core strings and the axes
 * table are required; everything else falls back to English at runtime
 * (see translateFor in locale.ts), so partial locales type-check.
 */
export interface AxisStrings {
  label: string;
  farLeft: string;
  left: string;
  middle: string;
  right: string;
  farRight: string;
}

export interface TranslationCredit {
  attribution: string;
  name: string;
  link?: string;
}

export interface RadarVertexStrings {
  label: string;
}

export interface Translation {
  title: string;
  description: string;
  keywords: string;
  generate: string;
  generateHelper: string;
  mine: string;
  skip: string;
  menu: string;
  translation?: TranslationCredit;
  rtl?: boolean;
  axes: Partial<Record<string, AxisStrings>>;
  scale?: { unset: string; value: string };
  radar?: {
    title: string;
    hint?: string;
    empty?: string;
    show?: string;
    hide?: string;
    vertices?: Partial<Record<string, RadarVertexStrings>>;
  };
  // Only hiddenNotice is rendered (legacy ?sfw=1 links); no SFW UI exists.
  sfw?: {
    hiddenNotice?: string;
  };
  share?: {
    copy?: string;
    copied?: string;
    text?: string;
  };
  disclaimer?: {
    header?: string;
    author?: string;
    issues?: string;
    examples?: string;
  };
  footer?: {
    source?: string;
    rights?: string;
  };
}

/** Translate function passed into components. */
export type TranslateFn = (key: string) => string;
