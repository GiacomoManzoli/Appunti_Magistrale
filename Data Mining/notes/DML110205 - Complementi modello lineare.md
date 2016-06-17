# Complementi legati al modello lineare classico

## Risposta multidimensionale (§2.1.3 del libro)

E' possibile stimare tanti motelli lineari con la stessa matrice *X*.

Ovvero si hanno *q* variabili esplicative, contenute in una matrice di *q* colonne e *n* righe.
La matrice *B* dei parametri risulta quindi essere di dimensioni *p x q*.

Se la matrice delle varianze-covarianze degli errrori *E* ha tutti 1 sulla diagonale si riesce a stimare *B* con la classica formula.

## Algoritmi diversi per contesti diversi (Aspetti computazionali)

La cosa più computazionalmente pesante è il calcolo *(X^TX)^-1* che con la fattorizzazione di Cholesky ha un costo di *p^3 + np^2 /2*.

In alternativa se c'è più memoria a disposizione si può utilizzare la fattorizzazione QR, ottenenendo *beta = R^-1 Q^T y* e *y = QQ^Tx*con una complessità di *np^2*.

L'altra alternativa è data dall'algortimo di GramSchimdt che effettua un cambio di variabile in modo da ottenere una matrice delle variabili ortogonali che rende più semplice la regressione.

Però se *n* è molto grande nessuna delle precedenti soluzioni non funzionano, una matrice di un miliardo di righe difficilmente riesce a stare nella memoria e allo stesso modo può essere interessante avere un modo per aggiornare le stime quando sono disponibili nuove osservazioni.

*W = X^T X* e *u = X^T y*.

Sia *x~_i* l'i-esima riga di *X* trasformata in un vettore colonna.
Si può quindi scrivere

W come la sommatoria di *x~_i x~_i^T* e *u* come sommatoria *x~_i y_i*

Così facendo quando arriva l'osservazione *j* si ha

*w_(j) = w_(j-1) + x~_j x~_j^T* e *u(j) = u(j-1) + x~j y_j*

ovvero i dati possono essere facilmente effettutata.

Tuttavia si ha che *beta_j = W_j^-1 u_j* ed effettuare l'inversione è oneroso. Serve quindi un algoritmo che eviti di dover calcolare l'inversa ad ogni nuova evidenza.

Sia *V_(n) = W_(n)^-1*. Seguono le formule per il calcolo di *V_(n+1)* utilizzando la formula di Sherman-Morrison.

*V(n+1) = (W(n) + x~(n+1)x~(n+1)^T)^-1 = (sostituzione degli elementi dentro la formula di Sherman)*

Ovvero si riesce ad ottenere l'inversa che permette di calcolare il *beta_n+1* in termini di *beta_n* e dell'errore commesso nel prevedere *y_n+1* utilizzando *beta_n*.
(filtro lineare e guadagno)

C'è quindi un meccanismo di machine learning che permette di imparare dagli errori.

In modo compatto la formula diventa

*beta_n+1 = beta_n + k_n e_n+1*

dove *k* è il guadagno del filtro e *e_n+1* è l'errore di previsione con il modello precedente.

Da notare che perché il tutto funzioni è necessario partire da una matrice con almeno *p* elementi (numero di variabili) che deve essere invertita almeno una volta.

Se *n* è molto maggiore di *p* si ha che si può utilizzare come matrice di partenza *V_p* uguale all'identità e con *beta_p = 0_p* perché i restanti *n-p* dati sono prelevanti. Così facendo non si ottiene un risultato preciso ma un'approssimazione che risulta migliore se *n* è molto più grande di *p*. (Da notare che quando si parte da una matrice fissata, anche i primi *p* dati vengono utilizzati per effettuare l'aggiornamento)


## Caratteristiche dei modelli (§3)

Cosa vuol dire che un modello si adatta ai dati?

Supponendo di avere 30 osservazioni, si hanno a disposizione i vari polinomi di grado 29 o inferiore per interpolarle.

Ma come si sceglie il polinomio migliore?

Si nota che sui dati forniti i polinomi di grado alto commettono pochi errori, però all'arrivo di nuovi dati l'errore commesso dai polinomi di grado basso risulta minore.

Se conoscessimo la funzione *f(x)* sarebbe possibile calcolare il valore atteso tra i quadrati delle differenze tra la stima e il valore vero.

Questo valore atteso può essere scomposto in due componenti, il bias (distorsione) e la varianza (figura 3.7 e 3.8 del libro).

Dal momento che non è nota la vera funzione, si possono utilizzare due gruppi di dati distinti, il primo per calcolare i polinomi e il secondo per valutarli.

Aumentando troppo il grado *p* dei polinomi si verifica l'overfitting.

La scelta può esseere fatta con:

1. Una penalizzazione della devianza tra i dati in modo che all'aumentare della dimensione del modello la qualità del modello peggiori. Il sistema migliore è quello di utilizzare la log-verosimiglianza per un po' di statistica data per poco interessante. (Criterio di Akaike)
2. Utilizzo di un training set e di un test set scelti casualmente + validation set.
3. k-Fold Cross Validation: divide i dati in k insiemi e a turno ne usa uno solo per la verifica. Il valore ottenuto per il parametro di penalizzazione è quello che minimizza l'errore.
