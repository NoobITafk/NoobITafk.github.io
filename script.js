const previewStyles=document.createElement("link");
previewStyles.rel="stylesheet";
previewStyles.href="previews.css";
document.head.appendChild(previewStyles);

document.getElementById("year").textContent=new Date().getFullYear();
const items=document.querySelectorAll(".reveal");
if("IntersectionObserver"in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}
    })
  },{threshold:.1});
  items.forEach(item=>observer.observe(item));
}else{items.forEach(item=>item.classList.add("visible"))}
