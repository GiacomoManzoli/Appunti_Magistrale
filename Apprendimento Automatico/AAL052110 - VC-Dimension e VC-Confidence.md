#Lezione 5

##Spazio delle ipotesi

Considerando gli iperpiani in R<sup>2</sup>, perciò lo spazio delle istanze è dato dai punti nel piano X = {y | y € R<sup>2</sup>}.

Lo spazio delle ipotesi è dato della dicotomie indotte da iperpiani in R<sup>2</sup>.

> H = {f<sub>(w,b)</sub>(y) | f<sub>(w,b)</sub>(y) = sign(w * y + b), w € R<sup>2</sup>, b € R}

Prendo un iperpiano su R<sup>2</sup> il che vuol dire che l'iperpiano diventa un retta. Questa retta mi divide R<sup>2</sup> in due parti, da una parte l'ipotesi vale 1, dall'altra -1.

Altro esempio, si può considerere come spazio delle ipotesi le dicotomie indotte da i disci in R<sup>2</sup> e centrati nell'origine.

> H = {f<sub>b</sub>(y) | f<sub>b</sub>(y) = sign(||y||<sup>2</sup> - b), w € R<sup>2</sup>, b € R}

Il che vuol dire che all'interno del disco le ipotesi valgono -1 mentre al di fuori valgono 1.

**ipotesi più specifica**: ipotesi più stretta, consistente con i dati, nell'esempio del disco è il disco più stretto in grado di contenere tutti i punti negativi.

**ipotesi più generale**: quella più grande, consistente con i dati, sempre nell'esempio del disco, è quello del disco più grande possibile e che non contiene punti positivi.

###Congiunzione di m letterali positive

Lo spazio delle istanze questa volta è dato da tutte le stringhe di m bits X = {s | s € {0,1}<sup>m</sup>}

Lo spazio delle ipotesi è dato da tutte le sentenze logiche che riguardano i letterali positivi l<sub>1</sub>,l<sub>2</sub>,...,l<sub>m</sub> (l<sub>i</sub> è vero se l'i-esimo bit è 1) e che contengono solo l'operatore `and`.

> H = { f<sub>{i<sub>1</sub>,...,i<sub>j</sub>}</sub>(s) | f<sub>{i<sub>1</sub>,...,i<sub>j</sub>}</sub> (s) equivale a l<sub>i<sub>1</sub></sub> and l<sub>i<sub>2</sub></sub> and ... and <sub>i<sub>j</sub></sub>, {i<sub>1</sub>...i<sub>j</sub>} sottoinsieme di {1..m}}

##Misurare la complessità dello spazio delle ipotesi

**shattering**: (frammentazione), dato S sottoinsieme dello spazio delle istanze, si dice che S è frammentato dallo spazio delle ipotesi H se:

> perogni S' ⊆ S, eiste h € H, tale che per ogni x in S, h(x) = 1 se e solo se x appartiene a S'.

Cioè H realizza tutte le possibili dicotomie di S.

H frammenta un certo insieme S se è possibile trovare un iperpiano che raccoglie tutti i punti dell'insieme S (???).

Ovvero per tutte le dicotomie di S esiste un iperpiano che riesce a realizzarle.

**VC (Vapnik-Chervonenkis) Dimension**: è la dimensione di uno spazio delle ipotesi H definito su uno spadio delle istanze X è data dalla cardinalità del sottoinsieme più grande frammentato da H.

> VC(H) = max<sub>S ⊆ X</sub>|S| : H frammenta S
> VC(H) = ∞ se S non è limitato

**Esempio**:

Spazio delle ipotesi: iperpiano su R<sup>2</sup>.

Se nello spazio delle istanze ho 2 punti, questo viene frammentato da H.

Se nello spazio delle istanze ho 3 punti, riesco comunque a realizzare tutte le dicotomie.

Se nello spazio delle istanze ho 4 punti qualsiasi non si riesce a trovare un iperpiano che realizza la dicotonomia, quindi VC(H) = 3.

Prendendo uno spazio delle ipotesi di cardinalità finita, allora

> VC(H) ≤ log<sub>2</sub>(|H|)

Questo perché per ogni S frammentata da H, abbiamo |H| > = 2<sup>|S|</sup> (cioè per ogni dicotomia in S esite un ipotesi in H che la realizza), ovvero devono essere disponibili in H tante ipotesi quanti sono le dicotomie in H.

Scegliendo un S tale che |S| = VC(H), si ottiene |H| >= 2<sup>VC(H)</sup>, prendendo il logaritmo si trova quello che si stava cercando, ovvero VC(H) <= log<sub>2</sub>(|H|).

##Bound sull'errore di generalizzazione

Considerando un problema di apprendimento binario, con: 

Training set S={(x<sub>i</sub>,y<sub>i</sub>)}<sub>i=1...N</sub>

Spazio delle ipotesi H={h<sub>𝜃</sub>(x)}

Algoritmo di apprendimento L che restituisce l'ipotesei h<sub>𝜃*</sub>(x) che minimizza l'errore empirico su S, errore<sub>S</sub>(h<sub>𝜃</sub>(x)).

È possibile dericare un bound (limite superiore) all'errore ideale o errore di generalizzazione, valido con probabilità (1 - δ) con δ piccolo a piacere:

> errore<sub>D</sub>(h<sub>𝜃</sub>(x)) ≤ errore<sub>S</sub>(h<sub>𝜃</sub>(x)) + g(N, VC(H), δ)

Il primo termine (A) = errore<sub>S</sub>(h<sub>𝜃</sub>(x)) dipende dall'ipotesi restituita dall'algoritmo di apprendimento L.

Il secondo termine (B) = g(N, VC(H), δ) non dipende da L, ma dal numero di esempi di training utilizzati (inversamente proporzionale), dalla VC dimension (direttamente proporzionale) e dalla confidenza, ovvero dal termine δ.

Il termine g(N, VC(H), δ) viene anche chiamato **VC-confidence** e risulta essere monotono rispetto al rapporto VC(H)/N.

##Structural Risk Minimization (SRM)

Questo approccio proposto da Vapnik tenta di trovare un compromesso tra i due termini (A) e (B).

Si considerano spazi delle ipotesi sempre più piccoli H<sub>1</sub> ⊆ H<sub>2</sub> ⊆ ... ⊆ H<sub>n</sub> tali che VC(H<sub>1</sub>) ≤ VC(H<sub>2</sub>) ≤ ... ≤ VC(H<sub>n</sub>)

Si seleziona l'ipotesi H<sub>i</sub> che ha il valore del bound sull'errore di generalizzazione più piccolo.