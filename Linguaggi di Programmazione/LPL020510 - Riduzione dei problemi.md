##LP Lezione 2

##Riduzione dei problemi

Siano R e R' due problemi (_funzioni che vengono calcolate con un SI/NO_) con R che è NON decidibile e R' di cui non si sa nulla.

Per ottenere delle informazioni su R' si __riduce R a R'__.

Cioè per ogni istanza I di R si cerca di costruire un istanza I' di R' tale che

> R(I) = SI se e solo se R'(I') = SI
> R(I) = NO se e solo se R'(I') = NO

###HALT_PEROGNI (HALT_V)

Data una macchina di turing P:

> HALT_V(P) = SI --> Se per ogni stringa x, P(x) termina
> 				 NO --> se per qualche stringa x, P(x) non termina

Questo problema è indecidibile e si dimostra per riduzione, riducendo HALT ad HALT_V (_HALT è la decidibilità della terminazione di una macchina di turing_).

> HALT 	   HALT_V
> <P, x> --> P_x

Bisogna quindi riuiscre a trasformare <P, x> in P_x in modo che i risultati dei due problemi coincidano.

L'idea è quella di trovare una macchina di turing che si comporta, con qualsiasi input, come si comporta P(x).

Questa macchina è quindi definita come:

> P_x = P' : P

Dove P' è un programma che pulisce cancella l'input del nastro di P e lo sostiuisce con la stringa x.

In questo modo è facile vedere che

> HALT(<P,x>) = SI se e solo se HALT_V(P_x) = SI

###Riduzione della complessità

Lo stesso meccanismo di riduzione di un problema per calcolarne la calcolabilità vale anche per la complessità (non di un algoritmo, ma del problema in se).

Se sappiamo che P ha complessità G(n) e sospettiamo che P' abbia complessità __almeno__ G(n), si può trovare un algoritmo che riduce P in P' con una complessità c(n), tale che c(n) sia irrisoria rispetto a G(n) altrimenti tutta la baracca non avrebbe senso.

Se si riesce a trovare questo algoritmo, allora decidere P' costa F(n) con F(n) >= G(n).

Questo perché, altrimenti, potremmo decidere P in c(n) + F(n) < G(n).

##Perché la decidibilità è importante?

Perché farebbe comodo riuscire a sapere se un progrmma scritto nei linguaggi di programmazione moderni termina o meno, senza andarlo ad eseguire.

A livello pratico tutte le proprietà interessanti dei linguaggi di programmazione non sono decidibili.

> Cosideriamo una proprità k:
> P = P' : P'' con P' che rispetta k e P'' che viola k.
> P viola k se e solo se P' termina e quindi decidere se P viola k significa decidere se P' termina, con P' qualsiasi.

Il tutto questo per dire che durante la compilazione di un programma non possiamo sapere come questo si comporterà durante l'esecuzione.

Possiamo però approsimarne alcune proprietà.

Con l'analisi statica risciamo a dire e ad avere la sicurezza che in una determinata parte del programma non ci siano errori.

###Test a runtime vs compile time

L'analisi di un programma può essere fatta anche a runtime ma questo risulta meno efficiente.

> if TEST then OK else ERRORE

Il compilatore dovrebbe rifiutarsi di compilare il programma perché non può decidere se c'è l'errore o meno (approccio pessimistico).

A runtime il test potrebbe essere sempre true e l'errore potrebbe non essere mai rilevato (situazione pericolosa).

Ha quindi più senso fare dei controlli a compile time.

Nel caso dei tipi questo controllo viene fatto sia a runtime che a compile time.

Si cerca comunque di fare il massimo possibile a compile time dal momento che è più efficiente, però alcune cose, come il bound-check di un array, possono essere fatte solo a runtime.