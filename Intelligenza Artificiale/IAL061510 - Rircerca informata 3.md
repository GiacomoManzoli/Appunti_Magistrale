#Lezione 6

15 Ottobre 2015.

Verificare che quando per HC si parla di soluzione ottima, si intenda una soluzione ottima globale.

##Simplified MA*

Questa versione di A* espande la foglia migliore fino a quando la memoria è piena.

Quando è necessario aggiungere nodi nuovi, scarta dalla coda quelli meno promettenti.

In particolare:

- viene sempre scartato il nodo foglia peggiore (quello con f-valore più alto).
- l'f valore del nodo scartato viene riportato sul nodo padre, un po' come avviene con Best First.
- si espande il nodo padre di un nodo già scartato solamente quando tutti gli altri cammini sono risultati peggiori.

Problema: possono esserci blocchi di foglie con lo stesso f-valore. Si rischierebbe di scegliere lo stesso nodo sia per la cancellazione, sia per l'espansione.

Viene quindi adottata una politica di "giovinezza", viene scartato il nodo più vecchio e viene espanso il nodo più recente.

Questo algoritmo è completo solo se la soluzione può essere contenuta in memoria, e risulta ottima solo se la soluzione rimane raggiungibile.

##Algoritmi di miglioramento iterativo

In molti problemi di ottimizzazione non è rilevante come si arriva alla soluzione.

Gli algoritmi di miglioramento iterativo mangentono un singolo stato corrente e tentano di migliorarlo.

Impiegando così spazio costante e quindi sono adatti in maggiori ambiti.

Il problema principale di questi algoritmi è la completezza, in quanto si cercano le soluzioni localmente.

##Hill-climbing

```
function HillClimbing(problema) returns uno stato che è un massimo locale
	inputs: problema, un problema
	variabili locali: 	nodo_corrente, un nodo
						  	vicino, un nodo
	nodo_corrente = CreaNodo(StatoIniziale[problema])
	loop do
		vicino = il successore del nodo_corrente di valore più alto
		if (Valore[vicino] <= Valore[nodo_corrente] then return Stato[NodoCorrente]
		nodo_corrente = vicino
```

In alcuni casi Hill climbing non riesce ad arrivare ad una soluzione.

Questo perché Hill climbing si ferma su una spalla (punto in cui la funzione obiettivo è costante) o su un massimo locale, e non è neanche detto che il massimo locale coincida con un massimo globale.

Si possono trovare delle soluzioni:

- **plateau**: si fa una mossa laterale, cioè ci si sposta in uno stato che ha lo stesso valore di `h`.
	- Bisogna evitare dei cicli, specialmente nel caso di massimi e minimi locali
	-  Si può porre un limite al numero massimo di mosse laterali consecutive, risulta più semplice che andare a tenere traccia degli stati già visitati (trade-off come per la definizione di una funzione euristica).
- **massimi o minimi locali**: si possono eseguire delle ricerca stocastiche o iniziare le ricerca da stati diversi:
	- _Hill climibing stocastico_: si sceglie a caso tra tutte le mosse che migliorano `h`, tipicamente si ottiene una convergenza più lenta ma spesso si trovano soluzioni migliori. La distribuzione delle probabilità deve essere tale per cui sia più probabile trovare uno stato migliore.
	- _Hill climbing con riavvio casuale_: esegue ricerca a partire da stati iniziali diversi (scelti a caso). In questo modo se *p* è la possibilità di trovare una soluzione ottima per una singola ricerca, il numero di ricerche atteso prima di trovare una soluzione ottima globale è *1/p*.

###Numero di ricerche prima di trovare una soluzione ottima

> x<sub>i</sub> 	= 0 se la i-esima ricerca non trova una soluzione ottima
> 					= 1 se trova una solzione ottima

Sappiamo che per ogni i, P(x<sub>i</sub> = 1) = p e P(x<sub>i</sub> = 0) = 1 - p.

Le variabili x<sub>i</sub> sono tra loro indipendenti in quanto il risultato di una ricerca non influenza le altre ricerche.

Quindi su una serie di _k_ ricerche sia la _k_-esima ricerca sia una soluzione ottima è _1/p_.

Perché? Dimostrazione della probabilità, ci sono serie e derivate.

###Hill climbing contro le 8 regine.

Il numero di stati è 8<sup>8</sup>.

Con HC standard, il 14% delle volte si trova una soluzione ottima (globale).

Con HC laterale (max 100), la soluzione ottima viene trovata il 94% delle volte. In media servono circa 21 passi per trovare una soluzione.

Con HC a riavvio casuale, la soluzione ottima ha _p = 0,14_, Servono quindi 6 fallimenti ed un successo per trovare una soluzione ottima, con una media di 22 passi.

Con HC a riavvio casuale e mosse laterali, si ha _p=0,94_ e servono quindi 1,06 ricerche per trovare la soluzione ottima globale, con una media di 25 passi.



























