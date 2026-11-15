/* ============================ V3: NÚCLEO (caderno de erros, rodadas, sorteio com semente) ============================ */
// Tudo aqui é de tocar: múltipla escolha, blocos para montar a frase e cartões. Nenhum campo de texto.
// Formato de uma questão de marcar usada nas rodadas (item "mc"):
//  {id, k:"mc", cat:"gram"|"voc"|"leit"|"esc"|"dia", lbl (rótulo curto), p (enunciado), pit (enunciado em italiano, tocável),
//   o:[opções], a (índice da certa), x (explicação), say (texto para tocar), hide (o enunciado só aparece depois da resposta),
//   pt (tradução mostrada depois), ctx (texto de apoio), let (id de uma leitura para mostrar como apoio)}
// Item "ord": um item de Montar a frase (ORDI[id]); item "card": um cartão do baralho (id do cartão).

/* ---------- utilidades ---------- */
function profId(){try{return typeof CURP!=="undefined"&&CURP?CURP.id:"eu"}catch(e){return"eu"}}
function profName(){try{return typeof CURP!=="undefined"&&CURP?CURP.name:""}catch(e){return""}}
function seedRng(str){let h=1779033703^str.length;for(let i=0;i<str.length;i++){h=Math.imul(h^str.charCodeAt(i),3432918353);h=h<<13|h>>>19}
 let a=h>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function shuffleR(a,r){a=a.slice();for(let i=a.length-1;i>0;i--){const j=r()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a}
// junta blocos de palavras numa frase: sem espaço antes de pontuação nem depois de apóstrofo
function joinBlocks(bs){let s="";bs.forEach((b,i)=>{if(i&&!/^[?!.,;:»)]/.test(b)&&!/['’]$/.test(bs[i-1]))s+=" ";s+=b});return s}
// Revisão do italiano pela professora (folha gerada por tools/revisao_italiano.js): ao aplicar as correções pelos ids, registrar a data aqui.
const REVISAO_IT={data:"",folha:"tools/revisao_italiano.csv"};
const CATN={gram:"Gramática",voc:"Vocabulário",leit:"Leitura",esc:"Escuta",dia:"Diálogos"};

/* ---------- tela cheia (Caffè, busca e consultas) ---------- */
function v3Open(titulo,onClose){let ov=$("#v3Ov");if(!ov){ov=document.createElement("div");ov.id="v3Ov";ov.className="v3ov";ov.setAttribute("role","dialog");ov.setAttribute("aria-modal","true");document.body.appendChild(ov)}
 ov.innerHTML=`<div class="v3bar"><span class="label" id="v3Tit"></span><button class="btn small" id="v3X">Fechar ✕</button></div><div class="v3in stack" id="v3Box" style="gap:16px"></div>`;
 $("#v3Tit").textContent=titulo;ov.hidden=false;document.documentElement.classList.add("noscroll");ov.scrollTop=0;
 $("#v3X").onclick=()=>{v3Close();if(onClose)onClose()};return $("#v3Box")}
function v3Close(){const ov=$("#v3Ov");if(!ov||ov.hidden)return;try{audioStop();sayStop()}catch(e){}ov.hidden=true;ov.innerHTML="";document.documentElement.classList.remove("noscroll");if(RN.cur&&RN.cur.box==="#v3Box")RN.cur=null}
function v3Top(){const ov=$("#v3Ov");if(ov&&!ov.hidden)ov.scrollTop=0;else window.scrollTo(0,0)}

/* ============================ CADERNO DE ERROS ============================ */
// Por perfil em S.erros: { <idQuestao>: {idQuestao, tipo, origem, data, acertosSeguidos, ult (dia do último acerto), q (a questão, para refazer)} }
// A questão sai do caderno depois de 2 acertos em dias diferentes; um erro novo zera a contagem.
function errSnap(it){if(it.k==="ord")return{k:"ord",id:it.id};const o={k:"mc",p:it.p,pit:!!it.pit,o:it.o.slice(),a:it.a,x:it.x||""};
 ["say","hide","pt","lbl","ctx","let"].forEach(k=>{if(it[k])o[k]=it[k]});return o}
function errAnswer(it,ok,origem){try{if(!it)return;const id=it.eid||it.id;if(!id)return;S.erros=S.erros||{};const e=S.erros[id],t=today();
 if(!ok){S.erros[id]={idQuestao:id,tipo:it.cat||"gram",origem:origem||it.origem||"",data:e?e.data:t,acertosSeguidos:0,ult:"",q:errSnap(it)};save();errBadge();return}
 if(!e||e.ult===t)return;e.acertosSeguidos=(e.acertosSeguidos||0)+1;e.ult=t;if(e.acertosSeguidos>=2)delete S.erros[id];save();errBadge()}catch(x){}}
function errList(tipo){return Object.values(S.erros||{}).filter(e=>e&&e.q&&(!tipo||e.tipo===tipo)).sort((a,b)=>(a.data||"").localeCompare(b.data||"")||(a.idQuestao>b.idQuestao?1:-1))}
function errN(){return errList().length}
function errItem(e){const q=e.q;if(q.k==="ord"){const o=ORDI[q.id];return o?Object.assign({k:"ord",cat:e.tipo,eid:e.idQuestao},o):null}
 return Object.assign({},q,{id:e.idQuestao,cat:e.tipo,k:"mc"})}
function errBadge(){$$("[data-errn]").forEach(el=>el.textContent=errN())}
function errRound(box,onBack,tipo){const its=errList(tipo).slice(0,10).map(errItem).filter(Boolean);if(!its.length)return false;
 rnStart({box,titulo:"Rever meus erros",items:its,origem:"caderno",onQuit:onBack,again:()=>errRound(box,onBack,tipo)||onBack()});return true}
const ERRV={tipo:""};
function renderErrList(box,onBack){const all=errList(),tipos=[...new Set(all.map(e=>e.tipo))],list=errList(ERRV.tipo);
 $(box).innerHTML=`<button class="back" id="erBack">← Voltar</button>
 <div class="tophead"><span class="label">Caderno de erros</span><h2>${all.length} ${all.length===1?"questão":"questões"} para rever</h2><p class="muted small">Cada questão sai daqui depois de 2 acertos em dias diferentes.</p></div>
 ${all.length?`<div class="row"><button class="btn primary" id="erGo">Rever ${ERRV.tipo?CATN[ERRV.tipo].toLowerCase()+" ":""}(${Math.min(10,list.length)})</button></div>
 <div class="chips" role="tablist" aria-label="Filtrar por tipo"><button class="chip${ERRV.tipo?"":" hot"}" data-ert="">Todos (${all.length})</button>${Object.keys(CATN).filter(k=>tipos.includes(k)).map(k=>`<button class="chip${ERRV.tipo===k?" hot":""}" data-ert="${k}">${CATN[k]} (${all.filter(e=>e.tipo===k).length})</button>`).join("")}</div>
 <div class="stack" style="gap:8px">${list.map(e=>{const q=e.q,txt=q.k==="ord"?(ORDI[q.id]?ORDI[q.id].pt:"(frase)"):q.hide?"(escuta) "+(q.say||""):q.p;
  return`<div class="exwrong"><div class="small${q.pit?" it":""}">${esc(txt)}</div><div class="small muted">${CATN[e.tipo]||e.tipo} · desde ${fmtBR(e.data)} · ${e.acertosSeguidos?e.acertosSeguidos+" acerto, falta 1":"0 de 2 acertos"}</div></div>`}).join("")}</div>`
 :`<div class="card"><p>Nenhum erro guardado. Quando você errar uma questão, ela aparece aqui para treinar de novo.</p></div>`}`;
 tokenize($(box));$("#erBack").onclick=onBack;
 if($("#erGo"))$("#erGo").onclick=()=>errRound(box,()=>renderErrList(box,onBack),ERRV.tipo);
 $$(box+" [data-ert]").forEach(b=>b.onclick=()=>{ERRV.tipo=b.dataset.ert;renderErrList(box,onBack)})}

/* ============================ RODADAS (motor comum) ============================ */
// rnStart({box:"#seletor", titulo, items, prova (sem correção até o fim), origem, onQuit, onEnd(res) (tela final própria), again})
const RN={cur:null};
function rnStart(cfg){audioStop();RN.cur=Object.assign({i:0,res:[]},cfg);RN.cur.items=cfg.items.map(it=>Object.assign({},it));
 RN.cur.items.forEach(it=>{if(it.k==="mc")it.ord=it.fixa?it.o.map((_,i)=>i):shuffle(it.o.map((_,i)=>i));if(it.k==="ord"){it.pool=shuffle([...it.blocos,...(it.extras||[])].map((w,i)=>({w,i})));it.sel=[]}});
 v3Top();rnRender()}
function rnSay(t,slow){audioPause();sayIt(t,{rate:slow?.75:1})}
function rnHead(R,it){return`<div class="row" style="justify-content:space-between"><button class="back" id="rnQuit">← Sair</button><span class="chip">${R.i+1} de ${R.items.length}</span></div>
 <div class="lvlbar"><i style="width:${R.i/R.items.length*100}%"></i></div>`}
function rnRender(){const R=RN.cur;if(!R)return;const box=$(R.box);if(!box){RN.cur=null;return}
 if(R.i>=R.items.length)return rnEnd();const it=R.items[R.i];
 if(it.k==="card")return rnCard(box,R,it);if(it.k==="ord")return rnOrd(box,R,it);
 const done=it.ans!=null,show=done&&!R.prova,lt=it.let&&typeof LETI!=="undefined"?LETI[it.let]:null;
 let h=rnHead(R,it)+`<div class="qz exqz"><span class="qn">${esc(it.lbl||CATN[it.cat]||"")}</span>
 ${it.ctx?`<div class="card stack extext"><p class="it exparas">${esc(it.ctx).replace(/ — /g,"<br>— ")}</p></div>`:""}
 ${lt?`<details class="exs"><summary><span class="small">Reler o texto “${esc(lt.titulo)}”</span></summary><p class="it" style="padding:0 14px 12px">${esc(String(lt.versoes.base||"").replace(/\n/g," "))}</p></details>`:""}
 ${it.say?`<div class="row rnaud"><button class="btn primary" id="rnPlay">${SPK_SVG} Ouvir de novo</button><button class="btn" id="rnSlow">Mais devagar</button></div>`:""}
 ${it.hide&&!done?"":it.p?`<div class="qq exq${it.pit?" it":""}">${esc(it.p).replace(/___/g,'<span class="exgap">___</span>')}</div>`:""}
 ${it.hide&&done&&it.say?`<div class="qq exq it">${esc(it.say)}</div>${it.pt&&!R.prova?`<p class="small muted">${esc(it.pt)}</p>`:""}`:""}
 <div class="opts${it.o.length===2?" optsvf":""}">${it.ord.map(k=>`<button class="opt${show?(k===it.a?" right":k===it.ans?" wrong":""):done&&k===it.ans?" picked":""}" data-rno="${k}" ${done?"disabled":""}>${esc(it.o[k])}</button>`).join("")}</div>
 ${show?`<div class="fb ${it.ans===it.a?"ok":"no"}"><b>${it.ans===it.a?"Certo!":"Não foi dessa vez."}</b>${it.ans!==it.a?`<span>Resposta: <b>${esc(it.o[it.a])}</b></span>`:""}${it.x?`<span>${esc(it.x)}</span>`:""}${it.pt&&!it.hide?`<span class="muted">${esc(it.pt)}</span>`:""}</div>`:""}
 ${done?`<button class="btn primary" id="rnNext">${R.i+1<R.items.length?"Próxima →":R.prova?"Ver o resultado":"Ver resultado"}</button>`:""}</div>`;
 box.innerHTML=h;tokenize(box);
 $("#rnQuit").onclick=()=>{audioStop();sayStop();const q=R.onQuit;RN.cur=null;if(q)q()};
 if(it.say){const p=$("#rnPlay"),s=$("#rnSlow");p.onclick=()=>rnSay(it.say);s.onclick=()=>rnSay(it.say,true);if(!done&&!it.played){it.played=1;rnSay(it.say)}}
 $$(R.box+" [data-rno]").forEach(b=>b.onclick=()=>{if(it.ans!=null)return;it.ans=+b.dataset.rno;const ok=it.ans===it.a;R.res[R.i]={it,ok};
  if(!R.prova)errAnswer(it,ok,R.origem);if(R.prova){R.i++;v3Top();rnRender();return}rnRender()});
 if($("#rnNext"))$("#rnNext").onclick=()=>{audioStop();R.i++;v3Top();rnRender()}}

/* ---------- Montar a frase ---------- */
function ordNorm(a){return a.map(w=>w.toLowerCase().replace(/’/g,"'")).join(" ")}
function ordOk(it,sel){const s=ordNorm(sel);return(it.aceitas||[it.blocos]).some(a=>ordNorm(a)===s)}
function rnOrd(box,R,it){const done=it.ans!=null,show=done&&!R.prova,sel=it.sel.map(i=>it.pool.find(p=>p.i===i).w);
 let h=rnHead(R,it)+`<div class="qz exqz"><span class="qn">Montar a frase · ${esc(it.nivel||"")}</span>
 <div class="qq exq">${esc(it.pt)}</div>
 <div class="ordline${done?(show?(it.ans?" ok":" no"):""):""}" aria-label="Sua frase">${sel.length?it.sel.map(i=>`<button class="ordb in" data-ordout="${i}" ${done?"disabled":""}>${esc(it.pool.find(p=>p.i===i).w)}</button>`).join(""):`<span class="small muted">Toque nos blocos na ordem certa.</span>`}</div>
 <div class="ordpool">${it.pool.map(p=>it.sel.includes(p.i)?`<span class="ordb ghost" aria-hidden="true">${esc(p.w)}</span>`:`<button class="ordb" data-ordin="${p.i}" ${done?"disabled":""}>${esc(p.w)}</button>`).join("")}</div>
 ${!done?`<div class="row"><button class="btn primary" id="ordCheck" ${sel.length?"":"disabled"}>Conferir</button>${sel.length?`<button class="btn ghost" id="ordClear">Limpar</button>`:""}</div>`:""}
 ${show?`<div class="fb ${it.ans?"ok":"no"}"><b>${it.ans?"Certo!":"Ainda não."}</b>${it.ans?"":`<span>Uma ordem certa: <b class="it">${esc(joinBlocks(it.aceitas[0]))}</b></span>`}${(it.aceitas||[]).length>1?`<span class="small">Também vale: ${it.aceitas.slice(it.ans?0:1).filter(a=>ordNorm(a)!==ordNorm(sel)).map(a=>"«"+esc(joinBlocks(a))+"»").join(" · ")}</span>`:""}${it.x?`<span>${esc(it.x)}</span>`:""}
  <div class="row" style="gap:8px;flex-wrap:nowrap"><i class="it" style="flex:1">${esc(joinBlocks(it.ans?sel:it.aceitas[0]))}</i>${spkBtn(joinBlocks(it.ans?sel:it.aceitas[0]))}</div></div>`:""}
 ${done?`<button class="btn primary" id="rnNext">${R.i+1<R.items.length?"Próxima →":"Ver resultado"}</button>`:""}</div>`;
 box.innerHTML=h;
 $("#rnQuit").onclick=()=>{audioStop();const q=R.onQuit;RN.cur=null;if(q)q()};
 $$(R.box+" [data-ordin]").forEach(b=>b.onclick=()=>{it.sel.push(+b.dataset.ordin);rnOrd(box,R,it)});
 $$(R.box+" [data-ordout]").forEach(b=>b.onclick=()=>{it.sel=it.sel.filter(i=>i!==+b.dataset.ordout);rnOrd(box,R,it)});
 if($("#ordClear"))$("#ordClear").onclick=()=>{it.sel=[];rnOrd(box,R,it)};
 if($("#ordCheck"))$("#ordCheck").onclick=()=>{const ok=ordOk(it,sel);it.ans=ok;R.res[R.i]={it,ok};
  if(!R.prova){errAnswer(it,ok,R.origem);if(ok)speak(joinBlocks(sel))}if(R.prova){R.i++;v3Top();rnRender();return}rnOrd(box,R,it)};
 if($("#rnNext"))$("#rnNext").onclick=()=>{audioStop();R.i++;v3Top();rnRender()}}

/* ---------- cartão do baralho (usado no Caffè con la Nonna) ---------- */
function rnCard(box,R,it){if(!CARDS[it.id]){R.i++;return rnRender()}if(!SESSION)buildSession();
 const f=cardFace(it.id),c=CARDS[it.id];
 box.innerHTML=rnHead(R,it)+`<div class="flash"><span class="deck label">${esc(DECKS[c.deck]||"")}</span>${spkBtn(f.say)}<span class="label">${esc(f.sub||"")}</span>
 <div class="front">${f.blank?blankify(f.front):esc(f.front)}</div>${it.shown?`<div class="back"><b>${esc(f.back)}</b>${f.note?`<div class="note">${esc(f.note)}</div>`:""}</div>`:""}</div>
 ${it.shown?`<div class="rate">${[["r0",0,"Errei"],["",1,"Difícil"],["",2,"Bom"],["r3",3,"Fácil"]].map(([cl,r,l])=>`<button class="${cl}" data-rnr="${r}">${l}<span>${intervalLabel(it.id,r)}</span></button>`).join("")}</div>`:`<button class="btn primary" id="rnRev">Mostrar resposta</button>`}`;
 $("#rnQuit").onclick=()=>{audioStop();const q=R.onQuit;RN.cur=null;if(q)q()};
 if($("#rnRev"))$("#rnRev").onclick=()=>{it.shown=true;rnCard(box,R,it);if(!f.sayFront)speak(f.say)};
 $$(R.box+" [data-rnr]").forEach(b=>b.onclick=()=>{const r=+b.dataset.rnr;logInc("c");S.cards[it.id]=sched(S.cards[it.id],r);logEvento("revisao",it.id);S.daily.reviewed++;
  const t=today();if(S.streak.last!==t){S.streak.count=S.streak.last===addDays(-1)?S.streak.count+1:1;S.streak.last=t}save();
  R.res[R.i]={it,ok:r>0};if(r===0&&!it.again){R.items.splice(Math.min(R.i+4,R.items.length),0,{k:"card",id:it.id,again:1})}R.i++;v3Top();rnRender()})}

/* ---------- fim da rodada ---------- */
function rnEnd(){const R=RN.cur,box=$(R.box);const scored=R.res.filter(x=>x&&x.it.k!=="card"),ok=scored.filter(x=>x.ok).length,n=scored.length;
 if(!R.logged){R.logged=1;if(n){logInc("e");logEvento("exercicio",(R.origem||"rodada")+":"+(R.tag||""))}save();try{renderHome()}catch(e){}}
 if(R.onEnd){R.onEnd(R);return}
 const wrong=scored.filter(x=>!x.ok);
 box.innerHTML=`<div class="card stack"><span class="label">${esc(R.titulo||"Resultado")}</span><h2>${n?ok+"/"+n+" · "+Math.round(ok/n*100)+"%":"Pronto!"}</h2>
 <p class="muted small">${!n?"":ok===n?"Tudo certo!":"As erradas foram para o caderno de erros."}</p>
 ${wrong.length?`<div class="stack" style="gap:8px">${wrong.map(x=>`<div class="exwrong"><div class="small${x.it.pit||x.it.k==="ord"?" it":""}">${esc(x.it.k==="ord"?x.it.pt:x.it.hide?x.it.say:x.it.p)}</div><div class="small">Certa: <b>${esc(x.it.k==="ord"?joinBlocks(x.it.aceitas[0]):x.it.o[x.it.a])}</b></div></div>`).join("")}</div>`:""}
 <div class="row">${R.again?`<button class="btn primary" id="rnAgain">Nova rodada</button>`:""}<button class="btn ghost" id="rnBack">Voltar</button></div></div>`;
 tokenize(box);if($("#rnAgain"))$("#rnAgain").onclick=()=>{const a=R.again;RN.cur=null;a()};
 $("#rnBack").onclick=()=>{const q=R.onQuit;RN.cur=null;if(q)q()}}

/* ---------- ganchos nos exercícios que já existiam ---------- */
function exItemOf(q){const tx=q.tx&&EXTX[q.tx];return{id:q.id,k:"mc",cat:q.cat==="int"?"leit":q.cat,lbl:q.nivel+" · "+((EXCATS.find(c=>c[0]===q.cat)||[])[1]||"")+" · "+EXTIPO[q.tipo],p:q.q,pit:q.tipo==="comp"||q.tipo==="it",o:q.o,a:q.a,x:q.x,ctx:tx?tx.texto:"",fixa:q.tipo==="vf"}}
function curItemOf(q){const right=qAns(q),c=qCat(q);return{id:"cur:"+hashStr(q.q+"|"+right),k:"mc",cat:c==="voc"?"voc":c==="list"?"esc":"gram",lbl:"Curso",p:q.type==="lm"?"":q.q,pit:!q.voc,o:q.opts.slice(),a:q.opts.indexOf(right),x:q.exp||"",say:q.type==="lf"||q.type==="lm"?q.say:"",hide:q.type==="lm"?1:0}}
