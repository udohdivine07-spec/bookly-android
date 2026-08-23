let currentRole=localStorage.getItem('booklyRole')||'';
const screens=[...document.querySelectorAll('.screen')];
let onboardIndex=0;

function show(id){
  const target=document.getElementById(id);
  if(!target)return;
  screens.forEach(s=>s.classList.toggle('active',s.id===id));
  window.scrollTo(0,0);
  document.documentElement.scrollTop=0;
  document.body.scrollTop=0;
  const app=document.getElementById('app');
  if(app)app.scrollTop=0;
}

function nextOnboard(){
  if(onboardIndex<2){setOnboard(onboardIndex+1);return;}
  show('auth');
}
function skipOnboard(){show('auth');}
function setOnboard(index){
  onboardIndex=Math.max(0,Math.min(2,index));
  const slides=document.querySelectorAll('.onboard-slide');
  slides.forEach((s,i)=>s.classList.toggle('active',i===onboardIndex));
  document.querySelectorAll('.onboard-dot').forEach((d,i)=>d.classList.toggle('on',i===onboardIndex));
  const btn=document.getElementById('onboardNext');
  if(btn)btn.textContent=onboardIndex===2?'Get started':'Next';
}
function enter(role){
  currentRole=role;
  localStorage.setItem('booklyRole',role);
  const type=document.getElementById('profileType');
  if(type)type.textContent=role==='seller'?'Business owner account':'Customer account';
  const name=localStorage.getItem('booklyUserName')||'Divine Udoh';
  const profileName=document.getElementById('profileName');
  const profileEdit=document.getElementById('profileEditName');
  const homeTitle=document.getElementById('homeTitle');
  if(profileName)profileName.textContent=name;
  if(profileEdit)profileEdit.value=name;
  if(homeTitle)homeTitle.textContent=`Welcome back, ${name.split(' ')[0]} 👋`;
  updateAvatar();
  show(role==='seller'?'seller':'home');
}
function chooseLogin(){show('login');setTimeout(()=>document.getElementById('loginEmail')?.focus(),80);}
function chooseSignup(){show('signup');setTimeout(()=>document.getElementById('signupName')?.focus(),80);}
function continueAsGuest(){show('role');}
function validEmail(value){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);}
function login(){
  const name=document.getElementById('loginName');
  const email=document.getElementById('loginEmail');
  const password=document.getElementById('loginPassword');
  const error=document.getElementById('loginError');
  if(!email?.value.trim()||!validEmail(email.value.trim())){if(error)error.textContent='Enter a valid email address.';return;}
  if(password && password.value.length<6){if(error)error.textContent='Password must be at least 6 characters.';return;}
  localStorage.setItem('booklyUserName',name?.value.trim()||'Divine Udoh');
  localStorage.setItem('booklyUserEmail',email.value.trim());
  if(error)error.textContent='';
  show('role');
}
function signup(){
  const name=document.getElementById('signupName');
  const email=document.getElementById('signupEmail');
  const password=document.getElementById('signupPassword');
  const error=document.getElementById('signupError');
  if(!name?.value.trim()||!email?.value.trim()||!validEmail(email.value.trim())){if(error)error.textContent='Enter your name and a valid email address.';return;}
  if(password && password.value.length<6){if(error)error.textContent='Password must be at least 6 characters.';return;}
  localStorage.setItem('booklyUserName',name.value.trim());
  localStorage.setItem('booklyUserEmail',email.value.trim());
  if(error)error.textContent='';
  show('role');
}
function book(name){
  localStorage.setItem('booklyBooking',name);
  const upcomingName=document.getElementById('upcomingName');
  const upcomingDate=document.getElementById('upcomingDate');
  const bookingLabel=document.getElementById('bookingLabel');
  if(upcomingName)upcomingName.textContent=name;
  if(upcomingDate)upcomingDate.textContent='Upcoming • Today at 10:30 AM';
  if(bookingLabel)bookingLabel.textContent=name;
  show('bookings');
}
function openSettings(){
  const toggle=document.getElementById('themeToggle');
  if(toggle)toggle.checked=localStorage.getItem('booklyTheme')==='dark';
  show('settings');
}
function setTheme(dark){
  document.body.classList.toggle('dark',dark);
  localStorage.setItem('booklyTheme',dark?'dark':'light');
  const toggle=document.getElementById('themeToggle');
  if(toggle)toggle.checked=dark;
}
function toggleTheme(el){setTheme(!!el.checked);}
function updateAvatar(){
  const photo=localStorage.getItem('booklyProfilePhoto');
  document.querySelectorAll('[data-avatar]').forEach(el=>{
    if(photo){el.style.backgroundImage=`url(${photo})`;el.classList.add('photo-avatar');el.textContent='';}
    else{el.style.backgroundImage='';el.classList.remove('photo-avatar');el.textContent=(localStorage.getItem('booklyUserName')||'Divine Udoh').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();}
  });
}
function pickProfilePhoto(){document.getElementById('profilePhotoInput')?.click();}
function saveProfilePhoto(input){
  const file=input.files?.[0];
  if(!file)return;
  if(file.size>3*1024*1024){alert('Please choose a photo smaller than 3 MB.');return;}
  const reader=new FileReader();
  reader.onload=()=>{localStorage.setItem('booklyProfilePhoto',reader.result);updateAvatar();};
  reader.readAsDataURL(file);
}
function saveProfile(){
  const name=document.getElementById('profileEditName')?.value.trim();
  if(name){localStorage.setItem('booklyUserName',name);document.getElementById('profileName').textContent=name;document.getElementById('homeTitle').textContent=`Welcome back, ${name.split(' ')[0]} 👋`;}
  updateAvatar();
  show(currentRole==='seller'?'seller':'home');
}
function logout(){
  localStorage.removeItem('booklyRole');
  localStorage.removeItem('booklyUserName');
  localStorage.removeItem('booklyUserEmail');
  currentRole='';
  onboardIndex=0;
  show('onboarding');
  setOnboard(0);
}

function setupAuthFields(){
  const login=document.getElementById('login');
  const signup=document.getElementById('signup');
  if(login && !document.getElementById('loginPassword')){
    const input=document.createElement('input');input.id='loginPassword';input.type='password';input.placeholder='Password';input.autocomplete='current-password';
    const label=document.createElement('label');label.textContent='Password';
    const error=document.getElementById('loginError');login.insertBefore(label,error);login.insertBefore(input,error);
  }
  if(signup && !document.getElementById('signupPassword')){
    const input=document.createElement('input');input.id='signupPassword';input.type='password';input.placeholder='At least 6 characters';input.autocomplete='new-password';
    const label=document.createElement('label');label.textContent='Password';
    const error=document.getElementById('signupError');signup.insertBefore(label,error);signup.insertBefore(input,error);
  }
}

function setupOnboarding(){
  const onboarding=document.getElementById('onboarding');
  if(!onboarding)return;
  onboarding.innerHTML=`
    <div class="brand"><div class="logo-mark bookly-logo">B</div><span>Bookly</span></div>
    <div class="onboard-carousel" id="onboardCarousel">
      <div class="onboard-slide active"><div class="hero-logo"><div class="logo-mark big bookly-logo">B</div></div><h1>Everything you book.<br><b>One simple app.</b></h1><p>Book appointments, manage customers and keep track of your business in one place.</p></div>
      <div class="onboard-slide"><div class="story-icon">📅</div><h1>Book in<br><b>seconds.</b></h1><p>Find great services, choose a time and keep every appointment organized.</p></div>
      <div class="onboard-slide"><div class="story-icon">💰</div><h1>Grow your<br><b>business.</b></h1><p>Manage bookings, customers, revenue and profit from one beautiful dashboard.</p></div>
    </div>
    <div class="dots"><i class="onboard-dot on"></i><i class="onboard-dot"></i><i class="onboard-dot"></i></div>
    <button class="primary" id="onboardNext">Next</button>
    <button class="text-btn" id="onboardSkip">I already have an account</button>`;
  document.getElementById('onboardNext').addEventListener('click',nextOnboard);
  document.getElementById('onboardSkip').addEventListener('click',skipOnboard);
  let startX=0,startY=0;
  const carousel=document.getElementById('onboardCarousel');
  carousel.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;startY=e.changedTouches[0].clientY;},{passive:true});
  carousel.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX;const dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)){if(dx<0&&onboardIndex<2)setOnboard(onboardIndex+1);if(dx>0&&onboardIndex>0)setOnboard(onboardIndex-1);}}, {passive:true});
  setOnboard(0);
}

window.addEventListener('load',()=>{
  setupOnboarding();
  setupAuthFields();
  setTheme(localStorage.getItem('booklyTheme')==='dark');
  const booking=localStorage.getItem('booklyBooking');
  if(booking){const n=document.getElementById('upcomingName'),d=document.getElementById('upcomingDate'),b=document.getElementById('bookingLabel');if(n)n.textContent=booking;if(d)d.textContent='Upcoming • Today at 10:30 AM';if(b)b.textContent=booking;}
  const savedName=localStorage.getItem('booklyUserName');
  if(savedName){const n=document.getElementById('profileName'),h=document.getElementById('homeTitle'),p=document.getElementById('profileEditName');if(n)n.textContent=savedName;if(h)h.textContent=`Welcome back, ${savedName.split(' ')[0]} 👋`;if(p)p.value=savedName;}
  updateAvatar();
  if(currentRole)enter(currentRole);else show('onboarding');
});