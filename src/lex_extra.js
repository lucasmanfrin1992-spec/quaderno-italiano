/* ============================ DICIONÁRIO AMPLIADO: LÓGICA ============================ */
// Cobre as palavras que não estão no vocabulário dos tópicos: substantivos e adjetivos com plural/feminino,
// verbos extras (todas as formas), imperativo, pronomes grudados no verbo, elisões (c', dov', trent'), números e nomes próprios.
const XPOS={m:"substantivo masculino",f:"substantivo feminino",mf:"substantivo (masculino e feminino)",mi:"substantivo masculino invariável",fi:"substantivo feminino invariável",a:"adjetivo",ai:"adjetivo invariável",d:"indefinido / quantificador",av:"advérbio",c:"conjunção",pp:"preposição",p:"pronome",i:"expressão",x:""};
const XIDX={},XINF={},XNAME={};
function xAdd(T,k,e){k=k.toLowerCase();if(k&&!T[k])T[k]=e}
function xArt(w,g,pl){const v=/^[aeiouàèéìòùh]/.test(w),s=/^(s[^aeiou]|z|ps|gn|x|y)/.test(w);
 if(g==="f")return pl?"le ":v?"l'":"la ";return pl?(v||s?"gli ":"i "):v?"l'":s?"lo ":"il "}
function xNounPl(w,g){if(!/[aeo]$/.test(w))return[];const s=w.slice(0,-1),l=w.slice(-1);
 if(/ista$/.test(w))return g==="f"?[s+"e"]:g==="m"?[s+"i"]:[s+"i",s+"e"];
 if(l==="e")return[s+"i"];
 if(l==="o"){if(/io$/.test(w))return[w.slice(0,-2)+"i"];if(/ico$/.test(w)&&w.length>4)return[s.slice(0,-1)+"ci"];if(/[cg]o$/.test(w))return[s+"hi"];return[s+"i"]}
 if(g==="m")return[s+"i"];if(g==="mf")return[s+"i",s+"e"];
 if(/[cg]a$/.test(w))return[s+"he"];
 if(/[^aeiou][cg]ia$/.test(w))return[w.slice(0,-2)+"e"];
 return[s+"e"]}
function xAdjForms(w){const s=w.slice(0,-1),l=w.slice(-1);
 if(l==="e")return[[s+"i","plural"]];
 if(l!=="o")return[];
 if(/io$/.test(w)){const t=w.slice(0,-2),r=[[t+"ia","feminino"],[t+"i","masculino plural"],[t+"ie","feminino plural"]];if(/[cg]io$/.test(w))r.push([t+"e","feminino plural"]);return r}
 if(/co$/.test(w))return[[s+"a","feminino"],[/ico$/.test(w)&&w.length>4?s.slice(0,-1)+"ci":s+"hi","masculino plural"],[s+"he","feminino plural"]];
 if(/go$/.test(w))return[[s+"a","feminino"],[s+"hi","masculino plural"],[s+"he","feminino plural"]];
 return[[s+"a","feminino"],[s+"i","masculino plural"],[s+"e","feminino plural"]]}
function xSupStem(w){if(!/[oe]$/.test(w))return null;if(/io$/.test(w))return w.slice(0,-2);const s=w.slice(0,-1);if(/[cg]o$/.test(w)&&!(/ico$/.test(w)&&w.length>4))return s+"h";return s}
XLEX.trim().split("\n").forEach(line=>{const[w,pos,m,irr]=line.split("|");if(!w||!m)return;
 const e={lemma:w,meaning:m,pos:XPOS[pos]||"",kind:"x"};
 const g=pos==="m"||pos==="mi"?"m":pos==="f"||pos==="fi"?"f":pos==="mf"?"mf":"";
 if(g){const pls=pos==="mi"||pos==="fi"?[w]:irr?irr.split(","):xNounPl(w,g);
  const sg=g==="mf"?xArt(w,"m")+w+" / "+xArt(w,"f")+w:xArt(w,g)+w;
  const pl=pls.length?(g==="mf"&&pls.length>1?xArt(pls[0],"m",1)+pls[0]+" / "+xArt(pls[1],"f",1)+pls[1]:pls.map(p=>(g==="m"&&/a$/.test(p)?"le ":xArt(p,g==="mf"?"m":g,1))+p).join(" / ")):"";
  e.how=["Com artigo: <i class='it'>"+esc(sg)+"</i>"+(pl?" · plural: <i class='it'>"+esc(pl)+"</i>"+(pos==="mi"||pos==="fi"?" (não muda)":""):"")+"."];
  xAdd(XIDX,w,e);pls.forEach(p=>{if(p!==w)xAdd(XINF,p,Object.assign({},e,{note:"Plural de “"+w+"”."}))});return}
 xAdd(XIDX,w,e);
 if(pos==="a"||pos==="d"){
  const fs=irr?irr.split(",").map((f,i)=>[f,["masculino plural","feminino","feminino plural"][i]||"forma"]):xAdjForms(w);
  if(fs.length)e.how=["Formas: <i class='it'>"+esc([w].concat(fs.map(f=>f[0])).join(", "))+"</i>. Concorda com o substantivo."];
  fs.forEach(f=>xAdd(XINF,f[0],Object.assign({},e,{note:f[1][0].toUpperCase()+f[1].slice(1)+" de “"+w+"”."})));
  const st=xSupStem(w);if(st&&st.length>1)[["issimo","masculino"],["issima","feminino"],["issimi","masculino plural"],["issime","feminino plural"]].forEach(([x])=>
   xAdd(XINF,st+x,{lemma:w,meaning:"muito "+m.split(/[;,(]/)[0].trim(),pos:"superlativo",kind:"x",note:"Superlativo de “"+w+"”: a terminação -issimo quer dizer “muito”."}))}});
[["po'","pouco (un po' = um pouco)","forma curta de poco"],["bei","bonitos — plural de bello antes de consoante (i bei tempi)","adjetivo"],["begli","bonitos — plural de bello antes de vogal ou s+consoante (begli occhi)","adjetivo"],["nessun","nenhum — forma curta de nessuno antes de substantivo masculino","indefinido"],["alcun","nenhum, algum — forma curta de alcuno","indefinido"],["entrambe","ambas","indefinido"],["tutti","todos","indefinido"],["ad","a — forma da preposição a antes de vogal (ad esempio)","preposição"],["od","ou — forma de o antes de vogal","conjunção"]].forEach(r=>xAdd(XIDX,r[0],{lemma:r[0],meaning:r[1],pos:r[2],kind:"x"}));
XNAMES.trim().split("\n").forEach(line=>{const[w,m]=line.split("|");if(w&&m)XNAME[w]={lemma:w[0].toUpperCase()+w.slice(1),meaning:m,pos:"nome próprio",kind:"x"}});

/* verbos extras: entram só no dicionário (todas as formas), não nos cartões */
Object.assign(IRR_PRES,XIRR_PRES);Object.assign(IRR_FUT,XIRR_FUT);Object.assign(IRR_IMP,XIRR_IMP);
// compostos herdam a irregularidade do verbo-base: mantenere ← tenere, intervenire ← venire, rifare ← fare
XVERBS.trim().split("\n").forEach(l=>{const inf=l.split("|")[0];["tenere","venire","fare","dire"].forEach(b=>{if(inf.length>b.length&&inf.endsWith(b)){const pre=inf.slice(0,-b.length),ap=x=>x.split(" ").map(f=>pre+f).join(" ");
 if(!IRR_PRES[inf]&&IRR_PRES[b])IRR_PRES[inf]=ap(IRR_PRES[b]);if(!IRR_FUT[inf]&&IRR_FUT[b])IRR_FUT[inf]=pre+IRR_FUT[b];if(!IRR_IMP[inf]&&IRR_IMP[b])IRR_IMP[inf]=ap(IRR_IMP[b])}})});
const XVLIST=XVERBS.trim().split("\n").map(l=>l.split("|")).filter(v=>v[0]&&!VERBMAP[v[0]]).map(v=>({inf:v[0],pt:v[1],pp:v[2]||regPP(v[0]),aux:v[3]||"a",isc:!!v[4]}));
function xPush(f,o){if(!f)return;(FORMS[f]=FORMS[f]||[]);if(!FORMS[f].some(x=>x.v===o.v&&x.tk===o.tk&&x.i===o.i&&x.who===o.who))FORMS[f].push(o)}
XVLIST.forEach(v=>{VERBMAP[v.inf]=v;
 Object.entries(TENSES).forEach(([tk,T])=>{if(tk==="pass")return;T.f(v).forEach((f,i)=>xPush(f,{v,tk,i}))});
 [v.pp,v.pp.replace(/o$/,"a"),v.pp.replace(/o$/,"i"),v.pp.replace(/o$/,"e")].forEach(f=>xPush(f,{v,tk:"pp",i:-1}));
 xPush(gerund(v),{v,tk:"ger",i:-1});xPush(v.inf,{v,tk:"inf",i:-1})});
/* imperativo de todos os verbos (tu, Lei, loro) */
const IMPV_TU={essere:"sii",avere:"abbi",sapere:"sappi"},IMPV_LEI={essere:"sia",avere:"abbia",andare:"vada",dare:"dia",stare:"stia",sapere:"sappia",dovere:"debba"};
const IMPV_SHORT={andare:"va",fare:"fa",dare:"da",stare:"sta",dire:"di"};
VERBS.concat(XVLIST).forEach(v=>{const p=pres(v),are=v.inf.endsWith("are");
 const tu=IMPV_TU[v.inf]||(are&&!IRR_PRES[v.inf]?p[2]:p[1]);
 const lei=IMPV_LEI[v.inf]||(are&&!IRR_PRES[v.inf]?p[1]:p[0].replace(/o$/,"a"));
 xPush(tu,{v,tk:"impv",i:-1,who:"tu"});xPush(lei,{v,tk:"impv",i:-1,who:"Lei"});xPush(lei+"no",{v,tk:"impv",i:-1,who:"loro"});
 if(IMPV_SHORT[v.inf])xPush(IMPV_SHORT[v.inf],{v,tk:"impv",i:-1,who:"tu"})});
TLAB.impv="imperativo";

/* números por extenso */
const NUM1={zero:0,uno:1,un:1,una:1,due:2,tre:3,"tré":3,quattro:4,cinque:5,sei:6,sette:7,otto:8,nove:9,dieci:10,undici:11,dodici:12,tredici:13,quattordici:14,quindici:15,sedici:16,diciassette:17,diciotto:18,diciannove:19};
const NUMT={venti:20,trenta:30,quaranta:40,cinquanta:50,sessanta:60,settanta:70,ottanta:80,novanta:90};
function parseNum(s){if(!s)return null;if(NUM1[s]!=null)return NUM1[s];
 let i=s.indexOf("mila");if(i>0){const a=parseNum(s.slice(0,i)),r=s.slice(i+4),b=r?parseNum(r):0;return a>1&&a<1000&&b!=null&&b<1000?a*1000+b:null}
 if(s.startsWith("mille")){const r=s.slice(5),b=r?parseNum(r):0;return b!=null&&b<1000?1000+b:null}
 i=s.indexOf("cento");if(i>=0){const h=i===0?1:parseNum(s.slice(0,i)),r=s.slice(i+5),b=r?parseNum(r):0;return h>=1&&h<10&&b!=null&&b<100?h*100+b:null}
 for(const t in NUMT){if(s===t)return NUMT[t];const st=t.slice(0,-1);if(!s.startsWith(st))continue;
  const full=s.startsWith(t),u=NUM1[s.slice(full?t.length:st.length)];
  if(u>=1&&u<=9&&(full?(u!==1&&u!==8):(u===1||u===8)))return NUMT[t]+u}
 return null}
function ptNum(n){const u=["zero","um","dois","três","quatro","cinco","seis","sete","oito","nove","dez","onze","doze","treze","catorze","quinze","dezesseis","dezessete","dezoito","dezenove"],d=["","","vinte","trinta","quarenta","cinquenta","sessenta","setenta","oitenta","noventa"],c=["","cento","duzentos","trezentos","quatrocentos","quinhentos","seiscentos","setecentos","oitocentos","novecentos"];
 if(n<20)return u[n];if(n<100)return d[n/10|0]+(n%10?" e "+u[n%10]:"");if(n===100)return"cem";if(n<1000)return c[n/100|0]+(n%100?" e "+ptNum(n%100):"");
 const m=n/1000|0,r=n%1000;return(m===1?"mil":ptNum(m)+" mil")+(r?(r<100||r%100===0?" e ":" ")+ptNum(r):"")}
function xNumber(k){const n=parseNum(k);if(n==null)return null;
 return{lemma:k,meaning:n+" ("+ptNum(n)+")",pos:"número",kind:"x",how:n>20?["Os números se escrevem numa palavra só: <i class='it'>"+esc(k)+"</i>.","Antes de <i class='it'>uno</i> e <i class='it'>otto</i> a dezena perde a vogal: <i class='it'>ventuno, ventotto</i>."]:[]}}

/* pronomes grudados no fim do verbo: aiutarla, dimmi, mettila, alzati */
const CLIT={mi:"me / a mim",ti:"te / a você",si:"se",ci:"nos; lá",vi:"vos / a vocês",lo:"o (isso, ele)",la:"a (ela; a senhora)",li:"os",le:"as; a ela / à senhora",ne:"disso, dele",gli:"a ele / a eles"};
const CLITRE=/(glielo|gliela|glieli|gliele|gliene|(?:me|te|se|ce|ve)(?:lo|la|li|le|ne)|mi|ti|si|ci|vi|lo|la|li|le|ne|gli)$/;
function xClitic(k){const m=k.match(CLITRE);if(!m)return null;const c=m[1],st=k.slice(0,-c.length);if(st.length<2)return null;
 const cands=[[st+"e",["inf"]],[st+"re",["inf"]],[st,["impv","ger"]]];
 if(st.slice(-1)===c[0])cands.push([st.slice(0,-1),["impv"]]);
 for(const[cand,tks]of cands){const vf=(FORMS[cand]||[]).filter(z=>tks.includes(z.tk)||(tks.includes("impv")&&z.tk==="pres"&&(z.i===3||z.i===4)));
  if(vf.length){const v=vf[0].v,two=c.length>3&&c!=="gli";
   return{lemma:v.inf,meaning:v.pt,pos:"verbo + pronome",kind:"x",verb:vf,
    note:two?"Forma de “"+v.inf+"” com dois pronomes grudados no final (“"+c+"”).":"Forma de “"+v.inf+"” com o pronome “"+c+"” ("+CLIT[c]+") grudado no final."}}}
 return null}

/* elisões: a vogal final cai antes de outra vogal (c'è, dov'è, trent'anni) */
const ELIS={"c'":"ci","d'":"di","m'":"mi","t'":"ti","s'":"si","v'":"vi","n'":"ne","dov'":"dove","com'":"come","cos'":"cosa","anch'":"anche","nient'":"niente","quest'":"questo","bell'":"bello","buon'":"buona","sant'":"santo","quand'":"quando","senz'":"senza","tutt'":"tutto","mezz'":"mezzo","grand'":"grande","gliel'":"glielo","quant'":"quanto","nessun'":"nessuna","neanch'":"neanche","quell'":"quello","sull'":"sullo","dell'":"dello","all'":"allo","dall'":"dallo","nell'":"nello"};
function xElision(k){if(!/'$/.test(k))return null;const st=k.slice(0,-1);
 const tries=ELIS[k]?[ELIS[k]]:[st+"o",st+"a",st+"e",st+"i"];
 for(const t of tries){const e=lookupLocal(t,t);if(e&&e.meaning){e.note="Forma de “"+t+"” sem a vogal final, usada antes de palavra que começa com vogal."+(e.note?" "+e.note:"");e.lemma=e.lemma||t;return e}}
 return null}
// leituras extras da mesma palavra: “alzati” (particípio ou imperativo + ti), “sei” (verbo ou número)
function xAlso(e,kk){const xc=e.pos==="verbo"&&!e.note?xClitic(kk):null;if(xc)e.note="Também pode ser: "+xc.note[0].toLowerCase()+xc.note.slice(1);
 const n=e.pos!=="número"?parseNum(kk):null;if(n>=2)e.note=(e.note?e.note+" ":"")+"Também é o número "+n+" ("+ptNum(n)+").";return e}
// chamada pelo lookupLocal quando nada mais achou
function xFallback(k,kk){
 if(XNAME[kk])return Object.assign({},XNAME[kk]);
 const tr=(FORMS[kk+"e"]||[]).filter(z=>z.tk==="inf");
 if(tr.length&&kk.length>2)return{lemma:tr[0].v.inf,meaning:tr[0].v.pt,pos:"verbo",kind:"x",verb:tr,note:"Infinitivo sem o -e final, comum antes de outro verbo ou em expressões: “"+kk+"”."};
 return xNumber(kk)||xClitic(kk)||xElision(k)||(FUNC[kk+"'"]?Object.assign({},FUNC[kk+"'"]):null)}
