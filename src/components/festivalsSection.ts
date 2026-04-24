import type { Festival } from '../types.ts';

const FESTIVALS: Festival[] = [
  {
    id: 'navratri-sharad',
    icon: '🔱',
    nameHindi: 'शारदीय नवरात्रि',
    nameEnglish: 'Sharadiya Navratri',
    month: 'Ashwin',
    dateRange: 'Oct (9 days)',
    description: 'The grand nine-night festival of Maa Durga — the most celebrated event at our temple with special puja, jagran, and community gatherings.',
    isMain: true,
  },
  {
    id: 'navratri-chaitra',
    icon: '🌸',
    nameHindi: 'चैत्र नवरात्रि',
    nameEnglish: 'Chaitra Navratri',
    month: 'Chaitra',
    dateRange: 'Mar–Apr (9 days)',
    description: 'Spring Navratri celebration marking the Maithili New Year with special rituals and Mithila cultural programs.',
    isMain: true,
  },
  {
    id: 'durga-puja',
    icon: '🪔',
    nameHindi: 'दुर्गा पूजा',
    nameEnglish: 'Durga Puja',
    month: 'Ashwin',
    dateRange: 'Oct (5 days)',
    description: 'Saptami to Dashami — the heart of Maithili celebration, with elaborate decoration, Mithila painting exhibitions, and processions.',
    isMain: true,
  },
  {
    id: 'sama-chakeva',
    icon: '🐦',
    nameHindi: 'सामा-चकेवा',
    nameEnglish: 'Sama Chakeva',
    month: 'Kartika',
    dateRange: 'Nov (7 days)',
    description: 'A unique Maithili folk festival celebrating the bond between siblings — featuring clay figurines and traditional songs.',
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
    month: 'Magha',
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
    description: 'A Maithili bridal festival where newly married women worship Lord Shiva and Goddess Parvati with Mithila rituals.',
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

function renderCard(f: Festival): string {
  return `
    <div class="festival-card fade-in${f.isMain ? ' festival-main' : ''}">
      <div class="festival-icon">${f.icon}</div>
      <div class="festival-name">${f.nameHindi}</div>
      <div class="festival-date">${f.nameEnglish} &nbsp;·&nbsp; ${f.dateRange}</div>
      <p class="festival-desc">${f.description}</p>
    </div>`;
}

export function initFestivalsSection(): void {
  const grid = document.getElementById('festivalsGrid');
  if (!grid) return;
  grid.innerHTML = FESTIVALS.map(renderCard).join('');
}
