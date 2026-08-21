const modal=document.getElementById('contactModal');
const openButtons=document.querySelectorAll('.contact-open');
const closeButtons=document.querySelectorAll('.contact-close');
const messageField=document.getElementById('contactMessage');
function openContact(platform='telegram'){
  if(!modal)return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  modal.dataset.platform=platform;
  window.setTimeout(()=>messageField?.focus(),120);
}
function closeContact(){
  if(!modal)return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
openButtons.forEach(b=>b.addEventListener('click',()=>openContact(b.dataset.platform||'telegram')));
closeButtons.forEach(b=>b.addEventListener('click',closeContact));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeContact()});

function buildMessage(){
  const message=(messageField?.value||'').trim();
  return message || (document.documentElement.lang==='en' ? 'Hi! I have a project and would like to discuss it with you.' : 'Привіт! Є проєкт, який хочу обговорити.');
}

document.querySelectorAll('[data-send]').forEach(button=>button.addEventListener('click',()=>{
  const message=buildMessage();
  const method=button.dataset.send;
  if(method==='telegram'){
    const url='https://t.me/MaksBlischik?text='+encodeURIComponent(message);
    window.open(url,'_blank','noopener,noreferrer');
  }else if(method==='email'){
    const subject=document.documentElement.lang==='en'?'Project inquiry':'Запит щодо проєкту';
    const url='mailto:maks2006bl@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(message);
    window.location.href=url;
  }
}));

const links=[...document.querySelectorAll('nav a[href^="#"]')];
const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window&&sections.length){
  const io=new IntersectionObserver(entries=>{
    const visible=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(visible)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+visible.target.id));
  },{rootMargin:'-20% 0px -65% 0px',threshold:[0,.1,.3,.6]});
  sections.forEach(s=>io.observe(s));
}

const revealTargets=document.querySelectorAll('.how-grid article,.project,.capabilities article,.platform');
if('IntersectionObserver' in window&&revealTargets.length){
  revealTargets.forEach((el,i)=>{el.classList.add('reveal-on-scroll');el.style.setProperty('--delay',`${Math.min(i*40,240)}ms`)});
  const rio=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');rio.unobserve(entry.target)}}),{threshold:.12});
  revealTargets.forEach(el=>rio.observe(el));
}
