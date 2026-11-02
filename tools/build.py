"""Monta as duas versões do Quaderno a partir de src/.
1) dist/artifact.html  -> versão publicada como artifact no Claude (sem perfis; usa db/sample do Claude)
2) index.html          -> PWA do GitHub Pages (perfis, notícias em news/, backup, instalação)
Uso: python3 tools/build.py   (depois suba o número da versão em sw.js)
"""
import os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
S=os.path.join(ROOT,'src')
ORDER=['ig.js','a1.js','a2.js','lex.js','writing.js','shadow_data.js','app.js','practice.js','sheet.js','shadow.js','news.js','init.js']
r=lambda f:open(os.path.join(S,f)).read()
css=r('style_orig.css')+r('style_new.css')
js=''.join(r(f)+'\n' for f in ORDER)
os.makedirs(os.path.join(ROOT,'dist'),exist_ok=True)
open(os.path.join(ROOT,'dist','artifact.html'),'w').write(r('head.html')+css+'</style>\n\n'+r('body.html')+'\n<script>\n'+js+'</script>\n')
# ---- PWA ----

art=open(os.path.join(ROOT,'dist','artifact.html')).read()
pwa=open(os.path.join(ROOT,'index.html')).read()
def between(s,a,b,inc_b=False):
    i=s.index(a);j=s.index(b,i)
    return s[i:j+(len(b) if inc_b else 0)]
# 1 head
pre=pwa[:pwa.index('<title>')]
out=art.replace('<meta name="claude:viewport-fit-sides" content="cover">\n','',1)
perfis=between(pwa,'/* perfis */','/* vocab */') if '/* vocab */' in pwa[pwa.index('/* perfis */'):] else None
pblock=pwa[pwa.index('/* perfis */'):pwa.index('.pmsg{')]
pblock+=pwa[pwa.index('.pmsg{'):pwa.index('\n',pwa.index('.pmsg{'))+1]
out=out.replace('</style>\n\n','\n'+pblock+'</style>\n</head>\n<body>\n\n',1)
out=pre+out
# 2 body
out=out.replace('<span class="chip" id="chipDue">0 para hoje</span>','<span class="chip" id="chipDue">0 para hoje</span>\n      <button class="chip pchip" id="profChip" aria-label="Trocar de perfil"><span class="pav sm" id="profChipAv"></span><span id="profChipName">Perfil</span></button>',1)
inst=between(pwa,'<div class="card stack" id="installCard" hidden>','</div>\n',True)
inst=pwa[pwa.index('<div class="card stack" id="installCard" hidden>'):]
inst=inst[:inst.index('<button class="btn primary" id="installBtn" hidden>Instalar app</button>')]+'<button class="btn primary" id="installBtn" hidden>Instalar app</button>\n</div>\n'
out=out.replace('    <div class="homegrid">',inst+'    <div class="homegrid">',1)
bk='''<p class="small muted">O progresso fica salvo neste aparelho, separado por perfil.</p>
    </div>
    <div class="card stack">
      <h3>Backup do progresso</h3>
      <p class="small muted">O progresso deste perfil fica salvo neste aparelho. Para levá-lo a outro celular ou computador, exporte aqui e importe lá, dentro do mesmo perfil.</p>
      <div class="row"><button class="btn" id="bkExport">Exportar progresso</button><label class="btn" for="bkFile" style="cursor:pointer">Importar progresso</label><input type="file" id="bkFile" accept="application/json,.json" hidden></div>
      <p class="small" id="bkMsg" role="status"></p>
    </div>'''
o='<p class="small muted">O progresso fica salvo na sua conta e neste aparelho.</p>\n    </div>'
assert o in out;out=out.replace(o,bk,1)
out=out.replace('<div class="sheetback" id="sheetBack" hidden></div>','<div class="profov" id="profOv" role="dialog" aria-modal="true" aria-labelledby="profTitle" hidden><div class="profin" id="profIn"></div></div>\n\n<div class="sheetback" id="sheetBack" hidden></div>',1)
# 3 KEY
kb=pwa[pwa.index('const PROFILES=['):]
kb=kb[:kb.index('const KEY=')]+kb[kb.index('const KEY='):kb.index('\n',kb.index('const KEY='))]
assert 'const KEY="quaderno.v1";' in out
out=out.replace('const KEY="quaderno.v1";',kb,1)
# 4 news
o=out[out.index(' try{const s=await DB.doc("news/"+d).get();'):]
o=o[:o.index('}}\n')+3]
out=out.replace(o,''' try{const n=await loadNews(d);if(NEWS.curDate!==d)return;NEWS.cur=n;renderNews()}
 catch(e){$("#newsBox").innerHTML=`<div class="card"><p class="muted">${navigator.onLine===false?"Sem conexão: esta notícia ainda não foi baixada neste aparelho.":"Não consegui abrir essa notícia agora. Tente de novo em instantes."}</p></div>`}}
''',1)
newcloud=pwa[pwa.index('/* PWA: notícias em arquivos estáticos'):pwa.index('function rerenderAll')]
i=out.index('/* nuvem: notícias + sincronização do progresso */');j=out.index('function rerenderAll',i)
out=out[:i]+newcloud+out[j:]
out=out.replace('error:["Não consegui carregar as notícias","Tente reabrir o app daqui a pouco."]}[NEWS.state]','error:["Não consegui carregar as notícias","Tente reabrir o app daqui a pouco."],\n offline:["Você está sem conexão","A notícia de hoje aparece assim que a internet voltar. As notícias que você já abriu continuam disponíveis."]}[NEWS.state]',1)
out=out.replace('NEWS.state==="nodb"?"Disponível quando o app é aberto no Claude, com a sua conta.":NEWS.state==="empty"','NEWS.state==="nodb"?"Disponível quando o app é aberto no Claude, com a sua conta.":NEWS.state==="offline"?"Sem conexão agora. A notícia aparece quando a internet voltar.":NEWS.state==="empty"',1)
# 5 PWA + perfis blocks
tail=pwa[pwa.index('/* ============================ PWA ============================ */'):pwa.rindex('</script>')]
tail=tail.replace('''const c=Object.keys(o.cards||{}).length,n=Object.keys(o.newsDone||{}).length,f=Object.keys(o.favs||{}).length;
 return`${c} cartões · ${n} notícias lidas · ${f} palavras salvas`}''','''const c=o.resetEpoch===RESET_EPOCH?Object.keys(o.cards||{}).length:0,n=Object.keys(o.newsDone||{}).length,t=Object.values(o.course||{}).filter(x=>x&&x.best>=70).length;
 return`${t} tópicos concluídos · ${c} cartões · ${n} notícias lidas`}''')
assert 'tópicos concluídos' in tail, 'profstats'
out=out[:out.rindex('</script>')]+tail+'</script>\n\n</body>\n</html>\n'
open(os.path.join(ROOT,'index.html'),'w').write(out)
print(len(out))
