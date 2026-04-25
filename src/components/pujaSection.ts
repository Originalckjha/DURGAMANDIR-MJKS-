import type { PujaEvent } from '../types.ts';

interface PujaEventWithHour extends PujaEvent {
  hourStart: number;
  minStart: number;
}

const PUJA_EVENTS: PujaEventWithHour[] = [
  { id: 'navratri',     icon: '🔱', nameHindi: 'नवरात्रि विशेष', nameEnglish: 'Navratri Special', time: '4:00 AM',  days: 'Navratri only',    hourStart: 4,  minStart: 0  },
  { id: 'mangala',      icon: '🌅', nameHindi: 'मंगला आरती',     nameEnglish: 'Mangala Aarti',    time: '5:00 AM',  days: 'Daily',            hourStart: 5,  minStart: 0  },
  { id: 'rudrabhishek', icon: '⚡', nameHindi: 'रुद्राभिषेक',    nameEnglish: 'Rudrabhishek',     time: '6:00 AM',  days: 'Monday & Ashtami', hourStart: 6,  minStart: 0  },
  { id: 'abhishek',     icon: '🪔', nameHindi: 'अभिषेक',          nameEnglish: 'Abhishek Puja',    time: '7:00 AM',  days: 'Daily',            hourStart: 7,  minStart: 0  },
  { id: 'bhog',         icon: '🌸', nameHindi: 'भोग आरती',        nameEnglish: 'Bhog Aarti',       time: '12:00 PM', days: 'Daily',            hourStart: 12, minStart: 0  },
  { id: 'sandhya',      icon: '🌆', nameHindi: 'संध्या आरती',     nameEnglish: 'Sandhya Aarti',    time: '6:00 PM',  days: 'Daily',            hourStart: 18, minStart: 0  },
  { id: 'shringaar',    icon: '🌺', nameHindi: 'श्रृंगार आरती',   nameEnglish: 'Shringaar Aarti',  time: '7:30 PM',  days: 'Daily',            hourStart: 19, minStart: 30 },
  { id: 'shayan',       icon: '🌙', nameHindi: 'शयन आरती',        nameEnglish: 'Shayan Aarti',     time: '9:00 PM',  days: 'Daily',            hourStart: 21, minStart: 0  },
];

function getCurrentPujaIndex(): number {
  const now   = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const window = 60; // highlight within 60 min window after start

  const dailyEvents = PUJA_EVENTS.filter(p => p.days === 'Daily');
  for (let i = 0; i < dailyEvents.length; i++) {
    const startMin = dailyEvents[i].hourStart * 60 + dailyEvents[i].minStart;
    const endMin   = i + 1 < dailyEvents.length
      ? dailyEvents[i + 1].hourStart * 60 + dailyEvents[i + 1].minStart
      : startMin + window;
    if (nowMin >= startMin && nowMin < Math.min(endMin, startMin + window)) {
      return PUJA_EVENTS.findIndex(p => p.id === dailyEvents[i].id);
    }
  }
  return -1;
}

function renderCard(p: PujaEventWithHour, isCurrent: boolean): string {
  return `
    <div class="puja-card fade-in${isCurrent ? ' puja-current' : ''}">
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
  const currentIdx = getCurrentPujaIndex();
  grid.innerHTML = PUJA_EVENTS.map((p, i) => renderCard(p, i === currentIdx)).join('');
}
