# Nelle precedenti puntate

Utilizzando le trasformazioni dell'algebra lineare si riesce a manipolare la posizione degli oggetti 3-dimensionali cambiando il sistema di riferimento delle coordinate.

Risulta quindi possibile definire gli oggetti 3d in un proprio sistema di riferimento interno.

## Traslazione

Lavorando in uno spazio tridimensionale sia le matrici che i vettori devono essere tridimensionale.

Con questo vincolo però non si riescono ad effettuare delle trasformazioni come spostare un punto solamente sull'asse *x*.

```
x'          x   x+4
y' =   ?  * y =  y
z'          z    z
```

Per fare ciò serve una matrice non tridimensionale, ma questo complicherebbe inutilmente le cose.

Per questo motivo internamente i conti vengono effettuati con una dimnesione in più, tenuta fissa uguale a 1.

```
x'   1 0 0 4   x   x+4
y' = 0 1 0 0 * y =  y
z'   0 0 1 0   z    z
w'   0 0 0 1   1    1
``` 

Questa matrice prende il nome **matrice di rototraslazione**, dove il primo quadrato di dimensione 3x3 specifica la rotazione e i primi 3 elementi dell'ultima colonna rappresentano la traslazione dei punti.
L'ultima riga della matrice è fissa a `[0 0 0 1]`.

Utilizzando le matrici di rototraslazione è possibile combinare l'effetto di più rototraslazioni, precaldolando l'effetto del prodotto:

```
v' = Av
v'' = Bv' = BAv = Mv 
```

dove `M = BA` è la matrice precalcolata.

Grazie a questa strategia risulta semplice definire delle rototraslazioni di oggetti complessi.

Ad esempio per spostare un elicottero sarebbe prima necessario applicare la rototralazione dell'elicottero e poi rototraslare il rotore dell'elicottero, mentre con questa strategia si riesce a pre-calcolare la rototralazione del rotore rispetto all'elicottero.

Quando con OpenGL viene effettuata la rotazione o la tralazione, queste vengono composte di default con lo stato attuale dell'ambiente. Pertanto quando viene definito il sistema di trasformazione è necessario caricare come prima cosa la matrice identità.

OpenGl rende disponibli anche due comandi: push metrics e pop metrics, i quali rispettivamente salvano e ripristiano la matrice di rototraslazione corrente.
In questo modo è possibile definire più rototralasioni distinte rispetto ad un certo sistema.

Ovvero, sempre nel caso dell'elicottero è possibile fare:

```
inizializzazione
rototraslazione dell'elecottero M
push metrics
rototralazione del rotore principale M * N
pop metrics
rototraslazione del rotore di coda M * V
```

Grazie a queste due operazioni è possibile spostarsi sul **scene graph** (o albero) che rappresenta le varie rototraslazioni degli elementi della scena.

### La quarta coordinata

Andando a modificare il vettore che rappresenta un punto, in modo che l'elemento *w* venga utilizzato per normalizzare gli altri valori del vettore

```
    x   x/w
P = y = y/w
    z   z/w
    w    1
```

In questo modo si possono recuperare anche i **punti all'infinito**, settando *w = 0*, che permettono di fermare la tralazione del punto.
Questi punti risultano utili per rappresentare gli oggetti che si trovano tanto distanti che non ha senso che si muovano (stelle, sole, montagne nello sfondo, ecc.). Tra l'altro la rotazione di questi punti continua a funzionare, quindi se la scena ruota, anche questi punti ruotano.

Esite quindi il comando OpenGL `glVertex4f` che permette di settare anche la quarta coordinata di un vertice:

- `glVetrex2f`: vertice bidimensionale, `z=0` e `w=1`
- `glVertex3f`: vertice tridimensionale, `w=1`
- `glvertex4f`: vertice tridimensionale con `w` settabile.

Lo stesso comando può termianre con `f`, `d`, ecc. che specifica il tipo di delle coordinate (float, double, ecc.).

# Trasformazione 3d -> 2d

Volenti o dolenti, l'ambiente tridimensionale deve comunque essere rappresentato in modo bidimensionale.

OpenGL permette due tipologie di trasformazioni:

## Ortogonale

`glOrtho`: viene definito un'asse *z* di una certa dimensione che viene utilizzato per *schiacciare* sul piano determinato da *x* e *y*. Il comando vuole anche gli estremi per *x* e *y*. Le dimensioni degli oggetti non vengono trasformate e se un oggetto esce in parte dalla proiezione, questo viene clippato. Il comando costruisce una sorta di finestra virtuale. Sotto il cofano, OpenGL costruisce una matrice di proiezione che manda le coordinate dello spazio sulla finestra che viene visualizzato.

## Prospettica

`glFrustum`: lo spazio tridimensiona che parte da "dietro lo schermo" viene schiacciato in una finistra, diminuendo le dimensioni degli oggetti che si trovano via via più lontani. 

```
1 0   0  0   x      x     -(d*x)z
0 1   0  0 * y  =   y   = -(d*y)z
0 0   1  0   z      z       -d
0 0 -1/d 0   1    -z/d       1
```

Dove *d* è la distanza dell'osservatore dal piano. Minore è il valore di *d*, maggiore è l'effetto grandangolo, al crescere di *d* il campo visivo diventa un teleobiettivo.

Per calcolare la proiezione corretta è necessario sapere la distanza dell'osservatore dallo schermo e le dimensioni di quest'ultimo.

Il comando OpenGL per questa trasfomrazione richiede il valore per il +o-x, +o-y, la distanza dallo schermo dell'osservatore e la distanza del piano **far**, ovvero la distranza massima che gli oggetti possono avere, se ci sono oggetti a distanza superiore, la libreria clippa.

**z-buffer** meccanismo hardware della GPU che utilizza una logica dell'algoritmo del pittore a livello di pixel, ovvero quando si tratta di effettuare la rapresentazione, la scheda grafica usa un buffer di supporto per descriminare la distanza dei pixel dall'osservatore, in modo da rispettare l'ordine degli oggetti in poco tempo.

Ovvero, se c'è da raprresentare un palazzo con dietro un automobile, se  viene disegnato prima il palazzo, quando è il momento di disegnare l'automobile, la scheda grafica si accorge che i pixel del palazzo sono più vicini rispetto a quelli dell'automobile e quindi non la disegna.

Se invece c'è da disegnare un vaso di fiori davanti al palazzo, vengono aggiornati sia i pixel che il valore del buffer che contiene la distanza.

Queste distanze non è importante che siano preciso, l'importante è la monotonicità, un pixel lontano deve avere una distanza maggiore di un pixel vicino.

C'è però un limite fisico, lo z-buffer non può rappresentare un valore infinito pertanto viene limitato dal massimo numero float rappresentabile dal computer, mentre le librerie grafiche permettono di andare all'infinito.

Servono quindi dei barbatrucchi per gestire l'infinito che consistono nell'utilizzare il paino far, oppure prima viene disegnato il piano infinito (o molto molto lontano) senza utilizzare il z-buffer, una volta finito di disegnare questi oggetti, viene limitato il piano far e riattivato lo z-buffer per la gestione delle facce nascoste nella rappresentazione degli oggetti che possono tra loro sovrapporsi.

# Esempi

Ancora i due triangoli. Questi si disegnano tenendo pulito l'ambiente, grazie al push/pop metrics.
Tuttavia la profondità non viene rispettata, ovvero il triangolo giallo non riesce a coprire il triangolo viola perché non viene utilizzato il z-buffer e il triangolo viola viene sempre disegnato sopra a quello giallo.

Per abilitare lo z-buffer è necessario dare il comando `glEnable(GL_DEPTH_TEST)`. Per poterlo usare è necessario che venga inizializzato quando viene inizializzato l'ambiente `glutInitDisplay(GLUT_RGB | GLUT_DEPTH | GLUT_DOUBLE)`.
Questo vale per la libreria GLUT, non è detto che tutte le altre librerie funzionino allo stesso modo.
Un'ultima cosa, prima di disegnare tutto è necessario pulire il buffer con `glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)`.
Una volta configurato il tutto, le parti nascoste vengono rappresentate in modo corretto.

# Il piano near

Dal momento che è possibile vedere solo gli oggetti che si trovano compresi tra il piano near e quello far, si riescono a rappresentare solamente gli oggetti che si trovano ad una distanza minima dall'osservatore pari alla distanza del piano near.

Quindi per rappresentare un'oggetto che si trova tra l'osservatore e il piano near è necessario effettuare qualche barbatrucco.

Il barbatrucco consiste nel cambiare sia la distanza del piano near che le dimensioni della finestra che viene visualizzata in modo proposizionale.

Ad esempio passando da `glFrustrum(-1,1,-0.5f,0.5f,4,1000)` a `glFrustrum(-0.25f,0.25f,-0.125f, -0.125f, 1, 1000)`.

Se non è ancora abbastanza, si può sclare a piacere, con la limitazione che la distanza del piano near non può essere 0.

# Gestione delle luci nelle immagini sintetizzate

Il colore che noi vediamo dipende da come un fascio di luce interagisce con il materiale che colpisce.
Se cambia la sorgente di luce, l'oggetto sembra cambiare di colore.

In modo simile, anche la luce riflessa dagli altri oggetti influenza il colore e anche l'inclinazione con la quale i raggi colpiscono la superfice.

Più i raggi sono paralleli, meno energia luminosa viene assorbita e quindi più scura sembra la superfice.

L'energia luminosa di un'oggetto dipende anche dalla distanza, maggiore è la distanza, minore è l'energia.

Per mimare questo effetto si può utilizzare la scala RGB per specificare quanta luce l'oggetto riemette quando viene colpito.
Così facendo è possibile associare ad un oggetto il suo colore come materiale, che viene interpretato come l'oggetto riemette la luce che lo colpisce.

In questo modo se cambia la luce che colpisce l'oggetto si ha anche un cambio del colore visualizzato dell'oggetto.

Così facendo serve un meccanismo per ridurre i valori della terna RGB per gli oggetti lontani dalla sorgente luminosa.
Questo sistema di scala deve tener conto anche della massima luminosità che si riesce a rappresentare con il mezzo di trasmissione (ad esempio il proiettore scrauso dell'aula).

Nel sistema HDR le immagini interne vengono rappresentate con delle sorgenti luminose spropositate (oltre il 255) perché tanto quelle luminosità non possono essere rappresentate dal mezzo fisico e quindi quando vengono scalate vengono rappresentate correttamente.

L'alternativa è quella di prelimitare l'intensità luminosa, rischiando però di non riuscire a rappresentare tutte le intesità luminose della scena.

Per le sorgenti luminose che si trovano molto lontano da due oggetti che sono vicini tra loro, possono essere considerate come una sorgente direzionale che colpisce i due oggetti in modo uguale.

C'è da tenere in considerazione l'inclinazione tra i raggi e la superfice. Se i raggi sono paralleli alla superfice, questa non viene illuminata, mentre se è perpendicolare l'illuminazione è massima.
Per poter fare questo calcolo è necessario definire le normali ad ogni superfice (vettore perpendicolare alla superfice). Tanto più la normale è parallela al versore della sorgente luminosa, tanto più la superfice viene illuminata.

