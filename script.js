const isEN=document.documentElement.lang==='en';
const AVAILABLE=true;
const modal=document.getElementById('contactModal');
const dialog=modal?.querySelector('.dialog');
const openButtons=[...document.querySelectorAll('.contact-open')];
const closeButtons=[...document.querySelectorAll('.contact-close')];

const style=document.createElement('style');
style.textContent=`
:root{--accent:#3f5ee8;--paper:#f4f1eb;--ink:#171717;--muted:#6d6b65;--panel:#e7e4dc}
.header{width:100%!important;max-width:none!important;padding:0 clamp(18px,4vw,58px)!important;grid-template-columns:1fr auto 1fr!important;background:rgba(220,218,211,.95)!important;border:0!important;box-shadow:0 8px 24px rgba(20,20,16,.07)!important;backdrop-filter:blur(16px)!important}
.header .head-actions{justify-self:end!important}.header nav{justify-content:center!important}.header nav a:after,.link-button:after{display:none!important}.header nav a:hover,.header nav a.active,.link-button:hover{color:var(--accent)!important}
.hero h1{font-family:'Space Grotesk','DM Sans',Arial,sans-serif!important;font-weight:700!important;letter-spacing:-.068em!important}.hero h1 i{font-family:Georgia,'Times New Roman',serif!important;font-weight:400!important}
.hero .primary{background:var(--accent)!important;border:0!important;border-radius:12px!important;box-shadow:0 12px 28px rgba(63,94,232,.16)!important}.hero .secondary{background:#ebe9e3!important;border:0!important;border-radius:10px!important;box-shadow:none!important}.hero .secondary:hover{background:#e3e1da!important}
.hero .profile:before,.hero .hero-aside:before{display:none!important}.hero .portrait-frame{border:0!important;background:transparent!important;padding:0!important}.hero .profile img,.hero .portrait{border:0!important;border-radius:18px!important;box-shadow:0 18px 45px rgba(20,20,16,.10)!important}
.hero .hero-choices{margin-top:16px!important}.hero .hero-choices>a{border:0!important;background:rgba(255,253,248,.72)!important;border-radius:999px!important}.hero .hero-choices>a:hover{background:#fff!important;color:var(--accent)!important}
.status-pill{display:inline-flex;align-items:center;gap:7px;margin-top:10px;font-size:10px;color:var(--muted)}.status-pill i{width:7px;height:7px;border-radius:50%;background:#2b9b68;box-shadow:0 0 0 4px rgba(43,155,104,.10)}.status-pill.busy i{background:#c58b21;box-shadow:0 0 0 4px rgba(197,139,33,.10)}
.platforms{border:0!important;box-shadow:none!important;background:rgba(255,253,248,.42)!important}.platforms .platform{border:0!important}.platforms .platform:hover{background:#fff!important}
.how-section,.section,.split,.stack,.projects,footer{border:0!important}.how-grid{border:0!important;background:transparent!important;gap:12px!important}.how-grid article{border:0!important;border-radius:16px!important;background:rgba(255,253,248,.66)!important}.project{border:0!important;border-radius:17px!important;margin:8px 0!important;padding:30px!important;background:rgba(255,253,248,.38)!important}.project:hover{padding:30px!important;background:#fff!important;transform:translateY(-3px)!important;box-shadow:0 15px 34px rgba(20,20,16,.07)!important}.project-points{border:0!important;background:transparent!important;gap:8px!important}.project-points div{border:0!important;border-radius:12px!important;background:#f7f5f0!important}.tags span{border:0!important;background:#ece9e1!important}.capabilities{border:0!important;background:transparent!important;gap:12px!important}.capabilities article,.capabilities article+article{border:0!important;border-radius:16px!important;background:rgba(255,253,248,.66)!important}.stack-grid{border:0!important;background:transparent!important;gap:12px!important}.stack-grid>div{border-radius:16px!important;background:rgba(255,253,248,.58)!important}.additional{border:0!important}
.contact-dialog{width:min(92vw,610px)!important;background:#fffdf8!important;border:0!important;border-radius:22px!important;padding:30px!important;box-shadow:0 28px 90px rgba(0,0,0,.22)!important}.contact-form{display:grid!important;gap:10px!important;margin-top:22px!important}.contact-form input,.contact-form textarea{width:100%!important;border:1px solid #d7d3ca!important;background:#fff!important;border-radius:12px!important;padding:12px 13px!important;font:14px/1.45 'DM Sans',Arial,sans-serif!important;outline:none!important}.contact-form input:focus,.contact-form textarea:focus{border-color:var(--accent)!important;box-shadow:0 0 0 4px rgba(63,94,232,.10)!important}.contact-submit,.review-submit{min-height:50px!important;border:0!important;border-radius:11px!important;background:var(--accent)!important;color:#fff!important;font-weight:800!important}.contact-status{display:none!important;font-size:12px!important;padding:10px 12px!important;border-radius:10px!important}.contact-status.show{display:block!important}.contact-status.ok{background:#e4f3ea!important;color:#226a48!important}.contact-status.err{background:#f8e5e0!important;color:#9a4131!important}
.contact-alt,.review-alt{display:flex!important;gap:8px!important;flex-wrap:wrap!important;padding-top:13px!important;margin-top:3px!important;border-top:1px solid #ddd8cf!important}.contact-alt button,.contact-alt a,.review-alt button{display:inline-flex!important;align-items:center!important;gap:7px!important;padding:8px 10px!important;border:0!important;border-radius:999px!important;background:#f0eee8!important;font-size:11px!important;font-weight:700!important;cursor:pointer!important}.contact-alt button:hover,.contact-alt a:hover,.review-alt button:hover{background:#e4e8fb!important;color:var(--accent)!important}
.review-trigger{display:inline-flex!important;align-items:center!important;gap:8px!important;padding:10px 13px!important;border:0!important;border-radius:11px!important;background:#fff!important;color:#2e2e2b!important;font-weight:800!important;box-shadow:0 8px 20px rgba(20,20,16,.06)!important;cursor:pointer!important}.review-trigger:hover{color:var(--accent)!important;transform:translateY(-2px)!important}.review-rating{display:flex;gap:6px;margin:4px 0 12px}.review-rating button{width:40px;height:40px;border:0;border-radius:10px;background:#ece9e2;color:#aaa;cursor:pointer;font-size:18px;transition:.16s}.review-rating button.active,.review-rating button:hover{background:#ffe7a8;color:#c98a13;transform:translateY(-2px)}.reviews-section{width:min(calc(100% - 44px),1220px);margin:0 auto;padding:82px 0 24px}.reviews-head{display:flex;justify-content:space-between;gap:30px;align-items:end}.reviews-head h2{font:700 clamp(38px,5vw,66px)/.95 'Space Grotesk','DM Sans',sans-serif;letter-spacing:-.055em;margin:10px 0}.reviews-head p{max-width:420px;color:var(--muted);font-size:13px}.reviews-empty{margin-top:24px;padding:24px;border-radius:16px;background:rgba(255,253,248,.55);color:var(--muted);font-size:13px}.reviews-list{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:24px}.review-card{padding:22px;border-radius:16px;background:#fff;box-shadow:0 12px 30px rgba(20,20,16,.06)}.review-card .stars{color:#c98a13;letter-spacing:2px}.review-card strong{display:block;margin-top:12px}.review-card small{color:var(--muted)}.review-card p{margin:12px 0 0;font-size:13px;color:#3d3d38}.review-footer{display:flex;justify-content:space-between;gap:16px;align-items:center;margin-top:18px}
@media(max-width:900px){.header{padding:0 22px!important}.reviews-list{grid-template-columns:1fr 1fr!important}.reviews-section{width:calc(100% - 44px)}}
@media(max-width:600px){.header{padding:0 16px!important}.header nav{display:none!important}.header .head-actions{font-size:11px!important}.reviews-section{width:calc(100% - 28px);padding:64px 0 20px}.reviews-head{display:block}.reviews-head h2{font-size:42px}.reviews-list{grid-template-columns:1fr!important}.review-footer{display:grid}.contact-dialog{padding:22px 17px!important}.review-rating button{width:42px;height:42px}}
`;
document.head.appendChild(style);

function setAvailability(){
  document.querySelectorAll('.profile p').forEach(p=>{
    if(!p.querySelector('em'))return;
    p.classList.toggle('status-pill',true);
    p.classList.toggle('busy',!AVAILABLE);
    p.innerHTML=`<em></em>${isEN?(AVAILABLE?'Open to new projects':'Currently booked'):(AVAILABLE?'Відкритий до нових проєктів':'Тимчасово зайнятий')}`;
  });
}

function applyHeroCopy(){
  const hero=document.querySelector('.client-hero')||document.querySelector('.hero');
  if(!hero)return;
  const h=hero.querySelector('h1');const lead=hero.querySelector('.lead');const primary=hero.querySelector('.primary');const secondary=hero.querySelector('.secondary');
  if(isEN){
    if(h)h.innerHTML='Have an idea?<br><i>Let’s make it work.</i>';
    if(lead)lead.textContent='Tell me what you want to build, automate or improve. You do not need to know the technical side — describe the result you want, and I’ll help turn it into a clear solution.';
    if(primary){primary.innerHTML='Tell me what you need <span>→</span>';primary.setAttribute('plerdy-tracking-id','hero-contact-en');}
    if(secondary){secondary.innerHTML='See the work <span>↓</span>';secondary.setAttribute('plerdy-tracking-id','hero-work-en');}
  }else{
    if(h)h.innerHTML='Є ідея?<br><i>Зробімо, щоб вона працювала.</i>';
    if(lead)lead.textContent='Розкажіть, що хочете створити, автоматизувати або виправити. Технічну частину знати не потрібно — опишіть бажаний результат, а я допоможу перетворити його на зрозуміле рішення.';
    if(primary){primary.innerHTML='Розповісти, що потрібно <span>→</span>';primary.setAttribute('plerdy-tracking-id','hero-contact-ua');}
    if(secondary){secondary.innerHTML='Подивитися роботи <span>↓</span>';secondary.setAttribute('plerdy-tracking-id','hero-work-ua');}
  }
}

function buildContactDialog(){
  if(!dialog)return;
  dialog.classList.add('contact-dialog');
  dialog.innerHTML=`<button class="close contact-close" type="button" aria-label="Close">×</button><p>${isEN?'CONTACT':'КОНТАКТ'}</p><h2>${isEN?'Tell me what you need.':'Розкажіть, що потрібно.'}</h2><span class="sub">${isEN?'A few lines are enough. No technical brief required.':'Достатньо кількох слів. Технічне ТЗ не потрібне.'}</span><form class="contact-form" id="siteContactForm"><div><label>${isEN?'Your name':'Ваше ім’я'}</label><input name="name" required autocomplete="name" placeholder="${isEN?'Name':'Ім’я'}"></div><div><label>${isEN?'Your email':'Ваш email'}</label><input name="email" type="email" required autocomplete="email" placeholder="name@example.com"></div><div><label>${isEN?'What do you need?':'Що потрібно зробити?'}</label><textarea name="message" required placeholder="${isEN?'A website, automation, bot, integration…':'Сайт, автоматизація, бот, інтеграція…'}"></textarea></div><input type="text" name="_honey" tabindex="-1" autocomplete="off" style="display:none!important"><input type="hidden" name="_subject" value="${isEN?'New portfolio inquiry':'Нове звернення з портфоліо'}"><input type="hidden" name="_template" value="table"><button class="contact-submit" type="submit">${isEN?'Send message →':'Надіслати повідомлення →'}</button><div class="contact-status" id="contactStatus"></div><p class="contact-hint">${isEN?'Email is sent without leaving the site. Telegram opens with the message ready to send.':'Email надсилається без виходу із сайту. Telegram відкриється з уже готовим повідомленням.'}</p></form><div class="contact-alt"><span style="font-size:10px;color:#85847d;align-self:center">${isEN?'Or use:':'Або через:'}</span><button type="button" data-direct="telegram">Telegram</button><a href="https://www.fiverr.com/enotik_" target="_blank" rel="noreferrer">Fiverr</a><a href="https://freelancehunt.com/ua/showcase/work/freelance-helper-telegram-bot-dlya/2046690.html" target="_blank" rel="noreferrer">Freelancehunt</a></div><div class="contact-alt"><button type="button" class="review-trigger" data-open-review>★ ${isEN?'Leave a review':'Залишити відгук'}</button></div>`;
  bindContactDialog();
}

function openContact(){if(!modal)return;buildContactDialog();modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>dialog.querySelector('textarea')?.focus(),120)}
function closeContact(){if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}

function bindContactDialog(){
  dialog.querySelectorAll('.contact-close').forEach(b=>b.addEventListener('click',closeContact));
  const form=dialog.querySelector('#siteContactForm');const status=dialog.querySelector('#contactStatus');
  form?.addEventListener('submit',async e=>{e.preventDefault();if(!status)return;const button=form.querySelector('.contact-submit');button.disabled=true;button.textContent=isEN?'Sending…':'Надсилаю…';status.className='contact-status';const data=Object.fromEntries(new FormData(form).entries());try{const res=await fetch('https://formsubmit.co/ajax/maks2006bl@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});if(!res.ok)throw new Error('submit');form.reset();status.textContent=isEN?'Sent. I’ll get back to you soon.':'Надіслано. Я зв’яжуся з вами найближчим часом.';status.className='contact-status show ok'}catch(err){status.textContent=isEN?'Could not send. Try Telegram instead.':'Не вдалося надіслати. Спробуйте Telegram.';status.className='contact-status show err'}finally{button.disabled=false;button.textContent=isEN?'Send message →':'Надіслати повідомлення →'}});
  dialog.querySelector('[data-direct="telegram"]')?.addEventListener('click',()=>{const data=new FormData(form);const name=String(data.get('name')||'').trim();const email=String(data.get('email')||'').trim();const message=String(data.get('message')||'').trim();const text=isEN?`Hi Maksym!\n\nName: ${name}\nEmail: ${email}\n\n${message}`:`Привіт, Максиме!\n\nІм’я: ${name}\nEmail: ${email}\n\n${message}`;window.open('https://t.me/MaksBlischik?text='+encodeURIComponent(text),'_blank','noopener,noreferrer')});
  dialog.querySelector('[data-open-review]')?.addEventListener('click',()=>openReview());
}

function openReview(){
  closeContact();
  if(!modal||!dialog)return;
  dialog.classList.add('contact-dialog');
  dialog.innerHTML=`<button class="close contact-close" type="button" aria-label="Close">×</button><p>${isEN?'FEEDBACK':'ВІДГУК'}</p><h2>${isEN?'How did it go?':'Як вам було працювати зі мною?'}</h2><span class="sub">${isEN?'Choose a rating and leave a few words. The review is sent for approval before appearing publicly.':'Оцініть роботу та залиште кілька слів. Відгук спочатку надходить мені на перевірку, а вже потім може з’явитися на сайті.'}</span><form class="contact-form" id="reviewForm"><div><label>${isEN?'Your name':'Ваше ім’я'}</label><input name="name" required autocomplete="name" placeholder="${isEN?'Name':'Ім’я'}"></div><div><label>${isEN?'Rating':'Оцінка'}</label><div class="review-rating" role="radiogroup" aria-label="Rating"><button type="button" data-rating="1">★</button><button type="button" data-rating="2">★</button><button type="button" data-rating="3">★</button><button type="button" data-rating="4">★</button><button type="button" data-rating="5">★</button></div><input type="hidden" name="rating" id="reviewRating" value="5"></div><div><label>${isEN?'Your review':'Ваш відгук'}</label><textarea name="review" required placeholder="${isEN?'What was useful? What did you like?':'Що сподобалось? Що було корисним?'}"></textarea></div><input type="text" name="_honey" tabindex="-1" autocomplete="off" style="display:none!important"><input type="hidden" name="_subject" value="${isEN?'New portfolio review':'Новий відгук з портфоліо'}"><input type="hidden" name="_template" value="table"><button class="review-submit" type="submit">${isEN?'Send review →':'Надіслати відгук →'}</button><div class="contact-status" id="reviewStatus"></div></form>`;
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';bindReviewDialog();
}
function bindReviewDialog(){
  dialog.querySelectorAll('.contact-close').forEach(b=>b.addEventListener('click',closeContact));
  const rating=dialog.querySelector('#reviewRating');const stars=[...dialog.querySelectorAll('[data-rating]')];
  const paint=v=>stars.forEach(s=>s.classList.toggle('active',Number(s.dataset.rating)<=Number(v)));paint(5);stars.forEach(s=>s.addEventListener('click',()=>{rating.value=s.dataset.rating;paint(rating.value)}));
  const form=dialog.querySelector('#reviewForm');const status=dialog.querySelector('#reviewStatus');
  form?.addEventListener('submit',async e=>{e.preventDefault();const button=form.querySelector('.review-submit');button.disabled=true;button.textContent=isEN?'Sending…':'Надсилаю…';status.className='contact-status';const data=Object.fromEntries(new FormData(form).entries());try{const res=await fetch('https://formsubmit.co/ajax/maks2006bl@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});if(!res.ok)throw new Error('submit');form.reset();status.textContent=isEN?'Thank you. Your review was sent for approval.':'Дякую. Відгук надіслано на перевірку.';status.className='contact-status show ok';paint(0)}catch(err){status.textContent=isEN?'Could not send the review. Try again.':'Не вдалося надіслати відгук. Спробуйте ще раз.';status.className='contact-status show err'}finally{button.disabled=false;button.textContent=isEN?'Send review →':'Надіслати відгук →'}});
}

function addReviewsSection(){
  const existing=document.getElementById('reviews');if(existing)return;
  const reviews=[];
  if(!reviews.length)return;
  const section=document.createElement('section');section.id='reviews';section.className='reviews-section';section.innerHTML=`<div class="reviews-head"><div><p class="section-label">${isEN?'FEEDBACK':'ВІДГУКИ'}</p><h2>${isEN?'What clients say.':'Що кажуть клієнти.'}</h2></div><button class="review-trigger" data-open-review>★ ${isEN?'Leave a review':'Залишити відгук'}</button></div><div class="reviews-list">${reviews.map(r=>`<article class="review-card"><div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div><strong>${r.name}</strong><small>${r.project||''}</small><p>${r.text}</p></article>`).join('')}</div>`;
  const contact=document.getElementById('contact');contact?.parentNode.insertBefore(section,contact);section.querySelector('[data-open-review]')?.addEventListener('click',openReview);
}

setAvailability();applyHeroCopy();addReviewsSection();
openButtons.forEach(b=>b.addEventListener('click',openContact));
closeButtons.forEach(b=>b.addEventListener('click',closeContact));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeContact()});

const links=[...document.querySelectorAll('nav a[href^="#"]')];
const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window&&sections.length){const io=new IntersectionObserver(entries=>{const visible=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+visible.target.id))},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.1,.3,.6]});sections.forEach(s=>io.observe(s))}

const revealTargets=document.querySelectorAll('.how-grid article,.project,.capabilities article,.platform');
if('IntersectionObserver' in window&&revealTargets.length){revealTargets.forEach((el,i)=>{el.classList.add('reveal-on-scroll');el.style.setProperty('--delay',`${Math.min(i*35,210)}ms`)});const rio=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');rio.unobserve(entry.target)}}),{threshold:.12});revealTargets.forEach(el=>rio.observe(el))}
