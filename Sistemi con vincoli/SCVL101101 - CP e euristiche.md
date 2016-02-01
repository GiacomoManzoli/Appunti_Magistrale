#Lezione 11 - CP e euristiche

Il PLS ha due proprietà interessanti:

1. Ha una **transizione di fase**
2. Le distribuzioni delle prestazioni dei risolutori tendono ad avere una **coda pesante**

Per generare un PLS si possono andare a mettere dei numeri casuali all'interno delle celle.
Meno celle sono riempite, maggiori soluzioni sono possibili.

## Phase transition

Andando ad aumentare il numero di celle riempite, si arriva ad un punto in cui la probabilità di trovare una soluzione feasibile varia bruscamente.

Questo prende il nome di transizione di fase ed è molto comune nei problemi combinatorie (ovviamente su altri parametri).

**aggiungere grafici**

Di conseguenza con poche celle riempite ci sono più soluzioni pertanto è più facile trovare una soluzione.

Tuttavia risolvere il problema è facile anche se ci sono tante celle riempite perché queste fanno molta propagazione.

C'è un range di valori per i quali trovare una soluzione difficile e ricadono nella transizione di fase.

Pertanto, se un problema ha una transizione di fase, le istanze più difficili tendono ad essere vicino al punto di transizione.

La transizione di fase diepende da:

- Il problema
- L'approccio con il quale viene generata l'istanza del problema, ad esempio se si usa il riempimento casuale c'è, ma se si parte da un problema feasible e si "torna indietro" non c'è (come per la generazione del sudoku).
- Il metodo di soluzione utilizzato

##PLS e strategie di ricerca

Trovare una strategia di ricerca generale per il PLS non è semplice, utilizzare min-size-domain per scegliere la variabile da assegnare aiuta, ma è difficile andare oltre. 
Questo perché la scelta del valore dipende tanto dall'istanza.

**immagine 2**

Nel grafico le X rappresentano il numero di backtracking e le Y la dimensione del PLS.

Questo comportamento è causato dal fatto che ogni tanto l'euristica di selezione del valore/variabile esegue una scelta sbagliata all'inizio della ricerca e pertanto vengono generati tanti rami infeasible.

La cosa brutta è che questi errori tengono ad apparire in modo casuale.

Tipicamente è facile trovare una buona euristica che funziona generalmente bene, c'è però un problema con i vari tie-breaker.
Per andare a rompere questo si può andare a caso.

###Randomized Search Strategies

Questo metodo esegue una scelta casuale sia della viarabile che del valore.
Così facendo la ricerca diventa stocastica.

**grafico 3**

Dal grafico si può notare che la probabilità di risolvere un problema con pochi backtrack è molto alta, anche se rimangono delle situazioni in cui possono essere necessari motli backtrack.

Per i problemi combinatori la probabilità di dover fare tanti backtrack  è bassa ma non trascurabile.
In questo caso si dice che i problemi sono **heavy tail**, ovvero la coda della distribuzione della probabilità decade con un andamento sub-esponenziale.

La cosa importante è che è facile essere fortunati ed avere pochi backtrack, ma prima o poi ci saranno casi sfigati.

Questo vale sia per un approccio deterministico su problemi stocastici, sia con un approccio stocastico su problemi deterministici.

### Restart

Quando c'è un comportamento heavy tail, conviene effettuare un restart della ricerca dopo un tot numero di fail.

In questo modo non vengono mai raggiunti i casi in cui il numero di backtrack è troppo alto e risulta comunque vantaggioso riavviare dal momento che il numero ...

La cosa bella è che se il numero di backtrack massimi aumenta, la strategia risulta comunque completa.

Ci sono due strategie di riavvio principale:

- **Luby**: 1,1,2,1,1,2,4,1,1,2,1,1,2,4,8,...
- **Walsh**: utilizza una progressione geometrica di ragione *r* con *r* > 1 e tipicamente minore di 2.

Una modifica comune a queste due strategie di riavvio è quella di utilizzare un fattore di scala *s*.


#### Restart e problemi grandi

Per risolvere dei problemi grandi tipicamente è necessario porre un limite di tempo ottenendo un'esplorazione dell'albero di ricerca come in figura.

**immagine**

Utilizzando una ricerca casuale con riavvio è possibile esplorare l'albero in modo più uniforme:

**immagine**

Questo approccio risulta utile anche per il problemi di ottimizzazione, in quanto fornisce dei lower bound...

## Large neighborhood search

Ovvero la ricerca locale Hill climbing-like in CSP.

Il vantaggio è che nei problemi reali tipicamente le soluzioni sono "vicine" tra loro, lo svantaggio è che c'è la tendenza di incastrarsi in ottimi locali.
Ci sono varie soluzioni come la randomizzazione, simuleated annealing, algoritmi genetici ecc.

Un approccio alternativo può essere quello di andare a guardare un vicinato più grande, in modo che se l'algoritmo si incastra in un ottimo locale sia possibile vedere un altro ottimo.

In CSP questo può essere modellato andando a fissare dei valori per alcune variabili in modo da rimpicciolire lo spazio di ricerca.

... vedi slide ...

LNS ha vari vantaggi:

- Permette di implementare facilmente il grande vicinato grazie a strategie avanzate di ricerca e alla propagazione
- ...
- È più scalabile rispetto ad applicare CP sul problema completo
- Ogni sotto problema è facile da risolvere perché la propagazione sfoltisce molto il dominio delle variabili restanti.

Ci sono però degli svantaggi, infatti, LNS ha un approccio basato su eruistiche, quindi non è detto che la soluzione che trovi sia ottima e in più ci sono molti parametri da valutare. 

Alcuni di questi parametri sono la dimesione della neighborhood che tipicamente deve essere ottimizzata a mano, si cerca di scegliere una dimensione tale che porti ad avere un'esplorazione completa il 50% delle volte.

Bisogna inoltre decirede quali variabili tenere rilassate, dal momento che si potrebbe andare a tagliare dei sotto-alberi che contengono soluzioni ottime.
La scelta random tipicamente funziona bene perché porta ad un'esplorazione uniforme, tuttavia se è possibile scegliere un'approccio specifico per il problema si ottengono prestazioni migliori.
Ci sono inoltre degli approcci automatici che portano ad avere buon prestazioni.

Uno di questi, utilizzando da un solver commerciale e che quindi funziona bene in casi pratici, è quello di utilizzare la propagazione per scegliere quali variabili.

Tipicamente la neighborhood viene determinata dal numero di variabili da rilassare e a causa della propagazione delle variabili, lo spazio di ricerca è più o meno grande.
Si può però stimare la dimensione del sotto-problema utilizzando il prodotto cartesiano dei domini delle variabili rilassate, in questo modo è possibile utilizzare questa stima per valutare la scelta delle variabili da rilassare.

Si parte da una lista L con le variabili non fissate, L è inizialmente vuota e ogni volta che viene scelta una variabile.
Per ognuna delle variabili viene calcolato uno **score**, dato da quanto la scelta della variabile riduce lo spazio di ricerca e vengono aggiunte nella lista solo le variabili che hanno uno score maggiore di zero.

Se dopo aver valutato tutte le variabili, la lista è ancora vuota si sceglie una variabile a caso, se invece la lista contiene delle variabili se ne sceglie una da fissare.

Questo metodo prende il nome di **Propagation-Guided LNS**, e funziona sotto l'ipotesi che ci siano delle variabile che sono tra loro fortemente correlate tra loro e tipicamente è vero per i problemi reali.

C'è anche una versione **reverse** di questo algoritmo, nella quale vengono scelte le variabili da tenere rilassate. L'idea è quella di andare ad allargare lo spazio di ricerca finché non diventa abbastanza grande.

L'idea della versione reverse è corretta ma non è più guidata dalla propagazione ed è più difficile da applicare.

Gli ideatori di questi algoritmi li applicano assieme, viene prima utilizzato PGLNS e poi la versione reverse, finché non viene trovato un sotto-problema della dimensione voluta e nel caso reverse viene utilizzato come score la riduzione media dei domini per ogni variabilen nell'iterazione di PGLNS.

## Advanced Search Heuristic

In CP risulta facile andare a definire delle euristiche di ricerca ottimizzate per un problema.

Tuttavia implementare una ricerca ad hoc richiede di conoscere come funziona la CP e tipicamente trovare un'euristica ottima richiede molto  tempo.

Se non viene utilizzata un'euristica ad hoc, le prestazioni ottenute sono tipicamente scarse.

Negli utlimi 15 anni sono state proposte delle euristiche generiche che si comportano abbastanza bene.

Queste euristiche si basano su 4 idee principali:

1. (e 2) Imparare dalla propagazione e dai fallimenti: ovvero imparare quali sono le variabili che propagano di più o che più facilemente portano a dei fail, per poi usarle per fare branching.
2. Ricavare informazioni sui vincoli: si può sfruttare la rete dei vincoli per calcolare uno score per le variabili
3. Estrare delle informazioni dai vincoli: ovvero per ogni vincolo si cerca un algoritmo che stima il numero di soluzioni per quel vincolo e si fa branching sulle variabili cercando di massimizzare queste stime. (forse, vedi slide) 

### Failure Directed Search

Strategia di ricerca progettata per problemi infeasible, in modo da poter prima utilizzare LNS per trovare una soluzione buona e poi applicare FDS per fare la prova dell'ottimalità.

L'idea è quella di andare ad imparare dai fallimenti.

Perché l'algoritmo funzioni, le decisioni di branching devono essere binarie (= e diverso, split di un dominio, ecc.), serve poi un pool. ...

Vengono poi estratte le decisioni da questo pool e se non sono già state prese come effetto collaterale, vengono creati dei nuovi di ricerca e viene fatta la propagazione.
Se alla fine del pool ci sono delle variabili non ancora istanziate, vuol dire che il pool era troppo piccolo e ne serve uno più grande (generazione incrementale del pool per problemi grandi).


... discorso sullo score...

FDS sceglie sempre la decisione con lo score più basso e si segue il branch della soluzione con lo score più basso, questo perché uno score più basso porta ad una propagazione migliore e l'obiettivo di questa euristica è quello di fallire in fretta.

Questa euristica funziona particolarmente bene con il restart, perché al primo giro si impara quali sono le decisioni migliore e nelle iterazione successive, queste vengono prese subito in modo da sflotire il più in alto possibile.

