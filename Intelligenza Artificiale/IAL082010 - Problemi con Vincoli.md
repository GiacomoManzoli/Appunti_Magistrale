#Lezione 8 - Problemi con vincoli

**CSP Binario**: ogni vincolo si riferisce ad al più due variabili.

**Grado dei vincoli**: i nodi del grafo sono le variabili del CSP e gli archi rappresentano i vincoli.

Considerando un CSP come un grafo è possibile utilizzare le proprietà del grafo per velocizzare la ricerca di una soluizone.

##Varietà di CSP

Tipicamente le variabili dei problemi CSP sono discrete.

I loro domini possono essere *finiti* o *infiniti*.

In alcuni casi è necessario utilizzare un linguaggio per definire vincoli.

Solamente i vincoli lineari sono risolvibili, mentre la risolvibilità di quelli non lineari non è decidibile.

C'è anche la possibilità di utilizzare variabili continue con vincoli lineari, in questo caso la risoluzione dei vincoli avviene con il metodo del simplesso (programmazione lineare) con complessità esponenziale nel caso pessimo (polinomiale tipicamente).

I vincoli possono essere:

- **unari**: coinvologono una sola variabile;
- **binari**: coinvologono due variabili:
- **di ordine superiore**: coinvolgono più di due variabili;
- **prefenze (o soft)**: trammite l'assegnamento di un costo ad ogni variabile, un esempio di questo vincolo è preferire il rosso al verde nel problema della colorazione di una cartina. (il problema diventa un problema di ottimizzazione vincolata, vengono prefreite le soluzioni di costo minore)

##Formulazione di ricerca standard

Gli stati vengono definiti dai valori assegnati fino ad un dato momento.

**Stato iniziale**: l'assegnamento vuoto.

**Funzione successore**: assegna un valore ad una variabile non ancora assegnata che è compatibile con l'assegnamento corrente. Questa funzione fallisce se non esiste un assegnamento legale.

**test di goal**: l'assegnamento corrente è completo, tutti i vincoli sono soddisfatti.

Proprietà:

1. Valido per tutti i CSP;
2. Ogni soluzione appare a profondità *n* con *n* variabili (tutti gli stati a profondità n sono soluzioni, questo per costruzione, perché altrimenti non sarei riuscito a scendere fino a tale profondità), conviene quindi usare la ricerca depth-first;
3. Il cammino è irrilevante, interessa solo lo stato (anche una soluzione locale può andare bene);
4. A profondità `l` il fattore di branching (cioè nodi nella frontiera) è tipicamente `(n-l)*d`.

## Ricerca con Backtracking

Gli assegnamenti sono tra loro commutativi.

Utilizzare il backtracking nella ricerca depth-first consiste nel tornare indietro di un nodo e utilizzare un altro valore per l'assegnamento.

La ricerca con backtracking è l'algoritmo non informato di base per risolvere i CSP.

```
function BacktrackinSearch(csp) returns solutions/failure
	return RecursiveBacktracking([],csp)

function RecursiveBacktracking(assigned, csp) return sorultion/failure
	if assigned is complete then retun assigned
	var <- SelectUnassignedVariable(Variables[csp], assignd, csp)
	for each value in OrderDomainValue(var, assigned, csp) do
		if value is consistent with assigned according to Constraints[csp] then
			result <- RecursiveBackracking([var = value | assigned], csp)
			if result != failure then return result
	end
	return failure
```

###Miglioramenti dell'efficienza

Aggiungendo degli accorgimenti ai vari assegnamenti è possibile andare a migliorare l'efficienza dell'algoritmo.

1. Quale variabile si deve assegnare al prossimo passo?
2. In quale ordine testare i valori del dominio?
3. È possibile rilevare a priori dei fallimenti inevitabili?
4. È possibile sfruttare la stuttura del problema? (es: il problema è composto da più sotto-problemi tra loro indipendenti oppure la stuttura dei vincoli è simmetrica)

#### Assegnamenti delle variabili

Una euristica che porta ad un miglioramento è quella di scegliere come prossima variabile da assegnare quella **più vincolata** cioè con il minor numero di valori possibili. In questo modo scopro prima se sto andando verso un assegnamento che non può essere completato.

Se ci sono più variabile con lo stesso numero di vincoli, tra queste conviene scegliere quella che ha **più vincoli con variabili non assegnate**, perché è quella che scegliendo un valore vincola maggiormente la scelta delle altre.

Una volta scelta la variabile, posso scegliere di assegnarle il valore **meno vincolante**, cioè quello che esclude meno valori tra quelli possibili delle variabili non ancora assegnate.

####Foward checking

*attività di propagazione dei vincoli*

L'idea è quella di tenere traccia dei rimanenti valori legati per le variabili non assegnate. Viene terminata la ricerca se c'è qualche variabile che rimane senza valori legali.

Dopo un assegnamento si va a controllare come cambiano i domini delle altre variabili.

Questa cosa prende il nome di **constraint propagation** e ci sono vari algortimi che permettono questi, vedi corso di Sistemi Con Vincoli.

####Struttura del grafo

Se il grafo è composto da sotto-problemi tra loro indipendenti, conviene risolverli separatamente e poi combinare tra loro le soluzioni.

In alcuni casi il guadagno temporale risulta estremo, si passa da miliardi di anni a qualche secondo.

Inoltre, se il grafo associato al CSP ha una struttura ad albero, ovvero non ha vincoli, il CSP può essere risolto in *O(n\*d<sup>2</sup>)*.

Questo perché si può scegliere un ordine delle variabili che sia consistente con la topologia del grafo.

##Algoritmi iterativi per CSP

Per risolvere un CSP è possibile utilizzare sia Hill-Climbing che Simulated Annealing, in quanto questi lavorano con stati "completi", cioè che hanno tutte le variabili assegnate.

Per applicarli ad un CSP è necessario permettere stati con vincoli non soddisfatto e degli operatore che permettono di riassegnare valori ad una variabile.

La selezione della variabile viene fatta in modo casuale tra quelle che hanno dei conflitti, mentre come valore per la variabile si usa l'euristica del minimo conflitto, utilizzando quindi la funzione classica `h(n) = numero totale di vincoli violati`.

###Presetazioni di min-conflicts

Dato una stato iniziale random, si può risolvere n-regine per n arbitrario in un tempo costante con alta probabilità.

Questo sembra essere vero per ogni CSP generato a caso, tranne che per un intervallo ristretto, del rapporto:

```
R = numero di vincoli / numero di variabili
```























