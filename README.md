# Quaderno d'Italiano (PWA)

App de estudo de italiano A1–A2: curso em 20 tópicos (vocabulário, gramática com infográficos e exercícios), escrita com correção no Claude, shadowing com podcasts por tópico, notícia do dia com glossário e questionário, e cartões com revisão espaçada no estilo Anki. Toque em qualquer palavra italiana para ver significado, exemplos e, nas preposições, como a forma se constrói.

- `index.html` — o app inteiro (HTML, CSS e JS num arquivo).
- `sw.js` — service worker: app offline; notícias da rede com cópia em cache.
- `news/index.json` — lista de dias publicados (`{"days": {"AAAA-MM-DD": {"title", "topic"}}}`).
- `news/AAAA-MM-DD.json` — notícia do dia (title, titlePt, topic, level, paragraphs, paragraphsPt, sources, glossary, quiz).

Publicado com GitHub Pages (branch `main`, pasta raiz). O progresso fica no aparelho (localStorage); use Exportar/Importar na aba Cartões para levar a outro aparelho.

## Como editar

O conteúdo e o código ficam em `src/` (curso A1 em `a1.js`, A2 em `a2.js`, escrita em `writing.js`, podcasts em `shadow_data.js`, dicionário em `lex.js`, exercícios gerados, testes e meta em `practice.js`). Depois de editar:

1. `python3 tools/build.py` — gera `index.html` (esta PWA) e `dist/artifact.html` (a versão do Claude).
2. Suba o número da versão em `sw.js` (`const V=...`) para os celulares baixarem a versão nova.
