const html=document.documentElement;
const isEn=html.lang==='en';
const contactModal=document.getElementById('contactModal');
const menu=document.querySelector('.menu-toggle');
const mobileNav=document.getElementById('mobileNav');
const message=document.getElementById('contactMessage');
function openModal(){contactModal.classList.add('open');contactModal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>message?.focus(),80)}
function closeModal(){contactModal.classList.remove('open');contactModal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelectorAll('[data-contact]').forEach(el=>el.addEventListener('click',openModal));
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
menu?.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
mobileNav?.querySelectorAll('a,button').forEach(el=>el.addEventListener('click',()=>{mobileNav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
document.querySelectorAll('[data-send]').forEach(btn=>btn.addEventListener('click',()=>{const text=(message?.value||'').trim();if(!text){message?.focus();return}const prefix=isEn?'Hello, I found your portfolio.\n\n':'Вітаю! Знайшов ваш сайт-портфоліо.\n\n';const body=prefix+text;if(btn.dataset.send==='telegram'){window.open('https://t.me/MaksBlischik?text='+encodeURIComponent(body),'_blank','noopener,noreferrer')}else{window.location.href='mailto:maks2006bl@gmail.com?subject='+encodeURIComponent(isEn?'Portfolio project inquiry':'Запит щодо проєкту')+'&body='+encodeURIComponent(body)}}));
const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');reveal.unobserve(entry.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
window.addEventListener('scroll',()=>{document.body.classList.toggle('scrolled',window.scrollY>24)},{passive:true});