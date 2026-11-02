/* ============================ VOCABULÁRIO — DIÁLOGO DE ABERTURA (como no livro) ============================ */
// DLG[tópico] = {t: título, L: [[quem fala ("" = narração), frase it, frase pt]], q: [[afirmação it, verdadeira?, explicação pt]]}
// Na frase italiana, {forma} ou {forma|palavra do vocabulário} destaca a palavra e liga ao cartão dela.
const DLG={};
DLG["a1-1"]={t:"Il primo giorno di corso",L:[
["Signora Rossi","{Buongiorno|buongiorno} a tutti! Io sono la signora Rossi, l'insegnante.","Bom dia a todos! Eu sou a senhora Rossi, a professora."],
["Lucas","Buongiorno! {Mi chiamo|mi chiamo} Lucas.","Bom dia! Eu me chamo Lucas."],
["Signora Rossi","{Piacere|piacere}, Lucas. {Di dove sei?|di dove sei?}","Prazer, Lucas. De onde você é?"],
["Lucas","{Sono di Curitiba|sono di Curitiba}, in Brasile. Sono {brasiliano|brasiliano}.","Sou de Curitiba, no Brasil. Sou brasileiro."],
["Giulia","{Ciao|ciao} Lucas! Io sono Giulia, sono {italiana|italiano}, di Bologna. {Come stai?|come stai?}","Oi, Lucas! Eu sou a Giulia, sou italiana, de Bolonha. Como você está?"],
["Lucas","{Sto bene|sto bene}, {grazie|grazie}! E tu?","Estou bem, obrigado! E você?"],
["Giulia","Bene! Lui è Hans, è {tedesco|tedesco}, e lei è Claire, è {francese|francese}.","Bem! Ele é o Hans, é alemão, e ela é a Claire, é francesa."],
["Claire","{Scusa|scusa}, sono in ritardo! Ciao a tutti!","Desculpa, estou atrasada! Oi, pessoal!"],
["Signora Rossi","Bene, oggi siamo in {dieci|dieci}: ci sono anche {tre|tre} studenti {spagnoli|spagnolo} e {due|due} {inglesi|inglese}.","Bem, hoje somos dez: há também três alunos espanhóis e dois ingleses."],
["","Alle sette la lezione finisce.","Às sete a aula termina."],
["Signora Rossi","{Buonasera|buonasera} e {arrivederci|arrivederci}!","Boa noite e até logo!"],
["Lucas","Grazie, signora! — «{Prego|prego}!»","Obrigado, senhora! — «De nada!»"],
["Giulia","Ciao Lucas, {a presto|a presto}!","Tchau, Lucas, até breve!"]],
q:[["Lucas è di Bologna.",false,"Lucas è di Curitiba, in Brasile. Di Bologna è Giulia."],["Claire è francese.",true,"Giulia dice: «lei è Claire, è francese»."],["Hans è inglese.",false,"Hans è tedesco. Gli inglesi sono due altri studenti."],["Oggi in classe sono in dieci.",true,"«Oggi siamo in dieci»."]]};

DLG["a1-2"]={t:"Che cosa c'è nello zaino?",L:[
["Giulia","Lucas, hai {una penna|la penna}?","Lucas, você tem uma caneta?"],
["Lucas","Sì, ecco. Nello {zaino|lo zaino} ho anche {un quaderno|il quaderno} e {il libro|il libro} di italiano.","Sim, aqui está. Na mochila também tenho um caderno e o livro de italiano."],
["Giulia","E {il computer|il computer}?","E o computador?"],
["Lucas","È sulla scrivania. Ma dov'è {la chiave|la chiave} dell'ufficio?","Está na escrivaninha. Mas onde está a chave do escritório?"],
["Giulia","Nella {borsa|la borsa}, forse?","Na bolsa, talvez?"],
["Lucas","Ah, sì! Grazie.","Ah, sim! Obrigado."],
["Giulia","Chi è {il ragazzo|il ragazzo} con {il telefono|il telefono}?","Quem é o rapaz com o telefone?"],
["Lucas","È Pedro, {un amico|l'amico} brasiliano. È {studente|lo studente} di ingegneria qui in {città|la città}.","É o Pedro, um amigo brasileiro. É estudante de engenharia aqui na cidade."],
["Giulia","E {la ragazza|la ragazza}?","E a moça?"],
["Lucas","È Sara, {un'amica|l'amica} di Pedro. Fa {il medico|il medico}.","É a Sara, uma amiga do Pedro. Ela é médica."],
["Giulia","Tu sei {ingegnere|l'ingegnere}, vero? E {quanti anni hai?|quanti anni hai?}","Você é engenheiro, não é? E quantos anos você tem?"],
["Lucas","{Ho|avere} trentaquattro {anni|l'anno}. E tu?","Tenho trinta e quatro anos. E você?"],
["Giulia","{Ho trent'anni|ho trent'anni}. Mio fratello fa {l'impiegato|l'impiegato} in banca e mia madre fa {l'insegnante|l'insegnante}.","Tenho trinta anos. Meu irmão é funcionário de banco e minha mãe é professora."]],
q:[["Il libro di italiano è nello zaino.",true,"«Nello zaino ho anche un quaderno e il libro di italiano»."],["La chiave è sulla scrivania.",false,"Sulla scrivania c'è il computer. La chiave è nella borsa."],["Pedro fa il medico.",false,"Pedro è studente. Il medico è Sara."],["Giulia ha trent'anni.",true,"«Ho trent'anni»."]]};

DLG["a1-3"]={t:"Com'è il nuovo collega?",L:[
["Marco","Giulia, com'è il nuovo collega brasiliano?","Giulia, como é o novo colega brasileiro?"],
["Giulia","Lucas? È {alto|alto}, {magro|magro}, ha {i capelli|i capelli} {castani|castano} e {gli occhi|gli occhi} {verdi|verde}.","O Lucas? É alto, magro, tem cabelo castanho e olhos verdes."],
["Marco","È {simpatico|simpatico}?","Ele é simpático?"],
["Giulia","Sì, molto! È {gentile|gentile} e {divertente|divertente}. Solo all'inizio è un po' {timido|timido}.","Sim, muito! É gentil e divertido. Só no começo é um pouco tímido."],
["Marco","E la nuova direttrice?","E a nova diretora?"],
["Giulia","È {giovane|giovane}, {bassa|basso} e {bionda|biondo}. È molto {intelligente|intelligente}, ma {seria|serio}.","É jovem, baixa e loira. É muito inteligente, mas séria."],
["Marco","Non è {antipatica|antipatico}, spero!","Não é antipática, espero!"],
["Giulia","No, no! Oggi ha una giacca {rossa|rosso} e una borsa {gialla|giallo}, molto {bella|bello}.","Não, não! Hoje ela está com um casaco vermelho e uma bolsa amarela, muito bonita."],
["Marco","Il mio capo invece è {anziano|anziano}: sempre camicia {bianca|bianco}, cravatta {blu|blu} e scarpe {nere|nero}.","Já o meu chefe é idoso: sempre camisa branca, gravata azul e sapatos pretos."],
["Giulia","Ma è sempre {allegro|allegro}!","Mas está sempre alegre!"]],
q:[["Lucas ha gli occhi verdi.",true,"«Ha i capelli castani e gli occhi verdi»."],["La direttrice è alta.",false,"È bassa e bionda."],["Il capo di Marco è giovane.",false,"È anziano, ma sempre allegro."],["All'inizio Lucas è un po' timido.",true,"«Solo all'inizio è un po' timido»."]]};

DLG["a1-4"]={t:"La giornata di Lucas",L:[
["Lucas","Giulia, {che ore sono?|che ore sono?}","Giulia, que horas são?"],
["Giulia","{Sono le otto|sono le otto} {e mezza|e mezza}. Perché?","São oito e meia. Por quê?"],
["Lucas","{Comincio|cominciare} a {lavorare|lavorare} alle nove: {apro|aprire} io l'ufficio!","Começo a trabalhar às nove: sou eu que abro o escritório!"],
["Giulia","Dove {abiti|abitare}?","Onde você mora?"],
["Lucas","Vicino alla stazione. {La mattina|la mattina} {prendo|prendere} l'autobus e {leggo|leggere} le email.","Perto da estação. De manhã pego o ônibus e leio os e-mails."],
["Giulia","E {il pomeriggio|il pomeriggio}?","E à tarde?"],
["Lucas","{Di solito|di solito} {scrivo|scrivere} relazioni e {parlo|parlare} con i clienti.","Normalmente escrevo relatórios e falo com os clientes."],
["Giulia","{Capisci|capire} bene l'italiano?","Você entende bem o italiano?"],
["Lucas","Abbastanza! {La sera|la sera} {studio|studiare} ancora un'ora.","Razoavelmente! À noite ainda estudo uma hora."],
["Giulia","A che ora {finisci|finire}?","A que horas você termina?"],
["Lucas","Alle sei {e un quarto|e un quarto}. Poi {mangio|mangiare} qualcosa e {dormo|dormire} presto.","Às seis e quinze. Depois como alguma coisa e durmo cedo."],
["Giulia","Io invece {preferisco|preferire} lavorare la sera. E il venerdì {parto|partire} per il mare!","Eu, ao contrário, prefiro trabalhar à noite. E na sexta parto para a praia!"]],
q:[["Lucas comincia a lavorare alle nove.",true,"«Comincio a lavorare alle nove»."],["Lucas studia italiano la mattina.",false,"La mattina legge le email; studia la sera."],["Lucas finisce alle sei e un quarto.",true,"«Alle sei e un quarto»."],["Giulia preferisce lavorare la mattina.",false,"Giulia preferisce lavorare la sera."]]};

DLG["a1-5"]={t:"Vieni con noi?",L:[
["Marco","Lucas, che cosa fai nel {tempo libero|il tempo libero}?","Lucas, o que você faz no tempo livre?"],
["Lucas","Vado in {palestra|la palestra} il {lunedì|lunedì} e il {mercoledì|mercoledì}. E tu?","Vou à academia às segundas e quartas. E você?"],
["Marco","Io {gioco a calcio|giocare a calcio} il {giovedì|giovedì}. Nel {fine settimana|il fine settimana} {esco con gli amici|uscire con gli amici}.","Eu jogo futebol às quintas. No fim de semana saio com os amigos."],
["Lucas","Io {qualche volta|qualche volta} {vado al cinema|andare al cinema}, ma più {spesso|spesso} {leggo un libro|leggere un libro} o {ascolto musica|ascoltare musica}.","Eu às vezes vou ao cinema, mas com mais frequência leio um livro ou ouço música."],
["Marco","{Sabato|sabato} c'è {la partita|la partita} del Bologna. {Vieni con noi?|vieni con noi?}","Sábado tem o jogo do Bologna. Você vem com a gente?"],
["Lucas","{Volentieri!|volentieri!} A che ora?","Com prazer! A que horas?"],
["Marco","Alle tre. E {domenica|domenica} facciamo una cena a casa mia.","Às três. E no domingo fazemos um jantar na minha casa."],
["Lucas","Domenica? {Purtroppo non posso|purtroppo non posso}: la domenica studio italiano.","Domingo? Infelizmente não posso: aos domingos estudo italiano."],
["Marco","Peccato! Allora {venerdì|venerdì} {facciamo sport|fare sport} insieme? Corriamo al parco la mattina.","Que pena! Então na sexta fazemos esporte juntos? Corremos no parque de manhã."],
["Lucas","La mattina presto? No, grazie: non corro {mai|mai} prima del lavoro!","De manhã cedo? Não, obrigado: nunca corro antes do trabalho!"]],
q:[["Lucas va in palestra il lunedì e il mercoledì.",true,"«Vado in palestra il lunedì e il mercoledì»."],["Marco gioca a calcio il sabato.",false,"Gioca il giovedì. Sabato c'è la partita del Bologna."],["Lucas va alla partita.",true,"«Volentieri!»"],["Domenica Lucas va alla cena di Marco.",false,"Purtroppo non può: la domenica studia italiano."]]};

DLG["a1-6"]={t:"Cerco casa",L:[
["","Lucas cerca un appartamento. La signora Bianchi, dell'agenzia, gli fa vedere una casa.","Lucas procura um apartamento. A senhora Bianchi, da imobiliária, mostra uma casa para ele."],
["Sig.ra Bianchi","Buongiorno! Ecco {l'appartamento|l'appartamento}. È al {terzo|terzo} {piano|il piano}.","Bom dia! Aqui está o apartamento. Fica no terceiro andar."],
["Lucas","C'è l'ascensore?","Tem elevador?"],
["Sig.ra Bianchi","No, mi dispiace. Questa è {la cucina|la cucina}, con {il tavolo|il tavolo} e quattro {sedie|la sedia}.","Não, sinto muito. Esta é a cozinha, com a mesa e quatro cadeiras."],
["Lucas","E qui c'è {il soggiorno|il soggiorno}?","E aqui é a sala?"],
["Sig.ra Bianchi","Sì, con {il divano|il divano} e {un balcone|il balcone} molto bello.","Sim, com o sofá e uma sacada muito bonita."],
["Lucas","Quante camere ci sono?","Quantos quartos há?"],
["Sig.ra Bianchi","Una {camera da letto|la camera da letto}, con {il letto|il letto} matrimoniale e {un armadio|l'armadio} grande.","Um quarto, com a cama de casal e um armário grande."],
["Lucas","E {il bagno|il bagno}?","E o banheiro?"],
["Sig.ra Bianchi","È piccolo, ma ha {la finestra|la finestra}.","É pequeno, mas tem janela."],
["Lucas","Qual è {l'indirizzo|l'indirizzo} esatto?","Qual é o endereço exato?"],
["Sig.ra Bianchi","{Via|la via} Mazzini {trenta|trenta}. L'affitto è di ottocento euro, più {cinquanta|cinquanta} di spese.","Rua Mazzini, trinta. O aluguel é oitocentos euros, mais cinquenta de condomínio."],
["Lucas","In Brasile ho {una casa|la casa} con giardino… Qui è tutto più caro!","No Brasil tenho uma casa com jardim… Aqui tudo é mais caro!"],
["Sig.ra Bianchi","Ma è in centro: la piazza è a {cento|cento} metri!","Mas fica no centro: a praça está a cem metros!"]],
q:[["L'appartamento è al terzo piano.",true,"«È al terzo piano»."],["C'è l'ascensore.",false,"«No, mi dispiace»: non c'è."],["Il bagno ha la finestra.",true,"«È piccolo, ma ha la finestra»."],["Ci sono due camere da letto.",false,"C'è una camera da letto."]]};

DLG["a1-7"]={t:"Scusi, dov'è la stazione?",L:[
["Lucas","{Scusi|scusi}, {dov'è|dov'è…?} {la stazione|la stazione}?","Com licença, onde fica a estação?"],
["Signora","La stazione? È un po' {lontano|lontano}. Ma c'è {l'autobus|l'autobus}: {la fermata|la fermata} è in {piazza|la piazza} Maggiore.","A estação? É um pouco longe. Mas tem o ônibus: o ponto fica na Praça Maggiore."],
["Lucas","Posso andare {a piedi|a piedi}?","Posso ir a pé?"],
["Signora","Sì, sono venti minuti. Vada {sempre dritto|sempre dritto}, poi {giri|girare} {a destra|a destra} dopo {la banca|la banca}.","Sim, são vinte minutos. Siga sempre reto, depois vire à direita depois do banco."],
["Lucas","E poi?","E depois?"],
["Signora","{Attraversi|attraversare} la strada e vada {a sinistra|a sinistra}. La stazione è lì.","Atravesse a rua e vá à esquerda. A estação fica ali."],
["Lucas","C'è {una farmacia|la farmacia} qui {vicino|vicino}?","Tem uma farmácia aqui perto?"],
["Signora","Sì, accanto al {museo|il museo}, in {centro|il centro}.","Sim, ao lado do museu, no centro."],
["Lucas","Grazie! Domani vado a Milano in {treno|il treno}. Lì prendo {la metropolitana|la metropolitana} per andare in {ufficio|l'ufficio}.","Obrigado! Amanhã vou a Milão de trem. Lá pego o metrô para ir ao escritório."],
["Signora","Bravo! A Milano {in macchina|in macchina} è un disastro!","Muito bem! Em Milão, de carro, é um desastre!"]],
q:[["La stazione è vicino.",false,"È un po' lontano: venti minuti a piedi."],["La fermata dell'autobus è in piazza Maggiore.",true,"«La fermata è in piazza Maggiore»."],["Dopo la banca Lucas gira a sinistra.",false,"Dopo la banca gira a destra; a sinistra va dopo aver attraversato."],["La farmacia è accanto al museo.",true,"«Accanto al museo, in centro»."]]};

DLG["a1-8"]={t:"Al bar e al mercato",L:[
["","Sabato mattina, al bar.","Sábado de manhã, no bar."],
["Barista","Buongiorno! Cosa prendete?","Bom dia! O que vocês vão querer?"],
["Lucas","{Vorrei|vorrei} {un caffè|il caffè} e {un cornetto|il cornetto}, per favore.","Eu queria um café e um croissant, por favor."],
["Giulia","Per me {un succo|il succo} d'arancia e {un'acqua|l'acqua} naturale.","Para mim um suco de laranja e uma água sem gás."],
["Lucas","Scusi, {il conto|il conto}?","Com licença, a conta?"],
["Barista","Sono sei {euro|l'euro}.","São seis euros."],
["","Poi vanno al mercato.","Depois vão à feira."],
["Giulia","Buongiorno! Vorrei {un chilo di|un chilo di} {mele|la mela} e mezzo chilo di {pomodori|il pomodoro}.","Bom dia! Eu queria um quilo de maçãs e meio quilo de tomates."],
["Lucas","{Quanto costano|quanto costano?} i pomodori?","Quanto custam os tomates?"],
["Fruttivendolo","Tre euro al chilo. Oggi {il prezzo|il prezzo} è buono!","Três euros o quilo. Hoje o preço está bom!"],
["Lucas","E {quanto costa|quanto costa?} {un etto di|un etto di} {formaggio|il formaggio}?","E quanto custa cem gramas de queijo?"],
["Fruttivendolo","Il formaggio è al banco qui accanto.","O queijo é na banca aqui do lado."],
["Giulia","Per stasera prendiamo anche {il pane|il pane}, {un pacco di|un pacco di} {pasta|la pasta}, {il latte|il latte} e {una bottiglia di|una bottiglia di} {vino|il vino}.","Para hoje à noite levamos também o pão, um pacote de macarrão, o leite e uma garrafa de vinho."],
["Lucas","E adesso {un panino|il panino} per me: ho fame!","E agora um sanduíche para mim: estou com fome!"]],
q:[["Lucas prende un caffè e un cornetto.",true,"«Vorrei un caffè e un cornetto»."],["Giulia prende un'acqua frizzante.",false,"Prende un'acqua naturale."],["I pomodori costano tre euro al chilo.",true,"«Tre euro al chilo»."],["Il formaggio si compra dal fruttivendolo.",false,"Il formaggio è al banco accanto."]]};

DLG["a1-9"]={t:"La famiglia di Giulia",L:[
["Lucas","Chi sono le persone in questa foto?","Quem são as pessoas nesta foto?"],
["Giulia","È {la mia famiglia|la famiglia}! Questi sono {i miei genitori|i genitori}: {mio padre|il padre} Paolo e {mia madre|la madre} Anna.","É a minha família! Estes são os meus pais: meu pai Paolo e minha mãe Anna."],
["Lucas","E il ragazzo alto?","E o rapaz alto?"],
["Giulia","È {mio fratello|il fratello} Luca. {Sua moglie|la moglie} si chiama Elena.","É o meu irmão Luca. A esposa dele se chama Elena."],
["Lucas","Hanno {figli|il figlio}?","Eles têm filhos?"],
["Giulia","Sì, {una figlia|la figlia} di tre anni, Sofia.","Sim, uma filha de três anos, a Sofia."],
["Lucas","E la ragazza bionda?","E a moça loira?"],
["Giulia","È {mia sorella|la sorella} Chiara, con {suo marito|il marito} Matteo.","É a minha irmã Chiara, com o marido dela, Matteo."],
["Lucas","E i signori anziani?","E os senhores idosos?"],
["Giulia","{Mio nonno|il nonno} e {mia nonna|la nonna}. Il nonno ha novant'anni!","Meu avô e minha avó. O vovô tem noventa anos!"],
["Lucas","Quando è {il tuo compleanno|il compleanno}?","Quando é o seu aniversário?"],
["Giulia","Il quindici {marzo|marzo}. E tu hai una {fidanzata|la fidanzata}?","Dia quinze de março. E você tem namorada?"],
["Lucas","Sì, è in Brasile. Viene a Bologna a {dicembre|dicembre}.","Tenho, ela está no Brasil. Vem para Bolonha em dezembro."],
["Giulia","Che bello! A Natale c'è anche {mio zio|lo zio} di Napoli, con {mio cugino|il cugino}.","Que legal! No Natal vem também o meu tio de Nápoles, com o meu primo."]],
q:[["Il fratello di Giulia si chiama Luca.",true,"«È mio fratello Luca»."],["Sofia ha cinque anni.",false,"Sofia ha tre anni."],["Il compleanno di Giulia è a marzo.",true,"«Il quindici marzo»."],["La fidanzata di Lucas abita a Bologna.",false,"È in Brasile e viene a Bologna a dicembre."]]};

DLG["a1-10"]={t:"Le nostre mattine",L:[
["Giulia","Lucas, a che ora {ti svegli|svegliarsi}?","Lucas, a que horas você acorda?"],
["Lucas","Alle sei e mezza, ma {mi alzo|alzarsi} alle sette!","Às seis e meia, mas me levanto às sete!"],
["Giulia","E poi cosa fai?","E depois, o que você faz?"],
["Lucas","{Prima|prima} {faccio la doccia|fare la doccia}, {poi|poi} {mi vesto|vestirsi} e {dopo|dopo} faccio {colazione|la colazione}.","Primeiro tomo banho, depois me visto e em seguida tomo café da manhã."],
["Giulia","Io {mi lavo|lavarsi} la faccia e bevo solo un caffè. {Mi piace|mi piace} il caffè forte!","Eu lavo o rosto e só tomo um café. Gosto de café forte!"],
["Lucas","{Anche a me|anche a me}! E {mi piacciono|mi piacciono} i cornetti alla crema.","Eu também! E gosto dos croissants de creme."],
["Giulia","{A me no|a me no}: preferisco pane e marmellata.","Eu não: prefiro pão com geleia."],
["Lucas","E a {pranzo|il pranzo}?","E no almoço?"],
["Giulia","Mangio in ufficio. La sera, dopo {cena|la cena}, {mi riposo|riposarsi} sul divano.","Como no escritório. À noite, depois do jantar, descanso no sofá."],
["Lucas","Io il sabato {mi diverto|divertirsi} con gli amici e {infine|infine}, la domenica, dormo tanto!","Eu no sábado me divirto com os amigos e, por fim, no domingo durmo bastante!"],
["Giulia","E {adesso|adesso}? Che cosa fai {in questo momento|in questo momento}?","E agora? O que você está fazendo neste momento?"],
["Lucas","Adesso? Studio italiano con te!","Agora? Estudo italiano com você!"]],
q:[["Lucas si alza alle sei e mezza.",false,"Si sveglia alle sei e mezza, ma si alza alle sette."],["A Lucas piacciono i cornetti.",true,"«Mi piacciono i cornetti alla crema»."],["A Giulia piacciono i cornetti.",false,"«A me no»: preferisce pane e marmellata."],["Giulia pranza in ufficio.",true,"«Mangio in ufficio»."]]};

DLG["a2-1"]={t:"Com'è andato il fine settimana?",L:[
["","Lunedì mattina, in ufficio.","Segunda de manhã, no escritório."],
["Marco","Ciao Lucas! Com'è andato il fine settimana?","Oi, Lucas! Como foi o fim de semana?"],
["Lucas","Benissimo! Sabato {ho fatto una passeggiata|fare una passeggiata} in centro e {ho visitato un museo|visitare un museo}.","Ótimo! No sábado dei uma volta no centro e visitei um museu."],
["Marco","Quale?","Qual?"],
["Lucas","Il Museo Archeologico. {Ieri|ieri} invece {ho pulito la casa|pulire la casa} e {ho fatto la spesa|fare la spesa}.","O Museu Arqueológico. Ontem, por outro lado, limpei a casa e fiz as compras."],
["Marco","Io {ieri sera|ieri sera} {ho visto un film|vedere un film} con Giulia.","Eu, ontem à noite, vi um filme com a Giulia."],
["Lucas","Quale? Forse l'ho {già|già} {visto|visto}.","Qual? Talvez eu já tenha visto."],
["Marco","Non credo: è uscito {due giorni fa|due giorni fa}!","Acho que não: estreou há dois dias!"],
["Giulia","Ciao ragazzi! Lucas, hai {letto|letto} la mia email?","Oi, pessoal! Lucas, você leu o meu e-mail?"],
["Lucas","Scusa, {non l'ho ancora|non… ancora} aperta.","Desculpa, ainda não abri."],
["Giulia","Normale: l'ho {appena|appena} {scritta|scritto}! {Stamattina|stamattina} {ho incontrato|incontrare} il capo e mi ha {detto|detto} che la riunione è alle dieci.","Normal: acabei de escrever! Hoje de manhã encontrei o chefe e ele me disse que a reunião é às dez."],
["Marco","Alle dieci? Come {la settimana scorsa|la settimana scorsa}!","Às dez? Como na semana passada!"],
["Lucas","Allora ho {preso|preso} il caffè giusto in tempo!","Então tomei o café bem a tempo!"]],
q:[["Sabato Lucas ha visitato un museo.",true,"Il Museo Archeologico."],["Ieri sera Marco ha visto un film con Giulia.",true,"«Ieri sera ho visto un film con Giulia»."],["Lucas ha già letto l'email di Giulia.",false,"Non l'ha ancora aperta: Giulia l'ha appena scritta."],["La riunione è alle undici.",false,"È alle dieci, come la settimana scorsa."]]};

DLG["a2-2"]={t:"Un viaggio a Firenze",L:[
["","Alla stazione di Bologna.","Na estação de Bolonha."],
["Lucas","Buongiorno, vorrei {un biglietto|il biglietto} per Firenze, {andata e ritorno|andata e ritorno}.","Bom dia, eu queria uma passagem para Florença, ida e volta."],
["Impiegato","Il treno delle dieci {parte|partire} dal {binario|il binario} cinque.","O trem das dez parte da plataforma cinco."],
["Lucas","È {in orario|in orario}?","Está no horário?"],
["Impiegato","No, è {in ritardo|in ritardo} di dieci minuti.","Não, está atrasado dez minutos."],
["Lucas","Devo cambiare? C'è {una coincidenza|la coincidenza}?","Preciso trocar? Tem conexão?"],
["Impiegato","No, è diretto. {Arriva|arrivare} a Firenze alle undici meno dieci.","Não, é direto. Chega a Florença às onze menos dez."],
["","La sera, in albergo.","À noite, no hotel."],
["Receptionist","Buonasera, benvenuto {all'albergo|l'albergo} Bellavista!","Boa noite, bem-vindo ao hotel Bellavista!"],
["Lucas","Buonasera, ho {una prenotazione|la prenotazione} a nome Manfrin. {Ho prenotato|prenotare} online.","Boa noite, tenho uma reserva em nome de Manfrin. Reservei pela internet."],
["Receptionist","Sì: {una camera singola|la camera singola} per due notti. Preferisce {una doppia|la camera doppia}? Abbiamo un'offerta.","Sim: um quarto de solteiro por duas noites. Prefere um duplo? Temos uma promoção."],
["Lucas","No, grazie. Ma posso {restare|restare} una notte in più?","Não, obrigado. Mas posso ficar uma noite a mais?"],
["Receptionist","Certo. {Salga|salire} al secondo piano; {la valigia|la valigia} la portiamo noi. Com'è stato {il viaggio|il viaggio}?","Claro. Suba ao segundo andar; a mala nós levamos. Como foi a viagem?"],
["Lucas","Bene! {Sono sceso|scendere} dal treno e sono venuto a piedi. Firenze è {diventata|diventare} la mia città preferita!","Bem! Desci do trem e vim a pé. Florença virou a minha cidade preferida!"],
["Receptionist","E quando {torna|tornare} a Bologna?","E quando o senhor volta para Bolonha?"],
["Lucas","Domenica sera.","Domingo à noite."]],
q:[["Il treno parte dal binario cinque.",true,"«Parte dal binario cinque»."],["Il treno è in orario.",false,"È in ritardo di dieci minuti."],["Lucas prende una camera doppia.",false,"Ha prenotato una camera singola e non cambia."],["Lucas torna a Bologna domenica.",true,"«Domenica sera»."]]};

DLG["a2-3"]={t:"La spesa del sabato",L:[
["Lucas","Questo {supermercato|il supermercato} è enorme!","Este supermercado é enorme!"],
["Giulia","Prendi {il carrello|il carrello}? Dobbiamo {comprare|comprare} tante cose.","Pega o carrinho? Precisamos comprar muitas coisas."],
["Lucas","Cosa c'è sulla lista?","O que tem na lista?"],
["Giulia","{Un litro di|un litro di} latte, {una bottiglia|la bottiglia} d'olio, {un barattolo|il barattolo} di pomodori e {una scatola|la scatola} di biscotti.","Um litro de leite, uma garrafa de azeite, um vidro de tomate e uma caixa de biscoitos."],
["Lucas","Guarda, il caffè è {in offerta|in offerta}! {Prendo|prendere} due {pacchetti|il pacchetto}.","Olha, o café está em promoção! Vou pegar dois pacotes."],
["Giulia","E {un vasetto|il vasetto} di miele. Le {lattine|la lattina} di Coca-Cola? No, {ce l'ho|ce l'ho} già a casa.","E um potinho de mel. As latinhas de Coca-Cola? Não, já tenho em casa."],
["","Al banco dei salumi.","No balcão de frios."],
["Commesso","Buongiorno, desidera?","Bom dia, o que deseja?"],
["Giulia","{Mezzo chilo|mezzo chilo} di prosciutto. È {fresco|fresco}?","Meio quilo de presunto. Está fresco?"],
["Commesso","Freschissimo! E il parmigiano, {quanto ne vuole?|quanto ne vuole?}","Fresquíssimo! E o parmesão, quanto a senhora quer?"],
["Giulia","Due etti. E le mozzarelle… {ne vorrei due|ne vorrei due}.","Duzentos gramas. E as mussarelas… eu queria duas."],
["Commesso","{Altro?|altro?}","Mais alguma coisa?"],
["Giulia","No, {basta così|basta così}, grazie.","Não, só isso, obrigada."],
["","Alla {cassa|la cassa}: «Sono trentadue euro. Ecco {lo scontrino|lo scontrino}.»","No caixa: «São trinta e dois euros. Aqui está o cupom fiscal.»"]],
q:[["Il caffè è in offerta.",true,"Lucas ne prende due pacchetti."],["Giulia compra le lattine di Coca-Cola.",false,"Non le compra: ce l'ha già a casa."],["Giulia vuole un etto di parmigiano.",false,"Ne vuole due etti."],["Giulia prende due mozzarelle.",true,"«Ne vorrei due»."]]};

DLG["a2-4"]={t:"Una festa a sorpresa",L:[
["Marco","Lucas, sabato è il compleanno di Giulia. Le facciamo {una festa|la festa} a {sorpresa|la sorpresa}?","Lucas, sábado é o aniversário da Giulia. Fazemos uma festa surpresa para ela?"],
["Lucas","Bella idea! Chi {invitiamo|invitare}?","Boa ideia! Quem a gente convida?"],
["Marco","I colleghi e la sua famiglia. Stasera {mando|mandare} {l'invito|l'invito} su WhatsApp.","Os colegas e a família dela. Hoje à noite mando o convite pelo WhatsApp."],
["Lucas","E {il regalo|il regalo}? Che cosa le {regaliamo|regalare}?","E o presente? O que damos para ela?"],
["Marco","Un libro? Le piace leggere.","Um livro? Ela gosta de ler."],
["Lucas","{Un mazzo di fiori|il mazzo di fiori} è più bello. E io porto {un dolce|il dolce} brasiliano: il brigadeiro!","Um buquê de flores é mais bonito. E eu levo um doce brasileiro: o brigadeiro!"],
["Marco","Perfetto. Io {telefono|telefonare} a sua sorella e {ho scritto|scrivere} un biglietto: tutti i colleghi le {fanno gli auguri|fare gli auguri}.","Perfeito. Eu ligo para a irmã dela e escrevi um cartão: todos os colegas dão os parabéns."],
["","Sabato sera.","Sábado à noite."],
["Tutti","Sorpresa! {Tanti auguri!|tanti auguri!}","Surpresa! Parabéns!"],
["Lucas","{Buon compleanno|buon compleanno!}, Giulia! Questi fiori sono per te.","Feliz aniversário, Giulia! Estas flores são para você."],
["Giulia","Grazie, ragazzi! Per {festeggiare|festeggiare} di nuovo, a {Capodanno|il Capodanno} facciamo un'altra festa da me!","Obrigada, gente! Para comemorar de novo, no Ano-Novo fazemos outra festa na minha casa!"],
["Marco","E a {Natale|il Natale}?","E no Natal?"],
["Giulia","A Natale vado dai miei genitori, e a {Pasqua|la Pasqua} dai nonni.","No Natal vou para a casa dos meus pais, e na Páscoa para a dos meus avós."]],
q:[["La festa è una sorpresa.",true,"«Le facciamo una festa a sorpresa»."],["Marco telefona alla madre di Giulia.",false,"Telefona a sua sorella."],["Lucas regala un libro.",false,"Regala un mazzo di fiori e porta un dolce brasiliano."],["A Natale Giulia va dai genitori.",true,"«A Natale vado dai miei genitori»."]]};

DLG["a2-5"]={t:"Quando ero piccolo",L:[
["Giulia","Lucas, dove sei {cresciuto|crescere}? Com'eri {da bambino|da bambino}?","Lucas, onde você cresceu? Como você era quando criança?"],
["Lucas","Ero molto {vivace|vivace}! {Abitavo in campagna|abitare in campagna}, vicino a Curitiba.","Eu era muito agitado! Morava no campo, perto de Curitiba."],
["Giulia","Che bello! E {giocavi|giocare} fuori?","Que legal! E você brincava ao ar livre?"],
["Lucas","{Sempre|sempre}! Il mio {giocattolo|il giocattolo} preferito era una bicicletta rossa.","Sempre! O meu brinquedo preferido era uma bicicleta vermelha."],
["Giulia","Io invece {da bambina|da bambina} ero {timida|timido}. Abitavo in un {quartiere|il quartiere} del centro di Bologna.","Eu, ao contrário, quando criança era tímida. Morava num bairro do centro de Bolonha."],
["Lucas","E {la scuola elementare|la scuola elementare}?","E a escola primária?"],
["Giulia","Mi piaceva! {Il maestro|il maestro} si chiamava Franco, era gentilissimo.","Eu gostava! O professor se chamava Franco, era gentilíssimo."],
["Lucas","Io {ogni estate|ogni estate} andavo dalla {nonna|la nonna}. {Mentre|mentre} lei cucinava, io {di solito|di solito} leggevo fumetti in cucina.","Eu todo verão ia para a casa da avó. Enquanto ela cozinhava, eu normalmente lia gibis na cozinha."],
["Giulia","{Ricordi|ricordare} ancora i suoi piatti?","Você ainda lembra dos pratos dela?"],
["Lucas","Certo! È il {ricordo|il ricordo} più bello della mia {infanzia|l'infanzia}.","Claro! É a lembrança mais bonita da minha infância."],
["Giulia","E qualche guaio?","E alguma travessura?"],
["Lucas","{Una volta|una volta} sono caduto da un albero e la nonna si è arrabbiata tantissimo!","Uma vez caí de uma árvore e a vovó ficou bravíssima!"]],
q:[["Da bambino Lucas abitava in città.",false,"Abitava in campagna, vicino a Curitiba."],["Il giocattolo preferito di Lucas era una bicicletta.",true,"Una bicicletta rossa."],["Da bambina Giulia era vivace.",false,"Era timida. Vivace era Lucas."],["Il maestro di Giulia si chiamava Franco.",true,"«Il maestro si chiamava Franco»."]]};

DLG["a2-6"]={t:"Dove andiamo in vacanza?",L:[
["Giulia","Lucas, dove vai per {le vacanze|le vacanze}?","Lucas, aonde você vai nas férias?"],
["Lucas","Non so ancora: {al mare|il mare} o {in montagna|la montagna}?","Ainda não sei: praia ou montanha?"],
["Giulia","Io ad agosto vado al mare in Sardegna: {fa caldo|fa caldo} e {c'è sempre il sole|c'è il sole}!","Eu em agosto vou à praia na Sardenha: faz calor e sempre tem sol!"],
["Lucas","Io preferisco la montagna. Non mi piace quando {fa freddo|fa freddo}, ma adoro quando {nevica|nevica}.","Eu prefiro a montanha. Não gosto quando faz frio, mas adoro quando neva."],
["Giulia","Allora facciamo {una gita|la gita} sulle Dolomiti {la settimana prossima|la settimana prossima}?","Então fazemos um passeio nas Dolomitas na semana que vem?"],
["Lucas","Volentieri! {Che tempo fa|che tempo fa?} lassù?","Com prazer! Como está o tempo lá em cima?"],
["Giulia","Guardo {le previsioni del tempo|le previsioni del tempo}… {Domani|domani} {piove|piove}, ma {dopodomani|dopodomani} {fa bel tempo|fa bel tempo}.","Vou olhar a previsão do tempo… Amanhã chove, mas depois de amanhã faz tempo bom."],
["Lucas","E sabato?","E no sábado?"],
["Giulia","{Nuvoloso|nuvoloso}, ma senza pioggia. Va bene!","Nublado, mas sem chuva. Está ótimo!"],
["Lucas","Qual è {il programma|il programma}?","Qual é o programa?"],
["Giulia","Partiamo sabato alle sei. {Prenoto|prenotare} io il rifugio.","Saímos sábado às seis. Eu reservo o refúgio."],
["Lucas","Perfetto. E {l'anno prossimo|l'anno prossimo} vengo con te in Sardegna, {promesso|promettere}!","Perfeito. E no ano que vem vou com você para a Sardenha, prometido!"]],
q:[["Giulia va al mare in Sardegna ad agosto.",true,"«Ad agosto vado al mare in Sardegna»."],["Lucas preferisce il mare.",false,"Preferisce la montagna."],["Domani fa bel tempo.",false,"Domani piove; fa bel tempo dopodomani."],["Giulia prenota il rifugio.",true,"«Prenoto io il rifugio»."]]};

DLG["a2-7"]={t:"In negozio, con i saldi",L:[
["","Lucas entra in un negozio di abbigliamento. {La commessa|la commessa} lo saluta.","Lucas entra numa loja de roupas. A vendedora o cumprimenta."],
["Commessa","Buongiorno! Posso aiutarla?","Bom dia! Posso ajudar?"],
["Lucas","Sì, cerco {una giacca|la giacca} per l'inverno. Ci sono {i saldi|i saldi}, vero?","Sim, procuro um casaco para o inverno. Está em liquidação, não é?"],
["Commessa","Sì, c'è {lo sconto|lo sconto} del trenta per cento. {Che taglia porta?|che taglia porta?}","Sim, tem desconto de trinta por cento. Que tamanho o senhor usa?"],
["Lucas","La cinquanta.","O cinquenta."],
["Commessa","Ecco. Vuole {provare|provare} anche {il cappotto|il cappotto}?","Aqui está. Quer experimentar também o sobretudo?"],
["Lucas","Sì, grazie. Dov'è {il camerino|il camerino}?","Sim, obrigado. Onde fica o provador?"],
["Commessa","In fondo a destra.","Lá no fundo, à direita."],
["Lucas","La giacca {mi sta bene|mi sta bene}, ma il cappotto è {stretto|stretto}.","O casaco ficou bom, mas o sobretudo está apertado."],
["Commessa","Provi {la taglia|la taglia} cinquantadue.","Experimente o tamanho cinquenta e dois."],
["Lucas","Adesso è un po' {largo|largo}… ma va bene. E queste {scarpe|le scarpe}? C'è il {numero|il numero} quarantatré?","Agora ficou um pouco largo… mas tudo bem. E estes sapatos? Tem o número quarenta e três?"],
["Commessa","Sì. Abbiamo anche {camicie|la camicia} e {pantaloni|i pantaloni} in saldo.","Tem. Temos também camisas e calças em liquidação."],
["Lucas","Per la mia fidanzata prendo questa {gonna|la gonna}. Quanto {costa|costare} tutto?","Para a minha namorada levo esta saia. Quanto custa tudo?"],
["Commessa","Duecentoquaranta euro, con lo sconto.","Duzentos e quarenta euros, com o desconto."],
["Lucas","Posso {pagare con la carta|pagare con la carta}?","Posso pagar com cartão?"],
["Commessa","Certo, con la carta o {in contanti|pagare in contanti}.","Claro, com cartão ou em dinheiro."]],
q:[["C'è lo sconto del trenta per cento.",true,"«C'è lo sconto del trenta per cento»."],["Lucas porta la taglia quarantotto.",false,"Porta la cinquanta."],["Il cappotto è stretto.",true,"«Il cappotto è stretto»; poi prova la cinquantadue."],["Lucas compra una gonna per sua sorella.",false,"La gonna è per la sua fidanzata."]]};

DLG["a2-8"]={t:"Una cena al ristorante",L:[
["","Venerdì sera Lucas e Giulia vanno in trattoria. Giulia ha {prenotato un tavolo|prenotare un tavolo}. Arriva {il cameriere|il cameriere}.","Sexta à noite Lucas e Giulia vão a uma cantina. Giulia reservou uma mesa. Chega o garçom."],
["Cameriere","Buonasera! Ecco {il menù|il menù}.","Boa noite! Aqui está o cardápio."],
["Giulia","Come {antipasto|l'antipasto} prendiamo i crostini. Poi per {primo|il primo}, per me, le tagliatelle al ragù.","De entrada vamos pedir os crostini. Depois, de primeiro prato, para mim, o talharim à bolonhesa."],
["Lucas","Io per {secondo|il secondo} la cotoletta, con le patate come {contorno|il contorno}.","Eu, de segundo prato, o filé à milanesa, com batatas de acompanhamento."],
["Giulia","Lucas, {assaggia|assaggiare} le mie tagliatelle!","Lucas, prova o meu talharim!"],
["Lucas","Buonissime! Come si fa il ragù?","Ótimo! Como se faz o ragu?"],
["Giulia","È facile. {Tagli|tagliare} la cipolla con {il coltello|il coltello}, la metti nella {padella|la padella}, poi {aggiungi|aggiungere} la carne e il pomodoro.","É fácil. Você corta a cebola com a faca, coloca na frigideira, depois junta a carne e o tomate."],
["Giulia","Lo {cuoci|cuocere} per due ore e {mescoli|mescolare} ogni tanto con {un cucchiaio|il cucchiaio} di legno.","Cozinha por duas horas e mexe de vez em quando com uma colher de pau."],
["Giulia","Intanto {bolli|bollire} l'acqua in una {pentola|la pentola} grande, cuoci la pasta e alla fine {versi|versare} il ragù sopra.","Enquanto isso, ferve a água numa panela grande, cozinha a massa e no fim despeja o ragu por cima."],
["Cameriere","Volete {un dolce|il dolce}?","Vão querer uma sobremesa?"],
["Lucas","Un tiramisù e poi {il conto, per favore|il conto, per favore}!","Um tiramisù e depois a conta, por favor!"]],
q:[["Giulia ha prenotato un tavolo.",true,"«Giulia ha prenotato un tavolo»."],["Lucas prende le tagliatelle come primo.",false,"Le tagliatelle sono per Giulia; Lucas prende la cotoletta."],["Il ragù si cuoce nella pentola.",false,"Si fa nella padella; nella pentola bolle l'acqua per la pasta."],["Alla fine Lucas chiede il conto.",true,"«Il conto, per favore!»"]]};

DLG["a2-9"]={t:"Non sto bene",L:[
["Giulia","Lucas, che cos'hai? Sei pallido.","Lucas, o que você tem? Está pálido."],
["Lucas","Non sto bene. {Ho mal di testa|ho mal di testa} e {mi fa male|mi fa male…} {la gola|la gola}.","Não estou bem. Estou com dor de cabeça e a garganta dói."],
["Giulia","Hai {la febbre|la febbre}?","Você está com febre?"],
["Lucas","Un po', trentotto. E ho anche {la tosse|la tosse}.","Um pouco, trinta e oito. E estou com tosse também."],
["Giulia","Forse è {un raffreddore|il raffreddore}. Vai dal {medico|il medico}!","Talvez seja um resfriado. Vá ao médico!"],
["","Dal medico.","No médico."],
["Medico","Buongiorno. Mi dica.","Bom dia. Pode falar."],
["Lucas","Mi fa male tutto: {la schiena|la schiena}, le {gambe|la gamba}… e anche {lo stomaco|lo stomaco}.","Dói tudo: as costas, as pernas… e o estômago também."],
["Medico","Vediamo… È un'influenza. Ecco {la ricetta|la ricetta}: prenda questa {medicina|la medicina} tre volte al giorno.","Vamos ver… É uma gripe. Aqui está a receita: tome este remédio três vezes por dia."],
["Lucas","La compro in {farmacia|la farmacia} oggi?","Compro na farmácia hoje?"],
["Medico","Sì, e poi deve {riposare|riposare} per tre giorni.","Sim, e depois o senhor precisa descansar por três dias."],
["Lucas","Quando {guarisco|guarire}?","Quando eu fico curado?"],
["Medico","Tra una settimana {starà meglio|stare meglio}: è giovane e {sano|sano}!","Daqui a uma semana vai estar melhor: o senhor é jovem e saudável!"]],
q:[["Lucas ha mal di testa.",true,"«Ho mal di testa»."],["Lucas non ha la febbre.",false,"Ha un po' di febbre: trentotto."],["Il medico dice che è un'influenza.",true,"«È un'influenza»."],["Lucas deve riposare per una settimana.",false,"Deve riposare per tre giorni; tra una settimana starà meglio."]]};

DLG["a2-10"]={t:"Una giornata in azienda",L:[
["","Lucas lavora in {un'azienda|l'azienda} di ingegneria a Bologna. Marco è {un collega|il collega} del suo ufficio.","Lucas trabalha numa empresa de engenharia em Bolonha. Marco é um colega do escritório dele."],
["Dott. Ferri","Lucas, alle dieci c'è {la riunione|la riunione} sul nuovo {progetto|il progetto}.","Lucas, às dez tem a reunião sobre o novo projeto."],
["Lucas","Va bene. Ieri ho fatto {il sopralluogo|il sopralluogo} in {cantiere|il cantiere}.","Tudo bem. Ontem fiz a vistoria no canteiro de obras."],
["Dott. Ferri","Bene. Mi manda {la relazione|la relazione} entro venerdì? È {la scadenza|la scadenza} del cliente.","Ótimo. Me manda o relatório até sexta? É o prazo do cliente."],
["Lucas","Certo. E {il preventivo|il preventivo}?","Claro. E o orçamento?"],
["Dott. Ferri","Lo mandi al cliente oggi, per favore.","Mande para o cliente hoje, por favor."],
["","Lucas scrive l'email: «{Gentile dottore|gentile dottore}, Le {allego|allegare} il preventivo. {Cordiali saluti|cordiali saluti}, Lucas Manfrin.»","Lucas escreve o e-mail: «Prezado doutor, segue em anexo o orçamento. Atenciosamente, Lucas Manfrin.»"],
["","Alla pausa caffè, {il capo|il capo} non c'è e Marco racconta una novità.","No intervalo do café, o chefe não está e o Marco conta uma novidade."],
["Marco","Sai che Giulia ha {un colloquio|il colloquio} domani? Vuole {cambiare lavoro|cambiare lavoro}.","Sabia que a Giulia tem uma entrevista amanhã? Ela quer mudar de emprego."],
["Lucas","Davvero? Perché?","Sério? Por quê?"],
["Marco","Dice che {lo stipendio|lo stipendio} è basso. Ha mandato {il curriculum|il curriculum} a un'azienda di Milano.","Ela diz que o salário é baixo. Mandou o currículo para uma empresa de Milão."],
["Lucas","Ha tanta {esperienza|l'esperienza}: lo troverà! Io qui sto bene… ma {mi piacerebbe|mi piacerebbe} lavorare un anno in Brasile.","Ela tem muita experiência: vai conseguir! Eu aqui estou bem… mas gostaria de trabalhar um ano no Brasil."],
["Marco","È {il tuo sogno|il sogno}?","É o seu sonho?"],
["Lucas","Un po' sì!","Um pouco, sim!"]],
q:[["La riunione è alle dieci.",true,"«Alle dieci c'è la riunione sul nuovo progetto»."],["La scadenza della relazione è lunedì.",false,"La relazione va mandata entro venerdì."],["Domani Giulia ha un colloquio.",true,"Vuole cambiare lavoro."],["Lucas vuole cambiare lavoro subito.",false,"Sta bene lì; gli piacerebbe solo lavorare un anno in Brasile."]]};

/* ---------- utilidades e render ---------- */
const DLGRE=/\{([^{}|]+)(?:\|([^{}]+))?\}/g;
function dlgPlain(s){return s.replace(DLGRE,(m,a)=>a)}
function dlgMarked(s){return esc(s).replace(DLGRE,(m,a,k)=>`<mark class="vk ${vGender(k||a)}">${a}</mark>`)}
function dlgIndex(d){const ix={};d.L.forEach(([who,s],i)=>{let m;DLGRE.lastIndex=0;while((m=DLGRE.exec(s))){const k=m[2]||m[1];if(!(k in ix))ix[k]={i,form:m[1]}}});return ix}
function dlgLineFor(d,hit){const [who,s,pt]=d.L[hit.i];let done=false;
 const it=esc(s).replace(DLGRE,(m,a)=>{if(!done&&a===hit.form){done=true;return`<b>${a}</b>`}return a});
 return{who,it,pt}}
function dlgSpeakers(d){const o=[];d.L.forEach(l=>{if(l[0]&&!o.includes(l[0]))o.push(l[0])});return o}
function dlgHTML(d){const sp=dlgSpeakers(d);
 return`<section class="card stack dlg" id="dlgBox"><div><span class="label">Diálogo de abertura · leia e ouça</span><h3>${esc(d.t)}</h3></div>
 <div class="row">${canSpeak?`<button class="btn" id="dlgRead">${SPK_SVG}Ouvir o diálogo</button>`:""}<button class="btn ghost" id="dlgPt" aria-pressed="false">Mostrar tradução</button></div>
 <div class="dlines">${d.L.map(([who,s,pt])=>who?`<div class="stl dl"><span class="dwho dc${sp.indexOf(who)%4}">${esc(who)}</span><span class="it">${dlgMarked(s)}</span><span class="stpt" hidden>${esc(pt)}</span></div>`:`<div class="stl dl nar"><span class="it">${dlgMarked(s)}</span><span class="stpt" hidden>${esc(pt)}</span></div>`).join("")}</div>
 <p class="hint">As palavras destacadas são o vocabulário do tópico (nos substantivos, azul é masculino e laranja é feminino). Leia primeiro sem a tradução e tente entender pelo contexto; toque numa palavra para ver o significado.</p></section>`}
function dlgQHTML(d){return`<section class="card stack"><div><span class="label">Hai capito? · vero o falso</span><h3>Você entendeu o diálogo?</h3></div>
 ${d.q.map(([s,v,e],i)=>`<div class="vfq" data-i="${i}"><p class="it" style="font-style:normal;color:var(--ink)">${esc(s)}</p><div class="row"><button class="btn vfb" data-v="1">Vero</button><button class="btn vfb" data-v="0">Falso</button></div><p class="small vfr" hidden></p></div>`).join("")}</section>`}
function dlgClozeHTML(d){const items=[];const seen=new Set();
 const cand=d.L.filter(l=>DLGRE.test(l[1])&&!(DLGRE.lastIndex=0)),step=Math.max(1,cand.length/5),pick=[];for(let k=0;k<cand.length&&pick.length<5;k+=step)pick.push(cand[Math.floor(k)]);
 pick.forEach(([who,s])=>{const ms=[...s.matchAll(DLGRE)].filter(m=>!seen.has(m[1].toLowerCase())&&m[1].split(" ").length<=3);if(!ms.length)return;
  const m=ms[Math.floor(ms.length/2)];seen.add(m[1].toLowerCase());
  const before=dlgPlain(s.slice(0,m.index)),after=dlgPlain(s.slice(m.index+m[0].length));items.push({who,before,after,ans:m[1]})});
 if(items.length<3)return"";
 const pool=[...new Set(items.map(x=>x.ans))];
 return`<section class="card stack"><div><span class="label">Palavras em contexto</span><h3>Complete com a palavra do diálogo</h3></div><p class="small muted">Tente lembrar a palavra que estava na frase, sem voltar ao diálogo.</p>
 ${items.map((x,i)=>{const opts=[x.ans,...pool.filter(p=>p!==x.ans).sort(()=>Math.random()-.5).slice(0,2)].sort(()=>Math.random()-.5);
  return`<div class="vfq clz" data-a="${esc(x.ans)}"><p>${x.who?`<span class="dwho">${esc(x.who)}</span> `:""}<span class="it" style="font-style:normal;color:var(--ink)">${esc(x.before)}</span><span class="blank"></span><span class="it" style="font-style:normal;color:var(--ink)">${esc(x.after)}</span></p><div class="row">${opts.map(o=>`<button class="btn clzb" data-o="${esc(o)}">${esc(o)}</button>`).join("")}</div><p class="small vfr" hidden></p></div>`}).join("")}</section>`}
function dlgWire(root,d){if(!d)return;
 const pt=root.querySelector("#dlgPt");if(pt)pt.onclick=e=>{const on=e.currentTarget.getAttribute("aria-pressed")!=="true";e.currentTarget.setAttribute("aria-pressed",on);e.currentTarget.textContent=on?"Esconder tradução":"Mostrar tradução";root.querySelectorAll("#dlgBox .stpt").forEach(x=>x.hidden=!on)};
 const rd=root.querySelector("#dlgRead");if(rd)rd.onclick=()=>readLines(d.L.map(l=>dlgPlain(l[1])),[...root.querySelectorAll("#dlgBox .dl")]);
 root.querySelectorAll(".vfq:not(.clz)").forEach(q=>q.querySelectorAll(".vfb").forEach(b=>b.onclick=()=>{const [s,v,e]=d.q[+q.dataset.i],ok=(b.dataset.v==="1")===v;
  q.querySelectorAll(".vfb").forEach(x=>{x.disabled=true;x.classList.toggle("okb",(x.dataset.v==="1")===v);x.classList.toggle("badb",x===b&&!ok)});
  const r=q.querySelector(".vfr");r.hidden=false;r.innerHTML=`<b class="${ok?"okt":"warnt"}">${ok?"Certo!":"Não."}</b> ${esc(e)}`}));
 root.querySelectorAll(".clz").forEach(q=>q.querySelectorAll(".clzb").forEach(b=>b.onclick=()=>{const a=q.dataset.a,ok=b.dataset.o===a;
  q.querySelectorAll(".clzb").forEach(x=>{x.disabled=true;x.classList.toggle("okb",x.dataset.o===a);x.classList.toggle("badb",x===b&&!ok)});
  q.querySelector(".blank").textContent=a;q.querySelector(".blank").classList.add("filled");
  const r=q.querySelector(".vfr");r.hidden=false;r.innerHTML=ok?`<b class="okt">Certo!</b>`:`<b class="warnt">Era “${esc(a)}”.</b>`}))}
