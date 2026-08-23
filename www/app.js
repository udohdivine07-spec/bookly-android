let currentRole=localStorage.getItem('booklyRole')||'';
const screens=[...document.querySelectorAll('.screen')];
function show(id){
  const target=document.getElementById(id);
  if(!target)return;
  screens.forEach(s=>s.classList.toggle('active',s.id===id));
  document.documentElement.scrollTop=0;
  document.body.scrollTop=0;
  const app=document.getElementById('app');
  if(app)app.scrollTop=0;
}
function nextOnboard(){show('auth');}
function skipOnboard(){show('auth');}
function enter(role){
  currentRole=role;
  localStorage.setItem('booklyRole',role);
  const type=document.getElementById('profileType');
  if(type)type.textContent=role==='seller'?'Business owner account':'Customer account';
  const name=localStorage.getItem('booklyUserName')||'Divine Udoh';
  const profileName=document.getElementById('profileName');
  const homeTitle=document.getElementById('homeTitle');
  if(profileName)profileName.textContent=name;
  if(homeTitle)homeTitle.textContent=`Welcome back, ${name.split(' ')[0]} 👋`;
  updateAvatar();
  show(role==='seller'?'seller':'home');
}
function chooseLogin(){show('login');}
function chooseSignup(){show('signup');}
function continueAsGuest(){show('role');}
function validEmail(value){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);}
function login(){
  const name=document.getElementById('loginName');
  const email=document.getElementById('loginEmail');
  const error=document.getElementById('loginError');
  if(!email?.value.trim()||!validEmail(email.value.trim())){if(error)error.textContent='Enter a valid email address.';return;}
  localStorage.setItem('booklyUserName',name?.value.trim()||'Divine Udoh');
  localStorage.setItem('booklyUserEmail',email.value.trim());
  if(error)error.textContent='';
  show('role');
}
function signup(){
  const name=document.getElementById('signupName');
  const email=document.getElementById('signupEmail');
  const error=document.getElementById('signupError');
  if(!name?.value.trim()||!email?.value.trim()||!validEmail(email.value.trim())){if(error)error.textContent='Enter your name and a valid email address.';return;}
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
function removeProfilePhoto(){localStorage.removeItem('booklyProfilePhoto');updateAvatar();}
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
  show('onboarding');
}
window.addEventListener('load',()=>{
  setTheme(localStorage.getItem('booklyTheme')==='dark');
  const booking=localStorage.getItem('booklyBooking');
  if(booking){const n=document.getElementById('upcomingName'),d=document.getElementById('upcomingDate'),b=document.getElementById('bookingLabel');if(n)n.textContent=booking;if(d)d.textContent='Upcoming • Today at 10:30 AM';if(b)b.textContent=booking;}
  const savedName=localStorage.getItem('booklyUserName');
  if(savedName){const n=document.getElementById('profileName'),h=document.getElementById('homeTitle');if(n)n.textContent=savedName;if(h)h.textContent=`Welcome back, ${savedName.split(' ')[0]} 👋`;}
  updateAvatar();
  if(currentRole)enter(currentRole);else show('onboarding');
});