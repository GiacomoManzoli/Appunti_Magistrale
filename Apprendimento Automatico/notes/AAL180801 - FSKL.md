#Lezione 18 - Feature selection e Kernel learning

Gli attributi o variabili dovrebbero essere utilizzati solo se veramente utili (rilevanti) per la classificazione/predizione.

Avere meno attributi porta modelli di classificazione-predizione più compatti e che hanno bisogno di un numero minore di esempi di apprendimento per ottenere dei buoni risultati.
Infatti, alcuni attributi possono introdurre del rumore sui dati.

Inoltre, modelli che usano pochi attributi sono più semplci da ocmprendere per un umano e sono più facilmente rappresentabili.

## Feature selection ed extraction

**Feature selection**: viene selezionato un sotto insieme "migliore" degli attributi tra quelli originali. Ad esempio possono essere scartate delle feature ridondanti o non rilevanti. 

In questo modo si ottiene un interpretabilità migliore del modello predittivo, pertanto questo approccio è preferibile dove l'interpretabilità è più importante dell'accuratezza.

**Feature extraction**: si derivano nuovi attributi da quelli originali, per esempio, nuove features vengono ottenuteo come combinazione di attributi.

In questo modo si ottengono featuer più discriminative che portano ad avere un'accuratezza migliore, pertanto questo approccio è preferibile per applicazioni dove l'accuratezza è più importante dell'interpretabilità.


### Feature selection

Ci sono tre famiglie principali di metodi:

- **Filter methods**: considerano caratteristiche generali del training set, andando a pre-processare i dati indipendenemnte dall'algoritmo di apprendimento. Viene calcolato uno score per le varie feature e vengono tenute solamente quelle migliori, senza tenere conto del supervisiore. Ad esempio questo metodo va a scartare le informazioni relative al nome di una persona.
- **Wrapper methods**: la selezione delle feature viene fatta sulla base della loro capacità predittive, tipicamente utilizzando un insieme di hold-out. Può essere utilizzato un'approccio **backward**, partendo prima con tutte le feature possibili, dopodiché per ognuna delle feature si prova a toglierla e si controlla quanto migliora lo score. Si vanno via via a rimuovere in modo greedy le feature che portano ad un miglioramento dello score. L'approccio **backward** parte da un numero minimo di feature e va ad aggiungere feature in modo da aumentare lo score.
- **Embedde methons**: la scelta delle feature viene inserita nel problema di minimizzazione, come nel metodo **LASSO**, Se *w* è il vettore dei pesi che si va ad apprendere, si aggiunge al problema la massimizzazione della norma zero del vettore *w*. Nel lato pratico si usa l'approssimazione ottenuta massimizzando la norma uno del vettore. (da sistemare)

### Feature extraction 

Il metodo più importante si chiama **Principal Component Analysis** (PCA) e che consiste nella estrazione di un insieme di features non correlate linearmente.

Ovvero si mappano tutti gli esempi in poche dimensioni, queste dimensioni sono quelle che rappresentano meglio i dati del problema e allo stesso tempo diminuiscono il rumore sui dati.

Il numero di componenti principali è solitamente molto inferiore al numero di features originali.

### Applicazioni della Feature Selection

- **Biologia computazionale**: in quanto si hanno pochi esempi e migliaia di features. Ad esempio si vuole sapere, dato il paziente si vuole sapere se una cura può essere efficace o meno.
- **Riconoscimento di facce**: per determinare quali sono le feature importanti per il riconoscimento della faccia.
- **Ambito medico**: generalmente le variabili sono dei risultati degli esami medici, pertanto si cerca di minimizzare le variabili per ridurre i costi.
- **Ambito finanziario**: moltissimi fattori possono influenzare un titolo in borsa. Si cerca quindi di ridurre questo numero per rendere più semplice il modello risultante.
- **Classificazione dei testi**: ad ogni termine è associata una feature, riducendo questo numero si velocizza l'apprendimento.

## Kernel Learning

L'idea è quella di apprendere la funzione o la matrice kernel:

1. Metodi parametrici per il kernel learing
2. Tranductive featuer extraction con kernel non lineari
3. Spectral kernel learning
4. Multiple kernel learning

**Matrice kernel**: matrice che per ogni coppia di dati di traning fornisce un valore che rappresenta il prodotto scalare della coppia.

### Metodi parametrici per il kernel learning

L'idea è quella di prendere una funzione kernel come RBF e aggiungerci dei parametri.

> k(x,z) = e^{-(x-z)^t M(x-z)}

e se *M = 𝜸I* si ottiene la versione classica di RBF

> k(x,z) = e^{-𝜸||x-z||^2}

Un'altra scelta tipica è *M = diag(𝜸<sub>1</sub>, ...,𝜸<sub>m</sub>)*, in questo caso le distanze vengono pesate dando maggiore importanza rispetto ad altre.

Con questo approccio vengono appresi anche i parametri 𝜸.

### Transduction feature extraction con kernel non lineari

Effettua una feature extraction implicitamente nel featuer space.

**KPCA** o Kernel Principal Component Analisys va a calcolare implicitamente le proiezioni delle featuer principagli sugli autovettori (direzioni) principali.

Trattandosi di un caso non lineare, non è possibile andare a calcolare esplicitamente le componenti principali, ma viene utilizzata una forumale che permette di calcolarle in modo più agevole (implicitamente), un po' come accade con i margini delle SVM. 

Trattandosi di un approccio trasduttivo, pertanto può essere utilizzato sole se si hanno ha disposizione tutte le componenti si riesce ad applicare. Se questo non è possibile è necessatio utilizzare delle tecniche dette **out sample**.

### Spectral Kernel learning

La matrice kernel, essendo definita positiva, può essere scritta in un modo compatto in funzione degli autovalori e autovettori.

Utilizzando una trasfomrazione degli autovalori si va ad agire implicitamente nello spazio delle feature. Intaffi, il kernel modificato può essere ottenuto utilizzando un po' di algebra, andando a moltiplicare la matrice degli autovettori con la radice quadrata della matrice degli autovalori.

### Multiple kernel learning

L'idea è quella di combinare linearmente kernel diversi e definiti a priori, per poi apprendere la combinazione lineare di questi in modo da ottimizzare il kernel risultante.

- **Fixed methods**: o metodi euristici, vengono utilizzati semplici regole che vengono utilizzate per il caloclo dei coefficenti, ad esempio il metodo più semplice è prendere la media dei kernel e stranamente, a livello pratico, funziona molto bene, oppure possono essere scelti dei pesi in base all'accuratezza dei singoli kernel (funziona peggio rispetto alla media).
- **Optimization method**: inglobano i coefficenti come variabile da apprendere nel problema di ottimizzazione, ad esempio nelle SVM si può modificare il problema di apprendimento per apprendere sia i coefficenti 𝜶, sia per i coefficenti della combinazione lineare.



