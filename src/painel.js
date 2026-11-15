/* ============================ CALENDÁRIO E PAINEL ============================ */
// Log de eventos por perfil em S.eventos: { "AAAA-MM-DD": [[tipo, id], ...] }
// tipos: "leitura" (texto concluído com 3/3), "unidade" (tópico do curso ou unidade de modi di dire concluída),
//        "revisao" (cartão revisado; um por cartão por dia), "favorito" (item salvo em Preferiti).
// Revisões com mais de 60 dias viram uma entrada só por dia: ["revisao", "", quantidade].
const EV_TIPOS=["leitura","unidade","revisao","favorito","exercicio"];
function logEvento(tipo,id){try{if(!EV_TIPOS.includes(tipo))return;S.eventos=S.eventos||{};const t=today(),d=S.eventos[t]=S.eventos[t]||[];id=String(id||"");
 if((tipo==="revisao"||tipo==="favorito")&&d.some(e=>e[0]===tipo&&e[1]===id))return;d.push([tipo,id]);evCompact()}catch(e){}}
function evCompact(){const lim=addDays(-60);Object.keys(S.eventos).forEach(day=>{if(day>=lim)return;const d=S.eventos[day];if(!d.some(e=>e[0]==="revisao"&&e[1]!==""))return;
 let n=0;const rest=d.filter(e=>{if(e[0]!=="revisao")return true;n+=e[1]===""?(+e[2]||0):1;return false});if(n)rest.push(["revisao","",n]);S.eventos[day]=rest})}
function evCount(e){return e[0]==="revisao"&&e[1]===""?(+e[2]||0):1}
function evDays(){return S.eventos||{}}
function dayActive(ds){const o=(S.log||{})[ds];if(o&&Object.keys(o).some(k=>typeof o[k]==="number"&&o[k]>0&&k!=="cz"))return true;return((S.eventos||{})[ds]||[]).length>0}
function dayLeitura(ds){return((S.eventos||{})[ds]||[]).some(e=>e[0]==="leitura")||Object.values(S.leituras||{}).some(r=>r&&r.done===ds)}
function activeStreak(){let d=new Date(),c=0;if(!dayActive(fmt(d)))d.setDate(d.getDate()-1);while(dayActive(fmt(d))){c++;d.setDate(d.getDate()-1)}return c}
// v3: preenche o log com o que já tinha data (leituras, modi di dire e favoritos), para o calendário e o painel não começarem vazios
function evBackfill(){S.eventos=S.eventos||{};const add=(day,tipo,id)=>{if(!day||!/^\d{4}-\d\d-\d\d$/.test(day))return;const d=S.eventos[day]=S.eventos[day]||[];if(!d.some(e=>e[0]===tipo&&e[1]===id))d.push([tipo,id])};
 Object.keys(S.leituras||{}).forEach(id=>add(S.leituras[id]&&S.leituras[id].done,"leitura",id));
 Object.keys(S.modi||{}).forEach(id=>add(S.modi[id]&&S.modi[id].done,"unidade","modi:"+id));
 Object.keys(S.favs||{}).forEach(k=>add(S.favs[k]&&(S.favs[k].added||S.favs[k].date),"favorito",k))}

/* ---------- calendário mensal (tela inicial) ---------- */
const HC={month:""};
function renderHomeCal(){const el=$("#homeCal");if(!el)return;const t=today(),cur=t.slice(0,7),base=HC.month||cur,[y,m]=base.split("-").map(Number);
 const startDow=(new Date(y,m-1,1).getDay()+6)%7,dim=new Date(y,m,0).getDate();let cells=["seg","ter","qua","qui","sex","sáb","dom"].map(d=>`<span class="dow">${d}</span>`).join(""),act=0,lei=0;
 for(let i=0;i<startDow;i++)cells+="<span></span>";
 for(let d=1;d<=dim;d++){const ds=`${y}-${pad2(m)}-${pad2(d)}`,a=dayActive(ds),l=dayLeitura(ds);if(a)act++;if(l)lei++;
  cells+=`<span class="hday${a?" act":""}${l?" lei":""}${ds===t?" hoje":""}" aria-label="${d} de ${MONTHS[m-1]}${l?", leitura concluída":a?", com atividade":""}">${d}${a&&!l?"<i></i>":""}</span>`}
 const prev=new Date(y,m-2,1),next=new Date(y,m,1),pk=fmt(prev).slice(0,7),nk=fmt(next).slice(0,7),st=activeStreak();
 el.innerHTML=`<div class="row" style="justify-content:space-between"><span class="label">Calendário</span><span class="chip${st?" hot":""}">sequência atual: ${st} ${st===1?"dia":"dias"}</span></div>
 <div class="calhead"><button class="iconbtn" id="hcPrev" aria-label="Mês anterior"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><h3>${MONTHS[m-1][0].toUpperCase()+MONTHS[m-1].slice(1)} de ${y}</h3><button class="iconbtn" id="hcNext" aria-label="Próximo mês" ${nk>cur?"disabled":""}><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button></div>
 <div class="calgrid hcal">${cells}</div>
 <div class="legend"><span><i class="lg-act"></i>dia com estudo · ${act}</span><span><i class="lg-lei"></i>texto concluído (3/3) · ${lei}</span></div>`;
 $("#hcPrev").onclick=()=>{HC.month=pk;renderHomeCal()};$("#hcNext").onclick=()=>{if(nk<=cur){HC.month=nk;renderHomeCal()}}}

/* ---------- painel ---------- */
const PN={per:"semana"};
const PER_LBL={semana:"últimos 7 dias",mes:"últimos 30 dias",tudo:"desde o começo"};
function perStart(){return PN.per==="semana"?addDays(-6):PN.per==="mes"?addDays(-29):""}
function evInPeriod(tipo,pred){const s=perStart();let n=0;Object.keys(evDays()).forEach(day=>{if(s&&day<s)return;S.eventos[day].forEach(e=>{if(e[0]===tipo&&(!pred||pred(e[1])))n+=evCount(e)})});return n}
function painelBuckets(){const out=[];
 if(PN.per==="tudo"){const now=new Date();for(let i=5;i>=0;i--){const d=new Date(now.getFullYear(),now.getMonth()-i,1),k=fmt(d).slice(0,7);out.push({k,lbl:MONTHS[d.getMonth()].slice(0,3),from:k+"-01",to:k+"-31"})}}
 else{const n=PN.per==="semana"?7:30,DOW=["dom","seg","ter","qua","qui","sex","sáb"];for(let i=n-1;i>=0;i--){const ds=addDays(-i),d=new Date(ds+"T12:00");out.push({k:ds,lbl:n===7?DOW[d.getDay()]:(d.getDate()===1||i===n-1||i===0||d.getDate()%5===0?String(d.getDate()):""),from:ds,to:ds})}}
 out.forEach(b=>{b.rev=0;b.out=0;Object.keys(evDays()).forEach(day=>{if(day<b.from||day>b.to)return;S.eventos[day].forEach(e=>{if(e[0]==="revisao")b.rev+=evCount(e);else b.out+=1})})});return out}
function barsSVG(bk){const W=320,H=120,pad=18,max=Math.max(1,...bk.map(b=>b.rev+b.out)),bw=(W-8)/bk.length,gap=Math.min(6,bw*.25);
 return`<svg class="pbars" viewBox="0 0 ${W} ${H+pad}" role="img" aria-label="Itens estudados por ${PN.per==="tudo"?"mês":"dia"}: ${bk.map(b=>(b.lbl||b.k)+" "+(b.rev+b.out)).join(", ")}">
  <line x1="0" x2="${W}" y1="${H}" y2="${H}" class="pb-axis"/>
  ${bk.map((b,i)=>{const x=4+i*bw+gap/2,w=bw-gap,hr=b.rev/max*(H-14),ho=b.out/max*(H-14),tot=b.rev+b.out;
   return`<g><title>${esc(b.lbl||b.k)}: ${b.rev} revisões, ${b.out} outras atividades</title>${hr?`<rect x="${x}" y="${H-hr}" width="${w}" height="${hr}" rx="2" class="pb-rev"/>`:""}${ho?`<rect x="${x}" y="${H-hr-ho}" width="${w}" height="${ho}" rx="2" class="pb-out"/>`:""}${tot&&bk.length<=12?`<text x="${x+w/2}" y="${H-hr-ho-4}" class="pb-n">${tot}</text>`:""}${b.lbl?`<text x="${x+w/2}" y="${H+13}" class="pb-l">${esc(b.lbl)}</text>`:""}</g>`}).join("")}</svg>`}
function renderPainel(){const el=$("#homePainel");if(!el)return;const s=perStart(),all=PN.per==="tudo";
 const cA1=COURSE.filter(t=>t.lvl==="A1"),cA2=COURSE.filter(t=>t.lvl==="A2"),done=a=>a.filter(t=>isDone(t.id)).length;
 const lA1=LETTURE.filter(t=>t.nivel==="A1"),lA2=LETTURE.filter(t=>t.nivel==="A2"),ldone=a=>a.filter(t=>letDone(t.id)).length;
 const inP=(tipo,pred)=>evInPeriod(tipo,pred);
 const rows=[["Curso","A1",done(cA1),cA1.length,inP("unidade",id=>id.startsWith("curso:")&&TOPIC[id.slice(6)]&&TOPIC[id.slice(6)].lvl==="A1")],["Curso","A2",done(cA2),cA2.length,inP("unidade",id=>id.startsWith("curso:")&&TOPIC[id.slice(6)]&&TOPIC[id.slice(6)].lvl==="A2")],
  ["Textos","A1",ldone(lA1),lA1.length,inP("leitura",id=>LETI[id]&&LETI[id].nivel==="A1")],["Textos","A2",ldone(lA2),lA2.length,inP("leitura",id=>LETI[id]&&LETI[id].nivel==="A2")],
  ["Modi di dire","A1–A2",modiDoneN(),MODI.length,inP("unidade",id=>id.startsWith("modi:"))]];
 const prefs=prefItems(),pst={novo:0,aprendendo:0,revisao:0};prefs.forEach(x=>pst[prefState(x.id)]++);
 const {due,nw}=updateChips(),pdue=prefDueIds().length,nl=letNext();
 const leit=all?letDoneN():inP("leitura"),rev=inP("revisao"),fav=all?prefs.length:inP("favorito"),uni=all?rows.filter(r=>r[0]!=="Textos").reduce((a,r)=>a+r[2],0):inP("unidade"); // textos contam à parte
 el.innerHTML=`<div class="row" style="justify-content:space-between"><span class="label">Painel</span><span class="small muted">${PER_LBL[PN.per]}</span></div>
 <div class="seg" id="pnSeg" role="tablist" aria-label="Período">${[["semana","Semana"],["mes","Mês"],["tudo","Tudo"]].map(([k,l])=>`<button role="tab" data-per="${k}" class="${PN.per===k?"on":""}" aria-selected="${PN.per===k}">${l}</button>`).join("")}</div>
 <div class="pnstats"><div><b>${leit}</b><span>${all?"textos lidos":"textos concluídos"}</span></div><div><b>${uni}</b><span>unidades concluídas</span></div><div><b>${rev}</b><span>revisões</span></div><div><b>${fav}</b><span>${all?"em Preferiti":"salvos em Preferiti"}</span></div></div>
 <div class="stack" style="gap:6px"><span class="label">Itens estudados por ${all?"mês":"dia"}</span>${barsSVG(painelBuckets())}<div class="legend"><span><i class="lg-rev"></i>revisões</span><span><i class="lg-out"></i>leituras, unidades e favoritos</span></div></div>
 <div class="stack" style="gap:6px"><span class="label">Unidades por seção e nível</span><div class="tbl"><table><thead><tr><th>Seção</th><th>Nível</th><th>Feitas</th><th>${all?"Progresso":"Novas"}</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}/${r[3]}</td><td>${all?`<span class="pnbar"><i style="width:${r[3]?r[2]/r[3]*100:0}%"></i></span>`:(r[4]?"+"+r[4]:"—")}</td></tr>`).join("")}</tbody></table></div>${!all&&s?`<p class="small muted">Tópicos do curso concluídos antes desta versão do app contam em “Feitas”, mas não em “Novas”.</p>`:""}</div>
 <div class="stack" style="gap:6px"><span class="label">Preferiti por estado</span><div class="pnstate"><span class="lvl st-novo">novos · ${pst.novo}</span><span class="lvl st-aprendendo">aprendendo · ${pst.aprendendo}</span><span class="lvl st-revisao">em revisão · ${pst.revisao}</span></div></div>
 <div class="stack" style="gap:8px"><span class="label">Para estudar hoje</span><ul class="tight pntoday"><li><b>${due}</b> ${due===1?"cartão para revisar":"cartões para revisar"} e <b>${nw}</b> ${nw===1?"novo":"novos"}</li><li><b>${pdue}</b> ${pdue===1?"item":"itens"} de Preferiti para revisar</li>${nl?`<li>Próximo texto: <i class="it">${esc(nl.titulo)}</i> (${nl.nivel})</li>`:""}</ul>
  <div class="row">${due+nw?`<button class="btn primary" data-goto="cartoes">Ir para os cartões</button>`:""}${nl?`<button class="btn" data-goto="news" data-let="${nl.id}">Ler o próximo texto</button>`:""}</div></div>`;
 $$("#pnSeg [data-per]").forEach(b=>b.onclick=()=>{PN.per=b.dataset.per;renderPainel()})}
