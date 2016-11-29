## Quacosa ma non so cosa

Se un algortimo ha lasco = T1/TinfP >= 10 vuol dire che la sua durata Tinf è sicuramente <= 1/10 T1/P.

Tp <= T1/Tp + Tinf <= 1.1 T1/p

ovvero lo speedup è praticamente lineare e quindi è quasi perfetto.

Posso quindi aumentare il parallelismo T1/Tinf se T1/Tinf < 10p oppure posso diminuirlo se T1/Tinf >> 10p.

## Calcolo della durata e del lavoro

Il calcolo del lavoro è semplice, basta andare a contare tutte le porzioni di codice sequenziale.

Per calcolare la durata è necessario tenere conto se due attività possono essere eseguite in parallelo

![](./immagini/l25-fig1.png)

Se due computazioni devono essere eseguite in sequenza la durata è la somma dei Tinf delle due compitazioni. Se invece possono essere eseguiti in parallelo, la durata è il massimo dei due Tinf.

## Loop paralleli

Moltiplicazione di un vettore per una matrice di dimensione *nxn*

```
\Function{MatVec}{$A,x$}
    \State $n \gets A.rows$
    \State $y\gets Vec(n)$
    \State \textbf{parallel}
    \For{$i = 1 \text{ to } n$}
        \State $y_i \gets 0$
    \EndFor
    \State \textbf{parallel}
    \For{$i = 1 \text{ to } n$}
         \For{$j = 1 \text{ to } n$}
            \State $y_i \gets y_i + a_{i,j}x_j$
        \EndFor
    \EndFor
```

Per quanto riguarda il lavoro si ha T1(n) = Tetha(n^2).

La durata invece Tinf(n) si ha che il primo blocco **parallel** ha durata Theta(log(n)), perché il ciclo di azzeramento viene ottimizzato in modo analogo dalla piattaforma parallela in qualcosa di simile:

```
Azzera(y,i,j)
if i = j
    y_i = 0
else 
    m = floor(i+j/2)
    spawn azzera(y,i,m)
    azzera(y,m+1,j)
    sync
```

Il lavoro di questa procedura in funzione di n = j-i+1 è T1(n)= 2T1(n/2) + C = Theta(n).
Tinf(n) è invece unguale a Tinf(n/2)+C = Theta(log(n)) che deve essere sommata alla durata del blocco, che in questo caso è costante.

In modo simile a prima il secondo blocco ha complessità Theta(log(n)) + Theta(n) = Theta(n).

Si ha quindi che quando c'è un parallel c'è sempre una costante log(n) da sommare alla complessità a causa dell'implementazione del for.

Tinf di tutto l'algoritmo è quindi Theta(n).

## Race condition

Se l'esecuzione dell'algortimo fornisce sempre lo stesso risultato viene detto **deterministico** e questo avviene quando l'ordine di esecuzione degli strand non è influente sul risultato.

Se invece l'ordine è influente sul risultato si ha che l'agoritmo è **non deterministo** e questo può essere causato da delle **race condition** ovvero quando due strand eseguiti in paralleli accedono alla stessa locazione di memoria.

## Una lezione di scacchi

Un algoritmo parallelo è stato progettato per lavorare con p = 32 e con un T32 = 65 secondi.

Si è poi riusciti a ridurre il tempo di esecuzione a T'32 = 40 secondi.

Tuttavia una volta eseguito il codice con p = 512 la seconda versione dell'algoritmo è risultata meno performante.

La versione originale aveva T1 = 2048 e Tinf = 1, mentre quella modificata aveva T'1 = 1024 e Tinf 8. Ovvero la seconda versione ha dimezzato il lavoro, ma ha aumentato la durata.

Per il programma originale, utilizzando Tp = T1/p + Tinf:

T32 = 2048/32 +1 = 65
T'32 = 1024/32 +8 = 40

mentre 

T512 = 2048/512 + 1 = 5
T512 = 1024/512 + 8 = 10

Morale della favola, diminuire il lavoro non sempre porta ad una riduzione della durata.

# Merge Sort

La versione sequenziale dell'algoritmo prende un array *A* e due indici *p* e *r* e deve ordinare la porzione dell'array compresa tra *p* e *r*.

```
\Function{MergeSort'}{$A,p,r$}
\If{$p < r$}
    \State $q \gets floor(p+r/2)$
    \State \textbf{spawn } \texttt{MergeSort'}$(A,p,q)$
    \State \texttt{MergeSort'}$(A,q+1,r)$
    \State \textbf{sync}
    \State \texttt{Merge}$(A,p,q,r)$
\EndIf
\EndFunction
```

Il lavoro T1(n) è Theta(n log(n)) che deriva dalla versione sequenziale del `MergeSort`.

La durata è invece uguale ad un tempo costante, più la massima durata delle chiamata ricorsive (che possono essere considerate uguali) più la durata del merge, che se viene fatto in modo sequenziale è Theta(n).
Si ha quindi che Tinf = Tinf(n/2) + Theta(n) = Theta(n) (*per il metodo dell'esperto o qualcosa del genere*).

Il parallelismo di questo algoritmo risulta quindi essere Theta(log(n)) che non risulta essere buono. 

```
To sort 10 million elements, for example, it might achieve linear speedup on a few processors, but it would not scale up effectively to hundreds of processors.
```

Per aumentare il parallelismo è necessario rendere parallela anche la funzione `Merge`.

![](./immagini/l25-fig2.png)

Supponiamo che nell'array *T* risultante dalle due chiamate ricorsive ci siano due porzioni ordinate che vanno rispettaivamente da *p1* a *r1* e da *p2* a *r2*.

L'idea è quella di prendere la parte più lunga dei due segmenti. Se questa è lunga 0, sono entrambi vuoti e non è necessario fare niente.

Se invece è più lunga di 0, viene calcolato l'indice *q1* medio, ovvero  l'elemento centrale della sequenza, il quale avrà un certo valore *x*.

La seconda sequenza può quindi essere divisa in altre due sottosequenze contenenti solo valori minori di *x* e un'altra con tutti i valori *>= x*. Il primo elemento *>= x* avrà un certo indice *q2*. Questo può essere fatto con il binary search in un tempo logaritmico.

Da notare che *q2* può essere uguale a *p2* se sono tutti maggiori uguali o a *r2+1* se sono tutti minori.

Si sa quindi che una volta ordinato il vettore, l'elemento *x* si troverà nella posizione *q3 = p3 + (q1-p1) + (q2-p2)* e può essere già scritto.

Si possono poi unire ricorsivamente tutti gli elementi minori di *x*, ovvero quelli che vanno da *p1* a *q1-1* e da *p2* a *q2-1* , e tutti quelli maggiori uguali di *x*, ovvero quelli che vanno da *q1* a *r1* e da *q2* a *r2*.

Dal momento che i primmi andranno a finire nelle posizioni da *q3* a *q3-1* e i secondi andranno a finire nelle posizioni da *q3+1* a *r3*, le due chiamate ricorsive possono essere parallelizzate.