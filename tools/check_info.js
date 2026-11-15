// Valida os infográficos de lição: node tools/check_info.js
const fs=require('fs'),path=require('path');
const src=['ig.js','a1.js','a2.js','infograficos_data.js'].map(f=>fs.readFileSync(path.join(__dirname,'..','src',f),'utf8')).join('\n');
const {INFOGRAFICOS:I,COURSE:C}=new Function(src+';return {INFOGRAFICOS,COURSE}')();
const POSES=["acenando","apontando","pensando","comemorando"],ICONS=["pessoa","telefone","email","empresa","cracha","calendario","relogio","documento"],topics=new Set(C.map(t=>t.id)),errs=[],seen=new Set();
// título do bloco é uma ação em português: começa com verbo no imperativo (termina em -e, -a, -ie, -ue, -ia…)
const actionOk=t=>/^(?:Não [a-zà-ú]+|[A-ZÀ-Ú][a-zà-ú]+(e|a)(-se)?)\b/.test(t);
I.forEach(x=>{const w=x.id;if(seen.has(x.topico))errs.push(w+': tópico repetido');seen.add(x.topico);if(!topics.has(x.topico))errs.push(w+': tópico não existe: '+x.topico);
 const c=x.cabecalho;['trilho','titulo','subtitulo'].forEach(k=>{if(!c[k])errs.push(w+': cabeçalho sem '+k)});if(!POSES.includes(c.nonna))errs.push(w+': pose da Nonna inválida: '+c.nonna);
 if(x.blocos.length<3||x.blocos.length>5)errs.push(w+': deve ter de 3 a 5 blocos ('+x.blocos.length+')');
 x.blocos.forEach((b,i)=>{const n=w+' bloco '+(i+1);if(!actionOk(b.titulo))errs.push(n+': título não parece uma ação: '+b.titulo);
  if(b.tipo==="tabela"){if(!b.linhas||!b.linhas.length||b.linhas.length>9)errs.push(n+': tabela deve ter de 1 a 9 linhas');b.linhas.forEach(l=>{if(l.length!==2||!l[0]||!l[1])errs.push(n+': linha inválida')});
   if(b.dica){if(b.dica.length>110)errs.push(n+': dica longa demais ('+b.dica.length+' caracteres)');if((b.dica.match(/\*\*/g)||[]).length%2)errs.push(n+': negrito sem fechar na dica')}}
  else if(b.tipo==="icones"){if(!b.itens||!b.itens.length||b.itens.length>9)errs.push(n+': ícones deve ter de 1 a 9 itens');b.itens.forEach(t=>{if(!ICONS.includes(t.icone))errs.push(n+': ícone desconhecido: '+t.icone)})}
  else if(b.tipo==="regra"){if(!b.formula||!b.exemplos||!b.exemplos.length)errs.push(n+': regra sem fórmula ou exemplos')}
  else errs.push(n+': tipo desconhecido '+b.tipo);
  if(b.cena){const f=b.cena.falas||[];if(f.length<2||f.length>3)errs.push(n+': a cena deve ter de 2 a 3 falas');f.forEach(z=>{if(!["nonna","outro"].includes(z.quem)||!z.texto)errs.push(n+': fala inválida')});if(b.cena.nonna&&!POSES.includes(b.cena.nonna))errs.push(n+': pose inválida na cena')}})});
console.log(I.length+' infográficos · '+I.reduce((a,x)=>a+x.blocos.length,0)+' blocos · '+I.reduce((a,x)=>a+x.blocos.filter(b=>b.cena).length,0)+' cenas');
if(errs.length){console.log(errs.join('\n'));process.exit(1)}
