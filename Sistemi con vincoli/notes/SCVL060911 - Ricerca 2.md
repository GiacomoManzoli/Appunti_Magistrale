#Lezione 6 - Ricerca 2

*Nelle precedenti puntate:* scegli una variabile in modo che sia più probabile fallire e scegli un valore in modo che si più probabile trovare una soluzione.

##Ricerca per i problemi di ottimizzazione

Oltre a trovare la solzuone è necessario provare che sia ottima, è necessario qundi andare ad esplorare tutto l'albero.

Tipicamente si scelgono sia variabili che valori con la qualità più alta possibile in modo da ottenere subito una buona soluzione (in termini delle funzione obiettivo).

Così facendo, durante l'optimality proof si hanno dei vincoli più stretti che portano ad un pruning maggiore, velocizzando così il processo di ricerca.

Il tutto deriva dal fatto che facendo il B&B ogni volta che si trova una nuova soluzione si ottiene un nuovo vincolo e che per provare l'ottimialità è necessario esplorare tutto l'albero di ricerca.

##Alternative Branching Scheme

Finora abbiamo fatto branching con un ramo *x=v* e uno *x≠v*, possono però essere usate strategia diverse, come:

- **labeling**: tanti rami quanti sono i possibili valori della variabile;
- **paritioning**: *x ≤ v* e *x>v*, è utile quando si rappresentano quantità o si hanno domini larghi.
- **probing/diving**: non faccio branching, assegno la variabile ad un valore, questo è utile quando non è necessario fare backtracking (*violazione di DFS*).

##Su cosa fare branching

In alcuni casi, come quando si lavora con intervalli di tempo, la scelta della variabile sulla quale fare branching influisce di molto sulle prestazioni.

Ad esempio è possibile assegnare il valore dei vincoli reificati a delle variabili ed utilizzare queste nuove variabili per fare branching.

In questo modo viene fatta della propagazione dei vincoli già nella fase di ricerca.

Rimane solo da assegnare un valore alle variabili. Questi valori possono essere assegnati facendo probing, utilizzando il minor start time possibile per ogni variabile.

Ottenendo così una soluzione ottima in poco tempo.

### Esempio dello scheduling

Se si fa branching sulle variabili che rappresentano gli start time delle attività, dal momento che i domini sono molto grandi, in vincolo che viene aggiunto durante il backtracking risulta molto debole.

Si può quindi utilizzare una variabile associata ad un vincolo reificato definito sulle precedenze per fare branching:

> (s<sub>i</sub>,<sub>j</sub>+d<sub>i</sub>,j ≤ s<sub>h</sub>,<sub>k</sub>) ∨ (s<sub>h</sub>,<sub>k</sub>+d<sub>h</sub>,<sub>k</sub> ≤ s<sub>i</sub>,<sub>j</sub>)
> 
> Viene riformulato in:
> 
> - (y<sub>(i,j),(h,k)</sub>=0) = (s<sub>i,j</sub>+d<sub>i,j</sub> ≤ s<sub>h,k</sub>)
> - (y<sub>(i,j),(h,k)</sub>=1) = (s<sub>h,k</sub>+d<sub>h,k</sub> ≤ s<sub>i,j</sub>)
> 
> Così facendo il branching viene fatto con y<sub>(i,j),(h,k)</sub>=0 e y<sub>(i,j),(h,k)</sub>≠0.
> 
> Per i rami di branching vengono quindi aggiunti i vincoli
> 
> - y = 0 --> s<sub>i,j</sub> + d<sub>i,j</sub> ≤ s<sub>h,k</sub>
> - y ≠ 0 --> s<sub>h,k</sub> + d<sub>h,k</sub> ≤ s<sub>i,j</sub>

Così facendo viene stabilito solamente un ordinamento delle attività, senza assegnare i vari start time. Serve quindi una seconda fase di ricerca per assegnarli.

La seconda fase può essere fatta in probing, assegnando ad ogni attività il minimo start time possibile. Il probing in questo caso è corretto, perché questra strategia di assegnamento produce sempre il migliore makespan.

## Ricapitolando

- La ricerca in CP è molto flessibile (selezione delle variabili, schema di branching e variabili da usare per fare branching)
- CP può essere utilizzato per implementare delle euristiche
- Per ottenere i risultati migliori è necessario modificare l'algoritmo