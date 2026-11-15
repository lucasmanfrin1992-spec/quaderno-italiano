"""Lista as frases que o app lê em voz alta -> tools/audio_texts.json (para tools/build_audio.py).
Uso: python3 -m http.server 8765 (na raiz do repositório) e, em outro terminal, python3 tools/harvest_audio.py
"""
import json,os
from playwright.sync_api import sync_playwright
JS=r"""async()=>{const REC=new Map();const add=t=>{const n=audioNorm(t);if(!n||!/[A-Za-zÀ-ÿ]/.test(n))return;const k=audioKey(n);if(!REC.has(k))REC.set(k,n)};
 window.sayIt=(t)=>add(t);window.readLines=(lines)=>lines.forEach(add);
 const WORDS=new Set();const says=root=>{root.querySelectorAll('[data-say]').forEach(b=>speak(b.dataset.say));tokenize(root);root.querySelectorAll('button.w').forEach(b=>WORDS.add(b.textContent))};
 const src={};const mark=(name,f)=>{const a=REC.size;f();src[name]=REC.size-a};
 add("Ciao! Sono la Nonna. Mi senti bene?");
 mark('cartoes',()=>Object.keys(CARDS).forEach(id=>{try{const f=cardFace(id);if(f&&f.say)speak(f.say)}catch(e){}}));
 mark('curso',()=>{for(const t of COURSE){for(const part of ['voc','gram','hist']){openTopic(t.id,part);says(document);document.querySelectorAll('#cBody .ibub .it').forEach(e=>add(e.textContent));
   const st=document.querySelector('#stRead');if(st)st.click();const dr=document.querySelector('#dlgRead');if(dr)dr.click()}}});
 mark('escuta',()=>Object.values(LSENT).forEach(a=>a.forEach(s=>speak(s[0]))));
 mark('leituras',()=>{for(const t of LETTURE){for(const v of ['base','intermedio','avanzato']){if(!t.versoes[v])continue;S.letVersao=v;openLet(t.id);AU.items.forEach(i=>add(i.text));says(document)}}LT.cur=null});
 mark('modi',()=>{for(const u of MODI){openModi(u.id);says(document)}});
 mark('exercicios',()=>{Object.values(EXTX).forEach(t=>add(t.texto.replace(/—/g,"")));for(const q of EXQ){EX.run={cat:q.cat,i:0,qs:[{q,ord:q.o.map((_,i)=>i),ans:null}]};renderExRun();says(document)}EX.run=null;EX.tx=null});
 mark('infograficos',()=>{for(const x of INFOGRAFICOS){openTopic(x.topico,'voc');says(document)}});
 mark('palavras',()=>{[...WORDS].forEach(w=>speak(w))});
 mark('dicionario',()=>{[...WORDS].forEach(w=>{const k=w.toLowerCase().replace(/’/g,"'");let e=null;try{e=lookupLocal(k,k)}catch(x){}if(e){if(e.lemma)speak(e.lemma);if(e.example)speak(e.example)}})});
 return {items:[...REC].map(([k,t])=>[k,t]),src}}"""
with sync_playwright() as p:
    br=p.chromium.launch(executable_path=os.environ.get("CHROME","/usr/bin/google-chrome"),args=["--no-sandbox"]);pg=br.new_page(viewport={"width":380,"height":800})
    pg.add_init_script("(()=>{try{localStorage.setItem('quaderno.reset','2026-11-01c');localStorage.setItem('quaderno.current','lucas');sessionStorage.setItem('quaderno.chosen','lucas')}catch(e){}})()")
    pg.goto("http://localhost:8765/index.html");pg.wait_for_timeout(1200)
    r=pg.evaluate(JS);br.close()
items=r["items"];import os
out=os.path.join(os.path.dirname(os.path.abspath(__file__)),"audio_texts.json")
json.dump(items,open(out,"w",encoding="utf-8"),ensure_ascii=False,indent=0)
ch=sum(len(t) for k,t in items)
print("frases",len(items),"caracteres",ch,"por fonte",r["src"])
print("estimativa: ~%.0f min de áudio, ~%.0f MB em MP3 32 kbps"%(ch/14/60, ch/14*4/1024))
import collections;print(collections.Counter(len(t.split())==1 for k,t in items))
