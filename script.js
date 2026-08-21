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
(function optimizeHero(){
  const link=document.createElement('link');link.rel='stylesheet';link.href='/hero.css';document.head.appendChild(link);
  const ua=document.querySelector('.client-hero');
  if(ua){
    const h=ua.querySelector('h1');if(h)h.innerHTML='Є задача?<br>Потрібно <i>рішення.</i>';
    const p=ua.querySelector('.lead');if(p)p.textContent='Розкажіть, що має працювати або що зараз не працює. Технічні деталі не обов’язкові — я допоможу їх визначити.';
    const primary=ua.querySelector('.primary');if(primary){primary.textContent='Розповісти про задачу →';primary.setAttribute('plerdy-tracking-id','hero-brief-ua');primary.setAttribute('aria-label','Розповісти про задачу');}
    const secondary=ua.querySelector('.secondary');if(secondary){secondary.textContent='Побачити роботи ↓';secondary.setAttribute('plerdy-tracking-id','hero-work-ua');}
    const tags=ua.querySelector('.client-tags');if(tags)tags.innerHTML='<span>Сайт</span><span>Бот</span><span>Автоматизація</span><span>Інтеграція</span><span>Парсинг</span>';
  }
  const en=document.querySelector('.hero-main');
  if(en){
    const h=en.querySelector('h1');if(h)h.innerHTML='Have a task?<br>Let’s <em>build it.</em>';
    const p=en.querySelector('.hero-copy');if(p)p.textContent='Tell me what should happen or what is not working. You do not need to know the technology — I will help define the solution.';
    const primary=en.querySelector('.button-dark');if(primary){primary.textContent='Tell me what you need →';primary.setAttribute('plerdy-tracking-id','hero-brief-en');primary.setAttribute('aria-label','Tell me what you need');}
    const secondary=en.querySelector('.button-plain');if(secondary){secondary.textContent='See the work ↓';secondary.setAttribute('plerdy-tracking-id','hero-work-en');}
    const scope=document.querySelector('.scope-band');if(scope)scope.style.display='none';
  }
})();
