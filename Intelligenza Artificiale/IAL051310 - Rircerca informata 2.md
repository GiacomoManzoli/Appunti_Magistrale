#Lezione 5 - Ricerca Informata (Cont'd)

##Ottimalità di A* su un grafo

la stessa prova di A\* su un albero non va bene per il grafo.

La condizione che *h* sia ammissibile (deve sottostimare il costo effettivo) non è sufficiente.

Le eristiche devono essere anche **consistenti**:

> h(n) ≤ c(n,a,n') + h(n')

Il valore della funzione euristica calcolata per *n* deve essere minore o uguale della funzione euristica di *n'* sommata al costo per spostarsi da *n* a *n'*.

In questo modo si ottiene una funzione di valutazione *f* non decrescente.

A\* espande i nodi in ordine di valore rispetto alla funzione di valutazione dei nodi.

##Proprietà di A\*

L'algoritmo è **completo** a meno che non ci sia un numero infinito di nodi con la funzione di valutazione minore e uguale della funzione di valutazione dello stato di goal.

Il tempo di esecuzione è in ogni caso esponsenziale in quanto è necessario andare ad espandere tutti i nodi che hanno la funzione di valutazione più piccola del nodo di goal.

Nel caso pessimo è necessario avere memoria per tutti i nodi del problema.

L'algoritmo però è **ottimo**, in quanto non può espandere un nodo che ha un determinato valore della funzione di valutazione finché non sono stati espansi i nodi con funzione di valutazione minore.

L'algoritmo non è solamente ottimo, non esite algoritmo che trova la soluzione ottima espandendo meno nodi rispetto ad A\*.
Questo perché se un altro algoritmo esplorasse meno nodi allora rischierebbe di andare a scartare dei nodi che potrebbero essere ottimo. (I due algoritmi devono però avere la stessa euristica, altrimenti le cose cambiano).

##Generare euristiche ammissibili

Considerando l'esempio del puzzle da 8 tasselli.

Per quel problema possono essere trovate due euristiche:

>h<sub>1</sub>(n) = numero di tasselli in posizione errata
>
>h<sub>2</sub>(n) = distanza di Manhattan, cioè il numero di mosse necessarie per portare ogni tassello nella posizione corretta.

*h<sub>1</sub>* è una euristica più semplice da calcolare ma da una sottostima tanto bassa, mentre *h<sub>2</sub>* da una sottostima più accurata rispetto ad *h<sub>1</sub>*.

Conseguentemente è meglio *h<sub>2</sub>* così considero meno nodi e trovo prima il nodo associato ad uno stato ottimo.

Dal momento che *h<sub>2</sub>(n)* è sempre maggiore o uguale di *h<sub>1</sub>(n)* si dice che *h<sub>2</sub>* __domina__ *h<sub>1</sub>*.

Tipicamente ha più senso usare l'euristica dominante, c'è però da considerare il tempo necessario per calcolare l'euristica, in alcuni casi può essere più performante usare un'euristica "peggiore" ma che è molto efficente da calolcare.

###Problemi rilassati

Per facilitare il calcolo si possono togliere alcuni vincoli al problema per applicare una ricerca non informata, in modo da poter usare il valore riscontrato dalla ricerca rilassata come euristica per il problema completo.

Il costo della solzione ottima di un problema rilassato non è più grande del costo della soluzione ottima del problema originario, ed è quindi un euristica ammissibile.

Un esempio dell'uso di questa tecnica è la risoluzione del problema del commesso viaggiatore che può utilizzare un albero di copertura minimo per trovare un limite inferiore al percorso più breve.

##Considerazioni finali su A\*

Si può limitare il consumo della memoria in una modo simile all'iterative deeping al contesto delle euristiche.

Questo si può fare andando ad aggiungere un limite al valore dalla funzione di valutazione.

###IDA\*

Non inserisce nella coda dei nodi con valore di *f* maggiore di un certo valore _cutof f_.

Questo valore di _cutof f_ alla iterazione successiva viene posto uguale al minomo valore di *f* dei nodi non inseriti in coda.

(Ad ogni iterazione prendo il nodo di che non ho inserito in coda e con funzione di valutazione minima e assegno a _cutof f_ il su f-valore, in questo modo quel nodo verrà preso in cosiderazione alla prossima iterazione dell'algoritmo)

Viene così limitato l'uso della memoria.

Ad ogni aggiornamento di _cutof_ devo comunque reiniziare la ricerca da capo.

_Possibile tema di progetto: utilizzo di A\* e IDA\* per la risulzione di 8-puzzle_

Esistono comunque soluzioni migliori: RBFS, MA\*, SMA\*.

##Ricerca Best First Ricorsiva - RBFS

Algoritmo che imita una ricerca in profontidà utilizzando uno spazio lineare.

Invece di seguire indefinitamente il cammino corrente, tiene traccia dell'*f-valore* del miglior cammino alternativo che parte da uno degli avi.

Se il nodo corrente supera l*'f-valore* (valore della funzione di valutazione), la ricorsione torna indietro al cammino alternativo.

Durante il ritorno, si sotistuisce l'*f-valore* di ogni nodo lungo il cammino con il miglior *f-valore* dei suoi nodi figli.

Come per A\*, la ricerca è ottima se la funzione euristica è ammissibile.

La complessità spaziale è lineare ma la complessità temporale è difficile da definire, nel caso pessimo è sempre esponenziale.

Anche questo algoritmo soffre di un problema simile ad IDA\*, cioè non usano tutta la memoria a disposizione.