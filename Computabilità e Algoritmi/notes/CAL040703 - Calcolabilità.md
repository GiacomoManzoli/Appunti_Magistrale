# Lezione 4 (Computabilità) - Calcolabilità

# Algoritmo

**Algoritmo**: descrizione di una sequenza di passi elementari che permettono di raggiungere un certo obiettivo, come la trasformazione di certi dati di input in dati di output.
Il vincolo dei passi elementari si traduce nell'utilizzo di operazioni semplici, direttamente eseguibili da un calcolatore.
Nel caso l'algortimo sia deterministico, questo può essere visto come una funzione che mappa un certo input in un determinato output, in questo caso si dice che la funzione **è calcolata** dall'algoritmo.

**Funzione calcolabile**: una funzione è calcolabile in modo effettivo se **esiste** un algoritmo in grado di calcolarla.
A noi interessa sapere che **esiste** un algoritmo che calcola quella deteminata funzione, ma non sempre ci interessa conoscere l'algoritmo.

```
MCD(x,y)
P(n) = 1 se n è primo
     = 0 altrimenti
p(n) = n-esimo numero primo
f(n) = n-esima cifra del pigreco

sono funzioni che possono essere calcolate da un algoritmo

g(n) = 1 se pigreco contiene esattamente n cifre "5" consecutive ovverro ...c5--n--5c...
     = 0 altrimenti
```

Non si sa se la funzione *g(n)* è calcolabile, perché si riesce a trovare un algortimo che funziona solamente nel caso in cui la sequenza  è presente.

```
h(n) = 1 se pigreco contiene almeno n cifre 5 consecutive
     = 0 altrimenti
```

Stranamente, *h(n)* è calcolabile, si può considerare 

```
k = sup( {n | Pigreco contiene n cifre 5 consecutive} )
```

*k* può essere un numero qualsiasi o infinito.
In ogni caso, la funzione *h* può essere definita come

```
h(n) = 1 se n <= k
     = 0 altrimenti
```

Da notare che l'algoritmo così definito non si preoccupa di quanto sia difficile trovare *k*, ma solo di trovare una soluzione per il problema. Questo deriva dall'**esiste** precedenemente riportato in grassetto.
Noi ci acconentiamo del fatto che qualsiasi valore può assumere *k* non  conosciamo un algoritmo, l'algoritmo per trovare *k* può esistere o meno, ma questo non ci interessa perché vogliamo che la teoria della calcolabilità non venga influenzata dalla conoscenza sul dominio ma che sia una caratteristica della funzione. 
Ad esempio, in questo caso non ci interessa sapere se il pigreco è un numero normale o meno e non vogliamo che la definizione di calcolabilità sia influenzata da ciò.

Con *g(n)* la stessa funzione può essere implementata con l'algoritmo

```
if n in X
    1
else
    0
```

ma l'insieme *X* può essere un insieme infinito e per valutare l'appartenenza è necessario un programma infinito.

## Le funzioni non calcolabili

**Modello di calcolo effettivo**: ovvero le caratteristiche che deve avere un algoritmo per poter essere eseguibile in modo effettivo:

- **Lunghezza sintattica finita**: deve essere una sequenza finita di istruzioni.
- **Modello realistico**: esegue su un agente di calcolo che può essere realizzato, dotato di una memoria e che lavora a passi discreti (*macchina digitale*) e deterministici.
- **Memoria e input illimitati**: questo perché non si vuole limitare la teoria della computabilità allo stato tecnologico attuale, idealmente si può sempre aggiungere un nuovo banco di RAM.
- **Set di istruzioni finito**: le istruzioni che la macchina riesce ad eseguire sono limitate ed hanno anche una complessità limitata.
- **Computazione**: può terminare dopo un numero finito di passi producendo un output, oppure può non terminare senza produrre output.

Questo modello equivale ad una macchina di Turing.

### Notazione utilizzata

Notazioni:

- |N = {0,1,2,3,...}
- A x B = {(a,b) | a in A e b in B} (prodotto cartesiano)
- A x A x ... x A = A^n
- Relazione *r* ⊆ A x B, ovvero un sotto insieme del prodotto cartesiano di uno o più insimemi
- Una funzione è una particolare relazione: f ⊆ A x B e vale anche ∀(a,b), (a,b') in f allora b = b' e f(a) = b
- Dominio di una funzione: dom(f) = {a | esiste (a,b) in f} e per indicare che f è definita su a si utilizza f(a)*freccia verso basso*.
- Carinalità |A|, numero di elementi presenti nell'insieme nel caso di elementi finiti, mentre nel caso di insiemi infiniti si ha che:
    - |A| = |B| se esiste f: A -> B (biunivoca)
    - |A| ≤ |B| se esiste f: A -> B (iniettiva)
- Un insieme è **numerabile** quando |A| ≤ ||N|, ovvero esiste una funzione suriettiva f: |N -> A. Se A e B sono numerabili, che il loro prodotto è numerabile. Allo stesso modo se una sequenza di insiemi è numerabile, anche la loro unione è enumerabile.


### Esistenza delle funzioni non calcolabili

Con il modello di calcolo precedentemente descritto ci sono delle funzioni che non possono essere calcolate.

Fissando un insisme di funzioni unarie e parziali

```
F = {f | f: |N -> |N}
```

e un modello di calcolo con i relativi algoritmi A-Figa.

Le funzioni calcolabili nel modello di calcolo sono date da:

```
F_A-Figa = {f | esiste A \in A-Figa che calcola f}
```

dato un algoritmo A in A-Figa risuciamo a trovare una funzione f_a che viene calcolata.

La domanda risulta quindi essere "`F_A-figa  ⊆ F` o `F_A-Figa ⊊ F`?" e la risposta è che l'inclusione è stretta.

#### Dimostrazione

Sia *I* il set finito di istruzioni della macchina di calcolo.

L'insieme degli algoritmi calcolabili risulta quindi essere:

```
A-Figa ⊆ I ∪ IxI ∪ IxIxI ∪  IxIx... = U_n I^n
```
pertanto 

```
|A-figa| ≤ |U_n I^n| ≤ ||N|
```

perché la funzione `f: A-Figa -> F_A-figa` è ovviamente suriettiva, pertanto si ha:

```
|F_A-figa| ≤ |A-Figa| ≤ ||N|
```

L'insime delle funzioni è certamente infinito, e certamente esiste un sottoinsieme *T* delle funzioni totali che non è enumerabile.

```
T = {f | f : |N --> |N e totali}
```

La non enumerabilità si dimostra per assurdo, perché se `f_0, f_1, ...` è un'enumerazione di *T*:

```
    f0      f1      f2      ...
0   f0(0)   f1(0)   f2(0)   ...
1   f0(1)   f1(1)   f2(1)   ...
2   ...     ...     ...
```

È quindi possibile definire `d(n) = fn(n) +1` che non è presente nell'enumerazione sopra riportata, perché `d(n) ≠f(n) ∀n`.

Pertanto `||N| < |T| ≤ ||F|` e

```
F_A-figa ⊆ F        }=> F_A-Figa ⊊ F 
|F_A-Figa| < |F|
```

Ovvero, esistono delle funzioni che non sono calcolabili.
Il numero di queste funzioni è dato da `|F \ F_A-figa|` che è infinta, questo perché se fosse finita, `F` sarebbe enumerabili.