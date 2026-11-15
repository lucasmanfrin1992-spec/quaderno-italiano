/* ============================ FALSOS AMIGOS: dados (conteúdo original) ============================ */
// [palavra italiana, o que parece em português, o que é, exemplo em italiano, tradução do exemplo, palavra italiana para o sentido que o brasileiro esperava]
// 4 blocos de 10. Validar com node tools/check_v3.js
const FALSI_SRC=[
{id:"fa-1",titulo:"Na mesa e no dia a dia",itens:[
["burro","burro (asno, pouco inteligente)","manteiga","Pane, burro e marmellata.","Pão, manteiga e geleia.","asino (o animal); stupido (pouco inteligente)"],
["salire","sair","subir","Salgo al terzo piano a piedi.","Subo ao terceiro andar a pé.","uscire"],
["camera","câmera","quarto (de dormir, de hotel)","Ho prenotato una camera doppia.","Reservei um quarto de casal.","macchina fotografica; telecamera"],
["guardare","guardar","olhar, assistir","Guardo il cantiere dalla finestra.","Olho o canteiro pela janela.","mettere via; conservare"],
["prendere","prender","pegar, tomar","Prendo un caffè e torno subito.","Tomo um café e já volto.","arrestare (a polícia); legare (amarrar)"],
["pronto","só «pronto»","alô (ao atender o telefone); também pronto","Pronto, chi parla?","Alô, quem fala?","pronto também significa pronto: la cena è pronta"],
["subito","súbito, repentino","logo, imediatamente","Arrivo subito!","Chego já!","improvviso"],
["caldo","caldo (sopa)","quente; calor","Oggi fa molto caldo.","Hoje está muito quente.","brodo"],
["birra","birra (teimosia, manha)","cerveja","Una birra media, per favore.","Uma cerveja média, por favor.","capriccio; testardaggine"],
["squisito","esquisito","delicioso","La torta della nonna è squisita.","A torta da vovó é deliciosa.","strano"]]},
{id:"fa-2",titulo:"Pessoas, lugares e coisas",itens:[
["firma","firma (empresa)","assinatura","Serve la sua firma qui in basso.","É preciso a sua assinatura aqui embaixo.","azienda; ditta"],
["esperto","esperto (espertalhão)","experiente, especialista","È un geometra molto esperto.","É um técnico muito experiente.","furbo"],
["morbido","mórbido","macio","Questo cuscino è morbido.","Este travesseiro é macio.","morboso"],
["cane","cana","cachorro","Il cane del vicino abbaia tutta la notte.","O cachorro do vizinho late a noite toda.","canna (cana)"],
["palestra","palestra","academia de ginástica","La sera vado in palestra.","À noite vou à academia.","conferenza"],
["aceto","aceito","vinagre","Olio, aceto e sale.","Azeite, vinagre e sal.","accettato"],
["tasca","tasca (taberna)","bolso","Ho le chiavi in tasca.","Estou com as chaves no bolso.","osteria"],
["salsa","salsa (erva)","molho","Pasta con salsa di pomodoro.","Massa com molho de tomate.","prezzemolo"],
["carta","carta (de correio)","papel; também cartão e mapa","Mi dai un foglio di carta?","Você me dá uma folha de papel?","lettera"],
["negozio","negócio","loja","Il negozio apre alle nove.","A loja abre às nove.","affare"]]},
{id:"fa-3",titulo:"Verbos e qualidades",itens:[
["pulire","pular","limpar","Puliamo il cantiere il venerdì.","Limpamos o canteiro às sextas.","saltare"],
["intendere","entender","querer dizer; ter a intenção de","Che cosa intendi con «subito»?","O que você quer dizer com «subito»?","capire"],
["tirare","tirar","puxar; jogar","Per aprire, tira la porta.","Para abrir, puxe a porta.","togliere (tirar, remover)"],
["assistere","assistir (TV)","estar presente; dar assistência","Ho assistito alla riunione.","Estive presente na reunião.","guardare (la TV)"],
["pretendere","pretender","exigir","Il cliente pretende uno sconto.","O cliente exige um desconto.","avere intenzione di"],
["bravo","bravo (zangado)","bom, competente","È un bravo capocantiere.","É um bom encarregado.","arrabbiato"],
["costume","costume (hábito)","maiô, sunga; fantasia","Ho dimenticato il costume da bagno.","Esqueci o maiô.","abitudine"],
["grosso","grosso (grosseiro)","grande","Abbiamo un grosso problema.","Temos um problema grande.","maleducato"],
["presto","presto, rápido","cedo; logo","Domani mi alzo presto.","Amanhã acordo cedo.","veloce; in fretta"],
["cattivo","cativo (prisioneiro)","mau, ruim","C'è un cattivo odore.","Há um cheiro ruim.","prigioniero"]]},
{id:"fa-4",titulo:"No trabalho e na obra",itens:[
["cantina","cantina (refeitório)","adega, porão","Il vino è in cantina.","O vinho está na adega.","mensa"],
["licenziare","licenciar","demitir","L'azienda ha licenziato due operai.","A empresa demitiu dois operários.","autorizzare; concedere un permesso"],
["rata","rata (rato)","parcela, prestação","Pago la rata ogni mese.","Pago a parcela todo mês.","ratto; topo"],
["mutuo","mútuo","financiamento imobiliário","Ho chiesto un mutuo in banca.","Pedi um financiamento ao banco.","reciproco"],
["preventivo","preventivo (que previne)","orçamento","Ci mandi il preventivo entro venerdì.","Mande-nos o orçamento até sexta.","preventivo existe também no sentido de prevenção"],
["getto","jeito","concretagem; jato","Il getto del solaio è domani.","A concretagem da laje é amanhã.","modo; maniera"],
["piano","piano (instrumento)","andar; plano; devagar","L'ufficio è al secondo piano.","O escritório fica no segundo andar.","pianoforte"],
["tetto","teto","telhado","Il tetto perde acqua.","O telhado está vazando.","soffitto (teto interno)"],
["solaio","solário","laje entre pavimentos","Il solaio del primo piano è pronto.","A laje do primeiro pavimento está pronta.","solarium"],
["cartella","carteira","pasta de documentos","I disegni sono nella cartella blu.","Os desenhos estão na pasta azul.","portafoglio"]]}
];
const FALSI=FALSI_SRC.map(b=>({id:b.id,titulo:b.titulo,itens:b.itens.map((r,i)=>({id:b.id+"-"+(i+1),it:r[0],parece:r[1],e:r[2],ex:r[3],expt:r[4],certo:r[5]}))}));
const FALSII=Object.fromEntries(FALSI.map(b=>[b.id,b]));
