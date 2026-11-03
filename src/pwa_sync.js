/* ==== SYNC-BEGIN ==== */
/* ============================ CONTA E SINCRONIZAÇÃO (Supabase) ============================ */
const SB_URL="https://velritgzwafzbrpqznqz.supabase.co",SB_KEY="sb_publishable_P6DotFxWAHaXo-eEOtrwgA_e5o35PEl";
const AUTH_KEY="nonna.auth:"+(CURP?CURP.id:"__sem-perfil"),SYNCED_KEY="nonna.synced:"+(CURP?CURP.id:"__sem-perfil");
const SYNC_ON=false; // liga quando a tabela "progress" existir no Supabase
const SYNC={session:null,state:"off",last:0,msg:"",busy:false};
try{SYNC.session=JSON.parse(localStorage.getItem(AUTH_KEY)||"null")}catch(e){}
function sbSaveSession(s){SYNC.session=s;try{s?localStorage.setItem(AUTH_KEY,JSON.stringify(s)):localStorage.removeItem(AUTH_KEY)}catch(e){}}
function sbErr(j,status){const m=(j&&(j.msg||j.message||j.error_description||j.error))||"";
 if(/invalid login|invalid_credentials/i.test(m))return"E-mail ou senha incorretos.";
 if(/already registered|already exists/i.test(m))return"Esse e-mail já tem conta. Use “Entrar”.";
 if(/password.*(6|characters|short)/i.test(m))return"A senha precisa ter pelo menos 6 caracteres.";
 if(/email.*(invalid|valid)/i.test(m))return"Esse e-mail não parece válido.";
 if(/not confirmed/i.test(m))return"Essa conta ainda não foi confirmada por e-mail.";
 if(/rate limit|too many/i.test(m)||status===429)return"Muitas tentativas seguidas. Espere alguns minutos.";
 return m||"Não deu certo agora. Tente de novo.";}
async function sbAuth(path,body){let r;try{r=await fetch(SB_URL+"/auth/v1/"+path,{method:"POST",headers:{"apikey":SB_KEY,"Content-Type":"application/json"},body:JSON.stringify(body)})}catch(e){throw{offline:true,msg:"Sem conexão com a internet."}}
 const j=await r.json().catch(()=>({}));if(!r.ok)throw{msg:sbErr(j,r.status),status:r.status};return j}
function sbKeep(j){if(!j||!j.access_token)return null;const s={access_token:j.access_token,refresh_token:j.refresh_token,expires_at:j.expires_at||Math.floor(Date.now()/1000)+(j.expires_in||3600),user:{id:j.user&&j.user.id,email:j.user&&j.user.email}};sbSaveSession(s);return s}
async function sbToken(){const s=SYNC.session;if(!s)return null;
 if(s.expires_at-60>Date.now()/1000)return s.access_token;
 try{const j=await sbAuth("token?grant_type=refresh_token",{refresh_token:s.refresh_token});return sbKeep(j).access_token}
 catch(e){if(e.offline)throw{code:"unavailable"};if(e.status===400||e.status===401){sbSaveSession(null);SYNC.state="off";SYNC.msg="Sua sessão expirou. Entre de novo.";renderSync()}return null}}
async function sbRest(method,q,body,extra){const t=await sbToken();if(!t)throw{code:"noauth"};let r;
 try{r=await fetch(SB_URL+"/rest/v1/"+q,{method,headers:Object.assign({"apikey":SB_KEY,"Authorization":"Bearer "+t,"Content-Type":"application/json"},extra||{}),body:body?JSON.stringify(body):undefined})}
 catch(e){throw{code:"unavailable"}}
 if(r.status===401){SYNC.session.expires_at=0;throw{code:"unavailable"}}
 if(!r.ok){const j=await r.json().catch(()=>({}));throw{code:"http",msg:(j&&j.message)||("erro "+r.status)}}
 return r.status===204?null:r.json().catch(()=>null)}
/* junta dois estados quando os dois aparelhos mudaram desde a última sincronização */
function mergeStates(a,b){const n=(a.updatedAt||0)>=(b.updatedAt||0)?a:b,o=n===a?b:a,out=JSON.parse(JSON.stringify(n));
 const maps=["cards","favs","newsDone","course","writing","shadow","errs","log","tests","sents","estat","diary","chats","bt","dict","pairs"];
 maps.forEach(k=>{const x=o[k]||{},y=out[k]=out[k]||{};Object.keys(x).forEach(id=>{
  if(!(id in y)){y[id]=x[id];return}
  if(k==="cards"){const c=x[id],d=y[id],w=v=>((v&&v.reps)||0)+((v&&v.lapses)||0);if(w(c)>w(d)||(w(c)===w(d)&&(c&&c.due||"")>(d&&d.due||"")))y[id]=c}
  else if(k==="log"&&x[id]&&typeof x[id]==="object"){Object.keys(x[id]).forEach(f=>{if(typeof x[id][f]==="number")y[id][f]=Math.max(y[id][f]||0,x[id][f])})}
  else if(k==="course"&&x[id]&&y[id]&&typeof x[id]==="object"){const m=Object.assign({},x[id],y[id]);if(x[id].best!=null||y[id].best!=null)m.best=Math.max(x[id].best||0,y[id].best||0);y[id]=m}})});
 if(o.streak&&out.streak&&(o.streak.count||0)>(out.streak.count||0)&&(o.streak.last||"")>=(out.streak.last||""))out.streak=o.streak;
 out.updatedAt=Math.max(a.updatedAt||0,b.updatedAt||0);return out}
function syncedAt(){try{return+localStorage.getItem(SYNCED_KEY)||0}catch(e){return 0}}
function setSyncedAt(v){try{localStorage.setItem(SYNCED_KEY,String(v))}catch(e){}}
async function pushRemote(st,checked){if(!SYNC.session)throw{code:"noauth"};SYNC.state="syncing";renderSyncChip();
 try{if(!checked){const uid=SYNC.session.user.id,rows=await sbRest("GET","progress?select=u:state->updatedAt&user_id=eq."+uid),ru=rows&&rows[0]?+rows[0].u||0:0;
   if(ru>syncedAt()&&ru!==(st.updatedAt||0)){const full=await sbRest("GET","progress?select=state&user_id=eq."+uid),rs=full&&full[0]&&full[0].state;
    if(rs&&rs.settings){hydrate(mergeStates(JSON.parse(JSON.stringify(S)),rs));saveLocal();rerenderAll();st=JSON.parse(JSON.stringify(S))}}}
  await sbRest("POST","progress?on_conflict=user_id",{user_id:SYNC.session.user.id,name:CURP?CURP.name:null,state:st,updated_at:new Date().toISOString()},{"Prefer":"resolution=merge-duplicates,return=minimal"});
  setSyncedAt(st.updatedAt||0);SYNC.last=Date.now();SYNC.state="ok";SYNC.msg=""}
 catch(e){SYNC.state=e.code==="unavailable"?"offline":"error";SYNC.msg=e.code==="unavailable"?"":"Não consegui salvar na nuvem ("+(e.msg||"erro")+").";renderSyncChip();renderSync();throw e}
 renderSyncChip();renderSync()}
async function pullRemote(){if(!SYNC.session||SYNC.busy)return;SYNC.busy=true;SYNC.state="syncing";renderSyncChip();
 try{const rows=await sbRest("GET","progress?select=state,updated_at&user_id=eq."+SYNC.session.user.id);
  const remote=rows&&rows[0]&&rows[0].state;const base=syncedAt(),localChanged=(S.updatedAt||0)>base;
  if(remote&&remote.settings){const remoteChanged=(remote.updatedAt||0)>base;
   if(remoteChanged&&localChanged){const m=mergeStates(JSON.parse(JSON.stringify(S)),remote);hydrate(m);saveLocal();rerenderAll();await pushRemote(JSON.parse(JSON.stringify(S)),true)}
   else if(remoteChanged){const wr=hydrate(remote);saveLocal();setSyncedAt(S.updatedAt||0);rerenderAll();if(wr)save()}
   else if(localChanged)await pushRemote(JSON.parse(JSON.stringify(S)),true)}
  else if(S.updatedAt)await pushRemote(JSON.parse(JSON.stringify(S)),true);
  SYNC.last=Date.now();SYNC.state="ok";SYNC.msg=""}
 catch(e){SYNC.state=e.code==="unavailable"?"offline":e.code==="noauth"?"off":"error";if(e.code==="http")SYNC.msg="Não consegui ler a nuvem ("+(e.msg||"erro")+")."}
 SYNC.busy=false;renderSyncChip();renderSync()}
function startSync(){if(!SYNC.session){SYNC.state="off";stateRef=null;renderSyncChip();renderSync();return}
 stateRef={set:st=>pushRemote(st)};pullRemote()}
async function sbLogin(signup){const em=($("#sbEmail").value||"").trim(),pw=$("#sbPass").value||"";
 if(!em||!pw){sbMsg("Preencha o e-mail e a senha.");return}
 sbMsg(signup?"Criando a conta…":"Entrando…");$$("#sbIn,#sbUp").forEach(b=>b.disabled=true);
 try{const j=signup?await sbAuth("signup",{email:em,password:pw,data:{name:CURP?CURP.name:""}}):await sbAuth("token?grant_type=password",{email:em,password:pw});
  if(!sbKeep(j)){sbMsg("Conta criada, mas o Supabase pediu confirmação por e-mail. Desligue “Confirm email” no painel e entre de novo.");$$("#sbIn,#sbUp").forEach(b=>b.disabled=false);return}
  SYNC.msg="";setSyncedAt(0);startSync()}
 catch(e){sbMsg(e.msg||"Não deu certo agora.");$$("#sbIn,#sbUp").forEach(b=>b.disabled=false)}}
function sbLogout(){if(!confirm("Sair da conta neste aparelho? O progresso continua salvo aqui e na nuvem."))return;
 const t=SYNC.session&&SYNC.session.access_token;if(t)fetch(SB_URL+"/auth/v1/logout",{method:"POST",headers:{"apikey":SB_KEY,"Authorization":"Bearer "+t}}).catch(()=>{});
 sbSaveSession(null);setSyncedAt(0);stateRef=null;SYNC.state="off";SYNC.msg="";renderSyncChip();renderSync()}
function sbMsg(m){SYNC.msg=m;const e=$("#sbMsg");if(e)e.textContent=m;else renderSync()}
function fmtHM(t){const d=new Date(t);return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")}
function renderSync(){const el=$("#syncCard");if(!el)return;const nm=esc(CURP?CURP.name:"este perfil");
 if(!SYNC.session){el.innerHTML=`<h3>Conta e sincronização</h3>
  <p class="small muted">Entre ou crie uma conta para guardar o progresso de <b>${nm}</b> na nuvem e continuar em outro celular ou computador.</p>
  <label class="sblab">E-mail<input id="sbEmail" type="email" autocomplete="username" inputmode="email" placeholder="voce@email.com"></label>
  <label class="sblab">Senha<input id="sbPass" type="password" autocomplete="current-password" placeholder="mínimo 6 caracteres"></label>
  <div class="row"><button class="btn primary" id="sbIn">Entrar</button><button class="btn" id="sbUp">Criar conta</button></div>
  <p class="small" id="sbMsg" role="status">${esc(SYNC.msg)}</p>`;
  $("#sbIn").onclick=()=>sbLogin(false);$("#sbUp").onclick=()=>sbLogin(true);
  $("#sbPass").onkeydown=e=>{if(e.key==="Enter")sbLogin(false)};return}
 const st={ok:"Sincronizado"+(SYNC.last?" às "+fmtHM(SYNC.last):""),syncing:"Sincronizando…",offline:"Sem conexão: salvo neste aparelho, envio quando a internet voltar.",error:"Erro ao sincronizar.",off:""}[SYNC.state]||"";
 el.innerHTML=`<h3>Conta e sincronização</h3>
  <p class="small">Conectado como <b>${esc(SYNC.session.user.email||"")}</b>. O progresso de ${nm} é salvo na nuvem automaticamente.</p>
  <p class="small sbst ${SYNC.state}" role="status">${esc(st)}</p>${SYNC.msg?`<p class="small" style="color:var(--bad)">${esc(SYNC.msg)}</p>`:""}
  <div class="row"><button class="btn" id="sbNow">Sincronizar agora</button><button class="btn ghost" id="sbOut">Sair da conta</button></div>`;
 $("#sbNow").onclick=()=>{if(syncDirty){clearTimeout(syncT);flushSync().then(pullRemote)}else pullRemote()};$("#sbOut").onclick=sbLogout}
function renderSyncChip(){const c=$("#syncChip");if(!c)return;const on=!!SYNC.session;
 c.className="chip schip "+(on?SYNC.state:"off");c.textContent=on?({syncing:"☁ sincronizando",offline:"☁ offline",error:"☁ erro"}[SYNC.state]||"☁ salvo"):"☁ Entrar";
 c.setAttribute("aria-label",on?"Conta conectada: abrir sincronização":"Entrar para salvar o progresso na nuvem")}
(function(){if(!SYNC_ON){const sc=$("#syncCard");if(sc)sc.remove();return}const pc=$("#profChip");if(pc&&!$("#syncChip")){const b=document.createElement("button");b.id="syncChip";pc.after(b);
  b.onclick=()=>{showTab("cartoes");setTimeout(()=>{const c=$("#syncCard");if(c){c.scrollIntoView({behavior:"smooth",block:"center"});const i=$("#sbEmail");if(i)i.focus({preventScroll:true})}},50)}}
 window.addEventListener("online",()=>{if(SYNC.session){if(syncDirty)flushSync();pullRemote()}});
 document.addEventListener("visibilitychange",()=>{if(!document.hidden&&SYNC.session&&Date.now()-SYNC.last>30000)pullRemote()});
 renderSyncChip();renderSync();if(CURP)startSync()})();
/* ==== SYNC-END ==== */
