import type { Festival } from '../types.ts';

const FESTIVALS: Festival[] = [
  {
    id: 'navratri-sharad',
    icon: '🔱',
    nameHindi: 'शारदीय नवरात्रि',
    nameEnglish: 'Sharadiya Navratri',
    month: 'Ashwin',
    dateRange: 'Oct (9 days)',
    description: 'The grand nine-night festival of Mata Durga — the most celebrated event at our temple with special puja, jagran, and community gatherings.',
    isMain: true,
  },
  {
    id: 'navratri-chaitra',
    icon: '🌸',
    nameHindi: 'चैत्र नवरात्रि',
    nameEnglish: 'Chaitra Navratri',
    month: 'Chaitra',
    dateRange: 'Mar–Apr (9 days)',
    description: 'Spring Navratri celebration marking the Mithila New Year with special rituals and Mithila cultural programs.',
    isMain: true,
  },
  {
    id: 'durga-puja',
    icon: '🪔',
    nameHindi: 'दुर्गा पूजा',
    nameEnglish: 'Durga Puja',
    month: 'Ashwin',
    dateRange: 'Oct (5 days)',
    description: 'Saptami to Dashami — the heart of Mithila celebration, with elaborate decoration, Mithila painting exhibitions, and processions.',
    isMain: true,
  },
  {
    id: 'sama-chakeva',
    icon: '🐦',
    nameHindi: 'सामा-चकेवा',
    nameEnglish: 'Sama Chakeva',
    month: 'Kartika',
    dateRange: 'Nov (7 days)',
    description: 'A unique Mithila folk festival celebrating the bond between siblings — featuring clay figurines and traditional songs.',
    isMain: false,
  },
  {
    id: 'chhath',
    icon: '☀️',
    nameHindi: 'छठ पूजा',
    nameEnglish: 'Chhath Puja',
    month: 'Kartika',
    dateRange: 'Oct–Nov (4 days)',
    description: 'The great sun worship festival — devotees offer arghya to the rising and setting sun at the sacred ghat near the temple.',
    isMain: true,
  },
  {
    id: 'vivah-panchami',
    icon: '💐',
    nameHindi: 'विवाह पञ्चमी',
    nameEnglish: 'Vivah Panchami',
    month: 'Margashirsha',
    dateRange: 'Dec (1 day)',
    description: 'Celebrates the divine marriage of Lord Ram and Sita — with great significance in Mithila as Sita is the daughter of Mithila.',
    isMain: false,
  },
  {
    id: 'madhushravani',
    icon: '🌿',
    nameHindi: 'मधुश्रावणी',
    nameEnglish: 'Madhushravani',
    month: 'Shravana',
    dateRange: 'Jul–Aug (13 days)',
    description: 'A Mithila bridal festival where newly married women worship Lord Shiva and Goddess Parvati with Mithila rituals.',
    isMain: false,
  },
  {
    id: 'diwali',
    icon: '✨',
    nameHindi: 'दीपावली',
    nameEnglish: 'Diwali',
    month: 'Kartika',
    dateRange: 'Oct–Nov (5 days)',
    description: 'Festival of lights celebrated with grand illumination of the temple, Lakshmi puja, and fireworks.',
    isMain: false,
  },
];

// Approximate month order for "next upcoming" detection
const MONTH_ORDER: Record<string, number> = {
  Chaitra: 3, Vaishakha: 4, Jyeshtha: 5, Ashadha: 6,
  Shravana: 7, Bhadrapada: 8, Ashwin: 9, Kartika: 10,
  Margashirsha: 11, Pausha: 12, Magha: 1, Phalguna: 2,
};

function getNextFestivalId(): string {
  const currentMonth = new Date().getMonth() + 1; // 1-12
  let bestId = '';
  let bestDiff = 13;
  for (const f of FESTIVALS) {
    const fMonth = MONTH_ORDER[f.month] ?? 0;
    const diff = ((fMonth - currentMonth + 12) % 12) || 12;
    if (diff < bestDiff) { bestDiff = diff; bestId = f.id; }
  }
  return bestId;
}

function renderCard(f: Festival, isNext: boolean): string {
  const classes = [
    'festival-card fade-in',
    f.isMain   ? 'festival-main'     : '',
    isNext     ? 'festival-upcoming' : '',
  ].filter(Boolean).join(' ');
  return `
    <div class="${classes}">
      ${isNext ? '<div class="festival-upcoming-badge">🗓 Coming Up</div>' : ''}
      <div class="festival-icon">${f.icon}</div>
      <div class="festival-name">${f.nameHindi}</div>
      <div class="festival-date">${f.nameEnglish} &nbsp;·&nbsp; ${f.dateRange}</div>
      <p class="festival-desc">${f.description}</p>
    </div>`;
}

export function initFestivalsSection(): void {
  const grid = document.getElementById('festivalsGrid');
  if (!grid) return;
  const nextId = getNextFestivalId();
  grid.innerHTML = FESTIVALS.map(f => renderCard(f, f.id === nextId)).join('');
}
