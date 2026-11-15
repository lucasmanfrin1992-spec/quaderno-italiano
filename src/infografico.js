/* ============================ INFOGRÁFICO DE LIÇÃO: componente ============================ */
// Quadro-resumo gerado a partir de dados (infograficos_data.js), em HTML/CSS/SVG: nítido em qualquer tela, offline,
// com palavras tocáveis e áudio nos balões. A Nonna e o segundo personagem são desenhos próprios em SVG.
const NC={ink:"#2B1D16",hair:"#E7E1D6",skin:"#F2C9A5",cheek:"#C2402A",dress:"#2F6B3A",dot:"#FBF5EA",shirt:"#2D5F9A",brown:"#5A3A26"};
function nonnaSVG(pose,cls){const k=NC,P=pose||"acenando",s=`stroke="${k.ink}" stroke-width="5"`;
 const mouth=P==="comemorando"?`<path d="M106 136Q120 160 134 136Z" fill="${k.ink}"/><path d="M112 146Q120 152 128 146" fill="none" stroke="#C2402A" stroke-width="5" stroke-linecap="round"/>`
  :P==="pensando"?`<path d="M111 142Q120 139 129 142" fill="none" stroke="${k.ink}" stroke-width="6" stroke-linecap="round"/>`
  :`<path d="M108 138Q120 149 132 138" fill="none" stroke="${k.ink}" stroke-width="6" stroke-linecap="round"/>`;
 const brows=P==="pensando"?`<path d="M90 92Q102 84 112 90" fill="none" stroke="${k.ink}" stroke-width="4.5" stroke-linecap="round"/>`:"";
 const arm=(x1,y1,x2,y2,hx,hy)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${k.ink}" stroke-width="24" stroke-linecap="round"/><path d="M${x1} ${y1}L${x2} ${y2}" stroke="${k.dress}" stroke-width="15" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="13" fill="${k.skin}" ${s}/>`;
 const arms=P==="acenando"?arm(170,192,200,132,206,118)+`<path d="M222 98q8 6 6 16M230 88q12 10 9 26" fill="none" stroke="${k.ink}" stroke-width="4" stroke-linecap="round"/>`
  :P==="apontando"?arm(170,196,212,176,222,172)+`<path d="M232 170l14 -4" stroke="${k.ink}" stroke-width="9" stroke-linecap="round"/><path d="M232 170l14 -4" stroke="${k.skin}" stroke-width="4" stroke-linecap="round"/>`
  :P==="pensando"?arm(166,198,150,172,140,160)+`<circle cx="190" cy="58" r="6" fill="${k.ink}" opacity=".55"/><circle cx="206" cy="40" r="8" fill="${k.ink}" opacity=".55"/><circle cx="226" cy="20" r="10" fill="${k.ink}" opacity=".55"/>`
  :arm(72,192,40,118,34,104)+arm(168,192,200,118,206,104)+`<rect x="22" y="40" width="9" height="9" rx="2" fill="#D9A21F" transform="rotate(20 26 44)"/><rect x="212" y="34" width="9" height="9" rx="2" fill="#C2402A" transform="rotate(-25 216 38)"/><circle cx="60" cy="30" r="5" fill="#2D5F9A"/><circle cx="190" cy="66" r="5" fill="#2F6B3A"/>`;
 return`<svg class="${cls||"nonna"}" viewBox="0 0 250 236" role="img" aria-label="Nonna ${P}">
  <path d="M58 236Q60 170 120 166Q180 170 182 236Z" fill="${k.dress}" ${s} stroke-linejoin="round"/>
  <circle cx="110" cy="182" r="3.4" fill="${k.dot}"/><circle cx="120" cy="186" r="3.4" fill="${k.dot}"/><circle cx="130" cy="182" r="3.4" fill="${k.dot}"/>
  <circle cx="120" cy="42" r="19" fill="${k.hair}" ${s}/><ellipse cx="120" cy="96" rx="58" ry="50" fill="${k.hair}" ${s}/>
  <ellipse cx="120" cy="112" rx="43" ry="46" fill="${k.skin}" ${s}/>
  <path d="M77 106Q80 64 120 62Q160 64 163 106Q148 82 120 82Q92 82 77 106Z" fill="${k.hair}" ${s} stroke-linejoin="round"/>
  <circle cx="92" cy="130" r="7" fill="${k.cheek}" opacity=".35"/><circle cx="148" cy="130" r="7" fill="${k.cheek}" opacity=".35"/>
  <circle cx="102" cy="113" r="12.5" fill="#fff" fill-opacity=".35" stroke="${k.ink}" stroke-width="6"/><circle cx="138" cy="113" r="12.5" fill="#fff" fill-opacity=".35" stroke="${k.ink}" stroke-width="6"/>
  <path d="M114.5 112Q120 108 125.5 112" fill="none" stroke="${k.ink}" stroke-width="6" stroke-linecap="round"/>${brows}${mouth}${arms}</svg>`}
function outroSVG(){const k=NC,s=`stroke="${k.ink}" stroke-width="5"`;
 return`<svg class="outro" viewBox="0 0 250 236" role="img" aria-label="Colega">
  <path d="M62 236Q64 172 125 168Q186 172 188 236Z" fill="${k.shirt}" ${s} stroke-linejoin="round"/>
  <path d="M108 170l17 20 17-20" fill="#fff" ${s} stroke-linejoin="round"/>
  <ellipse cx="125" cy="112" rx="44" ry="50" fill="${k.skin}" ${s}/>
  <path d="M80 104Q78 58 125 56Q172 58 170 104Q160 80 140 78Q120 92 92 86Q84 94 80 104Z" fill="${k.brown}" ${s} stroke-linejoin="round"/>
  <circle cx="107" cy="114" r="5.5" fill="${k.ink}"/><circle cx="143" cy="114" r="5.5" fill="${k.ink}"/>
  <path d="M98 100q9 -6 18 0M134 100q9 -6 18 0" fill="none" stroke="${k.ink}" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M110 138Q125 150 140 138" fill="none" stroke="${k.ink}" stroke-width="6" stroke-linecap="round"/>
  <circle cx="96" cy="130" r="6" fill="${k.cheek}" opacity=".25"/><circle cx="154" cy="130" r="6" fill="${k.cheek}" opacity=".25"/></svg>`}
const INFO_ICONS={pessoa:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
 telefone:'<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
 email:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
 empresa:'<path d="M4 21V5l8-2v18M12 9h8v12M4 21h16M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2"/>',
 cracha:'<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8 17c.8-2 2.2-3 4-3s3.2 1 4 3"/>',
 calendario:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 relogio:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 documento:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>'};
function infoIcon(n){return`<svg viewBox="0 0 24 24" aria-hidden="true">${INFO_ICONS[n]||INFO_ICONS.documento}</svg>`}
// **negrito** marca palavras italianas: ficam em negrito e tocáveis
function infoDica(t){return esc(t).replace(/\*\*(.+?)\*\*/g,'<b class="it">$1</b>')}
const NUMS=["①","②","③","④","⑤"];
function infoCena(c){return`<div class="icena" data-cena><div class="ibubs">${c.falas.map(f=>`<div class="ibub ${f.quem==="nonna"?"ib-n":"ib-o"}"><span class="ibwho">${f.quem==="nonna"?"Nonna":esc(c.outro||"Colega")}</span><span class="it">${esc(f.texto)}</span>${f.pt?`<small>${esc(f.pt)}</small>`:""}</div>`).join("")}</div>
 <div class="ichars">${nonnaSVG(c.nonna||"acenando","nonna sm")}${outroSVG()}</div>${audioHTML()}</div>`}
function infoBloco(b,i){let main="";
 if(b.tipo==="tabela")main=`<div class="itab"><table><thead><tr><th>Italiano</th><th>Português</th></tr></thead><tbody>${b.linhas.map(l=>`<tr><td><b class="it">${esc(l[0])}</b></td><td>${esc(l[1])}</td></tr>`).join("")}</tbody></table></div>${b.dica?`<div class="idica">${infoDica(b.dica)}</div>`:""}`;
 else if(b.tipo==="icones")main=`<ul class="iicons">${b.itens.map(t=>`<li><span class="iic">${infoIcon(t.icone)}</span><span><b class="it">${esc(t.it)}</b><small>${esc(t.pt)}</small></span></li>`).join("")}</ul>`;
 else if(b.tipo==="regra")main=`<div class="iform"><span class="label">Fórmula</span><div class="it">${esc(b.formula)}</div></div><div class="iexs">${b.exemplos.map(e=>`<div class="iex"><div><b class="it">${esc(e[0])}</b><small>${esc(e[1])}</small></div>${spkBtn(e[0])}</div>`).join("")}</div>`;
 const side=b.cena?infoCena(b.cena):b.formulario?`<div class="iformcard" aria-label="Exemplo preenchido">${b.formulario.map(f=>`<div><span class="label">${esc(f[0])}</span><span class="it">${esc(f[1])}</span></div>`).join("")}</div>`:"";
 return`<section class="ibloco"><h4 class="ibtit"><span class="ibnum" aria-hidden="true">${i+1}</span>${esc(b.titulo)}</h4><div class="ibody${side?" iside":""}"><div class="imain">${main}</div>${side}</div></section>`}
function infoHTML(x,full){const c=x.cabecalho;
 return`<article class="info${full?" ifull":""}" data-info="${x.id}" aria-label="Resumo ilustrado: ${esc(c.titulo)}">
 <header class="ihead" ${full?"":`data-info-open role="button" tabindex="0" aria-label="Abrir o resumo em tela cheia"`}><div class="ihtxt"><span class="itrilho">${esc(c.trilho)}</span><h3 class="ititle">${esc(c.titulo)}</h3><p class="isub">${esc(c.subtitulo)}</p>${full?"":`<span class="ihint">Toque aqui para ampliar</span>`}</div>${nonnaSVG(c.nonna,"nonna hd")}</header>
 ${x.blocos.map(infoBloco).join("")}</article>`}
function infoBind(el,x){if(!el)return;tokenize(el);
 el.querySelectorAll("[data-cena]").forEach((cn,i)=>{const items=[...cn.querySelectorAll(".ibub")].map(b=>({el:b,text:b.querySelector(".it").textContent}));audioAttach(cn,items)});
 const h=el.querySelector("[data-info-open]");if(h){const go=ev=>{if(ev.target.closest("button"))return;openInfoFull(x)};h.onclick=go;h.onkeydown=ev=>{if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();openInfoFull(x)}}}}
function openInfoFull(x){audioStop();let ov=$("#infoOv");if(!ov){ov=document.createElement("div");ov.id="infoOv";ov.className="infoov";ov.setAttribute("role","dialog");ov.setAttribute("aria-modal","true");document.body.appendChild(ov)}
 ov.setAttribute("aria-label","Resumo ilustrado em tela cheia");
 ov.innerHTML=`<div class="iovbar"><span class="label">Resumo ilustrado</span><button class="btn" id="infoClose">Fechar ✕</button></div><div class="iovin">${infoHTML(x,true)}</div>`;
 ov.hidden=false;document.documentElement.classList.add("noscroll");infoBind(ov.querySelector(".info"),x);ov.scrollTop=0;$("#infoClose").focus();$("#infoClose").onclick=closeInfoFull}
function closeInfoFull(){const ov=$("#infoOv");if(!ov||ov.hidden)return;audioStop();ov.hidden=true;ov.innerHTML="";document.documentElement.classList.remove("noscroll");const h=document.querySelector("#cBody [data-info-open]");if(h)h.focus()}
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$("#infoOv")&&!$("#infoOv").hidden&&$("#sheet").hidden)closeInfoFull()});
function renderInfoTopic(t,body){const x=INFO_TOP[t.id];if(!x)return;const w=document.createElement("div");w.innerHTML=infoHTML(x);const el=w.firstElementChild;body.prepend(el);infoBind(el,x)}
