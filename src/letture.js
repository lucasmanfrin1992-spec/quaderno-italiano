/* ============================ LETTURE: leituras graduadas com quiz ============================ */
// Progresso por perfil em S.leituras: { <id do texto>: { done: "AAAA-MM-DD" } } — guarda só a primeira data em que as 3 respostas ficaram certas.
const LETI=Object.fromEntries(LETTURE.map(t=>[t.id,t]));
const TEMAS={lavoro:"Trabalho",quotidiano:"Cotidiano"};
const LT={cur:null,lvl:"all",q:"",quiz:{}};
function letDone(id){const r=(S.leituras||{})[id];return r&&r.done?r.done:""}
function letDoneN(){return LETTURE.filter(t=>letDone(t.id)).length}
function letNext(){return LETTURE.find(t=>!letDone(t.id))||null}
function letGloss(k){const t=LT.cur;if(!t)return null;const kk=String(k).toLowerCase().replace(/’/g,"'").replace(/'$/,"");const g=t.glossario.find(g=>g.it.toLowerCase()===kk);if(g)return g;const x=LET_EXTRA[kk];return x?{it:kk,pt:x[0],classe:x[1]}:null}
const LETV=[["base","Base"],["intermedio","Intermedio"],["avanzato","Avanzato"]];
function letVersao(t){const v=S.letVersao;return v&&t.versoes[v]?v:"base"} // a última versão escolhida fica guardada por perfil em S.letVersao
function openLet(id){const t=LETI[id];if(!t)return;stopLines();LT.cur=t;try{localStorage.setItem(KEY+".let",id)}catch(e){}renderLet();window.scrollTo(0,0)}
function closeLet(){stopLines();LT.cur=null;try{localStorage.removeItem(KEY+".let")}catch(e){}renderLet();window.scrollTo(0,0)}
function renderLet(){if(!$("#letBox"))return;LT.cur?renderLetText():renderLetIndex()}

/* ---------- índice ---------- */
function renderLetIndex(){const box=$("#letBox"),n=letDoneN(),tot=LETTURE.length;
 box.innerHTML=`<div class="stack" style="gap:6px"><div class="lvlhead"><div><h2>Textos</h2><p class="muted small">Leituras curtas de trabalho e do dia a dia, com notas e 3 perguntas. Toque em qualquer palavra para ver a tradução.</p></div><span class="pill ${n===tot?"ok":"todo"}">${n}/${tot} concluídos</span></div><div class="lvlbar"><i style="width:${n/tot*100}%"></i></div></div>
 <input type="search" id="letQ" class="prefq" placeholder="Buscar pelo título" aria-label="Buscar texto pelo título" value="${esc(LT.q)}" autocomplete="off">
 <div class="gnav" id="letLvl" role="tablist" aria-label="Filtrar por nível">${[["all","Todos"],["A1","A1"],["A2","A2"]].map(([k,l])=>`<button role="tab" data-llvl="${k}" class="${LT.lvl===k?"on":""}" aria-selected="${LT.lvl===k}">${l} · ${LETTURE.filter(t=>k==="all"||t.nivel===k).length}</button>`).join("")}</div>
 <div class="tlist" id="letList"></div>`;
 $("#letQ").oninput=e=>{LT.q=e.target.value;renderLetList()};
 $$("#letLvl [data-llvl]").forEach(b=>b.onclick=()=>{LT.lvl=b.dataset.llvl;renderLetIndex()});
 renderLetList()}
function renderLetList(){const box=$("#letList");if(!box)return;const q=norm(LT.q||"");
 const items=LETTURE.filter(t=>(LT.lvl==="all"||t.nivel===LT.lvl)&&(!q||norm(t.titulo).includes(q)));
 box.innerHTML=items.length?items.map(t=>{const d=letDone(t.id);return`<button class="tcard${d?" done":""}" data-let-open="${t.id}"><span class="tn">${d?"✓":LETTURE.indexOf(t)+1}</span><div><h3>${esc(t.titulo)}</h3><p>${t.nivel} · ${TEMAS[t.tema]||t.tema}</p></div><span class="pill ${d?"ok":""}">${d?"lido":"novo"}</span></button>`}).join(""):`<div class="card"><p class="muted small">Nenhum texto com esse título.</p></div>`;
 $$("#letList [data-let-open]").forEach(b=>b.onclick=()=>openLet(b.dataset.letOpen))}

/* ---------- tela do texto ---------- */
function renderLetText(){const t=LT.cur,box=$("#letBox"),i=LETTURE.indexOf(t),prev=LETTURE[i-1],next=LETTURE[i+1],ver=letVersao(t),paras=t.versoes[ver].split("\n"),N=t.notas,vers=LETV.filter(v=>t.versoes[v[0]]);
 box.innerHTML=`<button class="back" id="letBack">← Textos</button>
 <div class="tophead"><span class="label">${t.nivel} · ${TEMAS[t.tema]||t.tema} · texto ${i+1} de ${LETTURE.length}</span><h2 class="it lettit">${esc(t.titulo)}</h2></div>
 ${vers.length>1?`<div class="seg" id="letVer" role="tablist" aria-label="Versão do texto">${vers.map(v=>`<button role="tab" data-lver="${v[0]}" class="${ver===v[0]?"on":""}" aria-selected="${ver===v[0]}">${v[1]}</button>`).join("")}</div>`:""}
 <div id="letPlayer">${audioHTML()}</div>
 <article class="card stack lettext">${paras.map(p=>`<p class="letp">${splitSents(p).map(s=>`<span class="it lsent">${esc(s)}</span>`).join(" ")}</p>`).join("")}</article>
 <p class="hint">Toque numa palavra para ver a tradução e salvar em Preferiti. Para uma expressão, segure a primeira palavra e arraste até a última.</p>
 <div class="stack" style="gap:12px"><h3>Note linguistiche</h3>
  <details class="exs" open><summary><span class="label">Vocabulário</span><span class="exn">${N.vocabulario.length}</span></summary><div class="exlist">${N.vocabulario.map(v=>`<div class="exrow"><div><i class="it">${esc(v.it)}</i><span>${esc(v.pt)}</span></div>${spkBtn(v.it)}</div>`).join("")}</div></details>
  <details class="exs"><summary><span class="label">Gramática</span><span class="exn">${N.gramatica.length}</span></summary><div class="exlist">${N.gramatica.map(g=>`<div class="letnote"><b>${esc(g.titulo)}</b><p class="it">${esc(g.trecho)}</p><p class="small">${esc(g.explicacao)}</p><div class="formbox"><span class="label">Regra</span><div class="f">${esc(g.regra)}</div></div><div class="exi"><div><i class="it">${esc(g.exemplo)}</i></div>${spkBtn(g.exemplo)}</div></div>`).join("")}</div></details>
  <details class="exs"><summary><span class="label">Colocações</span><span class="exn">${N.colocacoes.length}</span></summary><div class="exlist">${N.colocacoes.map(c=>`<div class="letnote"><b class="it">${esc(c.it)}</b><p class="small">${esc(c.explicacao)}</p><div class="exi"><div><i class="it">${esc(c.exemplo)}</i></div>${spkBtn(c.exemplo)}</div></div>`).join("")}</div></details>
 </div>
 <div id="letQuiz" class="stack"></div>
 <div class="row" style="justify-content:space-between">${prev?`<button class="btn" data-let-open="${prev.id}">← Anterior</button>`:"<span></span>"}${next?`<button class="btn" data-let-open="${next.id}">Próximo →</button>`:"<span></span>"}</div>`;
 tokenize(box);
 $("#letBack").onclick=closeLet;
 $$("#letVer [data-lver]").forEach(b=>b.onclick=()=>{if(S.letVersao===b.dataset.lver)return;S.letVersao=b.dataset.lver;save();stopLines();const y=window.scrollY;renderLetText();window.scrollTo(0,y)});
 $$("#letBox > .row [data-let-open]").forEach(b=>b.onclick=()=>openLet(b.dataset.letOpen));
 audioMount($("#letPlayer"),$$("#letBox .lsent").map(el=>({el,text:el.textContent.replace(/^—\s*/,"").replace(/[«»]/g,"")})));
 renderLetQuiz()}

/* ---------- Comprensione: 3 perguntas; o texto conta como lido com as 3 certas ---------- */
function renderLetQuiz(){const t=LT.cur,box=$("#letQuiz");if(!t||!box)return;const st=LT.quiz[t.id]=LT.quiz[t.id]||{ans:{},ord:{}},n=t.quiz.length,done=letDone(t.id);
 const right=t.quiz.filter((q,i)=>st.ans[i]===q.correta).length,answered=Object.keys(st.ans).length;
 let h=`<div class="row" style="justify-content:space-between"><h3>Comprensione</h3><div class="row" style="gap:8px"><span class="chip${right===n?" hot":""}" id="letCount">${right}/${n}</span>${answered?`<button class="btn ghost small" id="letClear">Limpar</button>`:""}</div></div>`;
 if(done&&!answered)h+=`<div class="fb ok"><b>Texto concluído em ${fmtBR(done)}.</b><span>Você pode responder de novo para treinar.</span></div>`;
 else if(!done)h+=`<p class="muted small">Acerte as ${n} perguntas para marcar este texto como lido.</p>`;
 t.quiz.forEach((q,i)=>{if(!st.ord[i])st.ord[i]=shuffle(q.opcoes.map((_,k)=>k));const a=st.ans[i];
  h+=`<div class="qz"><span class="qn">Pergunta ${i+1} de ${n}</span><div class="qq it">${esc(q.pergunta)}</div><div class="opts">${st.ord[i].map(k=>`<button class="opt${a!=null?(k===q.correta?" right":k===a?" wrong":""):""}" data-lq="${i}" data-k="${k}" ${a!=null?"disabled":""}>${esc(q.opcoes[k])}</button>`).join("")}</div></div>`});
 if(answered===n)h+=right===n?`<div class="fb ok"><b>${n}/${n}: texto lido!</b><span>${done?"Concluído em "+fmtBR(done)+".":""}</span></div>`:`<div class="fb no"><b>${right}/${n} certas.</b><span>Releia o texto e toque em “Limpar” para tentar de novo.</span></div>`;
 box.innerHTML=h;tokenize(box);
 $$("#letQuiz [data-lq]").forEach(b=>b.onclick=()=>{const i=+b.dataset.lq;if(st.ans[i]!=null)return;st.ans[i]=+b.dataset.k;{const q=t.quiz[i];errAnswer({id:"let:"+t.id+":"+i,k:"mc",cat:"leit",lbl:"Leitura · "+t.titulo,p:q.pergunta,pit:true,o:q.opcoes,a:q.correta,x:"",let:t.id},st.ans[i]===q.correta,"leitura")}
  if(Object.keys(st.ans).length===n&&t.quiz.every((q,j)=>st.ans[j]===q.correta)){S.leituras=S.leituras||{};if(!S.leituras[t.id]){S.leituras[t.id]={done:today()};logEvento("leitura",t.id)}logInc("n",1);save();renderHome()}
  renderLetQuiz()});
 if($("#letClear"))$("#letClear").onclick=()=>{LT.quiz[t.id]={ans:{},ord:{}};renderLetQuiz()}}

/* ---------- cartão na tela inicial ---------- */
function renderHomeLet(){const el=$("#homeLet");if(!el)return;const n=letDoneN(),tot=LETTURE.length,t=letNext();
 el.innerHTML=`<div class="row" style="justify-content:space-between"><span class="label">Textos · ${n}/${tot} concluídos</span>${t?`<span class="cefr">${t.nivel}</span>`:""}</div>${t?`<h3>${esc(t.titulo)}</h3><p class="small muted">${TEMAS[t.tema]||t.tema} · leitura curta com 3 perguntas</p><div class="row"><button class="btn primary" data-goto="news" data-let="${t.id}">Ler agora</button></div>`:`<h3>Todos os textos lidos</h3><div class="row"><button class="btn" data-goto="news" data-let="index">Reler um texto</button></div>`}`}
