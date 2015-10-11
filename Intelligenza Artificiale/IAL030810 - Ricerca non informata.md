#Intelligenza Artificale - Lezione 3

_Altre informazioni sul progetto, come l'estensione di un sistema con elementi di intelligenza artificiale.
Oppure studio sperimentale di algoritmi diversi. La presentazione pubblica del progetto dovrebbe dare un bonus, la presentazione di una 20-ina di minuti_

##Ambiente (Cont'd)

__Ambiente semi-dinamico__: ambiente che cambia lentemante, in un breve periodo l'ambiente può essere considerato statico.

__Ambiente stocastico__: sono disponibili delle informazioni relative alla probabilità di un certo output. Quando invece è non deterministico, non si ha neanche questa informazione.

##Formulazione di un problema

Problema definito da 4 elementi:

- stato iniziale
- funzione successore generica
- test goal, per sapere se è stato raggiunto l'obiettivo
- soluzione come sequenza di azioni che porta dallo stato iniziale ad uno stato goal

###Esempio del Puzzle

_immagine pagina 7, slide nuove_

__Azioni__: spostamento dello spazio vuoto, che non può essere spostato ovunque, la funzione successore deve contenere di questo vincolo

__Stati__: locazione interne dei tasselli

__Test goal__: è lo stato con i tasselli ordinati (_esplicito_), può essere fornito anche come test implicito.

__Costo del cammino__: si può considerare un +1 per ogni spostamento, in questo caso si cerca di minimizzare il costo.

_La soluzione di questo problema è NP-Hard_

##Algoritmi di ricerca ad albero

_l'idea di base è quella di simulare l'esplorazione dello spazio degli stati generando successori degli stati già esplorati (espansione di uno stato)._

Si parte calcolando la funzione successore dello stato iniziale, e questi diventano i figli del nodo radice, e via via, finché non esploro tutti i cammini.

Una soluzione è un cammino dallo stato iniziale ad uno stato goal e non è detto che questa venga trovata.

Durante la creazione dell'albero entra in gioco anche una _strategia_ che sceglie uno dei nodi figli in base ad alcuni criteri.

Uno __stato__ è una rappresentazione di una configurazione fisica.

Un __nodo__ è una struttura dati che appartiene ad un albero di ricerca e che rappresenta un particolare stato.
Il nodo porta anche l'informazione relativa al suo genitore e all'azione da compiere per tornare ad esso.

Le informazioni presenti in un nodo sono variabili e dipendono dalla strategia di ricerca utilizzata.

_frontiera_: struttura dati che rappresenta la strategia, nell'esempio è l'insieme dei figli ancora da esaminare. In alcuni casi è una coda a priorità.

```
function RicercaAlbero(problema, frontiera) returns una soluzione o un fallimento
frontiera <-- Inserisce(CreaNodo(StatoIniziale[problema], frontiera)
loop do
	if Vuota?(frontiera) then return fallimento
	nodo <--RimuoviPrimo(frontiera) //Dipende dalla strategia
	if TestObiettivo[problema] applicato a Stato[nodo] then return Soluzione (Nodo)
	frontiera <-- InserisciTutti(Espandi(nodo,problema), frontiera).
	
function Espandi(nodo, problema) return insimeme di nodi
for each (azione, risultato) in FunzioneSuccessore[Problema](Stato[Nodo]) do
	s <-- un nuovo Nodo
	Stato[s] <-- risultato
	NodoPadre[s] <-- Nodo
	Azione[s] <-- azione
	CostoDiCammino[s] <-- CostoDiCammino[nodo] + CostoDiPasso(nodo, azione, s)
	aggiungi s a successori
return succerssori
```

###Strategie di ricerca

Rappresenta la scelta dell'ordine di espansione dei nodi.

Le strategie possono essere valutate secondo vari criteri:

- _completezza_: la strategia trova sempre una soluzione
- _complessità in tempo_: quanto tempo è necessario per trovare una soluzione (se esiste).
- _complessità in spazio_: quanta memoria è richiesta per trovare una soluzione.
- _ottimalità_: trova sempre una soluzione di costo minimo.

La complessità in spazio e tempo viene misurata in termini di:

* _b_: massimo fattore di branching dell'albero di ricerca, quanti figli può avere un nodo.
* _d_: profondità della soluzione di costo minimo, a che livello dell'albero la trovo (possono esserci più soluzioni di costo minimo anche a livelli diversi.
* _m_: massima profondità dell'albero, che può essere anche infinita.

###Strategie di ricerca non informate

Sono strategie che usano solo l'informazione disponibile nella definizione del problema.

Non vengono usate infomrazioni a priori per ottimizzare la ricerca.

####Ricerca a ventaglio (breadth-first, in ampiezza)

Espande il nodo a profondità più bassa, viene implementata con una coda FIFO. 

C'è un'ambiguità nella definizione dell'ordine dei successori di un dato nodo, che diventa arbitraria. 

Questa ricerca risulta completa se il fattore di branching è finito. Il tempo di esplorazione è esponenziale (1 + b + b^2 + ... + b^(d-1 --> O(b^d+1)). 

C'è un problema anche per lo spazio, in quanto devo tenere in memoria tutti i nodi che ho analizzato. 

Infine risulta ottima solo se il costi degli archi è identico, perché trovo la soluzione al livello più basso, quindi prendo sempre il cammino minimo.

####Ricerca a costo uniforme

Espande il nodo a costo di cammino inferiore, è una coda ordinata per costo di cammino. 

Questa ricerca è completa se tutti i passi costano qualcosa, se c'è un passo che costa 0 sorgono alcuni problemi. 

Il costo in tempo è limitato dal costo del trovare il nodo, dal momento che prima di trovare il nodo goal trovo i nodi più "economici" e che non sono goal.

Allo stesso modo il costo in spazio è limitato dal costo della soluzione ottima.

L'algoritmo riuslta ottima nel caso tutti i costi siano > 0, in qunato tutti i nodi vengono espansi nel modo "più promettente".

####Ricerca a profondità (depth-first)

Può essere anche limitata e iterativa.

La frotinera diventa una coda LIFO.

Questa strategia di ricerca perché può essere che ci sia un cammino di profondità infinita o con un ciclo. Se non ci sono cicli e lo spazio degli stati è finito, allora è completa.

Il tempo necessario è O(b^m), il che risulta terribile se _m_ è più grande di _d_, ma se le soluzioni sono dense (vicine tra loro)  risulta migliore del breadth-first.

Lo spazio richiesto è invece __lineare__ secondo O(b*m) in quanto per ogni nodo che viene visitato è necessario tenere in memoria solamente i fratelli del nodo espanso.

L'algoritmo non è ottimo, in quanto cerca una soluzione generica andando in profondità che non è garantito che sia ottima.

####Ricerca a profondità limitata

Vengono ignorati tutti i figli al di sotto di un certo livello _l_.

Ovviamente questa strategia è ancora meno completa, in quanto tutte le soluzioni possono essere ancora più profonde.

Tuttavia, l'analisi dell'albero a profondità limitata risulta più efficiente della ricerca breadth-first.

####Rircerca a profondità limitata iterativa

Viene fissato un limite e se dentro il limite non viene trovata una soluzione, si re-inizia la ricerca con un limite più profondo, ripetendo il procedimento finché non viene trovata una soluzione.

Si ottiene così un compromesso tra lo spazio e il tempo che risulta più vantaggioso rispetto all'utilizzo di uno dei due algoritmi in modo "puro".

Questa modalità di ricerca è completa.

Il tempo necessario è un O(b^d) e lo spazio necessario rimane lineare.

La strategia risulta anche ottima nel caso i costi di tutti gli archi siano gli stessi.