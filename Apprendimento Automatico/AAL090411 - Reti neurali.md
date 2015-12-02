#Lezione 9 - Reti neurali

Due approcci principali per studiarle:

1. Riprodurre il cervello umano, cercando di modellarne la struttura in modo affidabile.
2. Estrarre i principi fondamentali di calcolo utilizzati dal cervello replicandone solamente il comportamento, concentrandosi sui principi di calcolo che il cervello utilizza al fne di ripordurre un sistema artificiale in grado di replicarli.

Durante il corso ci concentreremo sul secondo approccio applicato al contesto dell'apprendimento supervisionato.

##Quando usarle?

Quando si hanno tanti input numerici e discreti e si vuole effettuare una classificazione o regressione.

I dati di input possono anche contenere del rumore e la forma della funzione target è totalmente sconosciuta.

Il risultato finale non deve essere compreso da un esperto umano, il funzionamento della rete è una black-box.

Tipicamente vengono utilizzate quando non ci sono conoscenze a priori nel dominio.

##Reti neurali artificiali

![](./immagini/l9-rete.png)

Il cervello umano è sostituito da circa 10<sup>10</sup> neuroni fortemente interconnessi tra loro (da 10<sup>4</sup> a 10<sup>5</sup> connessioni), il tempo di risposta di un neurone è di circa 0.001 secondi.

Considerando che per riconoscere il contenuto di una scena un unmano impiega circa 0.1 secondi, ne segue che il cervello umano sfrutta pesantemente il calcolo parallelo: infatti, in questo caso, non pul effettuare più di 100 calcoli seriali.

Questo funzionamento va in contrasto con quello attuale dei nostri processori, i quali ottenogno ottime prestazioni nelle operazioni seriali ma sono in difficoltà con il calcolo parallelo.

Una rete neurale artificiale è un sistema costituito da unità interconnesse che calclano funzioni numeriche, ci sono vari tipi di unità:

- le unità di input che rappresentano le variabili di ingresso;
- le unità di output che rappresentano le variabili di uscita;
- le unità nascoste che rappresentano le variabili interne che codificano (dopo l'apprendimento) le correlazioni tra le variabili di input relativamente al valore di output che si vuole generare.

Sulle connessioni tra le varie unità sono definiti dei pesi che vengono definiti dall'algoritmo di apprendimeno.

Ci sono due modi per replicare un neurone:

- Hard-threshold
- Sigmoidale

###Hard-threshold - iperpiano

![](./immagini/l9-threshold.png)

L'idea è quella di avere un vettore di input che rappresenta i nodi di ingresso da ognuno dei quali  arriva un segnale x<sub>i</sub>. A ogni segnale è associato un peso w<sub>i</sub> che lo amplifica, tutti questi pesi vengono definiti dall'algoritmo di apprendimento.

Il neurone è poi composto da altri due elementi: il primo che effettua una sommatoria, detta **net** di tutti i segnali d'ingresso moltiplicati per il loro peso, mentre il secondo utilizza il risultato del primo e calcola una funzione gradino, il cui output è 1 o -1 in base al segno di net.

Alcune precisazioni:

- Nella sommatoria iniziale gli ingressi vengono rappresentati da x<sub>1</sub> a x<sub>n</sub>, ognuno moltiplicato per il proprio peso. Tuttavia è presente anche un ingresso x<sub>0</sub> sempre fisso a 1, al quale viene associato il peso w<sub>0</sub>, questa componente rappresenta il bais induttivo.
- Possono essere usate altre funzioni gradino oltre a quella del segno.

Si può dimostrare che questo tipo di neurone definisce un iperpiano.
Questo perché la somamtoria a partire da *i=1* può essere vista come un *w<sup>T</sup>x +w<sub>0</sub>* ed concide con la definizione di iperpiano.

###Sigmoidale

![](./immagini/l9-sigmoidale.png)

Utilizza la stessa sommatoria *net* alla quale viene applicata la funzione σ.

> σ(z) = 1 / (1 + e<sup>-z</sup>)

La funzione è continua e compresa tra 0 e 1.

Il vantaggio fondamentale di σ è che si tratta di una funzione derivabile e quindi permette di utilizzare l'algoritmo di **back propagation**. Un algoritmo che permette di fare apprendimento all'indietro in grado di funzionare anche su reti composte da più livelli.

Un'altra caratteristica interessante di questa funzione è che la sua derivata può essere espressa come una funzione dei valori di input. 
Cioè:

> ∂σ / ∂z = σ(z)(1-σ(z))

Questa proprietà tornerà utile quando sarà applicato l'algortimo di back propagation.

Infine, il neurone sigmoidale può utilizza altre funzioni al posto di *1 / (1 + e<sup>-z</sup>)*, come la tangente iperbolica.

##Perceptron

È una rete neurale composta da un singolo neurone con Hard Threshold che viene utilizzata per rappresentare un iperpiano.

L'algoritmo di apprendimento per questa rete cerca dei valori per i vari pesi *w<sub>i</sub>* in modo da apprendere la funzione target.
Per apprendere i coefficenti corretti vengono utilizzati gli esempi del training set.

###Implementazione di funzioni booleane

Ad esempio Percepton può implementare l'operatore *or* con gli ingressi *y ϵ {0,1}<sup>n+1</sup>* (vettori rappresentanti stringhe binarie), si possono usare come pesi *w'<sub>0</sub> = -0.5* e *w'<sub>i</sub> = 1* per *i=1..n*.

In modo simile può essere implementato anche l'operatore *and* con *w'<sub>0</sub> = -n+0.5* e *w'<sub>i</sub> = 1* per *i = 1..n*.

Si può anche realizzare l'operatore *not* con una singola connessione e con un unico peso negativo.

Un problema che il perceptron non riesce a risolvere è la *xor*, questo perché si tratta di una funzione non linearmente separabili.

###Apprendimento di funzioni linearmente separabili

Si può far apprendere a Perceptron tutte le funzioni linearmente separabili con un algoritmo che è garantito che termini.

Tuttavia se la funzione da apprendere non è linearmente separabile l'algoritmo non converge.

Dato un insieme di apprendimento *Tr = {(x<sup>-</sup>,t)*, dove *t ϵ {-1,+1}}*.

1. Inizializza il vettore dei pesi *w* al vettore nullo (con tutte le componenti a 0, possono anche essere random ma piccole)
2. Ripeti finché non si raggiunge un punto fisso:
    1. Seleziona a caso uno delgi esempi di apprendimento *(x,t)*
    2. se _out = sign(w * x) ≠ t_ allora *w = w + (t-out)x*

Cioè per ogni esempio nel training set va a controllare il segno di del prodotto scalare tra *x* e i pesi, se questo non coincide con il valore di training è necessario adattare *w* in modo che anche per *x* venga calcolato il valore corretto.

In questo modo si riesce ad apprendere una funzione che per costruzione non commette nessun errore nel training set.

Piccola precisazione, *x* e *w* sono dei vettori.