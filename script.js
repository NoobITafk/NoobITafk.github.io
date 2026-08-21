const isEN=document.documentElement.lang==='en';
const AVAILABLE=true; // true = available, false = temporarily unavailable
const modal=document.getElementById('contactModal');
const dialog=modal?.querySelector('.dialog');

const starSvg=(filled=true)=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.9l2.72 5.52 6.09.88-4.4 4.3 1.04 6.07L12 16.8 6.55 19.67l1.04-6.07-4.4-4.3 6.09-.88L12 2.9z" fill="${filled?'currentColor':'none'}" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`;

const style=document.createElement('style');
style.textContent=`
.mobile-language{display:none}.status-pill{display:inline-flex;align-items:center;gap:7px;margin-top:9px;font-size:10px;color:#6d6b65}.status-pill em{width:7px;height:7px;border-radius:50%;display:inline-block;background:#2b9b68;box-shadow:0 0 0 4px rgba(43,155,104,.1)}.status-pill.busy em{background:#c58b21;box-shadow:0 0 0 4px rgba(197,139,33,.1)}
.profile-review{margin-top:14px;padding-top:13px;border-top:1px solid #dfdbd2}.profile-review-head{display:flex;justify-content:space-between;align-items:center;gap:12px}.profile-review-title{font:700 11px/1 'Space Grotesk','DM Sans',sans-serif}.profile-review-stars{display:flex;gap:2px;color:#c99118}.profile-review-stars svg{width:14px;height:14px}.profile-review-meta{display:flex;justify-content:space-between;align-items:center;gap:9px;margin-top:7px}.profile-review-meta small{font-size:9px;color:#7a7871;line-height:1.35}.review-open{display:inline-flex;align-items:center;gap:6px;padding:7px 9px;border:0;border-radius:9px;background:#efede7;color:#2b2b28;font:700 9px 'DM Sans',sans-serif;cursor:pointer;white-space:nowrap}.review-open:hover{background:#e5e9fb;color:#3f5ee8}.review-open svg{width:13px;height:13px;color:#c99118}
.review-dialog{width:min(92vw,590px)!important;background:#fffdf8!important;border-radius:22px!important;border:0!important;padding:30px!important;box-shadow:0 28px 90px rgba(0,0,0,.22)!important}.review-dialog h2{font-family:'Space Grotesk','DM Sans',Arial,sans-serif!important;font-size:clamp(34px,5vw,48px)!important;line-height:.98!important;letter-spacing:-.05em!important;margin:5px 0 9px!important}.review-form{display:grid;gap:11px;margin-top:20px}.review-form label{display:block;font-size:11px;color:#6d6b65;margin-bottom:7px}.review-form input,.review-form textarea{width:100%;box-sizing:border-box;border:1px solid #d7d3ca;background:#fff;border-radius:12px;padding:12px 13px;font:14px/1.45 'DM Sans',Arial,sans-serif;outline:none}.review-form input:focus,.review-form textarea:focus{border-color:#3f5ee8;box-shadow:0 0 0 4px rgba(63,94,232,.1)}.review-stars{display:flex;gap:6px}.review-stars button{width:42px;height:42px;padding:0;border:0;border-radius:11px;background:#eeece6;color:#b5b3ad;display:grid;place-items:center;cursor:pointer;transition:transform .16s ease,background .16s ease,color .16s ease}.review-stars button svg{width:21px;height:21px}.review-stars button.active,.review-stars button:hover{background:#fff0c7;color:#c99118;transform:translateY(-2px)}.review-submit{min-height:50px;border:0;border-radius:11px;background:#3f5ee8;color:#fff;font:800 13px 'DM Sans',sans-serif;cursor:pointer}.review-submit:disabled{opacity:.6;cursor:wait}.review-status{display:none;padding:10px 12px;border-radius:10px;font-size:12px}.review-status.show{display:block}.review-status.ok{background:#e4f3ea;color:#226a48}.review-status.err{background:#f8e5e0;color:#9a4131}.review-note{margin:0;color:#85847d;font-size:10px;line-height:1.45}
@media(max-width:600px){.mobile-language{display:flex;position:fixed;top:10px;right:10px;z-index:75;gap:2px;padding:3px;border-radius:999px;background:#d9d7d0;box-shadow:0 6px 16px rgba(0,0,0,.08)}.mobile-language a{padding:5px 8px;border-radius:999px;font:700 9px 'DM Sans',sans-serif;color:#5f5d56}.mobile-language a.active{background:#20201e;color:#fff}.profile-review-meta{align-items:flex-start}.review-open{padding:7px 8px}.review-dialog{padding:22px 17px!important}}
`;
document.head.appendChild(style);

function applyAvailability(){
  document.querySelectorAll('.profile p').forEach(p=>{
    if(!p.querySelector('em'))return;
    p.classList.add('status-pill');
    p.classList.toggle('busy',!AVAILABLE);
    p.innerHTML=`<em></em>${isEN?(AVAILABLE?'Open to new projects':'Currently unavailable'):(AVAILABLE?'Відкритий до нових проєктів':'Тимчасово недоступний для нових проєктів')}`;
  });
}

function addMobileLanguage(){
  if(document.querySelector('.mobile-language'))return;
  const el=document.createElement('div');
  el.className='mobile-language';
  el.innerHTML=`<a href="/" class="${isEN?'':'active'}">UA</a><a href="/en/" class="${isEN?'active':''}">EN</a>`;
  document.body.appendChild(el);
}

function addProfileReview(){
  const profile=document.querySelector('.profile');
  if(!profile||profile.querySelector('.profile-review'))return;
  const box=document.createElement('div');
  box.className='profile-review';
  box.innerHTML=`<div class="profile-review-head"><strong class="profile-review-title">${isEN?'Client reviews':'Відгуки клієнтів'}</strong><span class="profile-review-stars" aria-label="5 out of 5 stars">${starSvg()}${starSvg()}${starSvg()}${starSvg()}${starSvg()}</span></div><div class="profile-review-meta"><small>${isEN?'A review can be left after the project.':'Відгук можна залишити після завершення проєкту.'}</small><button type="button" class="review-open"><span>${starSvg(false)}</span>${isEN?'Leave review':'Залишити відгук'}</button></div>`;
  profile.appendChild(box);
  box.querySelector('.review-open').addEventListener('click',openReview);
}

function applyHeroCopy(){
  const hero=document.querySelector('.client-hero')||document.querySelector('.hero');
  if(!hero)return;
  const h=hero.querySelector('h1');const lead=hero.querySelector('.lead');const primary=hero.querySelector('.primary');const secondary=hero.querySelector('.secondary');
  if(isEN){
    if(h)h.innerHTML='Have an idea?<br><i>Let’s make it work.</i>';
    if(lead)lead.textContent='Tell me what you want to build, automate or improve. You do not need to know the technical side — describe the result you want, and I’ll help turn it into a clear solution.';
    if(primary)primary.innerHTML='Tell me what you need <span>→</span>';
    if(secondary)secondary.innerHTML='See the work <span>↓</span>';
  }else{
    if(h)h.innerHTML='Є завдання?<br><i>Зробімо, щоб воно працювало.</i>';
    if(lead)lead.textContent='Розкажіть, що потрібно створити, автоматизувати або виправити. Технічні деталі знати не потрібно — опишіть бажаний результат, а я допоможу знайти просте рішення.';
    if(primary)primary.innerHTML='Розповісти про задачу <span>→</span>';
    if(secondary)secondary.innerHTML='Подивитися роботи <span>↓</span>';
  }
}

function openModal(){if(!modal)return;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeModal(){if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}

function openContact(){
  if(!modal||!dialog)return;
  dialog.className='dialog contact-dialog';
  dialog.innerHTML=`<button class="close contact-close" type="button" aria-label="Close">×</button><p>${isEN?'CONTACT':'КОНТАКТ'}</p><h2>${isEN?'Tell me what you need.':'Розкажіть, що потрібно.'}</h2><span class="sub">${isEN?'A few lines are enough. No technical brief required.':'Достатньо кількох слів. Технічне ТЗ не потрібне.'}</span><form class="contact-form" id="siteContactForm"><div><label>${isEN?'Your name':'Ваше ім’я'}</label><input name="name" required autocomplete="name" placeholder="${isEN?'Name':'Ім’я'}"></div><div><label>${isEN?'Your email':'Ваш email'}</label><input name="email" type="email" required autocomplete="email" placeholder="name@example.com"></div><div><label>${isEN?'What do you need?':'Що потрібно зробити?'}</label><textarea name="message" required placeholder="${isEN?'Website, bot, automation, integration…':'Сайт, бот, автоматизація, інтеграція…'}"></textarea></div><input type="hidden" name="_subject" value="${isEN?'New portfolio inquiry':'Нове звернення з портфоліо'}"><input type="hidden" name="_template" value="table"><button class="contact-submit" type="submit">${isEN?'Send message →':'Надіслати повідомлення →'}</button><div class="contact-status" id="contactStatus"></div><p class="contact-hint">${isEN?'Email is sent without leaving the site. Telegram opens with your message ready to send.':'Email надсилається без виходу із сайту. Telegram відкриється з уже готовим повідомленням.'}</p></form><div class="contact-alt"><button type="button" data-direct="telegram">Telegram</button><a href="https://www.fiverr.com/enotik_" target="_blank" rel="noreferrer">Fiverr</a><a href="https://freelancehunt.com/ua/showcase/work/freelance-helper-telegram-bot-dlya/2046690.html" target="_blank" rel="noreferrer">Freelancehunt</a></div>`;
  bindContact();
  openModal();
  setTimeout(()=>dialog.querySelector('textarea')?.focus(),120);
}

function bindContact(){
  dialog.querySelectorAll('.contact-close').forEach(b=>b.addEventListener('click',closeModal));
  const form=dialog.querySelector('#siteContactForm');const status=dialog.querySelector('#contactStatus');
  form?.addEventListener('submit',async e=>{e.preventDefault();const button=form.querySelector('.contact-submit');button.disabled=true;button.textContent=isEN?'Sending…':'Надсилаю…';status.className='contact-status';const data=Object.fromEntries(new FormData(form).entries());try{const r=await fetch('https://formsubmit.co/ajax/maks2006bl@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});if(!r.ok)throw new Error();form.reset();status.textContent=isEN?'Sent. I’ll get back to you soon.':'Надіслано. Я зв’яжуся з вами найближчим часом.';status.className='contact-status show ok'}catch{status.textContent=isEN?'Could not send. Try Telegram instead.':'Не вдалося надіслати. Спробуйте Telegram.';status.className='contact-status show err'}finally{button.disabled=false;button.textContent=isEN?'Send message →':'Надіслати повідомлення →'}});
  dialog.querySelector('[data-direct="telegram"]')?.addEventListener('click',()=>{const data=new FormData(form);const name=String(data.get('name')||'').trim();const email=String(data.get('email')||'').trim();const message=String(data.get('message')||'').trim();const text=isEN?`Hi Maksym!\n\nName: ${name}\nEmail: ${email}\n\n${message}`:`Привіт, Максиме!\n\nІм’я: ${name}\nEmail: ${email}\n\n${message}`;window.open('https://t.me/MaksBlischik?text='+encodeURIComponent(text),'_blank','noopener,noreferrer')});
}

function openReview(){
  if(!modal||!dialog)return;
  dialog.className='dialog review-dialog';
  dialog.innerHTML=`<button class="close review-close" type="button" aria-label="Close">×</button><p>${isEN?'FEEDBACK':'ВІДГУК'}</p><h2>${isEN?'How was the cooperation?':'Як вам співпраця?'}</h2><span class="sub">${isEN?'Choose a rating and leave a few words. The review will be sent to me for approval before publication.':'Оберіть оцінку та залиште кілька слів. Відгук спочатку надійде мені на перевірку.'}</span><form class="review-form" id="reviewForm"><div><label>${isEN?'Your name':'Ваше ім’я'}</label><input name="review_name" required placeholder="${isEN?'Name':'Ім’я'}"></div><div><label>${isEN?'Rating':'Оцінка'}</label><div class="review-stars" role="radiogroup">${[1,2,3,4,5].map(n=>`<button type="button" data-rate="${n}" aria-label="${n} stars">${starSvg(false)}</button>`).join('')}</div><input id="reviewRating" type="hidden" name="rating" value="5"></div><div><label>${isEN?'Your review':'Ваш відгук'}</label><textarea name="review" required placeholder="${isEN?'What did you like about working together?':'Що вам сподобалося у співпраці?'}"></textarea></div><input type="hidden" name="_subject" value="${isEN?'New portfolio review':'Новий відгук з портфоліо'}"><input type="hidden" name="_template" value="table"><button class="review-submit" type="submit">${isEN?'Send review →':'Надіслати відгук →'}</button><div class="review-status" id="reviewStatus"></div><p class="review-note">${isEN?'Reviews are checked before publication.':'Перед публікацією відгуки перевіряються.'}</p></form>`;
  const stars=[...dialog.querySelectorAll('[data-rate]')];const rating=dialog.querySelector('#reviewRating');let selected=5;
  const paint=()=>stars.forEach((b,i)=>{b.classList.toggle('active',i<selected);b.innerHTML=starSvg(i<selected)});paint();
  stars.forEach(b=>b.addEventListener('click',()=>{selected=Number(b.dataset.rate);rating.value=selected;paint()}));
  dialog.querySelector('.review-close').addEventListener('click',closeModal);
  const form=dialog.querySelector('#reviewForm');const status=dialog.querySelector('#reviewStatus');
  form.addEventListener('submit',async e=>{e.preventDefault();const btn=form.querySelector('.review-submit');btn.disabled=true;btn.textContent=isEN?'Sending…':'Надсилаю…';status.className='review-status';const data=Object.fromEntries(new FormData(form).entries());data.rating=`${data.rating}/5`;try{const r=await fetch('https://formsubmit.co/ajax/maks2006bl@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});if(!r.ok)throw new Error();form.reset();selected=5;rating.value=5;paint();status.textContent=isEN?'Thank you. Your review was sent for approval.':'Дякую. Відгук надіслано на перевірку.';status.className='review-status show ok'}catch{status.textContent=isEN?'Could not send. Please try again.':'Не вдалося надіслати. Спробуйте ще раз.';status.className='review-status show err'}finally{btn.disabled=false;btn.textContent=isEN?'Send review →':'Надіслати відгук →'}});
  openModal();
}

applyAvailability();
applyHeroCopy();
addMobileLanguage();
addProfileReview();

document.querySelectorAll('.contact-open').forEach(b=>b.addEventListener('click',openContact));
document.querySelector('.backdrop')?.addEventListener('click',closeModal);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const navLinks=[...document.querySelectorAll('nav a[href^="#"]')];
const sections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window&&sections.length){const io=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+visible.target.id))},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.1,.3,.6]});sections.forEach(s=>io.observe(s))}

const reveal=document.querySelectorAll('.how-grid article,.project,.capabilities article,.platform');
if('IntersectionObserver' in window){const rio=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');rio.unobserve(e.target)}}),{threshold:.12});reveal.forEach(e=>{e.classList.add('reveal-on-scroll');rio.observe(e)})}
