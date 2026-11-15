/* ============================ VOZ ITALIANA ============================ */
// Escolhe a melhor voz it-IT do aparelho e fala de forma resistente às falhas conhecidas dos navegadores:
// - Android/Chrome: cancel() seguido de speak() na mesma hora deixa a fala muda → só cancela se algo está tocando, e espera um instante;
// - vozes "de rede" falham sem internet → a preferência é por vozes locais, e se uma voz falhar, repete sem escolher voz;
// - a fala pode ficar "pausada" presa → resume() antes de falar;
// - o navegador pode descartar a fala da memória antes do fim → a fala atual fica guardada em SAY.u.
let IT_VOICES=[],VOICES_SEEN=false;const BAD_VOICES=new Set();
function rankVoice(v){const n=v.name||"";let s=0;if(/^it[-_]IT/i.test(v.lang))s+=5;if(/natural|neural|premium|enhanced|siri/i.test(n))s+=4;if(/google/i.test(n))s+=2;if(/compact|eloquence|espeak/i.test(n))s-=4;
 if(v.localService===false||/network/i.test(n))s-=3;else s+=2;return s}
function loadVoices(){if(!canSpeak)return;try{const all=speechSynthesis.getVoices();if(all.length)VOICES_SEEN=true;
 IT_VOICES=all.filter(x=>/^it/i.test(x.lang)).map((v,i)=>({v,r:rankVoice(v),i})).sort((a,b)=>b.r-a.r||a.i-b.i).map(x=>x.v)}catch(e){}
 try{audioVoicesChanged()}catch(e){}try{renderAudioCard()}catch(e){}}
if(canSpeak){loadVoices();try{speechSynthesis.addEventListener("voiceschanged",loadVoices)}catch(e){try{speechSynthesis.onvoiceschanged=loadVoices}catch(e2){}}}
function bestVoice(){if(!IT_VOICES.length)loadVoices();return IT_VOICES.find(v=>!BAD_VOICES.has(v.name))||null}
const SAY={u:null,tok:0,lastCancel:0};
function sayCancel(){try{speechSynthesis.cancel()}catch(e){}SAY.lastCancel=Date.now()}
// fala um texto; o: {rate, onstart, onend, onerror(código)}
function sayIt(text,o){o=o||{};if(!canSpeak){o.onerror&&o.onerror("unsupported");return}const tok=++SAY.tok;let busy=false;
 try{busy=speechSynthesis.speaking||speechSynthesis.pending}catch(e){}if(busy)sayCancel();
 const go=(useVoice,retry)=>{if(tok!==SAY.tok)return;let started=false,done=false;
  try{if(speechSynthesis.paused)speechSynthesis.resume()}catch(e){}
  const u=new SpeechSynthesisUtterance(text);u.lang="it-IT";u.rate=o.rate||1;const v=useVoice?bestVoice():null;if(v)u.voice=v;SAY.u=u;
  u.onstart=()=>{started=true;if(tok===SAY.tok&&o.onstart)o.onstart(v)};
  u.onend=()=>{done=true;if(tok===SAY.tok&&o.onend)o.onend()};
  u.onerror=e=>{done=true;const c=(e&&e.error)||"erro";if(tok!==SAY.tok||c==="interrupted"||c==="canceled")return;
   if(v&&!retry){BAD_VOICES.add(v.name);go(false,true);return} // a voz escolhida falhou: tenta com a voz padrão do aparelho
   if(o.onerror)o.onerror(c)};
  try{speechSynthesis.speak(u)}catch(e){if(o.onerror)o.onerror("erro");return}
  // alguns Androids não começam nem avisam erro: se nada aconteceu, tenta mais uma vez com a voz padrão
  setTimeout(()=>{if(tok!==SAY.tok||started||done)return;let sp=false;try{sp=speechSynthesis.speaking}catch(e){}if(sp)return;
   if(!retry){if(v)BAD_VOICES.add(v.name);sayCancel();setTimeout(()=>go(false,true),150)}else if(o.onerror)o.onerror("silencio")},2500)};
 const wait=150-(Date.now()-SAY.lastCancel); // espera um instante depois de qualquer cancelamento recente
 wait>0?setTimeout(()=>go(true,false),wait):go(true,false)}
function sayStop(){SAY.tok++;try{if(canSpeak&&(speechSynthesis.speaking||speechSynthesis.pending))sayCancel()}catch(e){}}

/* ---------- cartão Áudio (Início): mostra a voz usada e testa o som ---------- */
const AUD={msg:""};
function audioPlatform(){const ua=navigator.userAgent||"";return/iPhone|iPad|iPod/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1)?"ios":/Android/.test(ua)?"android":"outro"}
function audioHelp(){const p=audioPlatform();
 return p==="ios"?"No iPhone: desligue o modo silencioso (chave na lateral) e aumente o volume. Para uma voz melhor: Ajustes › Acessibilidade › Conteúdo Falado › Vozes › Italiano."
  :p==="android"?"No Android: aumente o volume de mídia. Se não houver voz italiana: Configurações › Sistema › Idiomas › Saída de texto para fala › motor do Google › Instalar dados de voz › Italiano."
  :"No computador: confira o volume e se o navegador não está sem som. Vozes italianas podem ser instaladas nas configurações de voz do sistema."}
function renderAudioCard(){const el=$("#homeAudio");if(!el)return;
 if(!canSpeak){el.innerHTML=`<span class="label">Áudio</span><p class="small">Este navegador não tem leitura em voz alta, por isso o app fica sem som aqui.</p><p class="small muted">Abra o app pelo Chrome (Android) ou pelo Safari (iPhone).</p>`;return}
 const v=bestVoice(),n=IT_VOICES.length;
 el.innerHTML=`<div class="row" style="justify-content:space-between"><span class="label">Áudio</span><span class="chip">${n?n+(n===1?" voz italiana":" vozes italianas"):VOICES_SEEN?"sem voz italiana":"procurando vozes…"}</span></div>
 <p class="small">${v?`Voz usada: <b>${esc(v.name)}</b>${v.localService===false?" (precisa de internet)":""}.`:VOICES_SEEN?"Este aparelho não informou nenhuma voz em italiano. O app tenta falar com a voz padrão, que pode sair com sotaque ou não sair.":"O aparelho ainda não informou as vozes. Toque em Testar áudio."}</p>
 <div class="row"><button class="btn" id="audTest">Testar áudio</button></div><p class="small" id="audMsg" role="status">${esc(AUD.msg)}</p>
 <details class="exs"><summary><span class="small">Não sai som?</span></summary><p class="small" style="padding:0 14px 12px">${esc(audioHelp())}</p></details>`;
 $("#audTest").onclick=()=>{const m=$("#audMsg");audioPause();AUD.msg="Preparando…";m.textContent=AUD.msg;
  sayIt("Ciao! Sono la Nonna. Mi senti bene?",{rate:1,onstart:vv=>{AUD.msg="Falando"+(vv?" com a voz "+vv.name:" com a voz padrão do aparelho")+"… Você está ouvindo?";const x=$("#audMsg");if(x)x.textContent=AUD.msg},
   onend:()=>{AUD.msg="Terminou. Se não ouviu nada, veja “Não sai som?” abaixo.";const x=$("#audMsg");if(x)x.textContent=AUD.msg},
   onerror:c=>{AUD.msg=c==="silencio"?"O aparelho não começou a falar. Veja “Não sai som?” abaixo.":c==="not-allowed"?"O navegador bloqueou o som. Toque de novo em Testar áudio.":"O aparelho não conseguiu falar (erro: "+c+"). Veja “Não sai som?” abaixo.";const x=$("#audMsg");if(x)x.textContent=AUD.msg}})}}
