# Recap

K-Fold CV con 1 per fare il leave one out.

Sempre in questo caso è possibile andare a calcolare i vari *e_i* effettuando una sola volta l'apprendimento del modello, grazie alla formula di Sherman Morrison.

*y_i - ycappello_i = (y_i - ycappello_i) / (1 - Pii)*

dove *P* è la matrice di proiezione.

# Scelta delle variabili (§3.6)

L'idea più semplice è uqella di effettuare una **regressione con tutti i sottoinsiemi di variabili**, ovvero vegono creati tutti i possibili modelli con quel determinato numero di variabili e poi sceglie il migliore con quel dato numero di variabili per poi confrontarlo con gli altri modelli migliori.

Ci sono vari criteri di confronto dei modelli, Somma dei quadrati dei residui, R^2, statitica F.

Il problema di questo approccio è che se il numero di variabili è grande, il tempo richiesto è troppo elevato.

La **selezione passo passo** parte invece dal modello pieno, se fatta all'indietro, o dal modello vuoto, se parte dal modello vuoto e aggiunge o toglie le variabili in modo da migliorare il più possibile il modello.
Aggiunge sempre la variabile più significativa oppure toglie sempre quella meno significativa.

# Gli iper-parametri

Ogni procdetura ha uno o più parametri di regolazione: gradi del polinomio, dimnesione del sottoinsieme di variabili, ecc.

(ha tagliato corto)

# Trasformazione delle componenti principali (§3.6.2)

Scegliamo un insieme di combinazioni linerari delle x e addiattiamo un modello di regressione per la variabile risposta usando come esplicative queste combinazioni lineari.

(niente parte relativa alla ridge/lasso)

---

# Un'altra strada

Dati relativi a 200 automobili, cosa succede alla percorrenza urbana al variare della cilindrata?

Il tutto senza utilizzare un modello parametrico, cercando di minimizzare il numero di ipotesi riguardo il modello.

Come sempre si vuole minimizzare una funzione di perdita

L(y, f(x)) = (y - f(x))^2

e dal momento che interessa per tutte le y viene preso l'errore quadratico medio di previsione. *f* è il nostro modello, *y* è il valore vero.

La soluzione di questo problema di minimo è

f(x) = E{y | x= x0}

Ovvero la funzione che minimizza l'errore è il valore atteso condizionato, cioè per ogni possibile x0 viene fatta la media delle *y* associate a quel determinato valore *x0*.

Questa funzione prende il nome di **funzione di regressione**.

C'è un problema se non sono noti dei valori per un determinato *x0*.

La prima idea è quella di prendere il valore medio delle *y* che ricadono in un intorno del punto desiderato. (**Metodo dei vicini più prossimi (Nearest Neighboor)**)
L'intervallo è dato dalle *K* osservazioni più vicini a quelle desiderata.

## Regressione lineare locale (§4.2)

Se f(x) è una funzone derivabile in x0, allora è localmente approssimabile con una retta passante per (x0, f(x0)), utilizzando la formulazione di McLaurin

f (x) = f (x0) + f ′(x0) (x − x0) + remainder

L'idea è quindi quella di stimare la retta passante per quel punto ai minimi quadrati, pesando le *xi* con una funzione *w* (nucleo o kernel) la quale da più peso ai punti vicini piuttosto che a quelli lontani dal punto di interesse.

Da notare che con questa formulazione la stima ai minimi quadrati viene effettuata per ogni punto che viene richiesto.

Come funzione kernel può essere usata la funzione normale con una variana *h* oppure un kernel rettangolare.

(Formulazione di f cappello con S_h)

### Scelta del kernel

La funzione kernel può essere vista come una funzione di densità che vale 1 tanto più è vicina al centro.

C'è da notare che la scelta del kernel è poco influente sulla forma della funzione che si ottiene, è *h* che risulta essere più influente.

Tabella 4.1 del libro.

La scelta della normale è analiticamente utile, però le funzioni come quella biquadratica che sono limitate in un determianto intervallo risultano computazionalmente più efficienti.

### Scelta di h

*h* regola il trade-off tra varianza e distorsione.

§4.2.2

Si ha che la distrorsione cresce come multiplo di *h^2* e cala al crescere di *h*.

In ogni caso, al crescere di *n*, *h* tenede sempre a 0.

Ci sono varie tecniche:

- Divisione in training e test set
- Cross valdiation
- Metodi basati su considerazioni teoriche asintotiche
- A occhio

In ogni caso l'errore quadraticome medio ottimale è un O(n^(-4/5)) che risulta sempre peggiore di quanto sbaglia il modello parametrico.

Tuttavia i sono dei casi in cui conviene utilizzare il modello non parametrico.

Volendo si può scegliere un *h* parametrico che varia in base alla distibuzione dei punti (**ampiezza di banda variabile**).

**loess**: determinaimo un'ampiezza di banda che include un certo numero o percentuale di punti prefissato. QUesto comporta automaticamente ad una regolazione dell'ampiezza di banta a seconda della sparistà dei dati; intolre combinando questa idea con l'uso di una stima locale robusta, ovvero non si lascia influenzare da valori molto distanti.

## Bande di variabilità

non sono intervalli di confidenza e valgono punto per punto e non globalmente

...

## Regressione lineare locale con 2 variabili

Il problema cambia di poco, basta modificare la formula dei minimi quadrati pesati e utilizzare una funzione di peso congiunta tra le due variabili.

