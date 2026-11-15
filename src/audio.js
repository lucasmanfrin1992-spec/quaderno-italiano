/* ============================ ÁUDIO: leitura em voz alta com velocidade ============================ */
// Um player por vez. Lê frase por frase com a Web Speech API (voz it-IT), destaca a frase em leitura,
// pausa e continua da mesma frase, e troca a velocidade em ciclo 0,75× → 1× → 1,25× (guardada por perfil em S.settings.rate).
// Uso: colocar audioHTML() na tela e chamar audioMount(caixa, [{text, el}]) — el é o elemento que recebe o destaque.
const AUDIO_RATES=[0.75,1,1.25];
const AU={tok:0,on:false,i:0,items:[],box:null};
const PLAY_SVG='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M7 4.5v15l12-7.5z" fill="currentColor"/></svg>';
const PAUSE_SVG='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>';
function audioRate(){const r=S.settings&&S.settings.rate;return AUDIO_RATES.includes(r)?r:1}
function rateLabel(r){return String(r).replace(".",",")+"×"}
function hasItVoice(){return canSpeak&&!(VOICES_SEEN&&!IT_VOICES.length)} // enquanto o aparelho não informa as vozes, o player aparece
function splitSents(p){const out=[];let buf="";(String(p).match(/[^.!?…]+[.!?…]+[»”"]?(?:\s+|$)|[^.!?…]+$/g)||[p]).forEach(x=>{buf+=x;if(/(?:^|\s)(?:Ing|Dott|Sig|Arch)\.\s*$/.test(buf))return;if(buf.trim())out.push(buf.trim());buf=""});if(buf.trim())out.push(buf.trim());return out}
function audioHTML(){return hasItVoice()?`<div class="aplayer" data-aplayer><button class="btn primary" data-aplay></button><button class="btn" data-arate></button><span class="small muted" data-apos role="status"></span></div>`
 :`<p class="small muted anovoice">Este aparelho não tem voz em italiano, por isso o áudio não aparece aqui.</p>`}
function audioUI(){const b=AU.box;if(!b||!document.contains(b))return;const mine=AU.items.length>0,p=b.querySelector("[data-aplay]"),r=b.querySelector("[data-arate]"),s=b.querySelector("[data-apos]");if(!p)return;
 p.innerHTML=AU.on?PAUSE_SVG+"Pausar":PLAY_SVG+(mine&&AU.i>0?"Continuar":"Ouvir");p.setAttribute("aria-pressed",AU.on);
 r.textContent=rateLabel(audioRate());r.setAttribute("aria-label","Velocidade: "+rateLabel(audioRate())+". Toque para mudar.");
 s.textContent=mine&&(AU.on||AU.i>0)?"frase "+Math.min(AU.i+1,AU.items.length)+" de "+AU.items.length:""}
function audioMarks(){$$(".reading").forEach(e=>{if(!e.closest("#newsBox"))e.classList.remove("reading")})}
function audioStep(){const tok=++AU.tok;audioMarks();
 if(AU.i>=AU.items.length){AU.on=false;AU.i=0;audioUI();return}
 const it=AU.items[AU.i];if(it.el&&document.contains(it.el)){it.el.classList.add("reading");try{const r=it.el.getBoundingClientRect();if(r.top<70||r.bottom>window.innerHeight-90)it.el.scrollIntoView({block:"center",behavior:"smooth"})}catch(e){}}
 audioUI();
 sayIt(it.text,{rate:audioRate(),
  onend:()=>{if(tok!==AU.tok)return;AU.i++;setTimeout(()=>{if(tok===AU.tok)audioStep()},220)},
  onerror:c=>{if(tok!==AU.tok)return;AU.on=false;audioMarks();audioUI();const s=AU.box&&AU.box.querySelector("[data-apos]");if(s)s.textContent="Sem som? Use “Testar áudio” na tela Início."}})}
function audioPlay(){if(!AU.items.length)return;AU.on=true;audioStep()}
function audioPause(){if(!AU.on)return;AU.on=false;AU.tok++;sayStop();audioUI()}
function audioStop(){const was=AU.on||AU.i>0;AU.on=false;AU.tok++;AU.i=0;if(was){sayStop();audioMarks()}audioUI()}
function audioBind(box,items){const p=box&&box.querySelector("[data-aplay]");if(!p)return false;
 p.onclick=()=>{if(AU.box!==box){audioMount(box,items);audioPlay();return}AU.on?audioPause():audioPlay()};
 box.querySelector("[data-arate]").onclick=()=>{const r=AUDIO_RATES[(AUDIO_RATES.indexOf(audioRate())+1)%AUDIO_RATES.length];S.settings.rate=r;save();
  if(AU.box===box){AU.on?audioStep():audioUI()}else box.querySelector("[data-arate]").textContent=rateLabel(r)};return true}
function audioMount(box,items){audioStop();AU.box=box;AU.items=items.filter(x=>x&&x.text);if(!audioBind(box,AU.items))return;audioUI()}
function audioAttach(box,items){const its=items.filter(x=>x&&x.text);if(!audioBind(box,its))return;
 const p=box.querySelector("[data-aplay]");p.innerHTML=PLAY_SVG+"Ouvir";box.querySelector("[data-arate]").textContent=rateLabel(audioRate())}
let AU_VOICE=null;
function audioVoicesChanged(){const v=hasItVoice();if(AU_VOICE===v)return;const first=AU_VOICE===null;AU_VOICE=v;if(first&&v)return; // só redesenha quando a disponibilidade muda de fato
 if(typeof LT!=="undefined"&&LT.cur&&!AU.on&&!$("#v-news").hidden&&!$("#ns-let").hidden)renderLetText()}
