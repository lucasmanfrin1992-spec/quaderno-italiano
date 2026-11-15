// Verificador do italiano e folha de revisão para a professora.
// Uso: node tools/revisao_italiano.js            -> lista os problemas encontrados (heurísticas)
//      node tools/revisao_italiano.js --csv      -> grava tools/revisao_italiano.csv (id;seção;italiano;português;correção)
// Heurísticas: è × e, acentos finais (perché, città, più…), artigos antes de s+consoante, z, gn, ps, x,
// apóstrofos (l', un', dell'…), "qual'è", "E'". Não substitui a revisão de um professor: aponta o que olhar.
const fs=require('fs'),path=require('path');
const rd=f=>fs.readFileSync(path.join(__dirname,'..','src',f),'utf8');
const files=['ig.js','a1.js','a2.js','modi.js','letture_data.js','letture_versioni.js','infograficos_data.js','exercicios_data.js','escuta_data.js','ordem_data.js','dialoghi_data.js','falsi_data.js','cantiere_data.js'];
const src=files.map(rd).join('\n');
const D=new Function(src+';return{COURSE,MODI,LETTURE,INFOGRAFICOS,EXQ,EXTX,ASC,ORD,DIA,FALSI,CANT}')();
const rows=[];const add=(id,sec,it,pt)=>{if(it&&String(it).trim())rows.push({id,sec,it:String(it).trim(),pt:pt?String(pt).trim():""})};
const join=bs=>{let s="";bs.forEach((b,i)=>{if(i&&!/^[?!.,;:»)]/.test(b)&&!/['’]$/.test(bs[i-1]))s+=" ";s+=b});return s};
// v2: leituras (3 versões, por parágrafo), modi di dire, balões e exemplos dos resumos, exercícios
D.LETTURE.forEach(t=>{add(t.id+".titulo","Leituras",t.titulo);["base","intermedio","avanzato"].forEach(v=>String(t.versoes[v]||"").split("\n").forEach((p,i)=>add(t.id+"."+v+".p"+(i+1),"Leituras ("+v+")",p)));
 (t.quiz||[]).forEach((q,i)=>{add(t.id+".q"+(i+1),"Leituras: quiz",q.pergunta);q.opcoes.forEach((o,k)=>add(t.id+".q"+(i+1)+".o"+(k+1),"Leituras: quiz",o))})});
D.MODI.forEach(u=>u.itens.forEach((m,i)=>{add(u.id+"."+(i+1),"Modi di dire",m.it,m.pt);add(u.id+"."+(i+1)+".es","Modi di dire: exemplo",m.es,m.espt)}));
D.INFOGRAFICOS.forEach(x=>x.blocos.forEach((b,i)=>{const p=x.id+".b"+(i+1);
 (b.linhas||[]).forEach((l,k)=>add(p+".l"+(k+1),"Resumos: tabela",l[0],l[1]));(b.exemplos||[]).forEach((e,k)=>add(p+".ex"+(k+1),"Resumos: exemplo",e[0],e[1]));
 (b.itens||[]).forEach((e,k)=>add(p+".i"+(k+1),"Resumos: ícones",e.it,e.pt));if(b.formula)add(p+".formula","Resumos: fórmula",b.formula);
 if(b.cena)b.cena.falas.forEach((f,k)=>add(p+".fala"+(k+1),"Resumos: balão",f.texto,f.pt))}));
Object.values(D.EXTX).forEach(t=>add(t.id,"Exercícios: texto",t.texto));
D.EXQ.forEach(q=>{if(q.tipo==="comp"||q.tipo==="it"){add(q.id,"Exercícios",q.q);q.o.forEach((o,k)=>add(q.id+".o"+(k+1),"Exercícios: opção",o))}else if(q.tipo==="frase")q.o.forEach((o,k)=>add(q.id+".o"+(k+1),"Exercícios: frase"+(k===q.a?" (certa)":" (errada de propósito)"),o))});
// v3
D.ASC.forEach(x=>{add(x.id,"Escuta",x.audio,x.pt);x.opcoes.forEach((o,k)=>{if(x.formato!=="significa"&&k>0)add(x.id+".o"+(k+1),"Escuta: opção"+(x.formato==="pares"?" (grafia errada de propósito)":""),o)})});
D.ORD.forEach(x=>x.aceitas.forEach((a,k)=>add(x.id+(k?".alt"+k:""),"Montar a frase",join(a),x.pt)));
D.DIA.forEach(d=>d.turnos.forEach((t,i)=>{add(d.id+".t"+(i+1),"Diálogos: fala",t.outro);t.opcoes.forEach((o,k)=>add(d.id+".t"+(i+1)+"."+(o.ok?"certa":o.motivo),"Diálogos: resposta"+(o.ok?" (certa)":o.motivo==="registro"?" (registro errado de propósito)":" (sentido errado de propósito)"),o.it))}));
D.FALSI.forEach(b=>b.itens.forEach(x=>{add(x.id,"Falsos amigos",x.it,x.e);add(x.id+".ex","Falsos amigos: exemplo",x.ex,x.expt);add(x.id+".certo","Falsos amigos: palavra certa",x.certo)}));
D.CANT.forEach(u=>{u.termos.forEach((t,i)=>{add(u.id+".t"+(i+1),"Cantiere: termo",t[0],t[1]);add(u.id+".t"+(i+1)+".ex","Cantiere: exemplo",t[2])});u.doc.texto.split("\n").forEach((p,i)=>add(u.id+".doc.p"+(i+1),"Cantiere: documento",p))});

// ---------- heurísticas ----------
const ACC={perche:"perché",perchè:"perché",poiche:"poiché",affinche:"affinché",benche:"benché",finche:"finché",cioe:"cioè",citta:"città",piu:"più",gia:"già",pero:"però",caffe:"caffè",lunedi:"lunedì",martedi:"martedì",mercoledi:"mercoledì",giovedi:"giovedì",venerdi:"venerdì",cosi:"così",qualita:"qualità",universita:"università",eta:"età",verita:"verità",attivita:"attività",societa:"società",difficolta:"difficoltà",curiosita:"curiosità",sara:"sarà",avra:"avrà",fara:"farà",andra:"andrà",verra:"verrà",potra:"potrà",dovra:"dovrà",puo:"può",pò:"po'",menu:"menù"};
const IMP=/^(s[bcdfgklmnpqrstvz]|z|gn|ps|pn|x|y)/i,VOW=/^[aeiouàèéìòùh]/i;
const probs=[];
rows.forEach(r=>{if(/errad[ao] de propósito/.test(r.sec))return;const t=r.it,ws=t.split(/[\s,.;:!?«»"()\-–—\/·]+/).filter(Boolean),low=ws.map(w=>w.toLowerCase());
 const P=m=>probs.push(r.id+" ["+r.sec+"] "+m+" → «"+t+"»");
 low.forEach((w,i)=>{if(ACC[w]&&!(w==="sara"&&ws[i]==="Sara")&&!(w==="menu"))P("acento: "+ws[i]+" → "+ACC[w]);
  const n=low[i+1]||"";if(!n)return;
  if(["il","un","i"].includes(w)&&IMP.test(n)&&!/^(ss)/.test(n))P("artigo antes de "+n+": "+w+" → "+(w==="il"?"lo":w==="un"?"uno":"gli"));
  if(w==="lo"&&!IMP.test(n)&&!VOW.test(n)&&!/^(so|sa|sai|sappiamo)$/.test(n)&&/^[a-z]/.test(n)&&!["fa","faccio","fai","fate","fanno","sento","mando","compro","prendo","porto","vedo","metto","so","chiamo","trovo","dico","leggo","scrivo","conosco","aspetto","manda","mandi","faremo","finisco"].includes(n))P("«lo» antes de "+n+" (verifique)");
  if(["la","lo","una"].includes(w)&&/^[aeiouàèìòù]/.test(n)&&!/^(una|uno|uomo)$/.test(n))P("apóstrofo: "+w+" "+n);
  if(["dello","della","nello","nella","allo","alla","dallo","dalla","sullo","sulla"].includes(w)&&/^[aeiou]/.test(n))P("apóstrofo: "+w+" "+n)});
 if(/\bqual'è\b/i.test(t))P("qual è sem apóstrofo");if(/\bE'\s/.test(t))P("È (não E')");if(/\bun'altro\b/i.test(t))P("un altro (sem apóstrofo)");
 if(/\b(l|un|dell|nell|all|dall|sull|quell|bell|sant)'\s/i.test(t))P("espaço depois do apóstrofo");
 if(/\b(ed|e) (è|e)\b/.test(t))P("e/è seguidos (verifique)");
 if(/\b(Lui|Lei|lui|lei|Questo|questo|Il \w+|La \w+) e (un|una|il|la|lo|molto|pronto|pronta|a|in|di|stato|stata|andato|andata|arrivato|arrivata|nato|nata|bello|bella|grande|piccolo|piccola)\b/.test(t))P("possível «è» escrito «e»")});
if(process.argv.includes('--csv')){const q=s=>'"'+String(s).replace(/"/g,'""')+'"';
 fs.writeFileSync(path.join(__dirname,'revisao_italiano.csv'),"﻿id;seção;italiano;português;correção\n"+rows.map(r=>[r.id,r.sec,r.it,r.pt,""].map(q).join(";")).join("\n")+"\n");}
console.log(rows.length+" linhas em italiano; "+probs.length+" pontos para olhar");if(probs.length)console.log(probs.join("\n"));
