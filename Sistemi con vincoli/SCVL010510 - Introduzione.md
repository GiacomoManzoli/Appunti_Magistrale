#Sistemi con vincoli

##Introduzione

Programmazione a vincoli: constraint programmmig

__CSP__ --> **C**onstraint **S**atisfaction **P**roblem

__COP__ --> **C**onstraint **O**ptimization **P**roblem: problema di ottimizazione con vincoli, è diverso dalla programmazione lineare.

Appartengono a questa tipologia di problemi i tipici problemi gestionali, come la pianificazione dell'orario dei treni o la gestione dei porti.

La risoluzione di uno di questi problemi si basa sempre sulla costruzione di un modello, in modo analogo alla Programmazione Lineare, solo che nella modellazione non venogno utilizzate le equazioni lineari.

##Problemi combinatori - CSP

Sono una tipologia di problemi come la colorazione di una cartina utilizzando *n* colori o la risoluzione di un sudoko.

Questi hanno un pattern simile di risoluzione:

- Si cercano dei vincoli per limitare le possibili mosse
- Si fanno determinate scelte e se sono sbagliate si torna indietro

Su un foglio di carta è più semplice da fare, in CP si cerca di formalizzare queste cose per un computer.


> CSP = \<X,D,C\>

>- X: insieme di variabili, con x<sub>i</sub> si indica una variabile dell'insieme;
>- D: insieme di domini, x<sub>i</sub> ha dominio D(x<sub>i</sub>);
>- C: insieme di vincoli, c<sub>j</sub> è definito su un sottoinsieme di varibili, X(c<sub>j</sub>) e viene detto _ambito del vincolo_ (scope in inglese).

**Tupla**: sequenza fissata di valori.

**Relazione**: Data *S* sequenza di insiemi = S<sub>0</sub>, S<sub>1</sub>, S<sub>2</sub>, ecc.
Una relazione *R* su *S* è un sottoinsieme del prodotto cartesiano della sequenza *S*.

Un vincolo è quindi una sorta di tabella con tutti i possibili valori validi (**feasible**) per le relazione definite tra i vari domini delle variabili del problema.

Una soluzione per un CPS è quindi tupla definita sul prodotto cartesiano di tutti i domini che è consistente con tutti i vincoli. (Una soluzione è quindi una relazione sull'insieme dei domini).

Un CSP senza soluzione si dice **infisable**, senza soluzione.

Un CSP può essere definito con ogni tipo di dominio e vincolo

Tipicamente come domini vengono utilizzati:

- Interi
- Reali
- Set
- Grafi

Nel corso noi useremo domini interi finiti (finite domains), con i quali è possibile utilizzare qualsiasi tipo di vincolo, rappresentandolo in forma estensionale, cioè andando ad enumerare tutti i possibili assegnamenti di variabili che lo soddisfano.
Questa modellazione dei vincoli però è scomoda e inefficente, e tipicamnete viene utilizzata la forma "*intensional*"

Per esprimere dei vincoli con questa forma vengono utilizzate delle Constraint libraries,  delle collezioni di tipologie di vincoli come:

- **equality**: x==y
- **disequality**: x!=y

Ad esempio, utilizzando queste due tipologie di vincoli è possibile andare a modellare il problema della colorazione della cartina del nord italia con:

- variabili: x<sub>i</sub> ϵ {0..3} per ogni regione;
- vincoli: x<sub>i</sub> != x<sub>j</sub> per le regioni confinanti.


##Filtering

L'idea è che alcuni valori per determinate variabili non potranno mai essere usati in una soluzione, questo perché eseguendo uno di questi assegnamenti alcuni vincoli vengono violati. 

Si può quindi andare a filtrare per un determinato vincolo, cioè rimuovere dai domini delle variabili alcuni valori che sono sicuramente non soddisfacibili.
Questo processo prende il nome di **filtering**, mentre l'atto di rimuovere un valore viene detto **pruning**.

Il filtering fatto da un vincolo può permettere ad un altro vincolo di fare ulteriore filtering, in questo caso si dice che fa __propagation__.

La propagazione viene effettuata mediante un algoritmo.

###AC1: il primo algoritmo di propagazione

```python
dirty = true
white dirty:
	dirty = false
	for cj in C:
		dirty = dirty or cj.filter()
```

Assumendo che `cj.filter()` ritorni `true` se il filtering ha tagliato dei valori.

AC1 raggiunge sempre un punto fisso che non dipende dall'ordine in cui sono stati processati i vincoli.

Ciò si dimostra introducendo la funzione *filtered<sub>c</sub>(D)* che applica l'algoritmo di filtering per il vincolo *c* nel dominio *D* e ritorna il dominio filtrato.
Dal momento che questa può solo togliere dei valori è ovvio che dopo un numero finito di passi la funzione non sarà più in grado di rimuovere valori, raggiungendo così un punto fisso, che nel caso pessimo è dato dall'insieme vuoto.

La funzione *filtered<sub>c</sub>(D)* è anche monotona, filtrare un dominio di partenza già filtrato, può solo produrre un insieme ulteriormente filtrato.

Tutto questo prende il nome di __Fix Point Theorem__.

Una conseguenza di questo teorema è che l'ordine secondo il quale viene effettuato il filtering non influisce sul risultato. Tuttavia l'ordine con cui eseguo il filtering influisce sul numero di iterazioni necessarie e determinare l'ordine migliore è un problema NP-difficile.

##Solving (Ricerca delle soluzioni)

Dopo aver filtrato e propagato non sempre si ottiene una soluzione, in questo caso è necessario andare a tentativi, cioè scegliere una variabile ed assegnarle uno dei possibili valori.

###Depth First Search

```python
def DFS(CSP):
	if sol_found: return true
	if infeasible: return false
	for dec in decisions(CSP):
		if DFS(apply(dec, CSP)): return true
	return false
```

L'algortimo fa _backtracking_, cioè se non raggiunge una soluzione, distrugge il ramo decisionale che ha seguito e ne inizia un'altro.

Per determinare che un problema è infiseable bisogna valutare i domini delle variabili, se uno di questi è vuoto allora il problema non ha soluzione (**domain wipeout**).

La funzione `decision(CSP)` usa l'insieme dei vincoli per scegliere un valore per una variabile _unbound_, cioè una variabile alla quale non è ancora stato assegnato un valore e il cui dominio contiene più valori.

Una possibile decisione può essere quella di selezionare il valore minore presente nel dominio di una variabile e provare ad eseguire l'assegnazione, creando così un ramo decisionale. Viene poi creato un altro ramo nel quale la variabile viene posta diversa dal valore scelto.

Dopodichè si prosegue l'esplorazione dell'albero lungo il primo ramo decisionale e se si arriva ad una soluzione infeasibile viene effettauto il backtracking.

Dopo aver preso una decisione, questa viene propagata utilizzando AC1, restringendo ulteriormente l'ambito delle possibili scelte.





