document.getElementById("year").textContent=new Date().getFullYear();
const sections=[...document.querySelectorAll("section[id]")];
const links=[...document.querySelectorAll(".desktop-nav a")];
const setActive=()=>{const y=window.scrollY+150;let id="";for(const s of sections){if(s.offsetTop<=y)id=s.id}links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id))};
setActive();window.addEventListener("scroll",setActive,{passive:true});
const mobileCta=document.querySelector(".mobile-cta");
const heroCta=document.querySelector("[plerdy-tracking-id='hero-telegram'],[plerdy-tracking-id='hero-telegram-en']");
if(mobileCta&&heroCta&&"IntersectionObserver"in window){
  const observer=new IntersectionObserver(([entry])=>mobileCta.classList.toggle("show",!entry.isIntersecting),{threshold:.15});
  observer.observe(heroCta);
}
