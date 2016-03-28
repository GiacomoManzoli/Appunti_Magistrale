# La trasformata di Fourier

Un segnale campionato, come le immagini, è sempre Fourier trasformabile utilizzando la trasformata discreta.

Una volta ottenute le varie trasformate del segnale di partenza, l'operazione inversa che permette di ricomporre le varie trasformate prende il nome di **antistrasformata**.

C'è un limite preciso al numero di sinusoidi utilizzabili per rappresentare un segnale capionato. Se un segnale ha *n* campioni, questo potrà essere campionato al massimo con *n* sinusoidi.

Il problema è che un segnale sinusoidale è identificato da 3 parametri: ampiezza, fase e frequenza.
La frequenza è nota ed è stabilita dai campioni utilizzati, mentre l'ampiezza e la fase devono essere memorizzate per ogni sinusoidi.

Quindi per rappresentare *n* campioni sono necessari *2n* valori che vengono storicamente rappresentati come numeri complessi.

## Calcolo dei coefficienti della trasformata di Fourier

A noi non interessa l'algoritmo preciso dal momento che c'è già la **Fast Fourier Tranform** che rappresenta lo stato dell'arte.

Per ottenere le frequenze si ragiona sui campioni. Il sinusoide di frequenza minima rappresentabile dai campioni è *sin(0t +90°)* mentre al massimo si riesce a campionare un segnale che cambia sempre di segno tra un campione e l'altro.

Le frequenze che si hanno a disposizione sono quindi:

- *2π0*
- *2π 1/N*
- *2π 2/N*
- ...
- *2π (N-1)/N*

Il calcolo degli altri coefficienti viene effettuato facendo la moltiplicazione membro a membro tra i vari sinusoidi e il segnale campionato (prodotto scalare tra funzione):

```
Sommatoria_t x(t) sin(2π(n/N)t+phi)
```

in questo modo il sinusoide fornisce un coefficiente *C(n)* che specifica quanto è presente quella sinuoside *n*-esima.

Resta il problema del determinare la fase.
L'idea è quella di andare a fare il match tra il segnale campionato, la sinusoide e la cosinusodide:

```
Cs(n) = Sommatoria_t x(t) sin(2π(n/N) t)
Cc(n) = Sommatoria_t x(t) cos(2π(n/N) t)
```

Così facendo i due coefficienti rappresentano rispettivamente la similarità tra il segnale campionato e la sinuoside *n*-esima e tra il segnale campionato e la cosinusoide *n*-esima.

La stessa cosa può essere espressa utilizzando la notazione esponenziale che ingloba il match del seno e del coseno, utilizzando la forma di eulero.

```
Ae^{ix} = A\cos x + Ai\sin x

Sommatoria_t x(t) e^(-i2π(n/N)t)
``` 

Quindi per calcolare la trasfomrata di Fourier è necessario fare un primo `for` per tutte le frequenze che ha all'interno un altro `for` su tutti i campioni.

### FFT - Fast Fourier Transform

Se il numero dei campioni è un esponenziale di *2* si riesce a calcolare le trasfromate in *Nlog_2N*.

L'algoritmo funziona riordinando i campioni in modo che vengano prima presi in considerazione i campioni pari e poi quelli dispari.

Così facendo si ottiene un algoritmo che calcola la trasformata di Fourier come la somma della trasformata calcolata sui campioni pari e quella calcolata sui campioni dispari.
Così facendo viene dimezzata la complessità dell'algoritmo.

Lo stesso ragionamento può essere ripetuto finché non viene calcolata una singola trasformata di Fourier per ogni campione.

Di fatto non viene mai calcolata la trasformata di Fourier perché la traformata di un singolo campione è il campione stesso.

Il tutto funziona per come viene effettuata la ricomposizione delle singole trasformate.

Così facendo vengono ottenuti due valori *Ri* e *Ii* che rapresentano la trasformata con la frequenza *i*-esima.
In questo modo la radice della sommam dei quadrati da l'ampeizza e la fase del numero complesso da lo sfasamento.

Lo spettro del segnale campionato sarà quindi dato da *R0,I0,R1,I1....Rn,In*.


### Antistrasformata

Per tornare indietro e ottenere il valore del segnale campionato originale vengono usate le varie sinusoidi:

```
x(t) = Sommatoria_n Cs(n)sin(...) Cc(n)cos(...)
     = Sommatoria_n C(n)e^(i2π(n/N)t)
```

C'è da precisare che o nella trasformata o nell'antitrasformata è necessario effettuare una normalizzazione sul numero di campioni.

Anche per il calcolo dell'antitrasfromata è possibile adottare la stessa strategia di **FFT** perché la formula è la stessa, cambia il segno dell'esponente.


### Alcune considerazioni

Questo discorso vale per le trasformate lineari.
A noi questo procedimento interessa per le immagini, che sono uno spazio bidimensionale e non lineare.

Per continuare a far funzionare la baracca è necessario utilizzare la trasformata bidimensionale di Fourier, la quale trasforma una superfice in una serie di onde bidimensionali e sinusoidali, caratterizzate da due frequenze, la prima che specifica la frequenza orizzontale e l'altra quella verticale.

Anche in questo caso la frequenza viene fissata dai campioni ed è rappresentabile da una griglia *L x H*:

- Nell'angolo in alto a sinistra *(0,0)* c'è la componente continua,
- Nell'angolo in alto a destra *(0,n)* c'è la frequenza orizzontale massima e verticale continua.
- Nell'angolo in basso a sinistra *(m,0)* c'è la frequenza verticale massima e orizzontale continua.
- Nell'angolo in basso a destra *(m,n)* c'è la frequenza massima.

L'approccio *naive* richiede *N^4* operazioni, ma utilizzando una variante della **FFT** e grazie al fatto che la trasformata di Fourier può essere prima calcolata per colonne e poi per righe ed infine di ottenere il risultato sommando le due trasformate ottenute.
Si ottiene così una complessità di *O(N^2 log_2(N))*.

Nel caso pratico si ha che tipicamente viene effettuata una traslazione degli assi, ovvero si cerca di fare in modo che la frequenza più bassa, anziché essere nell'angolo in alto a sinistra, viene spostata al centro.

Questa traslazione rende più semplice alcune operazioni come la compressione oppure l'applicazioni di filtri passa-alto e passa-basso.

Ad esempio applicando un filtro passa basso è possibile scartare i dettagli dell'immagine in favore di una maggiore compressione.
Utilzzando un filtro passa-alto che moltiplica i valori sopra una certa soglia, si riesce ad ottenere un effetto si sharpening.

In ogni caso la trasfromata di Fourirer viene utilizzata nell'elaborazione delle immagini scentifiche piuttosto che nella compressione.
Infatti, applicando un filtro passa basso che elimina le frequenze molto alte, si riesce a pulire un'immagine dai distrubi di trasmissione. 

**esempio di filtro passa-alto passa-basso**

## Vantaggi della rappresentazione con trasformate

Nel caso di immagini con grandi campiture, ovvero con grandi aree dello stesso colore, bastano poche sinusoidi a bassa frequenza per rappresentare tanti pixel permettendo così una riduzione della dimensione fino al 90%.

## La trasformata di Fourier e la convoluzione

Utilizzando i filtri passa alto sulla traformata di Fourier permettono di ottenere degli effetti simili a quelli che si ottengono i filtri locali a convoluzione (quelli a Kernel).

Questa cosa non è causa, c'è infatti un teorema che dice che la traformata di Fourier del prodotto della convoluzione equivale al prodotto delle trasformate di Fourier delle componenti della convoluzione.

```
f(t) * x(t) = g(t)
/\
.|
\/
F() \cdot X() = G()
```

Quindi un filtro a convoluzione è l'antifrasformata del filtro passa alto.

Cioè è importante perché i filtri a convoluzione sono più veloci da applicare rispetto ad applicare un filtro sulle trasformate e soprattuto nella gestione dell'audio questo deve essere fatto in modo estremamente veloce.

Ad esempio l'operatore di convoluzione lineare `-1 2 -1` può essere campionato per ottenere le trasformate di Fourier in modo da applicarlo  alla trasformata di un suono.

L'altro vantaggio nell'utilizzo dei filtri a convoluzione è che possono essere applicati in tempo reale, mentre il filtro in frequenza richede la conoscenza di tutti i campioni. Anche in questo caso nel mondo del suono questo può essere una necessità, come per gli effetti della chitarra elettrica, per le immagini invece non c'è questa necessità.

# Trasformate a valori reali

La trasformata di Fourier richede due coefficienti per rappresentare la sinusoide, ci sono altre trasfromate come la **DCT** che bloccano lo sfasamento, rendendo quindi possibile rappresentare una cosinusoide con un solo coefficiente.

```
//C(n) = Sommatoria_n \cos((2πx+1)\frac{n}{N}) f(x)

C(n)= \alpha(n) \sum_{x=0}^{N-1} f(x) \cos\left[\frac{\pi(2x+1)u}{2N}\right]

\alpha(u)=
\begin{cases} \sqrt{1/N}, & \mbox{se }u=0  \\ 
\sqrt{2/N}, & \mbox{se }u\neq 0.
\end{cases}

```

Il significato di *n* e *x* varia in base a cosa si sta facendo, ovvero se si sta traspofrmando o antitrasformando.

Così facendo al variare dei campioni, varia sia la frequenza che la fase.

Si ottengono così dei coefficienti reali che possono essere interpretati come quelli della trasformata di Fourier.

Una volta calcolati i coefficienti è possibile andare ad applicare dei filtri in modo analogo a come si fa con Fourier e sempre in modo simile a Fourier è possibile utilizzare la trasformata veloce.

Se **DCT** viene utilizzata per la compressione è possibile suddividere l'immagine in quadrati con dimensione potenza di due in modo da evitare di aggiungere troppi pixel extra.

**esempio di compressione con DCT**

# Trasformazione per Wavelet

La trasformata per Wavelet parte dall'idea di utilizzare al posto dei seni e dei coseni delle funzioni definite dal progettista?
L'importante è che un segnale di *n* componenti possa essere rappresentanto da *n* wavelet.

Le wavelet più semplici sono date dalle onde quadre (wavelet di Haar?) che risultano più rapide da calcolare perché non richiedo il calcolo del seno e del coseno.

Per rendere indipendete la wavelet dalla frequenza di campionamento dati due campioni vengono rappresentanti come la loro media e la loro differenza.

... black magic ...

Così facendo si ottiene una scopomposizione del segnale di partenza con una strategia stile **FFT** che risulta molto veloce.

**immagine della codifica mediante wavelet**

Oltre alla compressione c'è il vantaggio che è possibile garantire una risoluzione minima dell'immagine, perché ad ogni iterazione viene fatta una codifica di quello che serve per arrivare al livello successivo.

Per questo motivo, gli standard di compressione video più avanti così come JPEG2000 si basano su questo tipo di compressione.

# Formati grafici per memorizzare le immagini

Il formato più semplice è il **bmp**, che è composto da un header con le informazioni riguardanti la dimensione dell'immagine e con quanti byte è rappresentato un pixel.
Dopo l'header è presente un dump della matrice dei pixel.

Si tratta ormai di un formato storicamente importante che è stato progettato quando i calcolatori facevano fatica a comprimere/decomprimere le immagini.

Dal momento che viene fatto il dump delle immagini si ottiene una codifica **lossless**, ovvero senza perdita di informazione.

## GIF e PNG

Questi formati si basano su algoritmi di compressione a vocabolario come **LZW**.

Il file prodotto contiene quindi un vocabolario che contiene la traduzione dei token in byte, seguito da uno stream di byte che cointiene i vari token.

Il problema è quello di trovare il vocabolario ottimo che riesce a comprimere una sequenza di byte utilizzando il minor numero di token possibili.

Sia GIF che PNG utilizzano questo algoritmo, con la differenza che il file contiene un header che descrive le dimensioni delle immagini.

Nel caso ottimo si riesce a ridurre la dimensione di un 30-40%.

A differenza di PNG, GIF è in grado di tenere più immagini in uno stesso file, tenendo anche un temporizzatore che specifica quanto tempo deve passare tra un'immagine e l'altra.

PNG è nato come sostituto di GIF perché inzialmente la compressione GIF era brevettatta.

PNG permette di memorizzare più layer in una stessa immagine utilizzando anche un canale alpha che specifica la trasparenza dei colori dei layer. Per questo motivo PNG è più diffuso in ambito web.

## JPEG

L'algoritmo di compressione JPEG è motlo complesso ma si basa sulla trasformata discreta coseno (DCT) suddividendo l'immagini in quadrati da *8 x 8* pixel, evitando così di dover aggiungere troppi pixel nel caso la risoluzione delle immagini non sia una potenza di 2.

Facendo la compressione blocco per blocco permette di regolare la qualità in modo da avere meno coefficienti nei blocchi con pochi particolari.
Questa compressione funzione abbastanza bene, però ci sono dei casi in cui si vedono i contorni dei blocchi di bassa qualità, specialmente quando c'è una figura con un contorno molto dettagliato a cavallo di più blocchi.

Viene fatta anche una compressione a livello delle codifica del colore, il quale non viene salvato in RGB ma viene separato in luminanza e crominanza, campionando ogni pixel la luminanza e ogni 4 pixel la crominanza.

Questo perché l'occhio umano nota molto la luminanza e meno la crominanza, quindi il più delle volte l'effetto sbavatura non si nota.

Quindi prima di applicare DCT viene trasformato lo spazio colori RGB in  YCbCr e poi viene applicato DCT sulla luminanza, dopodiché vengono sotto campionati i due spazi colori per poi essere a loro volta compressi con DCT.

Nella DCT fatta dal JPEG viene lasciata la frequenza più bassa nell'angolo in alto a sinistra, quindi durante al compressione viene effettuata a zig-zag, codificando le frequenza più alte con Hoffman, fino ad arrivare alle frequenze talmente alte che vengono scartate.

La compressione JPEG risulta quindi essere di tipo **lossy**, pertanto risulta buono per l'utilizzatore finale, ma in ambiti fotografici o altri amibiti specializzati risulta più conveniente utilizzare altri formati.
