/* ============================ PREFERITI (palavras e frases salvas) ============================ */
// Usa o mesmo motor dos cartões: cada favorito é um cartão "w:<chave>" (S.favs) ou "s:<hash>" (S.sents, frase com lacuna).
// Campos de um favorito em S.favs: lemma (it), meaning (pt), tipo ("palavra" | "frase"), origem ("noticia:<data>" | "curso:<tópico>"), added (criado em),
// own (tradução digitada pelo usuário), auto (tradução palavra por palavra). Favoritos antigos, sem tipo, valem como "palavra".
function origemOf(btn){if(!btn||!document.contains(btn))return"";if(btn.closest("#newsBox")&&NEWS.cur)return"noticia:"+NEWS.cur.date;if(btn.closest("#v-curso")&&CUR)return"curso:"+CUR.id;return""}
function origemLabel(o){if(!o)return"";const i=o.indexOf(":"),t=o.slice(0,i),id=o.slice(i+1);if(t==="noticia")return"notícia de "+fmtBR(id);if(t==="curso"&&TOPIC[id])return TOPIC[id].lvl+" · "+TOPIC[id].t;return""}

/* ---------- palavra sem tradução cadastrada: salva com a tradução do usuário ---------- */
function saveOwn(v){v=String(v||"").trim();if(!v||!SH)return;const k=SH.k;
 S.favs[k]={lemma:k,surface:SH.surface,pos:"",meaning:v,synonyms:[],example:"",examplePt:"",context:SH.sentence,date:today(),added:today(),tipo:"palavra",origem:origemOf(SH.btn),own:true};
 addFavCard(k);save();SH.entry={lemma:k,meaning:v,pos:"",own:true};SH.src="own";renderSheet();updateFavCount();renderDecks();renderHome()}

/* ---------- trecho: da primeira à última palavra tocada ---------- */
let RANGE=null;
function rangeBlock(b){return b.closest("p,li,td,h2,h3,.exi,.q,.qq,.fb")||b.closest(".it")||b.parentElement}
function canRange(b){return!!(b&&document.contains(b)&&!b.closest("#sheet")&&rangeBlock(b).querySelectorAll("button.w").length>1)}
function rangeBar(msg){let el=$("#rangeBar");if(!el){el=document.createElement("div");el.id="rangeBar";el.className="rangebar";el.setAttribute("role","status");document.body.appendChild(el)}
 el.innerHTML=`<span>${esc(msg)}</span><button class="btn small" id="rangeCancel">Cancelar</button>`;el.hidden=false;$("#rangeCancel").onclick=cancelRange}
function clearRangeMarks(){$$("button.w.rsel").forEach(x=>x.classList.remove("rsel"))}
function startRange(btn){if(!canRange(btn))return;showSheet(false);RANGE={start:btn,block:rangeBlock(btn)};btn.classList.add("rsel");rangeBar("Agora toque na última palavra do trecho.")}
function cancelRange(){RANGE=null;clearRangeMarks();const el=$("#rangeBar");if(el)el.hidden=true}
function finishRange(btn){const R=RANGE;if(!R||!document.contains(R.start)){cancelRange();return false}
 if(!R.block.contains(btn)){rangeBar("Toque numa palavra do mesmo parágrafo.");return true}
 const ws=[...R.block.querySelectorAll("button.w")],i=ws.indexOf(R.start),j=ws.indexOf(btn);
 if(i===j){cancelRange();return false}
 const a=Math.min(i,j),b=Math.max(i,j),r=document.createRange();r.setStartBefore(ws[a]);r.setEndAfter(ws[b]);
 const text=r.toString().replace(/\s+/g," ").trim(),words=ws.slice(a,b+1);
 cancelRange();words.forEach(x=>x.classList.add("rsel"));
 SH={mode:"phrase",k:text.toLowerCase(),surface:text,words,sentence:((ws[a].closest(".it")||R.block).textContent||"").replace(/\s+/g," ").trim(),btn:ws[a],entry:null,src:"phrase"};
 renderSheet();showSheet(true);words.forEach(x=>x.classList.add("rsel"));speak(text);return true}
function phraseGloss(){return SH.words.map(b=>{const k=b.dataset.w,g=b.closest("#newsBox")?gloss(k):null,e=g||lookupLocal(k,b.textContent.toLowerCase());
 return{w:b.textContent,m:e&&e.meaning?String(e.meaning).split(/[;,]/)[0].trim():""}})}
function renderPhrase(){const fav=S.favs[SH.k],gl=phraseGloss(),star=$("#shFav");
 $("#shWord").textContent=SH.surface;$("#shLemma").textContent="trecho · "+SH.words.length+" palavras";$("#shSay").dataset.say=SH.surface;
 star.disabled=false;star.classList.toggle("on",!!fav);star.setAttribute("aria-pressed",!!fav);star.setAttribute("aria-label",fav?"Remover de Preferiti":"Salvar em Preferiti");
 let h=fav?`<div class="shmean">${esc(fav.meaning)}</div>${fav.auto?`<p class="small muted">Tradução palavra por palavra.</p>`:""}`:"";
 h+=`<div class="stack" style="gap:6px"><span class="label">Palavra por palavra</span><div class="glossl">${gl.map(x=>`<span><b>${esc(x.w)}</b><em>${esc(x.m||"—")}</em></span>`).join("")}</div></div>`;
 if(fav)h+=`<p class="favline small">★ Frase salva em Preferiti. Ela aparece nos cartões de revisão.</p><button class="btn small ghost" id="shPhDel">Remover de Preferiti</button>`;
 else h+=`<form class="stack" id="shPhF" style="gap:8px"><label class="small" for="shOwn">Sua tradução (opcional). Em branco, fica a tradução palavra por palavra.</label><input type="text" id="shOwn" autocomplete="off" placeholder="Tradução da frase"><button class="btn primary" type="submit">☆ Salvar frase em Preferiti</button><p class="small warnt" id="shPhMsg" role="status"></p></form>`;
 $("#shBody").innerHTML=h;
 if($("#shPhF"))$("#shPhF").onsubmit=ev=>{ev.preventDefault();savePhrase()};
 if($("#shPhDel"))$("#shPhDel").onclick=removePhrase}
function savePhrase(){const typed=(($("#shOwn")||{}).value||"").trim(),auto=phraseGloss().filter(x=>x.m).map(x=>x.m).join(" · "),meaning=typed||auto;
 if(!meaning){const m=$("#shPhMsg");if(m)m.textContent="Não há tradução cadastrada para estas palavras. Escreva a sua tradução para salvar.";return}
 S.favs[SH.k]={lemma:SH.surface,surface:SH.surface,pos:"frase",meaning,synonyms:[],example:"",examplePt:"",context:SH.sentence,date:today(),added:today(),tipo:"frase",origem:origemOf(SH.btn),auto:!typed};
 addFavCard(SH.k);save();renderSheet();updateFavCount();renderDecks();renderHome()}
function removePhrase(){delete S.favs[SH.k];removeFavCard(SH.k);save();renderSheet();updateFavCount();renderDecks();renderHome()}

/* ---------- lista ---------- */
const PREF={q:"",st:"all"};
const PREF_ST={novo:"novo",aprendendo:"aprendendo",revisao:"em revisão"};
function prefState(id){const st=S.cards[id];if(!st)return"novo";return ivlOf(st)<8?"aprendendo":"revisao"}
function prefDue(id){const st=S.cards[id];return!st||st.due<=today()}
function dueLabel(id){const st=S.cards[id];if(!st)return"ainda não revisado";if(st.due<=today())return"revisar hoje";const d=Math.round((new Date(st.due+"T12:00")-new Date(today()+"T12:00"))/864e5);return d===1?"volta amanhã":"volta em "+d+" dias"}
function prefItems(){const out=[];
 Object.keys(S.favs||{}).forEach(k=>{const f=S.favs[k];out.push({id:"w:"+k,key:k,kind:"fav",it:f.lemma,pt:f.meaning+(f.auto?" (palavra por palavra)":""),tipo:f.tipo==="frase"?"frase":"palavra",added:f.added||f.date||"",origem:origemLabel(f.origem),say:f.lemma})});
 Object.keys(S.sents||{}).forEach(id=>{const e=S.sents[id];out.push({id,key:id,kind:"sent",it:e.s,pt:"lacuna em “"+e.w+"”"+(e.m?" = "+e.m:""),tipo:"frase",added:e.d||"",origem:"",say:e.s})});
 return out.filter(x=>CARDS[x.id]).sort((a,b)=>b.added.localeCompare(a.added)||a.it.localeCompare(b.it))}
function prefDueIds(){return prefItems().filter(x=>prefDue(x.id)).map(x=>x.id)}
function prefReview(){const q=shuffle(prefDueIds());if(!q.length)return;SESSION={queue:q,total:q.length,done:0,shown:false,dirFlip:null,extra:true};showTab("cartoes")}
function prefRemove(x){if(x.kind==="fav"){delete S.favs[x.key];removeFavCard(x.key)}else{delete S.sents[x.key];delete CARDS[x.key];ORDER.frase=ORDER.frase.filter(i=>i!==x.key);if(SESSION)SESSION.queue=SESSION.queue.filter(i=>i!==x.key)}
 delete S.cards[x.id];save();renderFavs();updateFavCount();refreshTokenMarks();renderDecks();renderHome()}
function updateFavCount(){const el=$("#favCount");if(!el)return;const n=prefItems().length;el.textContent=n+(n===1?" salvo":" salvos")}
function renderFavs(){const box=$("#favBox");if(!box)return;const all=prefItems();updateFavCount();
 if(!all.length){box.innerHTML=`<div class="card stack"><h3>Nada salvo ainda</h3><p class="muted small">Em qualquer texto italiano do app, toque numa palavra e depois na estrela. Para salvar uma frase, toque na primeira palavra, escolha “Marcar um trecho” e toque na última. Tudo o que você salva entra aqui e nos cartões, com revisão espaçada: Errei, Difícil, Bom ou Fácil decidem quando o item volta.</p><div class="row"><button class="btn primary" data-goto="news">Ir para a notícia</button><button class="btn" data-goto="curso">Ir para o curso</button></div></div>`;return}
 const dueN=all.filter(x=>prefDue(x.id)).length,cnt={all:all.length,novo:0,aprendendo:0,revisao:0};all.forEach(x=>cnt[prefState(x.id)]++);
 box.innerHTML=`<div class="card row" style="justify-content:space-between"><div><b>${all.length} ${all.length===1?"item salvo":"itens salvos"}</b><div class="small muted">${dueN?dueN+" para revisar hoje":"nada para revisar hoje"}</div></div><button class="btn primary" id="favReview" ${dueN?"":"disabled"}>Revisar hoje (${dueN})</button></div>
 <input type="search" id="prefQ" class="prefq" placeholder="Buscar em italiano ou português" aria-label="Buscar nos favoritos" value="${esc(PREF.q)}" autocomplete="off">
 <div class="gnav" id="prefSt" role="tablist" aria-label="Filtrar por estado">${[["all","Todos"],["novo","Novos"],["aprendendo","Aprendendo"],["revisao","Em revisão"]].map(([k,n])=>`<button role="tab" data-pst="${k}" class="${PREF.st===k?"on":""}" aria-selected="${PREF.st===k}">${n} · ${cnt[k]}</button>`).join("")}</div>
 <div id="prefList"></div>
 <p class="small muted">Novo: ainda não revisado. Aprendendo: volta em menos de 8 dias. Em revisão: já volta com 8 dias ou mais de intervalo.</p>`;
 $("#favReview").onclick=prefReview;
 $("#prefQ").oninput=e=>{PREF.q=e.target.value;renderPrefList(all)};
 $$("#prefSt [data-pst]").forEach(b=>b.onclick=()=>{PREF.st=b.dataset.pst;renderFavs()});
 renderPrefList(all)}
function renderPrefList(all){const box=$("#prefList");if(!box)return;const q=norm(PREF.q||"");
 const items=all.filter(x=>(PREF.st==="all"||prefState(x.id)===PREF.st)&&(!q||norm(x.it).includes(q)||norm(x.pt).includes(q)));
 if(!items.length){box.innerHTML=`<div class="card"><p class="muted small">Nenhum item ${q?"com essa busca":"neste estado"}.</p></div>`;return}
 box.innerHTML=`<div class="vlist">${items.map((x,i)=>{const st=prefState(x.id);return`<div class="vrow favrow"><div class="w"><i>${esc(x.it)}</i><span>${esc(x.pt)}</span><span class="prefmeta"><em class="lvl st-${st}">${PREF_ST[st]}</em><em class="lvl">${x.tipo}</em><em class="lvl">${dueLabel(x.id)}</em>${x.origem?`<em class="lvl">${esc(x.origem)}</em>`:""}</span></div><div class="row" style="gap:6px;flex-wrap:nowrap">${spkBtn(x.say)}<button class="spk" data-unfav="${i}" aria-label="Remover ${esc(x.it)}">${X_SVG}</button></div></div>`}).join("")}</div>`;
 $$("#prefList [data-unfav]").forEach(b=>b.onclick=()=>prefRemove(items[+b.dataset.unfav]))}
function renderHomePref(){const el=$("#homePref");if(!el)return;const all=prefItems(),dueN=all.filter(x=>prefDue(x.id)).length;
 el.innerHTML=`<span class="label">Preferiti · ${all.length} ${all.length===1?"salvo":"salvos"}</span><p class="small muted">${all.length?"Palavras e frases que você guardou com a estrela.":"Toque numa palavra italiana e na estrela para guardar aqui."}</p><div class="row">${dueN?`<button class="btn" id="homePrefGo">Revisar hoje (${dueN})</button>`:`<button class="btn" data-goto="preferiti">Abrir Preferiti</button>`}</div>`;
 if($("#homePrefGo"))$("#homePrefGo").onclick=prefReview}
