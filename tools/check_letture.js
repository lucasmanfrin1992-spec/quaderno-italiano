// Valida os textos das Leituras: node tools/check_letture.js
const fs=require('fs'),path=require('path');
const src=['letture_data.js','letture_versioni.js'].map(f=>fs.readFileSync(path.join(__dirname,'..','src',f),'utf8')).join('\n');
const L=new Function(src+';return LETTURE')();
const LET="A-Za-zÀ-ÖØ-öø-ÿ",wre=new RegExp("["+LET+"]+","g"),errs=[],ids=new Set();let tot=0;
L.forEach(t=>{const w=t.id;if(ids.has(w))errs.push(w+': id repetido');ids.add(w);
 ['base','intermedio','avanzato'].forEach(v=>{const tx=t.versoes[v];if(!tx){if(v==='base')errs.push(w+': sem texto base');return}
  const n=(tx.match(wre)||[]).length;if(v==='base')tot+=n;if(n<80||n>130)errs.push(`${w} (${v}): ${n} palavras (deve ter 80 a 130)`)});
 const words=new Set((Object.values(t.versoes).join(' ').toLowerCase().match(wre)||[]));
 t.glossario.forEach(g=>{if(!words.has(g.it.toLowerCase()))errs.push(`${w}: glossário "${g.it}" não aparece no texto`)});
 const seen=new Set();t.glossario.forEach(g=>{if(seen.has(g.it))errs.push(`${w}: glossário "${g.it}" repetido`);seen.add(g.it)});
 if(t.notas.vocabulario.length!==5)errs.push(w+': vocabulário deve ter 5 itens');
 if(t.notas.gramatica.length!==2)errs.push(w+': gramática deve ter 2 notas');
 if(t.notas.colocacoes.length!==2)errs.push(w+': colocações deve ter 2 itens');
 t.notas.gramatica.forEach(g=>{const tr=g.trecho.replace(/[“”]/g,'').split('…').map(s=>s.trim()).filter(Boolean);const all=Object.values(t.versoes).join(' ').replace(/\n/g,' ');tr.forEach(s=>{if(!all.includes(s.replace(/\s*\?$/,'?')))errs.push(`${w}: trecho de gramática não está no texto: ${s}`)})});
 if(t.quiz.length!==3)errs.push(w+': o quiz deve ter 3 perguntas');
 t.quiz.forEach(q=>{if(q.opcoes.length!==3||new Set(q.opcoes).size!==3)errs.push(w+': opções do quiz: '+q.pergunta);if(!(q.correta>=0&&q.correta<3))errs.push(w+': resposta fora das opções')})});
const c=k=>L.filter(k).length;
if(L.length!==24)errs.push('total de textos: '+L.length);
if(c(t=>t.nivel==='A1')!==12||c(t=>t.nivel==='A2')!==12)errs.push('devem ser 12 A1 e 12 A2');
if(c(t=>t.tema==='lavoro')<14)errs.push('pelo menos 14 textos de trabalho');
console.log(L.length+' textos · '+c(t=>t.tema==='lavoro')+' de trabalho · média de '+Math.round(tot/L.length)+' palavras');
L.forEach(t=>{console.log(' '+t.id,['base','intermedio','avanzato'].map(v=>(t.versoes[v].match(wre)||[]).length).join(' / '));['intermedio','avanzato'].forEach(v=>{if(!t.versoes[v])errs.push(t.id+': falta a versão '+v)})});
if(errs.length){console.log(errs.join('\n'));process.exit(1)}
