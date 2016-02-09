#Lezione 24 - Apprendimento Automatico 2

##Apprendimento di Concetti

Un **concetto** su uno spazio delle istanze *X* è definito come una funzione booleana su *X*.
Ad esempio un concetto *c* su uno spazio delle istanze *X* è definito come una coppia *(x,c(x))*, dove *x* è un esempio nello spazio delle istanze.

Si dice che una funzione *h* **soddisfa** *x* se *h(x) = 1*, inoltre si dice **consistente** se *h(x) = c(x)*. Se *h* è consistente con tutti gli esempi di un training set, allora si dice che *h* è consistente con  il training set ovvero c'è un errore empirico nullo.

Date due ipotesi *hi* e hj definte su X, si dice che hi è più generale o equivalente a hj se per ogni istanza di X, hj(x) = 1 ==> hi(x) = 1. (hi >=g hj)
Può essere che due ipotesi non siano paragonabili.

###Find-S

Algoritmo per trovare l'ipotesi più specifica e consistente con l'insieme di apprendimento.

Si assume quindi che la funzione che si vuole apprendere sia contenuta nello spazio delle ipotesi.

Assumendo anche che lo spazio delle ipotesi sia quello dei letterali positivi:

1. Viene inizializzata l'ipotesi corrente *h* con l'ipotesi più specifica, ovvero la congiunzione di tutti i letterali presenti nello spazio delle ipotesi, sia affermati che negati, questa ipotesi è sempre falsa.
2. Per ogni istanza positiva di apprendimento *(x,true)*, si rimuove da *h* ogni letterale affermato o negato che non è soddisfatto da *x*.
3. Una volta terminate gli esempi si ritorna la versione corrente di *h*.

Il passo 2 cerca di effettuare una **generalizzazione minima** dell'ipotesi.

Il fatto che l'ipotesi sia una congiunzione di letterali affermati o negati rappresenta il bias induttivo di tipo rappresentativo.
In questo caso l'effetto del bias induttivo si vede dopo aver esaminato 3 esempi, perché non si riesce a trovare una generalizzazione minima che riesce a classificare come positivi esattamente 3 esempi distinti.

Find-S è quindi una schema generale di algortimo che si può applicare in vari spazi delle istanze e delle ipotesi, sempre sotto l'assunzione che la funzione da apprendere sia rappresentabile nello spazio delle ipotesi.
Se questo non è garatito allora non si riesce a trovare.

Anche la scelta di ritornare l'ipotesi più specifica fa parte del bias induttivo, dal momento che non c'è un valido motivo per preferire quella più specifica rispetto a quella più generale.
Ci sono altri algortimi come **canditate elimination** che per diminuire questo bias ritorna un insieme di ipotesi consistenti con il training set, tale insieme prende il nome di **version space**. Un tipico utilizzo di un insieme delle ipotesi e quello di utilizzarne più di una per fornire, oltre alla predizione anche un livello di confidenza.

##Utilizzo dei dati

Tipicamente i dati disponibili vengono divisi in due insimi, uno che costituisce il training set che viene utilizzato per fare apprendimento e che contiene circa il 70% dei dati.
Il restante 30% viene utilizzato come **test set** per valutare l'ipotesi appresa.

Se l'algortimo di apprendimento prevede degli **iper-parametri**, il sotto-insieme di training set viene diviso ulteriormente, in modo da ottenere anche il **validation set** che viene utilizzato per provare più valori per gli iper-parametri, in modo da scegliere quelli migliori.

##Errori

L'**errore ideale** *error_D(h)* di un'ìpotesi *h* rispetto ad un concetto *c* e la distribuzione di probabilità *D*, ovvero la probabilità di osservare l'ingresso *x ϵ X*, è la probabilità che *h* classifichi erroneamente un input selezionato a caso secondo *D*.

> error_D(h) = P<sub>[x ϵ D]</sub>[c(x) ≠ h(x)]

L'errore che un'ipotesi commette classificando gli esempi del training set prende il nome di **errore empirico**. L'idea teorica è che se il training set è molto grande l'errore empirico converge all'errore ideale.

Possono però verificarsi dei casi in cui c'è un'ipotesi che commette degli errori sul training set, ma nello spazio completo si comporta correttamente, come può esserci un'ipotesi che non commette errore sul training set ma che commette tanti errori nello spazio completo.

Per questo viene utilizzato il validation set per cercare di trovare l'ipotesi migliore. 

Quando un'ipotesi è troppo specifica per un insieme di apprendimento ma ha un errore ideale troppo elevato, si dice che l'ipotesi è **overfit**.
Formalmente: un'ipotesi *h ϵ H* è overfit su *Tr* se *∃h' ϵ H* tale che *error<sub>Tr</sub>(h) < error<sub>Tr</sub>(h')* 


