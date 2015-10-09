#Sistemi con vincoli

##Introduzione

Programmazione a vincoli: constraint programmmig

CSP --> constraint satisfaction program

COP --> constraint optimization program, problema di ottimizazione con vincoli, è diversa dalla programmazione lineare.

Tipici problemi gestionali, come la pianifiazione dei treni o gestione dei porti

Si basa sempre sulla costruzzione di un modello come per LP (Ricerca operativa) solo che non vengono utilizzate le equazioni lineari


##problemi combinatori - CSP

* colorazione della cartina con 4 colori
* sudoku

hanno un pattern simile di risoluzione

- si cercano dei vincoli per limitare le possibili mosse
- si fanno determinate scelte e se sono sbagliate si torna indietro

Su un foglio di carta è più semplice da fare, in CP si cerca di formalizzare queste cose per un computer


CSP = <X,D,C>

- X: insieme di variabili, con xi si indica una variabile dell'insieme
- D: insimede di domini, xi ha dominio D(xi) 
- C: insieme di vincoli, cj è definito su un sottoinsieme di varibili, X(cj) e viene detto _ambito del vincolo_

Tupla: sequenza di valori di sequenza fissata.

Relazione: S sequenza di insiemi = S0,S1, S2.
Una relazione R su S è un sottoinsieme del prodotto cartesiano della sequenza S.

...
...

Un vincolo è qundi una sorta di tabella con i valori validi per le coppie di variabili

Una soluzione per un CPS è un tupla definita sul prodotto cartesiano di tutti i domini che è consistenti con tutti i vincoli.

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

con i domini finiti è possibile utilizzare qualsiasi titpo di vincolo. (rappresentazione estensionale)
Sono scomodi e inefficenti.

Per esprimere dei vincoli vengono utilizzate delle Constraint libraries, un insieme di tipologie di vincoli.

Es:
- equality: x==y
- disequality: x!=y

colorazione della cartina dell'Italia:
- variabili: xi € {0..3} per ogni regione
- vincoli: xi != xj per le regioni confinanti


__fitlering__

filtrare per un determinato vincolo vuol dire adnare a rimuovere dai domini delle variabili alcuni valori che sono sicuramente non soddisfacibili.

_pruning_ l'atto di rimuovere un valore
_filtering_ il processo.

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

c'è una dimostrazione di questo nelle slide deriva dal fatto che filtrando taglio sempre dei valori, finché non esaurisco i valori tagliabili. La funzione filtered(D) è anche monotona, filtrare un dominio di partenza già filtrato, può solo produrre un insieme ulteriormente filtrato.

Tutto questo prende il nome di __Fix Point Theorem__.

L'ordine con cui eseguo il filtering influisce però sul numero di iterazioni necessarie.

Determinare l'ordine migliore non è semplice da calolcare (è un problema NP-Completo).

##Solving (Ricerca delle soluzioni)

Dopo aver filtrato e propagato non sempre si ottiene una soluzione, in questo caso è necessario andare a tentativi.

La maggior parte di questi problemi sono NP-Completi.

###Depth First Search

l'algoritmo di ricerca più semplice.

```
def DFS(CSP):
	if sol_found: return true
	if infeasible: return false
	for dec in decisiones(CSP):
		if DFS(apply(dec, CSP)): return true
	return false
```

L'algortimo fa _backtracking_, se trovo una cosa non soluzione, distruggo il ramo decisionale che ho fatto.

Per determinare che un problema è infiseable devo guardare il dominio, se il dominio è vuoto allora non ho soluzione (_domain wipeout_).

`decision(CSP)` sono dei vincoli, viene scelta una variabile che non ha vincoli (_unbuond_, il dominio ammette più valori).

Si prende il valore minore presente nel dominio, e si prova ad applicarlo alla variabile (un ramo) e si prova a porre la variabile diversa da quel valore (altro ramo).

Se si arriva ad una situazione infiseable si torna indietro.

Dopo aver preso una decisione, si propaga la decisione utilizzando AC1, restringengo ulteriormente l'ambito delle possibili scelte.





