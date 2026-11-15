/* ============================ TÉCNICAS EXTRAS ============================ */
/* ---------- utilidades ---------- */
/* ---------- 1. Histórias ---------- */
COURSE.forEach(t=>{const st=STORIES[t.id];if(!st)return;st.p.forEach(l=>{SENT.push(l);if(LSENT[t.id])LSENT[t.id].push(l)})});
function renderStory(body){const t=CUR,st=STORIES[t.id],c=S.course[t.id]=S.course[t.id]||{};if(!st){body.innerHTML="<p class='muted'>Sem história para este tópico.</p>";return}
 const ans=(STQ[t.id]=STQ[t.id]||{ans:{},ord:{}});
 body.innerHTML=`<div class="card stack story"><span class="label">Mini-história · personagens do curso</span><h3>${esc(st.t)}</h3>
  <div class="row">${canSpeak?`<button class="btn" id="stRead">${SPK_SVG}Ouvir a história</button>`:""}<button class="btn ghost" id="stPt" aria-pressed="false">Mostrar tradução</button></div>
  <div class="stlines">${st.p.map(l=>`<p class="stl"><span class="it">${esc(l[0])}</span><span class="stpt" hidden>${esc(l[1])}</span></p>`).join("")}</div>
  <p class="hint">Leia sem a tradução primeiro. Toque numa palavra para ver o significado; no painel, “Marcar um trecho” salva uma frase inteira em Preferiti.</p></div>
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
function stopLines(){audioStop();RL.tok++;sayStop();$$(".reading").forEach(e=>{if(!e.closest("#newsBox"))e.classList.remove("reading")})}
function readLines(lines,els){if(!canSpeak)return;const tok=++RL.tok;let i=0;sayStop();
 const next=()=>{els.forEach(e=>e.classList.remove("reading"));if(tok!==RL.tok||i>=lines.length)return;const el=els[i];if(el)el.classList.add("reading");
  sayIt(lines[i],{rate:.85,onend:()=>{if(tok!==RL.tok)return;i++;setTimeout(next,350)}})};next()}
/* ---------- 2. Cartões de frase ---------- */
DECKS.frase="Minhas frases";ORDER.frase=[];
function sentCardId(s,w){return"s:"+hashStr(s+"|"+w)}
function blankWord(s,w){const re=new RegExp("(^|[^"+LET+"])("+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")(?=[^"+LET+"]|$)","i");return re.test(s)?s.replace(re,"$1___"):s}
function saveSentence(sentence,word,meaning){S.sents=S.sents||{};const id=sentCardId(sentence,word);if(S.sents[id]){delete S.sents[id];delete CARDS[id];ORDER.frase=ORDER.frase.filter(x=>x!==id);save();return false}
 S.sents[id]={s:sentence,w:word,m:meaning||"",d:today()};addSentCard(id);save();return true}
function addSentCard(id){const e=S.sents[id];CARDS[id]={deck:"frase",sent:e};if(!ORDER.frase.includes(id))ORDER.frase.push(id)}
function syncSentCards(){Object.keys(CARDS).forEach(id=>{if(id.startsWith("s:"))delete CARDS[id]});ORDER.frase=[];Object.keys(S.sents||{}).forEach(addSentCard)}
function newSentIds(){return S.settings.decks.frase!==false?ORDER.frase.filter(id=>!S.cards[id]).slice(0,15):[]}
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
