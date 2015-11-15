#Lezione 7 - Ricerca online e soddisfacimento di vincoli

Nelle precedenti puntante: Hill climbing con la risalita per trovare una funzione globale.

##Simulated Annealing

L'idea è quella di permettere delle mosse cattive per eviatre i massimi locali.

La frequenza di queste mosse va via via a calare e viene determinata da una distribuzione di probabilità nota che deriva da come le molecole di un metallo si muovono al variare della temperatura.

```
function SimulatedAnnealing(problema, velocità_raffreddamento) returns uno stato soluzione
	inputs: problema, un problema
			  velocità_raffreddamento, una corrispondenta dal tempo alla temperatura
	variabili locali: nodo_corrente, un nodo
						  successivo, un nodo
						  T, una temperatura che controlla la provbabilità di compiere passi verso il basso.
	nodo_corrente <- CreaNodo(StatoIniziale[Prolema])
	T <- velocità_raffreddamento[t]
	if T == 0 then return nodo_corrente
	successivo <- un successore di nodo_corrente scelto a caso
	DeltaE <- Valore[successivo] - Valore[nodo_corrente]
	if DeltaE > 0 then nodo_corrente <- successivo
	else nodo_corrente <- successivo con probabilità e^(DeltaE/T)
```

A temperatura fissata `T` la probabilità di occuppazione degli stati segue la distrubuzione di Boltzmann.

Se `T` viene diminuito abbastanza lentamente si raggiunge sempre lo stato migliore.

Questo viene usato largamente nelle applicazioni pratiche come la definizione degli orari dei voli delle linee aeree.

##Ricerca online

Quando l'ambiente è dinamico o non deterministico non è possibile pianificare a priori le operazioni da compiere.

In questo caso è necessario interagire con l'ambiente per recuperare le informazioni mancanti.

Si parla quindi di _ricerca online_.

Si assume che l'agente conosca solo:

- Azioni(_s_): le azioni permesse nello stato _s_;
- c(_s,a,s'_): il costo dell'azione _a_ per passare dallo stato _s_ a _s'_ (lo stato di arrivo non è noto finché non è stata applicata l'azione);
- TestObiettivo(*s*): per sapere se lo stato *s* è un obiettivo.

Il problema principale di questo tipo di ricerca è che non esiste un algoritmo che permette di evitare vicoli cechi. Questo perché tipicamente non ci sono abbastanza infomrazioni riguardo l'ambiente di esecuzione.

Questi algoritmi non sono (ovviamente) completi.

###Ricerca in profondità online

L'idea è quella di esplorare l'ambiente alla ricerca di un goal.

```
function OnlineDFSAgent(s') returns an action
	inputs: s' una percezione che identifica lo stato corrente
	static:	result, una tabella indicizzata per azioni e stati, inizialmente vuota
				unexplored, una tabella che contiene, per ogni stato visitato, tutte le azioni che non sono ancora state eseguite
				unbacktracked, una tabella che contiene, per ogni stato visitato, i backtrack che non è ancora sono ancora stati provati
				s,a, lo stato precedente e l'azione precedentemente eseguita.
	if GoalTest(s') return stop
	if s' is a new state then unexplored[s'] <- Actions[s']
	if s is not null then do
		result[a,s] <- s'
		add s to the front of unbacktracked[s']
	if unexplored[s'] then
		if unbacktracked[s'] is empty then return stop
		else a <- an action b tale che result[b,s'] = Pop(unbacktracked[s'])
	else a <- Pop(unexplored[s'])
	s <- s'
	return a
```
Perché l'algoritmo funzioni è necessario che l'agente possa tornare indietro dopo aver fatto un'azione.

Questo algoritmo può comunque finire in cammini infinti o in vicoli cechi.

###Ricerca casuale

L'idea è quella di esplorare l'ambiente in modo da recuperare la maggior quantità possibile di informazioni per poi andare applicare altri algoritmi.

Questa tipologia di ricerca termina con un successo se lo spazio è finito, ma in ogni caso può essere molto lenta.

Ad esempio nel caso il numero di archi che si allontanano dal goal è maggiore rispetto a quelli che vanno nel verso corretto.

Altre strategie come l'HillClimbing con memoria o LRTA\* permettono di ottenere risultati migliori.

###Learning Real Time A\* - LRTA\*

L'idea di base consiste nel memorizzare la migliore stima corrente `H(s)` del costo per raggiungere il goal da ogni stato visitato.

`H(s)` inizialmente coincide con `h(s)` ma durante l'esecuzione viene aggiornata con l'esperienza.

```
function LRTA*-Agent(s') returns an action
	inputs:	s', una percezione dello stato corrente
	static:	result, una tabella indicizzata per azione e stato inizialmente vuota
				H, una tabella dei costi stimati inidicizzati secondo lo stato, inizialmente vuota
				s,a, lo stato e l'azione precendente
	if GoalTest(s') then return stop
	if s' is a new state (not in H) then H[s']<-h(s')
	unless s is null
		result[a,s] <- s'
		H[s] <- Min tra Actions(s) tra LTRA*-Cost(s,b,result[b,s],H)
	a <- an action b in Action(s') minimizing LTRA*-Cost(s',b, result[b,s'],H)
	s <- s'
	return a

function LTRA*-Cost(s,a,s',H) returns a cost estimate
	if s' is undefined then return h(s)
	else return c(s,a,s') + H[s']
```

Anche in questo caso si ha la garanzia di trovare una soluzione solo se gli stati sono finiti e le azioni sono revesibili, altrimenti non può essere completo.

*Questo termina la parte riguardante gli algoritmi generici*

##Problemi di soddisfacimento dei vincoli

In questa tipologia di problemi lo stato è una black box, una qualunque struttura dati che supporta il test di goal, la funzione di valutazione e la funzione successore.

In un CSP (*constraint satisfaction problem*) lo stato è definito da delle variabili `X`, con valori di domino `D` (ogni variabile x<sub>i</sub> ha come dominio D<sub>i</sub>).

Il test di goal è un insieme di vincoli che specificano combiniazioni ammissibili di valori per sottoinsieme di variabili.

È possibile definire degli algoritmi specializzati più potenti di quelli generici.

*esempio della colorazione di una cartina*
























