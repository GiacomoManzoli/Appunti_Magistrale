#Lezione 19 - Sistemi di raccomandazione

Quando Facebook suggerisce gli amici, quando Amazon suggerisce dei prodotti e quando Youtube suggerisce dei video, viene utilizzato un sistema di raccomandazione.

##Organizzazione di un RS

C'è un sistema di **esplict feedback** che l'utente esprime in modo quantitativo:

- Valutazione da 1 a 5 o con stelle
- Un ordinamento dal preferito al meno favorito
- Preferenze su coppie di oggetti

Tutte queste valutazione sono intrusive e richiedono che l'interazione dell'utente.

Il sistema può sennò basarsi su **implicit feedback**:

- elenco dei prodotti che l'utente ha visto/comprato
- tempo di permanenza in una data pagina del sito
- rete sociale dell'utente

In questo caso non c'è un responso esplicito delle preferenze dell'utente ma vengono usati dei valori impliciti, ad esempio si può presupporre che se l'utente sta molto in una pagina web, quella gli interessa.
Il vantaggio del feedback implicito è che non viene richiesto direttamente all'utente, ma viene calcolato.

## Approcci per la raccomandazione

Ci sono 2 approcci principali per questi sistemi:

- **Content base**: dato un utente sul quale si vuole fare predizione e si conosce già il suo storico (di acquisti) gli si va a proporre dei prodotti simili secondo qualche categoria (autore, genere, ecc.).
- **Collavorative filtering**: si va a raccomandare agli utente gli più simili a quelli che piaccinono ad altri utenti simili a lui. L'idea è che se un item piace a degli utenti simili all'utente target, è più probabile che piaccia anche al target. La similarità tiene conto delle interazioni tra utenti e item.
    - Similarità item-item: due oggetti sono simili se tendono ad ottenere lo stesso rate da parte degli utenti
    - Similarità user-user: due utenti sono simili se tendo a dare lo stesso rate ad item simili.
    - Questo approccio non tiene conto delle caratteristiche degli oggetti, ma solo delle preferenze degli utenti.

Il content base risulta migliore quando c'è poco storico (**cold start problem**), ovvero quando ho troppo poche informazioni relative alle interazioni tra l'utente e gli oggetti.

Il collaborative filtering va di gran lunga meglio del content base quando le informazioni implicite contenute sulle interazioni tra l'utente e gli oggetti diventa prevalente rispetto alle informazioni sugli oggetti.
Questo perché permette di scoprire nuovi pattern molto più potenti rispetto a quelli che si possono definire sulle caratteristiche degli oggetti (ad esempio: suggerire canzoni dello stesso artista).

## Rating Matrix

Matrice che ha come righe gli utenti e come colonne i vari item.
Le celle della matrice contengono la valutazione dell'utente per il dato item.

Nei casi reali queste matrici sono molto sparse, tipicamente 0.1% dei valori presenti.

C'è poi un'altra sfiga, l'**effetto long tail**: per pochi utenti saranno presenti tanti rate e per pochi prodotti ci saranno tanti rate. Ovvero ci sono poche righe che hanno tanti elementi e tante righe che hanno pochi elementi. Lo stesso vale anche per le colonne.

## Problemi di predizione

Ci sono due problemi tipici:

- **Rate prediction**: si vuole predirre il rate per un item che non è stato valutato (tipico del rate esplicito).
- **Item top-n recommendation**: ordinamento degli item in funzione del gradimento che l'utente potrebbe avere (tipo del rate implicito).

Un esempio del secondo problema è **Million Song Dataset**, una sfida di kaggle che consistenva nel predirre quali canzoni avrebbe ascoltato degli utenti, avendo a disposizione lo storico degli ascolti di un gran numero di utenti e metà dello storico degli utenti per i queli si vuole fare la predizione.

### Metodi per Collaborative filtering

- **Rate Prediction** (problema di regressione): Matrix Factorization, ovvero si apprende una rappresentazione per gli utenti e per gli items in modo che il loro prodotto scalare approssimi i rates presenti.

> R' = W V
> 
> - R' è la matrice approssimata
> - W è una matrice NumeroUtenti x m
> - V è una matrice m x NumeroItem

- **Top-N recomendation** (problema di ranking): Matrix Factorization su preferenze, ovvero dato un utente si vuole stimare come l'utente valuterebbe gli item per i quali non l'ha ancora espressa. Gli item vengono quindi visti come gli esempi e gli si vuole dare una classe (l'utente) e li si vuole ordinare in base a quanto quella classificazione è probabile.
C'è un problema con il trattamento dei dati mancanti, perché la mancanza di un rating da parte dell'utente non deve essere interpretata come negativa, ma come ignoranza.
Il problema è quindi sbilanciato dal momento che non si hanno informazioni riguardo a che cosa non piace all'utente.

## Valutazione dei RS

Nel caso del rating esplicito si può utilizzare **RMSE** (root mean square error), lo scarto quadratico medio degli errori commessi dall'approssimazione.
Si tratta della misura più popolare per questi problemi.

Nel caso di top-N ci sono:

- **AUC** (Area Under ROC curve): propozione di coppie di items correttamente ordinate. Ovvero per ogni coppia di item controllo quanti sono ordinati male, proporzionati sul numero di confronto. Il caso ottimo ha AUC uguale a 1. Questa misura viene calcolata su tutto l'ordinamento.
- **prec@n**: precisione ottenuta sui primi *n* item ordinati, una specie di AUC limitato ai primi *n* elementi.

## Collaborative filtering (la matematica)

###MatrixFactorization e regressione

> r_ui = x_u<sup>T</sup>y_i

L'algorimto di apprendimento tenta quindi di ottimizzare x e y in modo da minimizzare l'errore al quadrato sommato alla norma al quadrato di xu o yu.

*formulone dalle slide*

Il problema di minimizzazione non è convesso, quindi o xu o yi deve essere fissato.

L'approccio tipico è quello di inizializzare a caso yi e fissarlo, per poi minimizzare su xu, una volta raggiunto il minimo, si fissa xu e si minimizza per yi, e via così finché non si raggiunge la precisione desiderata.

###Neirest Neightbors based CF

Per stimare il rate dell'utente *u* si fa la media pesata dei rate dati dagli utenti che sono più simili all'utente *u*.
C'è anche il reciproco per gli item.

*formulona dalle slide*

## Similarità tra utenti e items

*altre formulone dalla slide*

La misura che si usa di più è la **similirtà coseno** (prima formula), dove per coseno si intende il coseno definito tra due vettori.

L'idea è di prendere un vettore per ogni utente di lunghezza pari alla cardinalità dell'insieme degli item e di mettere a 1 tutti gli elementi  del vettore che corrispondo ad un item che è stato valutato.

In questo modo, facendo il prodotto scalare tra due vettori utenti, il risultato è il numero di elementi in comunque, in questo caso quanti item sono stati valutati dai due utenti.
Mentre facendo la radice della norma di ...

Le formule delle slide ragionano ad insiemi, quanto detto sopra e fatto alla lavagna è espresso in vettori, il punto è che sono la stessa cosa.

Lo stesso ragionamento può essere fatto per gli item in funzione degli utenti.

## Link prediction

Altro argomento correlato ai RS.

Si ha a disposizione un grafo, con tutti i nodi noti e alcuni archi, si vuole riuscre a predirre se ci saranno dei nuovi archi tra questi nodi in base alla struttura nota del grafo.

Tipicamente questo problema viene rimappato su un problema di ranking/classificazione.

Ogni possibile arco può essere rappresentato come un insieme di feature che possono essere usate per fare predizione con:

- Common Neighbours
- Jacacard o altre misure di correlazione
- Analisi dei path esistenti tra due nodi (come il PageRank)
- ecc.

La differenza con un problema di raccomanazione sta nel come vengono calcolate le feature.




