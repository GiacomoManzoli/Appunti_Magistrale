#Lezione 3 - Ripasso di probabilità e algebra + Supervised Learning


##Variabili aleatorie

###Bernoulli

Esito di un esperimento che può essere positivo o negativo.

```
P(X = i) = p   se i=1 
           1-p se i=0
```

###Binomiale

La probabilatà di avere _i_ successi su _N_ esperimenti è uguale a 

> P(X=i) = (N su i)p<sup>i</sup>(1-p)<sup>N-i</sup>

Il valore atteso di questa variabile è dato da `N*p` mentre la varianza è `N*p*(1-p)`.

###Distribuzione uniforme

Assume che in un intervallo `[a,b]` tutti i punti hanno la stessa probabilità.

> P(X = x) = 1 / (b-a) con `a <= x <= b`
> 
> P(X = x) = 0 altrimenti

Il valore atteso di X (`E[X]`) è uguale a `(a+b)/2`

###Distribuzione normale (Gaussaina)

La distribuzione si concentra in un certo valore medio `mu` ed ha la forma _a campana_.

> N(mu, sigma<sup>2</sup>)
> 
> P(x) = [1 / sigma(√2Pi)]*e<sup>(x-mu)^2 / 2sigma^2</sup>

<!-- https://it.wikipedia.org/wiki/Distribuzione_normale -->

##Algebra lineare

> M € R<sup>m x d</sup>

Somma di due matrici: le matrici A e B devono avere la stessa dimensione, e la matrice somma ha come elementi la somma degli elementi delle matrici.

> C = [A + B]<sub>i,j</sub> = [a]<sub>i,j</sub> + [b]<sub>i,j</sub>

Per fare il prodotto di due matrici è necessario che siano di dimensioni compatibili.

> A € R<sup>m x d</sup>
> B € R<sup>d x k</sup>
> L'emento (i,j) della matrice C = A * B è uguale alla somma del prodotto riga i-esima di a e colonna j-esima di B

La matrice trasposta di una matriche è la stessa matrice "_ribaltata_" sulla diagonale.

> (AB)<sup>T</sup> = B<sup>T</sup>A<sup>T</sup>

Un vettore è una matrice di una sola colonna. 

Il prodotto scalare tra due vettori è la sommatoria del prodotti dei vari elementi del prodotto.

Due vettori si dicono ortogonali quando il loro prodotto scalare è 0.

Due vettori si dicono correlati se il loro prodotto scalare è maggiore di 0, in caso contrario si dicono scorrelati.

La lunghezza di un vettore (norma2, distanza eculidea) è definita come la radice quadrata della sommatoria dei vari elementi del vettore, eleveati al quadrato.

Allo stesso modo il quadrato della lunghezza è la sommatoria dei quadrati degli elementi del vettore.

Il prodotto scalare tra due vettori è anche uguale al prodotto delle lunghezza dei due vettori, moltiplicato anche per il coseno dell'angolo tra i due vettori.

La distanza tra due vettori è la norma della differenza tra i due vettori.

Matrice inversa e determinante.

Utilizzando le matrici è possibile risolvere i sistemi lineari.

Una matrice pseudo inversa è un qualcosa di simile ad una matrice inversa per le matrici rettangolari.

> A<sup>+</sup> = A<sup>T</sup>(AA<sup>T</sup>)<sup>-1</sup>

###Autovalori e autovettori

> A * e = lambda * e
> A matrice
> e vettore

`e` è un autovettore della matrice A e `lambda` è il corrispondente autovalore.

**Traccia**: la traccia di una matrice è la somma degli elementi nella diagonale.

Una matrice si dice **simmetrica** se tutti gli autovalori sono maggiori di 0.

##Supervised Learning

Si vuole tradurre un insieme di dati in ingresso *X* in un insieme di dati di uscita *Y*.

Anche in questo caso c'è un _oracolo_ che funziona in modo stocastico e che sceglie un oggetto *x* in *X* secondo una certa probabilità *P(x)* e sceglie *y* in *Y* in base a *P(y|x)*.

L'obiettivo che si vuole raggiungere è quello di approssimare queste probabilità.

Cosa importante, questo oracolo non sempre è una funzione, questo perché può capitare che ad uno stesso *x* corrispondano *y* diversi.

###Operativamente 

Si dispone di una serie di coppie *(x,y)* che seguono lo schema naturale, l'insieme di queste coppie prende il nome di **training set**.

Viene quindi scelta un funzione *h* che prende il nome di **ipotesi**, definita nello spazio delle ipotesi *H* tale che, da valori presenti nell'insieme *X*, restituisca dei valori nell'insieme *Y*.

L'apprendimento consiste quindi nell'andare a scegliere l'*h* migliore in modo che approssimi bene i dati presenti nel training set e che riesca a generalizzare e predirre i corretti valori *y* anche per valori di *x* non presenti nel training set.

Da ciò segue che possono essere commessi due tipi di errori:

- **Errore empirico**: è l'errore commesso da *h* in media, all'interno del training set. In altre parole è l'errore medio dell'ipotesi sul training set.
- **Errore ideale**: è l'errore commesso da *h* su una qualsiasi coppia *(x,y) ~ P(x,y)*, come media su un'insieme infinito di coppie. Questo errore può essere solamente stimato.

Per calcolare una stima dell'errore ideale si può usare un **test set**, cioè un altro insieme di coppie *(x,y)* che non compaiono nel training set. Questa discriminazione è importante perché se così non fosse l'errore ideale sarebbe influenzato dall'errore empirico.

_Riassumendo: l'errore empirico è quello che si fa sui dati che si conoscono, l'errore ideale è quello che si fa su dei dati nuovi._

Dal momento che lo spazio delle ipotesi non può coincidere con tutte le funzioni calcolabili è  necessario fare delle assunzioni sulla funzione oracolo, queste assunzioni prendono il nome di **bias induttivo** e derivano da delle conscenze a priori che abbiamo sul dominio e che vengono utilizzate per fare delle previsioni induttive sui dati.

Fanno parte del bias induttivo:

- Come vengono rappresentati gli esempi;
- Come viene modellato lo spazio delle ipotesi *H*;
- La funzione obiettivo per la ricerca nello spazio *H*, cioè come viene scelta la funzione *h*.

####Es: regressione polinomiale

> TRAIN = {(x<sub>1</sub>,y<sub>1</sub>),...,(x<sub>n</sub>,y<sub>n</sub>)}

Si vuole trovare una funzione polinomiale in grado di approssimare i punti.

In questo caso il bias induttivo è assumere che esista una funzione polinomiale in grado di approssimare i vari punti.

Lo spazio delle ipotesi diventa quindi l'insieme dei vari polinomi e l'apprendimento viene fatto sui vari coefficenti.

Dobbiamo quindi scegliere tra questo spazio un grado *p* che va a limitare i possibili polinomi (definzione di *H*) e i vari parametri della curva (ricerca nello spazio *H*).






























