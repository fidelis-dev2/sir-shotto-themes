(() => {
'use strict';
const frame=document.getElementById('theme-frame');
const widgets=document.getElementById('widget-layer');
const clock=document.getElementById('widget-clock');
const date=document.getElementById('widget-date');
const error=document.getElementById('renderer-error');
let currentTheme='';
let widgetsEnabled=true;
function updateClock(){
  const now=new Date();
  clock.textContent=now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  date.textContent=now.toLocaleDateString([], {weekday:'long',year:'numeric',month:'long',day:'numeric'});
}
function setWidgets(enabled){
  widgetsEnabled=Boolean(enabled);
  widgets.classList.toggle('enabled',widgetsEnabled);
  widgets.setAttribute('aria-hidden',String(!widgetsEnabled));
}
function safeThemeId(id){
  return typeof id==='string' && /^[a-z0-9][a-z0-9-]{0,60}$/.test(id);
}
function loadTheme(id,enabled=true){
  if(!safeThemeId(id)){error.hidden=false;return;}
  currentTheme=id;
  widgetsEnabled=Boolean(enabled);
  error.hidden=true;
  frame.src='themes/'+encodeURIComponent(id)+'/index.html';
  setWidgets(widgetsEnabled);
}
frame.addEventListener('error',()=>{error.hidden=false;});
window.ShottoDesktop={loadTheme,setWidgets,getTheme:()=>currentTheme};
updateClock();
setInterval(updateClock,1000);
window.addEventListener('message',event=>{
  if(!event.data || typeof event.data!=='object')return;
  if(event.source===frame.contentWindow && event.data.type==='shotto:widgets')
    setWidgets(Boolean(event.data.enabled));
  else if(window.parent!==window && event.source===window.parent && event.data.type==='shotto:widgets')
    setWidgets(Boolean(event.data.enabled));
});
const params=new URLSearchParams(location.search);
if(params.has('theme'))loadTheme(params.get('theme'),params.get('widgets')!=='false');
})();
