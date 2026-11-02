/* ============================ CURSO A1 ============================ */
const COURSE=[];
COURSE.push({id:"a1-1",lvl:"A1",n:1,t:"Ciao! Chi sei?",sub:"Cumprimentar, apresentar-se, nacionalidades e números até 20",
voc:[["ciao","oi / tchau (informal)"],["buongiorno","bom dia"],["buonasera","boa tarde / boa noite (ao chegar)"],["buonanotte","boa noite (ao dormir)"],["arrivederci","até logo"],["a presto","até breve"],["come stai?","como você está?"],["sto bene","estou bem"],["piacere","prazer (em conhecer)"],["mi chiamo","eu me chamo"],["di dove sei?","de onde você é?"],["sono di Curitiba","sou de Curitiba"],["brasiliano","brasileiro"],["italiano","italiano"],["inglese","inglês"],["francese","francês"],["tedesco","alemão"],["spagnolo","espanhol"],["grazie","obrigado"],["prego","de nada"],["scusa","desculpa (informal)"],["zero","zero"],["uno","um"],["due","dois"],["tre","três"],["dieci","dez"],["venti","vinte"]],
gram:[
{h:"Pronomes sujeito e o verbo essere",html:`
<p>O verbo <b>essere</b> (ser/estar) é irregular e é o primeiro que você precisa. Como no português, o pronome costuma cair porque a terminação já diz quem é: ${it("Sono Lucas")} = "(eu) sou Lucas".</p>
${IG.box("Essere no presente",IG.conj([{v:"essere — ser / estar",f:"sono sei è siamo siete sono"}],["io","tu","lui / lei / Lei","noi","voi","loro"]),"Repare: <b>sono</b> serve para <b>io</b> e para <b>loro</b>. O contexto mostra quem é.")}
${IG.cards([{h:"io",p:"eu"},{h:"tu",p:"você (informal)"},{h:"lui / lei",p:"ele / ela"},{h:"Lei",p:"o senhor / a senhora (formal)"},{h:"noi",p:"nós"},{h:"voi",p:"vocês"},{h:"loro",p:"eles / elas"}])}
${IG.ex([["Io sono brasiliano, e tu?","Eu sou brasileiro, e você?"],["Marco è italiano, è di Roma.","Marco é italiano, é de Roma."],["Noi siamo colleghi.","Nós somos colegas."],["Siete di Milano?","Vocês são de Milão?"]])}
${IG.trap("Cuidado com o acento",`${it("è")} (com acento) = é, verbo. ${it("e")} (sem acento) = e, conjunção: ${it("Anna è alta e simpatica")}.`)}`},
{h:"Nacionalidades: masculino e feminino",html:`
<p>Os adjetivos de nacionalidade concordam com a pessoa. Há <b>dois grupos</b>:</p>
${IG.box("Dois grupos de adjetivos",IG.eq(["[italian]{o} → [italian]{a} ((-o / -a: muda))","[brasilian]{o} → [brasilian]{a}","[ingles]{e} → [ingles]{e} ((-e: igual para os dois))","[frances]{e} → [frances]{e}"]))}
${IG.ex([["Lucas è brasiliano, Giulia è italiana.","Lucas é brasileiro, Giulia é italiana."],["John è inglese, anche Mary è inglese.","John é inglês, Mary também é inglesa."]])}`},
{h:"Pronúncia: c e g",html:`
<p>O som de <b>c</b> e <b>g</b> muda conforme a vogal seguinte. O <b>h</b> serve só para "endurecer" o som.</p>
${IG.box("C e G antes de cada vogal",IG.decide([["c + a, o, u","ca co cu","casa, Colosseo, cucina"],["c + e, i (som de tch)","ce ci","cena, ciao"],["ch + e, i (som de k)","che chi","chiave, perché"],["g + a, o, u","ga go gu","gatto, gondola"],["g + e, i (som de dj)","ge gi","gelato, giro"],["gh + e, i (som de g duro)","ghe ghi","spaghetti, laghi"]],["Combinação","Escrita","Exemplos"]))}
${IG.tip("Outros sons",`${it("gn")} = nh (${it("lasagne")}), ${it("gli")} = lh (${it("famiglia")}), ${it("sc + e/i")} = ch (${it("pesce, sci")}).`)}`},
{h:"Números de 0 a 20",html:`
${IG.box("0–20",IG.cards([{h:"0 zero",p:""},{h:"1 uno",p:""},{h:"2 due",p:""},{h:"3 tre",p:""},{h:"4 quattro",p:""},{h:"5 cinque",p:""},{h:"6 sei",p:""},{h:"7 sette",p:""},{h:"8 otto",p:""},{h:"9 nove",p:""},{h:"10 dieci",p:""},{h:"11 undici",p:""},{h:"12 dodici",p:""},{h:"13 tredici",p:""},{h:"14 quattordici",p:""},{h:"15 quindici",p:""},{h:"16 sedici",p:""},{h:"17 diciassette",p:""},{h:"18 diciotto",p:""},{h:"19 diciannove",p:""},{h:"20 venti",p:""}]),"De 11 a 16 o número termina em <b>-dici</b>; de 17 a 19 começa com <b>dicia-</b>.")}`}],
ex:[
["f","Io ___ Lucas, piacere!","sono","essere, io","Essere: io sono."],
["f","Tu ___ italiano?","sei","essere, tu","Essere: tu sei."],
["f","Giulia ___ di Firenze.","è","essere, lei","Lei è — com acento."],
["f","Noi ___ brasiliani.","siamo","essere, noi","Noi siamo."],
["f","Voi ___ colleghi?","siete","essere, voi","Voi siete."],
["f","Anna è ___ . (italiano)","italiana","feminino","Anna é mulher: -o vira -a."],
["f","Pierre è francese, anche Claire è ___ .","francese","feminino","Adjetivo em -e não muda no feminino."],
["m","Come ___? — Bene, grazie.","stai|sei|è|sono","Come stai? = como você está? (verbo stare)."],
["m","Di dove ___? — Sono di Curitiba.","sei|stai|ho|sono","Di dove sei? pergunta a origem."],
["m","Que palavra tem som de K?","chiave|ciao|cena|gelato","ch + i = som de k."],
["m","15 si dice:","quindici|cinquedici|quindieci|quinze","15 = quindici."],
["x","Marque a frase correta","Lei è brasiliana.|Lei e brasiliana.|Lei è brasiliano.|Lei sei brasiliana.","Verbo è com acento e adjetivo no feminino."]]});

COURSE.push({id:"a1-2",lvl:"A1",n:2,t:"Persone e cose",sub:"Objetos, profissões, idade — gênero, plural, artigo definido e avere",
voc:[["il libro","o livro"],["la penna","a caneta"],["il quaderno","o caderno"],["la borsa","a bolsa"],["lo zaino","a mochila"],["la chiave","a chave"],["il telefono","o telefone"],["il computer","o computador"],["la città","a cidade"],["l'amico","o amigo"],["l'amica","a amiga"],["lo studente","o estudante"],["l'ingegnere","o engenheiro"],["il medico","o médico"],["l'insegnante","o professor / a professora"],["l'impiegato","o funcionário"],["il ragazzo","o rapaz"],["la ragazza","a moça"],["l'anno","o ano"],["quanti anni hai?","quantos anos você tem?"],["ho trent'anni","tenho trinta anos"],["avere","ter"]],
gram:[
{h:"Gênero e plural dos substantivos",html:`
<p>Em italiano todo substantivo é masculino ou feminino. A terminação costuma indicar o gênero e define o plural.</p>
${IG.box("Do singular ao plural",IG.eq(["[libr]{o} → [libr]{i} ((masculino em -o))","[penn]{a} → [penn]{e} ((feminino em -a))","[chiav]{e} → [chiav]{i} ((-e: masc. ou fem.))","[città] → [città] ((acento final: não muda))"]))}
${IG.trap("Palavras que enganam",`${it("il problema → i problemi")} (masculino em -a) · ${it("la mano → le mani")} (feminino em -o) · ${it("la foto, il bar, il computer")} não mudam no plural.`)}
${IG.ex([["Ho due libri e tre penne.","Tenho dois livros e três canetas."],["Le chiavi sono nella borsa.","As chaves estão na bolsa."]])}`},
{h:"Artigo definido: il, lo, l', la, i, gli, le",html:`
<p>O artigo depende do <b>gênero</b>, do <b>número</b> e da <b>primeira letra</b> da palavra seguinte.</p>
${IG.box("Como escolher o artigo",IG.decide([["Masc. + consoante","il → i","il libro → i libri"],["Masc. + s+consoante, z, ps, gn, y","lo → gli","lo zaino → gli zaini"],["Masc. + vogal","l' → gli","l'amico → gli amici"],["Fem. + consoante","la → le","la penna → le penne"],["Fem. + vogal","l' → le","l'amica → le amiche"]],["Palavra começa com…","Singular → plural","Exemplo"]))}
${IG.ex([["Il ragazzo e la ragazza sono studenti.","O rapaz e a moça são estudantes."],["Gli studenti sono in classe.","Os estudantes estão em sala."],["L'ingegnere è al telefono.","O engenheiro está ao telefone."]])}`},
{h:"O verbo avere e a idade",html:`
<p><b>Avere</b> (ter) também é irregular. O <b>h</b> não se pronuncia: ${it("ho")} soa "ó".</p>
${IG.box("Avere no presente",IG.conj([{v:"avere — ter",f:"ho hai ha abbiamo avete hanno"}]))}
${IG.box("Idade: com avere, não com essere",IG.eq(["[Ho] + [trent'anni] = Ho trent'anni ((tenho 30 anos))","[Quanti anni] + [hai]? = Quanti anni hai?"]))}
${IG.trap("Não confunda",`${it("ho")} (tenho) × ${it("o")} (ou) · ${it("ha")} (tem) × ${it("a")} (preposição) · ${it("hanno")} (têm) × ${it("anno")} (ano).`)}
${IG.ex([["Marco ha ventidue anni.","Marco tem vinte e dois anos."],["Abbiamo una domanda.","Temos uma pergunta."],["Hai una penna?","Você tem uma caneta?"]])}`}],
ex:[
["f","___ libro è sul tavolo. (o)","il","artigo","Masculino + consoante: il."],
["f","___ zaino è nuovo. (a mochila)","lo","artigo","Masculino + z: lo."],
["f","___ amica di Marco è simpatica. (a)","l'","artigo","Feminino + vogal: l'."],
["f","___ studenti sono bravi. (os)","gli","artigo","Plural de lo studente: gli studenti."],
["f","___ penne sono rosse. (as)","le","artigo","Feminino plural: le."],
["f","Plurale: il quaderno → i ___","quaderni","plural","-o → -i."],
["f","Plurale: la chiave → le ___","chiavi","plural","-e → -i."],
["f","Io ___ trentadue anni.","ho","avere, io","Idade com avere: ho."],
["f","Loro ___ un cane.","hanno","avere, loro","Loro hanno."],
["m","Plurale di 'la città':","le città|le citte|le cittì|i città","Palavra com acento final não muda."],
["m","___ ingegneri lavorano qui.","Gli|I|Le|Lo","Ingegneri começa com vogal (masc. pl.): gli."],
["x","Marque a frase correta","Quanti anni hai?|Quanti anni sei?|Quanto anni hai?|Quanti anno hai?","Idade = avere; anni no plural."]]});

COURSE.push({id:"a1-3",lvl:"A1",n:3,t:"Com'è?",sub:"Aparência, caráter e cores — adjetivos, artigo indefinido, tratamento formal",
voc:[["alto","alto"],["basso","baixo"],["magro","magro"],["giovane","jovem"],["anziano","idoso"],["bello","bonito"],["simpatico","simpático"],["antipatico","antipático"],["gentile","gentil"],["allegro","alegre"],["timido","tímido"],["serio","sério"],["divertente","divertido"],["intelligente","inteligente"],["i capelli","o cabelo"],["gli occhi","os olhos"],["biondo","loiro"],["castano","castanho"],["rosso","vermelho"],["verde","verde"],["blu","azul"],["nero","preto"],["bianco","branco"],["giallo","amarelo"]],
gram:[
{h:"Concordância dos adjetivos",html:`
<p>O adjetivo concorda em gênero e número com o substantivo e normalmente vem <b>depois</b> dele.</p>
${IG.box("As 4 formas dos dois grupos",`<div class="tbl"><table><tr><th>Grupo</th><th>masc. sing.</th><th>fem. sing.</th><th>masc. pl.</th><th>fem. pl.</th></tr><tr><td>em -o</td><td class="it">alto</td><td class="it">alta</td><td class="it">alti</td><td class="it">alte</td></tr><tr><td>em -e</td><td class="it">gentile</td><td class="it">gentile</td><td class="it">gentili</td><td class="it">gentili</td></tr></table></div>`,"Grupo misto (homem + mulher) usa o masculino plural: <i class='it'>Marco e Anna sono simpatici</i>.")}
${IG.tip("Cores que não mudam",`${it("blu, rosa, viola, beige")}: ${it("le scarpe blu, i pantaloni rosa")}.`)}
${IG.ex([["Ho i capelli castani e gli occhi verdi.","Tenho cabelo castanho e olhos verdes."],["Le mie colleghe sono molto simpatiche.","Minhas colegas são muito simpáticas."],["È un ragazzo alto e magro.","É um rapaz alto e magro."]])}`},
{h:"Artigo indefinido: un, uno, una, un'",html:`
${IG.box("Mesma lógica do artigo definido",IG.decide([["Masc. + consoante ou vogal","un","un libro, un amico"],["Masc. + s+consoante, z, ps, gn","uno","uno zaino, uno studente"],["Fem. + consoante","una","una ragazza"],["Fem. + vogal","un'","un'amica"]],["Palavra começa com…","Artigo","Exemplo"]),"O apóstrofo aparece só no feminino: <i class='it'>un'amica</i>, mas <i class='it'>un amico</i>.")}
${IG.ex([["Ho un fratello e una sorella.","Tenho um irmão e uma irmã."],["C'è uno studente nuovo.","Tem um estudante novo."],["Giulia è un'amica di Roma.","Giulia é uma amiga de Roma."]])}`},
{h:"Tu ou Lei? O tratamento formal",html:`
<p>Com desconhecidos, clientes e superiores usa-se <b>Lei</b> (o senhor / a senhora), com o verbo na <b>3ª pessoa do singular</b>, como "ele/ela".</p>
${IG.box("Informal × formal",IG.cmp([{h:"Tu (informal)",items:[it("Come stai?"),it("Di dove sei?"),it("Come ti chiami?"),it("Scusa!")]},{h:"Lei (formal)",items:[it("Come sta?"),it("Di dov'è?"),it("Come si chiama?"),it("Scusi!")]}]))}
${IG.ex([["Buongiorno, signora. Come sta?","Bom dia, senhora. Como a senhora está?"],["Lei è l'ingegner Manfrin?","O senhor é o engenheiro Manfrin?"]])}`}],
ex:[
["f","Maria è ___ . (alto)","alta","feminino","alto → alta."],
["f","I ragazzi sono ___ . (simpatico)","simpatici","masc. plural","simpatico → simpatici."],
["f","Le ragazze sono ___ . (gentile)","gentili","fem. plural","-e → -i no plural."],
["f","Ho ___ amico a Milano. (um)","un","artigo indef.","Masculino: un, sem apóstrofo."],
["f","Ho ___ amica a Roma. (uma)","un'","artigo indef.","Feminino + vogal: un'."],
["f","C'è ___ studente in classe. (um)","uno","artigo indef.","s + consoante: uno."],
["f","Signora, come ___? (stare, formal)","sta","Lei","Formal: 3ª pessoa — come sta?"],
["m","Le scarpe sono ___.","blu|blue|bli|blui","Blu é invariável."],
["m","Marco e Giulia sono ___.","alti|alte|alto|alta","Grupo misto: masculino plural."],
["m","Formal: 'Come ti chiami?' vira…","Come si chiama?|Come ti chiama?|Come Lei chiami?|Come si chiami?","Lei usa si chiama."],
["m","Il contrario di 'alto':","basso|magro|giovane|bianco","alto × basso."],
["x","Marque a frase correta","Anna ha gli occhi verdi.|Anna ha gli occhi verde.|Anna ha i occhi verdi.|Anna ha gli occhi verda.","Occhi = gli; verde → verdi."]]});

COURSE.push({id:"a1-4",lvl:"A1",n:4,t:"La mia giornata",sub:"Rotina, trabalho e horas — presente dos verbos regulares",
voc:[["lavorare","trabalhar"],["parlare","falar"],["abitare","morar"],["studiare","estudar"],["mangiare","comer"],["cominciare","começar"],["cercare","procurar"],["pagare","pagar"],["prendere","pegar / tomar"],["leggere","ler"],["scrivere","escrever"],["vivere","viver"],["dormire","dormir"],["partire","partir"],["aprire","abrir"],["capire","entender"],["finire","terminar"],["preferire","preferir"],["che ore sono?","que horas são?"],["sono le otto","são oito horas"],["è l'una","é uma hora"],["e mezza","e meia"],["e un quarto","e quinze"],["la mattina","de manhã"],["il pomeriggio","à tarde"],["la sera","à noite"],["di solito","geralmente"]],
gram:[
{h:"As três conjugações",html:`
<p>O infinitivo termina em <b>-are</b>, <b>-ere</b> ou <b>-ire</b>. Tire a terminação e acrescente a da pessoa.</p>
${IG.box("Radical + terminação",IG.eq(["[parl]{are} → [parl] + {o} = parlo","[prend]{ere} → [prend] + {iamo} = prendiamo","[dorm]{ire} → [dorm] + {ono} = dormono"]))}
${IG.box("Presente regular",IG.conj([{v:"parlare (-are)",f:"parl|o parl|i parl|a parl|iamo parl|ate parl|ano"},{v:"prendere (-ere)",f:"prend|o prend|i prend|e prend|iamo prend|ete prend|ono"},{v:"dormire (-ire)",f:"dorm|o dorm|i dorm|e dorm|iamo dorm|ite dorm|ono"}]),"io, tu e noi são iguais nos três grupos (-o, -i, -iamo).")}
${IG.ex([["Lavoro in un tribunale a Curitiba.","Trabalho num tribunal em Curitiba."],["Prendiamo un caffè?","Vamos tomar um café?"],["I bambini dormono.","As crianças dormem."]])}`},
{h:"Verbos em -isc- e ortografia",html:`
${IG.box("O grupo -isc-",IG.conj([{v:"capire",f:"cap|isco cap|isci cap|isce cap|iamo cap|ite cap|iscono"}]),"Como capire: finire, preferire, pulire, spedire. Noi e voi não têm -isc-.")}
${IG.box("-care / -gare / -iare",IG.eq(["[cerc]{are} → tu [cerc]{hi}, noi [cerc]{hiamo} ((ganha h))","[pag]{are} → tu [pag]{hi} ((ganha h))","[mangi]{are} → tu [mang]{i}, noi [mang]{iamo} ((não dobra o i))"]))}
${IG.ex([["Non capisco, può ripetere?","Não entendo, o senhor pode repetir?"],["Finisco di lavorare alle sei.","Termino de trabalhar às seis."],["Paghi tu o pago io?","Você paga ou eu pago?"]])}`},
{h:"Que horas são?",html:`
${IG.box("Dizer a hora",IG.decide([["1 hora","È l'una.","È l'una e dieci."],["2 a 12","Sono le…","Sono le tre."],["meio-dia / meia-noite","È mezzogiorno / mezzanotte.","È mezzanotte."],["e 15 / e 30 / menos 15","e un quarto · e mezza · meno un quarto","Sono le otto e mezza."]],["Quando","Estrutura","Exemplo"]))}
${IG.tip("A que horas?",`${it("A che ora comincia?")} — ${it("Alle nove.")} / ${it("All'una.")} (a + artigo).`)}`}],
ex:[
["f","Io ___ in ufficio. (lavorare)","lavoro","io","-are, io → -o."],
["f","Tu ___ inglese? (parlare)","parli","tu","-are, tu → -i."],
["f","Lei ___ un libro. (leggere)","legge","lei","-ere, lei → -e."],
["f","Noi ___ il treno. (prendere)","prendiamo","noi","noi → -iamo."],
["f","Voi ___ fino a tardi. (dormire)","dormite","voi","-ire, voi → -ite."],
["f","Loro ___ a Roma. (abitare)","abitano","loro","-are, loro → -ano."],
["f","Io non ___ . (capire)","capisco","io","Grupo -isc-: capisco."],
["f","Noi ___ casa. (cercare)","cerchiamo","noi","-care ganha h: cerchiamo."],
["f","Sono le otto e ___ . (8:30)","mezza","hora","8:30 = le otto e mezza."],
["m","Tu ___ sempre con la carta.","paghi|pagi|paga|paghe","-gare: tu paghi."],
["m","Che ore sono? (1:00)","È l'una.|Sono le una.|È una.|Sono l'una.","1 hora usa o singular: è l'una."],
["x","Marque a frase correta","Loro finiscono alle sei.|Loro finono alle sei.|Loro finiscano alle sei.|Loro finischono alle sei.","Finire, loro: finiscono."]]});

COURSE.push({id:"a1-5",lvl:"A1",n:5,t:"Tempo libero",sub:"Passatempos, convites e dias da semana — verbos irregulares",
voc:[["il tempo libero","o tempo livre"],["andare al cinema","ir ao cinema"],["fare sport","praticar esporte"],["giocare a calcio","jogar futebol"],["uscire con gli amici","sair com os amigos"],["leggere un libro","ler um livro"],["ascoltare musica","ouvir música"],["la palestra","a academia"],["la partita","a partida, o jogo"],["vieni con noi?","vem com a gente?"],["volentieri!","com prazer!"],["purtroppo non posso","infelizmente não posso"],["lunedì","segunda-feira"],["martedì","terça-feira"],["mercoledì","quarta-feira"],["giovedì","quinta-feira"],["venerdì","sexta-feira"],["sabato","sábado"],["domenica","domingo"],["il fine settimana","o fim de semana"],["spesso","frequentemente"],["qualche volta","às vezes"],["mai","nunca"]],
gram:[
{h:"Irregulares de alta frequência",html:`
${IG.box("Os mais usados",IG.conj([{v:"andare — ir",f:"vado vai va andiamo andate vanno"},{v:"fare — fazer",f:"faccio fai fa facciamo fate fanno"},{v:"venire — vir",f:"vengo vieni viene veniamo venite vengono"},{v:"uscire — sair",f:"esco esci esce usciamo uscite escono"}]))}
${IG.box("Mais quatro",IG.conj([{v:"stare — estar",f:"sto stai sta stiamo state stanno"},{v:"dare — dar",f:"do dai dà diamo date danno"},{v:"dire — dizer",f:"dico dici dice diciamo dite dicono"},{v:"bere — beber",f:"bevo bevi beve beviamo bevete bevono"}]),"Truque: noi e voi costumam ser regulares (andiamo, andate)." )}
${IG.ex([["Il sabato vado in palestra.","Aos sábados vou à academia."],["Che cosa fai stasera?","O que você vai fazer hoje à noite?"],["Esco con gli amici il venerdì.","Saio com os amigos às sextas."]])}`},
{h:"Convidar, aceitar, recusar",html:`
${IG.box("Um convite em três passos",IG.cmp([{h:"Convidar",items:[it("Vieni al cinema con me?"),it("Ti va di uscire?"),it("Perché non andiamo al mare?")]},{h:"Aceitar",items:[it("Volentieri!"),it("Sì, perché no?"),it("Ottima idea!")]},{h:"Recusar",items:[it("Purtroppo non posso."),it("Mi dispiace, ho un impegno."),it("Magari un'altra volta.")]}]))}`},
{h:"Dias e frequência",html:`
${IG.box("Com que frequência?",IG.scale([["sempre",100,"sempre"],["di solito",80,"geralmente"],["spesso",62,"frequentemente"],["qualche volta",35,"às vezes"],["raramente",15,"raramente"],["non… mai",3,"nunca"]]),"Com <b>mai</b> o italiano usa dupla negação: <i class='it'>Non vado mai in palestra.</i>")}
${IG.tip("Dia com artigo = todo",`${it("Il lunedì lavoro da casa")} = toda segunda. ${it("Lunedì vado a Roma")} = nesta segunda.`)}`}],
ex:[
["f","Domani io ___ al cinema. (andare)","vado","io","Andare: vado."],
["f","Che cosa ___ stasera? (fare, tu)","fai","tu","Fare: fai."],
["f","Loro ___ in palestra. (andare)","vanno","loro","Andare: vanno."],
["f","Io ___ con gli amici. (uscire)","esco","io","Uscire: esco."],
["f","Marco ___ alla festa? (venire)","viene","lui","Venire: viene."],
["f","Noi ___ sport il sabato. (fare)","facciamo","noi","Fare: facciamo."],
["f","Io non ___ mai il caffè. (bere)","bevo","io","Bere: bevo."],
["f","Come ___? — Sto bene. (stare, tu)","stai","tu","Stare: stai."],
["m","Non vado ___ in palestra.","mai|sempre|spesso|qualche volta","Non… mai = nunca."],
["m","Vieni con noi? — ___! (aceitar)","Volentieri|Purtroppo|Mi dispiace|Mai","Volentieri = com prazer."],
["m","O dia depois de 'giovedì':","venerdì|mercoledì|sabato|martedì","giovedì → venerdì."],
["x","Marque a frase correta","Loro dicono la verità.|Loro dicano la verità.|Loro dichono la verità.|Loro dicino la verità.","Dire: dicono."]]});

COURSE.push({id:"a1-6",lvl:"A1",n:6,t:"Casa e indirizzo",sub:"Cômodos, móveis, endereço e números até 2.000 — potere, volere, dovere, c'è / ci sono",
voc:[["la casa","a casa"],["l'appartamento","o apartamento"],["la camera da letto","o quarto"],["il soggiorno","a sala"],["la cucina","a cozinha"],["il bagno","o banheiro"],["il balcone","a sacada"],["il letto","a cama"],["il divano","o sofá"],["il tavolo","a mesa"],["la sedia","a cadeira"],["l'armadio","o armário"],["la finestra","a janela"],["il piano","o andar"],["l'indirizzo","o endereço"],["la via","a rua"],["trenta","trinta"],["cinquanta","cinquenta"],["cento","cem"],["mille","mil"],["duemila","dois mil"],["primo","primeiro"],["secondo","segundo"],["terzo","terceiro"]],
gram:[
{h:"Potere, volere, dovere",html:`
<p>Os verbos modais vêm seguidos de um <b>infinitivo</b>, sem preposição.</p>
${IG.box("Modal + infinitivo",IG.eq(["[posso] + [entrare]? = Posso entrare? ((poder))","[voglio] + [vedere] = Voglio vedere la casa ((querer))","[devo] + [lavorare] = Devo lavorare ((ter que))"]))}
${IG.box("Conjugação",IG.conj([{v:"potere",f:"posso puoi può possiamo potete possono"},{v:"volere",f:"voglio vuoi vuole vogliamo volete vogliono"},{v:"dovere",f:"devo devi deve dobbiamo dovete devono"}]))}
${IG.tip("Mais educado",`Em pedidos use ${it("vorrei")} (eu gostaria) no lugar de ${it("voglio")}: ${it("Vorrei vedere l'appartamento.")}`)}`},
{h:"C'è / ci sono e onde ficam as coisas",html:`
${IG.box("Existir num lugar",IG.eq(["[c'è] + {una finestra} ((singular))","[ci sono] + {due camere} ((plural))"]))}
${IG.box("Posição",IG.pos(),"Com artigo: <i class='it'>sopra il tavolo, sotto il letto, accanto alla finestra, davanti alla porta</i>.")}
${IG.ex([["In soggiorno c'è un divano grande.","Na sala tem um sofá grande."],["Ci sono due bagni.","Há dois banheiros."],["Il gatto è sotto il letto.","O gato está embaixo da cama."]])}`},
{h:"Números até 2.000 e ordinais",html:`
${IG.box("Como se formam",IG.eq(["[venti] + [uno] = ventuno ((perde a vogal))","[trenta] + [otto] = trentotto","[cento] + [venti] = centoventi","[due] + [mila] = duemila ((mille → mila))"]),"Os números se escrevem juntos: <i class='it'>milleduecentotrenta</i> (1.230).")}
${IG.box("Ordinais",IG.cards([{h:"1º primo",p:""},{h:"2º secondo",p:""},{h:"3º terzo",p:""},{h:"4º quarto",p:""},{h:"5º quinto",p:""},{h:"10º decimo",p:""}]),"Abito al terzo piano = moro no terceiro andar.")}`}],
ex:[
["f","___ entrare? (potere, io)","posso","io","Potere: posso."],
["f","Noi ___ lavorare domani. (dovere)","dobbiamo","noi","Dovere: dobbiamo."],
["f","Tu ___ un caffè? (volere)","vuoi","tu","Volere: vuoi."],
["f","Loro non ___ venire. (potere)","possono","loro","Potere: possono."],
["f","In cucina ___ un tavolo. (há)","c'è","singular","Singular: c'è."],
["f","Nell'appartamento ___ tre camere. (há)","ci sono","plural","Plural: ci sono."],
["f","Abito al ___ piano. (3º)","terzo","ordinal","3º = terzo."],
["m","21 si dice:","ventuno|ventiuno|vent'uno|venteuno","venti + uno perde o i: ventuno."],
["m","Lei ___ firmare qui. (deve)","deve|devo|dove|dovi","Dovere, lei: deve."],
["m","Il gatto dorme ___ il letto. (embaixo)","sotto|sopra|dentro|davanti","sotto = embaixo de."],
["m","1.000 si dice:","mille|mila|milla|un mila","1.000 = mille; 2.000 = duemila."],
["x","Marque a frase correta","Voglio vedere la casa.|Voglio di vedere la casa.|Voglio a vedere la casa.|Voglio vedo la casa.","Modal + infinitivo direto."]]});

COURSE.push({id:"a1-7",lvl:"A1",n:7,t:"In città",sub:"Lugares, transporte e direções — preposições simples",
voc:[["la stazione","a estação"],["la fermata","o ponto (de ônibus)"],["l'autobus","o ônibus"],["il treno","o trem"],["la metropolitana","o metrô"],["a piedi","a pé"],["in macchina","de carro"],["la piazza","a praça"],["la banca","o banco"],["la farmacia","a farmácia"],["l'ufficio","o escritório"],["il museo","o museu"],["il centro","o centro"],["a destra","à direita"],["a sinistra","à esquerda"],["sempre dritto","sempre reto"],["vicino","perto"],["lontano","longe"],["dov'è…?","onde fica…?"],["scusi","com licença (formal)"],["girare","virar"],["attraversare","atravessar"]],
gram:[
{h:"A, in, di, da: o mapa das preposições",html:`
<p>As preposições são o ponto em que o português mais atrapalha. Memorize pelo <b>tipo de lugar</b>:</p>
${IG.box("Para onde? Onde?",IG.decide([["Cidade","a","Abito a Curitiba. Vado a Roma."],["País, região","in","Vado in Italia. Sono in Toscana."],["Lugares em -ia, -teca, ufficio, centro…","in","in farmacia, in biblioteca, in ufficio"],["Casa de uma pessoa / profissional","da","Vado da Marco. Sono dal medico."],["Origem (essere di)","di","Sono di Curitiba."],["Procedência (venire da)","da","Vengo da Milano."],["Destino de viagem (partire per)","per","Parto per Roma."]],["Tipo","Preposição","Exemplo"]))}
${IG.box("Meios de transporte",IG.eq(["[in] + {treno / autobus / macchina / aereo}","[a] + {piedi} ((exceção: a pé))"]))}`},
{h:"Con, su, per, tra / fra",html:`
${IG.box("Usos principais",IG.cards([{h:"con",p:"com: companhia, instrumento — <i class='it'>con gli amici</i>"},{h:"su",p:"sobre, em cima; tema — <i class='it'>un libro su Roma</i>"},{h:"per",p:"para, por; duração — <i class='it'>per te, per tre ore</i>"},{h:"tra / fra",p:"entre; daqui a — <i class='it'>tra due giorni</i>"}]))}
${IG.trap("Armadilhas do português",`"Vou <u>ao</u> Brasil" → ${it("vado in Brasile")} · "Estou <u>em</u> Roma" → ${it("sono a Roma")} · "<u>Daqui a</u> uma hora" → ${it("tra un'ora")}.`)}
${IG.ex([["Scusi, dov'è la fermata dell'autobus?","Com licença, onde fica o ponto de ônibus?"],["Vada sempre dritto e poi giri a destra.","Siga sempre reto e depois vire à direita."],["La banca è tra la farmacia e il bar.","O banco fica entre a farmácia e o bar."]])}`}],
ex:[
["f","Abito ___ Curitiba.","a","cidade","Cidade: a."],
["f","Vado ___ Italia ad agosto.","in","país","País: in."],
["f","Oggi lavoro ___ ufficio.","in","lugar","in ufficio (expressão fixa)."],
["f","Domani vado ___ Marco.","da","pessoa","Casa de alguém: da."],
["f","Sono ___ Curitiba, ma vivo a Roma.","di","origem","Essere di + cidade."],
["f","Vado al lavoro ___ piedi.","a","modo","Exceção: a piedi."],
["f","Vado in centro ___ autobus.","in","transporte","Transporte: in."],
["f","Ci vediamo ___ un'ora. (daqui a)","tra/fra","tempo","Daqui a: tra ou fra."],
["m","Parto ___ Milano domani.","per|a|da|in","Partire per + destino."],
["m","Vengo ___ Napoli.","da|di|a|per","Procedência: venire da."],
["m","Lavoro ___ farmacia.","in|a|da|di","Lugares em -ia: in."],
["x","Marque a frase correta","Vado in Brasile.|Vado a Brasile.|Vado al Brasile.|Vado da Brasile.","País = in."]]});

COURSE.push({id:"a1-8",lvl:"A1",n:8,t:"Al bar e al mercato",sub:"Comida, bebida, quantidades e preços — preposições articuladas e partitivo",
voc:[["il caffè","o café"],["il cornetto","o croissant"],["l'acqua","a água"],["il succo","o suco"],["il panino","o sanduíche"],["il pane","o pão"],["il formaggio","o queijo"],["il latte","o leite"],["la mela","a maçã"],["il pomodoro","o tomate"],["la pasta","a massa"],["il vino","o vinho"],["vorrei","eu gostaria / queria"],["quanto costa?","quanto custa?"],["quanto costano?","quanto custam?"],["il conto","a conta"],["un chilo di","um quilo de"],["un etto di","cem gramas de"],["una bottiglia di","uma garrafa de"],["un pacco di","um pacote de"],["l'euro","o euro"],["il prezzo","o preço"]],
gram:[
{h:"Preposições articuladas",html:`
<p><b>Di, a, da, in, su</b> se juntam ao artigo definido, como "de + o = do" em português.</p>
${IG.box("Preposição + artigo",IG.eq(["[in] + [la] = nella","[a] + [il] = al","[di] + [gli] = degli","[su] + [l'] = sull'","[da] + [i] = dai"]))}
${IG.box("A grade completa",IG.ap(),"Toque em qualquer forma para ver como ela se forma. <b>in</b> vira <b>ne-</b>; <b>di</b> vira <b>de-</b>. Con, per e tra não se juntam.")}
${IG.ex([["Il latte è nel frigorifero.","O leite está na geladeira."],["Vado al bar.","Vou ao bar."],["Il prezzo dei pomodori è alto.","O preço dos tomates está alto."],["Le chiavi sono sul tavolo.","As chaves estão em cima da mesa."]])}`},
{h:"O partitivo: del, della, dei…",html:`
<p><b>Di + artigo</b> também significa "um pouco de / alguns".</p>
${IG.box("Quantidade indefinida",IG.decide([["Um pouco de (incontável)","del / della / dell'","Vorrei del pane, della frutta."],["Alguns / algumas","dei / degli / delle","Compro delle mele, dei pomodori."],["Alternativa simples","un po' di","un po' di formaggio"],["Na negação","sem partitivo","Non ho pane."]],["Sentido","Forma","Exemplo"]))}
${IG.ex([["Vorrei un etto di prosciutto e del formaggio.","Queria cem gramas de presunto e um pouco de queijo."],["Quanto costano le mele? — Due euro al chilo.","Quanto custam as maçãs? — Dois euros o quilo."]])}`}],
ex:[
["f","Vado ___ bar. (a + il)","al","a + il","a + il = al."],
["f","Il libro è ___ borsa. (in + la)","nella","in + la","in + la = nella."],
["f","Il telefono è ___ tavolo. (su + il)","sul","su + il","su + il = sul."],
["f","Torno ___ ufficio alle sei. (da + l')","dall'","da + l'","da + l' = dall'."],
["f","La casa ___ studenti. (di + gli)","degli","di + gli","di + gli = degli."],
["f","Vorrei ___ pane. (um pouco de)","del","partitivo","Il pane → del pane."],
["f","Compro ___ mele. (algumas)","delle","partitivo","Le mele → delle mele."],
["f","Quanto ___ i pomodori? (costare)","costano","plural","Plural: costano."],
["m","Il latte è ___ frigorifero.","nel|in il|nello|al","in + il = nel."],
["m","Scrivo ___ studenti.","agli|ai|alli|a gli","a + gli = agli."],
["m","Un ___ di prosciutto (100 g).","etto|chilo|litro|pacco","Un etto = 100 g."],
["x","Marque a frase correta","Non ho pane.|Non ho del pane.|Non ho di pane.|Non ho il del pane.","Na negação não se usa o partitivo."]]});

COURSE.push({id:"a1-9",lvl:"A1",n:9,t:"La famiglia",sub:"Família, meses e datas — possessivos, questo e quello",
voc:[["la famiglia","a família"],["il padre","o pai"],["la madre","a mãe"],["i genitori","os pais"],["il fratello","o irmão"],["la sorella","a irmã"],["il figlio","o filho"],["la figlia","a filha"],["il marito","o marido"],["la moglie","a esposa"],["il nonno","o avô"],["la nonna","a avó"],["lo zio","o tio"],["il cugino","o primo"],["la fidanzata","a namorada / noiva"],["gennaio","janeiro"],["febbraio","fevereiro"],["marzo","março"],["aprile","abril"],["maggio","maio"],["giugno","junho"],["luglio","julho"],["agosto","agosto"],["settembre","setembro"],["ottobre","outubro"],["novembre","novembro"],["dicembre","dezembro"],["il compleanno","o aniversário"]],
gram:[
{h:"Possessivos",html:`
<p>O possessivo concorda com a <b>coisa possuída</b>, não com o dono, e normalmente vem com artigo.</p>
${IG.box("Formas",`<div class="tbl"><table><tr><th>dono</th><th>masc. sing.</th><th>fem. sing.</th><th>masc. pl.</th><th>fem. pl.</th></tr>
<tr><td>io</td><td class="it">il mio</td><td class="it">la mia</td><td class="it">i miei</td><td class="it">le mie</td></tr>
<tr><td>tu</td><td class="it">il tuo</td><td class="it">la tua</td><td class="it">i tuoi</td><td class="it">le tue</td></tr>
<tr><td>lui/lei/Lei</td><td class="it">il suo</td><td class="it">la sua</td><td class="it">i suoi</td><td class="it">le sue</td></tr>
<tr><td>noi</td><td class="it">il nostro</td><td class="it">la nostra</td><td class="it">i nostri</td><td class="it">le nostre</td></tr>
<tr><td>voi</td><td class="it">il vostro</td><td class="it">la vostra</td><td class="it">i vostri</td><td class="it">le vostre</td></tr>
<tr><td>loro</td><td class="it">il loro</td><td class="it">la loro</td><td class="it">i loro</td><td class="it">le loro</td></tr></table></div>`,"<i class='it'>Anna e il suo libro</i>: suo concorda com libro (masc.), mesmo sendo de Anna.")}
${IG.box("A regra da família",IG.cmp([{h:"Sem artigo",items:["parente no <b>singular</b>: "+it("mia madre, tuo fratello"),"sem adjetivo: "+it("sua moglie")]},{h:"Com artigo",items:["no <b>plural</b>: "+it("i miei fratelli"),"com <b>loro</b>: "+it("la loro figlia"),"com adjetivo ou diminutivo: "+it("la mia sorellina"),it("la mia mamma, il mio papà")]}]))}
${IG.ex([["Mia sorella abita a Milano.","Minha irmã mora em Milão."],["I miei genitori sono di Curitiba.","Meus pais são de Curitiba."],["Questa è la nostra casa.","Esta é a nossa casa."]])}`},
{h:"Questo e quello",html:`
<p><b>Questo</b> = este (perto). <b>Quello</b> = aquele (longe). Antes do substantivo, <i class="it">quello</i> muda como o artigo definido.</p>
${IG.box("Quello segue o artigo",IG.eq(["[il] libro → {quel} libro","[lo] zaino → {quello} zaino","[l'] ufficio → {quell'} ufficio","[la] casa → {quella} casa","[i] libri → {quei} libri","[gli] studenti → {quegli} studenti","[le] case → {quelle} case"]))}
${IG.ex([["Questo è mio fratello.","Este é meu irmão."],["Chi è quella ragazza?","Quem é aquela moça?"],["Quei ragazzi sono i miei cugini.","Aqueles rapazes são meus primos."]])}`},
{h:"Datas",html:`${IG.box("Dizer a data",IG.eq(["[il] + {12} + [ottobre] = il 12 ottobre","[il] + {primo} + [maggio] = il primo maggio ((dia 1 = primo))","[Il mio compleanno è] + {il 3 marzo}"]),"Os meses se escrevem com minúscula.")}`}],
ex:[
["f","___ madre è medico. (minha)","mia","família","Parente singular sem artigo."],
["f","___ fratelli abitano a Roma. (meus)","i miei","família","Plural: com artigo."],
["f","Questa è ___ casa. (minha)","la mia","posse","Coisa: artigo + possessivo."],
["f","Anna e ___ marito. (seu, dela)","suo","família","Parente singular: suo marito."],
["f","Marco e ___ macchina. (sua, dele)","la sua","posse","Concorda com macchina (fem.)."],
["f","Vedi ___ ragazzo? (aquele)","quel","quello","il ragazzo → quel ragazzo."],
["f","___ studenti sono stranieri. (aqueles)","quegli","quello","gli studenti → quegli."],
["f","___ libro è interessante. (este)","questo","questo","Masc. sing.: questo."],
["m","___ figlia studia a Bologna. (deles)","La loro|Loro|Sua|La sua","Loro sempre com artigo."],
["m","Il mio compleanno è ___ 5 luglio.","il|in|a|al","Datas: il + número."],
["m","O mês depois de 'aprile':","maggio|marzo|giugno|luglio","aprile → maggio."],
["x","Marque a frase correta","I miei genitori sono simpatici.|Miei genitori sono simpatici.|Le mie genitori sono simpatici.|I mii genitori sono simpatici.","Plural de parente: com artigo."]]});

COURSE.push({id:"a1-10",lvl:"A1",n:10,t:"Mi piace!",sub:"Gostos, rotina e o que está acontecendo — piacere, reflexivos, stare + gerúndio",
voc:[["mi piace","eu gosto (de algo singular)"],["mi piacciono","eu gosto (de coisas no plural)"],["anche a me","eu também"],["a me no","eu não"],["svegliarsi","acordar"],["alzarsi","levantar-se"],["lavarsi","lavar-se"],["vestirsi","vestir-se"],["chiamarsi","chamar-se"],["divertirsi","divertir-se"],["riposarsi","descansar"],["la colazione","o café da manhã"],["il pranzo","o almoço"],["la cena","o jantar"],["fare la doccia","tomar banho"],["prima","antes / primeiro"],["poi","depois"],["dopo","depois"],["infine","por fim"],["adesso","agora"],["in questo momento","neste momento"]],
gram:[
{h:"Piacere: o gostar ao contrário",html:`
<p>Em italiano, a coisa de que se gosta é o <b>sujeito</b>: "o café <b>me agrada</b>". Por isso o verbo concorda com a coisa.</p>
${IG.box("Singular ou plural?",IG.eq(["[mi piace] + {il caffè} ((uma coisa))","[mi piace] + {leggere} ((verbo: sempre piace))","[mi piacciono] + {i libri} ((várias coisas))"]))}
${IG.box("Quem gosta",IG.cards([{h:"mi piace",p:"eu gosto"},{h:"ti piace",p:"você gosta"},{h:"gli piace",p:"ele gosta"},{h:"le piace",p:"ela gosta"},{h:"Le piace",p:"o senhor gosta"},{h:"ci piace",p:"nós gostamos"},{h:"vi piace",p:"vocês gostam"},{h:"a Marco piace",p:"Marco gosta"}]))}
${IG.ex([["Mi piace molto la cucina italiana.","Gosto muito da cozinha italiana."],["Ti piacciono i film gialli?","Você gosta de filmes policiais?"],["Mi piace il jazz. — Anche a me!","Gosto de jazz. — Eu também!"]])}`},
{h:"Verbos reflexivos",html:`
<p>O pronome reflexivo vem <b>antes</b> do verbo e muda com a pessoa.</p>
${IG.box("Pronome + verbo",IG.conj([{v:"alzarsi — levantar-se",f:"mi_|alzo ti_|alzi si_|alza ci_|alziamo vi_|alzate si_|alzano"},{v:"vestirsi — vestir-se",f:"mi_|vesto ti_|vesti si_|veste ci_|vestiamo vi_|vestite si_|vestono"}]))}
${IG.box("Uma manhã típica",IG.tl([{at:.05,it:"mi sveglio",pt:"6:30"},{at:.2,it:"mi alzo",pt:"6:40"},{at:.35,it:"faccio la doccia",pt:"6:50"},{at:.5,it:"mi vesto",pt:"7:10"},{at:.62,it:"faccio colazione",pt:"7:20"},{at:.85,it:"esco di casa",pt:"7:45"}],["manhã","","trabalho"]))}`},
{h:"Stare + gerúndio",html:`
<p>Para uma ação <b>acontecendo agora</b>: <b>stare</b> no presente + gerúndio.</p>
${IG.box("Formar o gerúndio",IG.eq(["[lavor]{are} → [lavor]{ando}","[legg]{ere} → [legg]{endo}","[dorm]{ire} → [dorm]{endo}","[sto] + [lavorando] = Sto lavorando ((estou trabalhando))"]),"Irregulares: fare → facendo, bere → bevendo, dire → dicendo.")}
${IG.ex([["Che cosa stai facendo? — Sto leggendo.","O que você está fazendo? — Estou lendo."],["Stiamo aspettando l'autobus.","Estamos esperando o ônibus."]])}`}],
ex:[
["f","Mi ___ il caffè. (piacere)","piace","singular","Uma coisa: piace."],
["f","Mi ___ i dolci. (piacere)","piacciono","plural","Plural: piacciono."],
["f","Ti ___ ballare? (piacere)","piace","verbo","Com infinitivo: sempre piace."],
["f","A Marco ___ il calcio. (piacere)","piace","singular","A Marco piace."],
["f","Io ___ alzo alle sette.","mi","reflexivo","io → mi."],
["f","Come ___ chiami?","ti","reflexivo","tu → ti."],
["f","Noi ___ divertiamo molto.","ci","reflexivo","noi → ci."],
["f","Sto ___ una mail. (scrivere)","scrivendo","gerúndio","-ere → -endo."],
["f","Stiamo ___ . (mangiare)","mangiando","gerúndio","-are → -ando."],
["m","Mi piace il jazz. — Eu também:","Anche a me!|Anche io!|Me too!|Anch'io piace!","Com piacere: anche a me."],
["m","Loro ___ alzano tardi.","si|li|ci|vi","loro → si."],
["x","Marque a frase correta","Mi piacciono le lasagne.|Mi piace le lasagne.|Io piaccio le lasagne.|Mi piacciano le lasagne.","Le lasagne é plural: piacciono."]]});
