/* ============================ MODI DI DIRE: 40 expressões em 8 unidades (conteúdo original) ============================ */
// Cada item: it (expressão), lit (ao pé da letra), pt (o que quer dizer), s (sentido curto, usado no quiz), es (exemplo), espt (tradução do exemplo).
// Progresso por perfil em S.modi: { <id da unidade>: { done: "AAAA-MM-DD" } } — primeira data com 5/5 no quiz.
const MODI=[
{id:"modi-1",titulo:"Lavoro e risultati",pt:"Trabalho e resultados",itens:[
 {it:"rimboccarsi le maniche",lit:"arregaçar as mangas",pt:"pôr mãos à obra, começar a trabalhar a sério",s:"pôr mãos à obra",es:"La scadenza è vicina: dobbiamo rimboccarci le maniche.",espt:"O prazo está perto: temos que pôr mãos à obra."},
 {it:"essere a buon punto",lit:"estar em bom ponto",pt:"estar bem adiantado em um trabalho",s:"estar bem adiantado",es:"Con i calcoli siamo a buon punto.",espt:"Com os cálculos estamos bem adiantados."},
 {it:"portare a termine",lit:"levar ao término",pt:"concluir, levar até o fim",s:"concluir",es:"Abbiamo portato a termine il progetto in tempo.",espt:"Concluímos o projeto a tempo."},
 {it:"andare in porto",lit:"ir ao porto",pt:"dar certo, chegar a um bom resultado",s:"dar certo",es:"Dopo mesi di trattative, l'accordo è andato in porto.",espt:"Depois de meses de negociação, o acordo deu certo."},
 {it:"dare una mano",lit:"dar uma mão",pt:"ajudar alguém",s:"ajudar",es:"Mi dai una mano con questa relazione?",espt:"Você me dá uma mão com este relatório?"}]},
{id:"modi-2",titulo:"Comunicazione",pt:"Comunicação",itens:[
 {it:"fare il punto",lit:"fazer o ponto",pt:"fazer um balanço da situação",s:"fazer um balanço",es:"Domani facciamo il punto con il cliente.",espt:"Amanhã fazemos um balanço com o cliente."},
 {it:"parlare chiaro",lit:"falar claro",pt:"falar sem rodeios",s:"falar sem rodeios",es:"Parliamo chiaro: il budget non basta.",espt:"Vamos falar sem rodeios: o orçamento não é suficiente."},
 {it:"non avere peli sulla lingua",lit:"não ter pelos na língua",pt:"dizer o que pensa, não ter papas na língua",s:"não ter papas na língua",es:"Paola non ha peli sulla lingua: dice sempre quello che pensa.",espt:"A Paola não tem papas na língua: sempre diz o que pensa."},
 {it:"tenere al corrente",lit:"manter na corrente",pt:"manter alguém informado",s:"manter informado",es:"Ti tengo al corrente sulle novità del cantiere.",espt:"Eu te mantenho informado sobre as novidades da obra."},
 {it:"arrivare al dunque",lit:"chegar ao “portanto”",pt:"ir direto ao ponto",s:"ir direto ao ponto",es:"Abbiamo poco tempo: arriviamo al dunque.",espt:"Temos pouco tempo: vamos direto ao ponto."}]},
{id:"modi-3",titulo:"Difficoltà e problemi",pt:"Dificuldades e problemas",itens:[
 {it:"essere nei guai",lit:"estar nos apuros",pt:"estar encrencado, em apuros",s:"estar encrencado",es:"Se il materiale non arriva, siamo nei guai.",espt:"Se o material não chegar, estamos encrencados."},
 {it:"avere l'acqua alla gola",lit:"ter a água na garganta",pt:"estar sem tempo ou sem saída, com a corda no pescoço",s:"estar com a corda no pescoço",es:"Con tre scadenze questa settimana ho l'acqua alla gola.",espt:"Com três prazos nesta semana estou com a corda no pescoço."},
 {it:"un osso duro",lit:"um osso duro",pt:"algo ou alguém difícil de enfrentar, um osso duro de roer",s:"um osso duro de roer",es:"Questo calcolo è un osso duro.",espt:"Este cálculo é um osso duro de roer."},
 {it:"mettere i bastoni tra le ruote",lit:"pôr bastões entre as rodas",pt:"atrapalhar de propósito o trabalho de alguém",s:"atrapalhar de propósito",es:"La burocrazia ci mette i bastoni tra le ruote.",espt:"A burocracia nos atrapalha."},
 {it:"cavarsela",lit:"tirar-se dela",pt:"se virar, dar conta mesmo com dificuldade",s:"se virar",es:"Non parlo ancora bene italiano, ma me la cavo.",espt:"Ainda não falo bem italiano, mas me viro."}]},
{id:"modi-4",titulo:"Decisioni",pt:"Decisões",itens:[
 {it:"prendere una decisione",lit:"pegar uma decisão",pt:"tomar uma decisão",s:"tomar uma decisão",es:"Dobbiamo prendere una decisione entro venerdì.",espt:"Temos que tomar uma decisão até sexta."},
 {it:"cambiare idea",lit:"mudar ideia",pt:"mudar de ideia",s:"mudar de ideia",es:"Il cliente ha cambiato idea sull'ingresso.",espt:"O cliente mudou de ideia sobre a entrada."},
 {it:"pensarci su",lit:"pensar em cima disso",pt:"refletir um pouco antes de responder",s:"refletir antes de responder",es:"È una proposta interessante: ci penso su e ti rispondo domani.",espt:"É uma proposta interessante: vou pensar e te respondo amanhã."},
 {it:"tagliare la testa al toro",lit:"cortar a cabeça do touro",pt:"resolver de uma vez, acabar com a dúvida",s:"resolver de uma vez",es:"Tagliamo la testa al toro: scegliamo il primo fornitore.",espt:"Vamos resolver de uma vez: escolhemos o primeiro fornecedor."},
 {it:"dormirci sopra",lit:"dormir em cima disso",pt:"deixar a decisão para o dia seguinte, consultar o travesseiro",s:"deixar para decidir amanhã",es:"Non rispondere subito: dormici sopra.",espt:"Não responda logo: consulte o travesseiro."}]},
{id:"modi-5",titulo:"Emozioni",pt:"Emoções",itens:[
 {it:"essere al settimo cielo",lit:"estar no sétimo céu",pt:"estar felicíssimo, nas nuvens",s:"estar felicíssimo",es:"Abbiamo vinto la gara: sono al settimo cielo!",espt:"Ganhamos a licitação: estou nas nuvens!"},
 {it:"avere i nervi a fior di pelle",lit:"ter os nervos à flor da pele",pt:"estar muito tenso, com os nervos à flor da pele",s:"estar muito tenso",es:"Prima della presentazione avevo i nervi a fior di pelle.",espt:"Antes da apresentação eu estava com os nervos à flor da pele."},
 {it:"essere giù di morale",lit:"estar para baixo de moral",pt:"estar desanimado",s:"estar desanimado",es:"Dopo la riunione Marco era giù di morale.",espt:"Depois da reunião o Marco estava desanimado."},
 {it:"tirare un sospiro di sollievo",lit:"soltar um suspiro de alívio",pt:"respirar aliviado",s:"respirar aliviado",es:"Quando il cliente ha approvato il progetto, ho tirato un sospiro di sollievo.",espt:"Quando o cliente aprovou o projeto, respirei aliviado."},
 {it:"non vedere l'ora",lit:"não ver a hora",pt:"estar ansioso para que algo aconteça, não ver a hora",s:"esperar com ansiedade",es:"Non vedo l'ora di andare in vacanza.",espt:"Não vejo a hora de sair de férias."}]},
{id:"modi-6",titulo:"Vita quotidiana",pt:"Vida cotidiana",itens:[
 {it:"fare due passi",lit:"fazer dois passos",pt:"dar uma volta a pé",s:"dar uma volta a pé",es:"Dopo pranzo facciamo due passi?",espt:"Depois do almoço damos uma volta?"},
 {it:"fare la fila",lit:"fazer a fila",pt:"esperar em fila",s:"esperar em fila",es:"Alla posta ho fatto la fila per mezz'ora.",espt:"No correio fiquei meia hora na fila."},
 {it:"costare un occhio della testa",lit:"custar um olho da cabeça",pt:"custar muito caro, os olhos da cara",s:"custar muito caro",es:"A Milano un appartamento costa un occhio della testa.",espt:"Em Milão um apartamento custa os olhos da cara."},
 {it:"in bocca al lupo",lit:"na boca do lobo",pt:"boa sorte! A resposta tradicional é “Crepi!”",s:"boa sorte",es:"Domani hai l'esame? In bocca al lupo!",espt:"Amanhã você tem a prova? Boa sorte!"},
 {it:"essere stanco morto",lit:"estar cansado morto",pt:"estar morto de cansaço",s:"estar morto de cansaço",es:"Dopo il sopralluogo ero stanco morto.",espt:"Depois da vistoria eu estava morto de cansaço."}]},
{id:"modi-7",titulo:"Persone e carattere",pt:"Pessoas e caráter",itens:[
 {it:"essere in gamba",lit:"estar em perna",pt:"ser competente, capaz",s:"ser competente",es:"La nuova collega è davvero in gamba.",espt:"A nova colega é realmente competente."},
 {it:"avere le mani bucate",lit:"ter as mãos furadas",pt:"gastar demais, ser mão-aberta com o próprio dinheiro",s:"gastar demais",es:"Mio fratello ha le mani bucate: spende tutto lo stipendio.",espt:"Meu irmão gasta demais: torra o salário inteiro."},
 {it:"essere una buona forchetta",lit:"ser um bom garfo",pt:"gostar de comer bem e bastante, ser bom de garfo",s:"ser bom de garfo",es:"Marco è una buona forchetta: prende sempre anche il dolce.",espt:"O Marco é bom de garfo: sempre pede a sobremesa também."},
 {it:"avere la testa tra le nuvole",lit:"ter a cabeça entre as nuvens",pt:"ser ou estar distraído, no mundo da lua",s:"estar distraído",es:"Oggi ho la testa tra le nuvole: ho dimenticato la riunione.",espt:"Hoje estou no mundo da lua: esqueci a reunião."},
 {it:"essere alla mano",lit:"estar à mão",pt:"ser simples e acessível no trato",s:"ser simples e acessível",es:"Il direttore è molto alla mano: parla con tutti.",espt:"O diretor é muito acessível: fala com todo mundo."}]},
{id:"modi-8",titulo:"Tempo e fretta",pt:"Tempo e pressa",itens:[
 {it:"andare di fretta",lit:"ir de pressa",pt:"estar com pressa",s:"estar com pressa",es:"Scusa, vado di fretta: ti chiamo dopo.",espt:"Desculpa, estou com pressa: te ligo depois."},
 {it:"in un batter d'occhio",lit:"num bater de olho",pt:"muito depressa, num piscar de olhos",s:"num piscar de olhos",es:"Con il nuovo programma i calcoli si fanno in un batter d'occhio.",espt:"Com o novo programa os cálculos ficam prontos num piscar de olhos."},
 {it:"all'ultimo momento",lit:"no último momento",pt:"em cima da hora",s:"em cima da hora",es:"Il cliente ha cambiato tutto all'ultimo momento.",espt:"O cliente mudou tudo em cima da hora."},
 {it:"prendersela comoda",lit:"pegar a coisa de modo cômodo",pt:"fazer as coisas sem pressa nenhuma, com calma demais",s:"fazer sem pressa nenhuma",es:"La consegna è domani e lui se la prende comoda!",espt:"A entrega é amanhã e ele vai fazendo sem pressa nenhuma!"},
 {it:"in quattro e quattr'otto",lit:"em quatro e quatro, oito",pt:"em pouquíssimo tempo, sem complicação",s:"rapidinho, sem complicação",es:"Abbiamo risolto il problema in quattro e quattr'otto.",espt:"Resolvemos o problema rapidinho."}]}
];
const MODII=Object.fromEntries(MODI.map(u=>[u.id,u]));
const MD={cur:null,quiz:{}};
function modiDone(id){const r=(S.modi||{})[id];return r&&r.done?r.done:""}
function modiDoneN(){return MODI.filter(u=>modiDone(u.id)).length}
function openModi(id){if(!MODII[id])return;MD.cur=MODII[id];renderModi();window.scrollTo(0,0)}
function closeModi(){MD.cur=null;renderModi();window.scrollTo(0,0)}
function renderModi(){if(!$("#modiBox"))return;MD.cur?renderModiUnit():renderModiIndex()}
function renderModiIndex(){const n=modiDoneN(),tot=MODI.length;
 $("#modiBox").innerHTML=`<div class="stack" style="gap:6px"><div class="lvlhead"><div><h2>Modi di dire</h2><p class="muted small">Expressões que os italianos usam no trabalho e no dia a dia. Cada unidade tem 5 expressões e um mini-quiz.</p></div><span class="pill ${n===tot?"ok":"todo"}">${n}/${tot} unidades</span></div><div class="lvlbar"><i style="width:${n/tot*100}%"></i></div></div>
 <div class="tlist">${MODI.map((u,i)=>{const d=modiDone(u.id);return`<button class="tcard${d?" done":""}" data-modi-open="${u.id}"><span class="tn">${d?"✓":i+1}</span><div><h3>${esc(u.titulo)}</h3><p>${esc(u.pt)} · 5 expressões</p></div><span class="pill ${d?"ok":""}">${d?"feita":"nova"}</span></button>`}).join("")}</div>`;
 $$("#modiBox [data-modi-open]").forEach(b=>b.onclick=()=>openModi(b.dataset.modiOpen))}
function modiKey(m){return m.it.toLowerCase()}
function modiToggle(u,m){const k=modiKey(m);if(S.favs[k]){delete S.favs[k];removeFavCard(k)}
 else{S.favs[k]={lemma:m.it,surface:m.it,pos:"modo di dire",meaning:m.pt,synonyms:[],example:m.es,examplePt:m.espt,context:m.es,date:today(),added:today(),tipo:"frase",origem:"modi:"+u.id};addFavCard(k);logEvento("favorito",k)}
 save();updateFavCount();renderDecks();renderHome();renderModiUnit(true)}
function renderModiUnit(keep){const u=MD.cur,box=$("#modiBox"),i=MODI.indexOf(u),prev=MODI[i-1],next=MODI[i+1],y=window.scrollY;
 box.innerHTML=`<button class="back" id="modiBack">← Modi di dire</button>
 <div class="tophead"><span class="label">Unidade ${i+1} de ${MODI.length} · ${esc(u.pt)}</span><h2 class="it lettit">${esc(u.titulo)}</h2></div>
 <div class="stack" style="gap:12px">${u.itens.map((m,k)=>{const fav=!!S.favs[modiKey(m)];return`<div class="card stack modi"><div class="row" style="justify-content:space-between;flex-wrap:nowrap;align-items:flex-start"><h3 class="it modit">${esc(m.it)}</h3><div class="row" style="gap:6px;flex-wrap:nowrap">${spkBtn(m.it)}<button class="spk star${fav?" on":""}" data-modi-fav="${k}" aria-pressed="${fav}" aria-label="${fav?"Remover de Preferiti":"Salvar em Preferiti"}">${STAR_SVG}</button></div></div>
  <p class="small"><span class="label">Ao pé da letra</span> ${esc(m.lit)}</p><p><span class="label">Quer dizer</span> ${esc(m.pt)}</p>
  <div class="exi"><div><i class="it">${esc(m.es)}</i><span>${esc(m.espt)}</span></div>${spkBtn(m.es)}</div></div>`}).join("")}</div>
 <div id="modiQuiz" class="stack"></div>
 <div class="row" style="justify-content:space-between">${prev?`<button class="btn" data-modi-open="${prev.id}">← Anterior</button>`:"<span></span>"}${next?`<button class="btn" data-modi-open="${next.id}">Próxima →</button>`:"<span></span>"}</div>`;
 tokenize(box);
 $("#modiBack").onclick=closeModi;
 $$("#modiBox [data-modi-open]").forEach(b=>b.onclick=()=>openModi(b.dataset.modiOpen));
 $$("#modiBox [data-modi-fav]").forEach(b=>b.onclick=()=>modiToggle(u,u.itens[+b.dataset.modiFav]));
 renderModiQuiz();if(keep)window.scrollTo(0,y)}
/* mini-quiz de associação: para cada expressão, escolher o sentido entre os da unidade */
function renderModiQuiz(){const u=MD.cur,box=$("#modiQuiz");if(!u||!box)return;const n=u.itens.length,done=modiDone(u.id);
 const st=MD.quiz[u.id]=MD.quiz[u.id]||{ans:{},ord:shuffle(u.itens.map((_,k)=>k)),opts:{}};
 const right=u.itens.filter((m,k)=>st.ans[k]===k).length,answered=Object.keys(st.ans).length;
 let h=`<div class="row" style="justify-content:space-between"><h3>Mini-quiz</h3><div class="row" style="gap:8px"><span class="chip${right===n?" hot":""}" id="modiCount">${right}/${n}</span>${answered?`<button class="btn ghost small" id="modiClear">Limpar</button>`:""}</div></div>`;
 if(done&&!answered)h+=`<div class="fb ok"><b>Unidade feita em ${fmtBR(done)}.</b><span>Você pode responder de novo para treinar.</span></div>`;
 else if(!done)h+=`<p class="muted small">Ligue cada expressão ao que ela quer dizer. Com ${n} acertos a unidade fica marcada como feita.</p>`;
 st.ord.forEach((k,pos)=>{const m=u.itens[k],a=st.ans[k];if(!st.opts[k])st.opts[k]=shuffle([k,...shuffle(u.itens.map((_,j)=>j).filter(j=>j!==k)).slice(0,3)]);
  h+=`<div class="qz"><span class="qn">${pos+1} de ${n} · o que quer dizer?</span><div class="qq it">${esc(m.it)}</div><div class="opts">${st.opts[k].map(j=>`<button class="opt${a!=null?(j===k?" right":j===a?" wrong":""):""}" data-mq="${k}" data-j="${j}" ${a!=null?"disabled":""}>${esc(u.itens[j].s)}</button>`).join("")}</div></div>`});
 if(answered===n)h+=right===n?`<div class="fb ok"><b>${n}/${n}: unidade feita!</b></div>`:`<div class="fb no"><b>${right}/${n} certas.</b><span>Releia as expressões e toque em “Limpar” para tentar de novo.</span></div>`;
 box.innerHTML=h;tokenize(box);
 $$("#modiQuiz [data-mq]").forEach(b=>b.onclick=()=>{const k=+b.dataset.mq;if(st.ans[k]!=null)return;st.ans[k]=+b.dataset.j;
  if(Object.keys(st.ans).length===n&&u.itens.every((_,j)=>st.ans[j]===j)){S.modi=S.modi||{};if(!S.modi[u.id]){S.modi[u.id]={done:today()};logEvento("unidade","modi:"+u.id)}logInc("e",1);save();renderHome()}
  renderModiQuiz()});
 if($("#modiClear"))$("#modiClear").onclick=()=>{delete MD.quiz[u.id];renderModiQuiz()}}
