# Immagini renderizzate

Non tutte le immagini digitali sono ottenute con un campionamento di qualche tipo.

Ci sono dei casi in cui l'immagini che deve essere rappresentanta viene costruite a computer, che possono anche essere generate sul momento.

La versione più semplice parte da una matrice vuota che viene riempita utilizzando delle primitive grafiche che permettono di disegnare.

Queste primitive possono lavorare a livello bitmap, in modo simile a photoshop, oppure a livello di figure, con la grafica vettoriale.

Nel corso non ci occuperemo di come funzionano i software di desegno, ma sulle librerie a disposizione per generare le immagini come OpenGL.

C'è quindi una differenza sostanziale tra le immagini digitalizzate e quelle sintetizzate. Nel caso delle immagini digitalizzate tutte le informazioni riguardo la complessità delle immagini sono racchiuse all'interno del file, mentre nel caso delle immagini sintetizzate non c'è un limite superiore alla complessità, il numero di primitive può aumentare liberamente.

Ci sono però due considerazioni da fare:

- il tracciamenento delle primitive grafiche deve essere veloce, dal momento che non c'è un limite superiore è necessario che la piattaforma sottostante sia in grado di visualizzare l'immagine sintetizzata in tempi ragionevoli. È quindi necessario utilizzare dell'accelerazione hardware per le primitive più semplici e implementare le primitive grafiche più complessi come composizione di primitive accelerate.
- l'immagine digitalizzata ha una sua forma naturale data dalla matrice che la rappresenta, mentre il formato di un'immagine sintetizzata è più libero perché dipende dalle primitive utilizzate, come sono definite e come vengono usate. Non sono quindi presenti degli standard generali e comuni.

Nella realizzazione di un'immagine sintetizzata è necessario effettuare una rappresentazione bidimensionale di uno spazio tridimensionale in grado di ingannare la percezione umana, fornendo un'idea di 3D.

## Applicazioni della grafica 3D

Alcuni dei casi d'uso della grafica 3D riguardano l'ambito del design, per progettare l'aspetto di un prodotto.

A livello ingegneristico può essere utile avere la rappresentazione 3d di un componente o di un edificio.

A livello medico risulta utile avere una ricorstruzione tridimensionale degli orgnani interni di un paziente.

Più attualmente c'è il mondo della realtà virtuale/aumentata e nella costruzione di simulatori.

## Generazione di un'immagine sintetizzata

Nella prima fase (**modeling**) viene costruito un modello dell'immmagine che si vuole rappresentare.

Può essere che l'immagine sinteca sia animata e pertanto una volta definito il modello è necessario decidere come i vari modelli interagiscono tra loro.

Infine viene effettuato il **rendering** dell'immagine che, dalla rappresentazione interna basata sulle primitive, viene visualizzata a video.

### Modellazione

Tipicamente le primitive a disposizione lavorano su forme semplici rappresentate su un piano, come:

- punto
- segmento
- poligono

Si possono anche trovare delle primitive per le linee curve e per il cerchio.

Ci saranno poi altre primitive che permettono di controllare la campitura interna dei vari poligoni.

Nel caso della presenza di luci, è desiderabile che ci siano delle primitive che permettono di discrivere le sorgenti luminsione, in modo che la rappresentenzaione tridimensionale sia il più fedele possibile a quella reale.

C'è poi un'altro problema legato al fatto che gli oggetti più lontani sono più piccoli rispetto a quelli vicini e l'occhio umano si accorge facilemente della presenza di errori prospettici.
In questo caso torna comodo avere delle primitive che ci occupano della gestione della prospettiva.
Così facendo, il creatore può ottenere una rappresentazione il più federe possibile allare realtà.

Le gestione automatizzata delle proprozioni e delle sfumature dei colori a causa delle varie luci sono facilmente automatizzabili perché si tratta di effettuare gli oppoortuni conti.

Nella rappresentazione tridimensionale è necessario definire uno stanrda per la rappresentazione degli oggetti nello spazio.

Ragionevolmente, un punto può essere rappresententato dalla sue coordinate e in modo simile un poligono e un segmento possono essere rappresentati dai loro vertici.

Resta da decidere quale sistema di coordinate utilzzare.
Un approccio possibile è quello di utlizzare come coordinate la dimensione del bitmap sul quale viene renderizzata l'immagine.

Questo approccio soffre però di un problema, perché è necessario stabilire a priori le dimensioni dell'immagini e nel caso di un cambio di risoluzione è necessario cambiare il punto di riferimento delle coordinate.

Conviene quindi utilizzare un sistema di coordinate indipendete dalla risoluzione, tipicamente simile alle convenzioni geometriche, ma è una scelta lasciata all'utente.
Ovvero le librerie grafiche hanno un sistema di coordinate interno di default, ma permettono allo sviluppatore di utilizzarne uno qualsiasi.
Il cambiamento da una base all'altra viene effettuata una trasformazione lineare, che può essere effettuata in modo automatico dalla libreria grafica o mediante delle matrici che devono essere fornite alla libreria da parte dello sviluppatore.

La libreria grafica OpenGL offriva entrambe le opzioni, anche se dalla versione 3 la generazione automatica è stata deprecata, seguendo quello che hanno fatto anche la maggior parte delle librerie grafiche.

Nei nostri espertimenti utilizzeremo OpenGL 2.1 perché ha tutte le caratteristiche delle versioni 3 e 4, permettendo allo stesso tempo di utilizzare la gestione automatica delle matrici di trasfomrazione.

Tipicamente nella grafica tridimensionale le matrici sono di dimensione  4x4, nelle quali la componente 3x3 rappresenta la rotazione dello spazio e il vettore della quarta colonna la traslazione rispetto l'orgine e l'ultima riga è composta da *[0,0,0,1]*.
Questo perché per via di un barbatrucco algerbico si riesce ad effettuare con una singola operazione la rotazione e la traslazione.
Sempre grazie a questo barbatrucco è possibile definire la posizione di un oggetto rispetto ad un altro oggetto, in modo da rendere la definzione più agevole, ad esempio è possibile definire una matrice che permette di far girare una ruota, piuttosto che andare a specificare una trasformazione di tutti i componenti che compongono la ruota.

Inoltre per via di un po' di math magic è possibile combinare tra loro le varie matrici di rototraslazione permettendo così di definire delle trasformazioni complesse, come la rotazione di una ruota rispetto alla macchina, in termini di transformazioni più semplici: spostamento dell'auto, rotazione della ruota rispetto l'auto, sterzo della ruota.

Il numero di primitive accelerate via hardware è limitato perché si è osservato che creare schede grafiche in grado di accelerare anche premitive più complesse porta ad avere prestazioni inferiori rispetto alle schede grafiche con poche primitive e approssimando quelle più complesse.

#### FreeGLUT

È la libreria che utilizzeremo per usare le OpenGL che permette di astrarre alcune istruzioni e di creare degli esempi cross-platform.

http://freeglut.sourceforge.net/

Segue un esempio della libreria.

Ci sono due tipi di primitive:

- quelle dirette che vengono accelerate via hardware (lineari)
- quelle indirette che rappresentano le superfici curve che prima di essere visualizzate vengono trasformate in una serie di primitive lineari

### 3 dimnesioni in 2 dimensioni

La distorsione prospettica degli oggetti viene effettuata con della geometria prospettiva.

Come prima cosa è necessario andare a rappresentare il fatto che gli oggetti più lontani vengono rappresentati in modo più piccolo.
Nel lato pratico, gli oggetti più vicini vengono rappresentati con una risoluzione maggiore rispetto a quelli più lontani.
L'importante è rispettare il rapporto fisico che prevede il raddoppio della dimensione alla dimezzazione della distanza.

La **legge di trasformazione prospettica** viene utilizzata per trasformare le coordinate dell'oggetto tenendo conto della distanza:

```
x_alpha = (x_R)k / z_R

y_alpha = (y_R)k /z_R
```

Dove *x_alpha* e *y_alpha* sono le coordinate in cui viene disegnato l'oggetto e *x_R* e *y_R* sono le coordinate effettive dell'oggetto.
*k* rappresenta una costante di scaling e *z_R* è la distanza dal punto visivo dell'oggetto.

Al cresce di *k* si ottiene un effetto teleobiettivo, mentre se *k* è piccolo si ha un effetto grandangolo.

Tutto questo però funziona solo se il punto di ossservazione rimane fisso alle coordinate *(0,0)*.
Per ottenere uno spostamento dell'osservatore senza modificare la trasformazione prospettica, conviene spostare nella direzione opposta tutta la scena, modificando la matrice di **ModelView**.
Lo stesso ragionamento può essere applicato alla rotazione, quello che conta è che la rotazione deve essere inversa.

Dal momento che la rototraslazione viene effettuata con un prodotto tra matrici, nella trasformazione inversa è necessario invertire anche l'ordine delle due operazioni.

