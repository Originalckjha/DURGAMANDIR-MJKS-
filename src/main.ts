import { initNav }             from './components/nav.ts';
import { initPujaSection }     from './components/pujaSection.ts';
import { initGallerySection }  from './components/gallerySection.ts';
import { initFestivalsSection } from './components/festivalsSection.ts';
import { initSamitiSection }   from './components/samitiSection.ts';
import { initContactSection }  from './components/contactSection.ts';
import { createDurgaArt, createLotusArt, renderFishRow } from './components/svgArt.ts';

function initAboutArt(): void {
  const el = document.getElementById('aboutArt');
  if (el) el.innerHTML = createDurgaArt();
}

function initScrollAnimations(): void {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function initBackToTop(): void {
  const btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.innerHTML = '🔱';
  btn.title = 'Back to top';
  btn.style.cssText = `
    position:fixed; bottom:28px; right:28px; z-index:999;
    width:48px; height:48px; border-radius:50%;
    background:#B5121B; color:#FFD700; border:2px solid #D4A017;
    font-size:1.4rem; cursor:pointer; opacity:0;
    transition:opacity 0.3s ease, transform 0.3s ease;
    box-shadow:0 4px 16px rgba(181,18,27,0.4);
    display:flex; align-items:center; justify-content:center;
    line-height:1;
  `;
  document.body.appendChild(btn);

  let rafPending = false;
  window.addEventListener('scroll', () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      const visible = window.scrollY > 400;
      btn.style.opacity = visible ? '1' : '0';
      btn.style.transform = visible ? 'scale(1)' : 'scale(0.8)';
      btn.style.pointerEvents = visible ? 'auto' : 'none';
    });
  });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initPageLoader(): void {
  const loader = document.createElement('div');
  loader.id = 'pageLoader';
  loader.style.cssText = `
    position:fixed; inset:0; z-index:9999;
    background:#7B0D0D;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    gap:16px; transition:opacity 0.6s ease;
  `;
  loader.innerHTML = `
    <div style="font-size:3.5rem; animation:spin 2s linear infinite;">🔱</div>
    <div style="font-family:'Tiro Devanagari Hindi',serif; color:#FFD700; font-size:1.4rem; letter-spacing:0.06em;">
      जय माता दुर्गा
    </div>
    <div style="color:#E8D9B0; font-size:0.9rem; opacity:0.75; font-family:'Crimson Text',serif;">
      Mithila Durgamandir — Est. 1945
    </div>
    <style>@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }</style>
  `;
  document.body.prepend(loader);

  window.addEventListener('load', () => {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 650);
  });
}

function initScrollProgress(): void {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  let rafPending = false;
  window.addEventListener('scroll', () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      const scrollTop    = window.scrollY;
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width    = `${pct}%`;
    });
  });
}

function animateCounter(el: HTMLElement, target: number, duration = 1200): void {
  const start = performance.now();
  const update = (now: number) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toString() + (target >= 1000 ? '' : '+');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initStatCounters(): void {
  const statEls = document.querySelectorAll<HTMLElement>('.stat-num');
  const targets: Record<string, number> = { '80+': 80, '1945': 1945, '365': 365 };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el   = entry.target as HTMLElement;
      const text = el.textContent ?? '';
      const key  = Object.keys(targets).find(k => text.includes(k.replace('+', '')));
      if (key) {
        el.classList.add('counted');
        animateCounter(el, targets[key]);
      }
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => observer.observe(el));
}

function initFooterYear(): void {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear().toString();
}

function initHeroLotusDecor(): void {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return;
  const decor = document.createElement('div');
  decor.style.cssText = `
    position:absolute; top:50%; right:3vw; transform:translateY(-50%);
    width:clamp(120px,14vw,200px); opacity:0.18; pointer-events:none;
  `;
  decor.innerHTML = createLotusArt();
  hero.appendChild(decor);

  const decorLeft = decor.cloneNode(true) as HTMLElement;
  decorLeft.style.right = 'auto';
  decorLeft.style.left  = '3vw';
  hero.appendChild(decorLeft);
}

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initNav();
  initAboutArt();
  renderFishRow('fishRow', 7);
  initPujaSection();
  initGallerySection();
  initFestivalsSection();
  initSamitiSection();
  initContactSection();
  initHeroLotusDecor();
  initBackToTop();
  initScrollProgress();
  initStatCounters();
  initFooterYear();

  // scroll animations run after a tick so elements are painted first
  requestAnimationFrame(initScrollAnimations);
});
