const isEN=document.documentElement.lang==='en';
const AVAILABLE=true;
const modal=document.getElementById('contactModal');
const dialog=modal?.querySelector('.dialog');
const message=document.getElementById('message');

function loadProjectPreviewStyles(){
  if(document.querySelector('link[data-project-preview]'))return;
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href='/projects-preview.css';
  link.dataset.projectPreview='true';
  document.head.appendChild(link);
  const hrStyle=document.createElement('link');
  hrStyle.rel='stylesheet';
  hrStyle.href='/hr-demo.css';
  hrStyle.dataset.hrDemoStyle='true';
  document.head.appendChild(hrStyle);
}
function loadProjectHRDemo(){
  if(document.querySelector('script[data-hr-demo]'))return;
  const script=document.createElement('script');
  script.src='/project-hr-demo.js';
  script.defer=true;
  script.dataset.hrDemo='true';
  document.body.appendChild(script);
}
loadProjectPreviewStyles();
loadProjectHRDemo();

function openModal(){if(!modal)return;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>message?.focus(),80)}
function closeModal(){if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelectorAll('.contact-open').forEach(b=>b.addEventListener('click',openModal));
document.querySelectorAll('.modal-close').forEach(b=>b.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

function setupSenders(){document.querySelectorAll('[data-channel]').forEach(btn=>btn.addEventListener('click',()=>{const text=(message?.value||'').trim();if(!text){message?.focus();return}const encoded=encodeURIComponent(text);if(btn.dataset.channel==='telegram')window.open('https://t.me/MaksBlischik?text='+encoded,'_blank','noopener,noreferrer');if(btn.dataset.channel==='email'){const subject=encodeURIComponent(isEN?'Portfolio inquiry':'Запит із портфоліо');window.location.href=`mailto:maks2006bl@gmail.com?subject=${subject}&body=${encoded}`}}))}
setupSenders();

document.querySelectorAll('.stars').forEach(star=>star.addEventListener('click',()=>openReview(5)));
function openReview(initial=5){if(!modal||!dialog)return;dialog.innerHTML=`<button class="dialog-close modal-close" aria-label="${isEN?'Close':'Закрити'}">×</button><span class="kicker">${isEN?'FEEDBACK':'ВІДГУК'}</span><h2>${isEN?'How was the cooperation?':'Як вам співпраця?'}</h2><p class="dialog-intro">${isEN?'Choose a rating and leave a few words. The review will be sent to me for approval.':'Оберіть оцінку та залиште кілька слів. Відгук спочатку надійде мені на перевірку.'}</p><div class="review-picker">${[1,2,3,4,5].map(n=>`<button type="button" data-rate="${n}">★</button>`).join('')}</div><textarea id="reviewText" rows="5" placeholder="${isEN?'Your review…':'Ваш відгук…'}"></textarea><input id="reviewName" class="review-name" placeholder="${isEN?'Your name':'Ваше ім’я'}"><button class="review-submit" type="button">${isEN?'Send review →':'Надіслати відгук →'}</button><p class="review-note">${isEN?'Reviews are checked before publication.':'Перед публікацією відгуки перевіряються.'}</p>`;openModal();const picker=dialog.querySelector('.review-picker');let value=initial;const paint=()=>picker.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active',i<value));paint();picker.querySelectorAll('button').forEach((b,i)=>{b.addEventListener('mouseenter',()=>picker.querySelectorAll('button').forEach((x,j)=>x.classList.toggle('hovered',j<=i)));b.addEventListener('mouseleave',()=>picker.querySelectorAll('button').forEach(x=>x.classList.remove('hovered')));b.addEventListener('click',()=>{value=i+1;paint()})});dialog.querySelector('.modal-close').addEventListener('click',closeModal);dialog.querySelector('.review-submit').addEventListener('click',async()=>{const text=dialog.querySelector('#reviewText').value.trim();const name=dialog.querySelector('#reviewName').value.trim();if(!text||!name)return;const btn=dialog.querySelector('.review-submit');btn.disabled=true;btn.textContent=isEN?'Sending…':'Надсилаю…';const data={review_name:name,rating:value,review:text,_subject:isEN?'New portfolio review':'Новий відгук з портфоліо',_template:'table'};try{const r=await fetch('https://formsubmit.co/ajax/maks2006bl@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});if(!r.ok)throw new Error();btn.textContent=isEN?'Sent':'Надіслано'}catch{btn.textContent=isEN?'Try again':'Спробуйте ще раз'}finally{setTimeout(()=>btn.disabled=false,900)}})}

function setupCases(){const cases=[...document.querySelectorAll('details.case')];cases.forEach(item=>item.addEventListener('toggle',()=>{if(item.open)cases.forEach(other=>{if(other!==item)other.open=false})}));}
setupCases();

function setupAvailability(){document.querySelectorAll('.availability').forEach(el=>{el.innerHTML=`<span class="dot"></span>${isEN?(AVAILABLE?'Open to new projects':'Currently unavailable'):(AVAILABLE?'Відкритий до нових проєктів':'Тимчасово недоступний для нових проєктів')}`})}
setupAvailability();

function setupReveal(){const targets=document.querySelectorAll('.process-grid article,.platform-card,.case,.service-grid article,.stack-grid>div,.section-intro,.final-cta');if(!('IntersectionObserver'in window)){targets.forEach(el=>el.classList.add('is-visible'));return}targets.forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--delay',Math.min(i*35,210)+'ms')});const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});targets.forEach(el=>io.observe(el))}
setupReveal();

const links=[...document.querySelectorAll('.site-header nav a[href^="#"]')];const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-30% 0px -55% 0px',threshold:.01});sections.forEach(s=>io.observe(s))}
