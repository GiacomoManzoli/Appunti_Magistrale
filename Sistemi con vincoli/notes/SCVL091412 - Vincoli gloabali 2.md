#Lezione 9 - Vincoli globali 2

##Vincolo globale - Sum

Mangiene la bound consistency su una sommatorioa

> SUM(z,X) = z=<big>∑</big><sub>[x<sub>i</sub>∈X]</sub>x<sub>i</sub>

Dove *X* è un vettore di variabili e *z* è la variabile che rappresenta il risultato della somma.

Conviene utilizzare questo vincolo piuttosto che le singole somme binarie perché queste richiedono più operazioni per dedurre i bound, inoltre, l'ordine con il quale vengono processati influisce sul numero di operazioni. Quindi il vincolo globale permette di avere la **stessa propagazione** in modo **più efficente**.

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

> ub(z)=<big>∑</big><sub>[x<sub>i</sub>∈X]</sub>x<sub>i</sub>

ed è possibile tenere in cache il valore massimo di z: ub<sub>`$`</sub>(z).

Supponendo che sia stato eseguito il pruning della variabile x<sub>j</sub>, al passo successivo il bound può essere aggiornato con

> ub(z)=ub<sub>`$`</sub>(z) − old(x<sub>j</sub>) + x<sub>j</sub>

ottenendo così l'aggiornamento dell'upper bound in tempo costante.

Per fare filtering sul dominio di x<sub>i</sub> si può utilizzare

> ub(x<sub>i</sub>) = ub(z) - <big>∑</big><sub>[x<sub>h</sub> ∈ X, h ≠ i]</sub>lb(x<sub>h</sub>)

Cioè viene preso il più grande valore di z e si tolgono i minimi valori per ogni altra variabile.

Al secondo passo si può eseguire il calcolo con (assumendo che sia stato eseguito il pruning di *x<sub>j</sub>* (la formla è da correggere.

> ub(x<sub>i</sub>) = ub(z) - ( lb<sub>`$`</sub>(x<sub>i</sub>) − old(lb(x<sub>j</sub>)) + lb(x<sub>j</sub>))

In questo modo si riesce a fare il pruning di una singola variabile in tempo costante.

###Supporto del solver

Perché il tutto funzioni il solver deve permettere di:

- poter fare caching dei valori. 
- avere informazioni riguardo le variabili che sono state *pruned*
- accedere ai valori che sono stati rimossi

####Caching

La soluzione più semplice per tenere la cache di un valore è quello di utilizzare **una variabile normale**. Questo approccio non funziona bene con il backtracking, dal momento che il valore della variabile non può essere ripristinato.

Serve quindi un modo per tenere lo storico dei valori della variabile, conviene quindi utilizzare uno **stack di valori**, man mano che si scende nell'albero si effettua il push di un valore, quando si fa backtracking si esegue un pop. Nel caso ci siano degli aggiornamenti parziali, viene aggiornato il valore presente in cima allo stack.

Questo sistema di gestione prende il nome di **timestamp mechanism**, viene tenuto un timestamp che viene incrementato ogni volta che si esplora un nodo. Viene eseguito il push in cache solo se il valore dei timestamp è aumentato, altrimenti si aggiorna il valore. Quando viene fatto un backtrack, viene eseguito un pop.

Nei solver questo sistema prende il nome di **trailing** e lo stack viene chiamato **trail**, questo perché vengono utilizzati anche per tenere traccia dei domini delle variabili. 

#### Variabile modificata

L'algoritmo di filtering finora utilizzato è:

```python
dirty = True
while dirty:
    dirty = False
    for cj in C:
        dirty = dirty or cj.filter()
```

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

che risulta inefficente e ricorsiva.
Conviene quindi utilizzare una coda FIFO ed aspettare ad effettuare le chiamate:

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
Dall'esempio emerge un caso interessante, quando viene eseguito il pruning per un vincolo `cj` vengono inseriti nuovi eventi di pruning per lo stesso vincolo, questo perché alcuni vincoli hanno bisogno di più passaggi per raggiungere la convergenza e per semplicità conviene utilizzare il solver per effettuare più iterazioni piuttosto che andare a complicare l'algoritmo di filtering.

A causa di questo approccio il solver può arrivare ad una soluzione feasible prima di processare tutta la coda, tuttavia non può terminare l'esecuzione perché deve verificare che non ci siano dei domain wipeout.

#### Accedere ai valori rimossi

La parte complessa riguarda scegliere quando scartare i dati per evitare di avere dei problemi con il consumo della memoria.
L'idea più diffusa è quella di tenere in memoria un valore finché ci sono degli eventi in coda per il quale può essere necessario. Cioé bisogna tenere il valore di `xi` finché ci sono degli eventi del tipo `(cj,xi)`

##Vingolo globale - Element

L'utilizzo di vincoli reificati può portare ad una propagazione debole perché il solver non sempre riesce a stabilire che due valori sono in mutua esclusione.

Il tipico problema è quello dei vincoli di costo:

> z = 1(x=0) + 3(x=1) + 4(x=2)

L'idea è quella di guardare al problema da un'altra prospettiva, utilizzando un **vettore dei costi** *V* e di utilizzare la variabile *x* come indice del vettore. Modellando la relazione del costo con *z = v<sub>x<sub>*

> ELEMENT(z,V,x), where:
> 
> - z is an "output" variable
> - V is a vector of values (or variables)
> - x is an "index" variable

Grazie a questo vincolo è possbile modellare esspressioni del tipo:

- Il costo è la sommatoria dei costi dei singoli assegnamenti delle variabili *X*:
> z = <big>∑</big><sub>[x<sub>i</sub> ∈ X]</sub>c<sub>x<sub>i</sub></sub>

- Il prodotto in posizione *0* deve pesare meno del prodotto in posizione *1*:
    > w<sub>x<sub>0</sub></sub> < w<sub>x<sub>1</sub></sub> 
    
    dove *x<sub>i</sub>* rappresenta il tipo di prodotto nella posizione *i*-esima e *W* è il vettore dei pesi
 
- *x<sub>i</sub>* è la posizione dell'item *i*-esimo e *y<sub>j</sub>* è l'item che si trova nella posizione *j*
    > y<sub>x<sub>i</sub></sub>=i 
    >
    > Y = [1,3,0,2] X = [2,0,3,1]
    Ovvero *y<sub>x<sub>i</sub></sub>* contiene l'item che si trova nella posizione *x<sub>i</sub>* cioè *i*.
    
Quest'ultimo vincolo è molto importante, perché permette di *collegare* più rappresentazioni diverse dello stesso problema ad esempio "item-at-position" con "position-for-item", permettendo così di scrivere vincoli migliori.

###Propagazione

Supponendo che *V* sia un vettore di valori, si ha come **bound consistency**:

> ub(z) = max<sub>[u ∈ D(x)]</sub> v<sub>u</sub>
> 
> lb(z) = min<sub>[u ∈ D(x)]</sub> v<sub>u</sub>

Mentre per ottenere **GAC**:

> w ∈ D(z) is not pruned iff ∃ u ∈ D(x) : v<sub>u</sub>=w

Per effettuare la propagazione in modo incrementale è necessario tenere in memoria per ogni valore *w* che compare in *D(z)* il suo supporto di *D(x)* che prende il nome di *u(w)*.

Quando *x* viene tagliato, se *u(w)* è ancora nel dominio, *w* ha ancora supporto, altrimenti è necessario cercare nel dominio di *x* un nuovo supporto che andrà ad aggiornare la variabile *u(w)*. Se non si riesce a trovare questo valore è possibile effettuare il pruning di *w*.

Una caratteristica interessante di questo propagatore è che non è necessario andare a ripristinare i precedenti valori *u(w)* quando si fa backtracking, perché se *u(w)* è un supporto per *w* in un nodo figlio, questo lo è anche nel nodo padre, perché tornando indietro il dominio di *z* può solo aumentare.
 
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

Il propagatore per questo vincolo cerca di trovare un supporto, ovvere una tupla della tabella, per tutti i valori che compaiono nel problema. 

Il propagatore quindi processa le tuple una ad una e si ferma quando tutti i valori hanno supporto o quando non ci sono più tuple.

Si può anche utilizzare la versione incrementale che tiene in memoria i vari supporti trovati.