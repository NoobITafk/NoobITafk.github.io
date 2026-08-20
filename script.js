document.getElementById('year').textContent = new Date().getFullYear();

const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const navTargets = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(entries => {
    const current = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
    if (!current) return;
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${current.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
    });
  }, { rootMargin:'-20% 0px -65% 0px', threshold:[0.01,.2,.5] });
  navTargets.forEach(section => navObserver.observe(section));
}

const faqItems = [...document.querySelectorAll('.faq details')];
faqItems.forEach(item => item.addEventListener('toggle', () => {
  if (!item.open) return;
  faqItems.forEach(other => { if (other !== item && other.open) other.open = false; });
}));
