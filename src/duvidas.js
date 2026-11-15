/* ============================ DÚVIDAS: fichas com respostas obtidas fora do app ============================ */
// O app não chama nenhuma IA e não abre nenhum serviço: só oferece um prompt pronto para copiar,
// um campo para colar a resposta que a pessoa conseguiu onde quiser, e guarda tudo como ficha.
// Fichas por perfil em S.duvidas: { <id>: { q: dúvida (opcional), a: resposta colada, d: "AAAA-MM-DD", t: criado em (ms) } }
const DUV_PROMPT="Estou estudando italiano (nível A1–A2) e minha língua é o português do Brasil. Explique a minha dúvida abaixo em português, de forma curta e clara, em no máximo 120 palavras. Inclua 2 exemplos em italiano, cada um com a tradução em português. Não use termos técnicos sem explicar.\n\nDÚVIDA:";
const DV={q:"",del:"",msg:""};
function setPrefSeg(v){if(v!=="duv")v="fav";$$("#prefSeg button").forEach(b=>{const on=b.dataset.ps===v;b.classList.toggle("on",on);b.setAttribute("aria-selected",on)});
 $("#ps-fav").hidden=v!=="fav";$("#ps-duv").hidden=v!=="duv";try{localStorage.setItem(KEY+".ps",v)}catch(e){}if(v==="duv")renderDuvidas();else renderFavs()}
function duvList(){return Object.keys(S.duvidas||{}).map(id=>Object.assign({id},S.duvidas[id])).sort((a,b)=>(b.t||0)-(a.t||0)||String(b.d).localeCompare(String(a.d)))}
function duvCount(){const el=$("#duvCount");if(el){const n=Object.keys(S.duvidas||{}).length;el.textContent=n?String(n):""}}
async function copyPrompt(){const ta=$("#duvPrompt");let ok=false;try{await navigator.clipboard.writeText(DUV_PROMPT);ok=true}catch(e){}
 if(!ok){try{ta.focus();ta.select();ok=document.execCommand("copy")}catch(e){}}
 DV.msg=ok?"Prompt copiado. Cole onde preferir, escreva a sua dúvida depois de “DÚVIDA:” e traga a resposta para cá.":"Não deu para copiar automaticamente. O texto está selecionado: copie com o menu do aparelho.";
 const m=$("#duvCopyMsg");if(m)m.textContent=DV.msg;if(!ok){try{ta.focus();ta.select()}catch(e){}}}
function saveDuvida(){const q=$("#duvQ").value.trim(),a=$("#duvA").value.trim(),msg=$("#duvSaveMsg");
 if(!a){msg.textContent="Cole a resposta antes de salvar.";return}
 S.duvidas=S.duvidas||{};const t=Date.now(),id="d"+t.toString(36);S.duvidas[id]={q,a,d:today(),t};save();
 DV.msg="";renderDuvidas();const m=$("#duvSaveMsg");if(m)m.textContent="Ficha salva."}
function renderDuvidas(){const box=$("#duvBox");if(!box)return;duvCount();
 box.innerHTML=`<div class="card stack">
  <div class="stack" style="gap:4px"><h3>Nova ficha</h3><p class="small muted">O app não responde dúvidas. Copie o prompt, use-o onde preferir e cole aqui a resposta que receber. Ela vira uma ficha que você pode buscar depois.</p></div>
  <div class="stack" style="gap:6px"><span class="label">1 · Prompt</span><textarea id="duvPrompt" class="duvta duvprompt" readonly rows="6" aria-label="Prompt para copiar">${esc(DUV_PROMPT)}</textarea>
   <div class="row"><button class="btn primary" id="duvCopy">Copiar prompt</button></div><p class="small muted" id="duvCopyMsg" role="status">${esc(DV.msg)}</p></div>
  <div class="stack" style="gap:6px"><label class="label" for="duvQ">2 · Sua dúvida (opcional, ajuda na busca)</label><input type="text" id="duvQ" class="prefq" autocomplete="off" placeholder="Ex.: quando usar «c'è» e «ci sono»"></div>
  <div class="stack" style="gap:6px"><label class="label" for="duvA">3 · Resposta</label><textarea id="duvA" class="duvta" rows="7" placeholder="Cole aqui a resposta"></textarea></div>
  <div class="row"><button class="btn primary" id="duvSave">Salvar ficha</button><span class="small muted" id="duvSaveMsg" role="status"></span></div>
 </div>
 <div class="row" style="justify-content:space-between"><h3>Minhas fichas</h3><span class="chip">${Object.keys(S.duvidas||{}).length}</span></div>
 ${Object.keys(S.duvidas||{}).length?`<input type="search" id="duvSearch" class="prefq" placeholder="Buscar nas fichas" aria-label="Buscar nas fichas" value="${esc(DV.q)}" autocomplete="off">`:""}
 <div id="duvList" class="stack"></div>`;
 $("#duvCopy").onclick=copyPrompt;$("#duvSave").onclick=saveDuvida;
 if($("#duvSearch"))$("#duvSearch").oninput=e=>{DV.q=e.target.value;renderDuvList()};
 renderDuvList()}
function renderDuvList(){const box=$("#duvList");if(!box)return;const all=duvList(),q=norm(DV.q||"");
 if(!all.length){box.innerHTML=`<div class="card"><p class="muted small">Nenhuma ficha ainda.</p></div>`;return}
 const items=all.filter(x=>!q||norm(x.q||"").includes(q)||norm(x.a||"").includes(q));
 if(!items.length){box.innerHTML=`<div class="card"><p class="muted small">Nenhuma ficha com essa busca.</p></div>`;return}
 box.innerHTML=items.map(x=>`<article class="card stack duvcard"><div class="row" style="justify-content:space-between;align-items:flex-start;flex-wrap:nowrap"><div class="stack" style="gap:2px;min-width:0"><span class="label">${fmtBR(x.d)}</span>${x.q?`<h3 class="duvq">${esc(x.q)}</h3>`:""}</div>
  <button class="btn ghost small${DV.del===x.id?" danger":""}" data-duvdel="${x.id}">${DV.del===x.id?"Confirmar":"Apagar"}</button></div>
  <div class="duva">${esc(x.a).replace(/\n/g,"<br>")}</div></article>`).join("");
 $$("#duvList [data-duvdel]").forEach(b=>b.onclick=()=>{const id=b.dataset.duvdel;if(DV.del!==id){DV.del=id;renderDuvList();setTimeout(()=>{if(DV.del===id){DV.del="";renderDuvList()}},4000);return}
  delete S.duvidas[id];DV.del="";save();renderDuvidas()})}
