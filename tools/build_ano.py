"""Biblioteca anual de textos (Accadde oggi + temas).
Fonte: tools/ano_src/*.json  (listas de entradas compactas)
Saída: news/ano/MM-DD.json (formato da notícia do app) + news/ano/index.json
Uso: python3 tools/build_ano.py
Entrada compacta:
 {"d":"11-03","topic":"Città","lvl":"A2","t":"título","tp":"título pt",
  "p":[parágrafos it],"pp":[parágrafos pt],
  "q":[[pergunta, [opções], índice_certo, explicação_pt], ...],
  "g":{"forma":["lema","classe","significado","nota opcional"], ...}}
"""
import json, os, re, glob, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'tools', 'ano_src')
OUT = os.path.join(ROOT, 'news', 'ano')
os.makedirs(OUT, exist_ok=True)
LET = "A-Za-zÀ-ÖØ-öø-ÿ"
wre = re.compile("[" + LET + "]+['’]?")
errs = []; seen = {}
for f in sorted(glob.glob(os.path.join(SRC, '*.json'))):
    for e in json.load(open(f, encoding='utf-8')):
        d = e['d']; w = os.path.basename(f) + ' ' + d
        if d in seen: errs.append(w + ': data repetida'); continue
        if not re.fullmatch(r'\d\d-\d\d', d): errs.append(w + ': data inválida')
        if len(e['p']) != len(e['pp']): errs.append(w + ': parágrafos it/pt diferentes')
        text = e['t'] + ' ' + ' '.join(e['p'])
        words = set(m.group(0).lower().replace('’', "'") for m in wre.finditer(text))
        words |= set(x.rstrip("'") for x in words)
        for k in e['g']:
            if k.lower() not in words: errs.append(w + ': glossário "' + k + '" não aparece no texto')
        for q in e['q']:
            if not (0 <= q[2] < len(q[1])): errs.append(w + ': resposta fora das opções: ' + q[0])
        n = len(wre.findall(' '.join(e['p'])))
        if n < 110: errs.append(w + ': texto curto (%d palavras)' % n)
        g = {}
        for k, v in e['g'].items():
            x = {"lemma": v[0], "pos": v[1], "meaning": v[2], "synonyms": []}
            if len(v) > 3 and v[3]: x["note"] = v[3]
            g[k.lower()] = x
        doc = {"date": "", "title": e['t'], "titlePt": e['tp'], "topic": e['topic'], "level": e.get('lvl', 'A2'),
               "kind": "accadde" if e['topic'] == 'Accadde oggi' else "tema",
               "paragraphs": e['p'], "paragraphsPt": e['pp'], "sources": e.get('src', []), "glossary": g,
               "quiz": [{"q": q[0], "options": q[1], "answer": q[2], "explanation": q[3]} for q in e['q']]}
        seen[d] = {"title": e['t'], "topic": e['topic'], "level": doc['level'], "words": n}
        json.dump(doc, open(os.path.join(OUT, d + '.json'), 'w', encoding='utf-8'), ensure_ascii=False)
json.dump({"days": {k: {"title": v["title"], "topic": v["topic"]} for k, v in sorted(seen.items())}},
          open(os.path.join(OUT, 'index.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
print(len(seen), 'textos;', 'média de palavras', round(sum(v['words'] for v in seen.values()) / max(1, len(seen))))
if errs:
    print('\n'.join(errs)); sys.exit(1)
