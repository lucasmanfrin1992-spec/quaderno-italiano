/* ============================ VERBOS ============================ */
const P=["io","tu","lui/lei","noi","voi","loro"];
const IRR_PRES={essere:"sono sei è siamo siete sono",avere:"ho hai ha abbiamo avete hanno",andare:"vado vai va andiamo andate vanno",fare:"faccio fai fa facciamo fate fanno",venire:"vengo vieni viene veniamo venite vengono",stare:"sto stai sta stiamo state stanno",dire:"dico dici dice diciamo dite dicono",uscire:"esco esci esce usciamo uscite escono",potere:"posso puoi può possiamo potete possono",volere:"voglio vuoi vuole vogliamo volete vogliono",dovere:"devo devi deve dobbiamo dovete devono",sapere:"so sai sa sappiamo sapete sanno",dare:"do dai dà diamo date danno",bere:"bevo bevi beve beviamo bevete bevono",rimanere:"rimango rimani rimane rimaniamo rimanete rimangono",salire:"salgo sali sale saliamo salite salgono",scegliere:"scelgo scegli sceglie scegliamo scegliete scelgono",tenere:"tengo tieni tiene teniamo tenete tengono",piacere:"piaccio piaci piace piacciamo piacete piacciono",tradurre:"traduco traduci traduce traduciamo traducete traducono"};
const IRR_FUT={essere:"sar",avere:"avr",andare:"andr",fare:"far",dare:"dar",stare:"star",venire:"verr",volere:"vorr",potere:"potr",dovere:"dovr",sapere:"sapr",vedere:"vedr",vivere:"vivr",bere:"berr",rimanere:"rimarr",dire:"dir",tenere:"terr",cadere:"cadr"};
const IRR_IMP={essere:"ero eri era eravamo eravate erano",fare:"facevo facevi faceva facevamo facevate facevano",bere:"bevevo bevevi beveva bevevamo bevevate bevevano",dire:"dicevo dicevi diceva dicevamo dicevate dicevano",tradurre:"traducevo traducevi traduceva traducevamo traducevate traducevano"};
const VERBS=[
 ["essere","ser/estar","stato","e"],["avere","ter","avuto","a"],["andare","ir","andato","e"],["fare","fazer","fatto","a"],["venire","vir","venuto","e"],["stare","estar/ficar","stato","e"],["dire","dizer","detto","a"],["uscire","sair","uscito","e"],["potere","poder","potuto","a"],["volere","querer","voluto","a"],["dovere","dever / ter que","dovuto","a"],["sapere","saber","saputo","a"],["dare","dar","dato","a"],["bere","beber","bevuto","a"],["rimanere","ficar","rimasto","e"],
 ["parlare","falar","","a"],["lavorare","trabalhar","","a"],["abitare","morar","","a"],["mangiare","comer","","a"],["cercare","procurar","","a"],["pagare","pagar","","a"],["studiare","estudar","","a"],["cominciare","começar","","a"],["comprare","comprar","","a"],["aspettare","esperar","","a"],["ascoltare","ouvir","","a"],["giocare","jogar / brincar","","a"],["guardare","olhar / assistir","","a"],["chiamare","chamar / ligar","","a"],["visitare","visitar","","a"],["viaggiare","viajar","","a"],["prenotare","reservar","","a"],["mandare","mandar","","a"],["regalare","presentear","","a"],["telefonare","telefonar","","a"],["tagliare","cortar","","a"],["ricordare","lembrar","","a"],["incontrare","encontrar","","a"],["provare","experimentar / tentar","","a"],["portare","levar / trazer / usar (roupa)","","a"],["arrivare","chegar","","e"],["tornare","voltar","","e"],["entrare","entrar","","e"],["restare","ficar","","e"],["diventare","tornar-se","","e"],["costare","custar","","e"],["durare","durar","","e"],
 ["prendere","pegar / tomar","preso","a"],["vedere","ver","visto","a"],["scrivere","escrever","scritto","a"],["leggere","ler","letto","a"],["mettere","colocar","messo","a"],["chiudere","fechar","chiuso","a"],["chiedere","pedir / perguntar","chiesto","a"],["rispondere","responder","risposto","a"],["perdere","perder","perso","a"],["spendere","gastar","speso","a"],["decidere","decidir","deciso","a"],["vincere","vencer","vinto","a"],["vivere","viver","vissuto","a"],["conoscere","conhecer","conosciuto","a"],["vendere","vender","","a"],["credere","acreditar","","a"],["aggiungere","acrescentar","aggiunto","a"],["cuocere","cozinhar","cotto","a"],["correre","correr","corso","a"],["nascere","nascer","nato","e"],["scendere","descer","sceso","e"],["piacere","agradar (gostar)","piaciuto","e"],["succedere","acontecer","successo","e"],["crescere","crescer","cresciuto","e"],["scegliere","escolher","scelto","a"],["tenere","segurar / manter","","a"],["tradurre","traduzir","tradotto","a"],
 ["dormire","dormir","","a"],["sentire","sentir / ouvir","","a"],["aprire","abrir","aperto","a"],["offrire","oferecer","offerto","a"],["partire","partir","","e"],["salire","subir","","e"],["morire","morrer","morto","e"],["finire","terminar","","a",1],["capire","entender","","a",1],["pulire","limpar","","a",1],["preferire","preferir","","a",1],["spedire","enviar (correio)","","a",1],["guarire","sarar","","e",1]
].map(v=>({inf:v[0],pt:v[1],pp:v[2]||regPP(v[0]),aux:v[3],isc:!!v[4]}));
const REFL=[["alzarsi","levantar-se","alzare"],["svegliarsi","acordar","svegliare"],["chiamarsi","chamar-se","chiamare"],["lavarsi","lavar-se","lavare"],["vestirsi","vestir-se","vestire"],["divertirsi","divertir-se","divertire"],["riposarsi","descansar","riposare"],["sposarsi","casar-se","sposare"],["sentirsi","sentir-se","sentire"],["trovarsi","encontrar-se / sentir-se (num lugar)","trovare"]];
function regPP(inf){const s=inf.slice(0,-3),e=inf.slice(-3);return s+(e==="are"?"ato":e==="ere"?"uto":"ito")}
function join(stem,end,isAre){if(isAre&&/[cg]$/.test(stem)&&/^[ie]/.test(end))stem+="h";if(/i$/.test(stem)&&/^i/.test(end))end=end.slice(1);return stem+end}
function pres(v){if(IRR_PRES[v.inf])return IRR_PRES[v.inf].split(" ");const s=v.inf.slice(0,-3),e=v.inf.slice(-3);
 let E=e==="are"?["o","i","a","iamo","ate","ano"]:e==="ere"?["o","i","e","iamo","ete","ono"]:v.isc?["isco","isci","isce","iamo","ite","iscono"]:["o","i","e","iamo","ite","ono"];
 return E.map(x=>join(s,x,e==="are"))}
function futStem(v){if(IRR_FUT[v.inf])return IRR_FUT[v.inf];const s=v.inf.slice(0,-3),e=v.inf.slice(-3);
 if(e==="ire")return s+"ir";if(e==="ere")return s+"er";if(/(ci|gi)$/.test(s))return s.slice(0,-1)+"er";return join(s,"er",true)}
function fut(v){const st=futStem(v);return["ò","ai","à","emo","ete","anno"].map(x=>st+x)}
function cond(v){const st=futStem(v);return["ei","esti","ebbe","emmo","este","ebbero"].map(x=>st+x)}
function imperf(v){if(IRR_IMP[v.inf])return IRR_IMP[v.inf].split(" ");const st=v.inf.slice(0,-2);return["vo","vi","va","vamo","vate","vano"].map(x=>st+x)}
function pass(v){const A=v.aux==="a"?["ho","hai","ha","abbiamo","avete","hanno"]:["sono","sei","è","siamo","siete","sono"];
 return A.map((a,i)=>a+" "+(v.aux==="e"?v.pp.slice(0,-1)+(i<3?"o":"i"):v.pp))}
function gerund(v){const irr={fare:"facendo",bere:"bevendo",dire:"dicendo",tradurre:"traducendo"};if(irr[v.inf])return irr[v.inf];const s=v.inf.slice(0,-3);return s+(v.inf.endsWith("are")?"ando":"endo")}
const TENSES={pres:{n:"presente",f:pres},pass:{n:"passato prossimo",f:pass},fut:{n:"futuro",f:fut},imp:{n:"imperfetto",f:imperf},cond:{n:"condizionale",f:cond}};

/* ============================ ESTADO ============================ */
const KEY="quaderno.v1";
const RESET_EPOCH="2026-11-02"; // muda este valor para zerar os cartões de todos
const DECKS={err:"Meus erros",fav:"Minhas palavras",vA1:"Vocabulário A1",vA2:"Vocabulário A2",verb:"Verbos (presente, passato, futuro)"};
function defState(){return{cards:{},settings:{decks:{err:true,frase:true,fav:true,vA1:true,vA2:true,verb:true},newPerDay:20,dir:"mix",typing:false},daily:{date:"",newDone:0,reviewed:0},streak:{last:"",count:0},favs:{},newsDone:{},course:{},writing:{},shadow:{},errs:{},log:{},tests:{},sents:{},estat:{},diary:{},chats:{},bt:{},dict:{},pairs:{},resetEpoch:RESET_EPOCH,updatedAt:0}}
function hydrate(o){const d=defState();S=Object.assign(d,o);S.settings=Object.assign(defState().settings,o.settings||{});S.settings.decks=Object.assign(defState().settings.decks,(o.settings||{}).decks||{});
 S.favs=S.favs||{};S.newsDone=S.newsDone||{};S.cards=S.cards||{};S.course=S.course||{};S.writing=S.writing||{};S.shadow=S.shadow||{};S.errs=S.errs||{};S.log=S.log||{};S.tests=S.tests||{};
 if(o.resetEpoch!==RESET_EPOCH){S.cards={};S.daily={date:"",newDone:0,reviewed:0};S.streak={last:"",count:0};delete S.best;S.resetEpoch=RESET_EPOCH;return true}return false}
let S=defState();
let DB=null,UID=null,stateRef=null,syncT=null,syncing=false,syncDirty=false,syncRetried=false;
try{const raw=localStorage.getItem(KEY);if(raw&&hydrate(JSON.parse(raw)))localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}
function saveLocal(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function save(){S.updatedAt=Date.now();saveLocal();scheduleSync()}
function scheduleSync(){if(!stateRef)return;syncDirty=true;clearTimeout(syncT);syncT=setTimeout(flushSync,1500)}
async function flushSync(){if(syncing||!syncDirty||!stateRef)return;syncing=true;syncDirty=false;
 try{await stateRef.set(JSON.parse(JSON.stringify(S)));syncRetried=false}
 catch(e){if(e&&e.code==="unavailable"&&!syncRetried){syncRetried=true;syncDirty=true;setTimeout(flushSync,2000+Math.random()*2000)}}
 syncing=false;if(syncDirty&&!syncRetried)scheduleSync()}
function fmt(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function today(){return fmt(new Date())}
function addDays(n){const d=new Date();d.setDate(d.getDate()+n);return fmt(d)}
function rollDay(){if(S.daily.date!==today()){S.daily={date:today(),newDone:0,reviewed:0};saveLocal()}}
rollDay();

/* ============================ UTIL ============================ */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=a=>a[Math.random()*a.length|0];
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[’`]/g,"'").replace(/\s+/g," ").trim();
const canSpeak="speechSynthesis" in window;
function speak(t){if(!canSpeak)return;try{const u=new SpeechSynthesisUtterance(String(t).replace(/\(.*?\)/g,"").replace(/\.\.\./g,"").replace(/___/g,""));u.lang="it-IT";u.rate=.9;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function spkBtn(t){return canSpeak?`<button class="spk" data-say="${esc(t)}" aria-label="Ouvir pronúncia">${SPK_SVG}</button>`:""}
document.addEventListener("click",e=>{const b=e.target.closest("[data-say]");if(b){e.stopPropagation();speak(b.dataset.say)}});
const TOPIC=Object.fromEntries(COURSE.map(t=>[t.id,t]));

/* ============================ DICIONÁRIO ============================ */
const LET="A-Za-zÀ-ÖØ-öø-ÿ";
const ARTRE=/^(il|lo|la|i|gli|le|un|uno|una)\s+|^(l'|un')/i;
const VOCIDX={},PHRASES=[],FORMS={};
function addIdx(k,e){k=k.toLowerCase();if(!k||VOCIDX[k])return;VOCIDX[k]=e}
COURSE.forEach(t=>t.voc.forEach(([itw,pt])=>{const base=itw.replace(/\s*\(.*?\)\s*/g,"").trim();const w=base.replace(ARTRE,"").trim();
 const e={lemma:base,meaning:pt,topic:t.id};
 if(!/\s/.test(w)&&!/[?!…]/.test(w)){addIdx(w,e);
  const infl=[];if(/o$/.test(w))infl.push(w.slice(0,-1)+"i",w.slice(0,-1)+"a",w.slice(0,-1)+"e");if(/a$/.test(w))infl.push(w.slice(0,-1)+"e");if(/e$/.test(w))infl.push(w.slice(0,-1)+"i");if(/co$/.test(w))infl.push(w.slice(0,-2)+"chi",w.slice(0,-2)+"ci",w.slice(0,-2)+"che");if(/ca$/.test(w))infl.push(w.slice(0,-2)+"che");if(/go$/.test(w))infl.push(w.slice(0,-2)+"ghi");
  infl.forEach(f=>addIdx(f,Object.assign({},e,{inflected:true})))}
 else PHRASES.push({it:base,pt,topic:t.id})}));
VERBS.forEach(v=>{Object.entries(TENSES).forEach(([tk,T])=>{if(tk==="pass")return;T.f(v).forEach((f,i)=>{(FORMS[f]=FORMS[f]||[]).push({v,tk,i})})});
 [v.pp,v.pp.replace(/o$/,"a"),v.pp.replace(/o$/,"i"),v.pp.replace(/o$/,"e")].forEach(f=>{if(!FORMS[f]||!FORMS[f].some(x=>x.v===v&&x.tk==="pp"))(FORMS[f]=FORMS[f]||[]).push({v,tk:"pp",i:-1})});
 (FORMS[gerund(v)]=FORMS[gerund(v)]||[]).push({v,tk:"ger",i:-1});(FORMS[v.inf]=FORMS[v.inf]||[]).push({v,tk:"inf",i:-1})});
const VERBMAP=Object.fromEntries(VERBS.map(v=>[v.inf,v]));
REFL.forEach(([r,pt,base])=>{const v=VERBMAP[base];const e={lemma:r,meaning:pt,pos:"verbo reflexivo",how:["Reflexivo: o pronome muda com a pessoa (mi, ti, si, ci, vi, si) e vem antes do verbo: <i class='it'>mi "+(v?pres(v)[0]:"")+"</i>.","No passado usa sempre essere: <i class='it'>mi sono "+(v?v.pp:"")+"</i>."]};addIdx(r,e)});
// frases de exemplo para busca (exemplos dos infográficos + exercícios com a resposta)
const SENT=[...EXS];
COURSE.forEach(t=>t.ex.forEach(x=>{if(x[0]==="f"){const a=x[3].split("/")[0];SENT.push([x[1].replace("___",a).replace(/\s*\(.*?\)\s*/g," ").replace(/\s+([.,?!])/g,"$1").trim(),""])}else if(x[0]==="x")SENT.push([x[2].split("|")[0],""])}));
const TLAB={pres:"presente",fut:"futuro",imp:"imperfetto",cond:"condizionale",pp:"particípio passado",ger:"gerúndio",inf:"infinitivo"};
function findExamples(w,max){const re=new RegExp("(^|[^"+LET+"'])"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"($|[^"+LET+"])","i");const out=[],seen=new Set();
 for(const s of SENT){if(re.test(s[0])&&!seen.has(s[0])){seen.add(s[0]);out.push(s);if(out.length>=(max||3))break}}return out}
function lookupLocal(k,surface){k=k.toLowerCase().replace(/’/g,"'");const kk=k.replace(/'$/,"");
 let e=null;const f=FUNC[k]||FUNC[kk];if(f)e=Object.assign({},f);
 const vf=FORMS[kk];
 const voc=VOCIDX[kk]||VOCIDX[k];
 if(!e&&voc)e={lemma:voc.lemma,meaning:voc.meaning,pos:voc.inflected?"forma flexionada":"",note:voc.inflected?"Forma de “"+voc.lemma+"” (plural ou feminino).":"",topic:voc.topic};
 if(!e&&!vf)return null;
 if(!e)e={lemma:vf[0].v.inf,meaning:vf[0].v.pt,pos:"verbo"};
 if(vf)e.verb=vf;
 e.found=findExamples(surface||kk,3);
 e.phrases=PHRASES.filter(p=>new RegExp("(^|[^"+LET+"])"+kk.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"($|[^"+LET+"])","i").test(p.it)).slice(0,4);
 return e}

/* tokenização: transforma o texto italiano em palavras clicáveis */
function tokText(text,extra){let out="",last=0;const re=new RegExp("["+LET+"]+['’]?","g");let m;
 while((m=re.exec(text))){let w=m[0];const off=m.index;
  if(/['’]$/.test(w)){const nx=text[off+w.length]||"";if(!new RegExp("["+LET+"]").test(nx)&&!/^po['’]$/i.test(w))w=w.slice(0,-1)}
  out+=esc(text.slice(last,off))+`<button class="w" data-w="${esc(w.toLowerCase().replace(/’/g,"'"))}"${extra||""}>${esc(w)}</button>`;last=off+w.length;re.lastIndex=last}
 return out+esc(text.slice(last))}
function tokenize(root){(root||document).querySelectorAll(".it").forEach(el=>{if(el.dataset.tk||el.closest("button,.opt"))return;if(el.querySelector(".it"))return;el.dataset.tk="1";
 const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest("button")?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 nodes.forEach(n=>{if(!n.nodeValue.trim())return;const span=document.createElement("span");span.innerHTML=tokText(n.nodeValue);n.replaceWith(...span.childNodes)})})}

/* ============================ ABAS ============================ */
const VALID=["inicio","curso","escrita","shadow","news","cartoes"];
function showTab(name){if(!VALID.includes(name))name="inicio";if(name!=="news"&&typeof READ!=="undefined"&&READ.state!=="idle")stopReading();$$("[data-view]").forEach(v=>v.hidden=v.dataset.view!==name);$$("nav.tabs button").forEach(b=>b.setAttribute("aria-selected",b.dataset.tab===name));
 try{localStorage.setItem(KEY+".tab",name)}catch(e){}window.scrollTo(0,0);if(name==="cartoes")renderFlash();if(name==="inicio")renderHome();if(name==="curso")renderCourse();if(name==="escrita"){renderWriting();renderWMode()}if(name!=="shadow"&&typeof SHP!=="undefined"&&SHP.state!=="idle")stopPod(true);if(name==="shadow"){renderShadow();renderSMode()}if(name==="news"){renderNews();if(!$("#ns-cal").hidden)renderCal();if(!$("#ns-favs").hidden)renderFavs()}}
$$("nav.tabs button").forEach(b=>b.addEventListener("click",()=>showTab(b.dataset.tab)));
document.addEventListener("click",e=>{const g=e.target.closest("[data-goto]");if(g){showTab(g.dataset.goto);if(g.dataset.pod)openPod(g.dataset.pod);if(g.dataset.topic)openTopic(g.dataset.topic,g.dataset.part||"voc");if(g.dataset.wtask)openWTask(g.dataset.wtask)}});

/* ============================ CURSO ============================ */
let CLVL="A1",CUR=null,CPART="voc";
try{CLVL=localStorage.getItem(KEY+".lvl")||"A1"}catch(e){}
function tprog(id){const c=S.course[id]||{};return c}
function isDone(id){const c=tprog(id);return c.best!=null&&c.best>=70}
function lvlTopics(l){return COURSE.filter(t=>t.lvl===l)}
function nextTopic(){return COURSE.find(t=>!isDone(t.id))||COURSE[COURSE.length-1]}
$$("#lvlSeg button").forEach(b=>b.addEventListener("click",()=>{CLVL=b.dataset.lvl;try{localStorage.setItem(KEY+".lvl",CLVL)}catch(e){}renderCourse()}));
function renderCourse(){if(CUR&&!$("#cTopic").hidden)return;
 $$("#lvlSeg button").forEach(b=>{const on=b.dataset.lvl===CLVL;b.classList.toggle("on",on);b.setAttribute("aria-selected",on)});
 const ts=lvlTopics(CLVL),done=ts.filter(t=>isDone(t.id)).length;
 $("#lvlHead").innerHTML=`<div class="lvlhead"><div><h2>Unidade ${CLVL}</h2><p class="muted small">${CLVL==="A1"?"Do alfabeto ao presente: apresentar-se, descrever, rotina, cidade, compras, família e gostos.":"O passado, o futuro e os pronomes: viagens, lembranças, compras, saúde, trabalho e cortesia."}</p></div><span class="pill ${done===ts.length?"ok":"todo"}">${done}/${ts.length} tópicos</span></div><div class="lvlbar"><i style="width:${done/ts.length*100}%"></i></div>`;
 $("#tlist").innerHTML=ts.map(t=>{const c=tprog(t.id),d=isDone(t.id);let h=`<button class="tcard${d?" done":""}" data-topic-open="${t.id}"><span class="tn">${d?"✓":t.n}</span><div><h3>${esc(t.t)}</h3><p>${esc(t.sub)}</p></div><span class="pill ${d?"ok":c.best!=null?"todo":""}">${c.best!=null?c.best+"%":"novo"}</span></button>`;
  const T=TESTS.find(x=>x.lvl===t.lvl&&x.after===t.n);if(T){const r=testRes(T.id);h+=`<button class="tcard test${r&&r.best>=70?" done":""}" data-test-open="${T.id}"><span class="tn">✎</span><div><h3>${esc(T.t)}</h3><p>Teste de bloco: 20 questões misturando os 5 tópicos. Também serve para pular o que você já sabe.</p></div><span class="pill ${r?(r.best>=70?"ok":"todo"):""}">${r?r.best+"%":"teste"}</span></button>`}return h}).join("");
 $$("[data-test-open]").forEach(b=>b.onclick=()=>openTest(b.dataset.testOpen));
 $$("[data-topic-open]").forEach(b=>b.onclick=()=>openTopic(b.dataset.topicOpen,"voc"))}
function openTopic(id,part){const t=TOPIC[id];if(!t)return;CUR=t;CLVL=t.lvl;CPART=part||"voc";$("#cHome").hidden=true;$("#cTopic").hidden=false;try{localStorage.setItem(KEY+".topic",id)}catch(e){}renderTopic();window.scrollTo(0,0)}
function closeTopic(){CUR=null;RUN=null;TEST=null;$("#cTopic").hidden=true;$("#cHome").hidden=false;renderCourse();try{localStorage.removeItem(KEY+".topic")}catch(e){}window.scrollTo(0,0)}
function markSeen(part){const c=S.course[CUR.id]=S.course[CUR.id]||{};if(!c[part]){c[part]=1;save()}}
function renderTopic(){const t=CUR,c=tprog(t.id),idx=COURSE.indexOf(t),nxt=COURSE[idx+1],w=WRITING.find(x=>x.topic===t.id);
 const tabs=[["voc","Vocabulário"],["gram","Gramática"],["hist","História"],["ex","Exercícios"]];
 let h=`<button class="back" id="cBack">← Unidade ${t.lvl}</button>
 <div class="tophead"><span class="label">${t.lvl} · Tópico ${t.n} de 10</span><h2 class="it" style="font-style:normal;color:var(--ink)">${esc(t.t)}</h2><p class="muted small">${esc(t.sub)}</p></div>
 <div class="subtabs" role="tablist">${tabs.map(([k,n])=>`<button role="tab" data-part="${k}" class="${CPART===k?"on":""}" aria-selected="${CPART===k}">${n}${c[k]||(k==="ex"&&c.best!=null)?`<span class="ok">✓</span>`:""}</button>`).join("")}</div><div id="cBody" class="stack" style="gap:18px"></div>`;
 $("#cTopic").innerHTML=h;$("#cBack").onclick=closeTopic;
 $$("#cTopic [data-part]").forEach(b=>b.onclick=()=>{CPART=b.dataset.part;RUN=null;renderTopic();$("#cTopic").scrollIntoView({block:"start"})});
 const body=$("#cBody");
 if(CPART==="voc"){markSeen("voc");
  const vc=typeof renderVocabCtx==="function"?renderVocabCtx(t):null;
  body.innerHTML=(vc?`<p class="muted small">${t.voc.length} palavras e expressões. Como no livro, o tópico começa por um diálogo em que elas aparecem; depois vêm os cartões, cada um com a frase do diálogo e um exemplo. Toque em qualquer palavra italiana para ver o significado.</p>`+vc:`<p class="muted small">${t.voc.length} palavras e expressões. Toque numa palavra para ver exemplos; o alto-falante pronuncia.</p>
  <div class="vgrid">${t.voc.map(v=>`<div class="vcell"><div><span class="it">${esc(v[0])}</span><span class="pt">${esc(v[1])}</span></div>${spkBtn(v[0])}</div>`).join("")}</div>`)+`
  <button class="btn primary" data-part-go="gram">Ir para a gramática →</button>`;if(vc&&typeof dlgWire==="function")dlgWire(body,DLG[t.id])}
 else if(CPART==="gram"){markSeen("gram");
  body.innerHTML=t.gram.map(g=>`<section class="gsec"><h3>${esc(g.h)}</h3>${g.html}</section>`).join("")+`<button class="btn primary" data-part-go="hist">Ler a história do tópico →</button>`}
 else if(CPART==="hist"){markSeen("hist");renderStory(body)}
 else{if(!RUN||RUN.topic!==t.id)RUN=null;if(RUN)renderQ();else renderExIntro()}
 if(CPART!=="ex"||!RUN){const nav=document.createElement("div");nav.className="row";
  if(CPART==="ex"&&w)nav.innerHTML=`<button class="btn" data-goto="escrita" data-wtask="${w.id}">Escrita deste tópico: ${esc(w.t)}</button>`;
  if(nxt&&CPART==="ex")nav.innerHTML+=`<button class="btn" id="nextTopic">Próximo: ${esc(nxt.t)} →</button>`;
  body.appendChild(nav);if($("#nextTopic"))$("#nextTopic").onclick=()=>openTopic(nxt.id,"voc")}
 $$("#cBody [data-part-go]").forEach(b=>b.onclick=()=>{CPART=b.dataset.partGo;renderTopic();$("#cTopic").scrollIntoView({block:"start"})});
 tokenize(body)}

/* exercícios do tópico */
let RUN=null;
function renderExIntro(){const t=CUR,c=tprog(t.id);
 $("#cBody").innerHTML=`<div class="card stack"><span class="label">Exercícios · 16 questões por rodada</span><h3>Pratique o que viu</h3><p class="small muted">Completar com uma palavra, marcar a opção certa, escolher a frase correta e exercícios de escuta. Uma parte das questões é gerada na hora, então cada rodada é diferente. Cada resposta vem com a explicação, e os erros vão para os cartões em “Meus erros”. Acima de 70% o tópico fica concluído.</p>${c.best!=null?`<p class="small">Seu melhor resultado: <b>${c.best}%</b></p>`:""}<button class="btn primary" id="exStart">${c.best!=null?"Fazer de novo":"Começar"}</button></div>`;
 $("#exStart").onclick=()=>{RUN={topic:t.id,qs:buildQs(t),i:0,score:0,wrong:[]};renderQ()}}
function blankify(s){return esc(s).replace("___",'<span class="blank">&nbsp;</span>')}
function renderQ(){const r=RUN,q=r.qs[r.i],n=r.qs.length;
 const kind=q.type==="f"?"Complete com uma palavra":q.type==="x"?"Marque a frase correta":q.type==="lf"?"Ouça e complete a palavra que falta":q.type==="lm"?"Ouça e marque a frase que você escutou":q.voc?"Vocabulário":"Marque a opção certa";
 let h=`<div class="row" style="justify-content:space-between"><span class="label">${r.test?"Teste · ":""}${r.i+1} de ${n}${q.gen?" · gerada":""}</span><button class="btn ghost small" id="exQuit">Sair</button></div>
 <div class="progress"><i style="width:${r.i/n*100}%"></i></div><div class="card stack"><span class="qkind">${kind}</span>`;
 if(q.type==="lf"||q.type==="lm")h+=`<button class="btn listenbtn" id="lPlay">${SPK_SVG}Ouvir de novo</button>`;
 if(q.type==="lm"){}else if(q.type!=="x")h+=`<div class="q${q.voc?"":" it"}">${q.voc?esc(q.q):blankify(q.q)}</div>`;else if(q.q&&q.q!=="Marque a frase correta")h+=`<p>${esc(q.q)}</p>`;
 if(q.type==="f"||q.type==="lf")h+=`${q.hint?`<span class="hintchip">${esc(q.hint)}</span>`:""}<form id="fForm" class="fillrow"><input type="text" id="fIn" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="uma palavra" aria-label="Resposta"><button class="btn primary" type="submit">Verificar</button></form>`;
 else h+=`<div class="opts">${q.opts.map((o,k)=>`<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}</div>`;
 h+=`<div id="fb"></div></div>`;$("#cBody").innerHTML=h;if(q.type!=="lf")tokenize($("#cBody"));
 $("#exQuit").onclick=()=>{const t=r.test,f=r.focus;RUN=null;t?openTest(t):f?closeTopic():renderTopic()};
 if($("#lPlay")){const sp=()=>speak(q.say);$("#lPlay").onclick=sp;setTimeout(sp,250)}
 if(q.type!=="f"&&q.type!=="lf")$$("#cBody .opt").forEach(b=>b.onclick=()=>{const ch=q.opts[+b.dataset.k],ok=ch===q.a;q.chosen=ch;$$("#cBody .opt").forEach(x=>{x.disabled=true;if(q.opts[+x.dataset.k]===q.a)x.classList.add("right")});if(!ok)b.classList.add("wrong");feedback(ok,q)});
 else{const inp=$("#fIn");if(q.type==="f")inp.focus({preventScroll:true});$("#fForm").onsubmit=e=>{e.preventDefault();if(!inp.value.trim())return;const answers=q.a.split("/");const u=norm(inp.value);
  const okN=answers.some(a=>norm(a)===u);const exact=answers.some(a=>a.toLowerCase().trim()===inp.value.toLowerCase().trim().replace(/[’`]/g,"'"));inp.disabled=true;$("#fForm button").disabled=true;feedback(okN,q,okN&&!exact)}}}
function feedback(ok,q,accentNote){const r=RUN;q.ok=ok;recordCat(qCat(q),ok);if(ok)r.score++;else{r.wrong.push(q);addErrCard(q);save()}
 const full=q.type==="lf"||q.type==="lm"?q.say:q.type==="f"&&!q.q.includes("→")?q.q.replace("___",q.a.split("/")[0]).replace(/\s*\(.*?\)\s*$/,""):q.type==="x"?q.a:"";
 $("#fb").innerHTML=`<div class="fb ${ok?"ok":"no"}"><b>${ok?"Certo!":"Resposta: "+esc(q.a.split("/").join(" ou "))}</b>${accentNote?`<span>Atenção à grafia/acento: <b>${esc(q.a.split("/")[0])}</b></span>`:""}${full?`<div class="row" style="gap:8px;flex-wrap:nowrap"><i class="it" style="flex:1">${esc(full)}</i>${spkBtn(full)}</div>`:""}<div>${esc(q.exp)}</div></div>
 <button class="btn primary" id="nextQ" style="margin-top:12px">${r.i<r.qs.length-1?"Próxima":"Ver resultado"}</button>`;tokenize($("#fb"));
 $("#nextQ").onclick=()=>{r.i++;r.i<r.qs.length?renderQ():(r.test?endTest():r.focus?endFocus():endEx())};$("#nextQ").focus({preventScroll:true})}
function endEx(){const r=RUN,n=r.qs.length,pct=Math.round(r.score/n*100),c=S.course[r.topic]=S.course[r.topic]||{};if(c.best==null||pct>c.best)c.best=pct;c.ex=1;c.last=today();if(r.review)revAfter(r.topic,pct);else revInit(r.topic);logInc("e");save();
 const msg=r.review?(pct>=70?"Revisão feita. O tópico volta mais tarde para a próxima revisão.":"Vale rever a gramática: esta revisão volta em 2 dias."):pct>=90?"Excelente. Tópico dominado.":pct>=70?"Muito bom. Tópico concluído.":pct>=50?"No caminho. Releia a gramática dos erros e tente de novo.":"Vale rever a gramática antes de repetir.";
 const t=CUR,idx=COURSE.indexOf(t),nxt=COURSE[idx+1];
 $("#cBody").innerHTML=`<div class="card stack"><span class="label">${r.review?"Revisão do tópico":"Resultado"}</span><h2>${r.score}/${n} · ${pct}%</h2><p>${msg}</p>
 ${r.wrong.length?`<p class="small muted">Os erros foram para os cartões, no baralho “Meus erros”.</p><div class="stack"><div class="label">Para revisar</div>${r.wrong.map(q=>`<div class="fb no"><div class="${q.voc?"":"it"}">${q.type==="x"||q.type==="lm"?esc(q.a):q.voc?esc(q.q):blankify(q.q)}</div><b>${esc(q.a.split("/").join(" ou "))}</b><span>${esc(q.exp)}</span></div>`).join("")}</div>`:""}
 <div class="row"><button class="btn primary" id="again">Nova rodada</button><button class="btn" id="toGram">Rever a gramática</button>${nxt&&pct>=70?`<button class="btn" id="goNext">Próximo tópico →</button>`:""}</div></div>`;
 tokenize($("#cBody"));RUN=null;
 $("#again").onclick=()=>{RUN={topic:t.id,qs:buildQs(t),i:0,score:0,wrong:[]};renderQ()};$("#toGram").onclick=()=>{CPART="gram";renderTopic()};if($("#goNext"))$("#goNext").onclick=()=>openTopic(nxt.id,"voc")}

/* ============================ ESCRITA ============================ */
let WLVL="A1",WCUR=null;
$$("#wSeg button").forEach(b=>b.addEventListener("click",()=>{WLVL=b.dataset.wl;renderWriting()}));
function wordCount(s){return(String(s).match(new RegExp("["+LET+"]+","g"))||[]).length}
function renderWriting(){if(WCUR&&!$("#wTask").hidden)return;
 $$("#wSeg button").forEach(b=>{const on=b.dataset.wl===WLVL;b.classList.toggle("on",on);b.setAttribute("aria-selected",on)});
 $("#wlist").innerHTML=WRITING.filter(w=>w.lvl===WLVL).map(w=>{const s=S.writing[w.id],dn=s&&(s.done||s.result||s.sent);return`<button class="wcard" data-wopen="${w.id}"><div class="row"><span class="label">${w.kind==="frasi"?"Frases completas":"Texto"} · ${w.min}–${w.max} palavras</span><span class="pill ${dn?"ok":"todo"}">${dn?"feito":"a fazer"}</span></div><h3>${esc(w.t)}</h3><p>${esc(w.task)}</p></button>`}).join("");
 $$("[data-wopen]").forEach(b=>b.onclick=()=>openWTask(b.dataset.wopen))}
function draftKey(id){return KEY+".draft."+id}
function getDraft(w){try{const d=localStorage.getItem(draftKey(w.id));if(d)return JSON.parse(d)}catch(e){}const s=S.writing[w.id];return s?{text:s.text||"",answers:s.answers||[]}:{text:"",answers:[]}}
function setDraft(w,d){try{localStorage.setItem(draftKey(w.id),JSON.stringify(d))}catch(e){}}
function openWTask(id){const w=WRITING.find(x=>x.id===id);if(!w)return;WMODE="text";renderWMode();WCUR=w;WLVL=w.lvl;$("#wHome").hidden=true;$("#wTask").hidden=false;renderWTask();window.scrollTo(0,0)}
function closeWTask(){WCUR=null;$("#wTask").hidden=true;$("#wHome").hidden=false;renderWriting();window.scrollTo(0,0)}
function curText(w){if(w.kind==="frasi")return w.qs.map((q,i)=>($("#wa"+i)||{}).value||"").map((a,i)=>a.trim()).join("\n");return($("#wText")||{}).value||""}
function renderWTask(){const w=WCUR,d=getDraft(w),s=S.writing[w.id];const t=TOPIC[w.topic];
 let h=`<button class="back" id="wBack">← Escrita ${w.lvl}</button>
 <div class="tophead"><span class="label">${w.lvl} · ${w.kind==="frasi"?"Frases completas":"Texto"} · foco: ${esc(w.focus)}</span><h2>${esc(w.t)}</h2></div>
 <div class="card stack"><p>${esc(w.task)}</p><div class="stack" style="gap:6px"><span class="label">Expressões úteis</span><div class="chips2">${w.useful.map(u=>`<span class="it">${esc(u)}</span>`).join("")}</div></div>
 ${t?`<p class="small muted">Base: tópico <button class="btn ghost small" data-goto="curso" data-topic="${t.id}" data-part="gram" style="padding:2px 8px">${esc(t.t)}</button></p>`:""}</div>`;
 if(w.kind==="frasi")h+=w.qs.map((q,i)=>`<div class="wq"><label for="wa${i}"><span class="it">${esc(q)}</span></label><textarea id="wa${i}" class="short" spellcheck="false" lang="it">${esc(d.answers[i]||"")}</textarea></div>`).join("");
 else h+=`<div class="wq"><label for="wText">Seu texto</label><textarea id="wText" spellcheck="false" lang="it" placeholder="Scrivi qui…">${esc(d.text||"")}</textarea></div>`;
 h+=`<div class="wmeta"><span id="wCount"></span><span>O rascunho fica salvo enquanto você escreve.</span></div>
 <div class="row"><button class="btn primary" id="wSend">Terminei — conferir</button></div><p class="small muted" id="wMsg"></p><div id="wRes" class="stack" style="gap:14px"></div>`;
 $("#wTask").innerHTML=h;tokenize($("#wTask"));$("#wBack").onclick=closeWTask;
 const upd=()=>{const tx=curText(w),n=wordCount(tx);$("#wCount").textContent=`${n} palavras · meta ${w.min}–${w.max}`;setDraft(w,{text:w.kind==="frasi"?"":tx,answers:w.kind==="frasi"?w.qs.map((q,i)=>$("#wa"+i).value):[]})};
 $$("#wTask textarea").forEach(a=>a.addEventListener("input",upd));upd();
 $("#wSend").onclick=()=>selfCheck(w);
 if(s&&s.done)renderWCheck(w,s)}
function selfCheck(w){const tx=curText(w).trim(),n=wordCount(tx),msg=$("#wMsg");
 if(n<Math.min(8,w.min)){msg.textContent="Escreva um pouco mais antes de terminar.";return}msg.textContent="";
 const answers=w.kind==="frasi"?w.qs.map((q,i)=>$("#wa"+i).value.trim()):[];const prev=S.writing[w.id]||{};
 S.writing[w.id]={text:w.kind==="frasi"?"":tx,answers,at:today(),words:n,done:true,checks:prev.checks||[]};if(!prev.done||prev.at!==today())logInc("w");save();
 renderWCheck(w,S.writing[w.id]);renderHome();$("#wRes").scrollIntoView({block:"start",behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}
function renderWCheck(w,rec){const m=WMODEL[w.id]||{model:"",check:[]},items=[...m.check,...WCHECK_ALL],ck=rec.checks||[];
 const lenOk=rec.words>=w.min&&rec.words<=w.max*1.3;
 const model=Array.isArray(m.model)?m.model.map((x,i)=>`<div class="exi"><div><span class="small muted">${esc(w.qs[i]||"")}</span><i class="it">${esc(x)}</i></div>${spkBtn(x)}</div>`).join(""):`<div class="corrtext it">${esc(m.model)}</div>${spkBtn(m.model)}`;
 $("#wRes").innerHTML=`<div class="card stack"><span class="label">Autocorreção · ${fmtBR(rec.at)}</span>
  <p class="small ${lenOk?"":"warnt"}">${rec.words} palavras ${lenOk?"— dentro da meta.":"— a meta era de "+w.min+" a "+w.max+"."}</p>
  <p class="small">Releia o seu texto e marque cada item que você conferiu. Se algo não estiver certo, corrija acima e toque em “Terminei” de novo.</p>
  <div class="checks">${items.map((it,i)=>`<label class="chk"><input type="checkbox" data-ck="${i}" ${ck.includes(i)?"checked":""}><span>${esc(it)}</span></label>`).join("")}</div>
  <p class="small muted" id="ckCount"></p></div>
 <div class="stack" style="gap:8px"><span class="label">Texto-modelo para comparar</span><p class="small muted">Não precisa ser igual: compare as estruturas, os artigos, as preposições e os tempos verbais. Toque nas palavras para ver o significado.</p>${model}</div>`;
 tokenize($("#wRes"));
 const upd=()=>{const c=$$("#wRes [data-ck]").filter(x=>x.checked).map(x=>+x.dataset.ck);rec.checks=c;save();$("#ckCount").textContent=c.length===items.length?"Tudo conferido. Ótimo trabalho!":`${c.length} de ${items.length} itens conferidos.`};
 $$("#wRes [data-ck]").forEach(x=>x.onchange=upd);$("#ckCount").textContent=`${ck.length} de ${items.length} itens conferidos.`}

/* ============================ CARTÕES (repetição espaçada) ============================ */
const IV=[0,1,2,4,8,16,32,64];
const CARDS={},ORDER={err:[],fav:[],vA1:[],vA2:[],verb:[]};
COURSE.forEach(t=>t.voc.forEach(v=>{const id="v:"+v[0],d=t.lvl==="A1"?"vA1":"vA2";if(CARDS[id])return;CARDS[id]={deck:d,topic:t.id,v:{it:v[0],pt:v[1],theme:t.lvl+" · "+t.t}};ORDER[d].push(id)}));
const CARD_VERBS=["essere","avere","andare","fare","venire","stare","dire","uscire","potere","volere","dovere","sapere","dare","bere","rimanere","parlare","lavorare","mangiare","cercare","pagare","studiare","comprare","aspettare","prendere","vedere","scrivere","leggere","mettere","chiudere","vivere","dormire","aprire","finire","capire","pulire","partire","arrivare","tornare","nascere"];
CARD_VERBS.forEach(n=>{const v=VERBMAP[n];if(!v)return;["pres","pass","fut"].forEach(tk=>{const f=TENSES[tk].f(v);P.forEach((p,i)=>{const id=`c:${v.inf}:${tk}:${i}`;CARDS[id]={deck:"verb",front:`${p} · ${v.inf}`,sub:TENSES[tk].n,back:f[i]+(v.aux==="e"&&tk==="pass"?" (fem.: "+f[i].replace(/o$/,"a").replace(/i$/,"e")+")":""),note:`${v.inf} = ${v.pt}`,say:p.split("/")[0]+" "+f[i]};ORDER.verb.push(id)})})});
ORDER.verb=[...ORDER.verb.filter(x=>x.includes(":pres:")),...ORDER.verb.filter(x=>x.includes(":pass:")),...ORDER.verb.filter(x=>x.includes(":fut:"))];
let SESSION=null;
function enabledDecks(){return Object.keys(DECKS).filter(d=>S.settings.decks[d])}
function dueIds(){const t=today();return Object.keys(S.cards).filter(id=>CARDS[id]&&S.settings.decks[CARDS[id].deck]&&S.cards[id].due<=t)}
function newIds(n){const out=[],lists=enabledDecks().filter(d=>d!=="fav"&&d!=="err"&&d!=="frase").map(d=>ORDER[d].filter(id=>!S.cards[id]&&cardUnlocked(id)));let k=0;
 while(out.length<n&&lists.some(l=>l.length)){const l=lists[k%lists.length];if(l.length)out.push(l.shift());k++}return out}
function newLeft(){return Math.max(0,S.settings.newPerDay-S.daily.newDone)}
function buildSession(){rollDay();const due=shuffle(dueIds()),nw=[...newErrIds(),...newSentIds(),...newFavIds(),...newIds(newLeft())];const q=[];let i=0,j=0;
 while(i<due.length||j<nw.length){if(i<due.length)q.push(due[i++]);if(i<due.length)q.push(due[i++]);if(j<nw.length)q.push(nw[j++])}
 SESSION={queue:q,total:q.length,done:0,shown:false,dirFlip:null}}
function cardFace(id){const c=CARDS[id];if(c.sent){const e=c.sent;return{front:blankWord(e.s,e.w),sub:"minhas frases"+(e.m?" · "+e.m:""),back:e.w,note:e.s,say:e.s,sayFront:false,blank:true}}
 if(c.err){const e=c.err;return{front:e.f,sub:"meus erros · "+e.s,back:e.b,note:e.n,say:e.say,sayFront:false,blank:true}}if(c.fav){const f=c.fav,bits=[];if(f.synonyms&&f.synonyms.length)bits.push("Sinônimos: "+f.synonyms.join(", "));if(f.example)bits.push("Ex.: "+f.example+(f.examplePt?" ("+f.examplePt+")":""));
  return{front:f.lemma,sub:f.date?"salva em "+fmtBR(f.added||f.date):"minhas palavras",back:f.meaning,note:bits.join(" · "),say:f.lemma,sayFront:true}}
 if(c.v){let dir=S.settings.dir;if(dir==="mix"){if(SESSION.dirFlip===null)SESSION.dirFlip=Math.random()<.5;dir=SESSION.dirFlip?"pt":"it"}
  return dir==="it"?{front:c.v.it,sub:c.v.theme,back:c.v.pt,say:c.v.it,sayFront:true}:{front:c.v.pt,sub:c.v.theme,back:c.v.it,say:c.v.it,sayFront:false}}
 return{front:c.front,sub:c.sub,back:c.back,note:c.note,say:c.say,sayFront:false}}
function sched(st,r){let ef=2.5,ivl=0,reps=0,lapses=0;
 if(st){if(st.ivl!=null){ef=st.ef||2.5;ivl=st.ivl;reps=st.reps||0;lapses=st.lapses||0}else if(st.b!=null){ivl=IV[st.b]||0;reps=st.b}}
 if(r===0){reps=0;lapses++;ef=Math.max(1.3,ef-.2);ivl=0}
 else if(r===1){ivl=reps===0?1:Math.max(ivl+1,Math.round(ivl*1.2));ef=Math.max(1.3,ef-.15);reps++}
 else if(r===2){ivl=reps===0?1:reps===1?3:Math.max(ivl+1,Math.round(ivl*ef));reps++}
 else{ivl=reps===0?4:reps===1?5:Math.max(ivl+2,Math.round(ivl*ef*1.3));ef+=.15;reps++}
 ivl=Math.min(ivl,3650);return{ef:Math.round(ef*100)/100,ivl,reps,lapses,due:addDays(ivl)}}
function fmtIvl(d){return d<1?"agora":d<30?d+"d":d<365?Math.round(d/30)+"m":(Math.round(d/36.5)/10)+"a"}
function intervalLabel(id,r){return fmtIvl(sched(S.cards[id],r).ivl)}
function renderFlash(){if(!SESSION||SESSION.queue.length===0&&SESSION.total===0)buildSession();
 while(SESSION.queue.length&&!CARDS[SESSION.queue[0]])SESSION.queue.shift();
 const s=SESSION,area=$("#flashArea");updateChips();
 $("#sessInfo").textContent=s.queue.length?`${s.done}/${s.total} feitos`:"";
 if(!s.queue.length){const nextDue=Object.values(S.cards).map(c=>c.due).filter(d=>d>today()).sort()[0];
  area.innerHTML=`<div class="flash"><span class="label">Sessão concluída</span><div class="front">${s.total?"Ótimo trabalho!":"Nada pendente agora"}</div>
  <p class="muted">${s.total?`Você revisou ${s.total} cartões hoje.`:"Todos os cartões de hoje já foram feitos."} ${nextDue?"Próxima revisão: "+nextDue.split("-").reverse().join("/")+".":""}</p>
  ${newIds(1).length?`<button class="btn" id="more">Estudar mais 10 novos</button>`:`<p class="small muted">Os cartões novos são liberados quando você abre o vocabulário de um tópico do curso.</p><button class="btn" data-goto="curso">Ir para o curso</button>`}</div>`;
  if($("#more"))$("#more").onclick=()=>{const extra=newIds(10);SESSION={queue:extra,total:extra.length,done:0,shown:false,dirFlip:null,extra:true};renderFlash()};renderBoxes();return}
 const id=s.queue[0],f=cardFace(id),c=CARDS[id],isNew=!S.cards[id],typ=canType(f,c);
 const sugR=s.typed?(s.typed.ok?2:0):-1;
 area.innerHTML=`<div class="flash"><span class="deck label">${esc(DECKS[c.deck])}${isNew?" · novo":""}</span>${spkBtn(f.say)}
  <span class="label">${esc(f.sub||"")}</span><div class="front">${f.blank?blankify(f.front):esc(f.front)}</div>
  ${s.shown?`<div class="back">${s.typed?`<div class="typed ${s.typed.ok?"tok":"tno"}">Você escreveu: <b>${esc(s.typed.v)}</b> ${s.typed.ok?"✓":"✗"}</div>`:""}<b>${esc(f.back)}</b>${f.note?`<div class="note">${esc(f.note)}</div>`:""}</div>`:""}</div>
  ${s.shown?`<div class="rate">${[["r0",0,"Errei"],["",1,"Difícil"],["",2,"Bom"],["r3",3,"Fácil"]].map(([cl,r,l])=>`<button class="${cl}${r===sugR?" sug":""}" data-r="${r}">${l}<span>${intervalLabel(id,r)}</span></button>`).join("")}</div>`
  :typ?`<form id="tyForm" class="fillrow"><input type="text" id="tyIn" autocomplete="off" autocapitalize="off" spellcheck="false" lang="it" placeholder="Escreva em italiano" aria-label="Sua resposta"><button class="btn primary" type="submit">Conferir</button></form><button class="btn ghost small" id="reveal">Não sei — mostrar resposta</button>`
  :`<button class="btn primary" id="reveal">Mostrar resposta</button>`}`;
 if(s.shown)$$(".rate button").forEach(b=>b.onclick=()=>rate(+b.dataset.r));else{$("#reveal").onclick=()=>{s.shown=true;renderFlash();if(!f.sayFront)speak(f.say)};if(f.sayFront&&isNew)speak(f.say);
  if($("#tyForm")){$("#tyIn").focus({preventScroll:true});$("#tyForm").onsubmit=e=>{e.preventDefault();const v=$("#tyIn").value.trim();if(!v)return;s.typed={v,ok:typeAnswers(f.back).includes(norm(v))};s.shown=true;renderFlash();speak(f.say)}}}
 renderBoxes()}
function rate(r){const s=SESSION,id=s.queue.shift(),isNew=!S.cards[id];
 if(isNew&&!s.extra&&CARDS[id]&&CARDS[id].deck!=="fav"&&CARDS[id].deck!=="err"&&CARDS[id].deck!=="frase")S.daily.newDone++;logInc("c");
 const st=sched(S.cards[id],r);
 if(r===0)s.queue.splice(Math.min(3,s.queue.length),0,id);else s.done++;
 S.cards[id]=st;S.daily.reviewed++;
 const t=today();if(S.streak.last!==t){S.streak.count=S.streak.last===addDays(-1)?S.streak.count+1:1;S.streak.last=t}
 if(!s.queue.length)logInc("cz",1);save();s.shown=false;s.typed=null;s.dirFlip=null;renderFlash()}
document.addEventListener("keydown",e=>{if($("#v-cartoes").hidden||!SESSION||!SESSION.queue.length||e.target.matches("input,select,textarea"))return;
 if(!SESSION.shown&&(e.key===" "||e.key==="Enter")){e.preventDefault();$("#reveal")&&$("#reveal").click()}else if(SESSION.shown&&"1234".includes(e.key))rate(+e.key-1)});
function ivlOf(c){return c.ivl!=null?c.ivl:(IV[c.b]||0)}
function renderBoxes(){const cnt=[0,0,0,0,0,0,0,0],lim=[0,1,3,7,15,31,63,1e9];Object.values(S.cards).forEach(c=>{const v=ivlOf(c);cnt[lim.findIndex(l=>v<=l)]++});const mx=Math.max(1,...cnt);
 $("#boxes").innerHTML=cnt.map(n=>`<div style="height:${Math.max(4,n/mx*100)}%" title="${n} cartões"></div>`).join("")}
function renderDecks(){$("#decks").innerHTML=Object.entries(DECKS).map(([k,n])=>`<label for="dk-${k}"><input type="checkbox" id="dk-${k}" data-deck="${k}" ${S.settings.decks[k]?"checked":""}><span>${n}</span><em>${ORDER[k].length}</em></label>`).join("");
 $$("[data-deck]").forEach(cb=>cb.onchange=()=>{S.settings.decks[cb.dataset.deck]=cb.checked;save();SESSION=null;renderFlash()});
 $("#newPerDay").value=String(S.settings.newPerDay);$("#dir").value=S.settings.dir;$("#typing").checked=!!S.settings.typing}
$("#typing").onchange=e=>{S.settings.typing=e.target.checked;save();renderFlash()};
$("#newPerDay").onchange=e=>{S.settings.newPerDay=+e.target.value;save();SESSION=null;renderFlash()};
$("#dir").onchange=e=>{S.settings.dir=e.target.value;save();renderFlash()};
function updateChips(){rollDay();const due=dueIds().length,nw=newErrIds().length+newSentIds().length+newFavIds().length+Math.min(newLeft(),newIds(newLeft()).length);
 $("#chipStreak").textContent=goalStreak()+(goalStreak()===1?" dia de meta":" dias de meta");
 $("#chipDue").textContent=(due+nw)+" para hoje";return{due,nw}}
function renderHome(){const {due,nw}=updateChips();$("#nDue").textContent=due;$("#nNew").textContent=nw;$("#nLearned").textContent=Object.keys(S.cards).length;
 $("#todayTitle").textContent=due+nw?(due+nw)+" cartões te esperando":"Tudo em dia por hoje";
 const t=nextTopic(),c=tprog(t.id),doneN=COURSE.filter(x=>isDone(x.id)).length;
 $("#homeCourse").innerHTML=`<div class="row" style="justify-content:space-between"><span class="label">Curso · ${doneN}/${COURSE.length} tópicos</span><span class="cefr">${t.lvl}</span></div><h3>${esc(t.t)}</h3><p class="small muted">${esc(t.sub)}</p><div class="row"><button class="btn primary" data-goto="curso" data-topic="${t.id}" data-part="${c.voc?(c.gram?"ex":"gram"):"voc"}">${c.voc?"Continuar":"Começar"} tópico ${t.n}</button></div>`;
 const isW=w=>{const s=S.writing[w.id];return!!(s&&(s.done||s.result||s.sent))},doneW=WRITING.filter(isW).length;const nextW=WRITING.find(w=>!isW(w)&&(isDone(w.topic)||w.topic===t.id))||WRITING.find(w=>!isW(w));
 $("#homeWriting").innerHTML=`<span class="label">Escrita · ${doneW}/${WRITING.length} temas</span><p class="small muted">Escreva, confira com o checklist e compare com o texto-modelo.</p>${nextW?`<h3>${esc(nextW.t)}</h3><div class="row"><button class="btn" data-goto="escrita" data-wtask="${nextW.id}">Escrever agora</button></div>`:""}`;
 const sp=PODS.find(p=>p.topic===t.id)||PODS[0],ss=S.shadow[sp.topic];
 $("#homeShadow").innerHTML=`<div class="row" style="justify-content:space-between"><span class="label">Shadowing · ${esc(TOPIC[sp.topic].lvl)} · tópico ${TOPIC[sp.topic].n}</span>${ss?`<span class="pill ok">${ss.n}×</span>`:""}</div><h3>${esc(sp.t)}</h3><p class="small muted">${esc(sp.sit)}</p><div class="row"><button class="btn" data-goto="shadow" data-pod="${sp.topic}">Praticar a pronúncia</button></div>`;
 renderGoal();renderHomeReview();renderHomeWeak();renderHomeNews()}
