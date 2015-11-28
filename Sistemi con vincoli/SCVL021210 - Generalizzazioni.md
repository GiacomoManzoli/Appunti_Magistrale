#Lezione 2 - Alcune generalizzazioni

La risoluzione di un problema di CP può essere vista in 3 fasi:

- Creazione di un modello utilizzando una libreria di vincoli;
- Ricerca di una soluzione;
- Restrizione dello spazio di ricerca tramite filtering e propagation.

##Restrizione di domini

Restringendo lo spazio di ricerca a partire da un'insieme di domini *D<sub>0</sub>,D<sub>1</sub>,...* si arriva ad un altro un'insieme *D<sub>0</sub>',D<sub>1</sub>'...* tale che *D<sub>0</sub>' ⊆ D<sub>0</sub>,...*

Questo può essere visto come una generalizzazione dell'operazione di assegnamento, che cattura l'effetto del filtering e della ricerca.

##Vincolo risolto

Un vincolo si dice **risolto** se coincide con il prodotto cartesiano nel suo scope.

Cioè effettuando il prodotto cartesiano dei domini di tutte le variabili presenti nel vincolo, questo prodotto contiente solo relazioni che soddisfano il vincolo, generalizzando così la definizione di **feasibility** di un assegnamento.

##Soluzione CSP

È una restrizione di tutti i domini tale che tutti i vincoli siano risolti, cioè ogni possibile assegnamento di tutte le variabili soddisfa tutti i vincoli del problema.

> D′(x<sub>i</sub>) ∀x<sub>i</sub>∈X : ∀c<sub>j</sub>∈C, c<sub>j</sub>=∏x<sub>i</sub>∈X(c<sub>j</sub>)D′(x<sub>i</sub>)

Una caso particolare di questa generalizzazione è quandp tutti i domini di tutte le variabili sono dei singoletti, cioè sono composti da un solo elemento.

##DFS - Depth first search

Utilizzando questi concetti di generalizzazione è possibile andare a migliorare gli algoritmi di ricerca e filtering.

```python
def DFS(CSP):
  if gen_sol_found(CSP): return True
  if infeasible(CSP): return False
  for dec in decisions(CSP):
    if DFS(apply(dec, CSP)): return True
  return False
```

L'algoritmo di ricerca base può essere ottimizzato facendolo terminare quando viene trovata una soluzione generalizzata.

Allo stesso modo può essere modificato __AC1__ in modo che se un vincolo è già risolto, allora non venga eseguito il filtering per tale vincolo.

```python
dirty = True
while dirty:
  dirty = False
  for cj in C:
    if not resolved(cj, CSP):
      dirty = dirty or cj.filter()
```

Per effettuare queste ottimizzazioni è necessario poter determinare se il vincolo è risolto o meno e non sempre questo è possibile.

Da notare che, nel caso si ottengano dei domini singoletti dopo aver filtrato per un vincolo, non è più conveniente eseguire altro filtering con quel vincolo, dal momento che più di così non si può fare.

##Vincoli aritmetici e espressioni

__N-Queens__: si vogliono disporre su una schacchiera *NxN*, *N* regine in modo che non si minaccino tra loro.

Per modellare questo problema è necessario focalizzarsi sulle decisioni da prendere e come conviene codificare tali decisioni.

Ad esempio come modello per questo problema si può usare una variabile per ogni colonna che specifica in quale riga della scacchiera è presente la regina.

In questo modo si ottiene un dominio per le variabili già ridotto e più compatto rispetto al modello che ha tante variabili quante sono le caselle della scacchiera.

Con questa modellazione i vincoli del problema diventano:

- Non possono esserci due regine sulla stessa colonna --> sempre soddisfatto per come sono definite le variabili.
- Non possono esserci due regine sulla stessa riga --> *x<sub>i</sub> ≠ x<sub>j</sub>* per ogni *i* e *j*, cioè due variabili non possono avere lo stesso valore e per come è espresso il problema vuol dire che due colonne diverse non possono essere avere la regina sulla stessa riga.
- Non possono esserci due regine sulla stessa diagonale --> *x<sub>j</sub> - x<sub>i</sub> ≠ j - i*, per ogni coppia *i < j*, è necessario esprimere anche questo vincolo per l'altra diagonale.

**Problema**: non sappiamo come modellare *x<sub>j</sub> - x<sub>i</sub> ≠ v* e non può essere utilizzato un vincolo ad hoc perché si avrebbe un numero di vincoli che aumenta esponenzialmente.

Lo stesso vincolo può essere implementato con *x + y = z* e *z ≠ v*, in questo modo definisco due vincoli elementari che possono essere combinati tra loro per creare vincoli più complessi.

Fortunatamente ci sono dei linguaggi di modellazione che eseguono il parsing automatico delle espressioni, permettendo di scrivere espressioni complesse senza preoccuparsi di definire i vincoli più semplici.

Queste espressioni possono essere aggiunte ad una libreria di vincoli come:

- `z=x+y` sum constraint
- `z=xy` multiplication constraint
- `z=|x|` absolute value constraint
- `z=min(x,y)` minimum constraint

dove:

- `z` viene introdotta in automatico durante il parsing dell'espressione;
- `z` è una variabile o un'espressione (concettualmente vengono trattate allo stesso modo, anche se vengono implementate in modo diverso).
- `x` e `y` possono essere variabili, costanti o altre espressioni.

Per poter utilizzare in modo efficente questi vincoli è andare a definire delle strategie per fare filtering.

##Consistenze locali 

L'approccio di scrivere un nuovo algoritmo di filtering per ogni vincolo non scala, è necessario usare un approccio sistematico a questo problema.

###Vincoli binari

Si rimouve un valore *v* dal dominio *D(X)* se non supporta un determinato vincolo quando viene combinato con i valori del dominio *D(Y)*.

Un valore *v* in *D(X)* si dice che ha un **supporto** se esiste un valore *w* in *D(Y)* tale che *(v,w)* soddisfa un vincolo.

Quando tutti i valori presenti nel dominio hanno un supporto si dice che il vincolo *c* è consistente sugli archi (**Arc Consistency**).

Viene usato il termine arco in quanto un CSP può essere visto come un grafo i cui nodi sono dati dalle variabili del problema.

La consistenza sugli archi garantisce che vincolo per vincolo ogni assegnamento delle variabili porta ad una soluzione feasible e permette di formalizzare gli algoritmi di filtering.

Questa strategia funziona bene a livello locale, ma a livello globale no, in quanto la conistenza dei vincoli viene forzata vincolo per vincolo, senza tenere conto degli altri vincoli e quindi non è detto che il problema sia globalmente consistente.

Avere consistenza globale è complesso quanto risolvere il problema e dal momento che la complessità dell'algoritmo di filtering risulta particolarmente critica dal momento che deve essere eseguito pià volte per ogni nodo, si preferisce forzare la consistenza locale che è meno complessa.

Ad esempio filtrare per la disuguaglianza di due valori viene fatto in tempo costante, mentre per l'uguaglianza è necessario un tempo lineare.

###Vincoli generici

__Generalizzazione di supporto__: un valore di un certo dominio è supportato se per tutte le altre variabili nello scope del vincolo esiste un altro valore tale che l'insieme dei valori riesce a soddisfare il vincolo.

__Generalizzazione dell'Arc Consinstency__: 
Un vincolo *c* è consistente sugli archi in modo generalizzato se *∀x<sub>i</sub> ∈ X(c)* è possibile trovare un valore *v ∈ D(x<sub>i</sub>)* che ha supporto.

Fare filtering per il vincola della somma ha una complessita cubica, tuttavia con un po' di ottimizzazioni si riesce ad ottenere una complessità quadratica, questo perché nel nostro sistema fare il look-up di un valore ha complessità costante).

> z=x+y

Regole di filtering

- se *v ∈ D(z)* e *∀w ∈ D(x)*, *v − w ∉ D(y)*, allora tolgo *v*
- se *w ∈ D(x)* e *∀v ∈ D(z)*, *v − w ∉ D(y)*, allora tolgo *w*
- se *u ∈ D(y)* e *∀v ∈ D(z)*, *v − u ∉ D(x)*, allora tolgo *u*

Così facendo la complessità diventa quadratica nella dimensione di *D(x)* e *D(z)*, cioè _O(|D(x)|*|D(z)|)_.

###Bound consistency

Se i domini sono un intervallo interno e il minimo e massimo dell'intervallo del dominio hanno un supporto, allora anche tutti i valori nel mezzo hanno un supporto.

Si dice che un valore *v<sub>i</sub> ∈ D(x<sub>i</sub>)* ha supporto con Bound Consistency se e solo se, ∀x<sub>j</sub> ∈ X(c)∖{x<sub>i</sub>}, esiste un valore *v<sub>j</sub> ∈ {min(x<sub>j</sub>)..max(x<sub>j</sub>)}* tale che *(v<sub>0</sub>,v<sub>1</sub>,...,v<sub>m-1</sub>) ∈ c*

Un vincolo è BC se per ogni variabile del vincolo, sia il minimo che il massimo valore di quella variabile hanno un supporto.

In alcuni casi BC equivale a GAC anche se tipicamente questa tipologia di consistenza è più debole.

In ogni caso, sia la bound consistency che l'arc consistency garantiscono un domani wipeout nel caso non ci siano soluzioni, la differenza riguarda l'efficenza dei due algoritmi: AC è più costoso in termini di tempo ma permette di diminuire il tempo necessario alla ricerca, mentre BC è più veloce da applicare ma taglia meno valori, con un conseguente aumento del tempo necessario alla ricerca.
















