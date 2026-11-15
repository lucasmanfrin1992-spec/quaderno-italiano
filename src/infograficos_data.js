/* ============================ INFOGRÁFICOS DE LIÇÃO: dados (conteúdo original) ============================ */
// Um quadro-resumo por tópico do curso, mostrado no início da parte Vocabulário. Formato (validar com node tools/check_info.js):
//  id, topico (id do tópico do curso), cabecalho {trilho, titulo, subtitulo, nonna: acenando|apontando|pensando|comemorando}
//  blocos (3 a 5), cada um com titulo (ação em português) e tipo:
//   "tabela": linhas [[it, pt], ...] (até 9), dica (uma linha; **negrito** marca as palavras italianas), cena opcional
//   "icones": itens [{icone, it, pt}], formulario opcional [[campo, valor], ...]
//   "regra":  formula, exemplos [[it, pt], ...]
//  cena: {nonna: pose, outro: nome, falas: [{quem: "nonna"|"outro", texto, pt}]} com 2 a 3 falas
const INFOGRAFICOS=[
{id:"info-apresentacoes",topico:"a1-1",
 cabecalho:{trilho:"NONNA DICE • A1 • LIÇÃO 1",titulo:"Ciao • Piacere!",subtitulo:"Cumprimentos e primeiras apresentações no trabalho",nonna:"acenando"},
 blocos:[
  {tipo:"tabela",titulo:"Cumprimente e despeça-se",
   linhas:[["Buongiorno","Bom dia"],["Buonasera","Boa tarde, boa noite (ao chegar)"],["Ciao","Oi, tchau (informal)"],["Salve","Olá (neutro)"],["Arrivederci","Até logo"],["ArrivederLa","Até logo (formal)"],["A domani","Até amanhã"],["Buona giornata!","Tenha um bom dia!"]],
   dica:"**Buonasera** vale a partir do meio da tarde. **Ciao** só com quem você trata por tu.",
   cena:{nonna:"acenando",outro:"Luca",falas:[{quem:"nonna",texto:"Buongiorno! Lei è il nuovo ingegnere?",pt:"Bom dia! O senhor é o novo engenheiro?"},{quem:"outro",texto:"Sì, piacere! Mi chiamo Luca.",pt:"Sim, muito prazer! Eu me chamo Luca."}]}},
  {tipo:"tabela",titulo:"Diga seu nome, origem e profissão",
   linhas:[["Mi chiamo…","Eu me chamo…"],["Sono brasiliano / brasiliana","Sou brasileiro / brasileira"],["Sono di Curitiba","Sou de Curitiba"],["Abito a Bologna","Moro em Bolonha"],["Sono ingegnere","Sou engenheiro"],["Lavoro in uno studio tecnico","Trabalho num escritório técnico"],["Piacere!","Muito prazer!"]],
   dica:"Com **sono**, a profissão vem sem artigo: **sono ingegnere**, **sono architetto**.",
   cena:{nonna:"apontando",outro:"Luca",falas:[{quem:"outro",texto:"Di dove sei?",pt:"De onde você é?"},{quem:"nonna",texto:"Sono di Napoli, e tu?",pt:"Sou de Nápoles, e você?"},{quem:"outro",texto:"Sono di Curitiba, in Brasile.",pt:"Sou de Curitiba, no Brasil."}]}},
  {tipo:"icones",titulo:"Troque os dados de contato",
   itens:[{icone:"pessoa",it:"il nome",pt:"o nome"},{icone:"pessoa",it:"il cognome",pt:"o sobrenome"},{icone:"cracha",it:"il ruolo",pt:"o cargo"},{icone:"empresa",it:"l'azienda",pt:"a empresa"},{icone:"telefone",it:"il numero di telefono",pt:"o número de telefone"},{icone:"email",it:"l'indirizzo email",pt:"o endereço de e-mail"}],
   formulario:[["Nome","Luca"],["Cognome","Rossi"],["Ruolo","ingegnere civile"],["Azienda","Studio Ferri"],["Telefono","347 521 8890"],["Email","luca@esempio.it"]]},
  {tipo:"regra",titulo:"Pergunte o nome com tu ou com Lei",
   formula:"tu: Come ti chiami? · Lei: Come si chiama?",
   exemplos:[["Come ti chiami?","Como você se chama?"],["Come si chiama?","Como o senhor (a senhora) se chama?"],["Di dove sei? · Di dov'è?","De onde você é? · De onde o senhor é?"]]}]},

{id:"info-tu-lei",topico:"a1-3",
 cabecalho:{trilho:"NONNA DICE • A1 • LIÇÃO 3",titulo:"Tu o Lei?",subtitulo:"Tratamento informal e formal no escritório",nonna:"pensando"},
 blocos:[
  {tipo:"tabela",titulo:"Escolha o tratamento certo",
   linhas:[["tu","você (amigos, colegas próximos, crianças)"],["Lei","o senhor, a senhora (clientes, chefes, desconhecidos)"],["voi","vocês (grupo, formal ou informal)"],["dare del tu","tratar por você"],["dare del Lei","tratar por senhor ou senhora"],["Posso darti del tu?","Posso te tratar por você?"],["Diamoci del tu!","Vamos nos tratar por você!"]],
   dica:"Na dúvida, comece com **Lei**; quem é mais velho ou tem cargo mais alto propõe o **tu**.",
   cena:{nonna:"pensando",outro:"Luca",falas:[{quem:"nonna",texto:"Possiamo darci del tu?",pt:"Podemos nos tratar por você?"},{quem:"outro",texto:"Certo, volentieri!",pt:"Claro, com prazer!"},{quem:"nonna",texto:"Allora, come stai?",pt:"Então, como você está?"}]}},
  {tipo:"regra",titulo:"Conjugue com Lei na 3ª pessoa",
   formula:"tu sei · tu hai · tu puoi  →  Lei è · Lei ha · Lei può",
   exemplos:[["Lei è di Roma?","O senhor é de Roma?"],["Ha un minuto?","O senhor tem um minuto?"],["Può ripetere, per favore?","O senhor pode repetir, por favor?"]]},
  {tipo:"tabela",titulo:"Use os pronomes formais",
   linhas:[["Ti chiamo domani.","Te ligo amanhã. (tu)"],["La chiamo domani.","Ligo para o senhor amanhã. (Lei)"],["Ti scrivo una mail.","Te escrevo um e-mail. (tu)"],["Le scrivo una mail.","Escrevo um e-mail ao senhor. (Lei)"],["il tuo ufficio","o seu escritório (tu)"],["il Suo ufficio","o seu escritório (Lei)"]],
   dica:"Em e-mails, **La**, **Le** e **Suo** costumam vir com maiúscula."},
  {tipo:"tabela",titulo:"Cumprimente de acordo com o tratamento",
   linhas:[["Ciao, come stai?","Oi, como vai? (tu)"],["Buongiorno, come sta?","Bom dia, como vai o senhor? (Lei)"],["Bene, grazie, e tu?","Bem, obrigado, e você?"],["Bene, grazie, e Lei?","Bem, obrigado, e o senhor?"],["Ciao! A presto!","Tchau! Até breve! (tu)"],["ArrivederLa!","Até logo! (Lei)"]],
   dica:"**Come stai?** é com tu; **Come sta?** é com Lei.",
   cena:{nonna:"acenando",outro:"Luca",falas:[{quem:"nonna",texto:"Buongiorno, dottore, come sta?",pt:"Bom dia, doutor, como vai?"},{quem:"outro",texto:"Bene, grazie, e Lei?",pt:"Bem, obrigado, e a senhora?"}]}}]},

{id:"info-essere-avere",topico:"a1-2",
 cabecalho:{trilho:"NONNA DICE • A1 • LIÇÃO 2",titulo:"Essere • Avere",subtitulo:"Os dois verbos que sustentam o italiano",nonna:"apontando"},
 blocos:[
  {tipo:"regra",titulo:"Conjugue essere (ser, estar)",
   formula:"io sono · tu sei · lui, lei, Lei è · noi siamo · voi siete · loro sono",
   exemplos:[["Sono ingegnere.","Sou engenheiro."],["Il cantiere è chiuso.","A obra está fechada."],["Siamo in riunione.","Estamos em reunião."]]},
  {tipo:"regra",titulo:"Conjugue avere (ter)",
   formula:"io ho · tu hai · lui, lei, Lei ha · noi abbiamo · voi avete · loro hanno",
   exemplos:[["Ho una riunione alle tre.","Tenho uma reunião às três."],["Hai un minuto?","Você tem um minuto?"],["L'ufficio ha due sale.","O escritório tem duas salas."]]},
  {tipo:"tabela",titulo:"Use avere onde o português usa estar",
   linhas:[["avere … anni","ter … anos"],["avere fame","estar com fome"],["avere sete","estar com sede"],["avere freddo · avere caldo","estar com frio · estar com calor"],["avere fretta","estar com pressa"],["avere ragione","ter razão"],["avere bisogno di","precisar de"],["avere paura","ter medo"]],
   dica:"Idade, fome e pressa em italiano se **têm**: **ho trent'anni**, **ho fame**, **ho fretta**.",
   cena:{nonna:"pensando",outro:"Luca",falas:[{quem:"outro",texto:"Andiamo a pranzo? Ho fame!",pt:"Vamos almoçar? Estou com fome!"},{quem:"nonna",texto:"Sì, ma ho fretta: alle due ho una riunione.",pt:"Sim, mas estou com pressa: às duas tenho uma reunião."}]}},
  {tipo:"tabela",titulo:"Não confunda as formas parecidas",
   linhas:[["è","é, está (essere)"],["e","e (conjunção)"],["ha","tem (avere)"],["a","a, para, em (preposição)"],["hanno","têm (avere)"],["anno","ano"]],
   dica:"O **h** não se pronuncia: **ha** e **a** soam iguais, só a escrita muda."}]},

{id:"info-reuniao",topico:"a1-5",
 cabecalho:{trilho:"NONNA DICE • A1 • LIÇÃO 5",titulo:"Fissiamo una riunione",subtitulo:"Marcar, aceitar, recusar e remarcar reuniões",nonna:"apontando"},
 blocos:[
  {tipo:"tabela",titulo:"Proponha um dia e um horário",
   linhas:[["Possiamo vederci lunedì?","Podemos nos ver na segunda?"],["Le va bene giovedì alle dieci?","Quinta às dez está bom para o senhor?"],["Ti va bene domani mattina?","Amanhã de manhã está bom para você?"],["Sei libero nel pomeriggio?","Você está livre à tarde?"],["Quando è libero, ingegnere?","Quando o senhor está livre, engenheiro?"],["Facciamo alle tre?","Que tal às três?"]],
   dica:"**Le va bene?** é com Lei; **Ti va bene?** é com tu.",
   cena:{nonna:"apontando",outro:"Luca",falas:[{quem:"nonna",texto:"Le va bene giovedì alle dieci?",pt:"Quinta às dez está bom para o senhor?"},{quem:"outro",texto:"Perfetto, a giovedì!",pt:"Perfeito, até quinta!"}]}},
  {tipo:"tabela",titulo:"Aceite ou recuse com educação",
   linhas:[["Va benissimo.","Está ótimo."],["Perfetto, a giovedì!","Perfeito, até quinta!"],["Purtroppo non posso.","Infelizmente não posso."],["Ho già un impegno.","Já tenho um compromisso."],["Preferirei il pomeriggio.","Eu preferiria à tarde."],["Facciamo un altro giorno?","Vamos marcar outro dia?"]],
   dica:"**Purtroppo** suaviza a recusa; logo depois, proponha outra data.",
   cena:{nonna:"pensando",outro:"Luca",falas:[{quem:"outro",texto:"Venerdì alle nove?",pt:"Sexta às nove?"},{quem:"nonna",texto:"Purtroppo ho già un impegno. Facciamo alle undici?",pt:"Infelizmente já tenho um compromisso. Que tal às onze?"}]}},
  {tipo:"icones",titulo:"Diga quando: dias e partes do dia",
   itens:[{icone:"calendario",it:"lunedì",pt:"segunda-feira"},{icone:"calendario",it:"martedì",pt:"terça-feira"},{icone:"calendario",it:"mercoledì",pt:"quarta-feira"},{icone:"calendario",it:"giovedì",pt:"quinta-feira"},{icone:"calendario",it:"venerdì",pt:"sexta-feira"},{icone:"relogio",it:"la mattina",pt:"de manhã"},{icone:"relogio",it:"il pomeriggio",pt:"à tarde"}],
   formulario:[["Riunione","progetto della scuola"],["Giorno","giovedì 12"],["Ora","10:00"],["Sala","sala grande, secondo piano"],["Partecipanti","Giulia, Marco, Lucas"]]},
  {tipo:"tabela",titulo:"Remarque ou cancele",
   linhas:[["Dobbiamo spostare la riunione.","Precisamos mudar a reunião de data."],["La riunione è rimandata a lunedì.","A reunião foi adiada para segunda."],["La riunione è annullata.","A reunião foi cancelada."],["Scusi il poco preavviso.","Desculpe o aviso em cima da hora."],["Mi conferma l'orario?","O senhor me confirma o horário?"]],
   dica:"**Spostare** é mudar de data; **annullare** é cancelar de vez."}]},

{id:"info-email-formal",topico:"a2-10",
 cabecalho:{trilho:"NONNA DICE • A2 • LIÇÃO 10",titulo:"Gentile… Cordiali saluti",subtitulo:"A estrutura de um e-mail formal de trabalho",nonna:"acenando"},
 blocos:[
  {tipo:"tabela",titulo:"Abra o e-mail",
   linhas:[["Gentile signora Rossi,","Prezada senhora Rossi,"],["Gentile ingegner Bianchi,","Prezado engenheiro Bianchi,"],["Gentili signori,","Prezados senhores,"],["Spettabile ditta,","Prezada empresa, (muito formal)"],["Buongiorno,","Bom dia, (neutro)"]],
   dica:"Depois da saudação vem vírgula, e o texto começa com minúscula na linha seguinte."},
  {tipo:"tabela",titulo:"Diga por que está escrevendo",
   linhas:[["Le scrivo per…","Escrevo ao senhor para…"],["Le scrivo in merito a…","Escrevo a respeito de…"],["Come d'accordo,","Conforme combinado,"],["In allegato trova…","Em anexo o senhor encontra…"],["Le chiedo cortesemente di…","Peço gentilmente que o senhor…"],["Vorrei sapere se…","Gostaria de saber se…"]],
   dica:"Com Lei, os pronomes ficam na 3ª pessoa: **Le scrivo**, **La ringrazio**."},
  {tipo:"tabela",titulo:"Feche com cortesia",
   linhas:[["Resto a disposizione per chiarimenti.","Fico à disposição para esclarecimentos."],["In attesa di un Suo riscontro,","No aguardo de seu retorno,"],["La ringrazio per l'attenzione.","Agradeço a atenção."],["Cordiali saluti","Atenciosamente"],["Distinti saluti","Atenciosamente (mais formal)"],["Un saluto","Um abraço (menos formal)"]],
   dica:"**Cordiali saluti** serve para quase tudo; **Distinti saluti**, para o muito formal.",
   cena:{nonna:"comemorando",outro:"Luca",falas:[{quem:"outro",texto:"Come chiudo la mail al cliente?",pt:"Como eu fecho o e-mail para o cliente?"},{quem:"nonna",texto:"Cordiali saluti, e poi il tuo nome!",pt:"Cordiali saluti, e depois o seu nome!"}]}},
  {tipo:"icones",titulo:"Preencha os campos da mensagem",
   itens:[{icone:"pessoa",it:"il destinatario",pt:"o destinatário"},{icone:"email",it:"l'oggetto",pt:"o assunto"},{icone:"documento",it:"l'allegato",pt:"o anexo"},{icone:"pessoa",it:"in copia",pt:"com cópia (cc)"},{icone:"cracha",it:"la firma",pt:"a assinatura"}],
   formulario:[["A","s.rossi@esempio.it"],["Cc","ufficio.tecnico@esempio.it"],["Oggetto","Richiesta di preventivo, cantiere di via Mazzini"],["Allegato","computo_metrico.pdf"],["Firma","Ing. Lucas Moura"]]}]},

{id:"info-numeros-horarios",topico:"a1-4",
 cabecalho:{trilho:"NONNA DICE • A1 • LIÇÃO 4",titulo:"Che ore sono?",subtitulo:"Números, horários e prazos",nonna:"comemorando"},
 blocos:[
  {tipo:"tabela",titulo:"Conte sem tropeçar",
   linhas:[["uno, due, tre, quattro, cinque","1, 2, 3, 4, 5"],["sei, sette, otto, nove, dieci","6, 7, 8, 9, 10"],["undici, dodici, tredici","11, 12, 13"],["quattordici, quindici, sedici","14, 15, 16"],["diciassette, diciotto, diciannove","17, 18, 19"],["venti, trenta, quaranta, cinquanta","20, 30, 40, 50"],["ventuno, ventotto","21, 28"],["cento, mille","100, 1.000"]],
   dica:"Com **uno** e **otto**, a dezena perde a vogal: **ventuno**, **ventotto**."},
  {tipo:"tabela",titulo:"Pergunte e diga as horas",
   linhas:[["Che ore sono?","Que horas são?"],["Sono le tre.","São três horas."],["È l'una.","É uma hora."],["È mezzogiorno.","É meio-dia."],["Sono le otto e mezza.","São oito e meia."],["Sono le nove e un quarto.","São nove e quinze."],["Sono le dieci meno un quarto.","São quinze para as dez."]],
   dica:"Use **sono le** + número; só **l'una**, **mezzogiorno** e **mezzanotte** pedem **è**.",
   cena:{nonna:"apontando",outro:"Luca",falas:[{quem:"outro",texto:"Scusi, che ore sono?",pt:"Com licença, que horas são?"},{quem:"nonna",texto:"Sono le otto e mezza: la riunione comincia tra mezz'ora!",pt:"São oito e meia: a reunião começa daqui a meia hora!"}]}},
  {tipo:"regra",titulo:"Marque horários e prazos",
   formula:"alle + hora · dalle … alle … · entro + prazo",
   exemplos:[["La riunione è alle quindici e trenta.","A reunião é às 15h30."],["L'ufficio è aperto dalle nove alle diciotto.","O escritório abre das 9h às 18h."],["Mandi il rapporto entro venerdì.","Mande o relatório até sexta."]]},
  {tipo:"tabela",titulo:"Leia os números da obra",
   linhas:[["tre virgola cinque metri","3,5 metros"],["duemilacinquecento euro","2.500 euros"],["il quindici marzo","15 de março"],["il primo aprile","1º de abril"],["al terzo piano","no terceiro andar"],["il dieci per cento","10%"]],
   dica:"Nas datas, o número é cardinal (**il quindici marzo**); só o dia 1 é ordinal: **il primo**."}]}
];
const INFO_TOP=Object.fromEntries(INFOGRAFICOS.map(x=>[x.topico,x]));
