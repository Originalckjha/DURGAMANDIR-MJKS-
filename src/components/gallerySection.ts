import type { GalleryItem } from '../types.ts';
import { createLotusArt, createDurgaArt, createMandalaArt } from './svgArt.ts';

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', theme: 'durga',         titleHindi: 'माँ दुर्गा',          titleEnglish: 'Maa Durga',           description: 'The divine mother — painted in traditional Madhubani style.',                  colors: ['#B5121B','#D4A017','#1A0A00'] },
  { id: 'g2', theme: 'lotus',         titleHindi: 'कमल पुष्प',           titleEnglish: 'Sacred Lotus',        description: 'Symbol of purity and divine grace in Mithila tradition.',                     colors: ['#D4A017','#B5121B','#2D6A2D'] },
  { id: 'g3', theme: 'tree-of-life',  titleHindi: 'जीवन वृक्ष',          titleEnglish: 'Tree of Life',        description: 'The cosmic tree — a central motif in Mithila painting.',                      colors: ['#2D6A2D','#D4A017','#B5121B'] },
  { id: 'g4', theme: 'fish',          titleHindi: 'मत्स्य',              titleEnglish: 'Matsya — Sacred Fish', description: 'The fish (Matsya) is the most sacred symbol of Mithila culture.',              colors: ['#1A3A6B','#D4A017','#B5121B'] },
  { id: 'g5', theme: 'kohbar',        titleHindi: 'कोहबर कला',           titleEnglish: 'Kohbar Art',          description: 'Bridal chamber art — painted on auspicious occasions.',                        colors: ['#E8650A','#D4A017','#B5121B'] },
  { id: 'g6', theme: 'sun-moon',      titleHindi: 'सूर्य-चंद्र',          titleEnglish: 'Sun & Moon',          description: 'Celestial bodies — symbols of eternal time in Madhubani tradition.',             colors: ['#FFD700','#1A3A6B','#B5121B'] },
];

function buildArtForTheme(item: GalleryItem): string {
  switch (item.theme) {
    case 'durga':        return createDurgaArt();
    case 'lotus':        return createLotusArt();
    case 'tree-of-life': return createMandalaArt();
    case 'fish':         return buildFishPanel(item.colors);
    case 'kohbar':       return buildKohbarArt(item.colors);
    case 'sun-moon':     return buildSunMoonArt();
  }
}

function buildFishPanel(colors: string[]): string {
  const fishData = [
    { cx: 60,  cy: 60,  rx: 28, ry: 13, tail: [[90,60],[108,50],[108,70]], eyeX: 44 },
    { cx: 150, cy: 100, rx: 28, ry: 13, tail: [[178,100],[196,90],[196,110]], eyeX: 134 },
    { cx: 60,  cy: 150, rx: 28, ry: 13, tail: [[90,150],[108,140],[108,160]], eyeX: 44 },
  ];
  const svgFish = fishData.map((f, i) => `
    <ellipse cx="${f.cx}" cy="${f.cy}" rx="${f.rx}" ry="${f.ry}" fill="${colors[i % colors.length]}" stroke="#1A0A00" stroke-width="1.5"/>
    <polygon points="${f.tail.map(p=>p.join(',')).join(' ')}" fill="${colors[i%colors.length]}" stroke="#1A0A00" stroke-width="1.5"/>
    <circle cx="${f.eyeX}" cy="${f.cy - 4}" r="3" fill="#FDF6E3" stroke="#1A0A00" stroke-width="1"/>
    <circle cx="${f.eyeX}" cy="${f.cy - 4}" r="1.2" fill="#1A0A00"/>
  `).join('');
  return `<svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect width="220" height="200" fill="#FDF6E3"/>
    <rect x="4" y="4" width="212" height="192" rx="3" fill="none" stroke="#B5121B" stroke-width="2.5"/>
    ${svgFish}
    <text x="110" y="190" text-anchor="middle" font-family="serif" font-size="11" fill="#B5121B">मत्स्य — Matsya</text>
  </svg>`;
}

function buildKohbarArt(colors: string[]): string {
  const petals = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    const x = (100 + 55 * Math.cos(a)).toFixed(1);
    const y = (100 + 55 * Math.sin(a)).toFixed(1);
    return `<ellipse cx="${x}" cy="${y}" rx="16" ry="28"
      transform="rotate(${(i/8)*360} ${x} ${y})"
      fill="${colors[i%colors.length]}" stroke="#1A0A00" stroke-width="1.2" opacity="0.85"/>`;
  }).join('');
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect width="200" height="200" fill="#FDF6E3"/>
    ${petals}
    <circle cx="100" cy="100" r="26" fill="${colors[0]}" stroke="#1A0A00" stroke-width="2"/>
    <circle cx="100" cy="100" r="13" fill="${colors[1]}" stroke="#1A0A00" stroke-width="1.5"/>
    <text x="100" y="105" text-anchor="middle" font-size="13" fill="#FDF6E3" font-family="serif">ॐ</text>
    <rect x="4" y="4" width="192" height="192" rx="4" fill="none" stroke="${colors[0]}" stroke-width="2.5"/>
  </svg>`;
}

function buildSunMoonArt(): string {
  return `<svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect width="220" height="200" fill="#1A3A6B"/>
    <!-- stars -->
    ${Array.from({length:18},(_,i)=>{
      const x = (10 + (i*31)%200).toFixed(0);
      const y = (8 + (i*17)%90).toFixed(0);
      return `<circle cx="${x}" cy="${y}" r="1.5" fill="#FFD700" opacity="${0.4+0.6*(i%3)/2}"/>`;
    }).join('')}
    <!-- sun -->
    <circle cx="68" cy="110" r="38" fill="#FFD700" stroke="#E8650A" stroke-width="3"/>
    ${Array.from({length:12},(_,i)=>{
      const a = (i/12)*Math.PI*2;
      const x1=(68+42*Math.cos(a)).toFixed(1), y1=(110+42*Math.sin(a)).toFixed(1);
      const x2=(68+55*Math.cos(a)).toFixed(1), y2=(110+55*Math.sin(a)).toFixed(1);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFD700" stroke-width="2.5"/>`;
    }).join('')}
    <circle cx="68" cy="110" r="18" fill="#E8650A" stroke="#1A0A00" stroke-width="1.5"/>
    <!-- moon -->
    <circle cx="162" cy="100" r="32" fill="#E8D9B0" stroke="#D4A017" stroke-width="2.5"/>
    <circle cx="175" cy="90"  r="30" fill="#1A3A6B"/>
    <!-- moon craters -->
    <circle cx="148" cy="112" r="4" fill="none" stroke="#D4A017" stroke-width="1" opacity="0.5"/>
    <circle cx="158" cy="95"  r="3" fill="none" stroke="#D4A017" stroke-width="1" opacity="0.5"/>
    <rect x="4" y="4" width="212" height="192" rx="3" fill="none" stroke="#D4A017" stroke-width="2"/>
    <text x="110" y="185" text-anchor="middle" font-size="11" fill="#FFD700" font-family="serif">सूर्य-चंद्र</text>
  </svg>`;
}

function renderCard(item: GalleryItem): string {
  return `
    <div class="gallery-card fade-in" role="button" tabindex="0" aria-label="${item.titleEnglish}">
      <div class="gallery-art">${buildArtForTheme(item)}</div>
      <div class="gallery-caption">
        <h4>${item.titleHindi}</h4>
        <p>${item.description}</p>
      </div>
    </div>`;
}

export function initGallerySection(): void {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.innerHTML = GALLERY_ITEMS.map(renderCard).join('');

  grid.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = (e.target as Element).closest<HTMLElement>('.gallery-card');
    if (card) {
      e.preventDefault();
      card.click();
    }
  });
}
