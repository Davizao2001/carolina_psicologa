/* Carolina Nunes — comportamento mínimo.
   O site funciona por completo sem este arquivo: ele só adiciona
   o menu mobile, o estado do header ao rolar e a entrada suave das seções. */
(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  const mobile = window.matchMedia('(max-width: 879px)');

  /* ---- Menu mobile ---- */
  if (toggle && nav) {
    toggle.hidden = false;
    root.classList.add('has-menu');

    const setOpen = open => {
      toggle.setAttribute('aria-expanded', String(open));
      header.classList.toggle('is-open', open);
    };

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', event => {
      if (event.target.closest('a') && mobile.matches) setOpen(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.site-header')) setOpen(false);
    });
    mobile.addEventListener('change', () => setOpen(false));
  }

  /* ---- Header ganha superfície ao rolar ---- */
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Entrada suave das seções ---- */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window) || !items.length) return;

  root.classList.add('can-reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  items.forEach(item => observer.observe(item));
})();
