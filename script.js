document.getElementById('year').textContent = new Date().getFullYear();
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const active = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if (!active) return;
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + active.target.id));
  }, {rootMargin:'-20% 0px -65% 0px', threshold:[0,.1,.5]});
  sections.forEach(s => observer.observe(s));
}
