#Lezione 5 - Modelli di calcolo e URM

Nel tempo sono stati proposti diversi modelli di calcolo:

- Macchina di turing, 1936
- Lamda calcolor, Church 1936
- Funzioni parziali ricorsive, Göedel-Kleene
- Sistemi di Post, grammatiche libere da contesto
- Markove System, 1951
- Macchina a registri, 1963

La lista dei modelli è lunga, pertanto si può pensare che sia necessaria una teoria della computabilità per ogni modello.
Tuttavia si è notato che le classi delle funzioni calcolabili dai vari modelli erano sempre quelli.
Queste congetture sono state poi formalizzate dalla **tesi di Church-Turing**: ogni funzione è calcolabile con un procedeimento effettivo se e solo se è calcolabile da una macchina di turing.


# URM - Ulimited Register Machine

Il modello di calcolo che utilizzeremo è quello della macchina URM, la quale è dota di una serie di registri, ognugno dei quali contiene dei numeri naturali.

```
 R1 R2 R3
|r1|r2|r3|..|..|..

r_i \in |N
```

C'è inoltre un agente in grado di eseguire un programma, ovvero una sequenza di azioni I_1, I_2, ... I_n.

Queste istruzioni possono essere:

- Aritmetiche:
    - `Z(n)`: sposta 0 in r_n, r_n <- 0
    - `S(n)`: incrementa di 1 il valore del registro rn, rn <- rn +1
    - `T(m,n)`: copia il contenuto del registro r_m in rn, r_n <- r_m.
- Salto condizionato:
    - `J(m,n,t)`: se r_m è uguale a r_n, salta all'istruzione I_t, altrimenti procede con l'istruzione successiva. Se viene fatto un salto ad un'istruzione che si trova fuori dal programma, l'esecuzione termina.

Un programma d'esempio è dato da:

```
I1: J(2,3,5)
I2: S(1)
I3: S(3)
I4: J(1,1,1)
```

l'esecuzione del programma risulta quindi essere:

```
     R1 R2 R3 R4
    |1 |2 |0 |0 |

I1: false, non salta

I2:  R1 R2 R3 R4
    |2 |2 |0 |0 |
    
I3:  R1 R2 R3 R4
    |2 |2 |1 |0 |

I4: true, esegue I1:

I1: false, non salta

I2:  R1 R2 R3 R4
    |3 |2 |1 |0 |
    
I3:  R1 R2 R3 R4
    |3 |2 |2 |0 |

I4: true, esegue I1:

I1: true, salta alla terminazione
```

La macchina ha memoria infinita e lo stato iniziale della computazione del programma *P* viene indicato con:

```
P(a1, a2, ....) *freccia verso il basso*
```
La notazione

```
P(a1, a2, ...) *frecciaversoilbasso* a
```

indica che il programma *P* eseguito sulla configurazione *a1, a2, ...., an, 0 ...* termina producendo in *r1* il valore *a*.

## Funzioni URM-calcolabili

Una funzione parziale *f: N^k -> N* si dice **URM-calcolabile** se esiste *P* programma URM tale che per ogni input *a1, ..., ak* in N, il programma *P* termina producendo *a in N* se e solo se la funzione è definita sulla tupla e il risultato della funzione coincide con *a*.

Più formalmente:

```
P(a1, a2, ..., ak) *frecciaversoilbasso* a calcola f se

(a1, ..., ak) \in dom(f) e f(a1, ..., ak) = a
```

Con la lettera C-figa indichiamo la classe delle funzioni URM-calcolabili e con C-figa^k ci si restringe alle funzioni *k*-arie.

Un esempio di funzione calcolabile è dato da *f(x,y) = x+y*, la quale può essere calcolata dal programma:

```
 R1 R2 R3 ...
| x| y| 0|...

uso r3 come k, e cerco di fare in modo che r1 sia uguale a x+k

I1: J(2,3,END) #LOOP
I2: S(1) // x = x + 1
I3: S(3) // k = k + 1 
I4: J(1,1,LOOP)
#END
```

Un altro esempio è dato da *f(x) = x/2 se x è pari, frecciaSu altrimenti*


```
 R1 R2 R3 ...
| x| 0| 0|...

uso r2 come k e r3 come 2k.
Incremento 2k di 2 e k di 1, quando 2k = x, allora k è x/2

I1: J(1,3,END) #LOOP
I2: S(2) // k = k + 1
I3: S(3) // 2k = 2k + 1 
I3: S(3) // 2k = 2k + 1 
I4: J(1,1,LOOP)
I5: T(2,1)#END
```

Come esericizio, provare ad implementare *f(x) = x-1, f(0) = 0*.

Da notare che per individuare la funzione calcolata da un programma URM è necessario specificare sia il programma che il numero di argomenti, altrimenti non è possibile definire l'arietà della funzione.

```
f_p^k: N^k -> N


f_p (\vec{x}) = y se P(\vec{x}) frecciagiù y, freccia su se il programma non termina
```

Quando una funzione è calcolabile, esistono infiniti programmi in grado di calcolarla, perché risulta semplice andare ad aggiunggere delle istruzioni "inutili" per generare un nuovo programma che calcola la funzione, mentre se non è calcolabile, non esiste nessun programma in grado di calcolarla.

### Esercizio teorico - URM e URM'

Sia URM' la macchina senza `T(m,n)` e sia C-figa' la classi di funzioni URM'-calcolabili, questa classe come si relaziona con C-Figa?

Come prima cosa ci si può chiedere se
```
C-figa' ⊆ C_figa
```

Sia *f: N^k -> B* URM' calcolabile, f in C-figa', esiste *P'* progamma in URM' tale che *f = f_p*, ma *P'* è anche un programma in URM, quindi f in C-Figa.

Resta ora da capire se l'inclusione è stretta o meno.
L'istruzione `T(m,n)` può essere sostituita dalle istruzioni

```
Z(n)
J(n,m,END) #LOOP
S(n)
J(1,1,LOOP)
#END
```

quindi, essendoci un modo per simulare l'istruzione del trasferimento si ottiene che 

```
C-figa ⊆ C-Figa'
```

quindi le due classi sono equivalenti.
Tuttavia, questa è una congettura e non una dimostrazione formale.

Sia *f in C-figa*, quindi esiste un *P* in URM e *k in N*, tale che *f = f_p^k*, si vuole dimostrare che esiste un programma *P'* in URM', tale che *f_p'^k = f_p^k = f*.

Questo può essere dimostrato per induzione su *h = \#numero di istruzioni T(m,n) in P*.
Banalmente se *h=0* si ha che *P* è già un programma URM', mentre se *h > 0*, il programma *P* avrà un'istruzione *Is* che sarà un trasferimento `T(m,n)`.
Tale programma programma può essere riscritto come *P''*, con *Is* uguale a `J(1,1,l+2)`, dove all'istruzione *Il+2* iniziano le istruzioni alternative per fare la copia precedentemente riportate, al termine delle quali c'è un salto all'istruzione *Is+1*.

Resta un problema riguardo ad i salti oltre la fine, è quindi necessario normalizzare i salti in modo che tutti quelli che puntano al termine del programma finiscano all'istruzione *Il+1*, dove *Il* è l'ultima istruizone del programma *P*.
L'istruzione *Il+1* di *P''* sarà quindi un salto all'effettiva fine del programma.

Applicando questo procedimento si ottiene un programma *P''* che avrà un'istruzione `T(m,n)` in meno e che calcola la stessa funzione calcolata da *P*.
Ripetendo questo processo si ottiene induttivamente il programma *P'* che non ha istruzioni del tipo `T(m,n)`.

### Esercizio teorico - URM e URM-S

Come si relazione la classe C-FigaS con C-figa?
Dove C-FigaS è la classe delle funzioni calcolabili da URM-S ovvero dalla macchina URM che non ha l'istruzione `T(m,n)` ma ha l'istruzione `TS(m,n)` che fa lo swap del contenuto di dei due registri.


### Esercizione teorico - URM e URM-SL

Sempre quella domanda, con la differenza che viene tolta l'istruzione di salto `J(m,n,l)`.

Ovviamente *C-figaSL* è contenuta in C-Figa, ma non vale la relazione *C-figa ⊆ C-figaSL* non vale perché si C-FigaSL riesce a calcolare solamente funzioni totali, ovvero che terminano sempre, mentre C-figa contiene anche delle funzioni parziali.

Per le istruzioni disponibili in URM-SL si riesce a calcolare *f(x) = k* oppure *f(x) = x+k* per *k in N*.
Ovvero *f in C-FigaSL* se e solo se *f(x) = k oppure x+k*.

Questo vuol dire che per ogni programma *Psl* la funzione che viene calcolata *fp* è del tipo di *f*.

La dimostrazione viene fatta per induzione sulla struttura di un programma URM-SL, ragionando sul cosa succede se si aggiunge un'ulteriore istruzione al programma

