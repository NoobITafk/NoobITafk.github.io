const isEN=document.documentElement.lang==='en';
const AVAILABLE=true;
const modal=document.getElementById('contactModal');
const dialog=modal?.querySelector('.dialog');
const openButtons=[...document.querySelectorAll('.contact-open')];
const closeButtons=[...document.querySelectorAll('.contact-close')];

const starSvg=(filled=true)=>`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.8l2.8 5.65 6.25.91-4.53 4.41 1.07 6.23L12 17.06 6.41 20l1.07-6.23L2.95 9.36l6.25-.91L12 2.8z" fill="${filled?'currentColor':'none'}" stroke="currentColor" stroke-width="1.65" stroke-linejoin="round"/></svg>`;

const style=document.createElement('style');
style.textContent=`
.hero .hero-choices{display:flex!important;flex-wrap:wrap!important;align-items:center!important;gap:7px!important;margin-top:15px!important}.hero .hero-choices>span:first-child{font:500 10px/1.2 'DM Sans',sans-serif!important;color:#77766f!important;margin-right:2px!important}.hero .hero-choices>a{display:inline-flex!important;align-items:center!important;gap:6px!important;padding:7px 10px!important;border:0!important;border-radius:999px!important;background:#ece9e2!important;color:#41413d!important;font:700 10px/1 'DM Sans',sans-serif!important;transition:transform .16s ease,background .16s ease,color .16s ease,box-shadow .16s ease!important}.hero .hero-choices>a:hover{background:#fff!important;color:#3f5ee8!important;transform:translateY(-2px)!important;box-shadow:0 8px 18px rgba(20,20,16,.08)!important}.hero .hero-choices .brand-mark{width:19px!important;height:19px!important;flex:0 0 19px!important;border-radius:6px!important;font-size:7px!important}.hero .profile:before,.hero .hero-aside:before{display:none!important}.hero .profile img,.hero .portrait{box-shadow:0 18px 42px rgba(20,20,16,.10)!important}
.profile-review{margin-top:13px!important;padding-top:12px!important;border-top:1px solid #dedad1!important}.profile-review-head{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important}.profile-review-title{font:700 11px/1 'Space Grotesk','DM Sans',sans-serif!important}.profile-review-stars{display:flex!important;gap:4px!important;color:#c89119!important;cursor:pointer!important;user-select:none!important;touch-action:manipulation!important}.profile-review-stars svg{width:18px!important;height:18px!important;transition:transform .14s ease,color .14s ease,filter .14s ease!important}.profile-review-stars svg:hover{transform:translateY(-2px) scale(1.08)!important}.profile-review-stars svg.star-on{color:#c89119!important;filter:drop-shadow(0 2px 5px rgba(201,145,25,.18))}.profile-review-stars svg.star-off{color:#b9b6ae!important;fill:none!important}.profile-review-meta{display:none!important}
.header .lang{display:flex!important;gap:7px!important;align-items:center!important}.header .lang a,.header .lang b{font-size:11px!important}.header .lang b{font-weight:800!important;color:#171717!important}.header .lang a{color:#6d6b65!important}.header .lang a:hover{color:#3f5ee8!important}
.review-dialog{width:min(92vw,580px)!important;background:#fffdf8!important;border:0!important;border-radius:22px!important;padding:28px!important;box-shadow:0 28px 90px rgba(0,0,0,.22)!important}.review-dialog h2{font-family:'Space Grotesk','DM Sans',Arial,sans-serif!important;font-size:clamp(32px,5vw,46px)!important;line-height:.98!important;letter-spacing:-.05em!important;margin:5px 0 9px!important}.review-form{display:grid!important;gap:11px!important;margin-top:20px!important}.review-form label{display:block!important;font-size:11px!important;color:#6d6b65!important;margin-bottom:7px!important}.review-form input,.review-form textarea{width:100%!important;box-sizing:border-box!important;border:1px solid #d7d3ca!important;background:#fff!important;border-radius:12px!important;padding:12px 13px!important;font:14px/1.45 'DM Sans',Arial,sans-serif!important;outline:none!important}.review-form input:focus,.review-form textarea:focus{border-color:#3f5ee8!important;box-shadow:0 0 0 4px rgba(63,94,232,.1)!important}.review-stars{display:flex!important;gap:7px!important}.review-stars button{width:44px!important;height:44px!important;padding:0!important;border:0!important;border-radius:11px!important;background:#eeece6!important;color:#aaa8a0!important;display:grid!important;place-items:center!important;cursor:pointer!important;transition:transform .16s ease,background .16s ease,color .16s ease!important}.review-stars button svg{width:24px!important;height:24px!important}.review-stars button.active,.review-stars button:hover{background:#fff0c7!important;color:#c99119!important;transform:translateY(-2px)!important}.review-submit{min-height:50px!important;border:0!important;border-radius:11px!important;background:#3f5ee8!important;color:#fff!important;font:800 13px 'DM Sans',sans-serif!important;cursor:pointer!important}.review-status{display:none!important;padding:10px 12px!important;border-radius:10px!important;font-size:12px!important}.review-status.show{display:block!important}.review-status.ok{background:#e4f3ea!important;color:#226a48!important}.review-status.err{background:#f8e5e0!important;color:#9a4131!important}.review-note{margin:0!important;color:#85847d!important;font-size:10px!important;line-height:1.45!important}
@media(max-width:600px){.header .head-actions{display:flex!important;align-items:center!important;gap:10px!important}.header .lang{display:flex!important}.header .header-contact,.header .link-button{font-size:10px!important}.header .lang a,.header .lang b{font-size:10px!important}.hero .hero-choices{gap:6px!important;margin-top:13px!important}.hero .hero-choices>a{padding:7px 9px!important}.hero .hero-choices>span:first-child{width:100%!important;margin-bottom:1px!important}.profile-review-head{align-items:center!important}.profile-review-stars{gap:5px!important}.profile-review-stars svg{width:20px!important;height:20px!important}.review-dialog{padding:22px 17px!important}.review-stars{gap:6px!important}.review-stars button{width:46px!important;height:46px!important}.review-stars button svg{width:25px!important;height:25px!important}}
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

function addProfileReview(){
  const profile=document.querySelector('.profile');
  if(!profile||profile.querySelector('.profile-review'))return;
  const box=document.createElement('div');
  box.className='profile-review';
  box.innerHTML=`<div class="profile-review-head"><strong class="profile-review-title">${isEN?'Client reviews':'Відгуки клієнтів'}</strong><span class="profile-review-stars" role="button" tabindex="0" aria-label="${isEN?'Leave a review':'Залишити відгук'}">${starSvg(false)}${starSvg(false)}${starSvg(false)}${starSvg(false)}${starSvg(false)}</span></div>`;
  profile.appendChild(box);
  const stars=[...box.querySelectorAll('.profile-review-stars svg')];
  let selected=5;
  const paint=count=>stars.forEach((star,i)=>{
    const on=i<count;
    star.classList.toggle('star-on',on);
    star.classList.toggle('star-off',!on);
    star.innerHTML=on?starSvg(true).match(/<svg[^>]*>([\s\S]*)<\/svg>/)?.[1]||'':starSvg(false).match(/<svg[^>]*>([\s\S]*)<\/svg>/)?.[1]||'';
  });
  paint(selected);
  stars.forEach((star,index)=>{
    const preview=()=>paint(index+1);
    star.addEventListener('mouseenter',preview);
    star.addEventListener('mousemove',preview);
    star.addEventListener('touchstart',e=>{e.preventDefault();selected=index+1;paint(selected);},{passive:false});
    star.addEventListener('click',()=>{selected=index+1;paint(selected);openReview(selected)});
  });
  box.querySelector('.profile-review-stars').addEventListener('mouseleave',()=>paint(selected));
  box.querySelector('.profile-review-stars').addEventListener('touchend',()=>paint(selected));
  box.querySelector('.profile-review-stars').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openReview(selected)}});
}

function applyHeroCopy(){
  const hero=document.querySelector('.client-hero')||document.querySelector('.hero');
  if(!hero)return;
  const h=hero.querySelector('h1');
  const lead=hero.querySelector('.lead');
  const primary=hero.querySelector('.primary');
  const secondary=hero.querySelector('.secondary');
  if(isEN){
    if(h)h.innerHTML='Have a task?<br><i>I’ll make it work.</i>';
    if(lead)lead.textContent='Tell me what you need to build, automate or improve. You do not need to know the technical side — describe the result and I’ll turn it into a clear solution.';
    if(primary)primary.innerHTML='Tell me what you need <span>→</span>';
    if(secondary)secondary.innerHTML='See the work <span>↓</span>';
  }else{
    if(h)h.innerHTML='Є завдання?<br><i>Зроблю, щоб воно працювало.</i>';
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
  dialog.innerHTML=`<button class="close contact-close" type="button" aria-label="Close">×</button><p>${isEN?'CONTACT':'КОНТАКТ'}</p><h2>${isEN?'Tell me what you need.':'Розкажіть, що потрібно.'}</h2><span class="sub">${isEN?'A few lines are enough. No technical brief required.':'Достатньо кількох слів. Технічне ТЗ не потрібне.'}</span><form class="contact-form" id="siteContactForm"><div><label>${isEN?'Your name':'Ваше ім’я'}</label><input name="name" required autocomplete="name" placeholder="${isEN?'Name':'Ім’я'}"></div><div><label>${isEN?'Your email':'Ваш email'}</label><input name="email" type="email" required autocomplete="email" placeholder="name@example.com"></div><div><label>${isEN?'What do you need?':'Що потрібно зробити?'}</label><textarea name="message" required placeholder="${isEN?'Website, bot, automation, integration…':'Сайт, бот, автоматизація, інтеграція…'}"></textarea></div><input type="hidden" name="_subject" value="${isEN?'New portfolio inquiry':'Нове звернення з портфоліо'}"><input type="hidden" name="_template" value="table"><button class="contact-submit" type="submit">${isEN?'Send message →':'Надіслати повідомлення →'}</button><div class="contact-status" id="contactStatus"></div><p class="contact-hint">${isEN?'Email is sent without leaving the site. Telegram opens with the message ready to send.':'Email надсилається без виходу із сайту. Telegram відкриється з уже готовим повідомленням.'}</p></form><div class="contact-alt"><button type="button" data-direct="telegram">Telegram</button><a href="https://www.fiverr.com/enotik_" target="_blank" rel="noreferrer">Fiverr</a><a href="https://freelancehunt.com/ua/showcase/work/freelance-helper-telegram-bot-dlya/2046690.html" target="_blank" rel="noreferrer">Freelancehunt</a></div>`;
  bindContact();
  openModal();
  setTimeout(()=>dialog.querySelector('textarea')?.focus(),120);
}
function bindContact(){
  dialog.querySelectorAll('.contact-close').forEach(b=>b.addEventListener('click',closeModal));
  const form=dialog.querySelector('#siteContactForm');
  const status=dialog.querySelector('#contactStatus');
  form?.addEventListener('submit',async e=>{
    e.preventDefault();
    const button=form.querySelector('.contact-submit');button.disabled=true;button.textContent=isEN?'Sending…':'Надсилаю…';status.className='contact-status';
    const data=Object.fromEntries(new FormData(form).entries());
    try{const r=await fetch('https://formsubmit.co/ajax/maks2006bl@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});if(!r.ok)throw new Error();form.reset();status.textContent=isEN?'Sent. I’ll get back to you soon.':'Надіслано. Я зв’яжуся з вами найближчим часом.';status.className='contact-status show ok'}
    catch{status.textContent=isEN?'Could not send. Try Telegram instead.':'Не вдалося надіслати. Спробуйте Telegram.';status.className='contact-status show err'}
    finally{button.disabled=false;button.textContent=isEN?'Send message →':'Надіслати повідомлення →';}
  });
  dialog.querySelector('[data-direct="telegram"]')?.addEventListener('click',()=>{
    const data=new FormData(form);const name=String(data.get('name')||'').trim();const email=String(data.get('email')||'').trim();const message=String(data.get('message')||'').trim();
    const text=isEN?`Hi Maksym!\n\nName: ${name}\nEmail: ${email}\n\n${message}`:`Привіт, Максиме!\n\nІм’я: ${name}\nEmail: ${email}\n\n${message}`;
    window.open('https://t.me/MaksBlischik?text='+encodeURIComponent(text),'_blank','noopener,noreferrer');
  });
}

function openReview(initialRating=5){
  if(!modal||!dialog)return;
  dialog.className='dialog review-dialog';
  dialog.innerHTML=`<button class="close review-close" type="button" aria-label="Close">×</button><p>${isEN?'FEEDBACK':'ВІДГУК'}</p><h2>${isEN?'How was the cooperation?':'Як вам співпраця?'}</h2><span class="sub">${isEN?'Choose a rating and leave a few words. The review will be sent to me for approval before publication.':'Оберіть оцінку та залиште кілька слів. Відгук спочатку надійде мені на перевірку.'}</span><form class="review-form" id="reviewForm"><div><label>${isEN?'Your name':'Ваше ім’я'}</label><input name="review_name" required placeholder="${isEN?'Name':'Ім’я'}"></div><div><label>${isEN?'Rating':'Оцінка'}</label><div class="review-stars" role="radiogroup">${[1,2,3,4,5].map(n=>`<button type="button" data-rate="${n}" aria-label="${n} stars">${starSvg(false)}</button>`).join('')}</div><input id="reviewRating" type="hidden" name="rating" value="${initialRating}"></div><div><label>${isEN?'Your review':'Ваш відгук'}</label><textarea name="review" required placeholder="${isEN?'What did you like about working together?':'Що вам сподобалося у співпраці?'}"></textarea></div><input type="hidden" name="_subject" value="${isEN?'New portfolio review':'Новий відгук з портфоліо'}"><input type="hidden" name="_template" value="table"><button class="review-submit" type="submit">${isEN?'Send review →':'Надіслати відгук →'}</button><div class="review-status" id="reviewStatus"></div><p class="review-note">${isEN?'Reviews are checked before publication.':'Перед публікацією відгуки перевіряються.'}</p></form>`;
  const stars=[...dialog.querySelectorAll('[data-rate]')];
  const rating=dialog.querySelector('#reviewRating');
  let selected=Math.max(1,Math.min(5,Number(initialRating)||5));
  const paint=()=>stars.forEach((b,i)=>{b.classList.toggle('active',i<selected);b.innerHTML=starSvg(i<selected)});
  paint();
  stars.forEach(b=>b.addEventListener('click',()=>{selected=Number(b.dataset.rate);rating.value=selected;paint()}));
  dialog.querySelector('.review-close').addEventListener('click',closeModal);
  const form=dialog.querySelector('#reviewForm');
  const status=dialog.querySelector('#reviewStatus');
  form.addEventListener('submit',async e=>{e.preventDefault();const btn=form.querySelector('.review-submit');btn.disabled=true;btn.textContent=isEN?'Sending…':'Надсилаю…';const data=Object.fromEntries(new FormData(form).entries());try{const r=await fetch('https://formsubmit.co/ajax/maks2006bl@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});if(!r.ok)throw new Error();form.reset();status.textContent=isEN?'Thank you. Your review was sent for approval.':'Дякую. Відгук надіслано на перевірку.';status.className='review-status show ok'}catch{status.textContent=isEN?'Could not send the review.':'Не вдалося надіслати відгук.';status.className='review-status show err'}finally{btn.disabled=false;btn.textContent=isEN?'Send review →':'Надіслати відгук →'} });
  openModal();
}

applyAvailability();
addProfileReview();
applyHeroCopy();
openButtons.forEach(b=>b.addEventListener('click',openContact));
closeButtons.forEach(b=>b.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const links=[...document.querySelectorAll('nav a[href^="#"]')];
const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver'in window&&sections.length){const io=new IntersectionObserver(entries=>{const visible=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+visible.target.id))},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.1,.3,.6]});sections.forEach(s=>io.observe(s))}

const revealTargets=document.querySelectorAll('.how-grid article,.project,.capabilities article,.platform');
if('IntersectionObserver'in window&&revealTargets.length){revealTargets.forEach((el,i)=>{el.classList.add('reveal-on-scroll');el.style.setProperty('--delay',`${Math.min(i*35,210)}ms`)});const rio=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');rio.unobserve(entry.target)}}),{threshold:.12});revealTargets.forEach(el=>rio.observe(el))}
