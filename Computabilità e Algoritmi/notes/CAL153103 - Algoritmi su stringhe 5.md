# Metodi seminumerici

Famiglia di algoritmi per il pattern matching che utilizzano operazioni sui bit e aritmentiche al posto del confronto di ceratteri.

## Metodo Shift-And

Metodo che funziona molto bene per pattern corti.

L'algoritmo calcola una matrice booleana *M_i[j]* con *n+1* righe e *m* colonne, tale che 

*M_i[j] = 1* se e solo se *P[i,j] = T[i-j+1, i]*

Il che implica che se nell'ultima colonna della riga *i*-esima della matrice c'è un 1, allora c'è un'occorrenza del pattern a partire dalla posizione *i-j+1*.

Prima di effettuare la ricerca l'algoritmo effettua una pre-elaborazione nella quela calcola un vettore booleano *U_x* di lunghezza  *m* per ogni carattere dell'alfabeto, tale che 

*U_x[j] = 1* se *P[j] = x*, 0 altrimenti

Ovvero *U_x* memorizza tutte le posizioni del pattern in cui compare il carattere *x*.

L'algoritmo poi si basa sull'operazione di `Shift` a destra, la quale modifica una riga di bit spostando tutti i bit a destra di un posto, scarando il bit più a destra e inserendo un 1 nella posizione più a sinistra.

```
R = 0111001000101 
BIT-SHIFT(R) = 1011100100010 
BIT-SHIFT(BIT-SHIFT(R)) = 1101110010001
```

Il vantaggio di questo approccio è che se la parola è sufficientemente corta, questa istruzione viene eseguita da una singola istruzione macchina.

La prima riga della matrice *M_0* ha tutti i bit uguali a 0 perché nessun prefisso non nullo del patter può occorrere nel testo prima del carattere 0.

Le righe successive vengon calcolate utilizzando

*M_i = AND(SHIFT(M_{i-1}), U_{T[i]}*

dove `AND` è l'operazione macchina che effettua l'and logico bit a bit.

### Dimostrazione di correttezza

La dimostrazione viene effettuata per induzione.

Il caso base riguarda *M_0*, ma questo è già stato dimostrato corretto.

Nel caso induttivo si ha che:

*M_i[1] = 1 <=> True (lo shift inserisce a sinistra un 1) e U_{T[i]}[1] = 1 ==> P[1] = T[i]*

Il primo bit risulta quindi calcolato correttamente.
Per i bit successivi al primo si ha:

*M_i[j] = 1 <=> M_{i-1}[j-1] = 1 and U_{T[i]}[1] = 1*

Per ipotesi induttiva *M_{i-1}[j-1]* è stata calcolata correttamente, quindi se *M_{i-1}[j-1] = 1*, si ha che:

*P[1, j-1] = T[i -j +1, i-1]*

Dal momento che *U_{T[j]} = 1* se e solo se *P[j] = T[i]*, si ha che 

*P[1,j] = T[i-j+1,i]*

e quindi il calcolo di *M_{i}[j]* viene effettuato in modo corretto.

### Algoritmo

```
\Function{ShiftAnd}{$P,T,\Sigma$}
    \For{$ \forall x \in \Sigma$}
        \State $ U_x \gets \vec{0} $
    \EndFor
    \For{$ j = 1 \text{ to } m$}
        \State $U_{P[j]}[j] =1$
    \EndFor
    \State $M_0 \gets \vec{0}$
    \For{$i = 1 \text{ to } n$}
        \State $M_i \text{\textsc{And}}(\text{\textsc{BitShift}}(M_{i-1}), U_{T[i]})$
        \If{$M_i[m] = 1$}
            \State occorrenza in $i -m +1$
        \EndIf
    \EndFor
\EndFunction
```

La complessità dell'algortimo è *O(Sigma + m + n)*, tuttavia la complessità può essere ridotta andando ad inizializzare *U_x* solo per i caratteri che compaiono nel pattern.

## Metodo dell'impronta di Karp e Rabin

**Semplificazione**: consiederiamo solo stringhe che contengono 0 o 1, tanto l'algoritmo può comunque essere esteso ad alfabeti con più caratteri.

L'algoritmo considera quindi le stringhe di bit come dei numeri, rendendo così possibile utilizzare le operazioni di confronto tra numeri anziché quello tra caratteri.

Con *T_i* viene indicata la porzione di testo che inzia dal carattere *i* e che è lunga quanto il pattern

*T_i = T[i, i + m -1]*

Data una stringa binaria *S* di lunghezza *m*, questa può essere vista come la codifica di un numero *H(S)*

```
H(S) = Sum_{j = 1}^m 2^{m-j}S[j]
```

Così facendo è possibile calcolare sia *H(P)* che *H(T_i)* e i due numeri risultano essere uguali se e solo se *P = T*.

Perché le operazioni aritmetiche possano essere eseguite in tempo costante è necessario che i numeri utilizzati siano rappresentabili con *O(log n)* bit dove *n* è la dimensione dell'input (**ipotesi del modello RAM**). Pertanto se il pattern è lungo, questa ipotesi non vale.

Rabin e Karp hanno pubblicato il **metodo dell'impronta randomizzata**: viene scelto casualemente un numero *p* e viene calolata 

*H_p(S) = H(S) mod p*

Le quantità così calcolate prendono il nome di impronta.

Se c'è un'occorrenza è ovvio che le due impronte sono uguali, ma possono verificarsi dei casi in cui le due impronte sono uguali e non c'è un'occorrenza.
Tuttavia è possibile scegliere *p* in modo che la probabilità che ci sia una "*falsa occorrenza*" sia molto bassa.

C'è però ancora un problema, serve un modo per effettuare questi conti utilizzando numeri piccoli in modo da avere l'esecuzione delle istruzioni in tempo costante.

Per risolvere questo problema è possibile utilizzare l'aritmetica modulare e la regola di Horner: data una stringa *S = b1...bm*, *H_p(S)* può essere calcolato nel seguente modo

```
\Function{H$ _p$}{$S$}
    H = b_1
    \For{$ j = 2 \text{ to } m$}
        \State $H \gets (2H + b_j) mod p$
    \EndFor
    \State \Return $H$
\EndFunction
```

Così facendo non ci sono risultati intermedi di lunghezza maggiore di *2p-1* (*2H* è lungo al massimo *2p-2*).

Nel calcolo di *H_p(T_i)* con *i > 2* è possibile effettuare delle ottimizzazioni, andando a calcolarlo a partire da *H_p(T_{i-1})*, riducendo la compessità da *O(mn)* a *O(n)*:

```
COPIA i conti dalle slide, magari anche il disegno che li motiva

|------ T i-1 ------|
X|------ T i   ------|

|------ T i-1 ------|0  <-- 2 T[i-1]
X|------ T i   ------|

 |----- T i-1 ------|0  <-- 2 T[i-1] - 2^m T[i-1]
X|------ T i   ------|

 |----- T i-1 -------|  <-- 2 T[i-1] - 2^m T[i-1] + T[i+m-1]
X|------ T i   ------| 
```

Aggiungere conti che motivano il rispetto del modello RAM

### Algortimo

```
\Function{RabinKarp}{$P,T$}
    \State $z \gets 2$
    \For{$ j = 2 \text{ to } m$}
        \State $ z \gets (2z) \mod p$
    \EndFor
    \State // $ z = 2^m \mod p$
    \State $ x \gets P[1]$
    \For{$j = 2 \text{ to } m$}
        \State $ x \gets (2x + P[j]) \mod p$
    \EndFor
    \State // $x = H_p(P)$
    \State $y \gets T[1]$
    \For{$j = 2 \text{ to } m$}
        \State $y = (2y + T[j]) \mod p$
    \EndFor
    \State // $y = H_p(T_1)$
    \If{$x = y$}
        \State Segnala una possibile occorrenza in posizione 1
    \EndIf
    \For{$i = 2 \text{ to } n-m+1$}
        \State $y \gets (T[i+m-1] - zT[i-1] + 2y) \mod p$
        \State // $y = H_p(T_i)$
        \If{$x = y$}
            \State Segnala una possibile occorrenza in posizione $i$
        \EndIf
    \EndFor
\EndFunction
```

### La scelta di p

I risultati migliori si ottengono scegliendo come *p* un numero primo in un opportuno intervallo, in modo da minimizzare i falsi positivi.

La scelta si basa su alcune proprietà dei numeri primi.

#### Numero di numeri primi minori di un certo *n*

Sia *π(n)* il numero di primi minori o uguali a *n*.

Chebyschev ha dimsostrato che per ogni *n >= 11*, si ha che 

```
\frac{n}{\ln (n)} \leq \pi (n) \leq 1,26 \frac{n}{\ln (n)}
```

#### Prodotto dei numeri primi

Per ogni *n >= 29*, il prodotto di tutti i numeri primi minori o uguali ad *n* è strettamente maggiore di *2^n*.

```
q_1 \cdot q_2 \cdot q_{\pi (n)} > 2^n
```

Come conseguenza si ha che se *n >= 29*, qualsiai numero *x* minore o uguale di *2^n* ha meno di *π(n)* divisori primi distinti.

Questo si dimostra per assurdo, perché se *x* ha *k >= π(n)* divisiori primi distinti *p_1, ..., p_k*, si ha che 

```
q_1 \cdot \ldots \cdot q_k \leq p_1 \cdot \ldots \cdot p_k \leq x \leq 2^n
```

Dove *q_1,..., q_k* sono i primi *k* numeri primi e il loro prodotto è strettamente maggiore di *2^n*, raggiungendo così un assurdo.

#### Teorema fondamentale per Rabin e Karp

Siano *P* e *T* due stringhe di lunghezza *m* e *n* tali che *mn >= 29* e sia *N* un intero positivo qualsiasia maggiore o uguale a *mn*.

Se *p* è scelto casualmente tra tutti i numeri primi minori o uguali di  *N* la probabilità di una calsa occorrenza tra *P* e *T* è minore di 

```
\frac{\pi (nm)}{\pi (N)}
```

##### Dimostrazione

Sia *R* l'insieme di tutti gli indici di tutte le posizioni in *T* in cui non c'è un'occorrenza del patter *P*, ossia *H(T_i) != H(P)*.

Consideriamo il prodotto

```
\Pi = \prod\limits_{i \in R} (|H(T_i) - H(P)|)
```

Tale prodotto deve essere minore di *2^mn* in quanto *|H(T_i) - H(P)| < 2^m* per ogni *i*.

Per quanto precedentemente enunciato si ha che \Pi ha al più *π(nm)* divisori primi distinti.

Supponendo che ci sia una falsa occorrenza del patter *P* in qualche posizione *i* del testo *T*, ovvero *H(T_i) = H(P)* e *H_p(T_i) != H_p(P)*.

Dunque *p* è un divisore della differenza *H(T_i) - H(P)* e quindi è divisore anche di \Pi.

Siccome *p* è stato scelto casualemte tra i primi *π(N)* numeri primi, la probabilità di una falsa occorrenza è minore o uguale di ```
\frac{\pi (nm)}{\pi (N)}
```

Quindi se *N* è sufficientemente la probabilità di un falso positivo è bassa.

Tipicamente viene scelto *N = n^2 m* perché

```
\frac{\pi (nm)}{\pi (n^2m)} \leq \frac{1,26 \frac{nm}{\ln (nm)}}{ \frac{n^2 m}{\ln (n^2 m)}} = 1,26 \frac{\ln (n^2 m) }{n \ln(nm)} = \frac{1,26}{n} \frac{ 2\ln (n) + \ln (m)}{\ln (n) + \ln (m)} \leq \frac{2,52}{n}
```