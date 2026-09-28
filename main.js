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
  if (mobileIntake && hero && contact && 'IntersectionObserver' in window) {
    let heroVisible = true;
    let contactVisible = false;
    const refresh = () => { mobileIntake.hidden = heroVisible || contactVisible; };
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
})();
