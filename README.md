# Nonna Dice (PWA)

Antigo *Quaderno d'Italiano*.

App de estudo de italiano A1–A2: curso em 20 tópicos (vocabulário, gramática com infográficos, mini-história e exercícios), notícia do dia com glossário e questionário, 24 leituras graduadas (A1 e A2) com notas e quiz de 3 perguntas, 40 modi di dire em 8 unidades com mini-quiz, aba Exercícios com 240 questões de marcar (A1 e A2: gramática, vocabulário e interpretação de texto), resumos ilustrados com a Nonna no início de 6 tópicos, Preferiti com fichas de dúvida (sem IA: o app só oferece um prompt para copiar e guarda a resposta colada) (palavras e frases salvas) e cartões com revisão espaçada no estilo Anki. Desde a v3: caderno de erros, Escuta (60 itens), Montar a frase (80), Diálogos com escolha (12 cenas, tu × Lei), Verbos (40, consulta e treino), Simulado A1/A2, Falsos amigos (40), trilha de engenharia «Cantiere e ufficio tecnico» (6 unidades), Caffè con la Nonna (sessão de 5 minutos), busca geral, resumo semanal em PNG e resumos ilustrados nos 20 tópicos. Todos os exercícios são de múltipla escolha ou de tocar em blocos; não há perguntas de escrita. Toque em qualquer palavra italiana para ver significado, exemplos e, nas preposições, como a forma se constrói; a estrela salva a palavra em Preferiti e “Marcar um trecho” salva uma frase.

- `index.html` — o app inteiro (HTML, CSS e JS num arquivo).
- `sw.js` — service worker: app offline; notícias da rede com cópia em cache.
- `news/index.json` — lista de dias publicados (`{"days": {"AAAA-MM-DD": {"title", "topic"}}}`).
- `news/AAAA-MM-DD.json` — notícia do dia (title, titlePt, topic, level, paragraphs, paragraphsPt, sources, glossary, quiz).

Publicado com GitHub Pages (branch `main`, pasta raiz). O progresso fica no aparelho (localStorage); use Exportar/Importar na aba Cartões para levar a outro aparelho.

## Como editar

O conteúdo e o código ficam em `src/` (curso A1 em `a1.js`, A2 em `a2.js`, diálogos usados como frases de escuta em `shadow_data.js`, mini-histórias em `stories.js`, histórias e revisão de tópicos em `extras.js`, dicionário em `lex.js` (palavras gramaticais) e `lex_extra_data.js` / `lex_extra.js` (dicionário ampliado), exercícios gerados, opções de múltipla escolha, testes e meta em `practice.js`, painel da palavra em `sheet.js`, Preferiti e trecho marcado em `preferiti.js`, textos das leituras em `letture_data.js` e suas versões Intermedio e Avanzato em `letture_versioni.js` (validar com `node tools/check_letture.js`) e a tela delas em `letture.js`, voz italiana em `voice.js`, player de áudio com velocidade em `audio.js`, modi di dire em `modi.js`, calendário, painel e log de eventos em `painel.js`, fichas de dúvida em `duvidas.js`, banco de exercícios em `exercicios_data.js` (validar com `node tools/check_exercicios.js`) e a aba em `exercicios.js`, infográficos de lição em `infograficos_data.js` (validar com `node tools/check_info.js`) e `infografico.js`). Os módulos da v3 ficam em `v3core.js` (caderno de erros, motor de rodadas, sorteio com semente), `v3modes.js` (modos da aba Exercícios, falsos amigos e Cantiere no Curso), `v3extra.js` (Caffè, busca, resumo semanal, download de áudios) e nos dados `escuta_data.js`, `ordem_data.js`, `dialoghi_data.js`, `falsi_data.js`, `cantiere_data.js` (validar com `node tools/check_v3.js`). Revisão do italiano: `node tools/revisao_italiano.js` aponta problemas; com `--csv` gera a folha para a professora (id;seção;italiano;português;correção). Os dados salvos têm versão (`versaoDados` em `app.js`); mudanças de formato entram em `migrar()`. Depois de editar:

1. `python3 tools/build.py` — gera `index.html` (esta PWA) e `dist/artifact.html` (a versão do Claude).
2. Suba o número da versão em `sw.js` (`const V=...`) para os celulares baixarem a versão nova.

## Áudio gravado (voz italiana offline)

O PWA toca arquivos MP3 em `audio/` (um por frase ou palavra; a lista fica em `audio/index.json`). Eles funcionam no iPhone mesmo no modo silencioso, ao contrário da voz do navegador. Frases sem arquivo, como a notícia do dia, usam a voz do aparelho.

Depois de mudar textos do app:
1. `python3 tools/build.py` e `python3 -m http.server 8765` na raiz;
2. `python3 tools/harvest_audio.py` (lista as frases em `tools/audio_texts.json`; usa Playwright e Chrome);
3. `python3 tools/build_audio.py it_IT-paola-medium.onnx` (gera só os arquivos novos; requer `pip install piper-tts` e ffmpeg; a voz é a it_IT "paola" medium do projeto Piper).
