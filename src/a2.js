/* ============================ CURSO A2 ============================ */
COURSE.push({id:"a2-1",lvl:"A2",n:1,t:"Il fine settimana",sub:"Contar o que você fez — passato prossimo com avere",
voc:[["ieri","ontem"],["ieri sera","ontem à noite"],["l'altro ieri","anteontem"],["stamattina","hoje de manhã"],["la settimana scorsa","a semana passada"],["l'anno scorso","o ano passado"],["due giorni fa","dois dias atrás"],["fare una passeggiata","dar um passeio"],["visitare un museo","visitar um museu"],["vedere un film","ver um filme"],["fare la spesa","fazer compras (mercado)"],["pulire la casa","limpar a casa"],["incontrare","encontrar (alguém)"],["già","já"],["non… ancora","ainda não"],["appena","acabou de"],["fatto","feito (fare)"],["visto","visto (vedere)"],["preso","pegado, tomado (prendere)"],["scritto","escrito (scrivere)"],["letto","lido (leggere)"],["detto","dito (dire)"]],
gram:[
{h:"Como se forma o passato prossimo",html:`
<p>É o passado do dia a dia, como o nosso pretérito perfeito ("comi, trabalhei"). Forma-se com <b>avere</b> (ou essere) no presente + <b>particípio</b>.</p>
${IG.box("Uma ação concluída",IG.tl([{at:.2,it:"ho lavorato",pt:"trabalhei (ontem)"},{at:.42,it:"ho visto un film",pt:"vi um filme (ontem à noite)"},{at:.62,it:"lavoro",pt:"trabalho (hoje)"}]),"O passato prossimo marca um ponto fechado no passado.")}
${IG.box("Auxiliar + particípio",IG.eq(["[ho] + [lavor]{ato} = ho lavorato ((-are → -ato))","[ho] + [vend]{uto} = ho venduto ((-ere → -uto))","[ho] + [dorm]{ito} = ho dormito ((-ire → -ito))"]))}
${IG.box("Com avere o particípio não muda",IG.conj([{v:"mangiare",f:"ho_|mangiato hai_|mangiato ha_|mangiato abbiamo_|mangiato avete_|mangiato hanno_|mangiato"}]))}`},
{h:"Particípios irregulares",html:`
${IG.box("Decore estes",IG.cards([{h:"fare → fatto",p:"feito"},{h:"dire → detto",p:"dito"},{h:"vedere → visto",p:"visto"},{h:"prendere → preso",p:"pegado"},{h:"mettere → messo",p:"colocado"},{h:"scrivere → scritto",p:"escrito"},{h:"leggere → letto",p:"lido"},{h:"aprire → aperto",p:"aberto"},{h:"chiudere → chiuso",p:"fechado"},{h:"chiedere → chiesto",p:"pedido"},{h:"rispondere → risposto",p:"respondido"},{h:"bere → bevuto",p:"bebido"},{h:"perdere → perso",p:"perdido"},{h:"spendere → speso",p:"gasto"},{h:"decidere → deciso",p:"decidido"},{h:"vincere → vinto",p:"vencido"}]))}
${IG.box("Onde vão os advérbios",IG.eq(["[non] + [ho] + {ancora} + [finito] ((ainda não terminei))","[ho] + {già} + [mangiato] ((já comi))","[ho] + {appena} + [chiamato] ((acabei de ligar))"]))}
${IG.ex([["Sabato ho fatto la spesa e ho pulito la casa.","No sábado fiz compras e limpei a casa."],["Hai letto la mail del capo?","Você leu o e-mail do chefe?"],["Non ho ancora finito la relazione.","Ainda não terminei o relatório."],["Due anni fa ho comprato una macchina.","Dois anos atrás comprei um carro."]])}`}],
ex:[
["f","Ieri io ___ lavorato fino alle otto.","ho","avere","Lavorare usa avere: ho."],
["f","Noi abbiamo ___ una pizza. (mangiare)","mangiato","particípio","-are → -ato."],
["f","Hai ___ bene? (dormire)","dormito","particípio","-ire → -ito."],
["f","Che cosa hai ___ ieri? (fare)","fatto","irregular","Fare → fatto."],
["f","Ho ___ un bel film. (vedere)","visto","irregular","Vedere → visto."],
["f","Ho ___ una mail al capo. (scrivere)","scritto","irregular","Scrivere → scritto."],
["f","Abbiamo ___ il treno delle otto. (prendere)","preso","irregular","Prendere → preso."],
["f","Loro ___ venduto la casa.","hanno","avere","Loro hanno."],
["m","Non ho ___ finito.","ancora|già|fa|mai più","Non… ancora = ainda não."],
["m","Ho comprato la macchina due anni ___.","fa|da|tra|per","Tempo atrás: … fa."],
["m","Chi ha ___ la finestra? (aprire)","aperto|aprito|aprato|aputo","Aprire → aperto."],
["x","Marque a frase correta","Ieri ho letto un libro.|Ieri ho leggito un libro.|Ieri sono letto un libro.|Ieri ho leggiuto un libro.","Leggere → letto, com avere."]]});

COURSE.push({id:"a2-2",lvl:"A2",n:2,t:"In viaggio",sub:"Viagens, trem e hotel — passato prossimo com essere",
voc:[["il viaggio","a viagem"],["la valigia","a mala"],["il biglietto","o bilhete"],["andata e ritorno","ida e volta"],["il binario","a plataforma"],["in ritardo","atrasado"],["in orario","no horário"],["la prenotazione","a reserva"],["prenotare","reservar"],["l'albergo","o hotel"],["la camera singola","o quarto de solteiro"],["la camera doppia","o quarto de casal"],["arrivare","chegar"],["partire","partir"],["tornare","voltar"],["salire","subir / embarcar"],["scendere","descer"],["restare","ficar"],["nascere","nascer"],["diventare","tornar-se"],["la stazione","a estação"],["la coincidenza","a conexão (trem)"]],
gram:[
{h:"Avere ou essere?",html:`
${IG.box("Qual auxiliar usar",IG.cmp([{h:"avere — a maioria",items:["verbos com objeto direto: "+it("ho comprato un biglietto"),"atividades: "+it("ho dormito, ho lavorato, ho viaggiato"),"o particípio <b>não muda</b>"]},{h:"essere — movimento e mudança",items:["ir/vir: "+it("andare, venire, arrivare, partire, tornare, uscire, entrare, salire, scendere"),"ficar/mudar: "+it("stare, restare, rimanere, diventare, nascere, morire"),"todos os <b>reflexivos</b>: "+it("mi sono alzato"),"o particípio <b>concorda</b> com o sujeito"]}]),"Teste rápido: dá para perguntar \"o quê?\" depois do verbo? Então é avere.")}
${IG.box("Com essere o particípio concorda",IG.eq(["[Marco] + [è] + [andat]{o}","[Giulia] + [è] + [andat]{a}","[Marco e Luca] + [sono] + [andat]{i}","[Anna e Sara] + [sono] + [andat]{e}"]))}
${IG.ex([["Siamo partiti alle sei e siamo arrivati a Roma alle dieci.","Partimos às seis e chegamos a Roma às dez."],["Giulia è nata a Napoli.","Giulia nasceu em Nápoles."],["Il treno è arrivato in ritardo.","O trem chegou atrasado."]])}`},
{h:"Reflexivos e modais no passado",html:`
${IG.box("Reflexivos: sempre essere",IG.conj([{v:"alzarsi",f:"mi_sono_|alzato/a ti_sei_|alzato/a si_è_|alzato/a ci_siamo_|alzati/e vi_siete_|alzati/e si_sono_|alzati/e"}]))}
${IG.box("Modais: o auxiliar do verbo principal",IG.eq(["[ho dovuto] + {lavorare} ((lavorare usa avere))","[sono dovuto] + {partire} ((partire usa essere))"]),"Na fala, avere com todos os modais também é aceito.")}
${IG.ex([["Stamattina mi sono svegliato tardi.","Hoje de manhã acordei tarde."],["Ci siamo divertiti molto in vacanza.","Nos divertimos muito nas férias."]])}`}],
ex:[
["f","Maria ___ andata a Roma.","è","essere","Andare usa essere."],
["f","I clienti sono ___ tardi. (arrivare)","arrivati","concordância","Masculino plural: -i."],
["f","Le ragazze sono ___ alle dieci. (uscire)","uscite","concordância","Feminino plural: -e."],
["f","Noi ___ rimasti a casa.","siamo","essere","Rimanere usa essere."],
["f","Io ___ comprato il biglietto.","ho","avere","Comprare tem objeto: avere."],
["f","Giulia è ___ a Napoli. (nascere)","nata","particípio","Nascere → nato/nata."],
["f","Stamattina mi ___ alzato presto.","sono","reflexivo","Reflexivos usam essere."],
["f","Ci siamo ___ molto. (divertirsi)","divertiti","reflexivo","Noi (grupo misto) → -i."],
["m","Il film ___ durato tre ore.","è|ha|hai|sono","Durare usa essere."],
["m","Ieri ___ viaggiato tutto il giorno.","ho|sono|è|mi sono","Viaggiare usa avere."],
["m","Anna, a che ora sei ___?","tornata|tornato|tornati|tornate","Anna: feminino singular."],
["x","Marque a frase correta","Siamo partiti alle sei.|Abbiamo partito alle sei.|Siamo partito alle sei.|Siamo partire alle sei.","Partire usa essere e concorda."]]});

COURSE.push({id:"a2-3",lvl:"A2",n:3,t:"Fare la spesa",sub:"Supermercado e embalagens — pronomes diretos, ne, ce l'ho",
voc:[["il supermercato","o supermercado"],["il carrello","o carrinho"],["la cassa","o caixa"],["lo scontrino","o cupom fiscal"],["la bottiglia","a garrafa"],["il barattolo","o pote"],["la scatola","a caixa"],["il vasetto","o potinho"],["la lattina","a lata"],["il pacchetto","o pacote"],["un litro di","um litro de"],["mezzo chilo","meio quilo"],["fresco","fresco"],["in offerta","em promoção"],["quanto ne vuole?","quanto o senhor quer (disso)?"],["ne vorrei due","queria dois (disso)"],["ce l'ho","eu tenho (isso)"],["altro?","mais alguma coisa?"],["basta così","só isso"],["comprare","comprar"],["prendere","pegar / levar"]],
gram:[
{h:"Pronomes diretos",html:`
<p>Substituem o objeto direto e vêm <b>antes do verbo conjugado</b>.</p>
${IG.box("Quem ou o quê?",IG.cards([{h:"mi",p:"me"},{h:"ti",p:"te"},{h:"lo",p:"o (masc.)"},{h:"la",p:"a (fem.) · La = o senhor"},{h:"ci",p:"nos"},{h:"vi",p:"vos / vocês"},{h:"li",p:"os"},{h:"le",p:"as"}]))}
${IG.box("O pronome substitui o objeto",IG.eq(["[Compro] {il latte} → {Lo} [compro]","[Prendo] {le mele} → {Le} [prendo]","[Vuoi] {i biscotti}? → Sì, {li} [voglio]","[Posso] [pagar]{la}? ((com infinitivo pode grudar no fim))"]))}
${IG.box("No passato prossimo: lo/la + avere = l'",IG.eq(["Hai comprato [la pasta]? → Sì, {l'}ho comprat{a}","Hai visto [i ragazzi]? → Sì, {li} ho vist{i}"]),"Com lo, la, li, le o particípio concorda com o pronome.")}`},
{h:"Ne e ce l'ho",html:`
${IG.box("Ne = disso (quantidade)",IG.eq(["Quanti pomodori vuole? → {Ne} vorrei [un chilo]","Quante mele hai? → {Ne} ho [tre]","Non {ne} ho [nessuna] ((nenhuma))"]),"Use ne quando você diz uma <b>quantidade</b>; use lo/la/li/le para o objeto inteiro.")}
${IG.box("Avere + objeto: ce l'ho",IG.decide([["masc. sing.","ce l'ho","Hai il biglietto? — Sì, ce l'ho."],["fem. sing.","ce l'ho","Hai la chiave? — No, non ce l'ho."],["masc. pl.","ce li ho","Hai i soldi? — Ce li ho."],["fem. pl.","ce le ho","Hai le borse? — Ce le ho."]],["Objeto","Forma","Exemplo"]))}
${IG.ex([["Il latte lo prendo io.","O leite eu pego."],["Mozzarella? Ne vorrei due.","Muçarela? Queria duas."],["Hai lo scontrino? — Sì, ce l'ho.","Você está com o cupom? — Sim, estou."]])}`}],
ex:[
["f","Il pane? ___ compro io.","lo","pronome","Il pane (masc.) → lo."],
["f","La frutta? ___ prendo al mercato.","la","pronome","La frutta (fem.) → la."],
["f","I biscotti? ___ mangio tutti.","li","pronome","I biscotti → li."],
["f","Le mele? ___ compro domani.","le","pronome","Le mele → le."],
["f","Quante bottiglie vuole? ___ vorrei tre.","ne","ne","Quantidade: ne."],
["f","Hai la chiave? — Sì, ce ___ ho.","l'","ce l'ho","Ce l'ho."],
["f","La pasta? L'ho ___ ieri. (comprare)","comprata","concordância","La → particípio no feminino."],
["f","Marco ___ chiama ogni sera. (me)","mi","pronome","Me = mi."],
["m","Quanto formaggio? ___ vorrei un etto.","Ne|Lo|Ce|Li","Quantidade parcial: ne."],
["m","Hai i soldi? — Sì, ___.","ce li ho|ce l'ho|li ho ce|ne ho li","Masculino plural: ce li ho."],
["m","Le ragazze? Le ho ___ ieri.","viste|visto|visti|vista","Le → particípio feminino plural."],
["x","Marque a frase correta","Il giornale lo leggo ogni giorno.|Il giornale leggo lo ogni giorno.|Il giornale la leggo ogni giorno.|Il giornale ne leggo ogni giorno.","Objeto inteiro masc.: lo antes do verbo."]]});

COURSE.push({id:"a2-4",lvl:"A2",n:4,t:"Regali e auguri",sub:"Festas, presentes e convites — pronomes indiretos e combinados",
voc:[["il regalo","o presente"],["regalare","presentear"],["fare gli auguri","dar os parabéns"],["tanti auguri!","parabéns!"],["buon compleanno!","feliz aniversário!"],["la festa","a festa"],["invitare","convidar"],["l'invito","o convite"],["mandare","mandar"],["prestare","emprestar"],["telefonare","telefonar"],["scrivere","escrever"],["dare","dar"],["il mazzo di fiori","o buquê de flores"],["il dolce","o doce, a sobremesa"],["la sorpresa","a surpresa"],["festeggiare","comemorar"],["il Natale","o Natal"],["il Capodanno","o Ano-Novo"],["la Pasqua","a Páscoa"]],
gram:[
{h:"Pronomes indiretos",html:`
<p>Respondem a <b>"a quem?"</b>: ${it("Scrivo a Marco")} → ${it("Gli scrivo")}.</p>
${IG.box("Direto × indireto",IG.cmp([{h:"diretos (o quê / quem?)",items:[it("mi, ti, lo, la, ci, vi, li, le")]},{h:"indiretos (a quem?)",items:[it("mi, ti, gli (a lui), le (a lei), Le (ao senhor), ci, vi, gli (a loro)")]}]),"Só a 3ª pessoa muda: <b>gli</b> = a ele / a eles, <b>le</b> = a ela.")}
${IG.box("Do substantivo ao pronome",IG.eq(["[Telefono] {a Marco} → {Gli} telefono","[Regalo un libro] {a Giulia} → {Le} regalo un libro","[Scrivo] {ai nonni} → {Gli} scrivo","[Signora,] {Le} [mando la mail] ((formal))"]))}
${IG.ex([["Cosa regali a tua madre? — Le regalo dei fiori.","O que você vai dar para sua mãe? — Vou dar flores para ela."],["Ti piace il regalo?","Você gosta do presente?"],["Gli ho mandato un messaggio.","Mandei uma mensagem para ele."]])}`},
{h:"Pronomes combinados",html:`
<p>Quando indireto e direto aparecem juntos, o indireto vem primeiro e o <b>i</b> vira <b>e</b>.</p>
${IG.box("Indireto + direto",IG.eq(["[mi] + [lo] = me lo","[ti] + [la] = te la","[ci] + [li] = ce li","[gli / le] + [lo] = glielo ((a ele, a ela, ao senhor))"]))}
${IG.ex([["Il libro? Te lo presto domani.","O livro? Te empresto amanhã."],["La torta? Gliela porto io.","O bolo? Eu levo para ela."],["Mi dai il numero? — Sì, te lo do.","Me dá o número? — Sim, te dou."]])}`}],
ex:[
["f","Telefono a Marco → ___ telefono.","gli","a lui","A ele: gli."],
["f","Scrivo a Giulia → ___ scrivo.","le","a lei","A ela: le."],
["f","Signor Rossi, ___ mando la mail oggi. (ao senhor)","Le","formal","Ao senhor: Le."],
["f","Ai nonni? ___ ho mandato una cartolina.","gli","a loro","A eles: gli."],
["f","Il libro? Te ___ presto.","lo","combinado","Il libro → lo: te lo."],
["f","La torta? ___ porto io. (a lei + la)","gliela","combinado","le + la = gliela."],
["f","Mi dai le chiavi? — Sì, ___ le do. (a te)","te","combinado","ti + le = te le."],
["m","A mia madre ___ piacciono i fiori.","le|gli|la|lei","A lei = le."],
["m","Cosa regali a Paolo? ___ regalo un libro.","Gli|Lo|Le|Li","A ele: gli."],
["m","Il regalo? Me ___ hai già dato!","l'|lo|ne|li","Me lo + ha → me l'hai."],
["m","'Buon compleanno' si risponde con:","Grazie!|Prego!|Crepi!|Altrettanto!","Agradece-se: grazie."],
["x","Marque a frase correta","Gli ho scritto una lettera.|Lo ho scritto una lettera.|Le ho scritto a lui una lettera.|Gli ho scritta una lettera.","A ele = gli; particípio com avere não muda."]]});

COURSE.push({id:"a2-5",lvl:"A2",n:5,t:"Quando ero piccolo",sub:"Infância e lembranças — imperfetto e passato prossimo",
voc:[["da bambino","quando criança (m.)"],["da bambina","quando criança (f.)"],["l'infanzia","a infância"],["ricordare","lembrar"],["il ricordo","a lembrança"],["giocare","brincar / jogar"],["il giocattolo","o brinquedo"],["la scuola elementare","a escola primária"],["il maestro","o professor (primário)"],["abitare in campagna","morar no interior"],["ogni estate","todo verão"],["di solito","geralmente"],["sempre","sempre"],["mentre","enquanto"],["una volta","uma vez / antigamente"],["timido","tímido"],["vivace","agitado / vivaz"],["crescere","crescer"],["il quartiere","o bairro"],["la nonna","a avó"]],
gram:[
{h:"Formas do imperfetto",html:`
${IG.box("Radical + v + terminação",IG.conj([{v:"parlare",f:"parla|vo parla|vi parla|va parla|vamo parla|vate parla|vano"},{v:"avere",f:"ave|vo ave|vi ave|va ave|vamo ave|vate ave|vano"},{v:"dormire",f:"dormi|vo dormi|vi dormi|va dormi|vamo dormi|vate dormi|vano"}]),"É o tempo mais regular do italiano.")}
${IG.box("Os irregulares",IG.conj([{v:"essere",f:"ero eri era eravamo eravate erano"},{v:"fare",f:"face|vo face|vi face|va face|vamo face|vate face|vano"},{v:"bere",f:"beve|vo beve|vi beve|va beve|vamo beve|vate beve|vano"},{v:"dire",f:"dice|vo dice|vi dice|va dice|vamo dice|vate dice|vano"}]))}`},
{h:"Imperfetto × passato prossimo",html:`
${IG.box("Cenário × acontecimento",IG.tl([{at:.05,to:.5,it:"pioveva, leggevo",pt:"cenário / ação em curso"},{at:.3,it:"è suonato il telefono",pt:"fato pontual"}]),"O imperfetto é o pano de fundo (\"chovia, eu lia\"); o passato prossimo é o que aconteceu (\"o telefone tocou\").")}
${IG.box("Quando usar cada um",IG.cmp([{h:"imperfetto",items:["hábito no passado: "+it("ogni estate andavamo al mare"),"descrição: "+it("era alto, aveva gli occhi verdi"),"ação em curso: "+it("mentre lavoravo…"),"idade, hora, tempo: "+it("avevo dieci anni, erano le otto")]},{h:"passato prossimo",items:["ação concluída: "+it("ieri sono andato al mare"),"fato pontual: "+it("è suonato il telefono"),"número definido de vezes: "+it("sono stato a Roma tre volte")]}]))}
${IG.ex([["Da bambino abitavo in campagna e giocavo sempre fuori.","Quando criança eu morava no interior e brincava sempre lá fora."],["Mentre cucinavo, è arrivata mia sorella.","Enquanto eu cozinhava, minha irmã chegou."],["Avevo vent'anni quando ho cominciato l'università.","Eu tinha vinte anos quando comecei a faculdade."]])}`}],
ex:[
["f","Da bambino ___ a calcio ogni giorno. (giocare, io)","giocavo","imperfetto","Hábito: giocavo."],
["f","Mia nonna ___ molto gentile. (essere)","era","imperfetto","Essere: era."],
["f","Noi ___ al mare ogni estate. (andare)","andavamo","imperfetto","Hábito: andavamo."],
["f","Che cosa ___ da piccolo? (fare, tu)","facevi","imperfetto","Fare → facevi."],
["f","Loro ___ in un piccolo paese. (abitare)","abitavano","imperfetto","-are → -avano."],
["f","Mentre ___ , è suonato il telefono. (dormire, io)","dormivo","imperfetto","Ação em curso: dormivo."],
["f","___ dieci anni quando ho imparato a nuotare. (avere, io)","avevo","imperfetto","Idade: avevo."],
["m","Ieri ___ in centro con Marco.","sono andato|andavo|vado|andrò","Ação concluída, ontem: passato prossimo."],
["m","Quando ero piccolo, ___ sempre i cartoni.","guardavo|ho guardato|guardo|guarderò","Hábito: imperfetto."],
["m","Mentre leggevo, mia madre ___.","è entrata|entrava|entra|entrerà","Fato pontual: passato prossimo."],
["m","Che tempo ___ ieri? — Pioveva.","faceva|ha fatto|fa|farà","Descrição do tempo: faceva."],
["x","Marque a frase correta","Era una bella giornata e c'era il sole.|È stata una bella giornata e c'è stato il sole ogni giorno.|Ero una bella giornata.|Era una bella giornata e c'erava il sole.","Descrição: imperfetto (era, c'era)."]]});

COURSE.push({id:"a2-6",lvl:"A2",n:6,t:"Progetti e vacanze",sub:"Planos, previsões e o tempo — futuro semplice e o 'se' do futuro",
voc:[["le vacanze","as férias"],["il mare","o mar / a praia"],["la montagna","a montanha"],["la gita","o passeio"],["prenotare","reservar"],["il programma","o programa, o plano"],["che tempo fa?","como está o tempo?"],["fa bel tempo","o tempo está bom"],["fa caldo","está calor"],["fa freddo","está frio"],["piove","chove"],["nevica","neva"],["c'è il sole","está sol"],["nuvoloso","nublado"],["le previsioni del tempo","a previsão do tempo"],["domani","amanhã"],["dopodomani","depois de amanhã"],["la settimana prossima","a semana que vem"],["l'anno prossimo","o ano que vem"],["tra un mese","daqui a um mês"],["promettere","prometer"]],
gram:[
{h:"Futuro semplice",html:`
${IG.box("Infinitivo sem -e + terminação",IG.eq(["[parl]{are} → [parler] + {ò} = parlerò ((-are vira -er-))","[prender] + {ai} = prenderai","[partir] + {emo} = partiremo"]))}
${IG.box("Terminações iguais nos três grupos",IG.conj([{v:"parlare",f:"parler|ò parler|ai parler|à parler|emo parler|ete parler|anno"},{v:"prendere",f:"prender|ò prender|ai prender|à prender|emo prender|ete prender|anno"},{v:"partire",f:"partir|ò partir|ai partir|à partir|emo partir|ete partir|anno"}]))}
${IG.box("Radicais irregulares",IG.cards([{h:"essere → sarò",p:"serei"},{h:"avere → avrò",p:"terei"},{h:"andare → andrò",p:"irei"},{h:"fare → farò",p:"farei"},{h:"venire → verrò",p:"virei"},{h:"volere → vorrò",p:"quererei"},{h:"potere → potrò",p:"poderei"},{h:"dovere → dovrò",p:"deverei"},{h:"vedere → vedrò",p:"verei"},{h:"stare → starò",p:"estarei"},{h:"bere → berrò",p:"beberei"},{h:"rimanere → rimarrò",p:"ficarei"}]),"Ortografia: cercherò, pagherò (h); mangerò, comincerò (sem i).")}`},
{h:"Usos do futuro",html:`
${IG.box("Para que serve",IG.cards([{h:"Domani pioverà.",p:"previsão"},{h:"Ti chiamerò stasera.",p:"promessa"},{h:"L'anno prossimo andrò in Italia.",p:"plano"},{h:"Sarà a casa.",p:"suposição: deve estar em casa"}]))}
${IG.box("Se e quando com futuro",IG.eq(["[Se] {farà} bel tempo, + {andremo} al mare ((se fizer…, iremos))","[Quando] {arriverò}, + ti {chiamerò} ((quando eu chegar…))"]),"O português usa o futuro do subjuntivo (\"se fizer, quando chegar\"); o italiano usa o futuro normal. Na fala também vale o presente: Se fa bel tempo, andiamo al mare.")}
${IG.ex([["La settimana prossima andremo in montagna.","Semana que vem iremos à montanha."],["Domani farà freddo e nevicherà.","Amanhã vai fazer frio e nevar."],["Dov'è Paolo? — Non so, sarà in ufficio.","Onde está Paolo? — Não sei, deve estar no escritório."]])}`}],
ex:[
["f","Domani io ___ a Milano. (andare)","andrò","irregular","Andare → andrò."],
["f","Tu ___ alla riunione? (essere)","sarai","irregular","Essere → sarai."],
["f","Noi ___ il treno delle nove. (prendere)","prenderemo","futuro","prender + emo."],
["f","Loro ___ tempo domani? (avere)","avranno","irregular","Avere → avranno."],
["f","Io ___ con il cliente. (parlare)","parlerò","futuro","-are → -erò."],
["f","Noi ___ con la carta. (pagare)","pagheremo","ortografia","-gare: pagheremo."],
["f","Se ___ bel tempo, andremo al mare. (fare)","farà","se + futuro","Se farà bel tempo."],
["f","Quando ___ a Roma, ti chiamerò. (arrivare, io)","arriverò","quando + futuro","Quando arriverò."],
["m","Che tempo fa? — ___ , prendi l'ombrello!","Piove|Fa caldo|C'è il sole|Fa bel tempo","Ombrello = guarda-chuva: piove."],
["m","Lei ___ venire con noi? (potere)","potrà|poterà|potrebbe|potè","Potere → potrà."],
["m","Che ore sono? — Non ho l'orologio, ___ le tre.","saranno|sono state|erano|sarebbero","Suposição: saranno."],
["x","Marque a frase correta","L'anno prossimo verrò in Italia.|L'anno prossimo venirò in Italia.|L'anno prossimo vengerò in Italia.|L'anno prossimo verrà io in Italia.","Venire → verrò."]]});

COURSE.push({id:"a2-7",lvl:"A2",n:7,t:"Andiamo a fare spese",sub:"Roupas, tamanhos e pagamento — ci, volerci e si impersonale",
voc:[["la taglia","o tamanho (roupa)"],["il numero","o número (calçado)"],["provare","experimentar"],["il camerino","o provador"],["stretto","apertado"],["largo","folgado"],["la giacca","o paletó / a jaqueta"],["la camicia","a camisa"],["i pantaloni","a calça"],["le scarpe","os sapatos"],["la gonna","a saia"],["il cappotto","o casaco"],["i saldi","a liquidação"],["lo sconto","o desconto"],["pagare in contanti","pagar em dinheiro"],["pagare con la carta","pagar com cartão"],["che taglia porta?","que tamanho o senhor usa?"],["mi sta bene","fica bem em mim"],["costare","custar"],["la commessa","a vendedora"]],
gram:[
{h:"Ci de lugar e volerci",html:`
${IG.box("Ci = lá, nisso",IG.eq(["Vai {al centro}? → Sì, {ci} vado ((ci = lá))","Pensi {al regalo}? → Sì, {ci} penso ((ci = nisso))","Sei mai stato {a Milano}? → No, non {ci} sono mai stato"]))}
${IG.box("Quanto tempo leva?",IG.eq(["[Ci vuole] + {un'ora} ((singular))","[Ci vogliono] + {due ore} ((plural))"]),"Volerci = ser necessário. Concorda com o que é necessário.")}
${IG.ex([["Per arrivare al centro ci vogliono venti minuti.","Para chegar ao centro levam vinte minutos."],["Al negozio? Ci vado domani.","Na loja? Vou lá amanhã."]])}`},
{h:"Si impersonale",html:`
<p>Para regras e o que "se faz" em geral: <b>si + verbo na 3ª pessoa</b>.</p>
${IG.box("Uma pessoa qualquer",IG.eq(["[si] + {può} + pagare con la carta? ((pode-se…))","[si] + {vende} + {una casa} ((singular))","[si] + {vendono} + {scarpe} ((plural))"]))}
${IG.ex([["In Italia si mangia bene.","Na Itália se come bem."],["Qui non si può fumare.","Aqui não se pode fumar."],["Si paga alla cassa.","Paga-se no caixa."]])}`},
{h:"Reflexivos recíprocos",html:`${IG.box("Um ao outro",IG.eq(["[Marco ama Anna] + [Anna ama Marco] = Marco e Anna {si amano}","[Ci] + [vediamo] = Ci vediamo domani! ((a gente se vê))"]))}`}],
ex:[
["f","Vai in centro? Sì, ___ vado alle tre.","ci","ci","Ci = lá."],
["f","Per Roma ___ vogliono tre ore.","ci","volerci","Ci vogliono."],
["f","Ci ___ un'ora. (volerci)","vuole","volerci","Singular: ci vuole."],
["f","Qui ___ parla italiano.","si","impersonale","Si impersonale."],
["f","Si ___ pagare con la carta? (potere)","può","impersonale","Si può."],
["f","In questo negozio si ___ scarpe. (vendere)","vendono","impersonale","Scarpe é plural: si vendono."],
["f","Marco e Giulia ___ sposano a maggio.","si","recíproco","Si sposano."],
["m","Che taglia ___? (formal)","porta|porti|portate|portiamo","Lei porta."],
["m","Questa giacca è troppo ___, mi serve una taglia più grande.","stretta|larga|lunga|economica","Apertada → tamanho maior."],
["m","Ci ___ due ore per finire.","vogliono|vuole|vuoi|volete","Due ore (plural): ci vogliono."],
["m","Pago ___ contanti.","in|con|a|per","Pagare in contanti."],
["x","Marque a frase correta","Ci vediamo domani!|Si vediamo domani!|Vi vediamo domani!|Ci vediamo domani noi stessi!","Noi recíproco: ci vediamo."]]});

COURSE.push({id:"a2-8",lvl:"A2",n:8,t:"Al ristorante",sub:"Menu, pedidos e receitas — imperativo",
voc:[["il menù","o cardápio"],["l'antipasto","a entrada"],["il primo","o primeiro prato (massa, risoto)"],["il secondo","o segundo prato (carne, peixe)"],["il contorno","o acompanhamento"],["il dolce","a sobremesa"],["il cameriere","o garçom"],["prenotare un tavolo","reservar uma mesa"],["il conto, per favore","a conta, por favor"],["cuocere","cozinhar (no fogo)"],["tagliare","cortar"],["mescolare","misturar"],["aggiungere","acrescentar"],["versare","despejar"],["bollire","ferver"],["la pentola","a panela"],["la padella","a frigideira"],["il cucchiaio","a colher"],["il coltello","a faca"],["assaggiare","provar (comida)"]],
gram:[
{h:"Imperativo: tu, noi, voi",html:`
${IG.box("Dar ordens e instruções",IG.conj([{v:"parlare",f:"parl|a! parl|iamo! parl|ate!"},{v:"prendere",f:"prend|i! prend|iamo! prend|ete!"},{v:"sentire",f:"sent|i! sent|iamo! sent|ite!"}],["tu","noi","voi"]),"Só o <b>tu</b> dos verbos em -are muda (-a). Os demais são iguais ao presente.")}
${IG.box("Negativo",IG.eq(["[tu]: {non} + [infinitivo] = Non parlare! ((não fale))","[voi]: {non} + [presente] = Non parlate!"]))}
${IG.box("Irregulares de tu",IG.cards([{h:"fare → fa' / fai",p:"faz"},{h:"andare → va' / vai",p:"vai"},{h:"dare → da' / dai",p:"dá"},{h:"stare → sta' / stai",p:"fica"},{h:"dire → di'",p:"diz"},{h:"essere → sii",p:"seja"},{h:"avere → abbi",p:"tenha"}]))}`},
{h:"Imperativo com pronomes e formal",html:`
${IG.box("O pronome gruda no fim",IG.eq(["[Prendi] + [lo] = Prendilo! ((pega-o))","[Mangiamo] + [la] = Mangiamola!","[Di'] + [mi] = Dimmi! ((monossílabo dobra a consoante))","[Fa'] + [lo] = Fallo!"]))}
${IG.box("Formal (Lei): o pronome vem antes",IG.cmp([{h:"tu",items:[it("Scusa!"),it("Senti!"),it("Prendi!"),it("Vieni!")]},{h:"Lei",items:[it("Scusi!"),it("Senta!"),it("Prenda!"),it("Venga!")]}]))}
${IG.ex([["Taglia le cipolle e aggiungi l'olio.","Corte as cebolas e acrescente o azeite."],["Non mangiare troppo!","Não coma demais!"],["Scusi, ci porta il conto?","Com licença, nos traz a conta?"],["Assaggialo, è buonissimo!","Prove, está ótimo!"]])}`}],
ex:[
["f","Marco, ___ la finestra! (aprire, tu)","apri","imperativo","-ire, tu: apri."],
["f","___ le cipolle! (tagliare, tu)","taglia","imperativo","-are, tu: -a."],
["f","Ragazzi, ___ la pasta! (mangiare, voi)","mangiate","imperativo","Voi = presente."],
["f","Non ___ ! (parlare, tu, negativo)","parlare","negativo","Tu negativo: non + infinitivo."],
["f","___ l'olio e mescola. (aggiungere, tu)","aggiungi","imperativo","-ere, tu: -i."],
["f","Il libro? ___! (prendere + lo)","prendilo","pronome","Prendi + lo = prendilo."],
["f","Scusi, ___ pure! (entrare, Lei)","entri","formal","Lei: -are → -i."],
["m","___ la verità! (dire, tu)","Di'|Dici|Dica|Dire","Dire, tu: di'."],
["m","Dimmi = …","di' + mi|dimmi è un nome|dire + mi|dici + mi","Di' + mi dobra o m."],
["m","O prato de massa no menu italiano é o…","primo|secondo|contorno|antipasto","Primo = massa, risoto, sopa."],
["m","Signora, ___ un momento! (aspettare, Lei)","aspetti|aspetta|aspettate|aspettare","Lei: aspetti."],
["x","Marque a frase correta","Non toccare il forno!|Non tocca il forno!|Non tocchi tu il forno!|Tocca non il forno!","Tu negativo: non + infinitivo."]]});

COURSE.push({id:"a2-9",lvl:"A2",n:9,t:"Salute e benessere",sub:"Corpo, sintomas e médico — comparativos, superlativos e advérbios",
voc:[["la testa","a cabeça"],["la gola","a garganta"],["la schiena","as costas"],["lo stomaco","o estômago"],["il braccio (le braccia)","o braço (os braços)"],["la gamba","a perna"],["il piede","o pé"],["mi fa male…","me dói…"],["ho mal di testa","estou com dor de cabeça"],["la febbre","a febre"],["il raffreddore","o resfriado"],["la tosse","a tosse"],["il medico","o médico"],["la ricetta","a receita"],["la farmacia","a farmácia"],["la medicina","o remédio"],["stare meglio","sentir-se melhor"],["riposare","descansar"],["guarire","sarar"],["sano","saudável"]],
gram:[
{h:"Comparativos",html:`
${IG.box("Mais, menos, tão",IG.eq(["[Roma è] + {più} + grande + {di} + Firenze ((maior que))","[Il treno è] + {meno} + caro + {dell'}aereo ((menos caro que))","[Marco è alto] + {come} + suo padre ((tão alto quanto))"]),"Entre dois adjetivos, verbos ou quantidades, use <b>che</b>: <i class='it'>è più facile che difficile</i>.")}
${IG.box("Irregulares",IG.cmp([{h:"adjetivos",items:[it("buono → migliore")+" (melhor)",it("cattivo → peggiore")+" (pior)"]},{h:"advérbios",items:[it("bene → meglio")+" (melhor)",it("male → peggio")+" (pior)"]}]),"<i class='it'>Oggi sto meglio</i> (advérbio) · <i class='it'>questo vino è migliore</i> (adjetivo).")}`},
{h:"Superlativos e advérbios em -mente",html:`
${IG.box("Do mais fraco ao mais forte",IG.scale([["stanco",40,"cansado"],["molto stanco",65,"muito cansado"],["stanchissimo",88,"cansadíssimo"],["il più stanco di tutti",100,"o mais cansado de todos"]]))}
${IG.box("Formar advérbios",IG.eq(["[lent]{a} + {mente} = lentamente ((feminino + mente))","[facil]{e} + {mente} = facilmente ((-le perde o e))","[regolar]{e} + {mente} = regolarmente"]))}
${IG.ex([["Il dottore dice che devo riposare di più.","O médico diz que preciso descansar mais."],["Oggi sto molto meglio, grazie.","Hoje estou muito melhor, obrigado."],["È il farmaco più efficace che ci sia.","É o remédio mais eficaz que existe."]])}`}],
ex:[
["f","Roma è più grande ___ Firenze.","di","comparativo","Più … di."],
["f","Il treno è meno caro ___ aereo. (di + l')","dell'","comparativo","di + l' = dell'."],
["f","Marco è alto ___ suo padre. (tanto quanto)","come","igualdade","come = quanto."],
["f","Oggi mi sento ___ di ieri. (bene, comparativo)","meglio","irregular","Bene → meglio."],
["f","Questo vino è ___ di quello. (buono, comparativo)","migliore","irregular","Buono → migliore."],
["f","Sono ___ ! (stanco, superlativo absoluto)","stanchissimo","superlativo","-co → -chissimo."],
["f","Parla ___ . (lento → advérbio)","lentamente","advérbio","lenta + mente."],
["m","Mi fa male la ___. (garganta)","gola|testa|schiena|gamba","Gola = garganta."],
["m","È più facile ___ difficile.","che|di|come|del","Dois adjetivos: che."],
["m","Plurale di 'il braccio':","le braccia|i bracci|le bracce|i braccii","Irregular: le braccia."],
["m","Ho la ___: 38 gradi!","febbre|tosse|ricetta|gola","38 graus = febre."],
["x","Marque a frase correta","Sto meglio, grazie.|Sto migliore, grazie.|Sto più bene, grazie.|Sto meglio di bene.","Com stare (advérbio): meglio."]]});

COURSE.push({id:"a2-10",lvl:"A2",n:10,t:"Lavoro e desideri",sub:"Trabalho, e-mails formais e desejos — condizionale e pronomes relativos",
voc:[["il colloquio","a entrevista"],["il curriculum","o currículo"],["l'esperienza","a experiência"],["l'azienda","a empresa"],["il collega","o colega"],["il capo","o chefe"],["la riunione","a reunião"],["la scadenza","o prazo"],["il progetto","o projeto"],["il cantiere","o canteiro de obras"],["il sopralluogo","a vistoria"],["il preventivo","o orçamento"],["la relazione","o relatório"],["allegare","anexar"],["gentile dottore","prezado doutor"],["cordiali saluti","cordialmente"],["mi piacerebbe","eu gostaria"],["il sogno","o sonho"],["cambiare lavoro","mudar de emprego"],["lo stipendio","o salário"]],
gram:[
{h:"Condizionale semplice",html:`
${IG.box("Mesmo radical do futuro + terminação",IG.eq(["[parler] + {ei} = parlerei ((eu falaria))","[sar] + {ebbe} = sarebbe ((seria))","[vorr] + {ei} = vorrei ((eu gostaria))"]))}
${IG.box("Formas",IG.conj([{v:"parlare",f:"parler|ei parler|esti parler|ebbe parler|emmo parler|este parler|ebbero"},{v:"potere",f:"potr|ei potr|esti potr|ebbe potr|emmo potr|este potr|ebbero"},{v:"essere",f:"sar|ei sar|esti sar|ebbe sar|emmo sar|este sar|ebbero"}]))}
${IG.box("Para que serve",IG.cards([{h:"Vorrei un caffè.",p:"pedido educado"},{h:"Potrebbe aiutarmi?",p:"pergunta cortês"},{h:"Dovresti riposare.",p:"conselho"},{h:"Mi piacerebbe vivere in Italia.",p:"desejo"}]))}`},
{h:"Pronomes relativos: che e cui",html:`
${IG.box("Ligar duas frases",IG.eq(["Ho un collega. + Il collega parla cinese. → Ho un collega {che} parla cinese.","Questo è il progetto. + Ti ho parlato del progetto. → È il progetto {di cui} ti ho parlato."]),"<b>che</b> = sujeito ou objeto direto (nunca com preposição). <b>cui</b> = depois de preposição: <i class='it'>di cui, a cui, con cui, in cui</i>.")}
${IG.ex([["Gentile dottor Rossi, Le invio in allegato il preventivo.","Prezado Dr. Rossi, envio em anexo o orçamento."],["Potrebbe mandarmi la relazione entro venerdì?","O senhor poderia me enviar o relatório até sexta?"],["La ditta con cui lavoriamo è di Milano.","A empresa com que trabalhamos é de Milão."]])}`}],
ex:[
["f","___ un caffè, per favore. (volere, io)","vorrei","condizionale","Volere → vorrei."],
["f","___ aiutarmi? (potere, Lei)","potrebbe","condizionale","Lei: potrebbe."],
["f","Mi ___ lavorare in Italia. (piacere)","piacerebbe","condizionale","Piacere → piacerebbe."],
["f","Tu ___ riposare di più. (dovere, conselho)","dovresti","condizionale","Dovere → dovresti."],
["f","Noi ___ volentieri, ma non possiamo. (venire)","verremmo","condizionale","Venire → verremmo."],
["f","Ho un collega ___ parla tre lingue.","che","relativo","Sujeito: che."],
["f","È la città in ___ sono nato.","cui","relativo","Depois de preposição: cui."],
["f","Le invio ___ allegato il curriculum.","in","fórmula","In allegato = em anexo."],
["m","Fórmula final de um e-mail formal:","Cordiali saluti|Ciao ciao|Un bacio|A dopo","Cordiali saluti."],
["m","Il collega con ___ lavoro è simpatico.","cui|che|chi|quale","Com preposição: cui."],
["m","___ possibile spostare la riunione? (essere)","Sarebbe|Sarà|Era|Sia","Pedido cortês: sarebbe."],
["x","Marque a frase correta","Il progetto di cui ti ho parlato è finito.|Il progetto di che ti ho parlato è finito.|Il progetto che ti ho parlato di è finito.|Il progetto cui ti ho parlato è finito.","Parlare di → di cui."]]});
