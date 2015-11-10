#Linguaggi di programmazione - Lezione 1

I primi linguaggi importanti per la storia sono il C/C++, Java e Haskell.

Il controllo dei tipi è iniziato dal Fortran (anni 50) con la gestione statica dei valori delle variabili. La prima versione del Fortran tuttavia non ammetteva ricorsinoe.

_I linguaggi operativi hanno un approccio più ingegneristico mentre quelli funzionali sono più matematici e astratti._

Al giorno d'oggi i linguaggi hanno caratteristiche miste, sia imperative che funzionali. Questo perché si cerca di andare verso un mondo parallelo e distribuito.

> Il JavaScript è più ad oggetti che funzionale.

##Processo di esecuzione

Codice Sorgente --> Compilatore --> Programma Oggetto --> Interprete

Ci sono sempre due fasi: quella di compilazione e quella di interpretazione.

Se è più importante la fase di compilazione si ottiene una maggiore efficienza e in alcuni casi il programma può essere eseguito direttamente (come nel C++).

Se è più importante la parte di interpetazione il programma è più sicuro e dinamico (meno crash), come Java.

##Computabilità

Il calcolo di una funzione può non andare a buon fine, per un errore, come la divisione per 0 oppure perché semplicemente il calcolo non termina.

La non terminazione è un modo per creare un funzione parziale, cioè una funzione che non è calcolabile per alcuni valori.

Tutte le funzioni sono calcolabili? No. Kurt Göedel (anni '30).

Questa domanta è nata prima ancora dei computer attuali, questo perché erano presenti dei modelli di calcolo formale:

* Macchine di Turing, macchine a registri, macchine di Post;
* Linguaggi funzionali, come il Lambda calcolo;
* Regole di composizione di funzioni a partire da funzioni elementari.

Tutti i modelli precedenti definiscono la stessa classi di funzionie --> formazilizzano il caloclo dello stesso modello di funzioni, le __funzioni parziali ricorsive__.

__Tesi di Church__: Tutte le funzioni parziali ricorsive sono calcolabili. Non è un teorema, ma una tesi in quanto è un concetto intuitivo che non è ancora stato dimostrato.

Tutto quello che può fare un computer moderno lo può fare anche una macchina di turing, il che vuol dire che tutti i linguaggi moderni sono turing completi, cioè sono in grado di calolcare tutte le funzioni calcolabili (funzioni parziali ricorsive).

La Turing completezza non aiuta quindi a confrontare tra loro i linguaggi di programmazione, perciò si preferisce utilizzare l'esperessività di un linguaggio come criterio di confronto ed è per questo che utilizziamo Java e non una macchina di turing.

L'espressività ha però un prezzo in efficienza e di conseguenza non è possibile creare il linguaggio di programmazione perfetto.

##Incalcolabilità con la Macchina di Turing

Göedel ha dimostrato che non tutte le funzioni sono calcolabili e questo è possibile dimostrarlo con una macchina di turing.

Consideriamo tutte le funzioni che possono essere calcolate con un "Si" o con un "No" (problemi decisionali).

> f : I --> SI/NO

Göedel ha dimostrato che la decisione della terminazione di una macchina di turing non è decidibile (calcolabile).

> I = <P, x>
> P -> stringa che descrive una macchina di turing
> x -> stringa scritta nel nastro di P
> P(x) -> è il calcolo della macchina P su x

Se la terminazione di P su x è decidibile allora esiste un programma (o macchina di turing) Q che dato:

> <P, x> --> Q(P,x) = SI se P(x) termina, NO altrimenti

Supponiamo che questo per assurdo sia vero.

Usando Q è quindi possibile definire D in modo che prenda in input una macchina di turing ed esegua Q(P,P) e che:

- Se Q(P,P) = SI, allora D non termina
- Se Q(P,P) = NO, allora D termina

Cioè, se D(P) termina, allora vuol dire che la macchina P non riesce a calcolare se stessa, P(P) non è calcolabile.
E viceversa.

Considerando l'esecuzione 

> D(D)

In questo caso viene eseguito Q(D,D) inquanto la macchina D è composta in parte da Q.

Così facendo, Q(D,D) calcola SI se D(D) termina e NO se D(D) non termina.

Ma se D(D) termina, allora per come è definito D(D) non dovrebbe terminare e viceversa.

Si arriva così ad una situazione assurda che dimostra che la terminazione di un programma non è calcolabile.

Tuttavia la terminazione di una macchina di turing è semi-decidibile, in quanto si può sempre dire se una macchina di turing termina (simulandola) ma non si può dire il contrario.

Anche perché se fosse possible, allora il problema totale sarebbe decidibile (_basta una macchina di turing che simuli contemporaneamente due macchine di turing, ognuna che risolva uno dei due semi-problemi_).

Un problema si dice __indecidibile__ quando esiste un sotto-insieme infinito di istanze per il quale non è decidibile, tuttavia possono essere presenti alcune istanze per le quali il problema è decidbilie.