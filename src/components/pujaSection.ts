import type { PujaEvent } from '../types.ts';

const PUJA_EVENTS: PujaEvent[] = [
  { id: 'mangala',    icon: '🌅', nameHindi: 'मंगला आरती',    nameEnglish: 'Mangala Aarti',    time: '5:00 AM',  days: 'Daily' },
  { id: 'abhishek',  icon: '🪔', nameHindi: 'अभिषेक',         nameEnglish: 'Abhishek Puja',    time: '7:00 AM',  days: 'Daily' },
  { id: 'bhog',      icon: '🌸', nameHindi: 'भोग आरती',       nameEnglish: 'Bhog Aarti',       time: '12:00 PM', days: 'Daily' },
  { id: 'sandhya',   icon: '🌆', nameHindi: 'संध्या आरती',    nameEnglish: 'Sandhya Aarti',    time: '6:00 PM',  days: 'Daily' },
  { id: 'shringaar', icon: '🌺', nameHindi: 'श्रृंगार आरती',  nameEnglish: 'Shringaar Aarti',  time: '7:30 PM',  days: 'Daily' },
  { id: 'shayan',    icon: '🌙', nameHindi: 'शयन आरती',       nameEnglish: 'Shayan Aarti',     time: '9:00 PM',  days: 'Daily' },
  { id: 'navratri',  icon: '🔱', nameHindi: 'नवरात्रि विशेष', nameEnglish: 'Navratri Special', time: '4:00 AM',  days: 'Navratri only' },
  { id: 'rudrabhishek', icon: '⚡', nameHindi: 'रुद्राभिषेक', nameEnglish: 'Rudrabhishek',    time: '6:00 AM',  days: 'Monday & Ashtami' },
];

function renderCard(p: PujaEvent): string {
  return `
    <div class="puja-card fade-in">
      <div class="puja-icon">${p.icon}</div>
      <div class="puja-name">${p.nameHindi}</div>
      <div class="puja-time">${p.nameEnglish}</div>
      <div class="puja-time" style="font-size:1.2rem;font-weight:700;margin-top:6px;">${p.time}</div>
      <div class="puja-days">${p.days}</div>
    </div>`;
}

export function initPujaSection(): void {
  const grid = document.getElementById('pujaGrid');
  if (!grid) return;
  grid.innerHTML = PUJA_EVENTS.map(renderCard).join('');
}
