#Sistemi con vincoli

##Introduzione

Programmazione a vincoli: constraint programmmig

__CSP__ --> constraint satisfaction program

__COP__ --> constraint optimization program, problema di ottimizazione con vincoli, è diversa dalla programmazione lineare.

Tipici problemi gestionali, come la pianificazione dei treni o gestione dei porti.

Si basa sempre sulla costruzzione di un modello come per LP (Ricerca operativa) solo che non vengono utilizzate le equazioni lineari


##problemi combinatori - CSP

* Colorazione della cartina con 4 colori
* Sudoku

hanno un pattern simile di risoluzione:

- Si cercano dei vincoli per limitare le possibili mosse
- Si fanno determinate scelte e se sono sbagliate si torna indietro

Su un foglio di carta è più semplice da fare, in CP si cerca di formalizzare queste cose per un computer


CSP = \<X,D,C\>

- X: insieme di variabili, con x<sub>i</sub> si indica una variabile dell'insieme;
- D: insieme di domini, x<sub>i</sub> ha dominio D(x<sub>i</sub>);
- C: insieme di vincoli, c<sub>j</sub> è definito su un sottoinsieme di varibili, X(c<sub>j</sub>) e viene detto _ambito del vincolo_ (scope in inglese).

_Tupla_: sequenza fissata di valori.

_Relazione_: Data S sequenza di insiemi = S<sub>0</sub>, S<sub>1</sub>, S<sub>2</sub>, ecc.

Una relazione R su S è un sottoinsieme del prodotto cartesiano della sequenza S.

...
...

Un vincolo è qundi una sorta di tabella con i valori validi per le coppie di variabili

Una soluzione per un CPS è un tupla definita sul prodotto cartesiano di tutti i domini che è consistenti con tutti i vincoli. (Una soluzione è quindi una relazione sull'insieme dei domini).

Un CSP senza soluzione si dice _infisable_, senza soluzione.

Un CSP può essere definito con ogni tipo di dominio e vincolo

Tipicamente come domini vengono utilizzati:

- Interi
- Reali
- Set
- Grafi
- ...

Nel corso noi useremo domini interi finiti (finite domains)

Tipicamente come vincoli venogno utilizzati:

Con i domini finiti è possibile utilizzare qualsiasi tipo di vincolo. (rappresentazione estensionale).
Sono scomodi e inefficenti.

Per esprimere dei vincoli vengono utilizzate delle Constraint libraries, un insieme di tipologie di vincoli.

Es:

- equality: x==y
- disequality: x!=y

Colorazione della cartina dell'Italia:

- variabili: x<sub>i</sub> € {0..3} per ogni regione
- vincoli: x<sub>i</sub> != x<sub>j</sub> per le regioni confinanti


__fitlering__

filtrare per un determinato vincolo vuol dire andare a rimuovere dai domini delle variabili alcuni valori che sono sicuramente non soddisfacibili.

_pruning_ l'atto di rimuovere un valore mentre _filtering_ specifica il processo.

Il filtering fatto da un vincolo può permettere ad un altro vincolo di fare ulteriore filtering, in questo caso si dice che fa __propagation__.

La propagazione viene effettuata mediante un algoritmo.

###AC1: il primo algoritmo di propagazione
```
dirty = true
white dirty:
	dirty = false
	for cj in C:
		dirty = dirty or cj.filter()
```

Assumendo che `cj.filter()` ritorni `true` se il filtering ha tagliato dei valori.

AC1 raggiunge sempre un _fix point_ che non dipende dall'ordine in cui sono stati processati i vincoli.

C'è una dimostrazione di questo nelle slide e deriva dal fatto che filtrando si tagliano sempre dei valori, finché non si esauriscono tutti i valori tagliabili. 

La funzione `filter` è anche monotona, filtrare un dominio di partenza già filtrato, può solo produrre un insieme ulteriormente filtrato.

Tutto questo prende il nome di __Fix Point Theorem__.

L'ordine con cui eseguo il filtering influisce però sul numero di iterazioni necessarie.

Determinare l'ordine migliore non è semplice da calolcare (è un problema NP-Difficile).

##Solving (Ricerca delle soluzioni)

Dopo aver filtrato e propagato non sempre si ottiene una soluzione, in questo caso è necessario andare a tentativi.

La maggior parte di questi problemi sono NP-Difficili.

###Depth First Search

l'algoritmo di ricerca più semplice.

```
def DFS(CSP):
	if sol_found: return true
	if infeasible: return false
	for dec in decisions(CSP):
		if DFS(apply(dec, CSP)): return true
	return false
```

L'algortimo fa _backtracking_, se non raggiunge una soluzione, distrugge il ramo decisionale che ha seguito e ne inizia un'altro.

Per determinare che un problema è infiseable devo guardare il dominio, se il dominio è vuoto allora non ho soluzione (_domain wipeout_).

`decision(CSP)` usa l'insieme dei vincoli per scegliere un valore per una variabile _unbound_, cioè una variabile il cui dominio contiene più valori.

Si prende il valore minore presente nel dominio, e si prova ad applicarlo alla variabile (un ramo) e si prova a porre la variabile diversa da quel valore (altro ramo).

Se si arriva ad una situazione infiseable si torna indietro.

Dopo aver preso una decisione, si propaga la decisione utilizzando AC1, restringendo ulteriormente l'ambito delle possibili scelte.





