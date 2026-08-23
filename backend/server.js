const http = require('http');
const crypto = require('crypto');
const PORT = process.env.PORT || 8787;
const users = new Map();
const bookings = [];
const expenses = [];
const json = value => JSON.stringify(value);
function send(res, status, body) {
  res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Methods':'GET,POST,OPTIONS'});
  res.end(json(body));
}
function readBody(req){return new Promise((resolve,reject)=>{let data='';req.on('data',c=>data+=c);req.on('end',()=>{try{resolve(data?JSON.parse(data):{})}catch(e){reject(e)}})})}
const server=http.createServer(async (req,res)=>{
  if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Methods':'GET,POST,OPTIONS'});return res.end();}
  try{
    if(req.url==='/api/health' && req.method==='GET') return send(res,200,{ok:true,service:'bookly-api',version:'1.0'});
    if(req.url==='/api/auth/signup' && req.method==='POST'){
      const b=await readBody(req); if(!b.email||!b.name||!b.password) return send(res,400,{error:'name, email and password are required'});
      const email=b.email.toLowerCase(); if(users.has(email)) return send(res,409,{error:'account already exists'});
      const user={id:crypto.randomUUID(),name:b.name,email,role:b.role||'customer',brandName:b.brandName||'',avatar:b.avatar||null}; users.set(email,{...user,password:b.password}); return send(res,201,{user,token:crypto.randomUUID()});
    }
    if(req.url==='/api/auth/login' && req.method==='POST'){
      const b=await readBody(req); const u=users.get((b.email||'').toLowerCase()); if(!u||u.password!==b.password) return send(res,401,{error:'invalid email or password'}); const {password,...user}=u; return send(res,200,{user,token:crypto.randomUUID()});
    }
    if(req.url==='/api/bookings' && req.method==='GET') return send(res,200,{bookings});
    if(req.url==='/api/bookings' && req.method==='POST'){const b=await readBody(req);const item={id:crypto.randomUUID(),...b,status:'confirmed',createdAt:new Date().toISOString()};bookings.push(item);return send(res,201,item);}
    if(req.url==='/api/expenses' && req.method==='GET') return send(res,200,{expenses});
    if(req.url==='/api/expenses' && req.method==='POST'){const b=await readBody(req);const item={id:crypto.randomUUID(),...b,createdAt:new Date().toISOString()};expenses.push(item);return send(res,201,item);}
    if(req.url==='/api/dashboard' && req.method==='GET') return send(res,200,{revenue:248500,expenses:167300,profit:81200,bookings:bookings.length||42,customers:31});
    return send(res,404,{error:'route not found'});
  }catch(e){return send(res,500,{error:'server error'});}
});
server.listen(PORT,()=>console.log(`Bookly API listening on ${PORT}`));
