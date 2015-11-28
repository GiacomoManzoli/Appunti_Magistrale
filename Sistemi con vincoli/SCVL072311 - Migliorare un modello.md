#Lezione 7 - Migliorare un modello

Lo stesso problema può essere modellato in modi diversi, alcuni sono più semplici da modellare rispetto ad altri e allo stesso modo alcuni sono più efficenti di altri.

Inoltre. anche gli stessi vincoli possono influire sulle prestazioni, così come la scelta dei valori "farlocchi" va ad influire sulle prestazioni.

Ad esempio: se nel problema di pianificazione della produzione di una macchina, scelgo il valore *-1* per rappresentare un ciclo di pausa della macchina posso ottenere delle prestazioni peggiori rispetto al modello che usa *eoh* o un altro valore per modellare tale ciclo.
Questo dipende da come vengono scegli dal risolutore i valori da assegnare alle variabili.

Un altro problema è dato dalle simmetrie nelle soluzioni, che possono portare ad creare branch di ricerca inutili, pertanto può essere utile aggiungere dei vincoli per andarle a rimuovere.

Ad esempio, se devo produrre in serie 5 unità x<sub>1</sub> ... x<sub>5</sub> dello stesso prodotto, le due soluzioni [x<sub>1</sub>, x<sub>2</sub>, x<sub>3</sub>, x<sub>4</sub>, x<sub>5</sub>] e [x<sub>4</sub>, x<sub>2</sub>, x<sub>1</sub>, x<sub>3</sub>, x<sub>5</sub>] sono equivalenti, pertanto convine aggiungere dei vincoli che rimuovono queste soluzioni simmetriche.

Allo stesso modo, quando si tratta di allocare delle quantità di qualche materiale in dei contenitori identici, è possibili vincolare l'assegnamento *x<sub>1</sub> = 0*, dal momento che la prima sostanza può essere messa indiscriminatamente in ognuno dei contenitori e ciò porta ad avere delle soluzioni simmetriche.

##Simmetrie

Possono essere sia di variabile che di valore.

Quelle di **variabile** si verificano quando, data una soluzione feasible è possibile scambiare i valori delle variabili ed ottenere comunque un'altra soluzione feasible.

In quelle di **valore** invece si va a permutare i vari valori (ridare il nome ai valori), ad esempio in N-Queens c'è una simmetria di valori se si fa una rotazione orizzontale della scacchiera.

Per rompere queste simmetrie è possibile:

- Riformulare il modello in modo da togliere o diminuire le simmetrie
- **Simmetry Breaking statico** vengono aggiunti dei vincoli al modello per rompere le simmetrie
- **Simmetry Breaking dinamico**

###Lex-Leader Method (statico)

È una strategia per rompere le simmetrie di variabile in modo statico.

L'idea è quella di imporre un ordine lessicografico tra le varie variabili in modo che ci sia solo una delle soluzioni simmetriche valide.

Deve però essere disponibile la lista di tutte le possibili permutazioni.

Di contro però vengono aggiunti dei vincolo grandi e il numero di vincoli da aggiungere cresce in modo **fattoriale** rispetto al numero di simmetrie.

**Caso speciale**: se c'è un vincolo che impone che le varie variabili siano tutte diverse tra loro allora è necessario aggiungere *n-1* vincoli, anziché *n!*.

### Rottura delle simmetrie dinamica

Il metodo statico porta ad aggiungere tanti vincoli e questi possono creare dei problemi alla strategia di ricerca, perché questi vincoli potrebbero andare a tagliare delle soluzioni simmetriche che sono trovate per prime dalla strategia di ricerca.

L'idea principale di questa strategia è quella di considerare i vincoli che rompono le simmetrie solo quando si fa backtracking.
In questo modo quando si scende sul ramo sinistro non vengono tagliate le soluzioni simmetriche, ma quando si fa backtracking, questi vengono considerati in modo da sfoltire il sotto albero destro.

Ad esempio facendo labeling fermandosi al primo valore simmetrico trovato.
