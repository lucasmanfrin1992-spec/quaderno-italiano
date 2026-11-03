# Biblioteca anual (Accadde oggi + temas)

Um texto por dia (MM-DD), liberado à meia-noite pelo PWA (news/ano/). Começa em 03/11 (A2) e sobe até B1.

- Fonte: um arquivo JSON por lote de 10 dias neste diretório (formato descrito em tools/build_ano.py).
- Gerar e validar: `python3 tools/build_ano.py` (confere glossário, quiz e tamanho).
- Nível: 03/11–31/01 A2 (~150 palavras) · 01/02–31/05 A2+ (~170–190) · 01/06–02/11 B1 (~200–240).
- "Accadde oggi" só com fatos e datas seguros; na dúvida, usar um tema atemporal.
- Falta escrever: ver as datas ausentes em news/ano/index.json (inclui 02-29).
