(() => {
document.documentElement.classList.remove('no-js');
const menu=document.querySelector('.menu'),nav=document.querySelector('#navigation');
const close=()=>{nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Ouvrir le menu');};
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){close();menu.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.new-nav'))close();});
const buttons=document.querySelectorAll('[data-example]');
buttons.forEach(button=>button.addEventListener('click',()=>buttons.forEach(item=>{const active=item===button;item.classList.toggle('selected',active);item.setAttribute('aria-pressed',String(active));document.getElementById(item.dataset.example).hidden=!active;})));

// Respect system preferences and provide a visible pause for decorative motion.
const motionControl = document.querySelector('#motion-toggle');
const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = preference.matches;
function applyMotion() {
  document.body.classList.toggle('motion-paused', paused);
  if (motionControl) {
    motionControl.setAttribute('aria-pressed', String(paused));
    motionControl.setAttribute('aria-label', paused ? 'Activer les animations' : 'Mettre les animations en pause');
    motionControl.textContent = paused ? 'Activer le mouvement ↗' : 'Pause mouvement Ⅱ';
  }
}
applyMotion();
motionControl?.addEventListener('click', () => { paused = !paused; applyMotion(); });
preference.addEventListener('change', event => { paused = event.matches; applyMotion(); });
if ('IntersectionObserver' in window && motionControl) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('entered');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.manifesto h2, .manifesto-bottom, .heading, .steps article, .new-pricing, .new-faq').forEach(section => {
    section.classList.add('in-view-animate');
    observer.observe(section);
  });
  document.body.classList.add('motion-ready');
}
})();

// Each preview control exposes its selected state without an automatic carousel.
const deliveryButtons=document.querySelectorAll('[data-delivery]');
deliveryButtons.forEach(button=>button.addEventListener('click',()=>deliveryButtons.forEach(item=>{const active=item===button;item.classList.toggle('selected',active);item.setAttribute('aria-pressed',String(active));document.getElementById(item.dataset.delivery).hidden=!active;})));
const mobileIntake=document.querySelector('.mobile-intake');
if(mobileIntake&&'IntersectionObserver' in window){let heroVisible=true,contactVisible=false;const refresh=()=>mobileIntake.hidden=heroVisible||contactVisible;const stickyObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.target.id==='hero')heroVisible=entry.isIntersecting;if(entry.target.id==='contact')contactVisible=entry.isIntersecting;});refresh();});stickyObserver.observe(document.getElementById('hero'));stickyObserver.observe(document.getElementById('contact'));}
