const isEN=document.documentElement.lang==='en';
const modal=document.getElementById('contactModal');
const dialog=modal?.querySelector('.dialog');
const openButtons=[...document.querySelectorAll('.contact-open')];
const closeButtons=[...document.querySelectorAll('.contact-close')];

const style=document.createElement('style');
style.textContent=`
.header{border:0!important;background:rgba(232,230,224,.94)!important;box-shadow:0 8px 28px rgba(20,20,16,.06)!important;border-radius:0!important}
.platforms,.how-section,.projects,.project,.split,.stack,footer{border-top:0!important;border-bottom:0!important}
.platforms{box-shadow:none!important;border-left:0!important;border-right:0!important}
.project:hover{padding-left:0!important;padding-right:0!important;background:rgba(255,255,255,.22)!important}
.hero h1{font-family:'Space Grotesk','DM Sans',Arial,sans-serif!important;font-weight:700!important}.hero h1 i{font-family:Georgia,'Times New Roman',serif!important;font-weight:400!important}
.hero .primary{border-radius:12px!important;border:0!important}.hero .secondary{border:0!important;background:#ebe9e3!important;border-radius:11px!important}.hero .secondary:hover{background:#e2e0d9!important}
.hero .profile:before,.hero .hero-aside:before{display:none!important}.hero .profile img,.hero .portrait{border:0!important;border-radius:18px!important;box-shadow:0 18px 45px rgba(20,20,16,.11)!important}.hero .portrait-frame{border:0!important;background:transparent!important;padding:0!important}
.contact-dialog{width:min(92vw,590px)!important;background:#fffdf8!important;border-radius:22px!important;padding:30px!important;box-shadow:0 28px 90px rgba(20,20,16,.22)!important}.contact-dialog h2{font-family:'Space Grotesk','DM Sans',Arial,sans-serif!important;font-size:clamp(34px,5vw,48px)!important;line-height:.98!important;letter-spacing:-.05em!important;margin:5px 0 9px!important}
.contact-form{display:grid!important;gap:10px!important;margin-top:22px!important}.contact-form label{font-size:11px!important;color:#686861!important}.contact-form input,.contact-form textarea{width:100%!important;border:1px solid #d7d3ca!important;background:#fff!important;border-radius:12px!important;padding:12px 13px!important;font:14px/1.45 'DM Sans',Arial,sans-serif!important;outline:none!important}.contact-form textarea{min-height:120px!important;resize:vertical!important}.contact-form input:focus,.contact-form textarea:focus{border-color:#3f5ee8!important;box-shadow:0 0 0 4px rgba(63,94,232,.10)!important}.contact-submit{min-height:50px!important;border:0!important;border-radius:11px!important;background:#3f5ee8!important;color:#fff!important;font-weight:800!important;cursor:pointer!important}.contact-submit:hover{background:#2f49cf!important}.contact-hint{font-size:10px!important;line-height:1.45!important;color:#85847d!important;margin:1px 0 0!important}.contact-status{display:none!important;font-size:12px!important;padding:10px 12px!important;border-radius:10px!important}.contact-status.show{display:block!important}.contact-status.ok{background:#e4f3ea!important;color:#226a48!important}.contact-status.err{background:#f8e5e0!important;color:#9a4131!important}.contact-alt{display:flex!important;gap:8px!important;flex-wrap:wrap!important;padding-top:12px!important;margin-top:4px!important;border-top:0!important}.contact-alt button,.contact-alt a{display:inline-flex!important;align-items:center!important;gap:7px!important;padding:8px 10px!important;border:0!important;border-radius:999px!important;background:#f0eee8!important;font-size:11px!important;font-weight:700!important;cursor:pointer!important}.contact-alt button:hover,.contact-alt a:hover{background:#e4e8fb!important;color:#3f5ee8!important}
@media(max-width:600px){.contact-dialog{padding:22px 17px!important}}
`;
document.head.appendChild(style);

function applyHeroCopy(){
  const hero=document.querySelector('.client-hero')||document.querySelector('.hero');
  if(!hero)return;
  const h=hero.querySelector('h1');
  const lead=hero.querySelector('.lead');
  const primary=hero.querySelector('.primary');
  const secondary=hero.querySelector('.secondary');
  if(isEN){
    if(h)h.innerHTML='Need it to<br><i>just work?</i>';
    if(lead)lead.textContent='Tell me what should work. I’ll take care of the technical side and help turn the idea into a working result.';
    if(primary){primary.innerHTML='Let’s discuss it <span>→</span>';primary.setAttribute('plerdy-tracking-id','hero-contact-en');}
    if(secondary){secondary.innerHTML='See the work <span>↓</span>';secondary.setAttribute('plerdy-tracking-id','hero-work-en');}
  }else{
    if(h)h.innerHTML='Потрібно, щоб<br><i>це просто працювало?</i>';
    if(lead)lead.textContent='Розкажіть, що має працювати. Технічну частину беру на себе — від ідеї до готового рішення.';
    if(primary){primary.innerHTML='Обговорити задачу <span>→</span>';primary.setAttribute('plerdy-tracking-id','hero-contact-ua');}
    if(secondary){secondary.innerHTML='Подивитися роботи <span>↓</span>';secondary.setAttribute('plerdy-tracking-id','hero-work-ua');}
  }
}
applyHeroCopy();

function buildContactDialog(){
  if(!dialog)return;
  dialog.classList.add('contact-dialog');
  dialog.innerHTML=`
    <button class="close contact-close" type="button" aria-label="Close">×</button>
    <p>${isEN?'CONTACT':'КОНТАКТ'}</p>
    <h2>${isEN?'Tell me what you need.':'Розкажіть, що потрібно.'}</h2>
    <span class="sub">${isEN?'A few lines are enough. No technical brief required.':'Достатньо кількох слів. Технічне ТЗ не потрібне.'}</span>
    <form class="contact-form" id="siteContactForm">
      <div><label>${isEN?'Your name':'Ваше ім’я'}</label><input name="name" required autocomplete="name" placeholder="${isEN?'Name':'Ім’я'}"></div>
      <div><label>${isEN?'Your email':'Ваш email'}</label><input name="email" type="email" required autocomplete="email" placeholder="name@example.com"></div>
      <div><label>${isEN?'What do you need?':'Що потрібно зробити?'}</label><textarea name="message" required placeholder="${isEN?'A website, automation, bot, integration…':'Сайт, автоматизація, бот, інтеграція…'}"></textarea></div>
      <input type="text" name="_honey" tabindex="-1" autocomplete="off" style="display:none!important">
      <input type="hidden" name="_subject" value="${isEN?'New portfolio inquiry':'Нове звернення з портфоліо'}">
      <input type="hidden" name="_template" value="table">
      <button class="contact-submit" type="submit">${isEN?'Send message →':'Надіслати повідомлення →'}</button>
      <div class="contact-status" id="contactStatus"></div>
      <p class="contact-hint">${isEN?'Email: sent without leaving the site. Telegram: the chat opens with your message ready to send.':'Email: надсилається без виходу із сайту. Telegram: чат відкриється з уже підготовленим повідомленням.'}</p>
    </form>
    <div class="contact-alt"><span style="font-size:10px;color:#85847d;align-self:center">${isEN?'Or use:':'Або через:'}</span><button type="button" data-direct="telegram">Telegram</button><a href="https://www.fiverr.com/enotik_" target="_blank" rel="noreferrer">Fiverr</a><a href="https://freelancehunt.com/ua/showcase/work/freelance-helper-telegram-bot-dlya/2046690.html" target="_blank" rel="noreferrer">Freelancehunt</a></div>`;
  bindDialog();
}
function openContact(platform){
  if(!modal)return;
  buildContactDialog();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  setTimeout(()=>dialog.querySelector('textarea')?.focus(),120);
}
function closeContact(){
  if(!modal)return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
function bindDialog(){
  dialog.querySelectorAll('.contact-close').forEach(b=>b.addEventListener('click',closeContact));
  const form=dialog.querySelector('#siteContactForm');
  const status=dialog.querySelector('#contactStatus');
  form?.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!status)return;
    const button=form.querySelector('.contact-submit');button.disabled=true;button.textContent=isEN?'Sending…':'Надсилаю…';status.className='contact-status';
    const data=Object.fromEntries(new FormData(form).entries());
    try{
      const res=await fetch('https://formsubmit.co/ajax/maks2006bl@gmail.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});
      if(!res.ok)throw new Error('submit');
      form.reset();status.textContent=isEN?'Sent. I’ll get back to you soon.':'Надіслано. Я зв’яжуся з вами найближчим часом.';status.className='contact-status show ok';
    }catch(err){status.textContent=isEN?'Could not send. Try Telegram instead.':'Не вдалося надіслати. Спробуйте Telegram.';status.className='contact-status show err';}
    finally{button.disabled=false;button.textContent=isEN?'Send message →':'Надіслати повідомлення →';}
  });
  dialog.querySelector('[data-direct="telegram"]')?.addEventListener('click',()=>{
    const data=new FormData(form);const name=String(data.get('name')||'').trim();const email=String(data.get('email')||'').trim();const message=String(data.get('message')||'').trim();
    const text=isEN?`Hi Maksym!\n\nName: ${name}\nEmail: ${email}\n\n${message}`:`Привіт, Максиме!\n\nІм’я: ${name}\nEmail: ${email}\n\n${message}`;
    window.open('https://t.me/MaksBlischik?text='+encodeURIComponent(text),'_blank','noopener,noreferrer');
  });
}
openButtons.forEach(b=>b.addEventListener('click',()=>openContact(b.dataset.platform||'telegram')));
closeButtons.forEach(b=>b.addEventListener('click',closeContact));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeContact()});

const links=[...document.querySelectorAll('nav a[href^="#"]')];
const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window&&sections.length){const io=new IntersectionObserver(entries=>{const visible=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+visible.target.id));},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.1,.3,.6]});sections.forEach(s=>io.observe(s));}

const revealTargets=document.querySelectorAll('.how-grid article,.project,.capabilities article,.platform');
if('IntersectionObserver' in window&&revealTargets.length){revealTargets.forEach((el,i)=>{el.classList.add('reveal-on-scroll');el.style.setProperty('--delay',`${Math.min(i*35,210)}ms`)});const rio=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');rio.unobserve(entry.target)}}),{threshold:.12});revealTargets.forEach(el=>rio.observe(el));}
