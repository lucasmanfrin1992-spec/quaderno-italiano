const NEWS={latest:null,cur:null,curDate:null,index:{},cache:{},extra:{},state:"loading",calMonth:null,rendered:null};
const MONTHS=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
const fmtBR=d=>d.split("-").reverse().join("/");
const pad2=n=>String(n).padStart(2,"0");
const clone=o=>JSON.parse(JSON.stringify(o));
const LET="A-Za-zÀ-ÖØ-öø-ÿ";
const STAR_SVG='<svg viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg>';
const X_SVG='<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>';

function newsKey(w){return w.toLowerCase().replace(/’/g,"'")}
function gloss(k){const g=(NEWS.cur&&NEWS.cur.glossary)||{};return g[k]||g[k.replace(/'$/,"")]||NEWS.extra[k]||null}
function favKeyOf(e,k){return String((e&&e.lemma)||k).toLowerCase().trim()}
function localEntry(k){const nk=norm(k.replace(/'$/,""));if(nk.length<2)return null;
 const v=VOCAB.find(v=>norm(v.it).split(/[\s,()/.?!]+/).includes(nk));
 return v?{lemma:v.it,meaning:v.pt,synonyms:[],pos:"",note:"Do vocabulário do app ("+v.theme+").",local:true}:null}

/* texto → palavras clicáveis */
function tok(text,pi){let out="",last=0;const re=new RegExp("["+LET+"]+['’]?","g");let m;
 while((m=re.exec(text))){let w=m[0];const off=m.index;
  if(/['’]$/.test(w)){const nx=text[off+w.length]||"";if(!new RegExp("["+LET+"]").test(nx)&&!/^po['’]$/i.test(w))w=w.slice(0,-1)}
  const k=newsKey(w),e=gloss(k);let cls="w";if(e)cls+=" g";if(e&&S.favs[favKeyOf(e,k)])cls+=" fav";
  out+=esc(text.slice(last,off))+`<button class="${cls}" data-w="${esc(k)}" data-p="${pi}">${esc(w)}</button>`;last=off+w.length;re.lastIndex=last}
 return out+esc(text.slice(last))}
function refreshTokenMarks(){$$("button.w").forEach(b=>{const e=gloss(b.dataset.w);b.classList.toggle("g",!!e);b.classList.toggle("fav",!!(e&&S.favs[favKeyOf(e,b.dataset.w)]))})}
function findSentence(text,w){const parts=String(text).match(/[^.!?]+[.!?»"]*/g)||[text];const lw=w.toLowerCase();return(parts.find(p=>p.toLowerCase().includes(lw))||text).trim()}

/* leitura em voz alta */
let READ={state:"idle",tok:0,i:0,texts:[]};
function hlPara(i){$$("#newsBox .npara,#newsBox .ntitle").forEach(p=>p.classList.remove("reading"));if(i==null||READ.state==="idle")return;const els=[$("#newsBox .ntitle"),...$$("#newsBox .npara")];if(els[i])els[i].classList.add("reading")}
function speakFrom(i){const tok=++READ.tok;READ.i=i;
 if(i>=READ.texts.length){READ.state="idle";updReadBtn();hlPara(null);return}
 try{const u=new SpeechSynthesisUtterance(READ.texts[i]);u.lang="it-IT";u.rate=.88;
  u.onend=()=>{if(tok!==READ.tok||READ.state!=="playing")return;speakFrom(i+1)};
  u.onerror=()=>{if(tok!==READ.tok)return;READ.state="idle";updReadBtn();hlPara(null)};
  hlPara(i);speechSynthesis.speak(u)}catch(e){READ.state="idle";updReadBtn()}}
function readAll(){if(!canSpeak||!NEWS.cur)return;
 if(READ.state==="playing"){READ.state="paused";READ.tok++;try{speechSynthesis.cancel()}catch(e){}updReadBtn();return}
 if(READ.state==="paused"){READ.state="playing";updReadBtn();speakFrom(READ.i);return}
 try{speechSynthesis.cancel()}catch(e){}
 READ.texts=[NEWS.cur.title,...(NEWS.cur.paragraphs||[])];READ.state="playing";updReadBtn();speakFrom(0)}
function stopReading(){READ.state="idle";READ.tok++;try{speechSynthesis.cancel()}catch(e){}updReadBtn();hlPara(null)}
function updReadBtn(){const b=$("#readAll"),st=$("#readStop");if(b)b.innerHTML=READ.state==="playing"?'<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>Pausar':READ.state==="paused"?'<svg viewBox="0 0 24 24"><path d="M7 5l12 7-12 7z"/></svg>Continuar':SPK_SVG+"Ouvir a notícia";
 if(st)st.hidden=READ.state==="idle"}

/* sub-abas */
function setNS(v){$$("#newsSeg button").forEach(b=>{const on=b.dataset.ns===v;b.classList.toggle("on",on);b.setAttribute("aria-selected",on)});
 ["read","cal","favs"].forEach(k=>$("#ns-"+k).hidden=k!==v);if(v==="cal")renderCal();if(v==="favs")renderFavs();
 try{localStorage.setItem(KEY+".ns",v)}catch(e){}}
$$("#newsSeg button").forEach(b=>b.addEventListener("click",()=>setNS(b.dataset.ns)));
document.addEventListener("click",e=>{const g=e.target.closest("[data-ns-go]");if(g){setNS(g.dataset.nsGo);window.scrollTo(0,0)}});

/* notícia */
function newsMsg(){const m={loading:["Carregando a notícia…","Só um instante."],
 slow:["A notícia está demorando","Verifique a conexão. Ela aparece aqui assim que chegar."],
 nodb:["Notícias indisponíveis aqui","A notícia diária, o calendário e a sincronização funcionam quando o app é aberto no Claude, com a sua conta. O resto do app funciona normalmente."],
 empty:["Ainda não há notícias","A notícia do dia é publicada toda manhã, por volta das 6h50."],
 error:["Não consegui carregar as notícias","Tente reabrir o app daqui a pouco."]}[NEWS.state]||["",""];
 return`<div class="card stack emptynews"><span class="label">Notícia do dia</span><h3>${m[0]}</h3><p class="muted small">${m[1]}</p></div>`}
function renderNews(){const box=$("#newsBox"),n=NEWS.cur;NEWS.rendered=n;
 if(!n){box.innerHTML=newsMsg();$("#quizBox").innerHTML="";return}
 const d=n.date,isLatest=NEWS.latest&&NEWS.latest.date===d;
 const srcs=(n.sources||[]).filter(s=>s&&s.url).map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name||s.url)}</a>`).join(", ");
 const paras=(n.paragraphs||[]).map((p,i)=>`<p class="npara">${tok(p,i)}</p>${n.paragraphsPt&&n.paragraphsPt[i]?`<p class="ptpara" hidden>${esc(n.paragraphsPt[i])}</p>`:""}`).join("");
 box.innerHTML=`<article class="news">
  <div class="row" style="justify-content:space-between"><span class="label">${d===today()?"Notícia de hoje":"Notícia de "+fmtBR(d)}${n.topic?" · "+esc(n.topic):""}</span><span class="cefr">${esc(n.level||"A2")}</span></div>
  <h2 class="ntitle">${tok(n.title||"",-1)}</h2>
  ${n.titlePt?`<p class="ptpara" hidden>${esc(n.titlePt)}</p>`:""}
  <div class="row">${canSpeak?`<button class="btn" id="readAll"></button><button class="btn ghost" id="readStop" hidden><svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="1"/></svg>Parar</button>`:""}<button class="btn ghost" id="togglePt" aria-pressed="false">Mostrar tradução</button>${!isLatest&&NEWS.latest?`<button class="btn ghost" id="toLatest">Ir para a mais recente</button>`:""}</div>
  <p class="hint">Toque numa palavra para ouvir a pronúncia e ver significado, sinônimos e exemplo. Com a estrela, ela vai para a sua revisão.</p>
  ${paras}
  ${srcs?`<p class="src">Texto adaptado para o nível ${esc(n.level||"A2")} a partir de: ${srcs}</p>`:""}
 </article>`;
 updReadBtn();
 if($("#readAll"))$("#readAll").onclick=readAll;if($("#readStop"))$("#readStop").onclick=stopReading;
 $("#togglePt").onclick=e=>{const on=e.currentTarget.getAttribute("aria-pressed")!=="true";e.currentTarget.setAttribute("aria-pressed",on);e.currentTarget.textContent=on?"Esconder tradução":"Mostrar tradução";$$("#newsBox .ptpara").forEach(p=>p.hidden=!on)};
 if($("#toLatest"))$("#toLatest").onclick=()=>openDate(NEWS.latest.date);
 renderQuiz()}
$("#newsBox").addEventListener("click",e=>{const b=e.target.closest("button.w");if(b)openWord(b)});

async function openDate(d){if(READ.state!=="idle")stopReading();
 NEWS.curDate=d;setNS("read");window.scrollTo(0,0);
 if(NEWS.cache[d]){NEWS.cur=NEWS.cache[d];renderNews();return}
 NEWS.cur=null;$("#newsBox").innerHTML=`<div class="card"><p class="muted">Carregando a notícia de ${fmtBR(d)}…</p></div>`;$("#quizBox").innerHTML="";
 try{const s=await DB.doc("news/"+d).get();if(NEWS.curDate!==d)return;
  if(s.exists){const n=clone(s.data());n.date=n.date||d;NEWS.cache[d]=n;NEWS.cur=n;renderNews()}
  else $("#newsBox").innerHTML=`<div class="card"><p class="muted">Não há notícia salva para ${fmtBR(d)}.</p></div>`}
 catch(e){$("#newsBox").innerHTML=`<div class="card"><p class="muted">Não consegui abrir essa notícia agora. Tente de novo em instantes.</p></div>`}}

/* painel da palavra */
let SH=null,SAMPLE_P=null;
function openWord(btn){$$("button.w.on").forEach(x=>x.classList.remove("on"));btn.classList.add("on");
 const k=btn.dataset.w,pi=+btn.dataset.p,surface=btn.textContent,n=NEWS.cur;
 const para=pi>=0?(n.paragraphs||[])[pi]||"":n.title||"";
 SH={k,surface,sentence:findSentence(para,surface),entry:gloss(k)||localEntry(k),btn};
 renderSheet();showSheet(true);speak(surface)}
function showSheet(on){$("#sheet").hidden=!on;$("#sheetBack").hidden=!on;
 if(on){setTimeout(()=>$("#shClose").focus({preventScroll:true}),0)}else{$$("button.w.on").forEach(x=>x.classList.remove("on"));if(SH&&SH.btn)SH.btn.focus({preventScroll:true})}}
function renderSheet(){const e=SH.entry,fk=e?favKeyOf(e,SH.k):null,isFav=!!(fk&&S.favs[fk]);
 $("#shWord").textContent=SH.surface;
 const lem=e&&e.lemma&&e.lemma.toLowerCase()!==SH.surface.toLowerCase()?"forma de “"+e.lemma+"”":"";
 $("#shLemma").textContent=[lem,e&&e.pos].filter(Boolean).join(" · ");
 const fav=$("#shFav");fav.disabled=!e;fav.classList.toggle("on",isFav);fav.setAttribute("aria-pressed",isFav);
 fav.setAttribute("aria-label",isFav?"Remover das minhas palavras":"Salvar nas minhas palavras");
 $("#shSay").dataset.say=SH.surface;
 let h="";
 if(e){h+=`<div class="shmean">${esc(e.meaning||"")}</div>`;
  if(e.note)h+=`<p class="small muted">${esc(e.note)}</p>`;
  if(e.synonyms&&e.synonyms.length)h+=`<div class="stack" style="gap:6px"><span class="label">Sinônimos</span><div class="chips">${e.synonyms.map(s=>`<button class="chipb" data-say="${esc(s)}">${esc(s)}</button>`).join("")}</div></div>`;
  if(e.example)h+=`<div class="stack" style="gap:6px"><span class="label">Exemplo de uso</span><div class="exrow boxed"><div><i>${esc(e.example)}</i><span>${esc(e.examplePt||"")}</span></div>${spkBtn(e.example)}</div></div>`;
  h+=`<p class="favline small">${isFav?"★ Salva nas minhas palavras. Ela aparece nos cartões de revisão.":"Toque na estrela para revisar esta palavra nos cartões."}</p>`}
 else h+=`<p class="muted">Esta palavra não está no glossário desta notícia.</p><button class="btn primary" id="shAsk">Perguntar ao Claude</button><p class="small muted" id="shAskMsg"></p>`;
 h+=`<div class="stack" style="gap:6px"><span class="label">Na notícia</span><div class="exrow boxed"><div><i>${esc(SH.sentence)}</i></div>${spkBtn(SH.sentence)}</div></div>`;
 $("#shBody").innerHTML=h;
 if($("#shAsk"))$("#shAsk").onclick=askClaude}
$("#shClose").onclick=()=>showSheet(false);
$("#sheetBack").onclick=()=>showSheet(false);
$("#shFav").onclick=toggleFav;
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#sheet").hidden)showSheet(false)});

async function askClaude(){const b=$("#shAsk"),msg=$("#shAskMsg"),k=SH.k,surface=SH.surface,sentence=SH.sentence;b.disabled=true;b.textContent="Consultando…";msg.textContent="";
 try{if(!SAMPLE_P)SAMPLE_P=(window.claude&&typeof claude.use==="function")?claude.use("sample"):Promise.resolve(null);
  const sample=await SAMPLE_P;if(!sample)throw{code:"not_granted"};
  const r=await sample.json(`Você é um dicionário italiano–português para um estudante brasileiro de nível A2.
Palavra: "${surface}"
Frase em que aparece: "${sentence}"
Responda somente com um objeto JSON neste formato:
{"lemma":"forma de dicionário em italiano","pos":"classe gramatical em português (ex.: verbo, substantivo masculino)","meaning":"significado em português neste contexto","synonyms":["até 4 sinônimos em italiano"],"example":"uma frase nova e simples em italiano usando a palavra","examplePt":"tradução da frase","note":"se for forma flexionada, explique em português (ex.: verbo andare, passato prossimo, 3ª pessoa)"}`,{modelTier:"quick",cache:{gcTime:86400000}});
  if(!r||typeof r!=="object"||!r.meaning)throw{code:"invalid_json"};
  r.synonyms=Array.isArray(r.synonyms)?r.synonyms.map(String).slice(0,5):[];
  NEWS.extra[k]=r;if(SH&&SH.k===k){SH.entry=r;renderSheet()}refreshTokenMarks()}
 catch(e){const c=e&&e.code;b.disabled=false;b.textContent="Perguntar ao Claude";
  if(["not_granted","sampling_disabled","not_declared","capability_disabled","capability_removed"].includes(c)){b.hidden=true;msg.textContent="A consulta ao Claude não está disponível aqui."}
  else if(c==="rate_limited")msg.textContent="Muitas consultas em pouco tempo. Tente de novo em alguns minutos.";
  else if(c==="session_expired")msg.textContent="Sua sessão expirou. Entre de novo no Claude e tente outra vez.";
  else msg.textContent="Não deu certo desta vez. Toque para tentar de novo."}}

function toggleFav(){const e=SH&&SH.entry;if(!e)return;const key=favKeyOf(e,SH.k);
 if(S.favs[key]){delete S.favs[key];removeFavCard(key)}
 else{S.favs[key]={lemma:e.lemma||SH.surface,surface:SH.surface,pos:e.pos||"",meaning:e.meaning||"",synonyms:(e.synonyms||[]).slice(0,5),example:e.example||"",examplePt:e.examplePt||"",context:SH.sentence,date:NEWS.cur?NEWS.cur.date:today(),added:today()};addFavCard(key)}
 save();renderSheet();refreshTokenMarks();updateFavCount();renderDecks();renderHome()}

/* cartões das palavras salvas */
function addFavCard(k){const id="w:"+k;CARDS[id]={deck:"fav",fav:S.favs[k]};if(!ORDER.fav.includes(id))ORDER.fav.push(id)}
function removeFavCard(k){const id="w:"+k;delete CARDS[id];ORDER.fav=ORDER.fav.filter(x=>x!==id);if(SESSION)SESSION.queue=SESSION.queue.filter(x=>x!==id)}
function syncFavCards(){Object.keys(CARDS).forEach(id=>{if(id.startsWith("w:"))delete CARDS[id]});ORDER.fav=[];Object.keys(S.favs||{}).forEach(addFavCard)}
function newFavIds(){return S.settings.decks.fav?ORDER.fav.filter(id=>!S.cards[id]):[]}
function updateFavCount(){const n=Object.keys(S.favs).length;$("#favCount").textContent=n?String(n):""}

/* questionário */
const QZ={date:null,ans:{},order:{}};
function renderQuiz(){const n=NEWS.cur,box=$("#quizBox");if(!n||!Array.isArray(n.quiz)||!n.quiz.length){box.innerHTML="";return}
 if(QZ.date!==n.date){QZ.date=n.date;QZ.ans={};QZ.order={}}
 const total=n.quiz.length,answered=Object.keys(QZ.ans).length,done=S.newsDone[n.date];
 let h=`<div class="stack"><div class="row" style="justify-content:space-between"><h2>Questionário</h2><span class="chip">${answered}/${total} respondidas</span></div>`;
 if(done&&answered===0)h+=`<div class="fb ok"><b>Concluído em ${fmtBR(done.at)} · ${done.score}/${done.total}</b><span>Este dia já está marcado como lido no calendário. Você pode responder de novo para treinar.</span></div>`;
 else if(!done)h+=`<p class="muted small">Responda as ${total} perguntas para marcar o dia ${fmtBR(n.date)} como lido no calendário.</p>`;
 n.quiz.forEach((q,i)=>{const opts=q.options||[];if(!QZ.order[i])QZ.order[i]=shuffle(opts.map((_,k)=>k));const a=QZ.ans[i];
  h+=`<div class="qz"><span class="qn">Pergunta ${i+1} de ${total}</span><div class="qq">${esc(q.q)}</div><div class="opts">${QZ.order[i].map(k=>`<button class="opt${a!=null?(k===q.answer?" right":k===a?" wrong":""):""}" data-q="${i}" data-k="${k}" ${a!=null?"disabled":""}>${esc(opts[k])}</button>`).join("")}</div>${a!=null?`<div class="fb ${a===q.answer?"ok":"no"}"><b>${a===q.answer?"Certo!":"Resposta: "+esc(opts[q.answer])}</b><span>${esc(q.explanation||"")}</span></div>`:""}</div>`});
 if(answered===total){const sc=n.quiz.filter((q,i)=>QZ.ans[i]===q.answer).length;
  const msg=sc===total?"Perfeito! Você entendeu tudo.":sc>=total*.6?"Muito bem. Releia as explicações das que errou.":"Vale reler a notícia com a tradução e tentar de novo.";
  h+=`<div class="card stack"><span class="label">Resultado · ${fmtBR(n.date)} marcado como lido</span><h2>${sc}/${total}</h2><p>${msg}</p><div class="row"><button class="btn primary" data-ns-go="cal">Ver calendário</button><button class="btn" id="qzRedo">Responder de novo</button></div></div>`}
 box.innerHTML=h+"</div>";
 $$("#quizBox .opt").forEach(b=>b.onclick=()=>answerQ(+b.dataset.q,+b.dataset.k));
 if($("#qzRedo"))$("#qzRedo").onclick=()=>{QZ.ans={};QZ.order={};renderQuiz();$("#quizBox").scrollIntoView({block:"start"})}}
function answerQ(i,k){const n=NEWS.cur;if(QZ.ans[i]!=null)return;QZ.ans[i]=k;
 if(Object.keys(QZ.ans).length===n.quiz.length){const sc=n.quiz.filter((q,j)=>QZ.ans[j]===q.answer).length,prev=S.newsDone[n.date];
  S.newsDone[n.date]={score:Math.max(sc,prev?prev.score:0),total:n.quiz.length,at:prev?prev.at:today()};save();renderHome()}
 renderQuiz()}

/* calendário */
function newsStreak(){let d=new Date(),c=0;const t=fmt(d);if(!S.newsDone[t])d.setDate(d.getDate()-1);
 while(S.newsDone[fmt(d)]){c++;d.setDate(d.getDate()-1)}return c}
function renderCal(){const box=$("#calBox"),t=today(),cur=t.slice(0,7),base=NEWS.calMonth||cur,[y,m]=base.split("-").map(Number);
 const startDow=(new Date(y,m-1,1).getDay()+6)%7,dim=new Date(y,m,0).getDate();
 let cells=["seg","ter","qua","qui","sex","sáb","dom"].map(d=>`<span class="dow">${d}</span>`).join("");
 for(let i=0;i<startDow;i++)cells+="<span></span>";
 let monthNews=0,monthDone=0;
 for(let d=1;d<=dim;d++){const ds=`${y}-${pad2(m)}-${pad2(d)}`,has=!!NEWS.index[ds],dn=S.newsDone[ds];let cls="day",sub="";
  if(has)monthNews++;if(dn)monthDone++;
  if(dn){cls+=" done";sub=`${dn.score}/${dn.total}`}else if(has&&ds<t){cls+=" missed";sub="×"}else if(has){cls+=" has";sub="•"}
  if(ds===t)cls+=" today";
  cells+=`<button class="${cls}" data-day="${ds}" ${has||dn?"":"disabled"} aria-label="${d} de ${MONTHS[m-1]}${dn?", lida, "+dn.score+" de "+dn.total:has?(ds<t?", não lida":", disponível"):""}">${d}<small>${sub}</small></button>`}
 const prev=new Date(y,m-2,1),next=new Date(y,m,1),pk=fmt(prev).slice(0,7),nk=fmt(next).slice(0,7);
 box.innerHTML=`<div class="stats3"><div><b>${Object.keys(S.newsDone).length}</b><span class="small muted">notícias lidas</span></div><div><b>${newsStreak()}</b><span class="small muted">dias seguidos</span></div><div><b>${monthDone}/${monthNews}</b><span class="small muted">neste mês</span></div></div>
 <div class="calhead"><button class="iconbtn" id="calPrev" aria-label="Mês anterior"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><h3>${MONTHS[m-1][0].toUpperCase()+MONTHS[m-1].slice(1)} de ${y}</h3><button class="iconbtn" id="calNext" aria-label="Próximo mês" ${nk>cur?"disabled":""}><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button></div>
 <div class="calgrid">${cells}</div>
 <div class="legend"><span><i class="lg-done"></i>lida (acertos)</span><span><i class="lg-missed"></i>não lida</span><span><i class="lg-has"></i>disponível</span><span><i class="lg-today"></i>hoje</span></div>
 <p class="small muted">Um dia fica marcado como lido quando você termina o questionário daquela notícia. Toque num dia para abrir a notícia.</p>`;
 $("#calPrev").onclick=()=>{NEWS.calMonth=pk;renderCal()};$("#calNext").onclick=()=>{if(nk<=cur){NEWS.calMonth=nk;renderCal()}};
 $$("#calBox [data-day]").forEach(b=>b.onclick=()=>openDate(b.dataset.day))}

/* minhas palavras */
function dueLabel(id){const st=S.cards[id];if(!st)return"nova";if(st.due<=today())return"revisar hoje";const d=Math.round((new Date(st.due+"T12:00")-new Date(today()+"T12:00"))/864e5);return d===1?"amanhã":"em "+d+" dias"}
function renderFavs(){const box=$("#favBox"),keys=Object.keys(S.favs).sort((a,b)=>(S.favs[b].added||"").localeCompare(S.favs[a].added||"")||a.localeCompare(b));
 if(!keys.length){box.innerHTML=`<div class="card stack"><h3>Nenhuma palavra salva ainda</h3><p class="muted small">Na notícia, toque numa palavra e depois na estrela. Ela entra aqui e nos cartões, com revisão espaçada no estilo do Anki: Errei, Difícil, Bom ou Fácil decidem quando ela volta.</p><button class="btn" data-ns-go="read">Ir para a notícia</button></div>`;return}
 const ids=keys.map(k=>"w:"+k),dueN=ids.filter(id=>!S.cards[id]||S.cards[id].due<=today()).length;
 box.innerHTML=`<div class="card row" style="justify-content:space-between"><div><b>${keys.length} ${keys.length===1?"palavra":"palavras"}</b><div class="small muted">${dueN} para revisar hoje</div></div><button class="btn primary" id="favReview" ${dueN?"":"disabled"}>Revisar estas palavras</button></div>
 <div class="vlist">${keys.map(k=>{const f=S.favs[k];return`<div class="vrow favrow"><div class="w"><i>${esc(f.lemma)}</i><span>${esc(f.meaning)}</span>${f.synonyms&&f.synonyms.length?`<span class="syn">≈ ${esc(f.synonyms.join(", "))}</span>`:""}<span class="lvl">${dueLabel("w:"+k)}</span></div><div class="row" style="gap:6px;flex-wrap:nowrap">${spkBtn(f.lemma)}<button class="spk" data-unfav="${esc(k)}" aria-label="Remover ${esc(f.lemma)}">${X_SVG}</button></div></div>`}).join("")}</div>`;
 $$("[data-unfav]").forEach(b=>b.onclick=()=>{const k=b.dataset.unfav;delete S.favs[k];removeFavCard(k);save();renderFavs();updateFavCount();refreshTokenMarks();renderDecks();renderHome()});
 if($("#favReview"))$("#favReview").onclick=()=>{const q=shuffle(ids.filter(id=>CARDS[id]&&(!S.cards[id]||S.cards[id].due<=today())));SESSION={queue:q,total:q.length,done:0,shown:false,dirFlip:null,extra:true};showTab("cartoes")}}

/* card na tela inicial */
function renderHomeNews(){const el=$("#homeNews");if(!el)return;const n=NEWS.latest;
 if(!n){el.innerHTML=NEWS.state==="loading"?`<span class="label">Notícia do dia</span><p class="muted small">Carregando…</p>`:`<span class="label">Notícia do dia</span><p class="muted small">${NEWS.state==="nodb"?"Disponível quando o app é aberto no Claude, com a sua conta.":NEWS.state==="empty"?"A notícia do dia é publicada toda manhã, por volta das 6h50.":"Não foi possível carregar agora."}</p>`;return}
 const done=S.newsDone[n.date];
 el.innerHTML=`<div class="row" style="justify-content:space-between"><span class="label">${n.date===today()?"Notícia de hoje":"Última notícia · "+fmtBR(n.date)}</span><span class="pill ${done?"ok":"todo"}">${done?"Lida · "+done.score+"/"+done.total:"Não lida"}</span></div>
 <h3>${esc(n.title||"")}</h3>${n.titlePt?`<p class="small muted">${esc(n.titlePt)}</p>`:""}
 <div class="row"><button class="btn primary" data-goto="news">${done?"Abrir notícia":"Ler e responder"}</button></div>`}

function renderNewsAll(){renderHomeNews();updateFavCount();
 if(!$("#v-news").hidden){if(NEWS.rendered!==NEWS.cur||!NEWS.cur)renderNews();if(!$("#ns-cal").hidden)renderCal()}}

/* nuvem: notícias + sincronização do progresso */
async function initCloud(){
 if(!(window.claude&&typeof claude.use==="function")){NEWS.state="nodb";renderNewsAll();return}
 let db=null,user=null;try{[db,user]=await Promise.all([claude.use("db"),claude.use("user")])}catch(e){}
 if(!db){NEWS.state="nodb";renderNewsAll();return}
 DB=db;
 const timer=setTimeout(()=>{if(NEWS.state==="loading"){NEWS.state="slow";renderNewsAll()}},10000);
 db.collection("news").orderBy("date","desc").limit(1).onSnapshot(snap=>{
  const d=snap.docs[0];
  if(d&&d.exists){clearTimeout(timer);const n=clone(d.data());n.date=n.date||d.id;NEWS.latest=n;NEWS.cache[n.date]=n;NEWS.index[n.date]=NEWS.index[n.date]||{title:n.title};
   if(!NEWS.curDate||NEWS.curDate===n.date){NEWS.cur=n;NEWS.curDate=n.date}NEWS.state="ok"}
  else if(!snap.metadata.fromCache){clearTimeout(timer);NEWS.state="empty"}
  renderNewsAll()},()=>{clearTimeout(timer);if(!NEWS.latest)NEWS.state="error";renderNewsAll()});
 db.doc("meta/news").onSnapshot(s=>{if(s.exists){const days=(s.data()||{}).days||{};NEWS.index=Object.assign({},clone(days));if(NEWS.latest)NEWS.index[NEWS.latest.date]=NEWS.index[NEWS.latest.date]||{title:NEWS.latest.title};if(!$("#v-news").hidden&&!$("#ns-cal").hidden)renderCal()}},()=>{});
 try{UID=user?await user.id():null}catch(e){UID=null}
 if(!UID)return;
 stateRef=db.doc("data/users/"+UID+"/quaderno");
 try{const s=await stateRef.get();
  if(s.exists){const r=clone(s.data());if((r.updatedAt||0)>(S.updatedAt||0)){hydrate(r);saveLocal();rerenderAll()}else if((S.updatedAt||0)>(r.updatedAt||0))scheduleSync()}
  else if(S.updatedAt)scheduleSync()}catch(e){}}
function rerenderAll(){rollDay();syncFavCards();SESSION=null;renderDecks();renderBoxes();renderTopics();renderHome();renderNewsAll();
 if(!$("#v-cartoes").hidden)renderFlash();if(!$("#v-news").hidden){renderNews();if(!$("#ns-favs").hidden)renderFavs()}}
document.addEventListener("visibilitychange",()=>{if(document.hidden&&syncDirty){clearTimeout(syncT);flushSync()}});
