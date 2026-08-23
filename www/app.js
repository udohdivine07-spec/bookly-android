let currentRole=localStorage.getItem('booklyRole')||'';
let onboardStep=0;
const screens=[...document.querySelectorAll('.screen')];
function show(id){
  const target=document.getElementById(id);
  if(!target)return;
  screens.forEach(s=>s.classList.toggle('active',s.id===id));
  window.scrollTo(0,0);
}
function nextOnboard(){show('role');}
function skipOnboard(){show('login');}
function enter(role){
  currentRole=role;
  localStorage.setItem('booklyRole',role);
  const type=document.getElementById('profileType');
  if(type)type.textContent=role==='seller'?'Business owner account':'Customer account';
  show(role==='seller'?'seller':'home');
}
function continueAsGuest(){show('role');}
function login(){
  const name=document.getElementById('loginName');
  const email=document.getElementById('loginEmail');
  const error=document.getElementById('loginError');
  if(!email||!email.value.trim()){
    if(error)error.textContent='Please enter your email address.';
    return;
  }
  localStorage.setItem('booklyUserName',name?.value.trim()||'Divine');
  localStorage.setItem('booklyUserEmail',email.value.trim());
  if(error)error.textContent='';
  show('role');
}
function signup(){
  const name=document.getElementById('signupName');
  const email=document.getElementById('signupEmail');
  const error=document.getElementById('signupError');
  if(!name?.value.trim()||!email?.value.trim()){
    if(error)error.textContent='Please complete your name and email.';
    return;
  }
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
function logout(){
  localStorage.removeItem('booklyRole');
  localStorage.removeItem('booklyUserName');
  localStorage.removeItem('booklyUserEmail');
  currentRole='';
  show('onboarding');
}
window.addEventListener('load',()=>{
  const booking=localStorage.getItem('booklyBooking');
  if(booking){
    const n=document.getElementById('upcomingName');
    const d=document.getElementById('upcomingDate');
    const b=document.getElementById('bookingLabel');
    if(n)n.textContent=booking;
    if(d)d.textContent='Upcoming • Today at 10:30 AM';
    if(b)b.textContent=booking;
  }
  if(currentRole)enter(currentRole);else show('onboarding');
});