# Maledzione della dimnesionalità $4.3

Se p cresce i punti osservati diventano sempre più sparsi nello spazio anche se n è grande.

Per un x0 fissato un interno di x0 contiene un numero irrisorio di osservazioni e gli intorni locali sono vuoti.

Si ha quindi che per avere le stesse distanze al crescere lineare dei parametri, il numero di campioni deve crescere esponenzialmente.

L'unico modo per sopravvivere a questo problema è quelli di mettere dei vincoli. Ad esempio il modello lineare ha come vincolo l'utilizzo di un iperpiano.

Questi metodi si differenziano per:

1. La particolare natura della conoscenza che assumono
2. La forza di questa imposizione
3. la loro robustezza rispetto a violazioni di questi assunti.

Morale della favola, la regressione locale non funziona bene con p molto grande, ma in generale questo è un problema di tutti i metodi locali.

# Le spline §4.4

strumento matematico per approssimare delle funzioni.

Si vogliono interpolare esattamente K punti detti nodi utilizzando dei segmenti oppure delle funzioni più lisce.

Per ottenere una buona regolarità della curva complessiva si impone la continuità dei vari pezzi ai nodi, generalmente si tratta di una continuità di grado d-1.

Se il polinomi utilizzati sono di grado 3 si hanno 4(k-1) parametri da stimare (k= numero di osservazioni) e k vincoli per interpolare i punti e 3(k-2) vincoli di continuità sulle derivate prime e seconde e sulla funzione.
Restano ancora due parametri da stimare e questo viene tipicamente fatto impoenendo la derivata seconda  0 ai bordi.

## Regressione parametrica mediante spline

Abbiamo n punti osservati che vogliamo interpolare ma questa volta non esattamente. Dividiamo l'asse x scegliendo k nodi e individuiamo una curva di tipo spline cubico che li interpola in modo adeguato.

La definizione classica di una spline viene fatta sugli intervalli, ma per un teorema di cui non ci interessa la dimostrazione, sappiamo che una qualsiasi funzione spline può essere espressa come una somma pesata di funzioni definite in tutto l'asse x.

...

### Spline di lisciamento

...

### Generalizzazione delle spline al bivariato §4.4.4


Il primo modo è quello di generalizzare la funzione obiettivo andando a sostituire la derivata seconda con il laplaciano.

L'altro modo è quello del prodotto tensionale che generalizza la spline di regressione costruendo delle funzioni di base relative ad entrambe le variabili. La funzione complessiva sarà poi la combinazione lineare di queste funzioni di base.

##MARS - Spline sul multivariato

Se il numero di parametri è maggiore di due è necessario generalizzare utilteriormente tenendo conto della maledizione della dimnesionalità.

Vengono utilizzate delle spline a partire da delle funzioni di base definite come il prodotto tensoriale di più funzioni di base univariate in modo da limitare il problema dovuta all'alta dimensionalità.

... cose ...

Una volta costruito il modello c'è da effettuare uno sfoltimeno delle basi che può essere effettuata utilizzando la **convalida incrociata generalizzata**, unva versione più efficiente della cross-validation e che funziona in modo analogo alla versione ottimizzata del leave-one-out-CV.

I modelli MARS sono difficili da implementare.

... altre cose


# Modelli additivi §4.5

La funzione viene scritta come somme di funzioni di vario tipo in modo da poter limitare la maledizione della dimensionalità.


Algoritmo di backfitting per l'apprendimento delle funzioni da sommare.

Si parte da tutte le funzioni uguali a 0 e con la "componente continua" uguale alla media delle y. (Variante dell'algoritmo di Gauss-Seidel.



Discorso su ANOVA §4.7 per questo modello con la stima dei gradi di libertà utilizzando la somma dei quadrati dei residui.


Abbiamo fatto anche la regressione Projection Pursuit §4.6