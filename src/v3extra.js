/* ============================ V3: CAFFÈ CON LA NONNA, BUSCA, RESUMO SEMANAL, INÍCIO E ÁUDIO OFFLINE ============================ */

/* ---------- Caffè con la Nonna: sessão de ~5 minutos montada sozinha ---------- */
// Cartões vencidos (até 8), 1 modo di dire, 2 itens de escuta, 3 exercícios (o caderno de erros primeiro) e 1 frase para montar.
// O sorteio usa uma semente feita da data e do perfil: reabrir o app no mesmo dia monta a mesma sessão. S.caffe = {ult, dias:{data:1}}
function caffeLvl(){const a2=COURSE.filter(t=>t.lvl==="A2").some(t=>S.course[t.id]&&(S.course[t.id].voc||S.course[t.id].best!=null));return a2?"A2":EX.lvl||"A1"}
function caffeItems(){const r=seedRng(today()+"|"+profId()+"|caffe"),lvl=caffeLvl(),its=[];
 if(!SESSION)buildSession();
 shuffleR(dueIds().sort(),r).slice(0,8).forEach(id=>its.push({k:"card",id}));
 const md=[];MODI.forEach(u=>u.itens.forEach((m,k)=>md.push({u,m,k})));const mm=md[r()*md.length|0],outros=shuffleR(md.filter(x=>x!==mm),r).slice(0,2);
 its.push({id:"modi:"+mm.u.id+":"+mm.k,k:"mc",cat:"voc",lbl:"Modo di dire",p:"O que quer dizer «"+mm.m.it+"»?",o:[mm.m.s,...outros.map(x=>x.m.s)],a:0,x:"Ao pé da letra: "+mm.m.lit+". Exemplo: "+mm.m.es,say:mm.m.it});
 const asc=ASC.filter(x=>x.nivel===lvl),nv=asc.filter(x=>!v3Stat("escuta",x.id));shuffleR(nv.length>=2?nv:asc,r).slice(0,2).forEach(x=>its.push(ascItem(x)));
 const errs=errList().filter(e=>e.q&&e.q.k==="mc").slice(0,3).map(errItem).filter(Boolean);
 const pool=EXQ.filter(q=>q.nivel===lvl&&q.cat!=="int"),fill=shuffleR(pool,r).filter(q=>!errs.some(e=>e.id===q.id)).slice(0,3-errs.length).map(exItemOf);[...errs,...fill].forEach(x=>its.push(x));
 const od=ORD.filter(x=>x.nivel===lvl);its.push(ordItem(od[r()*od.length|0]));return its}
function caffeDone(){return((S.caffe||{}).ult)===today()}
function caffeStreak(){const d=(S.caffe||{}).dias||{};let c=0,x=new Date();if(!d[fmt(x)])x.setDate(x.getDate()-1);while(d[fmt(x)]){c++;x.setDate(x.getDate()-1)}return c}
function openCaffe(){const box=v3Open("Caffè con la Nonna",()=>renderHome());const its=caffeItems(),nc=its.filter(x=>x.k==="card").length;
 box.innerHTML=`<div class="card stack caffe"><div class="row" style="gap:12px;flex-wrap:nowrap;align-items:center">${nonnaSVG(caffeDone()?"comemorando":"acenando","nonna sm")}<div class="stack" style="gap:4px"><h2 class="it" style="font-style:normal">Un caffè con la Nonna</h2><p class="small muted">Uns 5 minutos: ${nc?nc+" cartões, ":""}1 modo di dire, 2 escutas, 3 exercícios e 1 frase para montar.</p></div></div>
 ${caffeDone()?`<div class="fb ok"><b>A sessão de hoje já está feita.</b><span>Pode fazer de novo para treinar: o calendário já está marcado.</span></div>`:""}
 <button class="btn primary" id="cfGo">${caffeDone()?"Fazer de novo":"Começar"}</button></div>`;
 $("#cfGo").onclick=()=>rnStart({box:"#v3Box",titulo:"Caffè con la Nonna",items:its,origem:"caffe",tag:today(),onQuit:()=>{v3Close();renderHome()},onEnd:caffeEnd})}
function caffeEnd(R){const first=!caffeDone();S.caffe=S.caffe||{ult:"",dias:{}};S.caffe.dias=S.caffe.dias||{};S.caffe.ult=today();S.caffe.dias[today()]=1;
 const ds=Object.keys(S.caffe.dias).sort();if(ds.length>400)ds.slice(0,ds.length-400).forEach(d=>delete S.caffe.dias[d]);
 if(first)logEvento("exercicio","caffe");save();
 const sc=R.res.filter(x=>x&&x.it.k!=="card"),ok=sc.filter(x=>x.ok).length,st=caffeStreak();
 $("#v3Box").innerHTML=`<div class="card stack caffe" style="align-items:center;text-align:center">${nonnaSVG("comemorando","nonna")}<h2>Brava! Sessão feita.</h2>
 <p>${ok}/${sc.length} certas${R.res.some(x=>x&&x.it.k==="card")?" · "+R.res.filter(x=>x&&x.it.k==="card").length+" cartões revisados":""}</p>
 <div class="row" style="justify-content:center"><span class="chip hot">${st} ${st===1?"dia":"dias"} de caffè seguidos</span><span class="chip">${activeStreak()} ${activeStreak()===1?"dia":"dias"} de estudo seguidos</span></div>
 <p class="small muted">O dia ficou marcado no calendário.</p><button class="btn primary" id="cfClose">Fechar</button></div>`;
 $("#cfClose").onclick=()=>{v3Close();renderHome()}}

/* ---------- Início: Caffè e caderno de erros ---------- */
function renderHomeV3(){const el=$("#homeCaffe");if(!el)return;const n=errN(),d=caffeDone(),st=caffeStreak();
 el.innerHTML=`<button class="caffebtn${d?" done":""}" id="cfOpen">${nonnaSVG(d?"comemorando":"acenando","nonna sm")}<span class="stack" style="gap:2px;text-align:left"><b class="it" style="font-style:normal">Caffè con la Nonna</b><span class="small">${d?"Feito hoje ✓"+(st>1?" · "+st+" dias seguidos":""):"Sessão de 5 minutos montada para hoje"}</span></span></button>
 <button class="btn${n?"":" ghost"}" id="errHome" ${n?"":"disabled"}>Rever meus erros (<span data-errn>${n}</span>)</button>`;
 $("#cfOpen").onclick=openCaffe;$("#errHome").onclick=()=>{if(!errN())return;showTab("exerc");EX.mode="erros";errRound("#exBox",()=>renderErrList("#exBox",v3Back))}}
const _renderHome=renderHome;
renderHome=function(){_renderHome();try{renderHomeV3()}catch(e){}};

/* ---------- painel: selo do simulado e resumo semanal ---------- */
const _renderPainel=renderPainel;
renderPainel=function(){_renderPainel();const el=$("#homePainel");if(!el)return;const selos=["A1","A2"].filter(l=>simBest(l)>=80);
 const w=document.createElement("div");w.className="stack v3painel";w.style.gap="10px";
 w.innerHTML=`${selos.length?`<div class="row" style="gap:10px;align-items:center;flex-wrap:nowrap">${nonnaSVG("comemorando","nonna xs")}<div class="stack" style="gap:2px"><b>Selo da Nonna</b><span class="small">${selos.map(l=>"Simulado "+l+" com "+simBest(l)+"%").join(" · ")}</span></div></div>`:""}
 <button class="btn" id="shareWeek">Compartilhar minha semana</button><p class="small muted" id="shareMsg" role="status"></p>`;
 el.appendChild(w);$("#shareWeek").onclick=shareWeek};
function weekStats(){const days=[];for(let i=6;i>=0;i--){const d=addDays(-i);days.push({d,on:dayActive(d)})}
 let let_=0,rev=0;days.forEach(({d})=>((S.eventos||{})[d]||[]).forEach(e=>{if(e[0]==="leitura")let_++;if(e[0]==="revisao")rev+=evCount(e)}));
 return{days,n:days.filter(x=>x.on).length,streak:activeStreak(),let:let_,rev}}
function svgImg(svg){return new Promise(res=>{const s=svg.replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="472" ');const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(s)})}
async function weekPNG(){const W=1080,H=1350,c=document.createElement("canvas");c.width=W;c.height=H;const g=c.getContext("2d"),st=weekStats(),nm=profName()||"Minha semana";
 g.fillStyle="#FBF5EA";g.fillRect(0,0,W,H);g.fillStyle="#C2402A";g.fillRect(0,0,W,250);
 const im=await svgImg(nonnaSVG(st.n>=4?"comemorando":"acenando","nonna"));
 g.fillStyle="#FBF5EA";g.font="600 44px Georgia, serif";g.fillText("NONNA DICE",70,110);g.font="400 34px Georgia, serif";g.fillText("La mia settimana · minha semana",70,165);
 if(im)g.drawImage(im,680,40,380,359);
 g.fillStyle="#2B1D16";g.font="700 64px Georgia, serif";g.fillText(nm.length>22?nm.slice(0,21)+"…":nm,70,350);
 g.font="400 30px sans-serif";g.fillStyle="#6b5a4e";const d0=st.days[0].d.split("-").reverse().join("/"),d1=st.days[6].d.split("-").reverse().join("/");g.fillText(d0+" a "+d1,70,400);
 const box=(x,y,num,lab)=>{g.fillStyle="#fff";g.strokeStyle="#E7E1D6";g.lineWidth=3;g.beginPath();g.roundRect?g.roundRect(x,y,450,230,28):g.rect(x,y,450,230);g.fill();g.stroke();
  g.fillStyle="#C2402A";g.font="700 96px Georgia, serif";g.fillText(String(num),x+36,y+125);g.fillStyle="#2B1D16";g.font="500 32px sans-serif";g.fillText(lab,x+36,y+185)};
 box(70,460,st.n+"/7","dias estudados");box(560,460,st.streak,st.streak===1?"dia seguido":"dias seguidos");box(70,730,st.let,st.let===1?"leitura concluída":"leituras concluídas");box(560,730,st.rev,"cartões revisados");
 const lbl=["D","S","T","Q","Q","S","S"];st.days.forEach((x,i)=>{const cx=130+i*136,cy=1080;g.beginPath();g.arc(cx,cy,46,0,Math.PI*2);g.fillStyle=x.on?"#2F6B3A":"#E7E1D6";g.fill();
  g.fillStyle=x.on?"#fff":"#6b5a4e";g.font="600 30px sans-serif";g.textAlign="center";g.fillText(lbl[new Date(x.d+"T12:00").getDay()],cx,cy+11);g.textAlign="left"});
 g.fillStyle="#2B1D16";g.font="italic 38px Georgia, serif";g.textAlign="center";g.fillText(st.n>=5?"«Brava! Continua così.»":st.n>=3?"«Piano piano si va lontano.»":"«Ogni giorno un passo.»",W/2,1240);g.textAlign="left";
 return new Promise(res=>c.toBlob(b=>res(b),"image/png"))}
async function shareWeek(){const m=$("#shareMsg");if(m)m.textContent="Preparando a imagem…";let b=null;try{b=await weekPNG()}catch(e){}
 if(!b){if(m)m.textContent="Não consegui gerar a imagem neste aparelho.";return}
 const f=new File([b],"nonna-dice-semana.png",{type:"image/png"});
 try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:"Minha semana no Nonna Dice"});if(m)m.textContent="";return}}catch(e){if(e&&e.name==="AbortError"){if(m)m.textContent="";return}}
 const u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download="nonna-dice-semana.png";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);if(m)m.textContent="Imagem baixada."}

/* ---------- busca geral ---------- */
// Índice em memória (montado na primeira busca): vocabulário, leituras, modi di dire, falsos amigos, termos técnicos, verbos, Preferiti e dúvidas.
let BIDX=null;
function buscaIdx(){const o=[],add=(sec,it,pt,go,extra)=>o.push({sec,it,pt,go,n:norm((it||"")+" "+(pt||"")+" "+(extra||""))});
 COURSE.forEach(t=>t.voc.forEach(v=>add("Vocabulário",v[0],v[1]+" · "+t.lvl+" "+t.t,()=>{v3Close();showTab("curso");openTopic(t.id,"voc")})));
 LETTURE.forEach(t=>add("Leituras",t.titulo,t.nivel+" · "+(TEMAS[t.tema]||""),()=>{v3Close();showTab("news");setNS("let");openLet(t.id)},String(t.versoes.base||"")));
 MODI.forEach(u=>u.itens.forEach(m=>add("Modi di dire",m.it,m.pt,()=>{v3Close();showTab("news");setNS("modi");openModi(u.id)},m.es)));
 FALSI.forEach(b=>b.itens.forEach(x=>add("Falsos amigos",x.it,"é "+x.e+" (não "+x.parece+")",()=>{v3Close();showTab("curso");openFalsi(b.id)})));
 CANT.forEach(u=>u.termos.forEach(t=>add("Cantiere e ufficio tecnico",t[0],t[1],()=>{v3Close();showTab("curso");openCant(u.id)},t[2])));
 VERBS.forEach(v=>add("Verbos",v.inf,v.pt,()=>{v3Close();showTab("exerc");EX.mode="verbos";VB.cur=v;renderExerc()}));
 return o}
function buscaDyn(){const o=[];Object.keys(S.favs||{}).forEach(k=>{const f=S.favs[k];o.push({sec:"Preferiti",it:f.lemma||k,pt:f.meaning||"",go:()=>{v3Close();showTab("preferiti");setPrefSeg("fav")},n:norm((f.lemma||k)+" "+(f.meaning||"")+" "+(f.example||""))})});
 duvList().forEach(d=>o.push({sec:"Dúvidas",it:d.q||String(d.a||"").slice(0,60),pt:fmtBR(d.d||today()),go:()=>{v3Close();showTab("preferiti");setPrefSeg("duv")},n:norm((d.q||"")+" "+(d.a||""))}));return o}
const BQ={q:""};
function openBusca(){const box=v3Open("Buscar");if(!BIDX)BIDX=buscaIdx();
 box.innerHTML=`<input type="search" id="bQ" placeholder="Palavra em italiano ou português" autocomplete="off" enterkeyhint="search" value="${esc(BQ.q)}"><p class="small muted">Sem diferença de acentos nem de maiúsculas. Toque num resultado para abrir.</p><div id="bRes" class="stack" style="gap:14px"></div>`;
 const q=$("#bQ");q.oninput=()=>{BQ.q=q.value;buscaFill()};buscaFill();setTimeout(()=>{try{q.focus()}catch(e){}},50)}
function buscaFill(){const el=$("#bRes");if(!el)return;const q=norm(BQ.q||"");if(q.length<2){el.innerHTML="";return}
 const all=[...BIDX,...buscaDyn()].filter(x=>x.n.includes(q)),secs=[...new Set(all.map(x=>x.sec))];
 if(!all.length){el.innerHTML=`<p class="small">Nada encontrado para «${esc(BQ.q)}».</p>`;return}
 const shown=[];
 el.innerHTML=secs.map(s=>{const l=all.filter(x=>x.sec===s).sort((a,b)=>(norm(a.it).startsWith(q)?0:1)-(norm(b.it).startsWith(q)?0:1)),top=l.slice(0,8);
  return`<div class="stack" style="gap:6px"><span class="label">${esc(s)} · ${l.length}</span>${top.map(x=>{shown.push(x);return`<button class="bres" data-b="${shown.length-1}"><b class="it">${esc(x.it)}</b><span class="small">${esc(x.pt)}</span></button>`}).join("")}${l.length>8?`<span class="small muted">e mais ${l.length-8}</span>`:""}</div>`}).join("");
 $$("#bRes [data-b]").forEach(b=>b.onclick=()=>{const x=shown[+b.dataset.b];x.go();window.scrollTo(0,0)})}

/* ---------- Fase 4: baixar todos os áudios gravados para usar offline (PWA) ---------- */
const DLA={on:false,done:0,tot:0,msg:""};
async function audioDownload(){if(DLA.on){DLA.on=false;return}if(!REC.keys||!("caches" in window))return;DLA.on=true;DLA.msg="";
 const c=await caches.open("quaderno-audio"),keys=[...REC.keys];DLA.tot=keys.length;DLA.done=0;renderAudioCard();
 let i=0,fail=0;const one=async()=>{while(DLA.on&&i<keys.length){const k=keys[i++],u=REC.base+k+".mp3";
   try{const hit=await c.match(u,{ignoreSearch:true});if(!hit){const r=await fetch(u);if(r.ok)await c.put(u,r);else fail++}}catch(e){fail++}
   DLA.done++;if(DLA.done%40===0)audioDlUI()}};
 await Promise.all([one(),one(),one(),one(),one(),one()]);
 DLA.msg=!DLA.on?"Download pausado. Toque de novo para continuar de onde parou.":fail?"Terminou, mas "+fail+" arquivos falharam (sem internet?). Toque de novo para tentar.":"Pronto: todos os áudios estão guardados neste aparelho.";
 DLA.on=false;renderAudioCard()}
function audioDlUI(){const e=$("#audDlMsg");if(e)e.textContent=DLA.on?"Baixando… "+DLA.done.toLocaleString("pt-BR")+" de "+DLA.tot.toLocaleString("pt-BR"):DLA.msg;const b=$("#audDl");if(b)b.textContent=DLA.on?"Pausar download":"Baixar áudios para usar offline"+(REC.mb?" ("+String(REC.mb).replace(".",",")+" MB)":"")}
const _renderAudioCard=renderAudioCard;
renderAudioCard=function(){_renderAudioCard();const el=$("#homeAudio");if(!el||!REC.keys||!("caches" in window))return;
 const w=document.createElement("div");w.className="stack";w.style.gap="6px";w.innerHTML=`<p class="small muted">Cada áudio fica guardado depois que toca pela primeira vez. Para ter todos sem internet:</p><div class="row"><button class="btn" id="audDl"></button></div><p class="small" id="audDlMsg" role="status"></p>`;
 const d=el.querySelector("details");el.insertBefore(w,d||null);$("#audDl").onclick=audioDownload;audioDlUI()};

/* ---------- lupa no cabeçalho e Esc ---------- */
(function(){const b=$("#srchBtn");if(b)b.onclick=openBusca})();
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$("#v3Ov")&&!$("#v3Ov").hidden&&$("#sheet").hidden){v3Close();try{renderHome()}catch(x){}}});
