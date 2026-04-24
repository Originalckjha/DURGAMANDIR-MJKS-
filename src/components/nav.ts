export function initNav(): void {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const header = document.getElementById('header');

  hamburger?.addEventListener('click', (e: Event) => {
    e.stopPropagation();
    nav?.classList.toggle('open');
  });

  // close nav when a link is clicked
  nav?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  // close nav when clicking outside
  document.addEventListener('click', (e: Event) => {
    if (nav?.classList.contains('open') &&
        !nav.contains(e.target as Node) &&
        e.target !== hamburger) {
      nav.classList.remove('open');
    }
  });

  // sticky header shadow — throttled with rAF
  let shadowRafPending = false;
  window.addEventListener('scroll', () => {
    if (shadowRafPending) return;
    shadowRafPending = true;
    requestAnimationFrame(() => {
      shadowRafPending = false;
      if (!header) return;
      header.style.boxShadow = window.scrollY > 10
        ? '0 4px 20px rgba(0,0,0,0.18)'
        : '0 2px 12px rgba(0,0,0,0.12)';
    });
  });

  // active nav link on scroll
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const links    = document.querySelectorAll<HTMLAnchorElement>('.nav-link');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const active = document.querySelector<HTMLAnchorElement>(`.nav-link[href="#${entry.target.id}"]`);
          active?.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
}
