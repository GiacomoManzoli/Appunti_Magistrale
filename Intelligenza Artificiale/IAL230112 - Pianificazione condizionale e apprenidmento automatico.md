#Lezione 23 - Pianficiazione condizionale e cenni di Apprendimento automatico

Per vari motivi può esserci un **fallimento**, cioè le precondizioni del resto del piano non sono più soddisfatte, ad esempio a causa delle azioni di un altro agente.
L'agente quindi arriva in un punto in cui il resto del piano non può essere eseguito.

È quindi necessario andare a monitare costantemente lo stato dell'ambienete e nel caso di fallimento riprendere l'algoritmo POP a partire dallo stato corrente.

##IPEM - Integrate Plannin Execution e Monitoring

Viene aggiornato continuamente lo stato *Start* man mano che vengono eseguite le azioni, in questo modo si tiene traccia dei cambiamenti subiti dal mondo. 

Quandi l'algoritmo si accorge che dallo stato corrente non riesce ad andare avanti perché ci sono delle condizioni non valide e quindi ripianifica a partire dallo stato corrente.

Questo comportamento cicla fino al successo ed *emerge* dalla interazione tra agente del tipo monitorizza/ripianfica e ambiente non cooperativo.

Ad esempio l'ambiente può invalidare alcune delle precondizioni più volte, in questo caso l'agente deve controllare di non ciclare all'infinito.

##Cenni di Apprendimento Automatico

Per risolvere alcuni problemi non è possibile applicare un approccio algoritmico tradizionale, per vari motivi, come l'impossibilità di formalizare il problema, il rumore sui dati o l'alta complessità nel formulare una soluzione. Sennò ci sono dei casi in cui si riesce a formalizzare un problema ma non si ha idea di come risolverlo.

Per poter utilizzare questo approccio sono necessari:

- **Dati**: più ce ne sono meglio è, possono essere ottenuti in blocco, una volta per tutte o man man interagendo con l'ambiente.
- **Conoscenza**: avere informazioni sul dominio applicativo permette di ottenere algoritmi più efficenti, anche in caso di informazioni incomplete o imprecise.

Si vuole quindi utilizzare i dati per ottenere una nuova conosscenze o raffinare quella di cui si dispone.

Ci sono 3 paradigmi principali di apprendimento:

- Supervisionato
- Non supervisionato
- Con rinforzo

###Apprendimento supervisionato

Dato un insieme di esempi pre-classificati {*(x, f(x))*}, apprendere una descrizione generale che incapsula l'informazione contenuta negli esempi, cioè per trovare delle regole che sono valide su tutto il dominio di ingresso.

La descrizione così ottenuta deve poter poi essere utilizzata per fare predizione su nuovi dati del dominio d'ingresso.

Il supervisionato deriva dal fatto che ci sia un esperto che supervisioni l'algortimo e cioè che fornisca il valore della funzione target per alcuni esempi.

###Apprendimento non supervisionato

Dato un insieme di esempi *Tr = {x}* si vogliono estrarre delle regolarità e o pattern sui dati che siano valide per tutti gli elementi del dominio di ingresso.

Non esiste nessun supervisiore che fornisce una classificazione dei dati, ma si cerca di raggruppare tra loro dei dati simili (*clustering*) e di scoprire nuove regole.

Un esempio di questa applicazione è il data mining su database strutturati come quelli medici o commerciali.

###Apprendimento con Rinforzo

In questo caso è presente un agente che opera all'interno di un ambiente. L'agente si trova in un determinato stato *s* e può eseguire una certa azione *a* tra tutte le azioni possibili per il determianto stato. Quando l'agente esegue l'azione, l'ambiente fornisce all'agente lo stato successivo e una ricompesta *r* che può essere posivita, negativa o neutra.

Lo scopo dell'agente è quello di massimizzare una funzione delle ricompense.

##Elementi fondamentali dell'apprendimento supervisionato

L'elemetno principale sono i dati, senza i dati non è possibile fare apprendimento.

Serve poi uno spazio delle ipotesi *H*, cioè l'insime delle funzioni che possono essere realizzate dal sistema di apprendimento. Si assume quindi che la funzione da apprendere *f* possa essere rappresentata da un ipotesi *h* presente in *H*.

Ma come si fa ad avere la certezza che *H* contenga *h*? In questo caso torna utile la conoscenza a priori, avere delle informazioni riguardo *f* permette di scegliere un'insieme *H* più adeguato.

L'algoritmo di apprendimento può essere quindi visto come un algoritmo di ricerca nello spazio delle ipotesi *H*.

Da notare che *H* non può coincidere con l'insieme di tutte le funzioni possibili e allo stesso tempo avere una ricerca esaustiva. In questo caso l'apprendimento è inutile dal momento che la ricerca su uno spazio così grande è troppo onerosa, inoltre in uno spazio infinito di funzioni c'è sempre un numero infinito di funzioni che approssimano i dati di apprendimento.

Si parla quindi di **bias induttivo**, cioè di vincoli che si vanno a porre sulla rappresentazione delle funzioni o sulla strategia di ricerca. Se si hanno delle conoscenze a priori è possibile avere un bias induttivo molto forte e corretto, limitando così lo spazio di ricerca senza escludere la soluzione.

###Tipi di algoritmi

Algoritmi **eager**, sono algoritmi che raccolgono tutti i dati di apprendimento e lavorano molto sull'apprendimento della funzione, richiedono quindi tanto tempo per trovare un ipotesi *h*, però effettuano la predizione in poco tempo.

Mentre gli algoritmi **lazy**, ricercano un'ipotesi on-demand, cioè i dati di apprendimento vengono valutati solamente quando viene richiesta una predizione.

***seguono degli esempi di spazi delle ipotesi uguali a quelli visti ad apprendimento automatico***






