// ── Puja / Aarti ─────────────────────────────────────────────
export interface PujaEvent {
  id: string;
  icon: string;
  nameHindi: string;
  nameEnglish: string;
  time: string;
  days: string;
}

// ── Gallery ───────────────────────────────────────────────────
export type MithilaTheme =
  | 'durga'
  | 'lotus'
  | 'fish'
  | 'tree-of-life'
  | 'sun-moon'
  | 'kohbar';

export interface GalleryItem {
  id: string;
  theme: MithilaTheme;
  titleHindi: string;
  titleEnglish: string;
  description: string;
  colors: string[];
}

// ── Festival ──────────────────────────────────────────────────
export type FestivalMonth =
  | 'Chaitra' | 'Vaishakha' | 'Ashadha' | 'Shravana'
  | 'Bhadrapada' | 'Ashwin' | 'Kartika' | 'Margashirsha'
  | 'Pausha' | 'Magha' | 'Phalguna';

export interface Festival {
  id: string;
  icon: string;
  nameHindi: string;
  nameEnglish: string;
  month: FestivalMonth;
  dateRange: string;
  description: string;
  isMain: boolean;
}

// ── Samiti ────────────────────────────────────────────────────
export interface SamitiActivity {
  id: string;
  label: string;
}

// ── Contact ───────────────────────────────────────────────────
export interface ContactDetail {
  id: string;
  icon: string;
  heading: string;
  lines: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface FormValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

// ── SVG Art ───────────────────────────────────────────────────
export interface SvgPaletteConfig {
  primary: string;
  secondary: string;
  accent: string;
  outline: string;
  bg: string;
}

export interface FishMotif {
  color: string;
  flip: boolean;
}
