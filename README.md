# Quaderno d'Italiano (PWA)

App de estudo de italiano (Duolingo seções 1–3 + ponte A2): notícia do dia com glossário e questionário, calendário de leitura, gramática, vocabulário, exercícios e cartões com revisão espaçada no estilo Anki.

- `index.html` — o app inteiro (HTML, CSS e JS num arquivo).
- `sw.js` — service worker: app offline; notícias da rede com cópia em cache.
- `news/index.json` — lista de dias publicados (`{"days": {"AAAA-MM-DD": {"title", "topic"}}}`).
- `news/AAAA-MM-DD.json` — notícia do dia (title, titlePt, topic, level, paragraphs, paragraphsPt, sources, glossary, quiz).

Publicado com GitHub Pages (branch `main`, pasta raiz). O progresso fica no aparelho (localStorage); use Exportar/Importar na aba Cartões para levar a outro aparelho.
