(function(){
'use strict';
var icons={phone:'call',clock:'schedule',plus:'add',heart:'favorite',flask:'science',pill:'medication',bed:'bed',wave:'waves',cut:'content_cut',users:'groups',pregnant:'pregnant_woman',mail:'mail',chat:'chat',moon:'dark_mode',sun:'light_mode',menu:'menu',close:'close',check:'check',pin:'location_on',shield:'verified_user',smile:'sentiment_satisfied',dna:'genetics',cal:'calendar_month',ambulance:'ambulance'};
function renderIcons(root){(root||document).querySelectorAll('i[data-i]').forEach(function(el){var key=el.dataset.i;if(key==='truck'){el.innerHTML='<svg aria-hidden="true" viewBox="0 0 48 32" width="1.45em" height="1em" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="27" height="18" rx="2"/><path d="M29 13h8l7 7v5H29z"/><circle cx="11" cy="26" r="3"/><circle cx="37" cy="26" r="3"/><path d="M15.5 11v10M10.5 16h10" stroke="currentColor" stroke-width="2.8"/></svg>';return;}var name=icons[key]||'help';el.innerHTML='<span class="material-symbols-rounded" aria-hidden="true">'+name+'</span>';});}
var html=document.documentElement,themeButton=document.getElementById('th');
function setTheme(theme){html.dataset.theme=theme;try{localStorage.setItem('theme',theme);}catch(e){}if(themeButton){themeButton.setAttribute('aria-label',theme==='dark'?'Switch to light mode':'Switch to dark mode');themeButton.innerHTML='<i data-i="'+(theme==='dark'?'sun':'moon')+'"></i>';renderIcons(themeButton);}}
var saved=null;try{saved=localStorage.getItem('theme');}catch(e){}
setTheme(saved||(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
if(themeButton)themeButton.addEventListener('click',function(){setTheme(html.dataset.theme==='dark'?'light':'dark');});
renderIcons(document);
var menuButton=document.getElementById('mb'),nav=document.getElementById('nav');
if(menuButton&&nav){menuButton.setAttribute('aria-controls','nav');}
function closeMenu(){if(!menuButton||!nav)return;nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');menuButton.innerHTML='<i data-i="menu"></i>';renderIcons(menuButton);}
if(menuButton&&nav){menuButton.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();var open=!nav.classList.contains('open');nav.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');menuButton.innerHTML='<i data-i="'+(open?'close':'menu')+'"></i>';renderIcons(menuButton);});nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',closeMenu);});document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu();});window.addEventListener('resize',function(){if(window.innerWidth>860)closeMenu();});document.addEventListener('click',function(e){if(nav.classList.contains('open')&&!nav.contains(e.target)&&!menuButton.contains(e.target))closeMenu();});}
// About page professionals carousel
var teamCarousel=document.querySelector('[data-team-carousel]');
if(teamCarousel){
 var track=teamCarousel.querySelector('.team-track'),viewport=teamCarousel.querySelector('.team-viewport'),dotsWrap=teamCarousel.querySelector('[data-team-dots]');
 var originals=Array.prototype.slice.call(track.children),total=originals.length,teamIndex=0,teamTimer=null,teamPause=false,resetting=false;
 var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 originals.slice(0,3).forEach(function(card){var clone=card.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.querySelectorAll('a,button').forEach(function(el){el.setAttribute('tabindex','-1');});track.appendChild(clone);});
 for(var di=0;di<total;di++){(function(i){var dot=document.createElement('button');dot.type='button';dot.className='team-dot';dot.setAttribute('aria-label','Show professional '+(i+1));dot.addEventListener('click',function(){goTeam(i);restartTeamTimer();});dotsWrap.appendChild(dot);})(di);}
 function teamStep(){var card=track.children[0];if(!card)return 0;var style=window.getComputedStyle(track);return card.getBoundingClientRect().width+(parseFloat(style.columnGap||style.gap)||14);}
 function updateTeam(){track.style.transform='translate3d('+(-teamIndex*teamStep())+'px,0,0)';dotsWrap.querySelectorAll('.team-dot').forEach(function(dot,i){dot.setAttribute('aria-current',String(i===teamIndex%total));});var current=teamCarousel.querySelector('[data-team-current]');if(current)current.textContent=String((teamIndex%total)+1).padStart(2,'0');}
 function goTeam(index){teamIndex=index;track.style.transition='';updateTeam();}
 track.addEventListener('transitionend',function(){if(teamIndex>=total){track.style.transition='none';teamIndex=0;updateTeam();track.offsetHeight;track.style.transition='';}});
 function nextTeam(){if(teamIndex>=total){teamIndex=0;}teamIndex++;track.style.transition='';if(teamIndex===total){track.style.transition='';}updateTeam();}
 function prevTeam(){if(teamIndex<=0){track.style.transition='none';teamIndex=total;updateTeam();track.offsetHeight;track.style.transition='';teamIndex=total-1;updateTeam();}else{teamIndex--;updateTeam();}}
 function stopTeamTimer(){if(teamTimer){window.clearInterval(teamTimer);teamTimer=null;}}
 function startTeamTimer(){stopTeamTimer();if(!reduced&&!teamPause){teamTimer=window.setInterval(nextTeam,5000);}}
 function restartTeamTimer(){startTeamTimer();}
 var prev=teamCarousel.closest('.team-layout').querySelector('[data-team-prev]'),next=teamCarousel.closest('.team-layout').querySelector('[data-team-next]');
 if(prev)prev.addEventListener('click',function(){prevTeam();restartTeamTimer();});if(next)next.addEventListener('click',function(){nextTeam();restartTeamTimer();});
 teamCarousel.addEventListener('mouseenter',function(){teamPause=true;stopTeamTimer();});teamCarousel.addEventListener('mouseleave',function(){teamPause=false;startTeamTimer();});teamCarousel.addEventListener('focusin',function(){teamPause=true;stopTeamTimer();});teamCarousel.addEventListener('focusout',function(e){if(!teamCarousel.contains(e.relatedTarget)){teamPause=false;startTeamTimer();}});
 document.addEventListener('visibilitychange',function(){if(document.hidden){stopTeamTimer();}else{startTeamTimer();}});
 var teamResize;window.addEventListener('resize',function(){window.clearTimeout(teamResize);teamResize=window.setTimeout(updateTeam,100);});
 updateTeam();startTeamTimer();
}
var year=document.getElementById('yr');if(year)year.textContent=new Date().getFullYear();
if(window.AOS)AOS.init({duration:650,once:true,offset:60,easing:'ease-out-cubic',disable:!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)});
var dateInput=document.getElementById('d');if(dateInput){var today=new Date();dateInput.min=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');}
window.sendBooking=function(){var get=function(id){var el=document.getElementById(id);return el?(el.value||'').trim():'';};var name=get('n'),phone=get('p'),service=get('s'),date=get('d'),message=get('m');if(!name||!phone||!service){return false;}if(date&&dateInput&&date<dateInput.min){dateInput.setCustomValidity('Please choose today or a future date.');dateInput.reportValidity();dateInput.setCustomValidity('');return false;}var text='Hello Atlantic Hospital, my name is '+name+'. My phone number is '+phone+'. I would like to enquire about/book: '+service+'. Preferred date: '+(date||'Not specified')+'.'+(message?'\nMessage: '+message:'');var url='https://wa.me/2349053386559?text='+encodeURIComponent(text);var win=window.open(url,'_blank');if(win){win.opener=null;}else{window.location.href=url;}return false;};
})();
