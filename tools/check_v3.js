// Valida os dados do Nonna Dice v3: node tools/check_v3.js
const fs=require('fs'),path=require('path');
const rd=f=>fs.readFileSync(path.join(__dirname,'..','src',f),'utf8');
const src=['escuta_data.js','ordem_data.js','dialoghi_data.js','falsi_data.js','cantiere_data.js'].map(rd).join('\n');
const D=new Function(src+';return{ASC,ORD,DIA,FALSI,CANT}')();
const errs=[],warn=[];const uniq=(a,w)=>{if(new Set(a.map(x=>x.toLowerCase())).size!==a.length)errs.push(w+': opções repetidas')};
// Escuta
['A1','A2'].forEach(l=>{const a=D.ASC.filter(x=>x.nivel===l);if(a.length!==30)errs.push('Escuta '+l+': '+a.length+' itens (esperado 30)')});
D.ASC.forEach(x=>{uniq(x.opcoes,x.id);if(x.formato==='pares'&&x.opcoes.length!==2)errs.push(x.id+': pares precisa de 2 opções');if(x.formato!=='pares'&&x.opcoes.length!==3)errs.push(x.id+': precisa de 3 opções');
 if(x.formato!=='significa'&&x.opcoes[0]!==x.audio)errs.push(x.id+': a primeira opção deve ser o áudio');if(!x.nota)warn.push(x.id+': sem nota')});
// Montar a frase
['A1','A2'].forEach(l=>{const a=D.ORD.filter(x=>x.nivel===l);if(a.length!==40)errs.push('Montar '+l+': '+a.length+' frases (esperado 40)')});
const key=a=>a.map(w=>w.toLowerCase()).sort().join('|');
D.ORD.forEach(x=>{x.aceitas.forEach((a,i)=>{if(key(a)!==key(x.blocos))errs.push(x.id+': ordem aceita '+i+' não usa os mesmos blocos')});
 if(x.nivel==='A2'&&(x.extras.length<2||x.extras.length>3))errs.push(x.id+': A2 precisa de 2 a 3 extras');if(x.nivel==='A1'&&x.extras.length)errs.push(x.id+': A1 sem extras');
 x.extras.forEach(e=>{if(x.blocos.some(b=>b.toLowerCase()===e.toLowerCase()))errs.push(x.id+': extra igual a um bloco: '+e)})});
// Diálogos
if(D.DIA.length!==12)errs.push('Diálogos: '+D.DIA.length+' (esperado 12)');
D.DIA.forEach(d=>{if(d.turnos.length<5||d.turnos.length>7)errs.push(d.id+': 5 a 7 turnos');d.turnos.forEach((t,i)=>{uniq(t.opcoes.map(o=>o.it),d.id+' t'+(i+1));if(!t.nota)errs.push(d.id+' t'+(i+1)+': sem nota');
 const reg=t.opcoes.find(o=>o.motivo==='registro').it;if(d.registro==='Lei'&&!/\b(tu|ti|te|ciao|vieni|porta|dammi|fai|sei|vuoi|mandamelo|mandalo|ripeti|parla|scusa|bello|dai|eh|boh|matto|casino|palle|vabbè|ehi)\b/i.test(reg))warn.push(d.id+' t'+(i+1)+': confira se a opção de registro está mesmo informal: '+reg)})});
// Falsos amigos
const fa=D.FALSI.reduce((n,b)=>n+b.itens.length,0);if(fa!==40)errs.push('Falsos amigos: '+fa+' (esperado 40)');D.FALSI.forEach(b=>{if(b.itens.length!==10)errs.push(b.id+': 10 itens')});
const fw=D.FALSI.flatMap(b=>b.itens.map(x=>x.it));if(new Set(fw).size!==fw.length)errs.push('Falsos amigos repetidos');
// Cantiere
if(D.CANT.length!==6)errs.push('Cantiere: 6 unidades');D.CANT.forEach(u=>{if(u.termos.length!==15)errs.push(u.id+': '+u.termos.length+' termos');if(u.q.length!==5)errs.push(u.id+': 5 questões');u.q.forEach((q,i)=>uniq(q[1],u.id+' q'+(i+1)));if(!u.doc||!u.doc.texto)errs.push(u.id+': sem documento')});
console.log(`Escuta ${D.ASC.length} · Montar ${D.ORD.length} · Diálogos ${D.DIA.length} (${D.DIA.reduce((n,d)=>n+d.turnos.length,0)} turnos) · Falsos amigos ${fa} · Cantiere ${D.CANT.length} unidades`);
if(warn.length)console.log('Avisos:\n '+warn.join('\n '));
if(errs.length){console.log('ERROS:\n '+errs.join('\n '));process.exit(1)}console.log('OK');
