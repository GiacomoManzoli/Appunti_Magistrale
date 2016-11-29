22 giugno primo orale

## Codice del merge parallelo

Ci sarebbe prima il codice della ricerca binaria, ma è quella classica sequenziale e che ritorna l'indice dell'elemento in tempo O(log n)

```
\Function{P-Merge}{$T, p_1, r_1, p_2, r_2, A, p_e$}
    \State $n_1 \gets r_1 - p_1 +1$
    \State $n_2 \gets r_2 - p_2 +1$
    \If{$n_1 < n_2$}
        \State inverti le due parti in modo che $n_1 \geq n_2$
    \EndIf
    \If{$n_1 = 0$}
        \State \Return
    \EndIf
    \State $q_1 \gets \rfloor (p_1 + r_1) / 2 \lfloor$ \Comment{Elemento mediano della prima parte}
    \State $q_2 \gets \textsc{Binary-Search}(T[q_1], T, p_2, r_2)$
    \State $q_3 \gets p_3 + (q_1 - p_1) + (q_2 - p_2)$ 
    \State $A[q_3] \gets T[q_1]$
    \State \textbf{spawn } \textsc{P-Merge}$(T, p_1, q_1 -1, p_2, q_2 -1, A, p_3)$ \Comment{Unisce i valori $\leq x$}
    \State \textsc{P-Merge}$(T, q_1 +1, r_1, q_2, r_2, A, q_3+1)$
    \State \textbf{sync}
\EndFunction
```

### Analisi della complessità

La durata PM_\infty(n) del merge è data da una costante per i vari calcoli dell'indice, più un tempo logaritmico per la ricerca binaria, più il tempo delle due chiamate che vengono fatte in parallelo.

La durate delle chiamate parallele dipende dal blocco più grande, ma che dimensione ha?

Ogni chiamata, nella peggiore delle ipotesi viene fatta su n1/2 + n2 elementi, n2 deriva dal fatto che gli elementi della seconda parte dell'array possono essere tutti minori di x o tutti maggiori uguali.

n1/2 +n2 = n1/2 + n2/2 + n2/2 <= n/2 + n/4 = 3n/4

Si ha quindi che 

```
PM_\infty(n) \leq PM_\infty(\frac{3}{4}n) + O(\log n) = O(\log^2 n)
```

Per quanto riguarda il lavoro si ha

```
PM_1(n) = PM_1(\alpha n) + PM_1( (1-\alpha) n) + O(\log n)
```

perché è dato dalla somma del lavoro delle due parti parallele, più il lavoro necessario per la ricerca binaria.

Per quanto riguarda l'alpha si ha che è nel range 1/4 <= alpha <= 3/4.

Risparmando i conti, il lavoro finale è dato da

```
PM_1(n) \leq c_1 - c_2 \log (n) = \Theta (n)
```

Il parallelismo di questo algoritmo risulta essere buono, perché

```
\frac{PM_1}{PM_\infty} = \Theta (\frac{n}{log^2 n})
```

e si ottiene uno speedup quasi lineare già per n maggiore di 10.

## Merge sort parallelo v2

```
\Function{P-Merge-Sort}{$A,p,r, B, S$}
\State $n \gets r - p +1$
\If{$n = 1$}
    \State \Return
\EndIf 
\If{$p < r$}
    \State $T[1 \ldots n] $ nuovo array
    \State $q \gets floor(p+r/2)$
    \State $q' \gets q - p +1$
    \State \textbf{spawn } \textsc{P-Merge-Sort}$(A,p,q, T, 1)$
    \State \textsc{P-Merge-Sort}$(A,q+1,r, T, q'+1)$
    \State \textbf{sync}
    \State \texttt{P-Merge}$(T, 1, q', q'+1, n, B, s)$
\EndIf
\EndFunction
```

Questa versione modificata riceve come parametro anche un'array dove mettere gli elementi una volta ordinati ed esegue le chiamate ricorsive in parallelo.

La differenza sta che una volta sincronizzate le due chiamate, il merge viene fatto con la procedura parallela.

Il lavoro di questa versione è 

```
MS_1(n) = 2 MS_1(n/2) + \Theta(n) = \Theta (n \log n)
```

che è lo stesso della versione precedente.

La durata invece è

```
MS_\infty (n) &= MS_\infty (n/2) + \Theta(\log^2 n) = \Theta (n)
              &=\Theta (\log^3 n)
```

ovvero la durata di una delle due chiamate ricorsive parallele, che tanto sono uguali perché l'array viene divisio a metà, più la durata dell merge ricorsivo.

Anche in questo caso il parallelismo risulta essere 

```
O(n / \log^2 n)
```

# P-Scan

Si ha a disposizione un'array e una certa operazione associativa da evvettuare sugli elementi dell'array, come la somma di interi, la and tra valori booleani, ecc.

Noi ci concentreremo sulla somma di numeri interi.

Fare questo è facile, ed è facilmente parallelizzabile in modo divide-et-impera, ma una cosa più interessante è quella di creare un nuovo array che contiene gli *step intermedi*:

```
y[1] = x[1] \\
y[2] = x[1] + x[2] \\
\vdots \\
y[n] = x[1] + \ldots + x[n]
```

La versione sequenziale dell'algoritmo può essere quindi definita come

```
\Function{Scan}{x}
\State \ldots
\State $y[1] \gets x[1]$
\For{$ i = 2 \textbf{ to } n$}
    \State $y[i]\gets y[i-1] (x) x[i]$
\EndFor
\State \Return $y$
\EndFunction
```

Per parallelizzare questa procedura può essere utile calcolare il valore centrale dell'array.

Prima vediamo il codice:

```
\Function{P-Scan}{$x, $}
    \State $y[1] \gets x[1]$
    \If{$n > 1$}
        % t è un arry temporaneo
        \State \textsc{P-Scan-Up}$(x, t, 2, n)$
        \State \textsc{P-Scan-Down}$(x[1], x, t, y, 2, n)$
    \EndIf
    \State \Return $y$
\EndFunction
```

La procedura P-Scan-Up calcola la somma della prima metà dell'array e pone il risultato al centro della seconda parte dell'array *t*, dopodiché si invoca ricorsivamente sulla prima parte dell'array *x*.

```
x  1 2 ------------------- k ---------------- n
t    |<------------------->|   --->   x
```


```
\Function{P-Scan-Up}{$x,t,i,j$}
    if i = j
        return x[i]
    k = floor(i+j/2)
    t[k] = spawn P-Scan-Up(x,t,i,k)
    r = P-Scan-Up(x,t,k+1,j)
    \State \textbf{sync}
    \State \Return $T[k]+r$
\EndFunction
```

```
\Function{P-Scan-Down}{$v,x,t,y,i,j$}
    // v è il valore della somma fino ad i escluso
    \If{$i=j$}
        \State $y[i] \gets v+x[i]$
    \Else
        \State $ k = floor(i+j/2)$
        \State \textbf{spawn} \textsc{P-Scan-Down}($v,x,t,i,k$)
        \State \textsc{P-Scan-Down}($v+t[k],x,t,k+1,j$)
        \State \textbf{sync}
    \EndIf
\EndFunction
```

Il lavoro del PScan è 

```
T_{1}^{pscan}(n) = T_{1}^{pscan-up}(n) + T_{1}^{pscan-down}(n) + \Theta(1)
```

e dal momento che anche le due chiamate vengono fatte in modo sequenziale, anche la durata è uguale a

```
T_{\infty}^{pscan}(n) = T_{\infty}^{pscan-up}(n) + T_{\infty}^{pscan-down}(n) + \Theta(1)
```

Sia PScanUp che PScanDown hanno la stessa durata e lo stesso lavoro, perché fanno operazioni molto simili, ci concentriamo quindi su PScanUp, tanto la differenza è al più di una costante.

Tenendo a mente che $n = j - i +1 $

```
T_{1}^{pscan-up}(n) = 2 T_{1}^{pscan-up}(n/2) + \Theta(1) = \Theta(n)
```

e

```
T_{\infty}^{pscan-up}(n) = T_{\infty}^{pscan-up}(n/2) + \Theta(1) = \Theta(\log n)
```

Mettendo assieme i vari pezzi si ha che 

```
T_{1}^{pscan}(n) = 2 T_{1}^{pscan-up}(n) = \Theta(n)
```

e 

```
T_{\infty}^{pscan}(n) = 2T_{\infty}^{pscan-up}(n) = \Theta(\log n)
```

Il parallelismo dell'algoritmo risulta essere \Theta(n/\log n) che è molto buono.


---

Fine algoritmi paralleli - Cenni alla geometria computazionale

Ci sono varie applicazioni della geometria computazionale

Noi ci concentriamo sulla spazio bi-dimensionale.

L'elemento alla base di tutto è il punto, che sarà caratterizzato da due coordinate, le quali saranno tipicamente dei float ovvero sono soggetti a degli errori di arrotondamento.

Ma c'è sempre il piano B, usiamo le coordinate intere a 32 bit.

Le nostre coordinate saranno quindi compresi tra un -Maxint e Maxint.

C'è però un problema, tipicamente nella geometria computazionale vengono calcolate delle aree, che devono anch'esse essere contenute in un intero e quindi i valori delle coordinate devono essere compresi in un intervallo -CMax e CMax con CMax <= sqrt(Maxint), quindi facendo due conti si ha maxint = 2^31 e CMax = 2^15.

E' poco ma sufficienetemente buono, perché su uno schermo di un metro per un metro si ottiengono 32 punti per ogni millimetro.

Una volta stabilito come rappresentare i punti si possono rappresentare:

- un segmento, utilizzando due punti
- un cerchio, con il centro e il raggio
- un poligono, con una serie di punti che rappresentano i vertici.

I primi problemi semplici:

- Dati due segmenti orientati con un vertice in comune, il secondo segmento è ruotato in senso orario o antiorario rispetto il primo?
- Seguendo il percorso dato da due segmenti orientati, per spostarmi sul secondo devo girare a sinistra o a destra?
- Due segmenti si intersecano?

Abbiamo però il limite che non possiamo utilizzare la divisione e le funzioni trigonometriche perché abbiamo a disposizione solo numeri interi.

