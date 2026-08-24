(function(){
  function initHRDemo(){
    const root=document.querySelector('.preview-hr');
    if(!root||root.dataset.hrReady)return;
    root.dataset.hrReady='1';
    const en=document.documentElement.lang==='en';
    const candidates=[
      {id:1,name:'Анна Коваль',role:'Frontend Developer',stage:'Interview',score:92,location:'Kyiv',email:'anna@example.com'},
      {id:2,name:'Максим Шевченко',role:'Backend Developer',stage:'Review',score:87,location:'Lviv',email:'maksym@example.com'},
      {id:3,name:'Олена Бондар',role:'UI/UX Designer',stage:'Offer',score:95,location:'Rivne',email:'olena@example.com'},
      {id:4,name:'Ігор Мельник',role:'QA Engineer',stage:'New',score:81,location:'Odesa',email:'ihor@example.com'},
      {id:5,name:'Марія Ткач',role:'Project Manager',stage:'Interview',score:90,location:'Dnipro',email:'maria@example.com'}
    ];
    const t=en?{
      search:'Search candidates…',dashboard:'Dashboard',candidates:'Candidates',vacancies:'Vacancies',interviews:'Interviews',add:'+ Add candidate',all:'All',new:'New',review:'Review',interview:'Interview',offer:'Offer',candidate:'candidate',candidates:'candidates',score:'Match',location:'Location',stage:'Stage',details:'Candidate details',send:'Send message',close:'Close',demo:'Interactive demo · local data',empty:'No candidates match this filter.'
    }:{
      search:'Пошук кандидатів…',dashboard:'Дашборд',candidates:'Кандидати',vacancies:'Вакансії',interviews:'Співбесіди',add:'+ Додати кандидата',all:'Усі',new:'Нові',review:'Перевірка',interview:'Співбесіда',offer:'Офер',candidate:'кандидат',candidates:'кандидатів',score:'Відповідність',location:'Місто',stage:'Етап',details:'Дані кандидата',send:'Написати',close:'Закрити',demo:'Інтерактивна демоверсія · локальні дані',empty:'Кандидатів за цим фільтром немає.'
    };
    let activeTab='candidates',filter='all',query='';
    root.className='preview preview-hr hr-demo';
    root.innerHTML=`
      <div class="hr-demo-topbar"><div class="hr-brand"><span>HR</span><b>Reserve</b></div><nav class="hr-tabs" aria-label="${en?'Application sections':'Розділи застосунку'}">
        <button data-tab="dashboard">${t.dashboard}</button><button class="active" data-tab="candidates">${t.candidates}</button><button data-tab="vacancies">${t.vacancies}</button><button data-tab="interviews">${t.interviews}</button>
      </nav><span class="hr-live"><i></i> DEMO</span></div>
      <div class="hr-demo-body">
        <div class="hr-toolbar"><div><span class="hr-section-title" data-title>${t.candidates}</span><small>${t.demo}</small></div><button class="hr-add" type="button">${t.add}</button></div>
        <div class="hr-controls"><label class="hr-search"><span>⌕</span><input type="search" placeholder="${t.search}" aria-label="${t.search}"></label><div class="hr-filters"><button class="active" data-filter="all">${t.all}</button><button data-filter="new">${t.new}</button><button data-filter="review">${t.review}</button><button data-filter="interview">${t.interview}</button><button data-filter="offer">${t.offer}</button></div></div>
        <div class="hr-content" data-content></div>
      </div>
      <div class="hr-demo-toast" role="status" aria-live="polite"></div>`;

    const content=root.querySelector('[data-content]');
    const toast=root.querySelector('.hr-demo-toast');
    const title=root.querySelector('[data-title]');
    const input=root.querySelector('input[type=search]');

    function stageLabel(stage){return t[stage.toLowerCase()]||stage}
    function filtered(){return candidates.filter(c=>(filter==='all'||c.stage.toLowerCase()===filter)&&((c.name+' '+c.role+' '+c.location).toLowerCase().includes(query.toLowerCase())))}
    function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove('show'),1800)}
    function renderList(){
      const list=filtered();
      if(!list.length){content.innerHTML=`<div class="hr-empty">${t.empty}</div>`;return}
      content.innerHTML=`<div class="hr-kpis"><div><small>${t.candidates}</small><b>${list.length}</b></div><div><small>${t.interviews}</small><b>${list.filter(c=>c.stage==='Interview').length}</b></div><div><small>${t.offer}</small><b>${list.filter(c=>c.stage==='Offer').length}</b></div></div><div class="hr-table">${list.map(c=>`<button class="hr-row" type="button" data-id="${c.id}"><span class="hr-avatar">${c.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</span><span class="hr-person"><b>${c.name}</b><small>${c.role}</small></span><span class="hr-stage ${c.stage.toLowerCase()}">${stageLabel(c.stage)}</span><span class="hr-score"><b>${c.score}%</b><small>${t.score}</small></span><span class="hr-arrow">→</span></button>`).join('')}</div>`;
      content.querySelectorAll('.hr-row').forEach(b=>b.addEventListener('click',()=>openCandidate(Number(b.dataset.id))));
    }
    function openCandidate(id){
      const c=candidates.find(x=>x.id===id);if(!c)return;
      content.innerHTML=`<div class="hr-detail"><button class="hr-back" type="button">← ${t.candidates}</button><div class="hr-detail-head"><div class="hr-avatar big">${c.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</div><div><span class="hr-stage ${c.stage.toLowerCase()}">${stageLabel(c.stage)}</span><h3>${c.name}</h3><p>${c.role}</p></div><div class="hr-detail-score"><small>${t.score}</small><b>${c.score}%</b></div></div><div class="hr-detail-grid"><div><small>${t.location}</small><b>${c.location}</b></div><div><small>Email</small><b>${c.email}</b></div><div><small>${t.stage}</small><b>${stageLabel(c.stage)}</b></div></div><div class="hr-detail-actions"><button type="button" class="hr-primary" data-action="message">${t.send}</button><button type="button" class="hr-secondary" data-action="advance">${en?'Move to next stage':'Перевести далі'}</button></div></div>`;
      content.querySelector('.hr-back').addEventListener('click',renderList);
      content.querySelector('[data-action=message]').addEventListener('click',()=>showToast(en?'Message draft created':'Чернетку повідомлення створено'));
      content.querySelector('[data-action=advance]').addEventListener('click',()=>{const order=['New','Review','Interview','Offer'];const i=order.indexOf(c.stage);c.stage=order[Math.min(i+1,3)];showToast(en?'Stage updated':'Етап оновлено');openCandidate(c.id)});
    }
    function renderDashboard(){
      title.textContent=t.dashboard;
      content.innerHTML=`<div class="hr-dashboard"><div class="hr-dash-card accent"><small>${t.candidates}</small><b>48</b><span>+12% this month</span></div><div class="hr-dash-card"><small>${t.vacancies}</small><b>8</b><span>3 priority roles</span></div><div class="hr-dash-card"><small>${t.interviews}</small><b>12</b><span>5 today</span></div><div class="hr-dash-chart"><div class="hr-chart-head"><b>Hiring activity</b><small>Last 7 days</small></div><div class="hr-bars">${[42,56,48,70,62,84,74].map((h,i)=>`<i style="height:${h}%" title="${i+1}"></i>`).join('')}</div></div></div>`;
    }
    function renderSimple(tab){
      const titleMap={vacancies:t.vacancies,interviews:t.interviews};title.textContent=titleMap[tab]||t.dashboard;
      const items=tab==='vacancies'?[['Backend Developer','2 candidates','High priority'],['Frontend Developer','6 candidates','Open'],['QA Engineer','3 candidates','Open']]:[['Today · 11:00','Анна Коваль','Frontend Developer'],['Today · 14:30','Марія Ткач','Project Manager'],['Tomorrow · 10:00','Ігор Мельник','QA Engineer']];
      content.innerHTML=`<div class="hr-simple-list">${items.map(x=>`<div class="hr-simple-item"><span>${x[0]}</span><b>${x[1]}</b><small>${x[2]}</small></div>`).join('')}</div>`;
    }
    function switchTab(tab){activeTab=tab;root.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));if(tab==='candidates'){title.textContent=t.candidates;renderList()}else if(tab==='dashboard'){renderDashboard()}else renderSimple(tab)}
    root.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));
    root.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;root.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));switchTab('candidates')}));
    input.addEventListener('input',e=>{query=e.target.value;activeTab='candidates';root.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab==='candidates'));title.textContent=t.candidates;renderList()});
    root.querySelector('.hr-add').addEventListener('click',()=>showToast(en?'Demo only — data is local':'Демо-режим — дані локальні'));
    switchTab('candidates');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initHRDemo);else initHRDemo();
})();
