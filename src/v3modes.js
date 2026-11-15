/* ============================ V3: MODOS DA ABA EXERCÍCIOS E UNIDADES EXTRAS DO CURSO ============================ */
// Progresso por perfil: S.escuta, S.ordem ({id: {r, n, ok}}), S.dialogos ({id: {best, done, n}}), S.simulados ({A1: [tentativas], A2: [...]}).
// Falsos amigos e Cantiere guardam a melhor nota em S.course["fa-…"] / S.course["ct-…"].

function v3Stat(key,id){return((S[key]||{})[id])||null}
function v3Rec(key,id,ok){S[key]=S[key]||{};const s=S[key][id]=S[key][id]||{r:0,n:0,ok:0};s.n++;s.r=ok?1:0;if(ok)s.ok++}
function v3Pick(list,key,n){const st=x=>v3Stat(key,x.id),nunca=shuffle(list.filter(x=>!st(x))),err=shuffle(list.filter(x=>st(x)&&!st(x).r)),ok=shuffle(list.filter(x=>st(x)&&st(x).r));return[...nunca,...err,...ok].slice(0,n)}
// o motor de rodadas chama isto a cada resposta quando cfg.stat existe
const _rnStatHook=errAnswer;
errAnswer=function(it,ok,origem){_rnStatHook(it,ok,origem);try{const R=RN.cur;if(R&&R.stat&&it&&!R.prova){v3Rec(R.stat,it.eid||it.id,ok);save()}}catch(e){}};

/* ---------- hub no topo da aba Exercícios ---------- */
const V3MODES=[["erros","Rever meus erros","Questões que você errou, as mais antigas primeiro"],["escuta","Escuta","Ouça e marque: frases, pares que confundem e sentido"],["ordem","Montar a frase","Toque nos blocos na ordem certa"],["dialogos","Diálogos com escolha","Escolha a resposta certa, no registro certo"],["verbos","Verbos","Consulta de 40 verbos e treino de marcar"],["simulado","Simulado","30 questões por nível, sem correção durante a prova"]];
function v3HubHTML(){const n=errN();return`<div class="v3hub">${V3MODES.map(([k,t,d])=>`<button class="v3tile${k==="erros"&&n?" hot":""}" data-v3mode="${k}"><b>${t}${k==="erros"?` <span class="chip${n?" hot":""}" data-errn>${n}</span>`:""}</b><span>${d}</span></button>`).join("")}</div>
 ${n?`<button class="btn ghost small" data-v3list>Ver a lista do caderno de erros</button>`:""}<h3 class="v3sub">Banco de questões</h3>`}
function v3HubBind(){$$("#exBox [data-v3mode]").forEach(b=>b.onclick=()=>v3Mode(b.dataset.v3mode));$$("#exBox [data-v3list]").forEach(b=>b.onclick=()=>{EX.mode="erros";window.scrollTo(0,0);renderErrList("#exBox",v3Back)})}
function v3Mode(m){EX.mode=m;window.scrollTo(0,0);if(m==="erros"&&errN()){errRound("#exBox",()=>renderErrList("#exBox",v3Back));return}renderExerc()}
function v3Back(){EX.mode=null;RN.cur=null;DL.cur=null;window.scrollTo(0,0);renderExerc()}
function v3RenderMode(){if(RN.cur&&RN.cur.box==="#exBox")return rnRender();
 const m=EX.mode;if(m==="erros"){if(!errN()){renderErrList("#exBox",v3Back);return}renderErrList("#exBox",v3Back);return}
 if(m==="escuta")return renderEscuta();if(m==="ordem")return renderOrdem();if(m==="dialogos")return DL.cur?renderDlg():renderDlgList();
 if(m==="verbos")return renderVerbi();if(m==="simulado")return renderSimHome();v3Back()}
function v3LvlSeg(){return`<div class="seg seg2" id="v3Lvl" role="tablist" aria-label="Nível">${["A1","A2"].map(l=>`<button role="tab" data-v3lvl="${l}" class="${EX.lvl===l?"on":""}" aria-selected="${EX.lvl===l}">Nível ${l}</button>`).join("")}</div>`}
function v3LvlBind(fn){$$("#v3Lvl [data-v3lvl]").forEach(b=>b.onclick=()=>{EX.lvl=b.dataset.v3lvl;try{localStorage.setItem(KEY+".exlvl",EX.lvl)}catch(e){}fn()})}
function v3Counts(list,key){let ok=0,wrong=0;list.forEach(x=>{const s=v3Stat(key,x.id);if(s)s.r?ok++:wrong++});return{ok,wrong,seen:ok+wrong,tot:list.length}}
function v3ModeHead(t,sub){return`<button class="back" id="v3Back">← Exercícios</button><div class="tophead"><span class="label">Exercícios</span><h2>${t}</h2><p class="muted small">${sub}</p></div>`}

/* ---------- Escuta ---------- */
const ESC={fmt:""};
function renderEscuta(){const box=$("#exBox"),all=ASC.filter(x=>x.nivel===EX.lvl),list=all.filter(x=>!ESC.fmt||x.formato===ESC.fmt),c=v3Counts(all,"escuta");
 box.innerHTML=v3ModeHead("Escuta (Ascolto)","Toque para ouvir e marque. Use “Ouvir de novo” e “Mais devagar” quantas vezes quiser.")+v3LvlSeg()+`
 <div class="card stack" style="gap:8px"><div class="row" style="justify-content:space-between"><span class="label">Nível ${EX.lvl} · ${all.length} itens</span><span class="chip${c.seen?" hot":""}">${c.ok} certos</span></div>
 <div class="lvlbar"><i style="width:${c.ok/all.length*100}%"></i></div>
 <div class="chips">${[["","Todos"],...Object.entries(ASC_FMT)].map(([k,n])=>`<button class="chip${ESC.fmt===k?" hot":""}" data-escf="${k}">${n} (${all.filter(x=>!k||x.formato===k).length})</button>`).join("")}</div>
 <div class="row"><button class="btn primary" id="escGo">Rodada de 10</button>${c.wrong?`<button class="btn" id="escWrong">Refazer erradas (${c.wrong})</button>`:""}</div></div>
 <div class="card stack" style="gap:6px"><span class="label">Os três formatos</span><p class="small"><b>O que você ouviu?</b> Três frases escritas que mudam num ponto só.</p><p class="small"><b>Pares que confundem:</b> e/è, pena/penna, casa/cassa, sono/sonno, anno/hanno, capello/cappello, nono/nonno.</p><p class="small"><b>O que significa?</b> Três traduções em português.</p></div>`;
 $("#v3Back").onclick=v3Back;v3LvlBind(renderEscuta);
 $$("#exBox [data-escf]").forEach(b=>b.onclick=()=>{ESC.fmt=b.dataset.escf;renderEscuta()});
 const go=only=>{let l=list;if(only)l=l.filter(x=>v3Stat("escuta",x.id)&&!v3Stat("escuta",x.id).r);const its=(only?shuffle(l):v3Pick(l,"escuta",10)).slice(0,10).map(ascItem);if(!its.length)return;
  rnStart({box:"#exBox",titulo:"Escuta "+EX.lvl,items:its,origem:"escuta",stat:"escuta",tag:EX.lvl,onQuit:renderEscuta,again:()=>go(false)})};
 $("#escGo").onclick=()=>go(false);if($("#escWrong"))$("#escWrong").onclick=()=>go(true)}

/* ---------- Montar a frase ---------- */
function renderOrdem(){const box=$("#exBox"),all=ORD.filter(x=>x.nivel===EX.lvl),c=v3Counts(all,"ordem");
 box.innerHTML=v3ModeHead("Montar a frase","Leia a frase em português e toque nos blocos em italiano na ordem certa. Tocar num bloco já colocado o devolve."+(EX.lvl==="A2"?" No A2 há blocos a mais, de distração.":""))+v3LvlSeg()+`
 <div class="card stack" style="gap:8px"><div class="row" style="justify-content:space-between"><span class="label">Nível ${EX.lvl} · ${all.length} frases</span><span class="chip${c.seen?" hot":""}">${c.ok} certas</span></div>
 <div class="lvlbar"><i style="width:${c.ok/all.length*100}%"></i></div>
 <div class="row"><button class="btn primary" id="ordGo">Rodada de 10</button>${c.wrong?`<button class="btn" id="ordWrong">Refazer erradas (${c.wrong})</button>`:""}</div>
 <p class="small muted">Quando o italiano admite mais de uma ordem, todas as ordens certas valem.</p></div>`;
 $("#v3Back").onclick=v3Back;v3LvlBind(renderOrdem);
 const go=only=>{let l=all;if(only)l=l.filter(x=>v3Stat("ordem",x.id)&&!v3Stat("ordem",x.id).r);const its=(only?shuffle(l):v3Pick(l,"ordem",10)).slice(0,10).map(ordItem);if(!its.length)return;
  rnStart({box:"#exBox",titulo:"Montar a frase "+EX.lvl,items:its,origem:"ordem",stat:"ordem",tag:EX.lvl,onQuit:renderOrdem,again:()=>go(false)})};
 $("#ordGo").onclick=()=>go(false);if($("#ordWrong"))$("#ordWrong").onclick=()=>go(true)}

/* ---------- Diálogos com escolha ---------- */
const DL={cur:null,i:0,picks:[],ord:[]};
const NONNA_MINI='<span class="dlnonna" aria-hidden="true">N</span>';
function dlgDone(id){const r=(S.dialogos||{})[id];return r&&r.done?r:null}
function renderDlgList(){const box=$("#exBox"),done=DIA.filter(d=>dlgDone(d.id)).length;
 box.innerHTML=v3ModeHead("Diálogos com escolha","Cenas curtas de trabalho. A cada fala, escolha a resposta: uma é certa, uma erra no sentido e outra acerta o sentido mas erra o registro (tu × Lei).")+`
 <div class="row" style="justify-content:space-between"><span class="label">${done} de ${DIA.length} cenas feitas</span></div>
 <div class="tlist">${DIA.map((d,i)=>{const r=dlgDone(d.id);return`<button class="tcard${r?" done":""}" data-dlg="${d.id}"><span class="tn">${r?"✓":i+1}</span><div><h3 class="it" style="font-style:normal">${esc(d.titulo)}</h3><p>${esc(d.pt)} · ${d.nivel} · ${d.registro==="Lei"?"formal (Lei)":"informal (tu)"}</p></div><span class="pill ${r?"ok":""}">${r?r.best+"/"+d.turnos.length:"novo"}</span></button>`}).join("")}</div>`;
 $("#v3Back").onclick=v3Back;$$("#exBox [data-dlg]").forEach(b=>b.onclick=()=>dlgOpen(b.dataset.dlg))}
function dlgOpen(id){DL.cur=DIAI[id];DL.i=0;DL.picks=[];DL.ord=DL.cur.turnos.map(t=>shuffle(t.opcoes.map((_,k)=>k)));window.scrollTo(0,0);renderDlg()}
function dlgMotivo(o,d){if(!o||o.ok)return"";return o.motivo==="registro"?(d.registro==="Lei"?"Registro errado: com esta pessoa cabe Lei (formal). A frase tem o sentido certo, mas soa íntima ou brusca demais.":"Registro errado: aqui o normal é tu (informal). A frase está certa, mas soa distante e cerimoniosa demais.")
 :"Sentido errado: a frase não responde ao que foi dito."}
function renderDlg(){const d=DL.cur,box=$("#exBox"),n=d.turnos.length;if(DL.i>=n)return renderDlgEnd();
 let h=`<button class="back" id="dlBack">← Diálogos</button><div class="tophead"><span class="label">${d.nivel} · ${d.registro==="Lei"?"formal (Lei)":"informal (tu)"} · fala ${DL.i+1} de ${n}</span><h2 class="it lettit">${esc(d.titulo)}</h2><p class="muted small">${esc(d.pt)}</p></div>
 <div class="lvlbar"><i style="width:${DL.i/n*100}%"></i></div><div class="dlgscene">`;
 for(let k=0;k<=DL.i;k++){const t=d.turnos[k],p=DL.picks[k];
  h+=`<div class="ibub ib-o dlb"><span class="ibwho">${esc(d.outro)}</span><span class="it">${esc(t.outro)}</span>${spkBtn(t.outro.replace(/^\(.*?\)\s*/,""))}</div>`;
  if(p!=null&&k<DL.i)h+=`<div class="ibub ib-n dlb dlme"><span class="ibwho">Você</span><span class="it">${esc(t.opcoes.find(o=>o.ok).it)}</span></div>`}
 const t=d.turnos[DL.i],p=DL.picks[DL.i];h+=`</div>`;
 h+=`<div class="qz exqz"><span class="qn">Escolha a sua resposta</span><div class="opts">${DL.ord[DL.i].map(k=>{const o=t.opcoes[k];return`<button class="opt${p!=null?(o.ok?" right":k===p?" wrong":""):""}" data-dlo="${k}" ${p!=null?"disabled":""}>${esc(o.it)}</button>`}).join("")}</div>
 ${p!=null?`<div class="fb ${t.opcoes[p].ok?"ok":"no"}"><div class="row" style="gap:8px;flex-wrap:nowrap;align-items:flex-start">${NONNA_MINI}<div class="stack" style="gap:4px"><b>${t.opcoes[p].ok?"Certo!":"A Nonna explica:"}</b>${t.opcoes[p].ok?"":`<span>${esc(dlgMotivo(t.opcoes[p],d))}</span>`}<span>${esc(t.nota)}</span></div></div></div>
 <button class="btn primary" id="dlNext">${DL.i+1<n?"Continuar →":"Ver o diálogo inteiro"}</button>`:""}</div>`;
 box.innerHTML=h;tokenize(box);
 $("#dlBack").onclick=()=>{audioStop();DL.cur=null;renderDlgList();window.scrollTo(0,0)};
 $$("#exBox [data-dlo]").forEach(b=>b.onclick=()=>{if(DL.picks[DL.i]!=null)return;const k=+b.dataset.dlo;DL.picks[DL.i]=k;const ok=t.opcoes[k].ok;
  errAnswer({id:d.id+"-t"+(DL.i+1),k:"mc",cat:"dia",lbl:"Diálogo · "+d.titulo,p:t.outro,pit:true,o:t.opcoes.map(o=>o.it),a:t.opcoes.findIndex(o=>o.ok),x:t.nota},ok,"dialogos");
  if(ok)speak(t.opcoes[k].it);renderDlg();const f=box.querySelector(".fb");if(f)f.scrollIntoView({block:"nearest",behavior:"smooth"})});
 if($("#dlNext"))$("#dlNext").onclick=()=>{audioStop();DL.i++;renderDlg();const q=box.querySelector(".qz");if(q)q.scrollIntoView({block:"center"})}}
function renderDlgEnd(){const d=DL.cur,box=$("#exBox"),n=d.turnos.length,ok=DL.picks.filter((p,k)=>d.turnos[k].opcoes[p].ok).length;
 if(!DL.logged||DL.logged!==d.id){DL.logged=d.id;S.dialogos=S.dialogos||{};const r=S.dialogos[d.id]=S.dialogos[d.id]||{best:0,done:"",n:0};r.n++;r.best=Math.max(r.best,ok);if(!r.done)r.done=today();logInc("e");logEvento("exercicio","dialogo:"+d.id);save();renderHome()}
 const lines=[];d.turnos.forEach(t=>{lines.push({quem:d.outro,text:t.outro.replace(/^\(.*?\)\s*/,"")});lines.push({quem:"Você",text:t.opcoes.find(o=>o.ok).it})});
 box.innerHTML=`<button class="back" id="dlBack">← Diálogos</button><div class="card stack"><span class="label">${esc(d.titulo)}</span><h2>${ok}/${n} respostas certas</h2><p class="muted small">${ok===n?"Perfeito, inclusive no registro.":"As falas que você errou foram para o caderno de erros."}</p></div>
 <div class="card stack" data-dlfull><span class="label">O diálogo inteiro</span>${audioHTML()}<div class="dlgscene">${lines.map((l,k)=>`<div class="ibub ${k%2?"ib-n dlme":"ib-o"} dlb" data-dll="${k}"><span class="ibwho">${esc(l.quem)}</span><span class="it">${esc(l.text)}</span></div>`).join("")}</div></div>
 <div class="row"><button class="btn primary" id="dlAgain">Fazer de novo</button>${DIA[DIA.indexOf(d)+1]?`<button class="btn" id="dlNextScene">Próxima cena →</button>`:""}</div>`;
 tokenize(box);const full=box.querySelector("[data-dlfull]");audioAttach(full,lines.map((l,k)=>({el:full.querySelector(`[data-dll="${k}"]`),text:l.text})));
 $("#dlBack").onclick=()=>{audioStop();DL.cur=null;renderDlgList();window.scrollTo(0,0)};
 $("#dlAgain").onclick=()=>{audioStop();DL.logged=null;dlgOpen(d.id)};if($("#dlNextScene"))$("#dlNextScene").onclick=()=>{audioStop();DL.logged=null;dlgOpen(DIA[DIA.indexOf(d)+1].id)}}

/* ---------- Verbos: consulta e treino ---------- */
const VERBI40=["essere","avere","parlare","lavorare","mangiare","cercare","pagare","prendere","vedere","leggere","scrivere","mettere","chiudere","chiedere","rispondere","conoscere","dormire","partire","aprire","sentire","finire","capire","preferire","andare","fare","venire","stare","dire","uscire","dare","bere","rimanere","salire","scegliere","tenere","piacere","potere","volere","dovere","sapere"];
const VB_GRUPO={essere:"auxiliar",avere:"auxiliar",parlare:"modelo -are",prendere:"modelo -ere",dormire:"modelo -ire",finire:"modelo -ire (-isc-)",potere:"modal",volere:"modal",dovere:"modal",sapere:"irregular"};
const VBT=["pres","pass","imp","fut","cond"];
const VB={q:"",cur:null,tense:""};
function vbList(){return VERBI40.map(n=>VERBMAP[n]).filter(Boolean)}
function vbGrupo(v){return VB_GRUPO[v.inf]||(IRR_PRES[v.inf]||IRR_FUT[v.inf]?"irregular":/are$/.test(v.inf)?"regular -are":/ere$/.test(v.inf)?"-ere":"-ire")}
function renderVerbi(){const box=$("#exBox");if(VB.cur)return renderVerbo();
 box.innerHTML=v3ModeHead("Verbos","40 verbos com presente, passato prossimo, imperfetto, futuro e condizionale. Treino de marcar com filtro por tempo.")+`
 <div class="card stack" style="gap:10px"><span class="label">Treino de marcar</span><p class="small muted">Ex.: «noi ___ (andare) · presente» com 4 formas. Rodadas de 10.</p>
 <div class="chips">${[["","Todos os tempos"],...VBT.map(k=>[k,TENSES[k].n])].map(([k,n])=>`<button class="chip${VB.tense===k?" hot":""}" data-vbt="${k}">${n}</button>`).join("")}</div>
 <div class="row"><button class="btn primary" id="vbGo">Começar (10)</button></div></div>
 <div class="card stack" style="gap:10px"><span class="label">Consulta</span><input type="search" id="vbQ" placeholder="Buscar em italiano ou português (ex.: andar, scrivere)" value="${esc(VB.q)}" autocomplete="off" enterkeyhint="search">
 <div class="vblist" id="vbList"></div></div>`;
 $("#v3Back").onclick=v3Back;$$("#exBox [data-vbt]").forEach(b=>b.onclick=()=>{VB.tense=b.dataset.vbt;renderVerbi()});
 $("#vbGo").onclick=vbTrain;$("#vbQ").oninput=e=>{VB.q=e.target.value;vbFill()};vbFill()}
function vbFill(){const q=norm(VB.q||""),el=$("#vbList");if(!el)return;const l=vbList().filter(v=>!q||norm(v.inf).includes(q)||norm(v.pt).includes(q));
 el.innerHTML=l.length?l.map(v=>`<button class="vbitem" data-vb="${v.inf}"><b class="it">${esc(v.inf)}</b><span>${esc(v.pt)}</span><small>${esc(vbGrupo(v))}</small></button>`).join(""):`<p class="small muted">Nenhum verbo encontrado.</p>`;
 $$("#vbList [data-vb]").forEach(b=>b.onclick=()=>{VB.cur=VERBMAP[b.dataset.vb];window.scrollTo(0,0);renderVerbi()})}
function renderVerbo(){const v=VB.cur,box=$("#exBox");
 box.innerHTML=`<button class="back" id="vbBack">← Verbos</button><div class="tophead"><span class="label">${esc(vbGrupo(v))}${v.aux?" · auxiliar no passato: "+(v.aux==="e"?"essere":"avere"):""}</span><div class="row" style="gap:8px"><h2 class="it lettit">${esc(v.inf)}</h2>${spkBtn(v.inf)}</div><p class="muted small">${esc(v.pt)}</p></div>
 <div class="vbgrid">${VBT.map(k=>{const f=TENSES[k].f(v);return`<div class="card vbcard"><span class="label">${TENSES[k].n}</span><table class="vbtab">${P.map((p,i)=>`<tr><td class="muted small">${p}</td><td><b class="it">${esc(f[i])}</b></td></tr>`).join("")}</table></div>`}).join("")}</div>
 <button class="btn" id="vbTrainOne">Treinar só este verbo (10)</button>`;
 tokenize(box);$("#vbBack").onclick=()=>{VB.cur=null;renderVerbi();window.scrollTo(0,0)};$("#vbTrainOne").onclick=()=>vbTrain(v)}
function vbQ(v,tk,i){const f=TENSES[tk].f(v),right=f[i],cand=[];
 [0,1,2,3,4,5].filter(j=>j!==i).forEach(j=>cand.push(f[j]));VBT.filter(t=>t!==tk).forEach(t=>cand.push(TENSES[t].f(v)[i]));
 const wrong=shuffle([...new Set(cand)].filter(x=>x!==right));const o=[right,...shuffle([...wrong.filter(x=>f.includes(x)).slice(0,2),...wrong.filter(x=>!f.includes(x)).slice(0,2)]).slice(0,3)];
 return{id:"verb:"+v.inf+":"+tk+":"+i,k:"mc",cat:"gram",lbl:"Verbos · "+TENSES[tk].n,p:P[i]+" ___ ("+v.inf+") · "+TENSES[tk].n,o,a:0,x:P[i]+" "+right+" — "+v.pt+", "+TENSES[tk].n+"."}}
function vbTrain(one){const its=[];const vs=one&&one.inf?[one]:vbList();for(let k=0;k<10;k++){const v=pick(vs),tk=VB.tense||pick(VBT),i=Math.random()*6|0;its.push(vbQ(v,tk,i))}
 rnStart({box:"#exBox",titulo:"Treino de verbos",items:its,origem:"verbos",tag:VB.tense||"todos",onQuit:renderVerbi,again:()=>vbTrain(one)})}

/* ---------- Simulado por nível ---------- */
// Banco de 90 por nível: gramática 30, vocabulário 25, leitura 20, escuta 15. Cada prova sorteia 10 + 8 + 6 + 6 = 30.
const SIM_AREAS=[["gram","Gramática",30,10],["voc","Vocabulário",25,8],["leit","Leitura",20,6],["esc","Escuta",15,6]];
function simBank(lvl){const by=a=>a.slice().sort((x,y)=>x.id<y.id?-1:1);return{
 gram:by(EXQ.filter(q=>q.nivel===lvl&&q.cat==="gram")).slice(0,30).map(exItemOf),
 voc:by(EXQ.filter(q=>q.nivel===lvl&&q.cat==="voc")).slice(0,25).map(exItemOf),
 leit:by(EXQ.filter(q=>q.nivel===lvl&&q.cat==="int")).slice(0,20).map(exItemOf),
 esc:by(ASC.filter(x=>x.nivel===lvl)).filter((x,i)=>i%2===0).slice(0,15).map(ascItem)}}
function simHist(lvl){return((S.simulados||{})[lvl])||[]}
function simBest(lvl){return simHist(lvl).reduce((m,t)=>Math.max(m,t.pct),0)}
function renderSimHome(){const box=$("#exBox");
 box.innerHTML=v3ModeHead("Simulado por nível","30 questões sorteadas de um banco de 90: gramática 10, vocabulário 8, leitura 6 e escuta 6. Sem correção durante a prova; no fim, a nota por área e o que você errou, que vai para o caderno de erros.")+
 ["A1","A2"].map(l=>{const h=simHist(l),b=simBest(l);return`<div class="card stack" style="gap:8px"><div class="row" style="justify-content:space-between"><h3>Simulado ${l}</h3>${b>=80?`<span class="chip hot">Selo da Nonna ✓</span>`:b?`<span class="chip">melhor: ${b}%</span>`:""}</div>
 ${h.length?`<div class="stack" style="gap:4px">${h.slice(-5).reverse().map(t=>`<div class="row small" style="justify-content:space-between"><span>${fmtBR(t.d)}</span><span>${SIM_AREAS.map(a=>a[1].slice(0,4)+". "+(t.areas[a[0]]||"0/0")).join(" · ")}</span><b>${t.pct}%</b></div>`).join("")}</div>`:`<p class="small muted">Nenhuma tentativa ainda. Com 80% ou mais, você ganha o selo da Nonna no painel.</p>`}
 <div class="row"><button class="btn primary" data-sim="${l}">Começar o simulado ${l}</button></div></div>`}).join("");
 $("#v3Back").onclick=v3Back;$$("#exBox [data-sim]").forEach(b=>b.onclick=()=>simStart(b.dataset.sim))}
function simStart(lvl){const B=simBank(lvl),its=[];SIM_AREAS.forEach(([k,,,n])=>shuffle(B[k]).slice(0,n).forEach(it=>its.push(Object.assign({},it,{area:k}))));
 rnStart({box:"#exBox",titulo:"Simulado "+lvl,items:its,prova:true,origem:"simulado",tag:lvl,onQuit:renderSimHome,onEnd:R=>simEnd(R,lvl)})}
function simEnd(R,lvl){const res=R.res.filter(Boolean),ok=res.filter(x=>x.ok).length,n=R.items.length,pct=Math.round(ok/n*100),areas={};
 SIM_AREAS.forEach(([k])=>{const a=res.filter(x=>x.it.area===k);areas[k]=a.filter(x=>x.ok).length+"/"+R.items.filter(x=>x.area===k).length});
 if(!R.saved){R.saved=1;res.forEach(x=>{if(!x.ok)errAnswer(x.it,false,"simulado")});S.simulados=S.simulados||{};const h=S.simulados[lvl]=S.simulados[lvl]||[];h.push({d:today(),pct,ok,n,areas});if(h.length>30)h.splice(0,h.length-30);save();renderHome()}
 const wrong=res.filter(x=>!x.ok);
 $("#exBox").innerHTML=`<div class="card stack"><span class="label">Simulado ${lvl} · resultado</span><h2>${ok}/${n} · ${pct}%</h2>
 ${pct>=80?`<div class="fb ok"><b>Selo da Nonna conquistado!</b><span>Ele aparece no painel da tela Início.</span></div>`:`<p class="small muted">Com 80% ou mais você ganha o selo da Nonna.</p>`}
 <div class="simareas">${SIM_AREAS.map(([k,nm])=>{const [a,b]=areas[k].split("/").map(Number);return`<div><span class="label">${nm}</span><b>${areas[k]}</b><div class="lvlbar"><i style="width:${b?a/b*100:0}%"></i></div></div>`}).join("")}</div>
 ${wrong.length?`<h3>O que você errou (${wrong.length})</h3><p class="small muted">Estas questões foram para o caderno de erros.</p><div class="stack" style="gap:8px">${wrong.map(x=>`<div class="exwrong"><div class="small${x.it.pit?" it":""}">${esc(x.it.hide?x.it.say:x.it.p)}</div><div class="small">Sua resposta: ${esc(x.it.o[x.it.ans])}</div><div class="small">Certa: <b>${esc(x.it.o[x.it.a])}</b>${x.it.x?" — "+esc(x.it.x):""}</div></div>`).join("")}</div>`:""}
 <div class="row"><button class="btn ghost" id="simBack">Voltar</button></div></div>`;
 tokenize($("#exBox"));$("#simBack").onclick=()=>{RN.cur=null;renderSimHome();window.scrollTo(0,0)}}

/* ============================ CURSO: falsos amigos e trilha de engenharia ============================ */
function v3CourseExtra(){const fa=FALSI.filter(b=>(S.course[b.id]||{}).best>=70).length,ct=CANT.filter(u=>(S.course[u.id]||{}).best>=70).length;
 return`<div class="v3extra stack" style="gap:10px"><h3 class="v3sub">Unidades extras</h3>
 <button class="tcard" data-v3c="falsi"><span class="tn">≠</span><div><h3>Falsos amigos</h3><p>40 palavras que enganam o brasileiro, em 4 blocos com quiz</p></div><span class="pill ${fa===4?"ok":""}">${fa}/4</span></button>
 <button class="tcard" data-v3c="cant"><span class="tn">⛑</span><div><h3>Cantiere e ufficio tecnico</h3><p>Trilha de engenharia: 6 unidades com termos, documento-modelo e interpretação</p></div><span class="pill ${ct===6?"ok":""}">${ct}/6</span></button></div>`}
const _renderCourse=renderCourse;
renderCourse=function(){_renderCourse();if(CUR&&!$("#cTopic").hidden)return;const tl=$("#tlist");if(!tl)return;const w=document.createElement("div");w.innerHTML=v3CourseExtra();tl.appendChild(w.firstElementChild);
 $$("#tlist [data-v3c]").forEach(b=>b.onclick=()=>b.dataset.v3c==="falsi"?openFalsi():openCant())};
const CX={kind:"",id:""};
function cxShow(){CUR=null;RUN=null;TEST=null;$("#cHome").hidden=true;$("#cTopic").hidden=false;window.scrollTo(0,0)}
function cxClose(){RN.cur=null;CX.kind="";CX.id="";closeTopic()}
function v3Fav(k,lemma,meaning,ex,expt,origem){if(S.favs[k]){delete S.favs[k];removeFavCard(k)}
 else{S.favs[k]={lemma,surface:lemma,pos:"",meaning,synonyms:[],example:ex||"",examplePt:expt||"",context:ex||"",date:today(),added:today(),tipo:/\s/.test(lemma)?"frase":"palavra",origem};addFavCard(k);logEvento("favorito",k)}
 save();updateFavCount();renderDecks()}
function favBtn(k,attrs){const on=!!S.favs[k];return`<button class="spk star${on?" on":""}" ${attrs} aria-pressed="${on}" aria-label="${on?"Remover de Preferiti":"Salvar em Preferiti"}">${STAR_SVG}</button>`}
/* falsos amigos */
function openFalsi(id){CX.kind="falsi";CX.id=id||"";cxShow();renderFalsi()}
function renderFalsi(){const box=$("#cTopic");if(RN.cur&&RN.cur.box==="#cTopic")return rnRender();
 if(!CX.id){box.innerHTML=`<button class="back" id="cxBack">← Curso</button><div class="tophead"><span class="label">Unidade extra</span><h2>Falsos amigos</h2><p class="muted small">Palavras italianas que parecem portuguesas, mas querem dizer outra coisa. Cada bloco tem 10 palavras e um quiz de marcar.</p></div>
  <div class="tlist">${FALSI.map((b,i)=>{const c=S.course[b.id]||{};return`<button class="tcard${c.best>=70?" done":""}" data-fa="${b.id}"><span class="tn">${c.best>=70?"✓":i+1}</span><div><h3>${esc(b.titulo)}</h3><p>${b.itens.map(x=>x.it).join(", ")}</p></div><span class="pill ${c.best>=70?"ok":c.best!=null?"todo":""}">${c.best!=null?c.best+"%":"novo"}</span></button>`}).join("")}</div>`;
  $("#cxBack").onclick=cxClose;$$("#cTopic [data-fa]").forEach(b=>b.onclick=()=>{CX.id=b.dataset.fa;renderFalsi();window.scrollTo(0,0)});return}
 const b=FALSII[CX.id],i=FALSI.indexOf(b),y=window.scrollY;
 box.innerHTML=`<button class="back" id="cxBack">← Falsos amigos</button><div class="tophead"><span class="label">Bloco ${i+1} de ${FALSI.length}</span><h2>${esc(b.titulo)}</h2></div>
 <div class="stack" style="gap:12px">${b.itens.map((x,k)=>`<div class="card stack fa"><div class="row" style="justify-content:space-between;flex-wrap:nowrap;align-items:flex-start"><h3 class="it modit">${esc(x.it)}</h3><div class="row" style="gap:6px;flex-wrap:nowrap">${spkBtn(x.it)}${favBtn(x.it.toLowerCase(),`data-fafav="${k}"`)}</div></div>
  <div class="fagrid"><div class="fano"><span class="label">Não é</span>${esc(x.parece)}</div><div class="faok"><span class="label">Mas é</span><b>${esc(x.e)}</b></div></div>
  <div class="exi"><div><i class="it">${esc(x.ex)}</i><span>${esc(x.expt)}</span></div>${spkBtn(x.ex)}</div>
  <p class="small"><span class="label">Para dizer o que o brasileiro esperava</span> <span class="it">${esc(x.certo)}</span></p></div>`).join("")}</div>
 <div class="row"><button class="btn primary" id="faQuiz">Fazer o quiz do bloco (10)</button></div>
 <div class="row" style="justify-content:space-between">${FALSI[i-1]?`<button class="btn" data-fanav="${FALSI[i-1].id}">← Anterior</button>`:"<span></span>"}${FALSI[i+1]?`<button class="btn" data-fanav="${FALSI[i+1].id}">Próximo →</button>`:"<span></span>"}</div>`;
 tokenize(box);$("#cxBack").onclick=()=>{CX.id="";renderFalsi();window.scrollTo(0,0)};
 $$("#cTopic [data-fanav]").forEach(e=>e.onclick=()=>{CX.id=e.dataset.fanav;renderFalsi();window.scrollTo(0,0)});
 $$("#cTopic [data-fafav]").forEach(e=>e.onclick=()=>{const x=b.itens[+e.dataset.fafav];v3Fav(x.it.toLowerCase(),x.it,x.e+" (falso amigo: não é "+x.parece+")",x.ex,x.expt,"falsi:"+b.id);renderFalsi();window.scrollTo(0,y)});
 $("#faQuiz").onclick=()=>{const its=shuffle(b.itens).map(x=>{const outro=pick(b.itens.filter(z=>z!==x));return{id:"fa:"+x.id,k:"mc",cat:"voc",lbl:"Falsos amigos · "+b.titulo,p:"O que significa «"+x.it+"» em italiano?",o:[x.e,x.parece,outro.e],a:0,x:"«"+x.it+"» = "+x.e+". Para «"+x.parece+"», use: "+x.certo+"."}});
  rnStart({box:"#cTopic",titulo:"Quiz · "+b.titulo,items:its,origem:"falsi",tag:b.id,onQuit:()=>{renderFalsi()},onEnd:R=>{const ok=R.res.filter(r=>r&&r.ok).length,pct=Math.round(ok/R.items.length*100),c=S.course[b.id]=S.course[b.id]||{};const was=c.best>=70;c.best=Math.max(c.best||0,pct);c.last=today();if(!was&&c.best>=70)logEvento("unidade","falsi:"+b.id);save();R.onEnd=null;rnEnd()}})}}
/* trilha de engenharia */
function openCant(id){CX.kind="cant";CX.id=id||"";cxShow();renderCant()}
function renderCant(){const box=$("#cTopic");if(RN.cur&&RN.cur.box==="#cTopic")return rnRender();
 if(!CX.id){box.innerHTML=`<button class="back" id="cxBack">← Curso</button><div class="tophead"><span class="label">Trilha de engenharia</span><h2 class="it" style="font-style:normal">Cantiere e ufficio tecnico</h2><p class="muted small">O italiano da obra e do escritório técnico: 15 termos por unidade, um documento-modelo para ler e 5 questões de interpretação.</p></div>
  <div class="tlist">${CANT.map((u,i)=>{const c=S.course[u.id]||{};return`<button class="tcard${c.best>=70?" done":""}" data-ct="${u.id}"><span class="tn">${c.best>=70?"✓":i+1}</span><div><h3 class="it" style="font-style:normal">${esc(u.titulo)}</h3><p>${esc(u.pt)} · ${esc(u.doc.tipo)}</p></div><span class="pill ${c.best>=70?"ok":c.best!=null?"todo":""}">${c.best!=null?c.best+"%":"novo"}</span></button>`}).join("")}</div>`;
  $("#cxBack").onclick=cxClose;$$("#cTopic [data-ct]").forEach(b=>b.onclick=()=>{CX.id=b.dataset.ct;renderCant();window.scrollTo(0,0)});return}
 const u=CANTI[CX.id],i=CANT.indexOf(u),y=window.scrollY,paras=u.doc.texto.split("\n");
 box.innerHTML=`<button class="back" id="cxBack">← Cantiere e ufficio tecnico</button><div class="tophead"><span class="label">Unidade ${i+1} de ${CANT.length} · ${esc(u.pt)}</span><h2 class="it lettit">${esc(u.titulo)}</h2></div>
 <div class="card stack" style="gap:6px"><span class="label">15 termos</span><div class="ctterms">${u.termos.map((t,k)=>`<div class="ctterm"><div class="row" style="justify-content:space-between;flex-wrap:nowrap;align-items:flex-start;gap:6px"><div><b class="it">${esc(t[0])}</b><div class="small">${esc(t[1])}</div></div><div class="row" style="gap:4px;flex-wrap:nowrap">${spkBtn(t[0])}${favBtn(t[0].toLowerCase(),`data-ctfav="${k}"`)}</div></div><div class="exi"><div><i class="it">${esc(t[2])}</i></div>${spkBtn(t[2])}</div></div>`).join("")}</div></div>
 <div class="card stack ctdoc" data-ctdoc><span class="label">Documento-modelo · ${esc(u.doc.tipo)}</span><h3 class="it" style="font-style:normal">${esc(u.doc.titulo)}</h3>${audioHTML()}<div class="ctdoctext">${paras.map((p,k)=>`<p class="it" data-ctp="${k}">${esc(p)}</p>`).join("")}</div></div>
 <div class="row"><button class="btn primary" id="ctQuiz">Responder as 5 questões</button></div>
 <div class="row" style="justify-content:space-between">${CANT[i-1]?`<button class="btn" data-ctnav="${CANT[i-1].id}">← Anterior</button>`:"<span></span>"}${CANT[i+1]?`<button class="btn" data-ctnav="${CANT[i+1].id}">Próxima →</button>`:"<span></span>"}</div>`;
 tokenize(box);const d=box.querySelector("[data-ctdoc]");audioAttach(d,paras.map((p,k)=>({el:d.querySelector(`[data-ctp="${k}"]`),text:p})));
 $("#cxBack").onclick=()=>{audioStop();CX.id="";renderCant();window.scrollTo(0,0)};
 $$("#cTopic [data-ctnav]").forEach(e=>e.onclick=()=>{audioStop();CX.id=e.dataset.ctnav;renderCant();window.scrollTo(0,0)});
 $$("#cTopic [data-ctfav]").forEach(e=>e.onclick=()=>{const t=u.termos[+e.dataset.ctfav];v3Fav(t[0].toLowerCase(),t[0],t[1],t[2],"","cant:"+u.id);renderCant();window.scrollTo(0,y)});
 $("#ctQuiz").onclick=()=>{audioStop();const its=u.q.map((q,k)=>({id:"ct:"+u.id+":"+(k+1),k:"mc",cat:"leit",lbl:u.doc.tipo+" · "+u.titulo,p:q[0],o:q[1],a:0,x:q[2],ctx:u.doc.texto.replace(/\n/g," — ")}));
  rnStart({box:"#cTopic",titulo:"Interpretação · "+u.titulo,items:its,origem:"cantiere",tag:u.id,onQuit:renderCant,onEnd:R=>{const ok=R.res.filter(r=>r&&r.ok).length,pct=Math.round(ok/R.items.length*100),c=S.course[u.id]=S.course[u.id]||{};const was=c.best>=70;c.best=Math.max(c.best||0,pct);c.last=today();if(!was&&c.best>=70)logEvento("unidade","cant:"+u.id);save();R.onEnd=null;rnEnd()}})}}
