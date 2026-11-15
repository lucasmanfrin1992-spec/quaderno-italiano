// Valida o banco de exercícios: node tools/check_exercicios.js
const fs=require('fs'),path=require('path');
const {EXQ,EXTX}=new Function(fs.readFileSync(path.join(__dirname,'..','src','exercicios_data.js'),'utf8')+';return {EXQ,EXTX}')();
const errs=[],ids=new Set(),cnt={};
EXQ.forEach(q=>{if(ids.has(q.id))errs.push('id repetido '+q.id);ids.add(q.id);const k=q.nivel+' '+q.cat;cnt[k]=(cnt[k]||0)+1;
 if(!["comp","mc","frase","it","vf"].includes(q.tipo))errs.push(q.id+': tipo '+q.tipo);
 if(q.tipo!=="vf"){if(q.o.length<3||q.o.length>4)errs.push(q.id+': deve ter 3 ou 4 opções');if(new Set(q.o.map(x=>x.toLowerCase())).size!==q.o.length)errs.push(q.id+': opções repetidas')}
 if(q.tipo==="comp"&&!q.q.includes("___"))errs.push(q.id+': complete sem ___');
 if(!q.x)errs.push(q.id+': sem explicação');
 if(q.cat==="int"&&!EXTX[q.tx])errs.push(q.id+': texto não encontrado')});
Object.values(EXTX).forEach(t=>{const n=EXQ.filter(q=>q.tx===t.id).length;if(n!==4)errs.push(t.id+': '+n+' perguntas');const w=(t.texto.match(/[A-Za-zÀ-ÿ]+/g)||[]).length;if(w<20||w>110)errs.push(t.id+': '+w+' palavras')});
console.log(EXQ.length+' questões · '+Object.keys(EXTX).length+' textos');Object.keys(cnt).sort().forEach(k=>console.log(' '+k+': '+cnt[k]));
Object.keys(cnt).forEach(k=>{if(cnt[k]<30||cnt[k]>50)errs.push(k+': '+cnt[k]+' (deve ter de 30 a 50)')});
if(errs.length){console.log(errs.join('\n'));process.exit(1)}
