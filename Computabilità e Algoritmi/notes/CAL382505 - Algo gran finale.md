## Una prima versione dell'algoritmo randomizzato

Per ciascuno degli *n* processori sceglie una destionazione intermedia sigma_i in modo casuale e indipendente.

Usa l'algoritmo deterministico bit a bit per instratare ogni pacchetto p_i dal processore *i* al processore *sigma_i* e poi usa lo stesso algoritmo per far transitare il pacchetto da *sigma_i* a *d_i*.

Nelle code di attesa viene data la precedenza ai pacchetti che deveono ancora arrivare alla destinazione intermedia.

Assumiamo che la nostra rete sia un ipercubo, ovvero, rappresentando in bit il numero del nodo, c'è un canale tra due nodi solo se i due nodi differiscono di un bit. Il collegamento può essere considerato bi-direzionale.

Un ipercubo di dimensione *k* ha quindi n = 2^k processori e *k \* n* canali di comunicazione.

Assumendo di avere k=4 e di dover mandare un pacchetto da i = 1011 a di = 1100. Per trovare un cammino si deve cercare di rendere simili i codici binari, ovvero si passa prima per 1111 e 1101, per arrivare in fine a 1100.

Per gestire la coda dei canali di comunicazione si ha che i pacchetti della prima fase, quelli che vanno dalla sorgente alla tappa intermedia hanno la priorità su quelli che vanno dalla fase intermedia alla destinazione.

Consideriamo solamente il tempo necessario per la prima fase: la durata è data dal numero *m* di bit diversi che ci sono tra la sorgente e la destionazione intermedia più il numero di passi in cui il pacchetto rimane in coda.
Un altro pacchetto può far ritardare un il nostro pacchetto di interesse ha almeno un canale di comunicazione in comune.

(Lemma 4.2) Consideriamo i due pacchetti *pi* e *pj*, che partono ris(pettivamente da *i* e *j*, cercando di arrivare a *sigmai* e *sigmaj*.

... vedi dispense ...

Se s < t finché non arrivo ad s i due pacchetti viaggiano su progessori distinti, tra s+1 e t-1 viaggiano sugli stessi canali e dopo t tornano a viaggare su percorsi distinti.

Se s > t non si incrociano mai.

Si ha quindi che il numero di preocessori in comune è dato da t - s - 1. I canali in comune sono quindi t-s-2.

Supponiamo che *pi* segua il percorso *rho_i = e1, e2, ..., em* con *m leq k*. Questo pacchetto può essere rallentato solamente da un pacchetto che ha un canale in comune.

Per valutare i ritardi, l'idea è quella di attribuire ..., ovvero di andare a maggiorare il ritardo considerando i pacchetti che hanno almeno un canale in comune.

Sipponeiamo ce il nostro pacchetto *i* faccia:

```
i --> e1 --> e2 --> ... --> eh-1 * --> eh 
```

e che all'istante *t* il pacchetto si trovi in coda nel nodo tra *eh-1* e *eh*.

Ovvero c'è un pacchetto *p(t,h)* che transita sul canale *h* mentre il nostro pacchetto è in coda.

All'istante *t+1*, il pacchetto rompi scatole si troverà nel processore successivo. Può quindi essere arrivato a destinazione, proseguire su un canale diverso da quello che interessa a noi oppure proseguire sul nostro cammino.

In ogni caso, il pacchetto rompi scatole non creerà più ritardi al nostro pacchetto, perché quando percorre *eh+1* il nostro o è ancora in coda o è in *eh*. Se il paccehtto rompi scatole resta invece fermo in coda e deve proseguire sulla nostra strada, vuol dire che all'istante *t+2* c'è un'altro pacchetto *p(t+1, h+1)* che è passato sul canale al posto suo. In questo caso si può associare il ritardo del nostro pacchetto a *p(t+1, h+1)*.

La storia si ripete anche per gli istanti successivi, ma prima o poi si arriverà ad una fine, perché il cammino è lungo *k*.

Quindi per ogni ritardo *l = 0, ..., r-1* associo un paccche il cui cammino ha almeno un canale in comune.

Se *pi* impiega tempo *t* con un ritardo totale di che è uguale a *r = t -m*, allora devono esserci almento altri *r* pacchetti con un canale in comune.

Siano due pacchetti *pi* e *pj* e *Xij* la variabile aletoria che vale 1 se i due pacchetti hanno un canale in comune e 0 altrimenti.

Così facendo si ha che il ritardo *ri* del pacchetto *i* è dato da 

```
r_i \leq \sum\limits_{j \neq i} X_{i,j} < \sum\limits_{j} X_{i,j} \leq \sum\limits_{i = 1}^{n} P(e_i)
```

dove *p(ei)* è il numero totale di pacchetti che passano per il canale *ei*.

Si ha quindi che 

```
E[r_i] \leq \sum\limits_{j \neq i} E[X_{i,j}] \leq \sum\limits_{j} E[X_{i,j}] \leq \sum\limits_{i = 1}^{n} E[P(e_i)]
```

Dal momento che le destinazioni intermedie sono scelte a caso, si ha che il valore atteso di *P(ei)* non dipende dal canale, dato che l'ipercubo è perfettamente simmetrico.

Il valore atteso della lunghezza di un cammino generico è E[m] = k/2. COnsiderando che ci sono k2^k canali e che i canali percorsi sono k/2 2^k, si ha che il valore atteso dei pacchetti che passano su un canale qualsiasi è m/2 che è minore o uguale di k/2.

Quindi il ritardo medio di un singolo pacchettè minore o uguale di k/2.

Consideriamo la variabile casuale

```
X = \sum\limits_{j \neq i} X_{i,j}
```

la probabilita che X_{i,j} sia uguale a 1 è sicuramente minore di 1 e la media *mu* =E[X] è minore o uguale di k/2 per quanto detto prima.

Sotto queste ipotesi è possibile applicare il limite di Chernov:

```
Pr[X > (1 + \delta)\frac{k}{2}] \leq \Big[ \frac{e^h}{(1+\delta)^{1+\delta}} \big]^{k/2}
```

Se prediamo *delta = 7*, abbiamo che

```
Pr[X > 4k] \leq  [\frac{e^7}{8^8}]^{k/2} < 2^{-6k}
```

ovvero la provabilità che un pacchetto impieghi più di `4k` per arrivare a destinazione è minore di 2^{-6k}.

Siccome i pacchetti sono *n*, la probabilità che almeno uno arrivi dopo 4k è mione o uguale di 2^{-5k} = 1/32^k.

Tutto questo riguarda la prima fase.

La seconda fase può essere analizzata allo stesso modo della prima fase, la differenza è che nella prima fase i pacchetti partono contemporaneamente mentre nella seconda, se non viene aspettato il termine della prima fase, la partenza della seconda fase avviene in momenti diversi.

In ogni caso, la maggiorazione dei ritardi della prima fase è stata fatta senza tenere conto della partenza dei pacchetti. Se le partenze sono diverse non ci sarà un'interferenza ma la maggiorazione continua a valere.

Si può quindi dire che anche nella seconda fase valgono le stesse provabilità.

Tirando le somme, il tempo richeido dalla prima fase è minore o uguale di 5k e anche quello della seconda fase, con probabilità 1/32^k. Ovvero i pacchetti saranno tutti a destinazione in tempo 10k con probabilità maggiore o uguale di 1- 1/32^k.

Se ad esempio *k = 32*, si ha tempo 320 con probabilità maggiore o uguale di 1 - 1/32^32, ovvero con una certezza quasi assoluta.
Mentre Valiant dava un tempo massimo di 11585, che rappresenta un caso pessimo ma probabile, mentre con questo nuovo algoritmo si ha un caso pessimo poco probabile e che è di gran lunga migliore.


