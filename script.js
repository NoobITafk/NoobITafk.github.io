const modal=document.getElementById('contactModal');
const openButtons=document.querySelectorAll('.contact-open');
const closeButtons=document.querySelectorAll('.contact-close');
function openContact(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeContact(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
openButtons.forEach(b=>b.addEventListener('click',openContact));
closeButtons.forEach(b=>b.addEventListener('click',closeContact));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeContact();});
document.querySelectorAll('.options a').forEach(a=>a.addEventListener('click',closeContact));
const links=[...document.querySelectorAll('nav a[href^="#"]')];
const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window){new IntersectionObserver(entries=>{const e=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(e)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));},{rootMargin:'-25% 0px -60% 0px',threshold:[0,.1,.5]}).observe(document.querySelector('#work'));sections.forEach(s=>s!==document.querySelector('#work')&&document.querySelectorAll('nav a[href="#'+s.id+'"]')[0]&&new IntersectionObserver(()=>{},{}).observe(s));}
