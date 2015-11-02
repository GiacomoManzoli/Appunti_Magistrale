#Lezione 12 - Dati a runtime 2

L'utilizzo di funzioni *tail recursive* sono più semplici da gestire dal punto di vista del compilatore, questo perché al termine della chiamata ricorsiva non vengono effettuate altre operazioni.

Grazie a questo fatto è possibile utilizzare un solo record di attivazione per tutte le chiamate ricorsive. Questo record ha come indirizzo di ritorno, l'indirizzo dell'istruzione dopo la prima chiamata e il valore dei parametri viene via via aggiornato, anziché andare ad aggiungere un nuovo blocco.

##Variabili globali nel corpo delle funzioni

Per la gestione delle variabili globali possono essere utilizzate due regole:

- **static scope**: il compilatore va a cercare la variabile nei blocchi che racchiudono la definizione delle funzione;
- **dynamic scope**: il compilatore va a cercare la variabile nei blocchi che racchiudono l'invocazione della funzione.

In ogni caso si cerca sempre nel blocco più vicino.

Ovviamente l'utilizzo del dynamic scope comporta che la stessa variabile globale può essere associata a valori diversi, dal momento che il valore dipende dal contesto di esecuzione della funzione.

Per la gestione delle eccezioni è preferibile avere la gestione dello scope dinamica in modo da utilizzare sempre le infomrazioni "di contesto" delle eccezioni piuttosto che quelle statiche presenti dove è stata definita l'eccezione.

L'implementazione dello scope dinamico è semplice, basta avere a disposizione il control link dei vari record di attivazione, in modo da poter risalire tra i record di attivazione per cercare le variabili.

Lo static scope invece è più complesso da implementare, è infatti necessario andare ad aggiungere un nuovo puntantore **access link** (detto anche link statico) che permette di arrivare direttamente al blocco corrispondende alla definizione della funzione che è stata invocata. Una volta raggiunto il blocco, si risale lo stack utilizzando il control link per trovare la prima occorrenza della variabile globale.

Per chiarezza, anche la definizione di una funzione costituisce un blocco, così come la definizione di una variabile.

##Chiusure

Le funzioni vengono considerate come variabili globali, con la differenza che non si sa che valore sia associato alla variabile.

Infatti, che valore ha una funzione?

Il valore di una funzione prende il nome di **chiusura** e contiene tutte le informazioni necessarie per preparare l'esecuzione della funzione.

Tra queste ci sono un puntatore per il record di attivazione in cui è definita la funzione e un puntatore al codice compilato della funzione.

Ci sono anche altri valori come la dimensione del record di attivazione.

