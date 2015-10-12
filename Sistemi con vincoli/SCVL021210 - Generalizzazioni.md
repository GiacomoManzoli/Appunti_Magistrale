#Lezione 2

__Restrizione di domini__

A partire da un'insieme di domini D0,D1,... si arriva ad un'insieme D0',D1'... tale che D0' < D0,...

__Vincolo risolto__

Un vincolo si dice risolto se coincide con il prodotto cartesiano nel suo scope.

__Soluzione CSP__

È una restrizione di domini tali che tutti i vincoli vengono risolti.

D′(xi) ∀xi∈X : ∀cj∈C, cj=∏xi∈X(cj)D′(xi)

Una generalizzazione della soluzione sono tutti domini che sono dei singoletti.

Tutto questo permette di ottimizzare gli algoritmi risolutivi.

##DFS - Depth first search

```
def DFS(CSP):
  if sol_found(CSP): return True
  if infeasible(CSP): return False
  for dec in decisions(CSP):
    if DFS(apply(dec, CSP)): return True
  return False
```

Può essere ottimizzato fermandosi quando viene trovata una soluzione generalizzata.

Allo stesso modo può essere modificato __AC1__ in modo che se un vincolo è già risolto, allora non prova ad eseguire il filtering.

```
dirty = True
while dirty:
  dirty = False
  for cj in C:
    if not resolved(cj, CSP):
      dirty = dirty or cj.filter()
```

Per effettuare queste ottimizzazioni è necessario poter determinare se il vincolo è risolto o meno, che non sempre è possibile.

Nel caso ci siano dei domini singoletti, vuol dire che i vincoli sono già soddisfatti e quindi non è necessario andare a fare filtering ulteriore.

##Vincoli aritmetici e espressioni

__N-Queens__: si vogliono disporre su una schacchiera NxN, N regine in modo che non si possano mangiare tra loro.

Come variabili per questo problema si può usare una variabile per ogni colonna che specifica in quale riga della scacchiare è presente la regina.

In questo modo si ottiene un dominio per le variabili già ridotto.

Vincoli del problema:

- Non possono esserci due regine sulla stessa colonna --> triviale per la scelta delle variabili.
- Non possono esserci due regine sulla stessa riga --> xi != xj per ogni i,j (due variabili non possono avere lo stesso valore, per come è espresso il problema vuol dire che due colonne diverse non possono essere avere la regina sulla stessa riga).
- Non possono esserci due regine sulla stessa diagonale --> xj - xi != j - i, per ogni coppia i < j (bisogna esprimere questo vincolo anche per l'altra diagonale).

Problema: non sappiamo come modellare `xj - xi != v` e non può essere utilizzato un vincolo ad hoc perché si avrebbe un numero di vincoli che aumenta esponenzialmente.

Lo stesso vincolo può essere implementato con `x + y = z` e `z != v`, in questo modo definisco due vincoli elementari che possono essere combinati tra loro per creare vincoli più complessi.

Fortunatamente ci sono dei linguaggi di modellazione che eseguono il parsing automatico delle espressioni, permettendo di scrivere espressioni complesse senza preoccuparsi di definire i vincoli più semplici.

Queste espressioni pososno essere aggiunte ad una libreria di vincoli come:

- `z=x+y` sum constraint
- `z=xy` multiplication constraint
- `z=|x|` absolute value constraint
- `z=min(x,y)` minimum constraint

dove:

- `z` is automatically introduced when parsing the expression
- `z` is either a fresh variable or an expression object, conceptually: expression object = variable (different impl.)
- `x` and `y` can be variables, expression objects, or constants

Mancano ancora gli algoritmi di filtering per questi nuovi vincoli.

##Consistenze locali 

Scrivere un nuovo algoritmi di filtering per ogni vincolo non scala, è necessario usare un approccio sistematico a questo problema.

###Vincoli binari

Si va a rimuovere un valore dal dominio di X se non supporta un determinato vincolo quando viene combinato con i valori del dominio di Y.

Un valore v in D(X) si dice che ha un supporto se esiste un valore w in D(Y) tale che (v,w) soddisfa un vincolo.

Quando tutti i valori presenti nel dominio hanno un supporto si dice che il vincolo c è _consistente sugli archi_ (Arc Consistency).

Viene usato il termine arco in quanto un CSP può essere visto come un grafo i cui nodi sono dati dalle variabili del problema.

Questa definizione fornisce una formalizzazione per gli algortimi di filtering.

La consistenza sugli archi garantisce che vincolo per vincolo ogni assegnamento delle variabili porta ad una soluzione feasible.

A livello globale no, in quanto la conistenza dei vincoli viene forzata vincolo per vincolo, senza tenere conto degli altri vincoli, quindi non è detto che il problema sia globalmente consistente.

Avere consistenza globale è complesso quanto risolvere il problema, ma la consistenza locale è meno complessa.

La complessità dell'algoritmo di filtering AC risulta particolarmente critico in quanto è necessario eseguire l'algoritmo per ogni nodo, più volte e il numero dei nodi può essere esponenziale.

Filtrare per la diseguaglianza viene fatto in tempo costante.
Filtrare per l'uguaglianza richiede un tempo linare.

###Vincoli generici

__Generalizzazione di supporto__: un valore di un certo dominio è supportato se per tutte le altre variabili nello scope del vincolo esisten un altro valore tale che l'insieme dei valori riesce a soddisfare il vincolo.

__Generalizzazione dell'Arc Consinstency__: A constraint c is eneralized arc consistent if ∀xi∈X(c) every v∈D(xi) has a support.

Fare filtering per il vincola della somma ha una complessita cubica, tuttavia con un po' di ottimizzazioni si reisce a tornare ad una complessità quadratica (questo perché nel nostro sistema fare il look-up di un valore ha complessità costante).

z=x+y

Regole di filtering

- se v ∈ D(z) e ∀w ∈ D(x), v − w ∉ D(y), allora tolgo v
- se w ∈ D(x) e ∀v ∈ D(z), v − w ∉ D(y), allora tolgo w
- se u ∈ D(y) e ∀v ∈ D(z), v − u ∉ D(x), allora tolgo u

Così facendo la complessità diventa quadratica nella dimensione di D(x) e D(z).

###Bound consistency

Se i domini sono un intervallo interno e il minimo e massimo dell'intervallo del dominio hanno un supporto, allora anche tutti i valori nel mezzo hanno un supporto.

A value vi∈D(xi) has a BC support iff, ∀xj∈X(c)∖{xi}, there exists a value vj∈{x⎯⎯j..x⎯⎯⎯j} such that (v0,v1,…vm−1)∈c

Un vincolo è BC se per ogni variabile del vincolo, sia il minimo che il massimo valore di quella variabile hanno un supporto.

Questa tipologia di consistenza è più debole rispetto a quella sugli archi generalizzata.

Sia la bound consistency sia la arc consistency garantiscono un domani wipeout nel caso non ci siano soluzioni, l'unica differenza è l'efficienza che i due algoritmi garantiscono.
















