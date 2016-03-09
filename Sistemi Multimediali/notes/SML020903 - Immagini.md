# Lezione 2 - Immagini

Le immagini possono essere rappresentate come degli array bi-dimensionali.

# Colori delle immagini - RGB

Il modo più semplice per rappresentare un'immagine è quello di rappresentare l'intensità del colore.

Alternativamente è possibile campionare il valore dei colori utilizzando i tre colori primari utilizzando la scala **RGB**.

Tipicamente la retina umana riesce a distinguere 150 livelli di intensità di colore, quindi tipicamente viene utilizzato un byte per rappresentare i colori.
Così facendo il colore di un pixel in bianco e nero richiede un solo byte, mentre utilizzando RGB servono 3 byte, ovvero 24 bit.
Dal momento che 24 bit è un numero sifgato in informatica, si preferisce usare 4 byte, ovvero 32 bit, utilizzando i bit extra per rappresentare maggiori soglie di colore, tipicamente il verde, oppure utilizzare ulteriori 8 bit per rappresentare il canale alpha, ovvero la trasparenza.

Storicamente i colori sono stai rappresentati anche con RGB a 16 bit, utilizzando 5 bit per il rosso e il blu e 6 bit per il verde.
Questa codifica porta a dei problemi nel caso di immagini sfumate che vengono rappresente con delle bande che la retina riesce a distinguere.
Al giorno d'oggi questa codifica viene utilizzata per retrocompatibilità dal momento che non ci sono più i problemi computazionali che hanno portato a quella codifica.

## Codifica Giallo-Ciano-Magenta

Quando l'immagini viene visualizzata utilizzando luce riflessa, come la carta stampata, il colore che viene utilizzato serve per bloccare i fotoni in modo che chi visualizza l'immagine percepisca il colore corretto.

Segue quindi che il controllo del colore su carta stampata è complementare a quello del monitor.
Perciò è stata proposta la codifica GialloCianoMagenta che permette di ottenere in forma complementare la scala RGB.

Così facendo è possibile convertire RGB in GCM utilizzando 1-R, 1-G, 1-B.
Ad esempio per ottenere una linea di colore rosso, viene stampata una linea utilizzando il giallo e il magenta.

Tipicamente per rappresentare il nero viene utilizzando l'inchiostro nero, questo per motivi pratici: meno sbavature e minor consumo di inchiostro.

La rappresentazione utilizzata all'interno del calcolatore è indifferente, tipicamente viene utilizzato RGB perché è stata la prima proposta.

La codifica RGB prende il nome di **additiva**, perché si parte dal nero, mentre la codifica GCM prende il nome di **detrattiva**, perché si parte dal bianco e si va a togliere colore.

## Codifica HSI

Per ottenere colori complessi, utilizzare RGB non è intuitivo, è stata quindi proposta una la codifica HSI, ovvero **Hue Saturation Intensity**, la quale viene rappresentata utilizzando un disco o un trinagolo contenente tutte le possibili sfumature di colore realizzabile.

Così facendo l'utilizzatore finale riesce a scegliere più agevolemente il colore desiderato.

Dal disco/trinagolo viene solamente scelto la sfumatura (**Hue** e **Saturation**), per regolare l'intensità viene utilizzato uno slider che regola la quantità di nero.

Nonostante ciò, la codifica interna al calcolatore è RGB e si basa sempre su un sistema a 3 coordinate, indipendentemente dalla codifica utilizzata.

## Colori rappresentabili

RGB permette di codificare tutti i colori, tuttavia non sempre è possibile rappresentarli tutti, pertanto viene effettuata una proiezione dei colori utilizzando solamente due dimensioni, fissando l'intensità del colore al massimo.

C'è poi un limite fisico sui colori che possono essere rappresentati e la maggior parte della volte è possibile rappresentare solamente un sottospazio dei colori, che prende il nome di **gamut** e dipende dal monitor o dalla carta utilizzata.

**immagine 1**

Tipicamente per limitare questo problema nel caso di applicazioni che richiedono la massima fedeltà dei colori, vengono utilizzanti dei **profili colori** che permettono di mappare i colori visualizzati vengono resi il più fedele possibili ai colori teorici.

Così facendo, quando viene utilizzato un profilo colore per rappresentare il bianco RGB assoluto (#FFFFFF), il monitor in realtà rappresenta un colore leggermente diverso (come #FCFCFD) ma che per le proprietà fisiche del monitor viene visualizzato come il bianco puro.

Tipicamente questa configurazione è determianta dal driver del monitor/stampante e al massimo l'utente può scegliere quale dei possibili profili utilizzare.

# Manipolazione delle immagini

Ci sono un'infintà di motivi per voler comprimere dal dimensione di un'immagine e questo può essere fatto sia mantenendo la stessa qualità (**loss-less**) che sacrificando informazioni poco importanti.

Ci sono tre tipologie principali di filtri:

- **Filtri puntuali**: sono delle funzioni che vengono applicate pixel per pixel, senza tenere conto di che cosa c'è attorno, tipicamente regolano il contrasto, la luminosità o la gamma correction.
- **Filtri locali**: sono delle funzioni che lavorano su gruppi di pixel vicini. Vengono utilizzati per modificare i rapporti di forza che ci sono tra pixel vicini, come quando si vuole fare anti-aliasing, blur, sharpening, ecc. Tipicamente vengono applicati utilizzando una matrice kernel che scorre l'immagine e che definsce dei pesi per modificare i valori dei pixel.
- **Filtri globali**: sono filtri che vengono applicati sulla totalità dell'immagine, ovvero considerano il rapporto del pixel su tutta l'immagine. Sono quelli più pesanti da applicare ma sono quelli più efficaci. Tipicamente utilizzano le varie trasformate, come Furier, Coseno, e si basano su tanta matematica complessa. Fortunatamente ci sono già degli algoritmi molto efficaci per applicare questi filtri. Questi filtri sono quelli che permettono di trasformare notevolmente la dimensione dell'immagine, rendendo possibile comprimerla, eliminando i dati relativi a delle frequenze poco significative.

Tipicamenete l'effetto dei filtri è speculare rispetto alla granularità  con la quale lo si applica, ovvero un filtro puntuale ha un effetto globale su tutta l'immagine, mentre un filtro globale fa delle modifiche fine che sono difficili da percepire.

## Filtri puntuali

Sono i filtri che stanno alla base della manipolazione delle immagini.

**esempio del filtro che cambia la luminosità di un'immagine**

Il filtro di luminosità scansiona tutta l'immagine e modifica il valore dei pixel, moltiplicandolo per un fattore di scala.

Il filtro per l'aumento del contrasto esegue due passate, nella prima calcola l'istogramma delle luminosità dell'immagine e nella seconda passata scala la luminosità del pixel in modo da aumentare la differenza tra le parti più chiare e quelle più scure.

Il filtro di gamma correction modifica l'intensità del colore utilizzando una curva esponenziale:

```
Iout = Iin^gamma
```

Questo filtro risulta particolarmente importante perché i pixel del monitor, così come le lampade, tendono ad avere una trasformazione espnenziale dell'intesità. È quindi necessario pre-filtare l'intensita luminosa con una curva esponenziale complementare alla curva del dispositivo in modo che quest'ultimo visualizzi l'immagine con l'intensità luminosa corretta. 
Tipicamente questo filtro è integrato nella regolazione del profilo colore di un monitor.

L'applicazione di un filtro non sempre è reversibile, ad esempio modificando la luminosità dell'immagine può succedere che il nuovo valore per il colore diventi superiore a 255, in questo caso viene eseguito il **clamping** del valore e viene posto a 255. 
Quando questo succede, vengono perse delle informazioni e se si applica il filtro inverso non si ottiene l'immagine precedente.

## Filtri locali

Sono quei filtri che producono un pixel di output a partire da una matrice di pixel dell'immagine originale.

Ci sono due tipologie principali:

- **convoluzione**: utilizza le informazioni dei pixel adiacenti per modificare il valore di un singolo pixel (filtri a kernel). Tipicamente vengono utilizzati per lavorare sui particolari delle immagini.
- **deformazioni/distrorsione**: sono quei filtri ricampionano l'immagine di partenza, riscalando o distorcendo la forma dell'immagine.

Un esempio di filtro transoformazionale è quello che dimezza la dimensione dell'immagine originale, producendo una nuova immagine scartando un pixel ogni pixel.
Lo stesso filtro può essere migliorato utilizzando un interpolazione lineare per permettere di ridimensionare l'immagine di un fattore qualsiasi utilizzando un passo di campionamento diverso. Non c'è nessun vincolo nell'utilizzo dell'interpolazione lineare, è possibile utilizzare anche quella quadratica o cubica e allo stesso modo è possibile scegliere a piacere la dimensione dell'intorno di pixel sul quale effettuare l'interpolazione.
Le schede grafiche riescono ad applicare questo filtro direttamente utilizzando l'hardware.

Per quanto riguarda i filtri su kernel, è possibile utilizzare il kernel:

```
 0 -1  0      0 -1  0     0  0  0 
-1  5 -1 ==> -1  4 -1  +  0  1  0
 0 -1  0      0 -1  0     0  0  0
```

che in qualche modo approssima la discesa di gradiente sul campionamento dell'immagine, per via della prima componente, la quale approssima il valore della derivata seconda.
Così facendo, nelle zone in cui c'è una tonalità costante non modifica di molto, ma nelle zone in cui c'è una netta variazione di intensità andrà ad aumentare la variazione, andando quindi a rendere più visibile i particolari (**filtro di sharpening**).

Per effetture il blur dell'immagine (sfocatura) è necessario utilizzare un kernel tipo

```
 0  1  0 
 1  1  1 
 0  1  0 
```
Un caso d'uso di questo kernel è nell'implementazione di un filtro anti-aliasing.

Utilizzando come kernel quello sotto riportato è possibile evidenziare i contorni degli elementi nell'immagine.

```
 0 -2  0 
-2  8 -2
 0 -2  0
```

## Filtri globali

Si tratta di filtri che prendono in considerazione tutti i pixel dell'immagine e generarno dei coefficienti che li approssimano.

Il problema principale di questi filtri è che sono computazionalmente pesanti, l'approccio naive tipicamente richiede *O(n^4)* sul numero di pixel (larghezza o altezza).

Dei miglioramenti si ottengono utilizzando immagini con dimensione espressa come potenza di due e dall'osservazione che è possibile applicare separatamente il filtro prima sulle righe e poi sulle colonne, sommando gli effetti. In tutto si riesce a scendere ad *O(n^2 log(n))* e considerando che il numero totale di pixel è *n^2* il risultato è già buono.

Il funzionamento di questi algoritmi parte dal campionamento del segnale dato dall'immagine per ottenere un'approssimazione del segnale che generato l'immagine utilizzando le trasformate discrete di fourier.

Così facendo è possibile rappresentare le immagini utilizzando le armoniche ottenute applicando fourier (**spettro del segnale**) e una caratteristica delle trasformate discrete è che per campionare *n* campioni servono *n* armoniche. 

Per rappresentare un'armonica sono necessari due coefficienti, uno per la fase e uno per l'ampiezza, pertanto risultano ultili per effettuare le modifiche ma non per comprimere le immagini.

### Trasformata di Fourier

Partendo da un'immagine di dimensione *L x H* la trasformazione con fourier produce una matrice sempre di dimensione *L x H* con ogni cella che contiene due valori, l'ampiezza e la fase di un'armonica.
La totalità delle armoniche permette di ottenere la funzione per il calcolo dei valori dei pixel.

Al centro della matrice ci sarà l'armonica che rappresenta la componente media e man mano che ci si sposta verso i bordi si ottiene un'aumento della frequenza.