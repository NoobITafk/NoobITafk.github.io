const previewStyles=document.createElement("link");
previewStyles.rel="stylesheet";
previewStyles.href="previews.css";
document.head.appendChild(previewStyles);

const year=document.getElementById("year");
if(year) year.textContent=new Date().getFullYear();

const items=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:.08,rootMargin:"0px 0px -30px 0px"});
  items.forEach(item=>revealObserver.observe(item));
}else{
  items.forEach(item=>item.classList.add("visible"));
}

const navLinks=[...document.querySelectorAll(".nav a[href^='#']")];
const sections=navLinks.map(link=>document.querySelector(link.getAttribute("href"))).filter(Boolean);
if("IntersectionObserver" in window && sections.length){
  const sectionObserver=new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(!visible) return;
    navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+visible.target.id));
  },{rootMargin:"-25% 0px -55% 0px",threshold:[0,.15,.35,.6]});
  sections.forEach(section=>sectionObserver.observe(section));
}
