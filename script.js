const modal=document.getElementById('contactModal');
const openButtons=document.querySelectorAll('.contact-open');
const closeButtons=document.querySelectorAll('.contact-close');
function openContact(){if(!modal)return;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeContact(){if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
openButtons.forEach(b=>b.addEventListener('click',openContact));
closeButtons.forEach(b=>b.addEventListener('click',closeContact));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeContact();});
document.querySelectorAll('.options a').forEach(a=>a.addEventListener('click',closeContact));
const links=[...document.querySelectorAll('nav a[href^="#"]')];
const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window&&sections.length){const io=new IntersectionObserver(entries=>{const visible=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+visible.target.id));},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.1,.3,.6]});sections.forEach(s=>io.observe(s));}
// Hero copy is authored in each language's HTML. Do not rewrite it from JS.
// This keeps UA and EN pages independent and prevents one page's selectors from changing the other.
(function loadHeroStyles(){
  if(document.querySelector('link[data-hero-style]'))return;
  const link=document.createElement('link');link.rel='stylesheet';link.href='/hero.css';link.dataset.heroStyle='true';document.head.appendChild(link);
})();