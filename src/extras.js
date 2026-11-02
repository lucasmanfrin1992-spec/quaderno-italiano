/* ============================ TÉCNICAS EXTRAS ============================ */
/* ---------- utilidades ---------- */
const toks=s=>(String(s).match(new RegExp("["+LET+"']+","g"))||[]).map(w=>norm(w.replace(/'$/,"")));
function wordDiff(orig,user){const u=toks(user),pool=u.slice();let ok=0;const ws=String(orig).split(/(\s+)/);
 const html=ws.map(w=>{if(/^\s+$/.test(w)||!w)return w;const core=(w.match(new RegExp("["+LET+"']+"))||[""])[0];if(!core)return esc(w);const k=norm(core.replace(/'$/,""));const ix=pool.indexOf(k);
  if(ix>=0){pool.splice(ix,1);ok++;return`<span class="dok">${esc(w)}</span>`}return`<span class="dmiss">${esc(w)}</span>`}).join("");
 const total=toks(orig).length||1;return{html,score:Math.round(ok/total*100),extra:pool}}
/* ---------- 1. Histórias ---------- */
COURSE.forEach(t=>{const st=STORIES[t.id];if(!st)return;st.p.forEach(l=>{SENT.push(l);if(LSENT[t.id])LSENT[t.id].push(l)})});
function renderStory(body){const t=CUR,st=STORIES[t.id],c=S.course[t.id]=S.course[t.id]||{};if(!st){body.innerHTML="<p class='muted'>Sem história para este tópico.</p>";return}
 const ans=(STQ[t.id]=STQ[t.id]||{ans:{},ord:{}});
 body.innerHTML=`<div class="card stack story"><span class="label">Mini-história · personagens do curso</span><h3>${esc(st.t)}</h3>
  <div class="row">${canSpeak?`<button class="btn" id="stRead">${SPK_SVG}Ouvir a história</button>`:""}<button class="btn ghost" id="stPt" aria-pressed="false">Mostrar tradução</button></div>
  <div class="stlines">${st.p.map(l=>`<p class="stl"><span class="it">${esc(l[0])}</span><span class="stpt" hidden>${esc(l[1])}</span></p>`).join("")}</div>
  <p class="hint">Leia sem a tradução primeiro. Toque numa palavra para ver o significado; no painel, “Salvar a frase” cria um cartão com a frase inteira.</p></div>
 <div class="stack" id="stQ"></div><button class="btn primary" data-part-go="ex">Ir para os exercícios →</button>`;
 $("#stPt").onclick=e=>{const on=e.currentTarget.getAttribute("aria-pressed")!=="true";e.currentTarget.setAttribute("aria-pressed",on);e.currentTarget.textContent=on?"Esconder tradução":"Mostrar tradução";$$("#cBody .stpt").forEach(x=>x.hidden=!on)};
 if($("#stRead"))$("#stRead").onclick=()=>readLines(st.p.map(l=>l[0]),$$("#cBody .stl"));
 renderStoryQ(t,st,ans)}
const STQ={};
function renderStoryQ(t,st,ans){const box=$("#stQ"),n=st.q.length,done=Object.keys(ans.ans).length;
 let h=`<div class="row" style="justify-content:space-between"><h3>Perguntas rápidas</h3><span class="chip">${done}/${n}</span></div><p class="small muted">Respostas curtas, como numa conversa: sim ou não, isto ou aquilo.</p>`;
 st.q.forEach((q,i)=>{const opts=q[1].split("|");if(!ans.ord[i])ans.ord[i]=shuffle(opts.map((_,k)=>k));const a=ans.ans[i];
  h+=`<div class="qz"><span class="qn">${i+1} de ${n}</span><div class="qq it">${esc(q[0])}</div><div class="opts">${ans.ord[i].map(k=>`<button class="opt${a!=null?(k===0?" right":k===a?" wrong":""):""}" data-sq="${i}" data-k="${k}" ${a!=null?"disabled":""}>${esc(opts[k])}</button>`).join("")}</div></div>`});
 if(done===n){const sc=st.q.filter((q,i)=>ans.ans[i]===0).length;h+=`<div class="fb ${sc>=4?"ok":"no"}"><b>${sc}/${n} certas.</b><span>${sc===n?"Você entendeu a história inteira.":"Releia a história com a tradução e tente de novo."}</span></div><button class="btn" id="stRedo">Responder de novo</button>`}
 box.innerHTML=h;tokenize(box);
 $$("#stQ [data-sq]").forEach(b=>b.onclick=()=>{const i=+b.dataset.sq,k=+b.dataset.k;ans.ans[i]=k;const q=st.q[i];recordCat("voc",k===0);
  if(k!==0)addErrCard({type:"m",q:q[0],a:q[1].split("|")[0],exp:"Mini-história: "+st.t,tp:t.id,opts:[]});
  if(Object.keys(ans.ans).length===n){const c=S.course[t.id]=S.course[t.id]||{};c.hist=1}save();renderStoryQ(t,st,ans)});
 if($("#stRedo"))$("#stRedo").onclick=()=>{STQ[t.id]={ans:{},ord:{}};renderStoryQ(t,st,STQ[t.id])}}
let RL={tok:0};
function readLines(lines,els){if(!canSpeak)return;const tok=++RL.tok;let i=0;try{speechSynthesis.cancel()}catch(e){}
 const next=()=>{els.forEach(e=>e.classList.remove("reading"));if(tok!==RL.tok||i>=lines.length)return;const el=els[i];if(el)el.classList.add("reading");
  const u=new SpeechSynthesisUtterance(lines[i]);u.lang="it-IT";u.rate=.85;u.onend=()=>{if(tok!==RL.tok)return;i++;setTimeout(next,350)};u.onerror=()=>{};speechSynthesis.speak(u)};next()}
/* ---------- 2. Cartões de frase ---------- */
DECKS.frase="Minhas frases";ORDER.frase=[];
function sentCardId(s,w){return"s:"+hashStr(s+"|"+w)}
function blankWord(s,w){const re=new RegExp("(^|[^"+LET+"])("+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")(?=[^"+LET+"]|$)","i");return re.test(s)?s.replace(re,"$1___"):s}
function saveSentence(sentence,word,meaning){S.sents=S.sents||{};const id=sentCardId(sentence,word);if(S.sents[id]){delete S.sents[id];delete CARDS[id];ORDER.frase=ORDER.frase.filter(x=>x!==id);save();return false}
 S.sents[id]={s:sentence,w:word,m:meaning||"",d:today()};addSentCard(id);save();return true}
function addSentCard(id){const e=S.sents[id];CARDS[id]={deck:"frase",sent:e};if(!ORDER.frase.includes(id))ORDER.frase.push(id)}
function syncSentCards(){Object.keys(CARDS).forEach(id=>{if(id.startsWith("s:"))delete CARDS[id]});ORDER.frase=[];Object.keys(S.sents||{}).forEach(addSentCard)}
function newSentIds(){return S.settings.decks.frase!==false?ORDER.frase.filter(id=>!S.cards[id]).slice(0,15):[]}
/* ---------- 3. Digitar a resposta ---------- */
function typeAnswers(back){const raw=String(back).replace(/\s*\(.*?\)\s*/g," ").split(/\s*\/\s*|\s+ou\s+/).map(x=>x.trim()).filter(Boolean);const out=new Set();
 raw.forEach(a=>{out.add(norm(a));out.add(norm(a.replace(ARTRE,"")));out.add(norm(a.replace(/[!?.,]/g,"")))});return[...out]}
function canType(f,c){return S.settings.typing&&(c.deck==="frase"||c.deck==="err"&&c.err&&/___/.test(c.err.f)||!!c.v&&!f.sayFront||c.deck==="verb")}
/* ---------- 4. Revisão espaçada de tópicos ---------- */
const REV_INT=[3,10,30];
function revInit(tid){const c=S.course[tid];if(c&&c.best>=70&&!c.rev)c.rev={step:0,due:addDays(REV_INT[0])}}
function revDue(){const t=today();return COURSE.filter(x=>{const c=S.course[x.id];return c&&c.rev&&!c.rev.done&&c.rev.due<=t})}
function revAfter(tid,pct){const c=S.course[tid];if(!c)return;if(!c.rev)c.rev={step:0,due:today()};
 if(pct>=70){c.rev.step++;if(c.rev.step>=REV_INT.length){c.rev.done=true;c.rev.due=null}else c.rev.due=addDays(REV_INT[c.rev.step])}else c.rev.due=addDays(2)}
function buildReviewQs(t){const L=listenQs(t.id,2);return shuffle([...authQs(t,4+(2-L.length)),...genQs(t.id,4),...L]).map(q=>{if(q.opts)q.opts=shuffle(q.opts);return q})}
function startReview(tid){showTab("curso");openTopic(tid,"ex");RUN={topic:tid,qs:buildReviewQs(TOPIC[tid]),i:0,score:0,wrong:[],review:true};renderQ()}
function renderHomeReview(){const el=$("#homeReview");if(!el)return;const due=revDue();if(!due.length){el.hidden=true;return}el.hidden=false;
 el.innerHTML=`<div class="row" style="justify-content:space-between"><span class="label">Revisão de tópicos</span><span class="pill todo">${due.length}</span></div><p class="small muted">Tópicos concluídos voltam depois de 3, 10 e 30 dias para não serem esquecidos. Rodadas de 10 questões.</p><div class="stack" style="gap:6px">${due.slice(0,3).map(t=>{const c=S.course[t.id];return`<button class="goal" data-rev="${t.id}"><span class="gchk">${c.rev.step+1}</span><span><b>${esc(t.t)}</b><small>${t.lvl} · tópico ${t.n} · revisão ${c.rev.step+1} de 3</small></span></button>`}).join("")}</div>`;
 $$("[data-rev]").forEach(b=>b.onclick=()=>startReview(b.dataset.rev))}
/* ---------- 5. Mapa dos erros ---------- */
const CATS={art:"Artigos",plur:"Plural e gênero",adj:"Concordância de adjetivos",pres:"Presente regular",irr:"Verbos irregulares",mod:"Potere, volere, dovere",prep:"Preposições",poss:"Possessivos",rifl:"Reflexivos e piacere",pp:"Particípio passado",aux:"Avere ou essere",pron:"Pronomes, ci e ne",imp:"Imperfetto",fut:"Futuro",cond:"Condizionale",impv:"Imperativo",comp:"Comparativos e advérbios",voc:"Vocabulário",list:"Escuta"};
const GEN_CAT={essere:"irr",avere:"irr",art:"art",artind:"art",plur:"plur",adj:"adj",pres:"pres",presirr:"irr",mod:"mod",cesono:"irr",prepsimple:"prep",prep:"prep",poss:"poss",rifl:"rifl",ger:"pres",pp:"pp",aux:"aux",ppess:"aux",dir:"pron",ind:"pron",imp:"imp",fut:"fut",cond:"cond",impv:"impv",volerci:"pron",si:"pron",adv:"comp",compar:"comp"};
const TOPIC_CAT={"a1-1":"irr","a1-2":"art","a1-3":"adj","a1-4":"pres","a1-5":"irr","a1-6":"mod","a1-7":"prep","a1-8":"prep","a1-9":"poss","a1-10":"rifl","a2-1":"pp","a2-2":"aux","a2-3":"pron","a2-4":"pron","a2-5":"imp","a2-6":"fut","a2-7":"pron","a2-8":"impv","a2-9":"comp","a2-10":"cond"};
function qCat(q){if(q.cat)return q.cat;if(q.g&&GEN_CAT[q.g])return GEN_CAT[q.g];if(q.voc)return"voc";if(q.type==="lf"||q.type==="lm")return"list";
 const s=((q.hint||"")+" "+(q.exp||"")).toLowerCase();
 if(/preposi|\b(di|a|da|in|su) \+ (il|lo|la|l'|i|gli|le)\b/.test(s))return"prep";if(/\bartigo\b/.test(s))return"art";if(/possessiv|parente/.test(s))return"poss";if(/plural/.test(s)&&!/feminino plural|masculino plural/.test(s))return"plur";
 return TOPIC_CAT[q.tp]||"voc"}
function recordCat(cat,ok){S.estat=S.estat||{};const e=S.estat[cat]=S.estat[cat]||{a:0,w:0};e.a++;if(!ok){e.w++;e.l=today()}}
function weakCats(){const st=S.estat||{};return Object.entries(st).filter(([k,v])=>v.a>=5&&v.w>0).map(([k,v])=>({k,acc:Math.round((v.a-v.w)/v.a*100),w:v.w,a:v.a})).sort((x,y)=>x.acc-y.acc||y.w-x.w)}
function renderHomeWeak(){const el=$("#homeWeak");if(!el)return;const ws=weakCats();if(!ws.length){el.hidden=true;return}el.hidden=false;const w=ws[0];
 el.innerHTML=`<div class="row" style="justify-content:space-between"><span class="label">Seu ponto fraco</span><button class="btn ghost small" id="weakMap">Ver mapa</button></div><h3>${esc(CATS[w.k]||w.k)}</h3><p class="small muted">${w.acc}% de acerto em ${w.a} questões. Uma rodada de 10 questões só deste tipo ajuda a fixar.</p><div class="sclb"><i style="width:${w.acc}%;background:${w.acc<60?"var(--bad)":"var(--saffron)"}"></i></div><div class="row"><button class="btn primary" id="weakGo">Treinar ${esc(CATS[w.k]||w.k)}</button></div><div id="weakAll" hidden></div>`;
 $("#weakGo").onclick=()=>startFocus(w.k);
 $("#weakMap").onclick=()=>{const box=$("#weakAll");box.hidden=!box.hidden;if(!box.hidden){const all=Object.entries(S.estat||{}).filter(([k,v])=>v.a>=3).map(([k,v])=>({k,acc:Math.round((v.a-v.w)/v.a*100),a:v.a})).sort((x,y)=>x.acc-y.acc);
  box.innerHTML=`<div class="tres">${all.map(c=>`<button class="tr trb" data-focus="${c.k}"><span>${esc(CATS[c.k]||c.k)}</span><span class="sclb"><i style="width:${c.acc}%;${c.acc<60?"background:var(--bad)":c.acc>=85?"background:var(--ok)":""}"></i></span><b>${c.acc}%</b></button>`).join("")}</div><p class="small muted">Toque num tipo para treinar só ele.</p>`;$$("[data-focus]").forEach(b=>b.onclick=()=>startFocus(b.dataset.focus))}}}
function focusQs(cat){const tids=COURSE.filter(t=>opened(t.id)).map(t=>t.id);const pool=tids.length?tids:["a1-1"];let qs=[];
 const gens=Object.keys(GEN_CAT).filter(g=>GEN_CAT[g]===cat);
 if(cat==="voc")pool.forEach(id=>qs.push(...vocQs(TOPIC[id],2)));
 else if(cat==="list")pool.forEach(id=>qs.push(...listenQs(id,1)));
 else{for(let i=0;i<14&&gens.length;i++){const g=gens[i%gens.length],q=GEN[g]();if(q){q.g=g;q.tp=pool[0];qs.push(q)}}
  pool.forEach(id=>TOPIC[id].ex.forEach(e=>{const q=e[0]==="f"?{type:"f",q:e[1],a:e[2],hint:e[3],exp:e[4],tp:id}:{type:e[0],q:e[1],opts:e[2].split("|"),a:e[2].split("|")[0],exp:e[3],tp:id};if(qCat(q)===cat)qs.push(q)}))}
 const seen=new Set();qs=shuffle(qs).filter(q=>{const k=q.q||q.say;if(seen.has(k))return false;seen.add(k);return true}).slice(0,10);return qs.map(q=>{if(q.opts)q.opts=shuffle(q.opts);return q})}
function startFocus(cat){const qs=focusQs(cat);if(!qs.length)return;showTab("curso");CUR=null;TEST=null;$("#cHome").hidden=true;$("#cTopic").hidden=false;
 $("#cTopic").innerHTML=`<button class="back" id="cBack">← Curso</button><div class="tophead"><span class="label">Treino focado</span><h2>${esc(CATS[cat]||cat)}</h2><p class="muted small">10 questões só deste tipo, dos tópicos que você já abriu.</p></div><div id="cBody" class="stack" style="gap:18px"></div>`;
 $("#cBack").onclick=()=>{RUN=null;closeTopic()};RUN={focus:cat,qs,i:0,score:0,wrong:[]};renderQ()}
function endFocus(){const r=RUN,n=r.qs.length,pct=Math.round(r.score/n*100);logInc("e");save();
 $("#cBody").innerHTML=`<div class="card stack"><span class="label">Treino focado · ${esc(CATS[r.focus]||r.focus)}</span><h2>${r.score}/${n} · ${pct}%</h2><p>${pct>=80?"Muito bem. Esse ponto está ficando firme.":"Continue treinando; os erros foram para “Meus erros” nos cartões."}</p><div class="row"><button class="btn primary" id="fAgain">Mais 10</button><button class="btn" id="fBack">Voltar ao início</button></div></div>`;
 const cat=r.focus;RUN=null;$("#fAgain").onclick=()=>startFocus(cat);$("#fBack").onclick=()=>{closeTopic();showTab("inicio")}}
/* ---------- 6. Escrita: modos ---------- */
let WMODE="text";
$$("#wMode button").forEach(b=>b.addEventListener("click",()=>{WMODE=b.dataset.wm;renderWMode()}));
function renderWMode(){$$("#wMode button").forEach(b=>{const on=b.dataset.wm===WMODE;b.classList.toggle("on",on);b.setAttribute("aria-selected",on)});
 ["text","tr","diary","chat"].forEach(k=>$("#wp-"+k).hidden=k!==WMODE);if(WMODE==="tr")renderTrHome();if(WMODE==="diary")renderDiary();if(WMODE==="chat")renderChatHome()}
/* tradução de volta */
let TR=null;
function trPool(tid){const a=[];const p=PODS.find(x=>x.topic===tid);if(p)p.L.forEach(l=>a.push([l[2],l[1]]));const st=STORIES[tid];if(st)st.p.forEach(l=>a.push([l[1],l[0]]));return a.filter(x=>x[1].length<110&&x[1].split(/\s+/).length>=4)}
function renderTrHome(){if(TR){renderTr();return}const box=$("#wp-tr");
 box.innerHTML=`<div class="card stack"><span class="label">Tradução de volta</span><p class="small">Você vê uma frase em português de um diálogo ou história do curso, escreve em italiano e compara com o original. As palavras que faltaram aparecem em vermelho.</p></div>
 <div class="tlist">${COURSE.map(t=>{const r=(S.bt||{})[t.id];return`<button class="tcard${opened(t.id)?"":" dim"}" data-tr="${t.id}"><span class="tn">${t.n}</span><div><h3>${esc(t.t)}</h3><p>${t.lvl} · 6 frases</p></div><span class="pill ${r?"ok":""}">${r?r.best+"%":"novo"}</span></button>`}).join("")}</div>`;
 $$("[data-tr]").forEach(b=>b.onclick=()=>{TR={tid:b.dataset.tr,items:shuffle(trPool(b.dataset.tr)).slice(0,6),i:0,scores:[]};renderTr();window.scrollTo(0,0)})}
function renderTr(){const box=$("#wp-tr"),it=TR.items[TR.i],t=TOPIC[TR.tid];
 box.innerHTML=`<button class="back" id="trBack">← Tópicos</button><div class="row" style="justify-content:space-between"><span class="label">${esc(t.t)} · ${TR.i+1} de ${TR.items.length}</span></div><div class="progress"><i style="width:${TR.i/TR.items.length*100}%"></i></div>
 <div class="card stack"><span class="qkind">Escreva em italiano</span><div class="q">${esc(it[0])}</div><textarea id="trIn" class="short" lang="it" spellcheck="false" placeholder="Scrivi in italiano…"></textarea><button class="btn primary" id="trCheck">Comparar com o original</button><div id="trRes"></div></div>`;
 $("#trBack").onclick=()=>{TR=null;renderTrHome()};$("#trIn").focus({preventScroll:true});
 $("#trCheck").onclick=()=>{const v=$("#trIn").value.trim();if(!v)return;const d=wordDiff(it[1],v);TR.scores.push(d.score);$("#trCheck").disabled=true;$("#trIn").disabled=true;
  if(d.score<70)addErrCard({type:"f",q:it[0],a:it[1],hint:"tradução de volta",exp:"Frase original do curso.",tp:TR.tid,cat:"voc"});
  $("#trRes").innerHTML=`<div class="fb ${d.score>=85?"ok":"no"}"><b>${d.score}% das palavras do original</b><div class="trorig it">${d.html}</div>${d.extra.length?`<span class="small">Palavras suas que não estão no original: ${esc(d.extra.join(", "))}</span>`:""}<span class="small">Verde: você acertou. Vermelho: faltou ou ficou diferente. ${d.score<70?"A frase foi para “Meus erros”.":""}</span></div>${spkBtn(it[1])}<button class="btn primary" id="trNext" style="margin-top:10px">${TR.i<TR.items.length-1?"Próxima":"Ver resultado"}</button>`;tokenize($("#trRes"));
  $("#trNext").onclick=()=>{TR.i++;if(TR.i<TR.items.length){renderTr();return}const avg=Math.round(TR.scores.reduce((a,b)=>a+b,0)/TR.scores.length);S.bt=S.bt||{};const prev=S.bt[TR.tid];S.bt[TR.tid]={best:Math.max(avg,prev?prev.best:0),last:today()};logInc("w");save();
   box.innerHTML=`<div class="card stack"><span class="label">Tradução de volta · ${esc(t.t)}</span><h2>${avg}%</h2><p>${avg>=85?"Ótimo: você produz essas frases sozinho.":"Releia o diálogo e a história do tópico e tente de novo amanhã."}</p><div class="row"><button class="btn primary" id="trAgain">Outras 6 frases</button><button class="btn" id="trHome">Outros tópicos</button></div></div>`;
   const tid=TR.tid;$("#trAgain").onclick=()=>{TR={tid,items:shuffle(trPool(tid)).slice(0,6),i:0,scores:[]};renderTr()};$("#trHome").onclick=()=>{TR=null;renderTrHome()}}}}
/* diário de 3 frases */
function curTopic(){return nextTopic()}
function renderDiary(){const box=$("#wp-diary"),t=curTopic(),d=(S.diary||{})[today()],hist=Object.entries(S.diary||{}).sort((a,b)=>b[0].localeCompare(a[0])).slice(0,7);
 box.innerHTML=`<div class="card stack"><span class="label">Diário · ${fmtBR(today())}</span><h3>Três frases sobre o seu dia</h3><p class="small">Use a gramática do seu tópico atual: <b>${esc(t.t)}</b> (${esc(t.sub)}).</p>
 ${[0,1,2].map(i=>`<input type="text" id="dy${i}" lang="it" spellcheck="false" placeholder="Frase ${i+1}" value="${esc(d&&d.lines?d.lines[i]||"":"")}">`).join("")}
 <div class="row"><button class="btn primary" id="dySend">Salvar e corrigir</button></div><p class="small muted" id="dyMsg"></p><div id="dyRes"></div></div>
 ${hist.length?`<div class="stack" style="gap:8px"><span class="label">Últimos dias</span>${hist.map(([dt,v])=>`<details class="exs"><summary><span class="label">${fmtBR(dt)}${v.result?" · nota "+v.result.nota+"/10":""}</span></summary><div class="mytext it" style="padding:10px 14px">${esc((v.result&&v.result.corrigido)||v.lines.join("\n"))}</div></details>`).join("")}</div>`:""}`;
 tokenize(box);if(d&&d.result)showDiaryRes(d);
 $("#dySend").onclick=async()=>{const lines=[0,1,2].map(i=>$("#dy"+i).value.trim()).filter(Boolean);if(lines.length<1){$("#dyMsg").textContent="Escreva pelo menos uma frase.";return}
  S.diary=S.diary||{};S.diary[today()]={lines,at:today()};logInc("w");save();
  const q=`Sou brasileiro e estudo italiano (nível ${t.lvl}). Corrija estas frases do meu diário. Foco gramatical: ${t.sub}.\n\n${lines.map((l,i)=>(i+1)+". "+l).join("\n")}`;
  if(!hasClaude()){$("#dyMsg").innerHTML=`Salvo. Para a correção: <a class="btn small" href="${esc(claudeLink(q+"\n\nMostre as frases corrigidas e explique cada erro em português, curto."))}" target="_blank" rel="noopener">Corrigir no Claude</a>`;return}
  const b=$("#dySend");b.disabled=true;b.textContent="Corrigindo…";
  try{const sample=await getSample();if(!sample)throw{code:"not_granted"};
   const r=await sample.json(q+`\n\nResponda somente com JSON: {"nota":0-10,"corrigido":"as frases corrigidas, uma por linha","erros":[{"original":"","correcao":"","explicacao":"em português, curta"}],"dica":"uma dica em português"}`,{modelTier:"default"});
   if(!r||r.corrigido==null)throw{code:"invalid_json"};r.erros=Array.isArray(r.erros)?r.erros:[];S.diary[today()].result=r;save();renderDiary()}
  catch(e){$("#dyMsg").textContent="Não consegui corrigir agora. As frases ficaram salvas.";b.disabled=false;b.textContent="Salvar e corrigir"}}}
function showDiaryRes(d){const r=d.result;$("#dyRes").innerHTML=`<div class="stack" style="gap:8px"><div class="grade"><b>${r.nota}</b><span class="small muted">nota de 0 a 10</span></div><div class="corrtext it">${esc(r.corrigido)}</div>${r.erros.map(x=>`<div class="err"><div class="pair"><s>${esc(x.original||"")}</s><span class="op">→</span><span class="fix it">${esc(x.correcao||"")}</span></div><span class="why">${esc(x.explicacao||"")}</span></div>`).join("")}${r.dica?`<div class="tip"><span class="label">Dica</span>${esc(r.dica)}</div>`:""}</div>`;tokenize($("#dyRes"))}
/* conversa com o Claude */
let CHAT=null;
function renderChatHome(){if(CHAT){renderChat();return}const box=$("#wp-chat");
 box.innerHTML=`<div class="card stack"><span class="label">Conversa com o Claude</span><p class="small">Uma situação por tópico. O Claude faz o outro papel, responde em italiano simples e aponta seus erros a cada fala. No fim, você recebe um resumo.</p>${hasClaude()?"":`<p class="small muted">Fora do Claude, a conversa abre numa conversa nova do Claude com tudo já explicado.</p>`}</div>
 <div class="tlist">${PODS.map(p=>{const t=TOPIC[p.topic],r=(S.chats||{})[p.topic];return`<button class="tcard${opened(p.topic)?"":" dim"}" data-chat="${p.topic}"><span class="tn">${t.n}</span><div><h3>${esc(p.t)}</h3><p>${t.lvl} · ${esc(p.sit)}</p></div><span class="pill ${r?"ok":""}">${r?r.n+"×":"novo"}</span></button>`}).join("")}</div>`;
 $$("[data-chat]").forEach(b=>b.onclick=()=>startChat(b.dataset.chat))}
function chatSetup(p){const t=TOPIC[p.topic];return`Vamos fazer uma encenação para eu praticar italiano (sou brasileiro, nível ${t.lvl}).
Situação: ${p.sit}
Você é ${p.sp.A}. Eu sou ${p.sp.B}.
Use frases curtas e simples, vocabulário de nível ${t.lvl}, e pratique: ${t.sub}.
Fale só em italiano no papel. Depois de cada fala minha, se eu errar algo, acrescente uma correção curta em português.`}
function startChat(tid){const p=PODS.find(x=>x.topic===tid);if(!p)return;
 if(!hasClaude()){window.open(claudeLink(chatSetup(p)+"\nComece você a conversa.\nQuando eu escrever FINE, faça um resumo dos meus erros em português."),"_blank","noopener");S.chats=S.chats||{};const r=S.chats[tid]=S.chats[tid]||{n:0};r.n++;r.last=today();logInc("w");save();renderChatHome();return}
 CHAT={tid,p,msgs:[{role:"assistant",content:p.L[0][1],fix:""}],busy:false,ended:false};renderChat();window.scrollTo(0,0)}
function renderChat(){const box=$("#wp-chat"),c=CHAT;
 box.innerHTML=`<button class="back" id="chBack">← Situações</button><div class="tophead"><span class="label">${esc(TOPIC[c.tid].lvl)} · ${esc(c.p.sp.A)} × você (${esc(c.p.sp.B)})</span><h2>${esc(c.p.t)}</h2><p class="muted small">${esc(c.p.sit)}</p></div>
 <div class="chat" id="chLog">${c.msgs.map(m=>`<div class="bub ${m.role==="user"?"me":"bot"}"><span class="it">${esc(m.content)}</span>${m.role==="assistant"?spkBtn(m.content):""}${m.fix?`<span class="bfix">${esc(m.fix)}</span>`:""}</div>`).join("")}${c.busy?`<div class="bub bot"><span class="muted">…</span></div>`:""}</div>
 ${c.ended?`<div class="card stack" id="chSum">${c.summary?`<span class="label">Resumo</span><p>${esc(c.summary)}</p>`:`<p class="muted">Preparando o resumo…</p>`}</div><button class="btn" id="chNew">Outra situação</button>`
 :`<form id="chForm" class="fillrow"><input type="text" id="chIn" lang="it" spellcheck="false" placeholder="Rispondi in italiano…" autocomplete="off"><button class="btn primary" type="submit" ${c.busy?"disabled":""}>Enviar</button></form><div class="row"><button class="btn ghost small" id="chEnd" ${c.msgs.length<3?"disabled":""}>Terminar e ver o resumo</button></div><p class="small muted" id="chMsg"></p>`}`;
 tokenize($("#chLog"));$("#chBack").onclick=()=>{CHAT=null;renderChatHome()};
 const lg=$("#chLog");lg.scrollTop=lg.scrollHeight;
 if($("#chNew"))$("#chNew").onclick=()=>{CHAT=null;renderChatHome()};
 if($("#chForm")){$("#chIn").focus({preventScroll:true});$("#chForm").onsubmit=e=>{e.preventDefault();const v=$("#chIn").value.trim();if(!v||c.busy)return;c.msgs.push({role:"user",content:v});chatTurn()};$("#chEnd").onclick=chatEnd}}
async function chatTurn(){const c=CHAT;c.busy=true;renderChat();
 const msgs=[{role:"user",content:chatSetup(c.p)+"\nComece."},...c.msgs.map(m=>({role:m.role,content:m.content}))];
 msgs[msgs.length-1]={role:"user",content:msgs[msgs.length-1].content+`\n\n[Responda somente com JSON: {"fix":"correção curta em português da minha última fala, ou vazio se estiver certa","reply":"sua próxima fala em italiano, no papel de ${c.p.sp.A}, 1 ou 2 frases"}]`};
 try{const sample=await getSample();if(!sample)throw{code:"not_granted"};const r=await sample.json(msgs,{modelTier:"default",cache:false});
  if(!r||!r.reply)throw{code:"invalid_json"};c.msgs[c.msgs.length-1].fix=r.fix||"";c.msgs.push({role:"assistant",content:r.reply});speak(r.reply)}
 catch(e){c.msgs.pop();c.busy=false;renderChat();$("#chMsg").textContent=e&&e.code==="rate_limited"?"Muitas mensagens em pouco tempo. Espere um pouco.":"Não consegui responder agora. Tente de novo.";return}
 c.busy=false;renderChat()}
async function chatEnd(){const c=CHAT;c.ended=true;renderChat();S.chats=S.chats||{};const r=S.chats[c.tid]=S.chats[c.tid]||{n:0};r.n++;r.last=today();logInc("w");save();
 const fixes=c.msgs.filter(m=>m.role==="user").map(m=>`- ${m.content}${m.fix?" (correção: "+m.fix+")":""}`).join("\n");
 try{const sample=await getSample();const t=await sample(`Resuma em português, em 3 a 5 frases, como foi esta conversa de um aluno brasileiro de italiano (nível ${TOPIC[c.tid].lvl}). Diga o que ele fez bem, os erros que mais se repetiram e uma frase útil para memorizar.\n\nFalas do aluno:\n${fixes}`,{modelTier:"default"});c.summary=t.text}
 catch(e){c.summary="Não consegui gerar o resumo agora."}renderChat()}
/* ---------- 7. Pronúncia: pares mínimos e ditado ---------- */
let SMODE="pod";
$$("#sMode button").forEach(b=>b.addEventListener("click",()=>{SMODE=b.dataset.sm;renderSMode()}));
function renderSMode(){$$("#sMode button").forEach(b=>{const on=b.dataset.sm===SMODE;b.classList.toggle("on",on);b.setAttribute("aria-selected",on)});
 ["pod","pairs","dict"].forEach(k=>$("#shp-"+k).hidden=k!==SMODE);if(SMODE==="pairs")renderPairs();if(SMODE==="dict")renderDictHome()}
const PAIRS=[["pala","palla","pá","bola","doppie"],["caro","carro","caro","carro","doppie"],["nono","nonno","nono","avô","doppie"],["sera","serra","noite","estufa","doppie"],["fato","fatto","destino","feito","doppie"],["capello","cappello","fio de cabelo","chapéu","doppie"],["copia","coppia","cópia","casal","doppie"],["note","notte","notas","noite","doppie"],["eco","ecco","eco","eis","doppie"],["papa","pappa","papa","papinha","doppie"],["casa","cassa","casa","caixa","doppie"],["pena","penna","pena","caneta","doppie"],["sono","sonno","sou","sono","doppie"],["camino","cammino","lareira","caminho","doppie"],["tuta","tutta","macacão","toda","doppie"],["sete","sette","sede (pl.)","sete","doppie"],["campana","campagna","sino","interior","gn"],["sono","sogno","sou","sonho","gn"],["fili","figli","fios","filhos","gli"],["cena","scena","jantar","cena (teatro)","sc"]];
let PR=null;
function renderPairs(){const box=$("#shp-pairs");
 if(!PR){const best=(S.pairs||{}).best;box.innerHTML=`<div class="card stack"><span class="label">Pares mínimos</span><h3>Treine o ouvido para as consoantes dobradas</h3><p class="small">Palavras que só mudam por um som: <i class="it">pala / palla</i>, <i class="it">caro / carro</i>, <i class="it">nono / nonno</i>. O app fala uma delas e você marca qual ouviu. As consoantes dobradas mudam o sentido e são o maior desafio de pronúncia para brasileiros.</p>
  ${IG.box("Como soa uma consoante dobrada",IG.eq(["[ca]{r}[o] ((r rápido))","[ca]{rr}[o] ((r segurado um instante))","[no]{n}[o] ((nono))","[no]{nn}[o] ((avô: o n dura mais))"]),"Segure a consoante por um instante, como se fizesse uma pequena pausa antes da vogal seguinte. Repita em voz alta depois de cada resposta.")}
  ${best!=null?`<p class="small">Melhor resultado: <b>${best}/10</b></p>`:""}${canSpeak?`<button class="btn primary" id="prStart">Começar (10 pares)</button>`:`<p class="muted">Este aparelho não tem voz em italiano para o exercício.</p>`}</div>
  <div class="card stack"><span class="label">Lista para ouvir e repetir</span><div class="prlist">${PAIRS.map(p=>`<div class="prr"><button class="chipb" data-say="${esc(p[0])}">${esc(p[0])}</button><span class="small muted">${esc(p[2])}</span><span class="op">×</span><button class="chipb" data-say="${esc(p[1])}">${esc(p[1])}</button><span class="small muted">${esc(p[3])}</span></div>`).join("")}</div></div>`;
  if($("#prStart"))$("#prStart").onclick=()=>{PR={qs:shuffle(PAIRS).slice(0,10).map(p=>({p,k:Math.random()<.5?0:1})),i:0,score:0};renderPairs()};return}
 const q=PR.qs[PR.i];box.innerHTML=`<div class="row" style="justify-content:space-between"><span class="label">${PR.i+1} de 10</span><button class="btn ghost small" id="prQuit">Sair</button></div><div class="progress"><i style="width:${PR.i*10}%"></i></div>
 <div class="card stack"><span class="qkind">Qual palavra você ouviu?</span><button class="btn listenbtn" id="prPlay">${SPK_SVG}Ouvir de novo</button><div class="prch">${[0,1].map(k=>`<button class="opt" data-pk="${k}"><b class="it" style="font-style:normal">${esc(q.p[k])}</b><span class="small muted">${esc(q.p[k+2])}</span></button>`).join("")}</div><div id="prFb"></div></div>`;
 const sp=()=>speak(q.p[q.k]);$("#prPlay").onclick=sp;setTimeout(sp,250);$("#prQuit").onclick=()=>{PR=null;renderPairs()};
 $$("#shp-pairs [data-pk]").forEach(b=>b.onclick=()=>{const ok=+b.dataset.pk===q.k;if(ok)PR.score++;recordCat("list",ok);$$("#shp-pairs [data-pk]").forEach(x=>{x.disabled=true;if(+x.dataset.pk===q.k)x.classList.add("right")});if(!ok)b.classList.add("wrong");
  $("#prFb").innerHTML=`<div class="fb ${ok?"ok":"no"}"><b>${ok?"Certo!":"Era “"+esc(q.p[q.k])+"”."}</b><div class="row"><button class="chipb" data-say="${esc(q.p[0])}">${esc(q.p[0])}</button><button class="chipb" data-say="${esc(q.p[1])}">${esc(q.p[1])}</button><span class="small">Ouça os dois e repita em voz alta.</span></div></div><button class="btn primary" id="prNext" style="margin-top:10px">${PR.i<9?"Próximo":"Ver resultado"}</button>`;
  $("#prNext").onclick=()=>{PR.i++;if(PR.i<10){renderPairs();return}S.pairs=S.pairs||{};S.pairs.best=Math.max(PR.score,S.pairs.best||0);logInc("s");save();const sc=PR.score;PR=null;renderPairs();$("#shp-pairs").insertAdjacentHTML("afterbegin",`<div class="fb ${sc>=8?"ok":"no"}"><b>Resultado: ${sc}/10.</b><span>${sc>=8?"Ouvido afiado!":"Repita amanhã: o ouvido melhora com a repetição."}</span></div>`)}})}
/* ditado */
let DT=null;
function renderDictHome(){if(DT){renderDict();return}const box=$("#shp-dict");
 box.innerHTML=`<div class="card stack"><span class="label">Ditado</span><h3>Ouça a frase inteira e escreva</h3><p class="small">5 frases dos diálogos, histórias e exemplos do tópico. Pode ouvir quantas vezes quiser, inclusive devagar. Na correção, as palavras certas ficam em verde e as que faltaram em vermelho.</p>${canSpeak?"":`<p class="muted">Este aparelho não tem voz em italiano para o ditado.</p>`}</div>
 <div class="tlist">${COURSE.map(t=>{const r=(S.dict||{})[t.id];return`<button class="tcard${opened(t.id)?"":" dim"}" data-dt="${t.id}" ${canSpeak?"":"disabled"}><span class="tn">${t.n}</span><div><h3>${esc(t.t)}</h3><p>${t.lvl} · 5 frases</p></div><span class="pill ${r?"ok":""}">${r?r.best+"%":"novo"}</span></button>`}).join("")}</div>`;
 $$("[data-dt]").forEach(b=>b.onclick=()=>{const tid=b.dataset.dt;DT={tid,items:shuffle(LSENT[tid]||[]).filter(s=>s[0].length<80&&s[0].split(/\s+/).length>=4).slice(0,5),i:0,scores:[]};renderDict();window.scrollTo(0,0)})}
function renderDict(){const box=$("#shp-dict"),it=DT.items[DT.i],t=TOPIC[DT.tid];
 box.innerHTML=`<button class="back" id="dtBack">← Tópicos</button><div class="row" style="justify-content:space-between"><span class="label">${esc(t.t)} · ${DT.i+1} de ${DT.items.length}</span></div><div class="progress"><i style="width:${DT.i/DT.items.length*100}%"></i></div>
 <div class="card stack"><span class="qkind">Escreva o que você ouvir</span><div class="row"><button class="btn listenbtn" id="dtPlay">${SPK_SVG}Ouvir</button><button class="btn ghost" id="dtSlow">Bem devagar</button></div><textarea id="dtIn" class="short" lang="it" spellcheck="false" placeholder="Scrivi qui…"></textarea><button class="btn primary" id="dtCheck">Corrigir</button><div id="dtRes"></div></div>`;
 const say=r=>{try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(it[0]);u.lang="it-IT";u.rate=r;speechSynthesis.speak(u)}catch(e){}};
 $("#dtPlay").onclick=()=>say(.9);$("#dtSlow").onclick=()=>say(.6);setTimeout(()=>say(.9),300);$("#dtBack").onclick=()=>{DT=null;renderDictHome()};
 $("#dtCheck").onclick=()=>{const v=$("#dtIn").value.trim();if(!v)return;const d=wordDiff(it[0],v);DT.scores.push(d.score);recordCat("list",d.score>=90);$("#dtCheck").disabled=true;$("#dtIn").disabled=true;
  $("#dtRes").innerHTML=`<div class="fb ${d.score>=90?"ok":"no"}"><b>${d.score}% certo</b><div class="trorig it">${d.html}</div>${it[1]?`<span class="small">${esc(it[1])}</span>`:""}</div><button class="btn primary" id="dtNext" style="margin-top:10px">${DT.i<DT.items.length-1?"Próxima":"Ver resultado"}</button>`;tokenize($("#dtRes"));
  $("#dtNext").onclick=()=>{DT.i++;if(DT.i<DT.items.length){renderDict();return}const avg=Math.round(DT.scores.reduce((a,b)=>a+b,0)/DT.scores.length);S.dict=S.dict||{};const prev=S.dict[DT.tid];S.dict[DT.tid]={best:Math.max(avg,prev?prev.best:0),last:today()};logInc("s");save();
   const tid=DT.tid;box.innerHTML=`<div class="card stack"><span class="label">Ditado · ${esc(t.t)}</span><h2>${avg}%</h2><p>${avg>=90?"Excelente: seu ouvido já pega as frases inteiras.":"Ouça os podcasts do tópico no modo “Frase + pausa” e tente de novo."}</p><div class="row"><button class="btn primary" id="dtAgain">Outras 5 frases</button><button class="btn" id="dtHome">Outros tópicos</button></div></div>`;
   $("#dtAgain").onclick=()=>{DT={tid,items:shuffle(LSENT[tid]||[]).filter(s=>s[0].length<80&&s[0].split(/\s+/).length>=4).slice(0,5),i:0,scores:[]};renderDict()};$("#dtHome").onclick=()=>{DT=null;renderDictHome()}}}}
