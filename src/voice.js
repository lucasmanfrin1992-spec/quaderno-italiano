/* ============================ VOZ ITALIANA ============================ */
// Escolhe a melhor voz it-IT do aparelho e fala de forma resistente às falhas conhecidas dos navegadores:
// - Android/Chrome: cancel() seguido de speak() na mesma hora deixa a fala muda → só cancela se algo está tocando, e espera um instante;
// - vozes "de rede" falham sem internet → a preferência é por vozes locais, e se uma voz falhar, repete sem escolher voz;
// - a fala pode ficar "pausada" presa → resume() antes de falar;
// - o navegador pode descartar a fala da memória antes do fim → a fala atual fica guardada em SAY.u.
let IT_VOICES=[],VOICES_SEEN=false;const BAD_VOICES=new Set();
function rankVoice(v){const n=v.name||"";let s=0;if(/^it[-_]IT/i.test(v.lang))s+=5;if(/natural|neural|premium|enhanced|siri/i.test(n))s+=4;if(/google/i.test(n))s+=2;if(/compact|eloquence|espeak/i.test(n))s-=4;
 if(v.localService===false||/network/i.test(n))s-=3;else s+=2;return s}
// iPhone: getVoices() volta vazio ou incompleto nas primeiras chamadas. Só se conclui "sem voz italiana" depois do evento
// voiceschanged ou de 2 segundos; e mesmo sem voz italiana o app fala com lang="it-IT" (o iOS costuma escolher sozinho).
const VOICES_T0=Date.now();let VOICES_EVT=false;
function loadVoices(ev){if(!canSpeak)return;if(ev&&ev.type==="voiceschanged")VOICES_EVT=true;try{const all=speechSynthesis.getVoices();if(all.length&&(VOICES_EVT||Date.now()-VOICES_T0>=2000))VOICES_SEEN=true;
 IT_VOICES=all.filter(x=>/^it/i.test(x.lang)).map((v,i)=>({v,r:rankVoice(v),i})).sort((a,b)=>b.r-a.r||a.i-b.i).map(x=>x.v)}catch(e){}
 try{audioVoicesChanged()}catch(e){}try{renderAudioCard()}catch(e){}}
if(canSpeak){loadVoices();setTimeout(loadVoices,2100);try{speechSynthesis.addEventListener("voiceschanged",loadVoices)}catch(e){try{speechSynthesis.onvoiceschanged=loadVoices}catch(e2){}}}
function bestVoice(){if(!IT_VOICES.length)loadVoices();return IT_VOICES.find(v=>!BAD_VOICES.has(v.name))||null}
// Áudio gravado (PWA): cada frase vira um arquivo audio/<chave>.mp3, gerado no build com uma voz italiana offline.
// A chave vem do texto normalizado; o mesmo cálculo existe em tools/build_audio.py.
function audioNorm(t){return String(t).replace(/[«»“”"]/g,"").replace(/^\s*[—–-]\s*/,"").replace(/\s+/g," ").trim()}
function audioKey(t){const s=audioNorm(t).toLowerCase();let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return("0000000"+h.toString(16)).slice(-8)+s.length.toString(36)}
const REC={keys:null,v:"",voz:"",base:"audio/",el:null};
function recLoad(){try{fetch(REC.base+"index.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{if(j&&j.keys){REC.keys=new Set(j.keys);REC.v=j.v||"";REC.voz=j.voz||"";try{renderAudioCard()}catch(e){}}}).catch(()=>{})}catch(e){}}
function recHas(t){return!!(REC.keys&&REC.keys.has(audioKey(t)))}
function recStop(){if(REC.el){try{REC.el.pause()}catch(e){}}}
const SAY={u:null,tok:0,lastCancel:0};
const IS_IOS=/iPhone|iPad|iPod/.test(navigator.userAgent||"")||(/Macintosh/.test(navigator.userAgent||"")&&navigator.maxTouchPoints>1);
// iPhone: a voz do navegador segue a chave do silencioso. Pedir a sessão de áudio de "reprodução" (iOS 17+) e tocar um
// som mudo dentro do toque faz o iPhone tratar o app como player de mídia, e a voz passa a sair mesmo no silencioso.
try{if(navigator.audioSession)navigator.audioSession.type="playback"}catch(e){}
let SILENT=null;
function silentWav(){const n=1600,b=new Uint8Array(44+n),v=new DataView(b.buffer),w=(o,s)=>{for(let i=0;i<s.length;i++)b[o+i]=s.charCodeAt(i)};
 w(0,"RIFF");v.setUint32(4,36+n,true);w(8,"WAVEfmt ");v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,8000,true);v.setUint32(28,8000,true);v.setUint16(32,1,true);v.setUint16(34,8,true);w(36,"data");v.setUint32(40,n,true);b.fill(128,44);
 return URL.createObjectURL(new Blob([b],{type:"audio/wav"}))}
function iosKick(){if(!IS_IOS)return;try{if(navigator.audioSession&&navigator.audioSession.type!=="playback")navigator.audioSession.type="playback"}catch(e){}
 try{if(!SILENT){SILENT=new Audio(silentWav());SILENT.setAttribute("playsinline","");SILENT.preload="auto"}SILENT.currentTime=0;const p=SILENT.play();if(p&&p.catch)p.catch(()=>{})}catch(e){}}
if(IS_IOS)document.addEventListener("touchend",function first(){iosKick();document.removeEventListener("touchend",first,true)},true);
function sayCancel(){try{speechSynthesis.cancel()}catch(e){}SAY.lastCancel=Date.now()}
// fala um texto; o: {rate, onstart, onend, onerror(código)}
function recPlay(text,o,tok){const key=audioKey(text);let el=REC.el;if(!el){el=REC.el=new Audio();el.setAttribute("playsinline","");el.preload="auto"}
 try{if(canSpeak&&(speechSynthesis.speaking||speechSynthesis.pending))sayCancel()}catch(e){}
 let started=false;const fail=()=>{if(tok!==SAY.tok)return;REC.keys&&REC.keys.delete(key);sayTTS(text,o,tok)};
 el.onplaying=()=>{if(started||tok!==SAY.tok)return;started=true;o.onstart&&o.onstart({name:"gravado"})};
 el.onended=()=>{if(tok===SAY.tok&&o.onend)o.onend()};
 el.onerror=()=>{if(!started)fail()};
 try{el.pause()}catch(e){}el.src=REC.base+key+".mp3"+(REC.v?"?v="+REC.v:"");
 const r=o.rate&&o.rate!==.9?o.rate:1;try{el.defaultPlaybackRate=r;el.playbackRate=r;el.preservesPitch=true;el.webkitPreservesPitch=true}catch(e){}
 const p=el.play();if(p&&p.catch)p.catch(err=>{if(tok!==SAY.tok)return;if(err&&err.name==="NotAllowedError"){o.onerror&&o.onerror("not-allowed")}else if(err&&err.name!=="AbortError")fail()})}
function sayIt(text,o){o=Object.assign({},o||{});const tok=++SAY.tok;recStop();
 const oe=o.onerror;o.onerror=c=>{if(c!=="not-allowed")audWarn();if(oe)oe(c)}; // o áudio nunca falha em silêncio: aparece o aviso “Sem som?”
 if(recHas(text)){recPlay(text,o,tok);return} // frase gravada: toca o arquivo (funciona no iPhone mesmo no silencioso)
 sayTTS(text,o,tok)}
function sayTTS(text,o,tok){if(!canSpeak){o.onerror&&o.onerror("unsupported");return}let busy=false;iosKick();
 try{busy=speechSynthesis.speaking||speechSynthesis.pending}catch(e){}if(busy)sayCancel();
 const go=(useVoice,retry)=>{if(tok!==SAY.tok)return;let started=false,done=false;
  try{if(speechSynthesis.paused)speechSynthesis.resume()}catch(e){}
  const u=new SpeechSynthesisUtterance(text);u.lang="it-IT";u.rate=o.rate||1;const v=useVoice?bestVoice():null;if(v)u.voice=v;SAY.u=u;
  u.onstart=()=>{started=true;if(IS_IOS&&!o.quiet)audWarn(true);if(tok===SAY.tok&&o.onstart)o.onstart(v)};
  u.onend=()=>{done=true;if(tok===SAY.tok&&o.onend)o.onend()};
  u.onerror=e=>{done=true;const c=(e&&e.error)||"erro";if(tok!==SAY.tok||c==="interrupted"||c==="canceled")return;
   if(v&&!retry){BAD_VOICES.add(v.name);go(false,true);return} // a voz escolhida falhou: tenta com a voz padrão do aparelho
   if(o.onerror)o.onerror(c)};
  try{speechSynthesis.speak(u)}catch(e){if(o.onerror)o.onerror("erro");return}
  // alguns Androids não começam nem avisam erro: se nada aconteceu, tenta mais uma vez com a voz padrão
  setTimeout(()=>{if(tok!==SAY.tok||started||done)return;let sp=false;try{sp=speechSynthesis.speaking}catch(e){}if(sp)return;
   if(!retry){if(v)BAD_VOICES.add(v.name);sayCancel();setTimeout(()=>go(false,true),IS_IOS?0:150)}else if(o.onerror)o.onerror("silencio")},2500)};
 const wait=IS_IOS?0:150-(Date.now()-SAY.lastCancel); // espera um instante depois de um cancelamento recente (problema do Android; no iPhone a fala precisa sair já, dentro do toque)
 wait>0?setTimeout(()=>go(true,false),wait):go(true,false)}
function sayStop(){SAY.tok++;recStop();try{if(canSpeak&&(speechSynthesis.speaking||speechSynthesis.pending))sayCancel()}catch(e){}}

/* ---------- cartão Áudio (Início): mostra a voz usada e testa o som ---------- */
const AUD={msg:""};
function audioPlatform(){const ua=navigator.userAgent||"";return/iPhone|iPad|iPod/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1)?"ios":/Android/.test(ua)?"android":"outro"}
function audioHelp(){const p=audioPlatform();
 return p==="ios"?"No iPhone: 1) desligue o modo silencioso (chave na lateral, sem a faixa laranja); 2) aumente o volume com os botões laterais enquanto o teste fala; 3) confira se o Bluetooth não está mandando o som para um fone; 4) em Ajustes › Acessibilidade › Conteúdo Falado › Vozes › Italiano, baixe uma voz (por exemplo, Alice)."
  :p==="android"?"No Android: aumente o volume de mídia. Se não houver voz italiana: Configurações › Sistema › Idiomas › Saída de texto para fala › motor do Google › Instalar dados de voz › Italiano."
  :"No computador: confira o volume e se o navegador não está sem som. Vozes italianas podem ser instaladas nas configurações de voz do sistema."}
function renderAudioCard(){const el=$("#homeAudio");if(!el)return;
 if(REC.keys){el.innerHTML=`<div class="row" style="justify-content:space-between"><span class="label">Áudio</span><span class="chip">voz gravada</span></div>
  <p class="small">O app usa áudios gravados com uma voz italiana (${esc(REC.voz||"Paola")}) para ${REC.keys.size.toLocaleString("pt-BR")} frases e palavras. Eles tocam como música, inclusive no iPhone. O que não foi gravado, como a notícia do dia, usa a voz do aparelho.</p>
  <div class="row"><button class="btn" id="audTest">Testar áudio</button></div><p class="small" id="audMsg" role="status">${esc(AUD.msg)}</p>
  <details class="exs"><summary><span class="small">Não sai som?</span></summary><p class="small" style="padding:0 14px 12px">${esc(audioHelp())}</p></details>`;
  $("#audTest").onclick=audTestOpen;return}
 if(!canSpeak){el.innerHTML=`<span class="label">Áudio</span><p class="small">Este navegador não tem leitura em voz alta, por isso o app fica sem som aqui.</p><p class="small muted">Abra o app pelo Chrome (Android) ou pelo Safari (iPhone).</p>`;return}
 const v=bestVoice(),n=IT_VOICES.length;
 el.innerHTML=`<div class="row" style="justify-content:space-between"><span class="label">Áudio</span><span class="chip">${n?n+(n===1?" voz italiana":" vozes italianas"):VOICES_SEEN?"sem voz italiana":"procurando vozes…"}</span></div>
 <p class="small">${v?`Voz usada: <b>${esc(v.name)}</b>${v.localService===false?" (precisa de internet)":""}.`:VOICES_SEEN?"Este aparelho não informou nenhuma voz em italiano. O app tenta falar com a voz padrão, que pode sair com sotaque ou não sair.":"O aparelho ainda não informou as vozes. Toque em Testar áudio."}</p>
 <div class="row"><button class="btn" id="audTest">Testar áudio</button></div><p class="small" id="audMsg" role="status">${esc(AUD.msg)}</p>
 <details class="exs"><summary><span class="small">Não sai som?</span></summary><p class="small" style="padding:0 14px 12px">${esc(audioHelp())}</p></details>`;
 $("#audTest").onclick=audTestOpen}
function audTest(){const m=$("#audMsg");audioPause();AUD.msg="Preparando…";m.textContent=AUD.msg;
  sayIt("Ciao! Sono la Nonna. Mi senti bene?",{rate:1,onstart:vv=>{AUD.msg=(vv&&vv.name==="gravado"?"Tocando o áudio gravado":"Falando"+(vv?" com a voz "+vv.name:" com a voz padrão do aparelho"))+"… Se não ouvir nada, confira o volume.";const x=$("#audMsg");if(x)x.textContent=AUD.msg},
   onend:()=>{AUD.msg="Terminou. Se não ouviu nada, veja “Não sai som?” abaixo.";const x=$("#audMsg");if(x)x.textContent=AUD.msg},
   onerror:c=>{AUD.msg=c==="silencio"?"O aparelho não começou a falar. Veja “Não sai som?” abaixo.":c==="not-allowed"?"O navegador bloqueou o som. Toque de novo em Testar áudio.":"O aparelho não conseguiu falar (erro: "+c+"). Veja “Não sai som?” abaixo.";const x=$("#audMsg");if(x)x.textContent=AUD.msg}})}

/* ---------- aviso “Sem som?” e tela de teste de áudio ---------- */
// O aviso aparece quando uma fala falha e, no iPhone, na primeira vez que a voz do aparelho é usada na sessão
// (com a chave de silencioso ligada a voz do aparelho fica muda sem dar erro; os áudios gravados tocam mesmo assim).
const AW={soft:false,t:0};
function audWarn(soft){if(soft){if(AW.soft)return;AW.soft=true}
 let b=$("#audWarn");if(!b){b=document.createElement("button");b.id="audWarn";b.className="audwarn";b.type="button";b.setAttribute("role","status");
  b.innerHTML="<span>Sem som? Confira a chave de silencioso e o volume. Se continuar, <u>toque aqui</u>.</span>";
  b.onclick=()=>{b.hidden=true;audTestOpen()};document.body.appendChild(b)}
 b.hidden=false;clearTimeout(AW.t);AW.t=setTimeout(()=>{b.hidden=true},soft?6000:10000)}
const ATEST_FRASE="Buongiorno, sono la Nonna.";
function audTestFrase(){return recHas(ATEST_FRASE)?ATEST_FRASE:recHas("Ciao! Sono la Nonna. Mi senti bene?")?"Ciao! Sono la Nonna. Mi senti bene?":ATEST_FRASE}
const AT={rec:"",tts:""};
function audTestOpen(){audioPause&&audioPause();sayStop();let ov=$("#audTestOv");
 if(!ov){ov=document.createElement("div");ov.id="audTestOv";ov.className="audov";ov.setAttribute("role","dialog");ov.setAttribute("aria-modal","true");ov.setAttribute("aria-labelledby","atTitle");
  ov.onclick=e=>{if(e.target===ov)audTestClose()};document.body.appendChild(ov)}
 AT.rec="";AT.tts="";ov.hidden=false;renderAudTest();
 if(canSpeak&&!VOICES_SEEN){setTimeout(()=>{loadVoices();renderAudTest()},2100)}}
function audTestClose(){sayStop();const ov=$("#audTestOv");if(ov)ov.hidden=true}
function atRow(ok,t,d){return`<li class="atrow ${ok===true?"ok":ok===false?"bad":"wait"}"><span class="atic" aria-hidden="true">${ok===true?"✓":ok===false?"✕":"…"}</span><div><b>${t}</b>${d?`<div class="small muted">${d}</div>`:""}</div></li>`}
function renderAudTest(){const ov=$("#audTestOv");if(!ov||ov.hidden)return;const n=IT_VOICES.length,v=bestVoice(),p=audioPlatform();
 let all=0;try{all=canSpeak?speechSynthesis.getVoices().length:0}catch(e){}
 const recN=REC.keys?REC.keys.size:0;
 ov.innerHTML=`<div class="audin"><div class="row" style="justify-content:space-between"><h3 id="atTitle">Testar áudio</h3><button class="btn small" id="atX" aria-label="Fechar">✕</button></div>
 <ol class="atlist">
 ${atRow(recN>0?true:null,"Áudios gravados",recN?recN.toLocaleString("pt-BR")+" frases e palavras com a voz "+esc(REC.voz||"Paola")+". Tocam como música, inclusive com o iPhone no silencioso.":"Não há áudios gravados nesta versão; o app usa a voz do aparelho.")}
 ${atRow(canSpeak,"Voz do aparelho",canSpeak?"O navegador sabe ler em voz alta.":"Este navegador não lê em voz alta.")}
 ${canSpeak?atRow(n?true:VOICES_SEEN?false:null,"Vozes italianas",n?n+(n===1?" voz italiana":" vozes italianas")+(v?" — usando "+esc(v.name):""):VOICES_SEEN?"Nenhuma voz italiana entre as "+all+" do aparelho. O app fala assim mesmo com o idioma italiano; o som pode sair com sotaque.":"Esperando o aparelho informar as vozes…"):""}
 ${p==="ios"?atRow(null,"Chave de silencioso","O iPhone não deixa o app ler essa chave. Com ela ligada (faixa laranja), a voz do aparelho fica muda; os áudios gravados tocam."):""}
 </ol>
 <div class="atbtns">
  ${recN?`<button class="btn primary" id="atRec">▶ Tocar áudio gravado</button><p class="small" role="status">${esc(AT.rec)}</p>`:""}
  ${canSpeak?`<button class="btn${recN?"":" primary"}" id="atTts">▶ Tocar voz do aparelho</button><p class="small" role="status">${esc(AT.tts)}</p>`:""}
 </div>
 <details class="exs"><summary><span class="small">Ainda sem som?</span></summary><p class="small" style="padding:0 14px 12px">${esc(audioHelp())}</p></details></div>`;
 $("#atX").onclick=audTestClose;
 const set=(k,m)=>{AT[k]=m;renderAudTest()};
 if($("#atRec"))$("#atRec").onclick=()=>{const f=audTestFrase();if(!recHas(f)){set("rec","A frase de teste não tem arquivo gravado.");return}
  const tok=++SAY.tok;recStop();set("rec","Tocando…");recPlay(f,{rate:1,onstart:()=>set("rec","Tocando “"+f+"”. Se não ouvir, aumente o volume."),onend:()=>set("rec","✓ O áudio gravado tocou até o fim."),onerror:c=>set("rec","✕ Não tocou ("+c+"). Toque de novo.")},tok)};
 if($("#atTts"))$("#atTts").onclick=()=>{const tok=++SAY.tok;recStop();set("tts","Falando…");
  sayTTS(ATEST_FRASE,{rate:1,quiet:true,onstart:vv=>set("tts","Falando"+(vv?" com a voz "+vv.name:" com a voz padrão")+"… Sem som? Confira a chave de silencioso e o volume."),
   onend:()=>set("tts","✓ A voz do aparelho terminou de falar. Se não ouviu nada, a chave de silencioso ou o volume estão cortando o som."),
   onerror:c=>set("tts",c==="silencio"?"✕ O aparelho não começou a falar.":"✕ O aparelho não conseguiu falar (erro: "+c+").")},tok)}}
