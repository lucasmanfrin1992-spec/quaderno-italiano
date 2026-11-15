/* ============================ ESCUTA (ASCOLTO): dados (conteúdo original) ============================ */
// Formatos (tudo de marcar): "ouviu" (3 frases em italiano que diferem num ponto), "pares" (palavras que confundem, dentro de uma frase; 2 opções),
// "significa" (3 traduções em português). A primeira opção é a certa; o app embaralha. nota = explicação curta.
// Validar com node tools/check_v3.js
const ASC_SRC={
A1:[
["ouviu","La riunione è alle nove.",["La riunione è alle nove.","La riunione è alle dieci.","La riunione era alle nove."],"A reunião é às nove.","nove (9) e dieci (10); è (é) e era (era)."],
["ouviu","Sono ingegnere civile.",["Sono ingegnere civile.","Sono ingegneri civili.","Sono un ingegnere civile."],"Sou engenheiro civil.","Com sono, a profissão vem sem artigo."],
["ouviu","Lavoro in uno studio tecnico.",["Lavoro in uno studio tecnico.","Lavoro in un ufficio tecnico.","Lavoro in uno studio medico."],"Trabalho num escritório técnico.","uno studio: uno antes de s + consoante."],
["ouviu","Il cantiere apre alle sette.",["Il cantiere apre alle sette.","Il cantiere chiude alle sette.","Il cantiere apre alle sei."],"O canteiro abre às sete.","apre (abre) × chiude (fecha); sette (7) × sei (6)."],
["ouviu","Abito vicino alla stazione.",["Abito vicino alla stazione.","Abito lontano dalla stazione.","Abito vicino alla piazza."],"Moro perto da estação.","vicino a (perto de) × lontano da (longe de)."],
["ouviu","Ti chiami Lucas e sei brasiliano.",["Ti chiami Lucas e sei brasiliano.","Mi chiamo Lucas e sono brasiliano.","Ti chiami Lucas e sei brasiliana."],"Você se chama Lucas e é brasileiro.","ti chiami / sei = você; mi chiamo / sono = eu."],
["ouviu","Prendo un caffè al bar.",["Prendo un caffè al bar.","Prendo due caffè al bar.","Prendo un cappuccino al bar."],"Tomo um café no bar.","caffè não muda no plural: un caffè, due caffè."],
["ouviu","Il mio ufficio è al terzo piano.",["Il mio ufficio è al terzo piano.","Il mio ufficio è al quarto piano.","Il tuo ufficio è al terzo piano."],"Meu escritório fica no terceiro andar.","piano = andar; terzo (3º), quarto (4º)."],
["ouviu","Oggi lavoro da casa.",["Oggi lavoro da casa.","Oggi lavoro in ufficio.","Domani lavoro da casa."],"Hoje trabalho de casa.","lavorare da casa = trabalhar de casa."],
["ouviu","Quanto costa il biglietto?",["Quanto costa il biglietto?","Quanto costano i biglietti?","Quanto costa la bottiglia?"],"Quanto custa o bilhete?","costa (singular) × costano (plural)."],
["ouviu","La mia collega si chiama Giulia.",["La mia collega si chiama Giulia.","La mia collega si chiama Giuliana.","Mia sorella si chiama Giulia."],"Minha colega se chama Giulia.","collega serve para homem e mulher: il collega, la collega."],
["ouviu","Ci vediamo lunedì mattina.",["Ci vediamo lunedì mattina.","Ci vediamo lunedì sera.","Ci vediamo martedì mattina."],"Nos vemos segunda de manhã.","mattina (manhã), sera (noite); lunedì, martedì."],
["pares","L'ingegnere è in cantiere.",["L'ingegnere è in cantiere.","L'ingegnere e in cantiere."],"O engenheiro está no canteiro.","è (verbo essere) e e (conjunção) soam quase iguais: aqui precisa do verbo."],
["pares","Mi presti una penna?",["Mi presti una penna?","Mi presti una pena?"],"Você me empresta uma caneta?","penna (caneta) tem n dobrado: o som do n dura mais. pena = pena, castigo."],
["pares","Pago alla cassa.",["Pago alla cassa.","Pago alla casa."],"Pago no caixa.","cassa (caixa) tem s dobrado, mais forte; casa tem um s só."],
["pares","Ho sonno.",["Ho sonno.","Ho sono."],"Estou com sono.","sonno = sono, vontade de dormir; sono = sou / são."],
["pares","Loro hanno due figli.",["Loro hanno due figli.","Loro anno due figli."],"Eles têm dois filhos.","hanno e anno soam igual (o h não se pronuncia): o contexto decide. Aqui é o verbo avere."],
["pares","Porta sempre il cappello.",["Porta sempre il cappello.","Porta sempre il capello."],"Ele sempre usa chapéu.","cappello (chapéu) tem p dobrado; capello = um fio de cabelo."],
["pares","Mio nonno ha ottant'anni.",["Mio nonno ha ottant'anni.","Mio nono ha ottant'anni."],"Meu avô tem oitenta anos.","nonno (avô) tem n dobrado; nono = nono (9º)."],
["significa","Che ore sono?",["Que horas são?","Quantos anos você tem?","Onde vocês estão?"],"","Che ore sono? pergunta a hora."],
["significa","Lavoro in cantiere da lunedì a venerdì.",["Trabalho na obra de segunda a sexta.","Trabalho no escritório de segunda a sexta.","Trabalho na obra só na segunda e na sexta."],"","da… a… = de… a…; cantiere = obra, canteiro."],
["significa","Dov'è il bagno, per favore?",["Onde fica o banheiro, por favor?","Onde fica o banco, por favor?","O banheiro está ocupado?"],"","bagno = banheiro; banca = banco."],
["significa","Il capocantiere arriva alle otto.",["O encarregado da obra chega às oito.","O encarregado da obra sai às oito.","O engenheiro chega às oito."],"","capocantiere = encarregado, mestre de obras."],
["significa","Posso pagare con la carta?",["Posso pagar com cartão?","Posso pagar em dinheiro?","Posso ver o cardápio?"],"","la carta = o cartão; em dinheiro = in contanti."],
["significa","Scusi, non ho capito.",["Desculpe, não entendi.","Desculpe, não ouvi o telefone.","Desculpe, agora não posso."],"","capire = entender; non ho capito = não entendi."],
["significa","Domani c'è una riunione con il cliente.",["Amanhã há uma reunião com o cliente.","Ontem houve uma reunião com o cliente.","Amanhã o cliente não vem à reunião."],"","c'è = há, tem; domani = amanhã."],
["significa","Mi piace molto questa città.",["Gosto muito desta cidade.","Esta cidade é muito grande.","Não conheço bem esta cidade."],"","mi piace = eu gosto (literalmente: me agrada)."],
["significa","Il progetto è quasi pronto.",["O projeto está quase pronto.","O projeto está atrasado.","O projeto ainda não começou."],"","quasi = quase; pronto = pronto."],
["significa","Sono stanco, vado a casa.",["Estou cansado, vou para casa.","Estou com fome, vou para casa.","Estou cansado, fico em casa."],"","stanco = cansado; fome = fame."],
["significa","Quanti anni hai?",["Quantos anos você tem?","Há quantos anos você mora aqui?","Quando é o seu aniversário?"],"","Em italiano a idade se diz com avere: ho trent'anni."]
],
A2:[
["ouviu","Ieri ho finito la relazione.",["Ieri ho finito la relazione.","Ieri ho finito la riunione.","Ieri hai finito la relazione."],"Ontem terminei o relatório.","relazione (relatório) × riunione (reunião); ho (eu) × hai (você)."],
["ouviu","Siamo arrivati in cantiere alle otto.",["Siamo arrivati in cantiere alle otto.","Sono arrivati in cantiere alle otto.","Siamo arrivati in cantiere alle sette."],"Chegamos ao canteiro às oito.","siamo arrivati (nós) × sono arrivati (eles)."],
["ouviu","Le mando il preventivo domani.",["Le mando il preventivo domani.","Le mando il preventivo oggi.","Gli mando il preventivo domani."],"Mando o orçamento para o senhor (a senhora) amanhã.","Le = para o senhor / a senhora (Lei); gli = para ele."],
["ouviu","Quando ero piccolo, abitavo a Curitiba.",["Quando ero piccolo, abitavo a Curitiba.","Quando ero piccola, abitavo a Curitiba.","Quando ero piccolo, abitavamo a Curitiba."],"Quando eu era pequeno, morava em Curitiba.","piccolo (ele) × piccola (ela); abitavo (eu) × abitavamo (nós)."],
["ouviu","Il geometra ci ha mandato le misure.",["Il geometra ci ha mandato le misure.","Il geometra ci ha mandato le foto.","Il geometra ti ha mandato le misure."],"O técnico nos mandou as medidas.","ci = para nós; ti = para você."],
["ouviu","Potrebbe ripetere, per favore?",["Potrebbe ripetere, per favore?","Può ripetere, per favore?","Potrebbe ripeterlo, per favore?"],"Poderia repetir, por favor?","potrebbe (poderia) é mais gentil que può (pode)."],
["ouviu","Il getto del solaio è previsto per giovedì.",["Il getto del solaio è previsto per giovedì.","Il getto del solaio è previsto per venerdì.","Il getto della platea è previsto per giovedì."],"A concretagem da laje está prevista para quinta.","getto = concretagem; solaio = laje; platea = radier."],
["ouviu","Ne abbiamo comprati tre.",["Ne abbiamo comprati tre.","Ne abbiamo comprate tre.","Ne avete comprati tre."],"Compramos três (deles).","Com ne, o particípio concorda com o que foi comprado: comprati (m.), comprate (f.)."],
["ouviu","Domani andrò dal medico.",["Domani andrò dal medico.","Domani andrei dal medico.","Domani andrà dal medico."],"Amanhã vou ao médico.","andrò (vou, futuro) × andrei (iria) × andrà (ele vai)."],
["ouviu","Vorrei spostare la riunione a lunedì.",["Vorrei spostare la riunione a lunedì.","Vorrei spostare la riunione a mercoledì.","Vorrei anticipare la riunione a lunedì."],"Gostaria de passar a reunião para segunda.","spostare = mudar de data; anticipare = antecipar."],
["ouviu","Ci vogliono due ore per arrivare.",["Ci vogliono due ore per arrivare.","Ci vuole un'ora per arrivare.","Ci vogliono due ore per finire."],"São precisas duas horas para chegar.","ci vuole (singular) × ci vogliono (plural)."],
["ouviu","Mi scusi per il ritardo.",["Mi scusi per il ritardo.","Mi scusi per il disturbo.","Ci scusi per il ritardo."],"Desculpe o atraso.","ritardo = atraso; disturbo = incômodo."],
["pares","Il verbale è pronto e firmato.",["Il verbale è pronto e firmato.","Il verbale e pronto è firmato."],"A ata está pronta e assinada.","è é o verbo (está); e liga duas palavras (e)."],
["pares","Non vale la pena aspettare.",["Non vale la pena aspettare.","Non vale la penna aspettare."],"Não vale a pena esperar.","valere la pena = valer a pena: pena com um n só."],
["pares","Ho lasciato le chiavi a casa.",["Ho lasciato le chiavi a casa.","Ho lasciato le chiavi a cassa."],"Deixei as chaves em casa.","casa tem um s só; cassa (caixa) tem s dobrado."],
["pares","Stanotte non ho preso sonno.",["Stanotte non ho preso sonno.","Stanotte non ho preso sono."],"Esta noite não consegui pegar no sono.","prendere sonno = pegar no sono; sonno com n dobrado."],
["pares","L'anno scorso hanno rifatto il tetto.",["L'anno scorso hanno rifatto il tetto.","L'hanno scorso anno rifatto il tetto."],"No ano passado refizeram o telhado.","anno (ano) e hanno (verbo avere) soam igual; o sentido decide."],
["pares","C'è un capello nel piatto!",["C'è un capello nel piatto!","C'è un cappello nel piatto!"],"Tem um fio de cabelo no prato!","capello (fio de cabelo) tem um p só; cappello = chapéu."],
["pares","L'ufficio è al nono piano.",["L'ufficio è al nono piano.","L'ufficio è al nonno piano."],"O escritório fica no nono andar.","nono (9º) tem um n no meio; nonno = avô."],
["significa","Abbiamo dovuto rimandare il sopralluogo.",["Tivemos que adiar a vistoria.","Tivemos que antecipar a vistoria.","Fizemos a vistoria duas vezes."],"","rimandare = adiar; sopralluogo = vistoria."],
["significa","Se piove, il getto slitta a lunedì.",["Se chover, a concretagem passa para segunda.","Se chover, a concretagem é cancelada.","Choveu, e a concretagem foi na segunda."],"","slittare = escorregar; aqui, ser adiado."],
["significa","Me lo può mandare per email?",["Pode me mandar isso por e-mail?","Posso mandar isso por e-mail?","Ele me mandou isso por e-mail?"],"","me lo = me + lo (para mim + isso)."],
["significa","Non me l'aspettavo.",["Eu não esperava por isso.","Não espere por mim.","Eu não estava esperando ninguém."],"","aspettarsi qualcosa = esperar, prever algo."],
["significa","Ci sentiamo la settimana prossima.",["Nos falamos na semana que vem.","Nós nos vimos na semana passada.","Sentimos muito pela semana."],"","sentirsi = falar-se (por telefone ou mensagem)."],
["significa","Il cliente vorrebbe uno sconto.",["O cliente gostaria de um desconto.","O cliente deu um desconto.","O cliente quer pagar à vista."],"","vorrebbe = gostaria; sconto = desconto."],
["significa","Da piccolo giocavo sempre a calcio.",["Quando pequeno, eu sempre jogava futebol.","Quando pequeno, joguei futebol uma vez.","Hoje sempre jogo futebol."],"","O imperfetto (giocavo) conta hábitos do passado."],
["significa","Le misure non tornano.",["As medidas não batem.","As medidas não voltaram.","As medidas não chegaram."],"","tornare, com contas e medidas, = bater, fechar."],
["significa","Sarebbe meglio aspettare la conferma.",["Seria melhor esperar a confirmação.","Foi melhor esperar a confirmação.","É melhor não esperar a confirmação."],"","sarebbe = seria (condizionale)."],
["significa","Ho mal di testa da stamattina.",["Estou com dor de cabeça desde hoje de manhã.","Tive dor de cabeça ontem de manhã.","Minha cabeça dói toda manhã."],"","da stamattina = desde hoje de manhã."],
["significa","L'impresa ha consegnato i lavori in anticipo.",["A construtora entregou a obra adiantada.","A construtora entregou a obra atrasada.","A construtora começou a obra antes."],"","in anticipo = adiantado; in ritardo = atrasado."]
]};
const ASC_FMT={ouviu:"O que você ouviu?",pares:"Pares que confundem",significa:"O que significa?"};
const ASC=[],ASCI={};
Object.keys(ASC_SRC).forEach(lvl=>ASC_SRC[lvl].forEach((r,i)=>{const id="asc-"+lvl.toLowerCase()+"-"+String(i+1).padStart(2,"0");
 const x={id,nivel:lvl,formato:r[0],audio:r[1],opcoes:r[2],correta:0,pt:r[3]||(r[0]==="significa"?r[2][0]:""),nota:r[4]};ASC.push(x);ASCI[id]=x}));
function ascItem(x){return{id:x.id,k:"mc",cat:"esc",lbl:"Escuta "+x.nivel+" · "+ASC_FMT[x.formato],say:x.audio,hide:1,p:"",o:x.opcoes,a:x.correta,x:x.nota,pt:x.formato==="significa"?"":x.pt}}
