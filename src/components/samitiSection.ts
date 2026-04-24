import type { SamitiActivity } from '../types.ts';
import { createMandalaArt } from './svgArt.ts';

const ACTIVITIES: SamitiActivity[] = [
  { id: 'a1', label: 'Temple Management & Daily Puja' },
  { id: 'a2', label: 'Mithila Painting Workshops' },
  { id: 'a3', label: 'Mithila Language Promotion' },
  { id: 'a4', label: 'Festival Organization' },
  { id: 'a5', label: 'Community Welfare Programs' },
  { id: 'a6', label: 'Free Medical Camps' },
  { id: 'a7', label: 'Cultural Heritage Preservation' },
  { id: 'a8', label: 'Scholarship for Students' },
];

export function initSamitiSection(): void {
  const list = document.getElementById('samitiList');
  if (list) {
    list.innerHTML = ACTIVITIES.map(a => `<li>✦ ${a.label}</li>`).join('');
  }

  const art = document.getElementById('samitiArt');
  if (art) {
    art.innerHTML = createMandalaArt();
  }
}
