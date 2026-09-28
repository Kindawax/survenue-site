(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#navigation');
  const closeMenu = () => {
    nav?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Ouvrir le menu');
  };
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav?.classList.contains('open')) {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.new-nav')) closeMenu(); });

  const mobileIntake = document.querySelector('.mobile-intake');
  const hero = document.querySelector('#hero');
  const contact = document.querySelector('#contact');
  const navAction = document.querySelector('.nav-action');
  if (mobileIntake && hero && contact && 'IntersectionObserver' in window) {
    let heroVisible = true;
    let contactVisible = false;
    let nudged = false;
    mobileIntake.hidden = false;
    const refresh = () => {
      const away = heroVisible || contactVisible;
      mobileIntake.classList.toggle('is-away', away);
      mobileIntake.inert = away;
      if (!heroVisible && !nudged && navAction) {
        nudged = true;
        navAction.classList.add('sv-nudge');
      }
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === contact) contactVisible = entry.isIntersecting;
      });
      refresh();
    });
    observer.observe(hero);
    observer.observe(contact);
  }

  // Scroll progress, nav shadow and active section link.
  const header = document.querySelector('.new-nav');
  let ticking = false;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    header?.style.setProperty('--sv-progress', max > 0 ? (scrollY / max).toFixed(4) : 0);
    header?.classList.toggle('is-scrolled', scrollY > 8);
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  const navLinks = [...(nav?.querySelectorAll('a[href^="#"]') || [])];
  if (navLinks.length && 'IntersectionObserver' in window) {
    const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(section => spy.observe(section));
  }

  // Motion layer: only when the visitor accepts animation.
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('sv-motion');

  const groups = [
    '.new-section .heading', '.delivery .heading', '.qualification > .label, .qualification > h2',
    '.real-example__intro', '.delivery-summary article', '.quality-grid article', '.audience-grid article',
    '.method .heading', '.steps article', '.method-foot', '.sv-cta-band__inner',
    '.offer-comparison-details', '.new-pricing .offer', '.pricing-note p',
    '.new-faq > div:first-child', '.faq details', '.founder > *', '.new-contact .wrap > :not(.contact-star)'
  ];
  const revealed = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      revealed.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: .08 });
  groups.forEach(selector => document.querySelectorAll(selector).forEach((el, index) => {
    el.classList.add('sv-reveal');
    const siblings = el.parentElement ? [...el.parentElement.children].filter(child => child.matches(selector)) : [];
    el.style.setProperty('--sv-delay', `${Math.min(siblings.indexOf(el), 5) * 0.09}s`);
    revealed.observe(el);
  }));
  const sheet = document.querySelector('.real-example__sheet');
  if (sheet) {
    sheet.querySelectorAll('dl > div').forEach((row, index) => {
      row.style.transitionDelay = row.style.animationDelay = `${0.15 + index * 0.1}s`;
    });
    revealed.observe(sheet);
  }
  const steps = document.querySelector('.method .steps');
  if (steps) revealed.observe(steps);

  // Gentle 3D tilt of the hero card for precise pointers.
  const card = document.querySelector('.clarity-card');
  const visual = document.querySelector('.clarity-hero__visual');
  if (card && visual && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    visual.addEventListener('pointermove', event => {
      const box = visual.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      card.style.transform = `perspective(1100px) rotateY(${x * 7}deg) rotateX(${-y * 6}deg)`;
    });
    visual.addEventListener('pointerleave', () => { card.style.transform = ''; });
  }
})();
