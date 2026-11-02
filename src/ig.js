/* ============================ INFOGRÁFICOS ============================ */
const SPK_SVG='<svg viewBox="0 0 24 24"><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
const EXS=[]; // frases de exemplo do curso (para o dicionário)
const IGX=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const IG={
 box(t,inner,note){return`<figure class="ig"><figcaption><span class="igtag">Infográfico</span>${t}</figcaption>${inner}${note?`<p class="ignote">${note}</p>`:""}</figure>`},
 // "[stem]{end} + x = res ((nota))"
 eq(rows){return`<div class="eqs">${rows.map(r=>`<div class="eq">${r.split(/(\[[^\]]+\]|\{[^}]+\}|\(\([^)]*\)\)|\s\+\s|\s=\s|\s→\s)/).filter(x=>x&&x.trim()).map(p=>{
   if(p[0]==="["&&p.slice(-1)==="]")return`<span class="ck stem it">${IGX(p.slice(1,-1))}</span>`;
   if(p[0]==="{"&&p.slice(-1)==="}")return`<span class="ck end it">${IGX(p.slice(1,-1))}</span>`;
   if(p.startsWith("(("))return`<span class="cknote">${IGX(p.slice(2,-2))}</span>`;
   const t=p.trim();if(t==="+"||t==="="||t==="→")return`<span class="op">${t}</span>`;
   return`<span class="ck res it">${IGX(t)}</span>`}).join("")}</div>`).join("")}</div>`},
 // linhas: [condição(pt), resultado(it), exemplo(it)]
 decide(rows,heads){return`<div class="dec">${heads?`<div class="dech"><span>${heads[0]}</span><span>${heads[1]}</span><span>${heads[2]}</span></div>`:""}${rows.map(r=>`<div class="decr"><span class="decq">${r[0]}</span><span class="deca it">${IGX(r[1])}</span><span class="dece it">${IGX(r[2]||"")}</span></div>`).join("")}</div>`},
 // conjugações lado a lado: [{v:"parlare",f:"parl|o parl|i ..."}]
 conj(list,pers){const P6=pers||["io","tu","lui/lei","noi","voi","loro"];
  return`<div class="cjs">${list.map(c=>`<div class="cj"><div class="cjh">${IGX(c.v)}</div>${c.f.split(" ").map(x=>x.replace(/_/g," ")).map((f,i)=>{const [s,e]=f.includes("|")?f.split("|"):[f,""];const full=(s+e).trim(),w=full.split(/\s+/).pop().replace(/[!?.,]/g,"");return`<div class="cjr"><span class="cjp">${P6[i]}</span><button class="w cjw" data-w="${IGX(w.toLowerCase())}">${IGX(s)}<b>${IGX(e)}</b></button></div>`}).join("")}</div>`).join("")}</div>`},
 // comparação de colunas: [{h,tone,items:[]}]
 cmp(cols){return`<div class="cmp">${cols.map((c,i)=>`<div class="cmpc t${c.tone||i}"><div class="cmph">${c.h}</div><ul>${c.items.map(x=>`<li>${x}</li>`).join("")}</ul></div>`).join("")}</div>`},
 // linha do tempo: marks [{at:0..1, to?:0..1, it:"", pt:""}]
 tl(marks,labels){const W=640,H=170,y=86,x0=24,x1=W-24,X=a=>x0+(x1-x0)*a;labels=labels||["passado","agora","futuro"];
  let s=`<svg viewBox="0 0 ${W} ${H}" class="tlsvg" role="img" aria-label="Linha do tempo"><line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" class="tlax"/><path d="M${x1-8} ${y-6}L${x1} ${y}L${x1-8} ${y+6}" class="tlax" fill="none"/><line x1="${X(.62)}" y1="${y-14}" x2="${X(.62)}" y2="${y+14}" class="tlnow"/>`;
  s+=`<text x="${X(.12)}" y="${H-8}" class="tllab" text-anchor="middle">${labels[0]}</text><text x="${X(.62)}" y="${H-8}" class="tllab tlnowt" text-anchor="middle">${labels[1]}</text><text x="${X(.9)}" y="${H-8}" class="tllab" text-anchor="middle">${labels[2]}</text>`;
  marks.forEach((m,i)=>{const up=i%2===0,ty=up?y-40:y+44;
   if(m.to!=null){s+=`<rect x="${X(m.at)}" y="${y-7}" width="${X(m.to)-X(m.at)}" height="14" rx="7" class="tlspan"/>`;const cx=(X(m.at)+X(m.to))/2;s+=`<text x="${cx}" y="${ty}" class="tlit" text-anchor="middle">${IGX(m.it)}</text><text x="${cx}" y="${ty+19}" class="tlpt" text-anchor="middle">${IGX(m.pt||"")}</text>`}
   else{s+=`<circle cx="${X(m.at)}" cy="${y}" r="7" class="tldot"/><text x="${X(m.at)}" y="${ty}" class="tlit" text-anchor="middle">${IGX(m.it)}</text><text x="${X(m.at)}" y="${ty+19}" class="tlpt" text-anchor="middle">${IGX(m.pt||"")}</text>`}});
  return`<div class="tlw">${s}</svg></div>`},
 // posição no espaço
 pos(){const L=(x,y,t,a)=>`<text x="${x}" y="${y}" class="pslab" text-anchor="${a||"middle"}">${t}</text>`;
  return`<div class="tlw"><svg viewBox="0 0 520 250" class="pssvg" role="img" aria-label="Preposições de lugar em volta de uma caixa">
  <rect x="200" y="90" width="120" height="90" rx="6" class="psbox"/><rect x="214" y="104" width="92" height="62" rx="4" class="psin"/>
  <circle cx="260" cy="70" r="9" class="psdot"/>${L(260,52,"sopra")}
  <circle cx="260" cy="200" r="9" class="psdot"/>${L(260,232,"sotto")}
  <circle cx="260" cy="135" r="9" class="psdot"/>${L(260,160,"dentro")}
  <circle cx="160" cy="135" r="9" class="psdot"/>${L(140,140,"accanto a",'end')}
  <circle cx="400" cy="135" r="9" class="psdot ps2"/>${L(420,130,"fuori",'start')}${L(420,147,"(fora)",'start')}
  <circle cx="345" cy="96" r="7" class="psdot ps3"/>${L(352,86,"dietro",'start')}
  <circle cx="180" cy="190" r="9" class="psdot ps3"/>${L(140,200,"davanti a",'end')}
  </svg></div>`},
 // grade das preposições articuladas
 ap(){const A=["il","lo","l'","la","i","gli","le"],P={di:"de",a:"a",da:"da",in:"ne",su:"su"},f=(p,a)=>{const b=P[p];if(a==="il")return b==="a"?"al":b+"l";if(a==="i")return b==="a"?"ai":b+"i";if(a==="l'")return(b==="a"?"al":b+"l")+"l'";if(a==="gli")return b+"gli";return(b==="a"?"a":b)+"l"+a};
  return`<div class="tbl"><table class="aptab"><tr><th></th>${A.map(a=>`<th>${a}</th>`).join("")}</tr>${Object.keys(P).map(p=>`<tr><th>${p}</th>${A.map(a=>`<td class="it">${f(p,a)}</td>`).join("")}</tr>`).join("")}</table></div>`},
 // escala: [it, pct, pt]
 scale(rows){return`<div class="scl">${rows.map(r=>`<div class="sclr"><span class="it sclw">${IGX(r[0])}</span><span class="sclb"><i style="width:${r[1]}%"></i></span><span class="sclp">${IGX(r[2])}</span></div>`).join("")}</div>`},
 // cartões: [{h(it),p(pt)}]
 cards(items){return`<div class="igc">${items.map(c=>`<div class="igcc"><div class="igch it">${IGX(c.h)}</div><div class="igcp">${c.p}</div></div>`).join("")}</div>`},
 // exemplos [[it,pt],...] (também alimentam o dicionário)
 ex(list){list.forEach(e=>EXS.push(e));return`<div class="exl">${list.map(e=>`<div class="exi"><div><i class="it">${IGX(e[0])}</i><span>${IGX(e[1]||"")}</span></div><button class="spk" data-say="${IGX(e[0])}" aria-label="Ouvir">${SPK_SVG}</button></div>`).join("")}</div>`},
 tip(h,t){return`<div class="tip"><span class="label">${h}</span>${t}</div>`},
 trap(h,t){return`<div class="trap"><span class="label">${h}</span>${t}</div>`}
};
const it=s=>`<i class="it">${s}</i>`;
