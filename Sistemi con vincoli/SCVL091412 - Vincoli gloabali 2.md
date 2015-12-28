#Lezione 9 - Vincoli globali 2

##Vincolo globale - Sum

Mangiene la bound consistency su una sommatorioa

> SUM(z,X) = z=∑xi∈Xxi

Dove *X* è un vettore di variabili e *z* è la variabile che rappresenta il risultato della somma.

Conviene utilizzare questo vincolo piuttosto che ragionare sulle singole somme binarie perché utilizzando le somme binarie richiedono più operazioni per dedurre i bound, inoltre, l'ordine con il quale vengono processati influisce sul numero di operazioni. Quindi il vincolo globale permette di avere la **stessa propagazione** in modo **più efficente**.

> **Somme binarie** con *n* termini:
>
> - Read: 2(n−1)
> - Write: n−1
> - Sum: n−1
> 
> **Sum globale**:
> 
> - Read: n
> - Write: 1
> - Sum: n−1

##Calcolo incrementale

Si possono ottenere ulteriori miglioramenti all'efficenza utilizzando il calcolo incrementale, questo perché l'algoritmo di propagazione viene chiamato molte volte durante la risoluzione di un problema.

L'idea è quindi quella di andare a tenere una cache dei risultati parziali in modo da avere delle informazioni per l'esecuzione successiva del pruning. Servono però ulteriori informazioni riguardo quali valori e quali variabili sono state *pruned*.

Alla prima invocazione viene eseguito l'algoritmo normalmente

> ub(z)=∑xi∈Xxi

ed è possibile tenere in cache il valore massimo di z: ub`$`(z).

Supponendo che sia stato eseguito il pruning della variabile xj, al passo successivo il bound può essere aggiornato con

> ub(z)=ub`$`(z)−old(xj)+xj

ottenendo così l'aggiornamento dell'upper bound in tempo costante.

Per fare filtering sul dominio di xi si può utilizzare

> ub(xi)=z⎯⎯−∑xh∈X,h≠i min(xh)

Cioè viene preso il più grande valore di z e si tolgono i minimi valori per ogni altra variabile.

Al secondo passo si può eseguire il calcolo con (assumendo che sia stato eseguito il pruning di xj (la formla è da correggere.

> ub(xi)=max(z)-(lb`$`(xi)−old(min(xj) + min(xj))

In questo modo si riesce a fare il pruning di una singola variabile in tempo costante.

###Supporto del solver

Perché il tutto funzioni il solver deve permettere di:

- poter fare caching dei valori. 
- avere informazioni riguardo le variabili che sono state *pruned*
- accedere ai valori che sono stati rimossi

####Caching

La soluzione più semplice per tenere la cache di un valore è quello di utilizzare **una variabile normale**. Questo approccio non funziona bene con il backtracking, dal momento che il valore della variabile non viene ripristinato.

Serve quindi un modo per tenere lo storico dei valori della variabile, conviene quindi utilizzare uno **stack di valori**, man mano che si scende nell'albero si effettua il push di un valore, quando si fa backtracking si esegue un pop. Nel caso ci siano degli aggiornamenti parziali, viene aggiornato il valore presente in cima allo stack.

Questo sistema di gestione prende il nome di **timestamp mechanism**, viene tenuto un timestamp che viene incrementato ogni volta che si esplora un nodo. Viene eseguito il push in cache solo se il valore dei timestamp è aumentato, altrimenti si aggiorna il valore. Quando viene fatto un backtrack, viene eseguito un pop.

Nei solver questo sistema prende il nome di **trailing** e lo stack viene chiamato **trail**, questo perché vengono utilizzati anche per tenere traccia dei domini delle variabili. 

####Variabile modificata

Per ottenere questa informazione è necessario modificare il vecchio algoritmo di filtering.

Come prima cosa serve un metodo `prune(xi, v)` che permette di eseguire il pruning del valore `v` da `xi`, questo perché il metodo deve essere in grado di notificare ai vari vincoli che la variabile è stata modificata.

Serve inoltre un nuovo metodo `cj.filter(xi)`, che esegue la propagazione incrementale sapendo che è stata tagliata la variabile `xi`.

La versione base del metodo `prune` è:

```python
def prune(xi, v):
    # rimuove il valore dal dominio
    for cj in C: 
        cj.filter(xi)
```

che risulta inefficente e ricorsivo.
Conviene quindi utilizzare una coda FIFO ed espettare ad effettuare le chiamate:

```python
def prune(xi, v):
    # rimuove il valore dal dominio
    for cj in C: 
        Q.push((cj,xi))
```

Che può essere ulteriormente migliorato andando a controllare che non ci un evento di pruning non sia già in coda e che la variabile compaia nello scope del vincolo:

```python
def prune(xi, v):
    for cj in C: 
        if xi in X(cj) and (cj,xi) not in Q:
            Q.push((cj,xi))
```

Una volta popolata la coda è possibile processare i vari eventi con:

```python
while len(Q) > 0:
    cj, xi = Q.pop()
    cj.filter(xi)
```

Per semplificare la gestione del filtering nel caso alcuni vincoli siano senza filtering incrementale è necessario introdurre una wildcard `*`, l'evento `(cj,*)` equivale alla chiamata `cj.filter()`.

Per inizializzare la coda è possibile utilizzare questi eventi per ogni vincolo. Il nuovo algoritmo prende il nome di **AC3**.

```python
Q = [(cj,∗) for cj in C]
while len(Q) > 0:
    cj, xi = Q.pop()
    if xj == ∗ or not incremental(cj):
        cj.filter() # may call prune(xi, v)
    else:
        cj.filter(xi) # may call prune(xi, v)
```

Nelle slide c'è un esempio di esecuzione dell'algoritmo.
Dall'esempio emerge un caso interessante, quando viene eseguito il pruning per un vincoli *cj* vengono inseriti nuovi eventi di pruning per lo stesso vincolo, questo perché alcuni vincoli hanno bisogno di più passaggi per raggiungere la convergenza e per semplicità conviene utilizzare il solver per effettuare più iterazioni piuttosto che andare a complicare l'algoritmo di filtering.

A causa di questo approccio il solver può arrivare ad una soluzione feasible prima di processare tutta la coda, tuttavia non può terminare l'esecuzione perché deve verificare che non ci siano dei domain wipeout.

####Accedere ai valori rimossi

La parte complessa riguarda scegliere quando scartare i dati per evitare di avere dei problemi con il consumo della memoria.
L'idea più diffusa è quella di tenere in memoria un valore finché ci sono degli eventi in coda per il quale può essere necessario. Cioé bisogna tenere il valore di *xi* finché ci sono degli eventi del tipo *(cj,xi)*

##Vingolo globale - Element

L'utilizzo di vincoli reificati può portare ad una propagazione debole perché il solver non sempre riesce a stabilire che due valori sono in mutua esclusione.

Il tipico problema è quello dei vincoli di costo:

> z=1(x=0)+3(x=1)+4(x=2)

L'idea è quella di guardare al problema da un'altra prospettiva, utilizzando un **vettore dei costi** *V* e di utilizzare la variabile *x* come indice del vettore. Modellando la relazione del costo con *z = vx*

> ELEMENT(z,V,x), where:
> 
> - z is an "output" variable
> - V is a vector of values (or variables)
> - x is an "index" variable

Grazie a questo vincolo è possbile modellare:

- "The global cost is the sum of the assignment cost of variables in X" z=∑xi∈Xcxi
- "The product in position 0 must have lower weight than position 1" wx0<wx1 xi represent the product at position i W is a vector containing the weight of all products
- "xi is the position of item i, while yj is the item at position j" yxi=i, questo vincolo è molto importante, perché permette di *collegare* più rappresentazioni diverse dello stesso problema ad esempio "item-at-position" con "position-for-item", permettendo così di scrivere vincoli migliori.

###Propagazione

Supponendo che *V* sia un valore di valori, si ha come **bound consistency**:

> ub(z)=maxu∈D(x)vul
> b(z)=minu∈D(x)vu

Mentre per ottenere **GAC**:

> w∈D(z) is not pruned iff ∃u∈D(x) : vu=w

Per effettuare la propagazione in modo incrementale:

... vedi slide http://www.lia.disi.unibo.it/Staff/MicheleLombardi/reveal.js/ch8.html#/90 fino a #/92
 
##Vincoli globali - Min e Max

Sono una versione generalizzata dei vincoli binari che utilizza la propagazione incrementale tenendo traccia dei supporti in modo analogo ad Element.

##Vincolo globale - Table

> TABLE(X,T), where:
>
> - X is a vector of variables
> - T is a vector of tuples, corresponding to the valid assignments

Permette di modellare in modo efficente situazioni del tipo *"vettori a scalare"*.

Questo vincolo è interessante perché permette di modellare facilmente situazioni difficili da modellare. 
Tuttavia la complessità della propagazione aumenta con la dimensione della tabella.

Vedi slide http://www.lia.disi.unibo.it/Staff/MicheleLombardi/reveal.js/ch8.html#/99

