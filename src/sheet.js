/* ============================ PAINEL DA PALAVRA (todo o app) ============================ */
let SH=null;
const AI_CACHE={};try{Object.assign(AI_CACHE,JSON.parse(localStorage.getItem(KEY+".ai")||"{}"))}catch(e){}
function saveAI(){try{const ks=Object.keys(AI_CACHE);if(ks.length>300)ks.slice(0,ks.length-300).forEach(k=>delete AI_CACHE[k]);localStorage.setItem(KEY+".ai",JSON.stringify(AI_CACHE))}catch(e){}}
function ctxSentence(btn){const inNews=btn.closest("#newsBox");
 if(inNews){const n=NEWS.cur,pi=+btn.dataset.p;const para=pi>=0?((n&&n.paragraphs)||[])[pi]||"":(n&&n.title)||"";return findSentence(para,btn.textContent)}
 const blk=btn.closest(".exi,.q,.decr,.eq,.cjr,.vcell,.igcc,li,td,p,.corrtext,.fix,.chips2 span,label,.fb,.it")||btn.parentElement;
 let t=(blk.querySelector&&blk.querySelector(".it")&&!blk.classList.contains("it")?blk.querySelector(".it").textContent:blk.textContent)||"";
 t=t.replace(/\s+/g," ").trim();return findSentence(t,btn.textContent)}
function openWord(btn){$$("button.w.on").forEach(x=>x.classList.remove("on"));btn.classList.add("on");
 const k=btn.dataset.w,surface=btn.textContent.replace(/[!?.,]/g,"").trim()||k,inNews=!!btn.closest("#newsBox");
 const local=lookupLocal(k,surface.toLowerCase());
 let entry=null,src="";
 if(inNews){const g=gloss(k);if(g){entry=Object.assign({},g);src="news";if(local){entry.how=entry.how||local.how;entry.form=local.form;entry.formNote=local.formNote;entry.verb=local.verb;entry.examples=local.examples;entry.found=local.found}}}
 if(!entry&&local){entry=local;src="local"}
 if(!entry&&AI_CACHE[k]){entry=AI_CACHE[k];src="ai"}
 SH={k,surface,sentence:ctxSentence(btn),entry,src,btn,ai:src==="ai"?AI_CACHE[k]:null};
 renderSheet();showSheet(true);speak(surface)}
document.addEventListener("click",e=>{const b=e.target.closest("button.w");if(b){e.preventDefault();openWord(b)}});
function showSheet(on){$("#sheet").hidden=!on;$("#sheetBack").hidden=!on;
 if(on){$("#sheet").scrollTop=0;setTimeout(()=>$("#shClose").focus({preventScroll:true}),0)}else{$$("button.w.on").forEach(x=>x.classList.remove("on"));if(SH&&SH.btn&&document.contains(SH.btn))SH.btn.focus({preventScroll:true})}}
function favKeyOf(e,k){return String((e&&e.lemma)||k).toLowerCase().trim()}
function verbBlock(vf,surface){const x=vf.find(z=>z.tk!=="inf")||vf[0],v=x.v;
 let label=`verbo <b class="it">${esc(v.inf)}</b> (${esc(v.pt)})`;
 if(x.tk==="inf")return`<p class="small">${label} · infinitivo · auxiliar no passado: <b>${v.aux==="e"?"essere":"avere"}</b></p>${miniConj(v,"pres",-1)}`;
 if(x.tk==="pp")return`<p class="small">Particípio passado de ${label}. Forma o passato prossimo com <b>${v.aux==="e"?"essere":"avere"}</b>: <i class="it">${esc(pass(v)[0])}</i>.${v.aux==="e"?" Com essere concorda com o sujeito (-o, -a, -i, -e).":""}</p>${miniConj(v,"pass",-1)}`;
 if(x.tk==="ger")return`<p class="small">Gerúndio de ${label}. Com <b>stare</b> indica ação em andamento: <i class="it">sto ${esc(surface)}</i>.</p>`;
 const who=vf.filter(z=>z.v===v&&z.tk===x.tk).map(z=>P[z.i]).join(" / ");
 const others=vf.filter(z=>z.v===v&&z.tk!==x.tk&&z.i>=0).map(z=>TLAB[z.tk]+" ("+P[z.i]+")");
 return`<p class="small">Forma de ${label} · <b>${TLAB[x.tk]}</b> · ${esc(who)}${others.length?` · também ${esc(others.join(", "))}`:""}</p>${miniConj(v,x.tk,vf.filter(z=>z.v===v&&z.tk===x.tk).map(z=>z.i))}`}
function miniConj(v,tk,mark){const f=TENSES[tk].f(v),m=[].concat(mark);return`<div class="stack" style="gap:6px"><span class="label">${TENSES[tk].n} de ${esc(v.inf)}</span><div class="cjmini">${f.map((x,i)=>`<span><em>${P[i]}</em><b class="${m.includes(i)?"me":""}" style="font-weight:${m.includes(i)?700:500}">${esc(x)}</b></span>`).join("")}</div></div>`}
function extLinks(){const w=SH.surface,q=`Estudo italiano (nível A1–A2). Explique em português a palavra "${w}" nesta frase: "${SH.sentence}". Diga a forma de dicionário, a classe gramatical, o significado, como se forma (se for preposição articulada, verbo conjugado, plural etc.) e dê 2 exemplos simples.`;
 return`<div class="row"><a class="btn small" href="https://www.wordreference.com/itpt/${encodeURIComponent(w.toLowerCase())}" target="_blank" rel="noopener">WordReference</a><a class="btn small" href="${esc(claudeLink(q))}" target="_blank" rel="noopener">Perguntar ao Claude</a></div>`}
function renderSheet(){const e=SH.entry,fk=e?favKeyOf(e,SH.k):null,isFav=!!(fk&&S.favs[fk]&&e.meaning);
 $("#shWord").textContent=SH.surface;
 const lem=e&&e.lemma&&e.lemma.toLowerCase()!==SH.surface.toLowerCase()?"forma de “"+e.lemma+"”":"";
 $("#shLemma").textContent=[lem,e&&e.pos].filter(Boolean).join(" · ");
 const fav=$("#shFav");fav.disabled=!(e&&e.meaning);fav.classList.toggle("on",isFav);fav.setAttribute("aria-pressed",isFav);
 fav.setAttribute("aria-label",isFav?"Remover das minhas palavras":"Salvar nas minhas palavras");
 $("#shSay").dataset.say=SH.surface;
 let h="";
 if(e){h+=`<div class="shmean">${esc(e.meaning||"")}</div>`;
  if(e.note)h+=`<p class="small muted">${esc(e.note)}</p>`;
  if(e.form)h+=`<div class="formbox"><span class="label">Como se forma</span><div class="f">${e.form}</div>${e.formNote?`<span class="small">${e.formNote}</span>`:""}</div>`;
  if(e.verb)h+=verbBlock(e.verb,SH.surface.toLowerCase());
  if(e.how&&e.how.length)h+=`<div class="stack" style="gap:6px"><span class="label">${e.kind==="prep"?"Como funciona"+(e.base?" a preposição "+esc(e.base):""):"Como se usa"}</span><ul class="howl">${e.how.map(x=>`<li>${x}</li>`).join("")}</ul></div>`;
  if(e.synonyms&&e.synonyms.length)h+=`<div class="stack" style="gap:6px"><span class="label">Sinônimos</span><div class="chips">${e.synonyms.map(s=>`<button class="chipb" data-say="${esc(s)}">${esc(s)}</button>`).join("")}</div></div>`;
  const exs=[];if(e.example)exs.push([e.example,e.examplePt||""]);(e.examples||[]).forEach(x=>exs.push(x));(e.found||[]).forEach(x=>{if(!exs.some(y=>y[0]===x[0]))exs.push(x)});
  if(exs.length)h+=`<div class="stack" style="gap:6px"><span class="label">Exemplos de uso</span><div class="exl">${exs.slice(0,4).map(x=>`<div class="exi"><div><i class="it">${esc(x[0])}</i>${x[1]?`<span>${esc(x[1])}</span>`:""}</div>${spkBtn(x[0])}</div>`).join("")}</div></div>`;
  if(e.phrases&&e.phrases.length)h+=`<div class="stack" style="gap:6px"><span class="label">Expressões do curso</span><div class="exl">${e.phrases.map(p=>`<div class="exi"><div><i class="it">${esc(p.it)}</i><span>${esc(p.pt)}</span></div>${spkBtn(p.it)}</div>`).join("")}</div></div>`;
  if(e.topic&&TOPIC[e.topic])h+=`<p class="small muted">Do vocabulário de <b>${esc(TOPIC[e.topic].lvl)} · ${esc(TOPIC[e.topic].t)}</b>.</p>`;
  if(e.meaning)h+=`<p class="favline small">${isFav?"★ Salva nas minhas palavras. Ela aparece nos cartões de revisão.":"Toque na estrela para revisar esta palavra nos cartões."}</p>`;
  if(SH.src!=="ai"&&SH.src!=="news")h+=hasClaude()?`<button class="btn ghost small" id="shAsk">Explicar melhor com o Claude</button><p class="small muted" id="shAskMsg"></p>`:extLinks()}
 else h+=`<p class="muted">Esta palavra ainda não está no dicionário do curso.</p>`+(hasClaude()?`<button class="btn primary" id="shAsk">Perguntar ao Claude</button><p class="small muted" id="shAskMsg"></p>`:extLinks());
 if(SH.sentence&&SH.sentence.toLowerCase()!==SH.surface.toLowerCase())h+=`<div class="stack" style="gap:6px"><span class="label">Onde aparece</span><div class="exi"><div><i class="it">${esc(SH.sentence)}</i></div>${spkBtn(SH.sentence)}</div></div>`;
 $("#shBody").innerHTML=h;tokenize($("#shBody"));
 if($("#shAsk"))$("#shAsk").onclick=askClaude}
$("#shClose").onclick=()=>showSheet(false);
$("#sheetBack").onclick=()=>showSheet(false);
$("#shFav").onclick=toggleFav;
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#sheet").hidden)showSheet(false)});
async function askClaude(){const b=$("#shAsk"),msg=$("#shAskMsg"),k=SH.k,surface=SH.surface,sentence=SH.sentence,had=SH.entry;b.disabled=true;b.textContent="Consultando…";msg.textContent="";
 try{const sample=await getSample();if(!sample)throw{code:"not_granted"};
  const r=await sample.json(`Você é um dicionário e professor de italiano para um estudante brasileiro de nível A1–A2.
Palavra: "${surface}"
Frase em que aparece: "${sentence}"
Se for preposição (simples ou articulada), artigo ou pronome, explique como a forma é construída (ex.: nella = in + la) e quando se usa.
Se for verbo conjugado, diga o infinitivo, o tempo e a pessoa.
Responda somente com um objeto JSON neste formato:
{"lemma":"forma de dicionário em italiano","pos":"classe gramatical em português","meaning":"significado em português neste contexto","note":"explicação curta da forma (tempo verbal, plural, formação etc.) em português","how":["até 3 regras de uso, curtas, em português"],"synonyms":["até 3 sinônimos em italiano, se houver"],"example":"uma frase nova e simples em italiano","examplePt":"tradução da frase"}`,{modelTier:"quick",cache:{gcTime:86400000}});
  if(!r||typeof r!=="object"||!r.meaning)throw{code:"invalid_json"};
  r.synonyms=Array.isArray(r.synonyms)?r.synonyms.map(String).slice(0,4):[];r.how=Array.isArray(r.how)?r.how.map(x=>esc(String(x))).slice(0,3):[];
  AI_CACHE[k]=r;saveAI();if(typeof NEWS!=="undefined")NEWS.extra[k]=r;
  if(SH&&SH.k===k){SH.entry=had?Object.assign({},had,{note:r.note||had.note,how:(had.how||[]).concat(r.how),synonyms:r.synonyms,example:r.example,examplePt:r.examplePt}):r;SH.src="ai";renderSheet()}if(typeof refreshTokenMarks==="function")refreshTokenMarks()}
 catch(e){const c=e&&e.code;b.disabled=false;b.textContent="Perguntar ao Claude";
  if(["not_granted","sampling_disabled","not_declared","capability_disabled","capability_removed"].includes(c)){b.hidden=true;msg.textContent="A consulta ao Claude não está disponível aqui."}
  else if(c==="rate_limited")msg.textContent="Muitas consultas em pouco tempo. Tente de novo em alguns minutos.";
  else msg.textContent="Não deu certo desta vez. Toque para tentar de novo."}}
function toggleFav(){const e=SH&&SH.entry;if(!e||!e.meaning)return;const key=favKeyOf(e,SH.k);
 if(S.favs[key]){delete S.favs[key];removeFavCard(key)}
 else{const ex=e.example?[e.example,e.examplePt||""]:((e.found||[])[0]||(e.examples||[])[0]||["",""]);
  S.favs[key]={lemma:e.lemma||SH.surface,surface:SH.surface,pos:e.pos||"",meaning:e.meaning||"",synonyms:(e.synonyms||[]).slice(0,5),example:ex[0]||"",examplePt:ex[1]||"",context:SH.sentence,date:SH.btn&&SH.btn.closest("#newsBox")&&NEWS.cur?NEWS.cur.date:today(),added:today()};addFavCard(key)}
 save();renderSheet();refreshTokenMarks();updateFavCount();renderDecks();renderHome()}
