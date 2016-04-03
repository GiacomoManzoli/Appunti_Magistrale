### Codice dell'algoritmo

```
BoyerMoore(P,T)
    pref \gets FunzionePrefisso(P_{rev})
    // parto dal secondo insieme perché è quello che contiene i valori maggiori
    for j = m \text{ downto } 0
        if j = m - pref[i+1]
            h \gets j
        // h è il minimo valore tale che max(1,j) \leq h \leq m e h = m -\pi_{1+h}^{rev}
        d[j] \gets j
    // d[j] è il minimo del secondo insieme
    for h = m \text{ downto } 1
        j \gets m - pref[i+h]
        if h < j
            d[j] \gets h 
    i \gets 0
    while i \leq n - m
        j \gets m
        while P[j] = T[i+j]
            j \gets j - 1
        if j = 0
            Segnala l'occorrenza in posizione i + 1
        i \gets i + d[j]
    
```

### Complessità

La preelaborazione richiede *O(3m)*, mentre la dimostrazione che il tempo richiesto è lineare è complessa e non viene affrontata.
Nel caso pessimo, la fase di ricerca fa *O(4n)* confronti.

Questo algoritmo risulta comunque molto utilizzato in pratica, perché il più delle volte vengono fatti meno di *n* confronti.

Ad esempio, supponendo di avere un pattern che inizia con un carattere, che compare solo all'inizio e trovando un mismatch sul secondo carattere, si ha uno spostamento di *m* con solamente due confronti.

Questo perché se il primo carattere matcha con la stringa e non ricompare mai all'interno del pattern, l'unico modo per avere un match completo è quello di spostarsi di *m*.

## Knuth, Morris e Pratt on-line

![](./immagini/l14-fig1)

L'algoritmo funziona sull'ipotesi che l'alfabeto è finito e noto a priori.

Supponendo che arrivi il carattere *T[k]*, se questo è uguale a *P[j]*, la prima posizione in cui può esserci un'occorrenza è *i*.

Altrimenti, *i+h* è la prima posizione tale che

*P[i , j - h -1 ] = P[1+h, j-1] e P[j-h] = T[k] diverso da P[j]*

... cose ...

## Algoritmo di Aho Corasick

Algoritmo che funziona in modo simile a KNP-online, con la differenza che permette di effettuare il pattern matching utilizzando più pattern contemporanemente.

Continua nella prossima lezione.