#Lezione 6 - Ricerca 2

*Nelle precedenti puntate:* scegli una variabile in modo che sia più probabile fallire e scegli un valore in modo che si più probabile trovare una soluzione.

##Ricerca per i problemi di ottimizzazione

Oltre a trovare la solzuone è necessario provare che sia ottima, è necessario qundi andare ad esplorare tutto l'albero.

Tipicamente si scelgono sia variabili che valori con la qualità più alta possibile, cioè che portino ad ottenere dei vincoli più stretti.

Questo perché i vincoli più stretti fanno un pruning maggiore e velocizzano il processo di ricerca.

Il tutto deriva dal fatto che facendo il B&B ogni volta che si trova una nuova soluzione si ottiene un nuovo vincolo.

##Alternative Branching Scheme

Finora abbiamo fatto branching con un ramo *x=v* e uno *x!=v*, possono però essere usate strategia diverse, come:

- **labeling**: tanti rami quanti sono i possibili valori della variabile;
- **paritioning**: *x <= v* e *x>v*, è utile quando si rappresentano qunatità o si hanno domini larghi.
- **probing/diving**: non faccio branching, assegno la variabile ad un valore, questo è utile quando non è necessario fare backtracking (*violazione di DFS*).

##Su cosa fare branching

In alcuni casi, come quando si lavora con intervalli di tempo, la scelta della variabile sulla quale fare branching influisce di molto sulle prestazioni.

Ad esempio è possibile assegnare il valore dei vincoli reificati a delle variabili ed utilizzare queste nuove variabili per fare branching.

In questo modo viene fatta della propagazione dei vincoli già nella fase di ricerca.

Rimane solo da assegnare un valore alle variabili. Questi valori possono essere assegnati facendo probing, utilizzando il minor start time possibile per ogni variabile.

Ottenendo così una soluzione ottima in poco tempo.

## Ricapitolando

- La ricerca in CP è molto flessibile (selezione delle variabili, schema di branching e variabili da usare per fare branching)
- CP può essere utilizzato per implementare delle euristiche
- Per ottenere i risultati migliori è necessario modificare l'algoritmo