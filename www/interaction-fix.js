/* Bookly mobile interaction safety layer */
(function(){
  'use strict';
  function bind(){
    var b=document.getElementById('onboardNext');
    if(b){ b.onclick=function(e){ if(e)e.preventDefault(); if(typeof nextOnboard==='function')nextOnboard(); return false; }; b.ontouchend=function(e){ if(e)e.preventDefault(); if(typeof nextOnboard==='function')nextOnboard(); return false; }; }
    var s=document.getElementById('onboardSkip');
    if(s){ s.onclick=function(e){ if(e)e.preventDefault(); if(typeof skipOnboard==='function')skipOnboard(); return false; }; s.ontouchend=function(e){ if(e)e.preventDefault(); if(typeof skipOnboard==='function')skipOnboard(); return false; }; }
    var a=document.getElementById('auth');
    if(a){var bs=a.querySelectorAll('button');if(bs.length>0)bs[0].onclick=function(){chooseLogin();};if(bs.length>1)bs[1].onclick=function(){chooseSignup();};if(bs.length>2)bs[2].onclick=function(){continueAsGuest();};}
    var l=document.getElementById('login');
    if(l){var p=l.querySelector('.primary');if(p)p.onclick=function(){login();};var x=l.querySelector('.text-btn');if(x)x.onclick=function(){chooseSignup();};}
    var g=document.getElementById('signup');
    if(g){var p2=g.querySelector('.primary');if(p2)p2.onclick=function(){signup();};var x2=g.querySelector('.text-btn');if(x2)x2.onclick=function(){chooseLogin();};}
  }
  document.addEventListener('DOMContentLoaded',bind);
  window.addEventListener('load',bind);
  setTimeout(bind,100);
  setTimeout(bind,500);
  setTimeout(bind,1500);
  if(window.MutationObserver){new MutationObserver(bind).observe(document.body,{childList:true,subtree:true});}
})();
