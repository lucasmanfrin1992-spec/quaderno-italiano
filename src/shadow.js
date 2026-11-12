/* ============================ SHADOWING ============================ */
// Estúdio de shadowing: 5 etapas guiadas por podcast, trechos curtos com pausa cronometrada,
// palavra acesa enquanto o áudio fala, frases difíceis marcadas para treinar depois e minutos do dia.
let SLVL="A1",SCUR=null;
const STEPS=[
 {k:1,n:"Ouvir",d:"Só escute, sem ler. O objetivo é entender a situação, não cada palavra.",mode:"listen",show:"none",rate:.9},
 {k:2,n:"Entender",d:"Ouça de novo lendo com a tradução. Toque nas palavras novas para ver o significado.",mode:"listen",show:"both",rate:.8},
 {k:3,n:"Repetir lendo",d:"O áudio toca um trecho curto e para. Na pausa, repita em voz alta lendo o texto.",mode:"shadow",show:"it",rate:.8},
 {k:4,n:"Repetir de ouvido",d:"Igual à etapa 3, mas sem ler: o texto só aparece depois que você repete.",mode:"shadow",show:"after",rate:.85},
 {k:5,n:"Falar junto",d:"Velocidade normal e sem pausas. Fale junto com o áudio, meio segundo atrás, como uma sombra.",mode:"listen",show:"it",rate:1}];
const MODES={shadow:"Trecho + pausa",loop:"Cada trecho 3×",listen:"Direto, sem pausa"};
const GAPS={short:["Curta",1],normal:["Normal",1.35],long:["Longa",1.9],manual:["Eu aviso (toque para seguir)",0]};
const SHOWS={it:"Italiano",both:"Italiano + tradução",after:"Escondido até eu repetir",none:"Sem texto"};
const SHP={i:0,c:0,state:"idle",tok:0,step:1,mode:"listen",rate:.9,show:"none",rep:0,gap:"normal",chunk:true,voice:"",only:false,done:false};
try{const o=JSON.parse(localStorage.getItem(KEY+".shp")||"{}");if(GAPS[o.gap])SHP.gap=o.gap;if(o.chunk===false)SHP.chunk=false;if(typeof o.voice==="string")SHP.voice=o.voice}catch(e){}
function saveShp(){try{localStorage.setItem(KEY+".shp",JSON.stringify({gap:SHP.gap,chunk:SHP.chunk,voice:SHP.voice}))}catch(e){}}

/* ---- vozes: escolhe as melhores vozes italianas do aparelho ---- */
let IT_VOICES=[],VOICES_SEEN=false;
function rankVoice(v){const n=v.name||"";let s=0;if(/^it[-_]IT/i.test(v.lang))s+=5;if(/natural|neural|premium|enhanced|siri/i.test(n))s+=4;if(/google/i.test(n))s+=3;if(/compact|eloquence|espeak/i.test(n))s-=4;return s}
function loadVoices(){if(!canSpeak)return;try{const all=speechSynthesis.getVoices();if(all.length)VOICES_SEEN=true;
 IT_VOICES=all.filter(x=>/^it/i.test(x.lang)).map((v,i)=>({v,r:rankVoice(v),i})).sort((a,b)=>b.r-a.r||a.i-b.i).map(x=>x.v);
 if($("#pVoice"))fillVoices()}catch(e){}}
if(canSpeak){loadVoices();try{speechSynthesis.addEventListener("voiceschanged",loadVoices)}catch(e){}}
function chosenVoice(){return SHP.voice?IT_VOICES.find(v=>v.name===SHP.voice)||null:null}
function voiceFor(sp){const c=chosenVoice();if(c)return{voice:c,pitch:sp==="A"?1:1.12};
 if(!IT_VOICES.length)return{voice:null,pitch:sp==="A"?1:1.15};
 if(IT_VOICES.length>1&&rankVoice(IT_VOICES[1])>=rankVoice(IT_VOICES[0])-3)return{voice:IT_VOICES[sp==="A"?0:1],pitch:1};
 return{voice:IT_VOICES[0],pitch:sp==="A"?1:1.15}}
function bestVoice(){return chosenVoice()||IT_VOICES[0]||null}
function fillVoices(){const el=$("#pVoice");if(!el)return;
 el.innerHTML=`<option value="">Automática${IT_VOICES.length>1?" (duas vozes)":""}</option>`+IT_VOICES.map(v=>`<option value="${esc(v.name)}" ${SHP.voice===v.name?"selected":""}>${esc(v.name.replace(/\s*\(.*?\)\s*/g," ").trim())}</option>`).join("");
 const lab=el.closest("label");if(lab)lab.hidden=IT_VOICES.length<2;
 const w=$("#pNoVoice");if(w)w.hidden=!(VOICES_SEEN&&!IT_VOICES.length)}

/* ---- minutos de prática do dia ---- */
function shMin(){const m=S.shmin;return m&&m.d===today()?Math.round(m.ms/6e4):0}
function addShMs(ms){if(!(ms>0))return;if(!S.shmin||S.shmin.d!==today())S.shmin={d:today(),ms:0};S.shmin.ms+=Math.min(ms,6e4);saveLocal()}
const SH_GOAL=10;

/* ---- tela inicial do shadowing ---- */
$$("#sSeg button").forEach(b=>b.addEventListener("click",()=>{SLVL=b.dataset.sl;renderShadow()}));
function podState(id){return(S.shadow||{})[id]||null}
function stepsDone(s){return s&&s.steps?STEPS.filter(x=>s.steps[x.k]).length:0}
function nextStep(s){const st=(s&&s.steps)||{};const n=STEPS.find(x=>!st[x.k]);return n?n.k:5}
function dots(s){const st=(s&&s.steps)||{};return`<span class="sdots" aria-label="${stepsDone(s)} de 5 etapas feitas">${STEPS.map(x=>`<i class="${st[x.k]?"on":""}"></i>`).join("")}</span>`}
function renderShadow(){if(SCUR&&!$("#sPlay").hidden)return;
 renderShadowIntro();
 $$("#sSeg button").forEach(b=>{const on=b.dataset.sl===SLVL;b.classList.toggle("on",on);b.setAttribute("aria-selected",on)});
 $("#slist").innerHTML=PODS.filter(p=>TOPIC[p.topic].lvl===SLVL).map(p=>{const t=TOPIC[p.topic],s=podState(p.topic),n=stepsDone(s);
  return`<button class="tcard${n>=5?" done":""}" data-sopen="${p.topic}"><span class="tn">${t.n}</span><div><h3>${esc(p.t)}</h3><p>${esc(t.t)} · ${p.L.length} falas</p>${dots(s)}</div><span class="pill ${s?"ok":""}">${n>=5?"completo":s?(n?n+"/5":s.n+"×"):"novo"}</span></button>`}).join("");
 $$("[data-sopen]").forEach(b=>b.onclick=()=>openPod(b.dataset.sopen))}
function lastPod(){let best=null;Object.entries(S.shadow||{}).forEach(([id,s])=>{if(s&&s.last&&TOPIC[id]&&PODS.some(p=>p.topic===id)&&(!best||s.last>best[1].last))best=[id,s]});return best}
function renderShadowIntro(){
 const wave=(y,cls,off)=>{let d=`M${20+off} ${y}`;for(let x=0;x<=420;x+=6){const a=Math.sin(x/9)*Math.sin(x/53)*14*(x%140<100?1:.15);d+=` L${20+off+x} ${(y+a).toFixed(1)}`}return`<path d="${d}" class="${cls}" fill="none"/>`};
 const echo=`<div class="tlw"><svg viewBox="0 0 560 150" class="pssvg" role="img" aria-label="O áudio e a sua voz, com meio segundo de atraso">
  <text x="10" y="34" class="tllab">áudio</text>${wave(40,"wvA",70)}
  <text x="10" y="104" class="tllab">você</text>${wave(110,"wvB",100)}
  <line x1="90" y1="70" x2="90" y2="132" class="tlnow"/><line x1="120" y1="70" x2="120" y2="132" class="tlnow"/>
  <text x="105" y="146" class="tlpt" text-anchor="middle">≈ 0,5 s</text></svg></div>`;
 const min=shMin(),lp=lastPod();let cont="";
 if(lp){const p=PODS.find(x=>x.topic===lp[0]),k=nextStep(lp[1]),all=stepsDone(lp[1])>=5;
  cont=`<div class="card stack scont"><span class="label">Continuar de onde parou</span><h3>${esc(p.t)}</h3>${dots(lp[1])}<p class="small muted">${all?"As 5 etapas já foram feitas. Repetir o mesmo podcast por alguns dias é o que fixa.":"Próxima etapa: <b>"+k+" · "+STEPS[k-1].n+"</b>"}</p><div class="row"><button class="btn primary" data-sopen="${p.topic}">${all?"Praticar de novo":"Continuar"}</button></div></div>`}
 else{const p=PODS.find(x=>TOPIC[x.topic].lvl===SLVL)||PODS[0];
  cont=`<div class="card stack scont"><span class="label">Comece por aqui</span><h3>${esc(p.t)}</h3><p class="small muted">${esc(p.sit)} São 5 etapas curtas com o mesmo diálogo; o app conduz cada uma.</p><div class="row"><button class="btn primary" data-sopen="${p.topic}">Começar a etapa 1</button></div></div>`}
 $("#sIntro").innerHTML=`<div class="stack" style="gap:6px"><h2>Shadowing</h2><p class="muted">Ouça um diálogo curto e repita em voz alta, imitando ritmo e entonação. Cada podcast tem 5 etapas: do só ouvir até falar junto com o áudio.</p></div>
 <div class="card shday"><div><span class="label">Hoje</span><b>${min} min</b><span class="small muted">meta: ${SH_GOAL} min por dia</span></div><div class="progress" role="img" aria-label="${min} de ${SH_GOAL} minutos"><i style="width:${Math.min(100,min/SH_GOAL*100)}%"></i></div></div>
 ${cont}
 <details class="card showto"${lp?"":" open"}><summary><b>Como funciona o shadowing</b><span class="small muted">a técnica, as 5 etapas e dicas</span></summary><div class="stack" style="gap:16px;margin-top:14px">
 ${IG.box("Você fala logo atrás do áudio",echo,"Shadowing (“sombra”) é repetir o que você ouve quase ao mesmo tempo que o falante, copiando a melodia. Treina o ouvido e a boca juntos: você para de traduzir na cabeça e começa a falar em blocos.")}
 ${IG.box("As 5 etapas com o mesmo podcast",`<ol class="steps">${STEPS.map(x=>`<li><b>${x.n}</b><span>${x.d}</span></li>`).join("")}</ol>`,"Não precisa fazer as 5 no mesmo dia. Duas ou três etapas por dia, com o mesmo podcast por 3 a 5 dias, funcionam melhor.")}
 ${IG.box("Dicas",IG.cards([{h:"10–15 min por dia",p:"melhor que uma hora no fim de semana"},{h:"em voz alta",p:"murmurar não treina a pronúncia"},{h:"ritmo antes da perfeição",p:"copie a melodia; os erros somem com as repetições"},{h:"marque as difíceis",p:"toque na bandeira da frase e treine só elas no final"}]))}
 <p class="small muted">A voz é a do seu aparelho (síntese de voz em italiano), por isso a qualidade varia de um celular para outro. Em Ajustes, dentro do podcast, dá para trocar de voz quando o aparelho tem mais de uma.</p></div></details>`;
 $$("#sIntro [data-sopen]").forEach(b=>b.onclick=()=>openPod(b.dataset.sopen));
 $("#sLinks").innerHTML=`<div class="stack" style="gap:8px"><span class="label">Podcasts reais para continuar</span>${PODLINKS.map(l=>`<a class="lnk" href="${l.u}" target="_blank" rel="noopener"><b>${esc(l.n)}</b><span>${esc(l.d)}</span></a>`).join("")}<p class="small muted">Abrem fora do app. Com eles, use o modo de ouvir-pausar-repetir do próprio player do podcast.</p></div>`}

/* ---- abrir / fechar um podcast ---- */
function openPod(id){const p=PODS.find(x=>x.topic===id);if(!p)return;SMODE="pod";renderSMode();SCUR=p;SLVL=TOPIC[id].lvl;stopPod();
 SHP.only=false;SHP.done=false;applyStep(nextStep(podState(id)));$("#sHome").hidden=true;$("#sPlay").hidden=false;renderPod();window.scrollTo(0,0)}
function closePod(){stopPod();save();SCUR=null;$("#sPlay").hidden=true;$("#sHome").hidden=false;renderShadow();window.scrollTo(0,0)}
function applyStep(k){const st=STEPS[k-1]||STEPS[0];SHP.step=st.k;SHP.mode=st.mode;SHP.show=st.show;SHP.rate=st.rate;SHP.i=firstIdx();SHP.c=0;SHP.rep=0;SHP.done=false}
function hardList(){const s=podState(SCUR.topic);return(s&&s.hard||[]).filter(i=>i>=0&&i<SCUR.L.length).sort((a,b)=>a-b)}
function playList(){const h=hardList();return SHP.only&&h.length?h:SCUR.L.map((_,i)=>i)}
function firstIdx(){return SCUR?playList()[0]:0}
function stepIdx(i,d){const l=playList(),p=l.indexOf(i);if(p<0){const n=l.find(x=>x>i);return d>0?(n==null?-1:n):l[0]}const q=p+d;return q<0?l[0]:q>=l.length?-1:l[q]}

/* ---- trechos: frases longas viram blocos curtos para repetir ---- */
const wc=s=>s.trim().split(/\s+/).filter(Boolean).length;
function chunkLine(text){const parts=[];const re=/[^.!?…]+[.!?…]+["»”)]*\s*|[^.!?…]+$/g;let m;
 while((m=re.exec(text))){if(m[0].trim())parts.push({t:m[0],s:m.index})}
 if(!parts.length)return[{t:text,s:0}];
 const out=[];parts.forEach(p=>{const last=out[out.length-1];if(last&&wc(last.t)<3)last.t+=p.t;else out.push({t:p.t,s:p.s})});
 if(out.length>1&&wc(out[out.length-1].t)<3){const l=out.pop();out[out.length-1].t+=l.t}
 const fin=[];out.forEach(p=>{if(wc(p.t)>12){const mid=p.t.length/2;let best=-1;for(let i=p.t.indexOf(", ");i>=0;i=p.t.indexOf(", ",i+1)){if(best<0||Math.abs(i-mid)<Math.abs(best-mid))best=i}
   if(best>0&&wc(p.t.slice(0,best))>=3&&wc(p.t.slice(best+2))>=3){fin.push({t:p.t.slice(0,best+2),s:p.s},{t:p.t.slice(best+2),s:p.s+best+2});return}}fin.push(p)});
 return fin}
function lineChunks(i){const t=SCUR.L[i][1];return SHP.mode!=="listen"&&SHP.chunk?chunkLine(t):[{t,s:0}]}

/* ---- render do player ---- */
const FLAG_SVG='<svg viewBox="0 0 24 24"><path d="M6 21V4M6 4h11l-2 4 2 4H6"/></svg>';
const PAUSE_SVG='<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
let LW=[];
function renderPod(){const p=SCUR,t=TOPIC[p.topic],s=podState(p.topic)||{},st=s.steps||{},hard=hardList();
 $("#sPlay").innerHTML=`<button class="back" id="sBack">← Podcasts ${t.lvl}</button>
 <div class="tophead"><span class="label">${t.lvl} · Tópico ${t.n} · ${esc(t.t)}</span><h2>${esc(p.t)}</h2><p class="muted small">${esc(p.sit)}</p></div>
 <div class="stp5" role="tablist" aria-label="Etapas do shadowing">${STEPS.map(x=>`<button role="tab" data-step="${x.k}" aria-selected="${SHP.step===x.k}" class="${SHP.step===x.k?"on":""}${st[x.k]?" done":""}"><b>${st[x.k]?"✓":x.k}</b><span>${x.n}</span></button>`).join("")}</div>
 <p class="stepd" id="stepD"></p>
 <div class="card stack player">
  <div class="pctl"><button class="iconbtn" id="pPrev" aria-label="Fala anterior"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><button class="btn primary pbig" id="pPlay"></button><button class="iconbtn" id="pNext" aria-label="Próxima fala"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button></div>
  <div class="pgap" id="pGap" hidden><div class="pgbar"><i id="pGapBar"></i></div><div class="row pgbtn"><button class="btn small" id="pAgain">Ouvir de novo</button><button class="btn small primary" id="pSkip">Já repeti →</button></div></div>
  <div class="progress"><i id="pBar" style="width:0%"></i></div>
  <p class="small muted" id="pHint" role="status"></p>
 </div>
 ${canSpeak?`<div class="trap" id="pNoVoice" hidden><span class="label">Sem voz em italiano</span>Este aparelho não tem uma voz italiana instalada, então a pronúncia pode sair errada. No celular, instale “Italiano” nas configurações de conversão de texto em voz (em Idioma e entrada ou Acessibilidade) e reabra o app.</div>`:`<div class="trap"><span class="label">Sem áudio</span>Este navegador não tem síntese de voz. Abra o app no celular ou no Chrome para ouvir.</div>`}
 <details class="card padj" id="pAdj"><summary><b>Ajustes</b><span class="small muted" id="pAdjSum"></span></summary><div class="popts">
   <label for="pMode">Modo<select id="pMode">${Object.entries(MODES).map(([k,n])=>`<option value="${k}">${n}</option>`).join("")}</select></label>
   <label for="pRate">Velocidade<select id="pRate">${[[.65,"Bem devagar"],[.8,"Devagar"],[.85,"Um pouco devagar"],[.9,"Quase normal"],[1,"Normal"]].map(([v,n])=>`<option value="${v}">${n}</option>`).join("")}</select></label>
   <label for="pShow">Texto<select id="pShow">${Object.entries(SHOWS).map(([k,n])=>`<option value="${k}">${n}</option>`).join("")}</select></label>
   <label for="pGapSel">Pausa para repetir<select id="pGapSel">${Object.entries(GAPS).map(([k,n])=>`<option value="${k}">${n[0]}</option>`).join("")}</select></label>
   <label for="pVoice">Voz<select id="pVoice"></select></label>
   <label class="pchk" for="pChunk"><input type="checkbox" id="pChunk"> Dividir falas longas em trechos curtos</label>
  </div></details>
 <div class="row pfilt"><button class="btn small" id="pOnly" aria-pressed="false" ${hard.length?"":"hidden"}></button><span class="small muted" id="pFlagTip">${FLAG_SVG} marca uma fala difícil para treinar depois</span></div>
 <div class="dlg show-${SHP.show}" id="dlg">${p.L.map((l,i)=>`<div class="dl sp${l[0]}${hard.includes(i)?" hard":""}" data-li="${i}"><span class="dsp">${esc(p.sp[l[0]])}</span><div class="dtx"><span class="it">${esc(l[1])}</span><span class="dpt">${esc(l[2])}</span></div><div class="dact"><button class="spk dplay" data-pi="${i}" aria-label="Tocar a partir desta fala">${SPK_SVG}</button><button class="spk dhard" data-hi="${i}" aria-pressed="${hard.includes(i)}" aria-label="Marcar como fala difícil">${FLAG_SVG}</button></div></div>`).join("")}</div>
 <div id="pDone"></div>`;
 tokenize($("#dlg"));
 LW=p.L.map((l,i)=>{let pos=0;return[...$$(`#dlg .dl[data-li="${i}"] .it button.w`)].map(el=>{const o=l[1].indexOf(el.textContent,pos);if(o>=0)pos=o+el.textContent.length;return{o,el}})});
 $("#sBack").onclick=closePod;$("#pPlay").onclick=togglePod;$("#pPrev").onclick=()=>jumpPod(-1);$("#pNext").onclick=()=>jumpPod(1);
 $("#pAgain").onclick=()=>{if(SHP.state!=="gap")return;SHP.rep=0;playCur()};
 $("#pSkip").onclick=()=>{if(SHP.state!=="gap")return;clearTimeout(SHP.t);addShMs(Date.now()-(SHP.g0||Date.now()));afterGap(SHP.tok)};
 $$("#sPlay [data-step]").forEach(b=>b.onclick=()=>{stopPod();SHP.only=false;applyStep(+b.dataset.step);syncPod();window.scrollTo(0,0)});
 $("#pMode").onchange=e=>{stopPod(true);SHP.mode=e.target.value;SHP.c=0;syncPod()};
 $("#pRate").onchange=e=>{SHP.rate=+e.target.value;syncPod()};
 $("#pShow").onchange=e=>{SHP.show=e.target.value;syncPod()};
 $("#pGapSel").onchange=e=>{SHP.gap=e.target.value;saveShp();syncPod()};
 $("#pChunk").onchange=e=>{stopPod(true);SHP.chunk=e.target.checked;SHP.c=0;saveShp();syncPod()};
 $("#pVoice").onchange=e=>{SHP.voice=e.target.value;saveShp()};
 $("#pOnly").onclick=()=>{stopPod();SHP.only=!SHP.only;SHP.i=firstIdx();SHP.done=false;syncPod()};
 $$("#dlg .dplay").forEach(b=>b.onclick=()=>{stopPod();SHP.i=+b.dataset.pi;SHP.c=0;SHP.done=false;$("#pDone").innerHTML="";playCur()});
 $$("#dlg .dhard").forEach(b=>b.onclick=()=>toggleHard(+b.dataset.hi));
 fillVoices();syncPod()}
/* acerta todos os controles com o estado atual (etapa, ajustes, filtro) */
function syncPod(){if(!SCUR||!$("#pPlay"))return;const s=podState(SCUR.topic)||{},st=s.steps||{},hard=hardList(),cur=STEPS[SHP.step-1];
 $$("#sPlay [data-step]").forEach(b=>{const k=+b.dataset.step,on=k===SHP.step;b.classList.toggle("on",on);b.classList.toggle("done",!!st[k]);b.setAttribute("aria-selected",on);b.querySelector("b").textContent=st[k]?"✓":k});
 $("#stepD").innerHTML=`<b>Etapa ${cur.k} · ${cur.n}.</b> ${cur.d}`;
 $("#pMode").value=SHP.mode;$("#pRate").value=String(SHP.rate);$("#pShow").value=SHP.show;$("#pGapSel").value=SHP.gap;$("#pChunk").checked=SHP.chunk;
 $("#pGapSel").closest("label").hidden=SHP.mode==="listen";$("#pChunk").closest("label").hidden=SHP.mode==="listen";
 $("#pAdjSum").textContent=MODES[SHP.mode]+" · "+($("#pRate").selectedOptions[0]?$("#pRate").selectedOptions[0].textContent.toLowerCase():"")+" · "+SHOWS[SHP.show].toLowerCase();
 $("#dlg").className="dlg show-"+SHP.show+(SHP.only&&hard.length?" only":"");
 const ob=$("#pOnly");ob.hidden=!hard.length;if(!hard.length)SHP.only=false;ob.setAttribute("aria-pressed",SHP.only);ob.classList.toggle("primary",SHP.only);
 ob.textContent=SHP.only?"Voltar a todas as falas":`Treinar só as difíceis (${hard.length})`;$("#pFlagTip").hidden=hard.length>0;
 if(!playList().includes(SHP.i))SHP.i=firstIdx();
 updPod()}
function toggleHard(i){S.shadow=S.shadow||{};const s=S.shadow[SCUR.topic]=S.shadow[SCUR.topic]||{n:0};const h=new Set(s.hard||[]);h.has(i)?h.delete(i):h.add(i);s.hard=[...h].sort((a,b)=>a-b);save();
 const d=$(`#dlg .dl[data-li="${i}"]`);if(d){d.classList.toggle("hard",h.has(i));d.querySelector(".dhard").setAttribute("aria-pressed",h.has(i))}
 if(SHP.only&&SHP.state!=="idle"&&!h.has(SHP.i))stopPod();syncPod()}
function hintText(){if(SHP.done)return"";
 if(SHP.state==="gap")return SHP.gap==="manual"?"Sua vez: repita em voz alta e toque em “Já repeti”.":"Sua vez: repita em voz alta, com o mesmo ritmo.";
 if(SHP.state==="playing")return SHP.mode==="listen"?(SHP.step===5?"Fale junto, meio segundo atrás do áudio.":SHP.step===1?"Só escute.":"Acompanhe o texto enquanto ouve."):"Escute o trecho com atenção.";
 return SHP.mode==="listen"?(SHP.step===5?"O áudio toca direto: fale junto com ele.":"O áudio toca direto, sem pausas."):SHP.mode==="shadow"?"Depois de cada trecho, uma pausa para você repetir.":"Cada trecho toca 3 vezes, com pausa para repetir."}
function updPod(){if(!SCUR||!$("#pPlay"))return;const l=playList(),pos=Math.max(0,l.indexOf(SHP.i)),ch=lineChunks(SHP.i).length;
 $("#pPlay").innerHTML=SHP.state==="playing"?PAUSE_SVG+"Pausar":SHP.state==="gap"?PAUSE_SVG+"Sua vez… (pausar)":(SPK_SVG+(SHP.done?"Ouvir de novo":pos>0||SHP.c>0?"Continuar":"Começar"));
 $("#pBar").style.width=(SHP.done?100:(pos+(ch?SHP.c/ch:0))/l.length*100)+"%";
 $$("#dlg .dl").forEach(d=>{const i=+d.dataset.li;d.classList.toggle("cur",i===SHP.i&&SHP.state!=="idle");d.classList.toggle("you",i===SHP.i&&SHP.state==="gap")});
 $("#pGap").hidden=SHP.state!=="gap";
 $("#pHint").textContent=hintText()}
function hlWord(i,ci){const ws=LW[i]||[];let cur=null;for(const w of ws){if(w.o>=0&&w.o<=ci)cur=w;else if(w.o>ci)break}
 $$("#dlg button.w.say").forEach(b=>{if(!cur||b!==cur.el)b.classList.remove("say")});if(cur)cur.el.classList.add("say")}
function clearHl(){$$("#dlg button.w.say").forEach(b=>b.classList.remove("say"))}
function scrollCur(){const el=$(`#dlg .dl[data-li="${SHP.i}"]`);if(el)el.scrollIntoView({block:"center",behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}

/* ---- motor de reprodução ---- */
function togglePod(){if(!canSpeak)return;if(SHP.state==="playing"||SHP.state==="gap"){stopPod(true);return}
 if(SHP.done||!playList().includes(SHP.i)){SHP.i=firstIdx();SHP.c=0}SHP.done=false;$("#pDone").innerHTML="";SHP.rep=0;playCur()}
function stopPod(keep){SHP.tok++;SHP.state="idle";clearTimeout(SHP.t);clearTimeout(SHP.wd);try{speechSynthesis.cancel()}catch(e){}if(!keep){SHP.rep=0;SHP.c=0}clearHl();updPod()}
function jumpPod(d){const was=SHP.state!=="idle";stopPod();const n=stepIdx(SHP.i,d);SHP.i=n<0?SHP.i:n;SHP.done=false;if(was)playCur();else{updPod();scrollCur()}}
function playCur(){const tok=++SHP.tok,p=SCUR,l=p.L[SHP.i];clearTimeout(SHP.t);clearTimeout(SHP.wd);if(!l){finishPod();return}
 const chs=lineChunks(SHP.i);if(SHP.c>=chs.length)SHP.c=0;const ch=chs[SHP.c];
 SHP.state="playing";updPod();if(SHP.c===0)scrollCur();
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(ch.t.trim());u.lang="it-IT";u.rate=SHP.rate;const v=voiceFor(l[0]);if(v.voice)u.voice=v.voice;u.pitch=v.pitch;
  const t0=Date.now(),lead=ch.t.length-ch.t.trimStart().length;let fin=false;
  const end=()=>{if(fin||tok!==SHP.tok)return;fin=true;clearTimeout(SHP.wd);clearHl();const dur=Date.now()-t0;addShMs(dur);
   if(SHP.mode==="listen"){SHP.t=setTimeout(()=>{if(tok===SHP.tok)advance(tok)},380);return}
   SHP.state="gap";SHP.g0=Date.now();updPod();const f=GAPS[SHP.gap][1],bar=$("#pGapBar");
   if(!f){if(bar){bar.style.transition="none";bar.style.width="100%"}return}
   const gap=Math.max(1300,dur*f+500);
   if(bar){bar.style.transition="none";bar.style.width="100%";void bar.offsetWidth;bar.style.transition="width "+gap+"ms linear";bar.style.width="0%"}
   SHP.t=setTimeout(()=>{if(tok!==SHP.tok)return;addShMs(gap);afterGap(tok)},gap)};
  u.onend=end;
  u.onboundary=e=>{if(tok!==SHP.tok||fin)return;if(e.name&&e.name!=="word")return;hlWord(SHP.i,ch.s+lead+(e.charIndex||0))};
  u.onerror=e=>{if(fin||tok!==SHP.tok)return;fin=true;clearTimeout(SHP.wd);clearHl();SHP.state="idle";updPod();
   if(!e||(e.error!=="interrupted"&&e.error!=="canceled"))$("#pHint").textContent="Não consegui tocar o áudio. Toque em Começar de novo; se continuar, confira o volume e a voz em Ajustes."};
  // alguns celulares nunca avisam que a fala terminou: segue em frente pelo tempo estimado
  SHP.wd=setTimeout(end,ch.t.length*115/SHP.rate+4000);
  speechSynthesis.speak(u)}catch(e){SHP.state="idle";updPod()}}
function afterGap(tok){if(tok!==SHP.tok)return;if(SHP.mode==="loop"&&SHP.rep<2){SHP.rep++;playCur();return}SHP.rep=0;advance(tok)}
function advance(tok){if(tok!==SHP.tok)return;const chs=lineChunks(SHP.i);
 if(SHP.c+1<chs.length){SHP.c++;playCur();return}
 const d=$(`#dlg .dl[data-li="${SHP.i}"]`);if(d)d.classList.add("seen");
 SHP.c=0;const n=stepIdx(SHP.i,1);if(n<0){finishPod();return}SHP.i=n;playCur()}
function finishPod(){SHP.tok++;SHP.state="idle";SHP.c=0;SHP.done=true;clearHl();const id=SCUR.topic,k=SHP.step,only=SHP.only;
 S.shadow=S.shadow||{};const s=S.shadow[id]=S.shadow[id]||{n:0};s.last=today();
 if(!only){s.n=(s.n||0)+1;s.steps=s.steps||{};s.steps[k]=today();logInc("s")}
 save();syncPod();
 const hard=hardList(),all=stepsDone(s)>=5,nx=STEPS.find(x=>!s.steps||!s.steps[x.k]);
 const box=$("#pDone");
 box.innerHTML=`<div class="fb ok pdone"><b>${only?"Falas difíceis treinadas.":"Etapa "+k+" concluída · "+STEPS[k-1].n+" ✓"}</b>
  <span>${only?"Repita até elas saírem sem esforço; depois desmarque a bandeira.":all?"Você fez as 5 etapas deste podcast. Volte a ele amanhã e repita as etapas 3 a 5: o mesmo áudio por alguns dias é o que fixa.":nx?"Próxima: etapa "+nx.k+" · "+nx.n+". "+nx.d:""}</span>
  <div class="row">${!only&&nx?`<button class="btn primary" id="pdNext">Ir para a etapa ${nx.k}</button>`:""}<button class="btn" id="pdAgain">${only?"Treinar de novo":"Repetir esta etapa"}</button>${!only&&hard.length?`<button class="btn" id="pdHard">Treinar as difíceis (${hard.length})</button>`:""}${only?`<button class="btn" id="pdAll">Voltar a todas as falas</button>`:""}</div>
  <span class="small">Hoje: ${shMin()} min de shadowing.</span></div>`;
 box.scrollIntoView({block:"center",behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
 const go=f=>()=>{box.innerHTML="";f();SHP.done=false;syncPod();window.scrollTo(0,0);playCur()};
 if($("#pdNext"))$("#pdNext").onclick=go(()=>applyStep(nx.k));
 $("#pdAgain").onclick=go(()=>{SHP.i=firstIdx();SHP.c=0});
 if($("#pdHard"))$("#pdHard").onclick=go(()=>{SHP.only=true;if(SHP.mode==="listen"){SHP.mode="shadow";if(SHP.show==="none")SHP.show="it"}SHP.i=firstIdx();SHP.c=0});
 if($("#pdAll"))$("#pdAll").onclick=()=>{box.innerHTML="";SHP.only=false;SHP.done=false;SHP.i=firstIdx();syncPod()}}
// tocar numa palavra durante o áudio: pausa o podcast para o painel da palavra falar sozinho
document.addEventListener("click",e=>{if(SCUR&&SHP.state!=="idle"&&e.target.closest&&e.target.closest("#dlg button.w"))stopPod(true)},true);
renderShadowIntro();
