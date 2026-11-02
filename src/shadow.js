/* ============================ SHADOWING ============================ */
let SLVL="A1",SCUR=null;
const SHP={i:0,state:"idle",tok:0,mode:"shadow",rate:.85,show:"it",rep:0};
try{const o=JSON.parse(localStorage.getItem(KEY+".shp")||"{}");if(o.mode)SHP.mode=o.mode;if(o.rate)SHP.rate=o.rate;if(o.show)SHP.show=o.show}catch(e){}
function saveShp(){try{localStorage.setItem(KEY+".shp",JSON.stringify({mode:SHP.mode,rate:SHP.rate,show:SHP.show}))}catch(e){}}
let IT_VOICES=[];
function loadVoices(){if(!canSpeak)return;try{const v=speechSynthesis.getVoices().filter(x=>/^it/i.test(x.lang));IT_VOICES=v}catch(e){}}
if(canSpeak){loadVoices();try{speechSynthesis.addEventListener("voiceschanged",loadVoices)}catch(e){}}
function voiceFor(sp){if(!IT_VOICES.length)return{voice:null,pitch:sp==="A"?1:1.18};if(IT_VOICES.length>1)return{voice:IT_VOICES[sp==="A"?0:1],pitch:1};return{voice:IT_VOICES[0],pitch:sp==="A"?.95:1.2}}
$$("#sSeg button").forEach(b=>b.addEventListener("click",()=>{SLVL=b.dataset.sl;renderShadow()}));
function renderShadow(){if(SCUR&&!$("#sPlay").hidden)return;
 $$("#sSeg button").forEach(b=>{const on=b.dataset.sl===SLVL;b.classList.toggle("on",on);b.setAttribute("aria-selected",on)});
 $("#slist").innerHTML=PODS.filter(p=>TOPIC[p.topic].lvl===SLVL).map(p=>{const t=TOPIC[p.topic],s=(S.shadow||{})[p.topic];return`<button class="tcard${s&&s.n>=3?" done":""}" data-sopen="${p.topic}"><span class="tn">${t.n}</span><div><h3>${esc(p.t)}</h3><p>${esc(t.t)} · ${p.L.length} falas</p></div><span class="pill ${s?"ok":""}">${s?s.n+"×":"novo"}</span></button>`}).join("");
 $$("[data-sopen]").forEach(b=>b.onclick=()=>openPod(b.dataset.sopen))}
function openPod(id){const p=PODS.find(x=>x.topic===id);if(!p)return;SMODE="pod";renderSMode();SCUR=p;SLVL=TOPIC[id].lvl;stopPod();SHP.i=0;$("#sHome").hidden=true;$("#sPlay").hidden=false;renderPod();window.scrollTo(0,0)}
function closePod(){stopPod();SCUR=null;$("#sPlay").hidden=true;$("#sHome").hidden=false;renderShadow();window.scrollTo(0,0)}
const MODES={shadow:"Frase + pausa",loop:"Cada frase 3×",listen:"Direto, sem pausa"};
function renderPod(){const p=SCUR,t=TOPIC[p.topic],s=(S.shadow||{})[p.topic];
 $("#sPlay").innerHTML=`<button class="back" id="sBack">← Podcasts ${t.lvl}</button>
 <div class="tophead"><span class="label">${t.lvl} · Tópico ${t.n} · ${esc(t.t)}</span><h2>${esc(p.t)}</h2><p class="muted small">${esc(p.sit)}</p>${s?`<p class="small">Você já praticou este podcast <b>${s.n}</b> ${s.n===1?"vez":"vezes"} (último: ${fmtBR(s.last)}).</p>`:""}</div>
 <div class="card popts-card"><div class="popts">
   <label for="pMode">Modo<select id="pMode">${Object.entries(MODES).map(([k,n])=>`<option value="${k}" ${SHP.mode===k?"selected":""}>${n}</option>`).join("")}</select></label>
   <label for="pRate">Velocidade<select id="pRate">${[[.65,"Bem devagar"],[.8,"Devagar"],[.9,"Quase normal"],[1,"Normal"]].map(([v,n])=>`<option value="${v}" ${Math.abs(SHP.rate-v)<.01?"selected":""}>${n}</option>`).join("")}</select></label>
   <label for="pShow">Texto<select id="pShow"><option value="it" ${SHP.show==="it"?"selected":""}>Italiano</option><option value="both" ${SHP.show==="both"?"selected":""}>Italiano + tradução</option><option value="none" ${SHP.show==="none"?"selected":""}>Sem texto (só ouvir)</option></select></label>
  </div></div>
 <div class="card stack player">
  <div class="pctl"><button class="iconbtn" id="pPrev" aria-label="Fala anterior"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><button class="btn primary pbig" id="pPlay"></button><button class="iconbtn" id="pNext" aria-label="Próxima fala"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button></div>
  <div class="progress"><i id="pBar" style="width:0%"></i></div>
  <p class="small muted" id="pHint"></p>
 </div>
 ${canSpeak?"":`<div class="trap"><span class="label">Sem áudio</span>Este navegador não tem síntese de voz. Abra o app no celular ou no Chrome para ouvir.</div>`}
 <div class="dlg show-${SHP.show}" id="dlg">${p.L.map((l,i)=>`<div class="dl sp${l[0]}" data-li="${i}"><span class="dsp">${esc(p.sp[l[0]])}</span><div class="dtx"><span class="it">${esc(l[1])}</span><span class="dpt">${esc(l[2])}</span></div><button class="spk dplay" data-pi="${i}" aria-label="Tocar a partir desta fala">${SPK_SVG}</button></div>`).join("")}</div>
 <div class="tip"><span class="label">Roteiro sugerido para este podcast</span>1) Ouça direto, sem texto. 2) Leia com a tradução e toque nas palavras que não conhece. 3) Modo "Frase + pausa", com texto, devagar. 4) Mesmo modo, sem texto. 5) Velocidade normal, falando junto com o áudio.</div>`;
 tokenize($("#dlg"));
 $("#sBack").onclick=closePod;$("#pPlay").onclick=togglePod;$("#pPrev").onclick=()=>jumpPod(-1);$("#pNext").onclick=()=>jumpPod(1);
 $("#pMode").onchange=e=>{SHP.mode=e.target.value;saveShp();updPod()};
 $("#pRate").onchange=e=>{SHP.rate=+e.target.value;saveShp()};
 $("#pShow").onchange=e=>{SHP.show=e.target.value;saveShp();$("#dlg").className="dlg show-"+SHP.show};
 $$("#dlg .dplay").forEach(b=>b.addEventListener("click",ev=>{ev.stopPropagation();ev.preventDefault();stopPod();SHP.i=+b.dataset.pi;SHP.state="playing";playLine()},true));
 updPod()}
function updPod(){if(!SCUR||!$("#pPlay"))return;const n=SCUR.L.length;
 $("#pPlay").innerHTML=SHP.state==="playing"?'<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>Pausar':SHP.state==="gap"?'<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>Sua vez… (pausar)':(SPK_SVG+(SHP.i>0?"Continuar":"Começar"));
 $("#pBar").style.width=(SHP.i/n*100)+"%";
 $$("#dlg .dl").forEach(d=>{const i=+d.dataset.li;d.classList.toggle("cur",i===SHP.i&&SHP.state!=="idle");d.classList.toggle("you",i===SHP.i&&SHP.state==="gap")});
 $("#pHint").textContent=SHP.state==="gap"?"Sua vez: repita em voz alta, com o mesmo ritmo.":SHP.mode==="listen"?"Fale junto, meio segundo atrás do áudio.":SHP.mode==="shadow"?"Depois de cada fala, uma pausa para você repetir.":"Cada fala toca 3 vezes, com pausa entre elas."}
function togglePod(){if(!canSpeak)return;if(SHP.state==="playing"||SHP.state==="gap"){stopPod(true);return}SHP.state="playing";if(SHP.i>=SCUR.L.length)SHP.i=0;SHP.rep=0;playLine()}
function stopPod(keep){SHP.tok++;SHP.state="idle";clearTimeout(SHP.t);try{speechSynthesis.cancel()}catch(e){}if(!keep)SHP.rep=0;updPod()}
function jumpPod(d){const was=SHP.state!=="idle";stopPod();SHP.i=Math.max(0,Math.min(SCUR.L.length-1,SHP.i+d));if(was){SHP.state="playing";playLine()}else{updPod();scrollCur()}}
function scrollCur(){const el=$(`#dlg .dl[data-li="${SHP.i}"]`);if(el)el.scrollIntoView({block:"center",behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}
function playLine(){const tok=++SHP.tok,p=SCUR,l=p.L[SHP.i];if(!l){finishPod();return}
 SHP.state="playing";updPod();scrollCur();
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(l[1]);u.lang="it-IT";u.rate=SHP.rate;const v=voiceFor(l[0]);if(v.voice)u.voice=v.voice;u.pitch=v.pitch;
  const t0=Date.now();
  u.onend=()=>{if(tok!==SHP.tok)return;const dur=Date.now()-t0;
   if(SHP.mode==="listen"){SHP.i++;SHP.t=setTimeout(()=>{if(tok===SHP.tok)playLine()},450);return}
   SHP.state="gap";updPod();const gap=Math.max(1400,dur*1.25+400);
   SHP.t=setTimeout(()=>{if(tok!==SHP.tok)return;if(SHP.mode==="loop"&&SHP.rep<2){SHP.rep++;playLine();return}SHP.rep=0;SHP.i++;playLine()},gap)};
  u.onerror=()=>{if(tok!==SHP.tok)return;SHP.state="idle";updPod()};
  speechSynthesis.speak(u)}catch(e){SHP.state="idle";updPod()}}
function finishPod(){SHP.state="idle";SHP.i=0;const id=SCUR.topic;S.shadow=S.shadow||{};const s=S.shadow[id]=S.shadow[id]||{n:0};s.n++;s.last=today();logInc("s");save();updPod();
 $("#pHint").innerHTML=`<b>Podcast concluído.</b> Repita amanhã: o shadowing funciona melhor com o mesmo áudio por alguns dias seguidos.`}
function renderShadowIntro(){
 const wave=(y,cls,off)=>{let d=`M${20+off} ${y}`;for(let x=0;x<=420;x+=6){const a=Math.sin(x/9)*Math.sin(x/53)*14*(x%140<100?1:.15);d+=` L${20+off+x} ${(y+a).toFixed(1)}`}return`<path d="${d}" class="${cls}" fill="none"/>`};
 const echo=`<div class="tlw"><svg viewBox="0 0 560 150" class="pssvg" role="img" aria-label="O áudio e a sua voz, com meio segundo de atraso">
  <text x="10" y="34" class="tllab">áudio</text>${wave(40,"wvA",70)}
  <text x="10" y="104" class="tllab">você</text>${wave(110,"wvB",100)}
  <line x1="90" y1="70" x2="90" y2="132" class="tlnow"/><line x1="120" y1="70" x2="120" y2="132" class="tlnow"/>
  <text x="105" y="146" class="tlpt" text-anchor="middle">≈ 0,5 s</text></svg></div>`;
 $("#sIntro").innerHTML=`<div class="stack" style="gap:6px"><h2>Shadowing</h2><p class="muted">Shadowing (“sombra”) é repetir em voz alta o que você ouve, quase ao mesmo tempo que o falante nativo, imitando ritmo, entonação e pronúncia. Treina o ouvido e a boca juntos: você para de traduzir na cabeça e começa a falar em blocos.</p></div>
 ${IG.box("Como funciona: você fala logo atrás do áudio",echo,"Você não espera a frase terminar: começa a falar meio segundo depois, como uma sombra. Na pausa do modo “Frase + pausa”, você repete a frase inteira.")}
 ${IG.box("As 5 etapas com o mesmo podcast",`<ol class="steps">
  <li><b>Ouvir sem texto</b><span>Entenda a situação. Não se preocupe com cada palavra.</span></li>
  <li><b>Ler com tradução</b><span>Toque nas palavras novas para ver o significado e os exemplos.</span></li>
  <li><b>Sombra com texto, devagar</b><span>Modo “Frase + pausa” ou “3 vezes”. Leia e repita em voz alta.</span></li>
  <li><b>Sombra sem texto</b><span>Esconda o texto e repita só de ouvido.</span></li>
  <li><b>Velocidade normal</b><span>Modo “Ouvir direto”: fale junto, colado no áudio.</span></li></ol>`,"Grave a sua voz com o gravador do celular de vez em quando e compare com o áudio.")}
 ${IG.box("Dicas",IG.cards([{h:"10–15 min por dia",p:"melhor que uma hora no fim de semana"},{h:"o mesmo áudio por 3–5 dias",p:"a repetição é o que fixa"},{h:"em voz alta",p:"murmurar não treina a pronúncia"},{h:"ritmo antes da perfeição",p:"copie a melodia; os erros somem com as repetições"}]))}
 <p class="small muted">Os podcasts abaixo acompanham cada tópico do curso e usam o vocabulário e a gramática dele. A voz é a do seu aparelho (síntese de voz em italiano); por isso, a qualidade varia de um celular para outro.</p>`;
 $("#sLinks").innerHTML=`<div class="stack" style="gap:8px"><span class="label">Podcasts reais para continuar</span>${PODLINKS.map(l=>`<a class="lnk" href="${l.u}" target="_blank" rel="noopener"><b>${esc(l.n)}</b><span>${esc(l.d)}</span></a>`).join("")}<p class="small muted">Abrem fora do app. Com eles, use o modo de ouvir-pausar-repetir do próprio player do podcast.</p></div>`}
renderShadowIntro();
