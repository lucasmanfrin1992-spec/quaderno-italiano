/* ============================ ABA EXERCÍCIOS: banco de questões de marcar ============================ */
// Progresso por perfil em S.exerc: { <id da questão>: { r: 1|0 (última resposta), n: tentativas, ok: acertos } }
const EXCATS=[["gram","Gramática","Verbos, artigos, preposições e pronomes"],["voc","Vocabulário","Palavras do trabalho e do dia a dia, falsos amigos"],["int","Interpretação de texto","Textos curtos com perguntas"]];
const EXTIPO={comp:"Complete a frase",mc:"Escolha a resposta",frase:"Qual frase está correta?",it:"Responda sobre o texto",vf:"Verdadeiro ou falso?"};
const EX={lvl:"A1",run:null,tx:null,txAns:{}};
function exStat(id){return(S.exerc||{})[id]||null}
function exPool(lvl,cat){return EXQ.filter(q=>q.nivel===lvl&&(!cat||cat==="mix"?true:q.cat===cat))}
function exCounts(list){let ok=0,wrong=0,seen=0;list.forEach(q=>{const s=exStat(q.id);if(!s)return;seen++;s.r?ok++:wrong++});return{ok,wrong,seen,tot:list.length}}
function exRecord(q,ok){S.exerc=S.exerc||{};const s=S.exerc[q.id]=S.exerc[q.id]||{r:0,n:0,ok:0};s.n++;s.r=ok?1:0;if(ok)s.ok++;save()}
function exPick(list,n){const nunca=shuffle(list.filter(q=>!exStat(q.id))),erradas=shuffle(list.filter(q=>exStat(q.id)&&!exStat(q.id).r)),certas=shuffle(list.filter(q=>exStat(q.id)&&exStat(q.id).r));
 return[...nunca,...erradas,...certas].slice(0,n)}
function exLevelSeg(){return`<div class="seg seg2" id="exLvl" role="tablist" aria-label="Nível">${["A1","A2"].map(l=>`<button role="tab" data-exlvl="${l}" class="${EX.lvl===l?"on":""}" aria-selected="${EX.lvl===l}">Nível ${l}</button>`).join("")}</div>`}
function renderExerc(){const box=$("#exBox");if(!box)return;if(EX.run)return renderExRun();if(EX.tx)return renderExText();
 const all=exPool(EX.lvl),c=exCounts(all);
 box.innerHTML=`${exLevelSeg()}
 <div class="card stack" style="gap:8px"><div class="row" style="justify-content:space-between"><span class="label">Nível ${EX.lvl} · ${all.length} questões</span><span class="chip${c.seen?" hot":""}">${c.ok} certas</span></div>
  <div class="lvlbar"><i style="width:${all.length?c.ok/all.length*100:0}%"></i></div><p class="small muted">${c.seen?`${c.seen} respondidas · ${c.wrong} para refazer`:"Nenhuma respondida ainda. Tudo é de marcar: toque na opção certa."}</p>
  <div class="row"><button class="btn primary" data-exstart="mix">Rodada mista (10)</button>${c.wrong?`<button class="btn" data-exwrong="mix">Refazer erradas (${c.wrong})</button>`:""}</div></div>
 ${EXCATS.map(([k,n,d])=>{const l=exPool(EX.lvl,k),cc=exCounts(l);return`<div class="card stack excat" style="gap:8px"><div class="row" style="justify-content:space-between;align-items:flex-start"><div class="stack" style="gap:2px"><h3>${n}</h3><p class="small muted">${d}</p></div><span class="pill ${cc.ok===cc.tot?"ok":""}">${cc.ok}/${cc.tot}</span></div>
  <div class="lvlbar"><i style="width:${cc.tot?cc.ok/cc.tot*100:0}%"></i></div>
  <div class="row">${k==="int"?`<button class="btn primary" data-extexts="1">Ver os textos (${Object.values(EXTX).filter(t=>t.nivel===EX.lvl).length})</button><button class="btn" data-exstart="int">Rodada de perguntas (10)</button>`:`<button class="btn primary" data-exstart="${k}">Começar (10)</button>`}${cc.wrong?`<button class="btn" data-exwrong="${k}">Refazer erradas (${cc.wrong})</button>`:""}</div>
  ${k==="int"&&EX.showTexts?exTextList():""}</div>`}).join("")}`;
 $$("#exLvl [data-exlvl]").forEach(b=>b.onclick=()=>{EX.lvl=b.dataset.exlvl;try{localStorage.setItem(KEY+".exlvl",EX.lvl)}catch(e){}renderExerc()});
 $$("#exBox [data-exstart]").forEach(b=>b.onclick=()=>exStart(b.dataset.exstart,false));
 $$("#exBox [data-exwrong]").forEach(b=>b.onclick=()=>exStart(b.dataset.exwrong,true));
 $$("#exBox [data-extexts]").forEach(b=>b.onclick=()=>{EX.showTexts=!EX.showTexts;renderExerc()});
 $$("#exBox [data-extx]").forEach(b=>b.onclick=()=>exOpenText(b.dataset.extx))}
function exTextList(){return`<div class="tlist">${Object.values(EXTX).filter(t=>t.nivel===EX.lvl).map((t,i)=>{const qs=EXQ.filter(q=>q.tx===t.id),ok=qs.filter(q=>exStat(q.id)&&exStat(q.id).r).length;
 return`<button class="tcard${ok===qs.length?" done":""}" data-extx="${t.id}"><span class="tn">${ok===qs.length?"✓":i+1}</span><div><h3>${esc(t.titulo)}</h3><p>${qs.length} perguntas</p></div><span class="pill ${ok===qs.length?"ok":""}">${ok}/${qs.length}</span></button>`}).join("")}</div>`}

/* ---------- rodada de 10 ---------- */
function exStart(cat,onlyWrong){let list=exPool(EX.lvl,cat);if(onlyWrong)list=list.filter(q=>exStat(q.id)&&!exStat(q.id).r);
 const qs=(onlyWrong?shuffle(list):exPick(list,10)).slice(0,10).map(q=>({q,ord:q.tipo==="vf"?[0,1]:shuffle(q.o.map((_,i)=>i)),ans:null}));
 if(!qs.length)return;EX.run={cat,qs,i:0,onlyWrong};window.scrollTo(0,0);renderExRun()}
function exPrompt(q){if(q.tipo==="comp"||q.tipo==="it")return`<div class="qq it exq">${esc(q.q).replace(/___/g,'<span class="exgap">___</span>')}</div>`;
 return`<div class="qq exq">${esc(q.q).replace(/«(.+?)»/g,'«<b class="it">$1</b>»')}</div>`}
function exTextBox(t,withAudio){return`<div class="card stack extext"><span class="label">Texto · ${esc(t.titulo)}</span>${withAudio?`<div class="exaud">${audioHTML()}</div>`:""}<p class="it exparas">${esc(t.texto).replace(/ — /g,"<br>— ")}</p></div>`}
function renderExRun(){const R=EX.run,box=$("#exBox");if(R.i>=R.qs.length)return renderExEnd();const it=R.qs[R.i],q=it.q,catN=(EXCATS.find(c=>c[0]===q.cat)||[])[1]||"";
 const tx=q.tx?EXTX[q.tx]:null;
 let h=`<div class="row" style="justify-content:space-between"><button class="back" id="exQuit">← Sair</button><span class="chip">${R.i+1} de ${R.qs.length}</span></div>
 <div class="lvlbar"><i style="width:${R.i/R.qs.length*100}%"></i></div>
 ${tx?exTextBox(tx,true):""}
 <div class="qz exqz"><span class="qn">${q.nivel} · ${catN} · ${EXTIPO[q.tipo]}</span>${exPrompt(q)}
 <div class="opts${q.tipo==="vf"?" optsvf":""}">${it.ord.map(k=>`<button class="opt${it.ans!=null?(k===q.a?" right":k===it.ans?" wrong":""):""}" data-exo="${k}" ${it.ans!=null?"disabled":""}>${esc(q.o[k])}</button>`).join("")}</div>
 ${it.ans!=null?`<div class="fb ${it.ans===q.a?"ok":"no"}"><b>${it.ans===q.a?"Certo!":"Não foi dessa vez."}</b>${it.ans!==q.a?`<span>Resposta: <b>${esc(q.o[q.a])}</b></span>`:""}<span>${esc(q.x)}</span></div>
  <button class="btn primary" id="exNext">${R.i+1<R.qs.length?"Próxima →":"Ver resultado"}</button>`:""}</div>`;
 box.innerHTML=h;tokenize(box);
 if(tx){const a=box.querySelector(".exaud");if(a)audioAttach(a,[{el:box.querySelector(".exparas"),text:tx.texto.replace(/—/g,"")}])}
 $("#exQuit").onclick=()=>{audioStop();EX.run=null;renderExerc();window.scrollTo(0,0)};
 $$("#exBox [data-exo]").forEach(b=>b.onclick=()=>{if(it.ans!=null)return;it.ans=+b.dataset.exo;exRecord(q,it.ans===q.a);renderExRun()});
 if($("#exNext"))$("#exNext").onclick=()=>{audioStop();R.i++;renderExRun();window.scrollTo(0,0)}}
function renderExEnd(){const R=EX.run,ok=R.qs.filter(x=>x.ans===x.q.a).length,n=R.qs.length,wrong=R.qs.filter(x=>x.ans!==x.q.a);
 if(!R.logged){R.logged=1;logInc("e");logEvento("exercicio",EX.lvl+":"+R.cat);save();renderHome()}
 $("#exBox").innerHTML=`<div class="card stack"><span class="label">Resultado</span><h2>${ok}/${n} · ${Math.round(ok/n*100)}%</h2><p class="muted small">${ok===n?"Tudo certo!":ok>=n*.7?"Muito bem. As erradas ficam guardadas para você refazer.":"As erradas ficam guardadas: use “Refazer erradas” para treinar de novo."}</p>
  ${wrong.length?`<div class="stack" style="gap:8px">${wrong.map(x=>`<div class="exwrong"><div class="small ${x.q.tipo==="comp"||x.q.tipo==="it"?"it":""}">${esc(x.q.q)}</div><div class="small">Certa: <b>${esc(x.q.o[x.q.a])}</b></div></div>`).join("")}</div>`:""}
  <div class="row"><button class="btn primary" id="exAgain">Nova rodada</button>${wrong.length?`<button class="btn" id="exRedo">Refazer as erradas</button>`:""}<button class="btn ghost" id="exBack">Voltar</button></div></div>`;
 tokenize($("#exBox"));
 $("#exAgain").onclick=()=>exStart(R.cat,false);$("#exBack").onclick=()=>{EX.run=null;renderExerc();window.scrollTo(0,0)};
 if($("#exRedo"))$("#exRedo").onclick=()=>{EX.run={cat:R.cat,i:0,qs:shuffle(wrong.map(x=>({q:x.q,ord:x.q.tipo==="vf"?[0,1]:shuffle(x.q.o.map((_,i)=>i)),ans:null})))};renderExRun();window.scrollTo(0,0)}}

/* ---------- um texto com as suas perguntas na mesma tela ---------- */
function exOpenText(id){EX.tx=EXTX[id];EX.txAns[id]=EX.txAns[id]||{ans:{},ord:{}};window.scrollTo(0,0);renderExText()}
function renderExText(){const t=EX.tx,box=$("#exBox"),st=EX.txAns[t.id],qs=EXQ.filter(q=>q.tx===t.id),list=Object.values(EXTX).filter(x=>x.nivel===t.nivel),i=list.indexOf(t),nx=list[i+1];
 const right=qs.filter(q=>st.ans[q.id]===q.a).length,answered=Object.keys(st.ans).length;
 box.innerHTML=`<button class="back" id="exTxBack">← Exercícios</button>
 <div class="tophead"><span class="label">${t.nivel} · Interpretação · texto ${i+1} de ${list.length}</span><h2 class="lettit">${esc(t.titulo)}</h2></div>
 ${exTextBox(t,true)}
 <div class="row" style="justify-content:space-between"><h3>Perguntas</h3><div class="row" style="gap:8px"><span class="chip${right===qs.length?" hot":""}">${right}/${qs.length}</span>${answered?`<button class="btn ghost small" id="exTxClear">Limpar</button>`:""}</div></div>
 ${qs.map((q,k)=>{if(!st.ord[q.id])st.ord[q.id]=q.tipo==="vf"?[0,1]:shuffle(q.o.map((_,j)=>j));const a=st.ans[q.id];
  return`<div class="qz"><span class="qn">Pergunta ${k+1} de ${qs.length} · ${EXTIPO[q.tipo]}</span>${exPrompt(q)}<div class="opts${q.tipo==="vf"?" optsvf":""}">${st.ord[q.id].map(j=>`<button class="opt${a!=null?(j===q.a?" right":j===a?" wrong":""):""}" data-txq="${q.id}" data-j="${j}" ${a!=null?"disabled":""}>${esc(q.o[j])}</button>`).join("")}</div>${a!=null?`<div class="fb ${a===q.a?"ok":"no"}"><b>${a===q.a?"Certo!":"Resposta: "+esc(q.o[q.a])}</b><span>${esc(q.x)}</span></div>`:""}</div>`}).join("")}
 ${answered===qs.length?`<div class="fb ${right===qs.length?"ok":"no"}"><b>${right}/${qs.length} certas.</b>${right<qs.length?"<span>Releia o texto e toque em “Limpar” para tentar de novo.</span>":""}</div>`:""}
 <div class="row" style="justify-content:space-between">${list[i-1]?`<button class="btn" data-extx="${list[i-1].id}">← Anterior</button>`:"<span></span>"}${nx?`<button class="btn" data-extx="${nx.id}">Próximo →</button>`:"<span></span>"}</div>`;
 tokenize(box);const a=box.querySelector(".exaud");if(a)audioAttach(a,[{el:box.querySelector(".exparas"),text:t.texto.replace(/—/g,"")}]);
 $("#exTxBack").onclick=()=>{audioStop();EX.tx=null;EX.showTexts=true;renderExerc();window.scrollTo(0,0)};
 if($("#exTxClear"))$("#exTxClear").onclick=()=>{EX.txAns[t.id]={ans:{},ord:{}};renderExText()};
 $$("#exBox [data-extx]").forEach(b=>b.onclick=()=>{audioStop();exOpenText(b.dataset.extx)});
 $$("#exBox [data-txq]").forEach(b=>b.onclick=()=>{const q=EXQI[b.dataset.txq];if(st.ans[q.id]!=null)return;st.ans[q.id]=+b.dataset.j;exRecord(q,st.ans[q.id]===q.a);
  if(Object.keys(st.ans).length===qs.length){logInc("e");logEvento("exercicio",t.id)}
  const y=window.scrollY;renderExText();window.scrollTo(0,y)})}
