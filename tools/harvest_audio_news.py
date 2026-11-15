"""Lista os trechos das notícias (título e parágrafos) e as palavras delas -> tools/audio_texts_news.json.
Ordem: a partir do dia de hoje, para que um lote parcial cubra primeiro os próximos dias.
Uso: python3 -m http.server 8765 (na raiz) e, em outro terminal, python3 tools/harvest_audio_news.py
"""
import json,os,glob,datetime
from playwright.sync_api import sync_playwright
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
today=datetime.date.today()
def prio(f):
    b=os.path.basename(f)[:-5]
    try:
        if len(b)==5: m,d=map(int,b.split('-'));dt=datetime.date(today.year,m,d)
        else: dt=datetime.date.fromisoformat(b)
    except ValueError: return 999
    return (dt-today).days%366
files=sorted(glob.glob(os.path.join(ROOT,'news','ano','*.json'))+[f for f in glob.glob(os.path.join(ROOT,'news','*.json')) if not f.endswith('index.json')],key=prio)
news=[]
for f in files:
    d=json.load(open(f,encoding='utf-8'));news.append([d.get('title','')]+list(d.get('paragraphs',[])))
have={k for k,_ in json.load(open(os.path.join(ROOT,'tools','audio_texts.json'),encoding='utf-8'))}
JS=r"""(news)=>{const out=[],seen=new Set();const add=(t,kind)=>{const n=audioNorm(t);if(!n||!/[A-Za-zÀ-ÿ]/.test(n))return;const k=audioKey(n);if(seen.has(k))return;seen.add(k);out.push([k,n,kind])};
 for(const day of news){for(const t of day)add(t,'texto');const box=document.createElement('div');box.innerHTML=day.map(t=>`<p><span class="it">${esc(t)}</span></p>`).join('');tokenize(box);box.querySelectorAll('button.w').forEach(b=>add(b.textContent,'palavra'))}
 return out}"""
with sync_playwright() as p:
    br=p.chromium.launch(executable_path=os.environ.get("CHROME","/usr/bin/google-chrome"),args=["--no-sandbox"]);pg=br.new_page()
    pg.add_init_script("(()=>{try{localStorage.setItem('quaderno.reset','2026-11-01c');localStorage.setItem('quaderno.current','lucas');sessionStorage.setItem('quaderno.chosen','lucas')}catch(e){}})()")
    pg.goto("http://localhost:8765/index.html");pg.wait_for_timeout(1000)
    items=pg.evaluate(JS,news);br.close()
items=[i for i in items if i[0] not in have]
# textos primeiro (na ordem dos dias), palavras depois
items=[i for i in items if i[2]=='texto']+[i for i in items if i[2]=='palavra']
json.dump([[k,t] for k,t,_ in items],open(os.path.join(ROOT,'tools','audio_texts_news.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=0)
print('notícias',len(files),'· trechos',sum(1 for i in items if i[2]=='texto'),'· palavras novas',sum(1 for i in items if i[2]=='palavra'),'· caracteres',sum(len(t) for _,t,_ in items))
