/* ============================ PRÁTICA: GERADORES, ESCUTA, TESTES, ERROS, META ============================ */
const PERS=["io","tu","lui/lei","noi","voi","loro"],PERSQ=["io","tu","lei","noi","voi","loro"];
const rnd=n=>Math.random()*n|0;
/* --- substantivos e artigos --- */
const NOUNS=[["libro","m","libri","livro"],["zaino","m","zaini","mochila"],["studente","m","studenti","estudante"],["amico","m","amici","amigo"],["ufficio","m","uffici","escritório"],["giornale","m","giornali","jornal"],["zio","m","zii","tio"],["specchio","m","specchi","espelho"],["albergo","m","alberghi","hotel"],["parco","m","parchi","parque"],["problema","m","problemi","problema"],["caffè","m","caffè","café"],["casa","f","case","casa"],["amica","f","amiche","amiga"],["chiave","f","chiavi","chave"],["città","f","città","cidade"],["stazione","f","stazioni","estação"],["penna","f","penne","caneta"],["isola","f","isole","ilha"],["mano","f","mani","mão"],["lezione","f","lezioni","aula"],["università","f","università","universidade"],["arancia","f","arance","laranja"],["foto","f","foto","foto"]];
const isV=w=>/^[aeiouàèéìòùh]/i.test(w),isImp=w=>/^(s[^aeiouàèéìòù]|z|ps|gn|y|x)/i.test(w);
function artDef(w,g,pl){if(g==="f")return pl?"le":isV(w)?"l'":"la";if(pl)return isV(w)||isImp(w)?"gli":"i";return isV(w)?"l'":isImp(w)?"lo":"il"}
function artInd(w,g){if(g==="f")return isV(w)?"un'":"una";return isImp(w)?"uno":"un"}
/* --- adjetivos e sujeitos --- */
const ADJS=[["alto","alta","alti","alte"],["simpatico","simpatica","simpatici","simpatiche"],["stanco","stanca","stanchi","stanche"],["gentile","gentile","gentili","gentili"],["italiano","italiana","italiani","italiane"],["brasiliano","brasiliana","brasiliani","brasiliane"],["inglese","inglese","inglesi","inglesi"],["contento","contenta","contenti","contente"],["intelligente","intelligente","intelligenti","intelligenti"],["timido","timida","timidi","timide"],["bello","bella","belli","belle"]];
const SUBJ=[["Marco","ms","è"],["Giulia","fs","è"],["I ragazzi","mp","sono"],["Le ragazze","fp","sono"],["Marco e Anna","mp","sono"],["Mia madre","fs","è"],["I miei colleghi","mp","sono"]];
const GI={ms:0,fs:1,mp:2,fp:3};
/* --- verbos por grupo --- */
const V_REG=["parlare","lavorare","abitare","studiare","mangiare","cercare","pagare","comprare","aspettare","ascoltare","prendere","leggere","scrivere","vivere","vendere","dormire","partire","aprire","sentire","capire","finire","preferire","pulire"];
const V_IRR=["andare","fare","venire","uscire","stare","dare","dire","bere","sapere","rimanere"];
const V_MOD=["potere","volere","dovere"];
const V_PPA=["mangiare","comprare","lavorare","dormire","fare","vedere","prendere","scrivere","leggere","aprire","chiudere","chiedere","bere","perdere","spendere","decidere","mettere","dire","rispondere","finire","capire","vincere"];
const V_PPE=["andare","arrivare","partire","tornare","uscire","venire","restare","nascere","entrare","rimanere","scendere"];
const V_FUT=["parlare","lavorare","prendere","partire","essere","avere","andare","fare","venire","potere","dovere","vedere","pagare","cercare","mangiare","sapere","volere","stare","bere","rimanere"];
const V_IMP=["parlare","avere","essere","fare","dormire","abitare","giocare","andare","leggere","bere","dire","vivere","studiare","guardare"];
const V_COND=["volere","potere","dovere","essere","avere","andare","fare","venire","parlare","piacere","prendere","stare"];
const V_IMPV=[["aprire","la finestra"],["chiudere","la porta"],["prendere","l'ombrello"],["mangiare","la verdura"],["parlare","più piano"],["scrivere","il tuo nome"],["ascoltare","bene"],["leggere","il testo"],["pulire","la cucina"],["finire","i compiti"],["tagliare","il pane"],["aspettare","un momento"]];
const Vb=n=>VERBMAP[n];
function conjQ(list,tk,label){const v=Vb(pick(list));if(!v)return null;const i=rnd(6),f=TENSES[tk].f(v);const pr=PERSQ[i];
 return{type:"f",q:`${pr.charAt(0).toUpperCase()+pr.slice(1)} ___ (${v.inf}).`,a:f[i],hint:`${v.inf} · ${label||TENSES[tk].n} · ${PERS[i]}`,exp:`${v.inf} (${v.pt}) no ${label||TENSES[tk].n}: ${f.map((x,k)=>PERS[k]+" "+x).join(", ")}.`,gen:1}}
/* --- frases com preposição articulada --- */
const PREPQ=[["Il latte è ___ frigorifero.","in","il"],["Le chiavi sono ___ borsa.","in","la"],["Il telefono è ___ tavolo.","su","il"],["Vado ___ stadio con gli amici.","a","lo"],["Torno ___ ufficio alle sei.","da","l'"],["Il prezzo ___ biglietti è alto.","di","i"],["Scrivo una mail ___ studenti.","a","gli"],["La finestra ___ cucina è aperta.","di","la"],["Ci vediamo ___ otto.","a","le"],["Vengo ___ stazione.","da","la"],["Metto i libri ___ scaffale.","su","lo"],["Il gatto dorme ___ letto.","su","il"],["Il bagno è ___ primo piano.","a","il"],["La casa ___ zii è grande.","di","gli"],["Ho un appuntamento ___ dentista.","da","il"],["Abito ___ centro storico.","in","il"],["Le foto sono ___ cassetto.","in","il"],["Parlo ___ amici di Marco.","a","gli"],["Il libro ___ insegnante è nuovo.","di","l'"],["Torno ___ vacanze domani.","da","le"]];
/* --- possessivos --- */
const POSS={io:["mio","mia","miei","mie"],tu:["tuo","tua","tuoi","tue"],lui:["suo","sua","suoi","sue"],noi:["nostro","nostra","nostri","nostre"],voi:["vostro","vostra","vostri","vostre"],loro:["loro","loro","loro","loro"]};
const PNOUN=[["madre","fs",1],["padre","ms",1],["fratello","ms",1],["sorella","fs",1],["fratelli","mp",1],["genitori","mp",1],["casa","fs",0],["libro","ms",0],["chiavi","fp",0],["amici","mp",0],["macchina","fs",0],["zaino","ms",0]];
const ARTG={ms:"il",fs:"la",mp:"i",fp:"le"},ARTG_Z={ms:"lo",mp:"gli"};
/* --- geradores --- */
const GEN={
 essere(){const i=rnd(6),f=pres(Vb("essere"));const tail=["di Curitiba.","in ufficio.","a casa.","al lavoro.","in ritardo.","qui."][rnd(6)];return{type:"f",q:`${PERSQ[i].charAt(0).toUpperCase()+PERSQ[i].slice(1)} ___ ${tail}`,a:f[i],hint:`essere · ${PERS[i]}`,exp:`Essere: ${f.map((x,k)=>PERS[k]+" "+x).join(", ")}.`,gen:1}},
 avere(){const i=rnd(6),f=pres(Vb("avere"));const tail=["una domanda.","fame.","trent'anni.","due fratelli.","molto lavoro.","una macchina nuova."][rnd(6)];return{type:"f",q:`${PERSQ[i].charAt(0).toUpperCase()+PERSQ[i].slice(1)} ___ ${tail}`,a:f[i],hint:`avere · ${PERS[i]}`,exp:`Avere: ${f.map((x,k)=>PERS[k]+" "+x).join(", ")}. O h não se pronuncia.`,gen:1}},
 art(){const n=pick(NOUNS),pl=Math.random()<.4,w=pl?n[2]:n[0],a=artDef(w,n[1],pl);return{type:"f",q:`___ ${w} (artigo definido)`,a,hint:`${n[1]==="m"?"masculino":"feminino"} ${pl?"plural":"singular"} · ${n[3]}`,exp:a==="lo"||a==="gli"&&!isV(w)?"Masculino antes de s+consoante, z, ps, gn: lo / gli.":isV(w)?"Antes de vogal: l' no singular; gli (m.) ou le (f.) no plural.":n[1]==="m"?"Masculino antes de consoante: il / i.":"Feminino: la / le.",gen:1}},
 artind(){const n=pick(NOUNS.filter(x=>x[0]!=="caffè")),a=artInd(n[0],n[1]);return{type:"f",q:`Ho ___ ${n[0]}. (um / uma)`,a,hint:`${n[1]==="m"?"masculino":"feminino"} · ${n[3]}`,exp:`un (masc.), uno (masc. + s+consoante, z), una (fem.), un' (fem. + vogal).`,gen:1}},
 plur(){const n=pick(NOUNS);return{type:"f",q:`${artDef(n[0],n[1],false)} ${n[0]} → ${artDef(n[2],n[1],true)} ___`,a:n[2],hint:"plural",exp:/à|è|ì|ò|ù$/.test(n[0])||n[0]==="foto"?"Palavras com acento final ou abreviadas não mudam no plural.":n[0]==="problema"?"Problema é masculino: i problemi.":n[0]==="mano"?"Mano é feminino: le mani.":`-o → -i, -a → -e, -e → -i${/c[oa]$|g[oa]$/.test(n[0])?"; -co/-ca e -go ganham h para manter o som (exceto amico → amici)":""}.`,gen:1}},
 adj(){const a=pick(ADJS),s=pick(SUBJ);const f=a[GI[s[1]]];return{type:"f",q:`${s[0]} ${s[2]} ___ . (${a[0]})`,a:f,hint:{ms:"masc. singular",fs:"fem. singular",mp:"masc. plural",fp:"fem. plural"}[s[1]],exp:`O adjetivo concorda com o sujeito: ${a.join(", ")}.${s[0].includes(" e ")?" Grupo misto: masculino plural.":""}`,gen:1}},
 pres(){return conjQ(V_REG,"pres")},
 presirr(){return conjQ(V_IRR,"pres")},
 mod(){const v=Vb(pick(V_MOD)),i=rnd(6),f=pres(v),inf=["venire","lavorare","uscire","pagare","entrare","partire"][rnd(6)];return{type:"f",q:`${PERSQ[i].charAt(0).toUpperCase()+PERSQ[i].slice(1)} ___ ${inf}. (${v.inf})`,a:f[i],hint:`${v.inf} · ${PERS[i]}`,exp:`${v.inf}: ${f.map((x,k)=>PERS[k]+" "+x).join(", ")}. Depois do modal vem o infinitivo, sem preposição.`,gen:1}},
 cesono(){const items=[["una finestra",1],["due bagni",0],["un divano",1],["tre camere",0],["molte persone",0],["un problema",1],["una farmacia qui vicino",1],["dei libri sul tavolo",0]];const it=pick(items);return{type:"m",q:`In casa ___ ${it[0]}.`,opts:["c'è","ci sono"],a:it[1]?"c'è":"ci sono",exp:"c'è + singular, ci sono + plural.",gen:1}},
 prepsimple(){const r=pick([["Abito ___ Curitiba.","a","Cidade: a."],["Vado ___ Italia.","in","País: in."],["Lavoro ___ Milano.","a","Cidade: a."],["Sono ___ Brasile.","in","País: in."],["Vado ___ Marco stasera.","da","Casa de alguém: da."],["Sono ___ Curitiba.","di","Origem (essere di): di."],["Vengo ___ Roma.","da","Procedência: da."],["Parto ___ Napoli domani.","per","Partire per + destino."],["Vado al lavoro ___ piedi.","a","A piedi."],["Viaggio ___ treno.","in","Transporte: in."],["Lavoro ___ ufficio.","in","in ufficio."],["Ci vediamo ___ una settimana.","tra/fra","Daqui a: tra / fra."],["Esco ___ i colleghi.","con","Companhia: con."],["Studio italiano ___ un anno.","da","Desde/há (com presente): da."],["Vado ___ farmacia.","in","Lugares em -ia: in."]]);return{type:"f",q:r[0],a:r[1],hint:"preposição simples",exp:r[2],gen:1}},
 prep(){const r=pick(PREPQ),a=artPrep(r[1],r[2]);return{type:"f",q:r[0],a,hint:`${r[1]} + ${r[2]}`,exp:`${r[1]} + ${r[2]} = ${a}.`,gen:1}},
 poss(){const ps=pick(["io","tu","lui","noi","voi","loro"]),n=pick(PNOUN),g=GI[n[1]],p=POSS[ps][g];const kinSing=n[2]&&n[1].endsWith("s")&&ps!=="loro";
  const art=kinSing?"":ARTG[n[1]];const ans=(art?art+" ":"")+p;const lab={io:"meu/minha",tu:"teu/seu (de você)",lui:"dele/dela",noi:"nosso",voi:"de vocês",loro:"deles"}[ps];
  return{type:"f",q:`___ ${n[0]} (${lab})`,a:ans,hint:kinSing?"parente no singular":"com artigo?",exp:kinSing?"Parente no singular, sem adjetivo: sem artigo (mia madre).":n[2]?(ps==="loro"?"Com loro o artigo fica sempre.":"Parente no plural: volta o artigo (i miei fratelli)."):"Coisas: artigo + possessivo, que concorda com a coisa.",gen:1}},
 rifl(){const v=pick(REFL),base=Vb(v[2])||{inf:v[2],isc:false};const i=rnd(6),pr=["mi","ti","si","ci","vi","si"][i];return{type:"f",q:`${PERSQ[i].charAt(0).toUpperCase()+PERSQ[i].slice(1)} ___ ${pres(base)[i]}. (${v[0]})`,a:pr,hint:"pronome reflexivo",exp:"Reflexivos: mi, ti, si, ci, vi, si antes do verbo.",gen:1}},
 ger(){const v=Vb(pick(["mangiare","lavorare","leggere","scrivere","dormire","studiare","fare","bere","aspettare","partire"]));const i=rnd(6);return{type:"f",q:`${PERSQ[i].charAt(0).toUpperCase()+PERSQ[i].slice(1)} ${pres(Vb("stare"))[i]} ___ . (${v.inf})`,a:gerund(v),hint:"gerúndio",exp:`stare + gerúndio: -are → -ando, -ere/-ire → -endo (${v.inf} → ${gerund(v)}).`,gen:1}},
 pp(){const v=Vb(pick(V_PPA)),i=rnd(6);return{type:"f",q:`Ieri ${PERSQ[i]} ${pres(Vb("avere"))[i]} ___ . (${v.inf})`,a:v.pp,hint:"particípio passado",exp:`${v.inf} → ${v.pp}${regPP(v.inf)===v.pp?" (regular)":" (irregular)"}. Com avere o particípio não muda.`,gen:1}},
 aux(){const useE=Math.random()<.5,v=Vb(pick(useE?V_PPE:V_PPA)),s=pick(SUBJ.filter(x=>x[0]!=="Mia madre"));const g=GI[s[1]],pl=g>=2;
  const pp=useE?v.pp.slice(0,-1)+["o","a","i","e"][g]:v.pp;const ans=useE?(pl?"sono":"è"):(pl?"hanno":"ha");
  return{type:"f",q:`Ieri ${s[0].charAt(0).toLowerCase()==="i"||s[0].startsWith("Le")?s[0].toLowerCase():s[0]} ___ ${pp}.`,a:ans,hint:"avere ou essere?",exp:useE?`${v.inf} é verbo de movimento/mudança: usa essere, e o particípio concorda (${pp}).`:`${v.inf} usa avere; o particípio não muda.`,gen:1}},
 ppess(){const v=Vb(pick(V_PPE)),s=pick(SUBJ.filter(x=>x[0]!=="Mia madre"));const g=GI[s[1]];const pp=v.pp.slice(0,-1)+["o","a","i","e"][g];return{type:"f",q:`${s[0]} ${g>=2?"sono":"è"} ___ ieri. (${v.inf})`,a:pp,hint:"concordância com essere",exp:`Com essere o particípio concorda com o sujeito: -o, -a, -i, -e.`,gen:1}},
 dir(){const n=pick([["il pane","lo"],["la pasta","la"],["i biscotti","li"],["le mele","le"],["il giornale","lo"],["la frutta","la"],["gli spaghetti","li"],["le chiavi","le"]]),v=pick([["Compro","compro"],["Prendo","prendo"],["Cerco","cerco"],["Voglio","voglio"]]);return{type:"f",q:`${v[0]} ${n[0]} → ___ ${v[1]}.`,a:n[1],hint:"pronome direto",exp:"Masc. sing. lo · fem. sing. la · masc. pl. li · fem. pl. le.",gen:1}},
 ind(){const r=pick([["Telefono a Marco","gli","telefono"],["Scrivo a Giulia","le","scrivo"],["Regalo un libro a mio padre","gli","regalo un libro"],["Mando un messaggio a mia sorella","le","mando un messaggio"],["Parlo ai miei genitori","gli","parlo"],["Signora, mando la mail a Lei","Le","mando la mail"],["Do il numero a te","ti","do il numero"],["Scrivi a me?","mi","scrivi?"]]);return{type:"f",q:`${r[0]} → ___ ${r[2]}.`,a:r[1],hint:"pronome indireto",exp:"a lui/a loro → gli · a lei → le · a Lei (formal) → Le · a me → mi · a te → ti.",gen:1}},
 imp(){return conjQ(V_IMP,"imp")},
 fut(){return conjQ(V_FUT,"fut")},
 cond(){return conjQ(V_COND,"cond")},
 impv(){const r=pick(V_IMPV),v=Vb(r[0]);const s=v.inf.slice(0,-3),e=v.inf.slice(-3);const a=e==="are"?join(s,"a",true):v.isc?s+"isci":s+"i";return{type:"f",q:`___ ${r[1]}! (${v.inf}, tu)`,a,hint:"imperativo · tu",exp:`Imperativo de tu: -are → -a (parla!), -ere/-ire → -i (prendi!, apri!).`,gen:1}},
 volerci(){const r=pick([["un'ora",1],["due ore",0],["dieci minuti",0],["mezz'ora",1],["tre giorni",0],["un anno",1]]);return{type:"m",q:`Per arrivare a Roma ci ___ ${r[0]}.`,opts:["vuole","vogliono"],a:r[1]?"vuole":"vogliono",exp:"ci vuole + singular, ci vogliono + plural.",gen:1}},
 si(){const r=pick([["Qui ___ paga alla cassa.","si"],["In Italia ___ mangia bene.","si"],["Come ___ dice 'prazo'?","si"],["Qui non ___ può fumare.","si"]]);return{type:"f",q:r[0],a:r[1],hint:"impessoal",exp:"si + verbo na 3ª pessoa = 'se' impessoal (paga-se, come-se).",gen:1}},
 adv(){const r=pick([["lento","lentamente"],["facile","facilmente"],["vero","veramente"],["regolare","regolarmente"],["rapido","rapidamente"],["tranquillo","tranquillamente"],["probabile","probabilmente"],["gentile","gentilmente"]]);return{type:"f",q:`${r[0]} → ___ (advérbio)`,a:r[1],hint:"-mente",exp:"Feminino + -mente; adjetivos em -le/-re perdem o e (facile → facilmente).",gen:1}},
 compar(){const r=pick([["Oggi sto ___ di ieri.","meglio","Com stare (advérbio): meglio."],["Questo vino è ___ di quello.","migliore","Adjetivo: buono → migliore."],["Roma è più grande ___ Firenze.","di","Comparação com substantivo: più … di."],["È più facile ___ difficile.","che","Entre dois adjetivos: che."],["Marco è alto ___ suo padre.","come","Igualdade: come."]]);return{type:"f",q:r[0],a:r[1],hint:"comparativo",exp:r[2],gen:1}}
};
const TOPIC_GEN={"a1-1":["essere","adj"],"a1-2":["art","plur","avere"],"a1-3":["adj","artind"],"a1-4":["pres"],"a1-5":["presirr"],"a1-6":["mod","cesono"],"a1-7":["prepsimple"],"a1-8":["prep"],"a1-9":["poss"],"a1-10":["rifl","ger"],
 "a2-1":["pp"],"a2-2":["aux","ppess"],"a2-3":["dir"],"a2-4":["ind"],"a2-5":["imp"],"a2-6":["fut"],"a2-7":["volerci","si"],"a2-8":["impv"],"a2-9":["compar","adv"],"a2-10":["cond"]};
function genQs(tid,n){const gs=TOPIC_GEN[tid]||[],out=[],seen=new Set();let tries=0;
 while(gs.length&&out.length<n&&tries<n*8){tries++;const q=GEN[gs[out.length%gs.length]]();if(!q||seen.has(q.q))continue;seen.add(q.q);q.tp=tid;out.push(q)}return out}
/* --- escuta: frases por tópico (exemplos da gramática + podcast) --- */
const LSENT={};
COURSE.forEach(t=>{const arr=[];t.gram.forEach(g=>{const re=/<div class="exi"><div><i class="it">([^<]+)<\/i><span>([^<]*)<\/span>/g;let m;while((m=re.exec(g.html)))arr.push([m[1].replace(/&amp;/g,"&").replace(/&quot;/g,'"'),m[2]])});
 const p=PODS.find(x=>x.topic===t.id);if(p)p.L.forEach(l=>arr.push([l[1],l[2]]));LSENT[t.id]=arr.filter(s=>s[0].length<90&&!/[→=]/.test(s[0]))});
function listenQs(tid,n){if(!canSpeak)return[];const pool=shuffle(LSENT[tid]||[]),out=[];
 for(const s of pool){if(out.length>=n)break;
  if(out.length%2===0){const words=(s[0].match(new RegExp("["+LET+"']{4,}","g"))||[]).filter(w=>!/^[A-Z]/.test(w)||w===s[0].split(" ")[0]);if(!words.length)continue;const first=s[0].match(new RegExp("["+LET+"']+"))[0];const cand=words.filter(x=>!/'/.test(x)&&x!==first);const w=pick(cand.length?cand:words);if(!w)continue;
   out.push({type:"lf",say:s[0],q:s[0].replace(new RegExp("(^|[^"+LET+"])"+w+"(?=[^"+LET+"]|$)"),"$1___"),a:w,exp:`Frase completa: ${s[0]}${s[1]?" — "+s[1]:""}`,tp:tid,pt:s[1]})}
  else{const others=shuffle(pool.filter(x=>x!==s)).slice(0,2);if(others.length<2)continue;out.push({type:"lm",say:s[0],opts:[s[0],...others.map(o=>o[0])],a:s[0],exp:s[1]?`Tradução: ${s[1]}`:"",tp:tid})}}
 return out}
function vocQs(t,n){const pool=t.voc.filter(v=>v[0].length<26);return shuffle(pool).slice(0,n).map(v=>{const wrong=shuffle(pool.filter(x=>x!==v)).slice(0,3);
 return Math.random()<.5?{type:"m",q:`Como se diz “${v[1]}”?`,opts:[v[0],...wrong.map(w=>w[0])],a:v[0],exp:`${v[0]} = ${v[1]}`,voc:1,tp:t.id}:{type:"m",q:`O que significa “${v[0]}”?`,opts:[v[1],...wrong.map(w=>w[1])],a:v[1],exp:`${v[0]} = ${v[1]}`,voc:1,tp:t.id}})}
function authQs(t,n){return shuffle(t.ex).slice(0,n).map(e=>Object.assign(e[0]==="f"?{type:"f",q:e[1],a:e[2],hint:e[3],exp:e[4]}:{type:e[0],q:e[1],opts:e[2].split("|"),a:e[2].split("|")[0],exp:e[3]},{tp:t.id}))}
function buildQs(t){const L=listenQs(t.id,2);const qs=[...authQs(t,8+(2-L.length)),...genQs(t.id,4),...vocQs(t,2),...L];
 return shuffle(qs).map(q=>{if(q.opts)q.opts=shuffle(q.opts);return q})}
/* --- testes de bloco --- */
const TESTS=[{id:"t-a1-1",lvl:"A1",after:5,ts:["a1-1","a1-2","a1-3","a1-4","a1-5"],t:"Teste A1 · tópicos 1–5"},{id:"t-a1-2",lvl:"A1",after:10,ts:["a1-6","a1-7","a1-8","a1-9","a1-10"],t:"Teste A1 · tópicos 6–10"},{id:"t-a2-1",lvl:"A2",after:5,ts:["a2-1","a2-2","a2-3","a2-4","a2-5"],t:"Teste A2 · tópicos 1–5"},{id:"t-a2-2",lvl:"A2",after:10,ts:["a2-6","a2-7","a2-8","a2-9","a2-10"],t:"Teste A2 · tópicos 6–10"}];
function buildTest(T){let qs=[];T.ts.forEach((id,k)=>{const t=TOPIC[id];qs.push(...authQs(t,2),...genQs(id,1));if(k%2===0)qs.push(...(listenQs(id,1).length?listenQs(id,1):authQs(t,1)));else qs.push(...vocQs(t,1))});
 return shuffle(qs).map(q=>{if(q.opts)q.opts=shuffle(q.opts);return q})}
/* --- cartões de erro --- */
function hashStr(s){let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return(h>>>0).toString(36)}
function addErrCard(q){if(!q)return;let front,back=q.a.split("/")[0],sub,say;
 if(q.type==="f"||q.type==="lf"){front=q.q;sub=q.hint||(q.type==="lf"?"escuta: complete a palavra":"complete");say=q.type==="lf"?q.say:q.q.replace("___",back).replace(/\s*\(.*?\)\s*/g," ")}
 else if(q.type==="x"){front=q.chosen||"Qual é a frase correta?";sub=q.chosen?"Esta frase tem um erro. Como fica certa?":"marque a frase correta";say=q.a}
 else if(q.type==="lm"){front="Escreva a frase que você ouviu";sub="escuta";say=q.say}
 else{front=q.q;sub=q.voc?"vocabulário":"escolha";const mm=q.q.match(/“(.+)”/);say=q.voc?(q.q.startsWith("Como")?q.a:(mm?mm[1]:"")):q.q.replace("___",back)}
 const id="e:"+hashStr(front+"|"+back);S.errs=S.errs||{};if(S.errs[id])return;
 S.errs[id]={f:front,b:back,s:sub,n:q.exp||"",say:say||back,t:q.tp||"",d:today()};addErrCardObj(id)}
function addErrCardObj(id){const e=S.errs[id];CARDS[id]={deck:"err",err:e,topic:e.t};if(!ORDER.err.includes(id))ORDER.err.push(id)}
function syncErrCards(){Object.keys(CARDS).forEach(id=>{if(id.startsWith("e:"))delete CARDS[id]});ORDER.err=[];Object.keys(S.errs||{}).forEach(addErrCardObj)}
function newErrIds(){return S.settings.decks.err?ORDER.err.filter(id=>!S.cards[id]).slice(0,15):[]}
/* --- liberação dos cartões pelo curso --- */
function opened(tid){const c=S.course[tid];return!!(c&&(c.voc||c.gram||c.ex||c.best!=null))}
const VERB_UNLOCK_PRES={essere:"a1-1",avere:"a1-2",andare:"a1-5",fare:"a1-5",venire:"a1-5",stare:"a1-5",dire:"a1-5",uscire:"a1-5",dare:"a1-5",bere:"a1-5",sapere:"a1-5",rimanere:"a1-5",potere:"a1-6",volere:"a1-6",dovere:"a1-6"};
function cardUnlocked(id){const c=CARDS[id];if(!c)return false;if(c.deck==="vA1"||c.deck==="vA2")return opened(c.topic);
 if(c.deck==="verb"){const [,inf,tk]=id.split(":");if(tk==="pres")return opened(VERB_UNLOCK_PRES[inf]||"a1-4");if(tk==="pass")return opened(VERBMAP[inf]&&VERBMAP[inf].aux==="e"?"a2-2":"a2-1");if(tk==="fut")return opened("a2-6");return true}
 return true}
/* --- meta diária --- */
const GOALS=[["c","Cartões","10 revisões",'cartoes'],["e","Exercício","1 rodada ou teste",'curso'],["s","Shadowing","1 podcast",'shadow'],["n","Notícia","responder o quiz",'news']];
function dayLog(d){S.log=S.log||{};return S.log[d||today()]||{}}
function logInc(k,v){S.log=S.log||{};const t=today(),o=S.log[t]=S.log[t]||{};o[k]=v!=null?v:(o[k]||0)+1;
 const ks=Object.keys(S.log).sort();if(ks.length>120)ks.slice(0,ks.length-120).forEach(x=>delete S.log[x])}
function goalDone(o,k){if(k==="c")return(o.c||0)>=10||(o.c>0&&o.cz);return(o[k]||0)>0}
function goalCount(d){const o=dayLog(d);return GOALS.filter(g=>goalDone(o,g[0])).length}
function goalMet(d){return goalCount(d)>=3}
function goalStreak(){let d=new Date(),c=0;if(!goalMet(fmt(d)))d.setDate(d.getDate()-1);while(goalMet(fmt(d))){c++;d.setDate(d.getDate()-1)}return c}
function renderGoal(){const el=$("#homeGoal");if(!el)return;const o=dayLog(),n=goalCount(),R=26,C=2*Math.PI*R;
 const days=[];for(let i=6;i>=0;i--){const dt=new Date();dt.setDate(dt.getDate()-i);days.push(fmt(dt))}
 const DOW=["dom","seg","ter","qua","qui","sex","sáb"];
 el.innerHTML=`<div class="goalhead"><svg viewBox="0 0 64 64" class="ring" role="img" aria-label="${n} de 4 atividades feitas hoje"><circle cx="32" cy="32" r="${R}" class="ringbg"/><circle cx="32" cy="32" r="${R}" class="ringfg${n>=3?" met":""}" stroke-dasharray="${C*n/4} ${C}" transform="rotate(-90 32 32)"/><text x="32" y="38" text-anchor="middle" class="ringt">${n}/4</text></svg>
  <div><span class="label">Meta de hoje</span><h3>${n>=3?"Meta cumprida!":"Faça 3 de 4 atividades"}</h3><p class="small muted">${goalStreak()} ${goalStreak()===1?"dia":"dias"} seguidos cumprindo a meta</p></div></div>
 <div class="goals">${GOALS.map(g=>{const d=goalDone(o,g[0]);return`<button class="goal${d?" ok":""}" data-goto="${g[3]}"><span class="gchk">${d?"✓":""}</span><span><b>${g[1]}</b><small>${g[0]==="c"&&!d?(o.c||0)+"/10 revisões":g[2]}</small></span></button>`}).join("")}</div>
 <div class="week" role="img" aria-label="Atividades dos últimos 7 dias">${days.map(dd=>{const lo=dayLog(dd),cnt=goalCount(dd);return`<div class="wd${dd===today()?" td":""}${goalMet(dd)?" met":""}"><div class="wbar">${GOALS.map(g=>`<i class="g${g[0]}${goalDone(lo,g[0])?" on":""}"></i>`).join("")}</div><span>${DOW[new Date(dd+"T12:00").getDay()]}</span></div>`}).join("")}</div>
 <div class="legend">${GOALS.map(g=>`<span><i class="lg g${g[0]} on"></i>${g[1]}</span>`).join("")}</div>`}
/* --- testes: UI --- */
let TEST=null;
function testRes(id){return(S.tests||{})[id]}
function openTest(id){const T=TESTS.find(x=>x.id===id);if(!T)return;TEST=T;CUR=null;CLVL=T.lvl;$("#cHome").hidden=true;$("#cTopic").hidden=false;
 const r=testRes(id);
 $("#cTopic").innerHTML=`<button class="back" id="cBack">← Unidade ${T.lvl}</button><div class="tophead"><span class="label">${T.lvl} · teste de bloco</span><h2>${esc(T.t)}</h2><p class="muted small">${T.ts.map(x=>esc(TOPIC[x].t)).join(" · ")}</p></div><div id="cBody" class="stack" style="gap:18px"></div>`;
 $("#cBack").onclick=()=>{TEST=null;RUN=null;closeTopic()};
 $("#cBody").innerHTML=`<div class="card stack"><span class="label">20 questões · sem consulta</span><h3>Mostre o que ficou</h3><p class="small muted">Mistura gramática, vocabulário e escuta dos 5 tópicos. No fim você vê o resultado por tópico. Tópicos com 75% ou mais no teste contam como concluídos: serve também para pular o que você já sabe.</p>${r?`<p class="small">Melhor resultado: <b>${r.best}%</b> (${fmtBR(r.last)})</p>`:""}<button class="btn primary" id="tStart">${r?"Fazer de novo":"Começar o teste"}</button></div>`;
 $("#tStart").onclick=()=>{RUN={test:id,qs:buildTest(T),i:0,score:0,wrong:[],by:{}};renderQ()};window.scrollTo(0,0)}
function endTest(){const r=RUN,T=TESTS.find(x=>x.id===r.test),n=r.qs.length,pct=Math.round(r.score/n*100);S.tests=S.tests||{};const prev=S.tests[T.id];S.tests[T.id]={best:Math.max(pct,prev?prev.best:0),last:today()};
 const per=T.ts.map(id=>{const qs=r.qs.filter(q=>q.tp===id),ok=qs.filter(q=>q.ok).length;return{id,ok,n:qs.length,pct:qs.length?Math.round(ok/qs.length*100):0}});
 const passed=[];per.forEach(p=>{if(p.pct>=75){const c=S.course[p.id]=S.course[p.id]||{};if(c.best==null||p.pct>c.best){c.best=p.pct;c.viaTest=1}if(!isDone(p.id)||c.viaTest)passed.push(p.id)}});
 logInc("e");save();
 const weak=per.filter(p=>p.pct<75);
 $("#cBody").innerHTML=`<div class="card stack"><span class="label">Resultado do teste</span><h2>${r.score}/${n} · ${pct}%</h2>
 <div class="tres">${per.map(p=>`<div class="tr"><span>${esc(TOPIC[p.id].t)}</span><span class="sclb"><i style="width:${p.pct}%;${p.pct<75?"background:var(--bad)":""}"></i></span><b>${p.ok}/${p.n}</b></div>`).join("")}</div>
 ${weak.length?`<p>Reveja: ${weak.map(p=>`<button class="btn small" data-goto="curso" data-topic="${p.id}" data-part="gram">${esc(TOPIC[p.id].t)}</button>`).join(" ")}</p>`:`<p>Todos os tópicos acima de 75%. Bloco dominado.</p>`}
 ${r.wrong.length?`<p class="small muted">Os ${r.wrong.length} erros foram para os cartões em “Meus erros”.</p>`:""}
 <div class="row"><button class="btn primary" id="tAgain">Fazer de novo</button><button class="btn" id="tBack">Voltar à unidade</button></div></div>`;
 tokenize($("#cBody"));RUN=null;$("#tAgain").onclick=()=>openTest(T.id);$("#tBack").onclick=()=>{TEST=null;closeTopic()}}
