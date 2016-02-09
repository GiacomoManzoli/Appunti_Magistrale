#Lezione 13 - Controllo del flusso di controllo

Usare i goto fuori dal blocco rende complesso gestire lo stack dei record di attivazione, quindi i goto sono stati rimossi.

Tuttavia i salti condizonati ogni tanto servono.

##Controlli strutturati

Permettono di fare dei salti:

- `if then else`
- `while { }`
- `return`
- `continue`,`break`
- ...

Tuttavia questi salti possono essere fatti senza andare a violare la struttura a blocchi del codice.

##Eccezioni

Anche le eccezioni fanno dei salti che sono molto più "*spericolati*" in quanto quando si verifica un eccezione viene fatto un salto ad un blocco sconosciuto.

Haskell permette di gestire le eccezioni come input-output, mentre ML permette di utilizzare una gestione più completa.

Andare a gestire un'eccezione significa andare a modificare lo stack dei recordi di attivazione.

Cosa succede quando si verifica un'eccezione:

1. Si esce da un blocco o dal corpo di una funzione per andare ad un blocco "*handler*" che si trova sotto il blocco in cui si è verificata;
2. Si trasportano dei dati relativi al punto in cui si è verificata l'eccezione;
3. Si ritorna ad una particolare istruzione del programma da cui si può continuare la normale esecuzione.

Perché l'eccezioni funzioni devono essere presenti:

- La dichiarazione dell'eccezione;
- Un istruzione *raise* che la solleva;
- Un handler che si occupa di gestire l'eccezione.

In un programma ci possono essere molti handler per una eccezione, in questo caso viene scelto il primo handler che si trova andando a risalire lo stack dei RA. Segue che per le eccezioni l'unica scelta ragionevole è quella di utilizzare lo scoping dinamico.

###Eccezioni in ML

```
<esp1> handle <pattern> => esp2
```

Ricorda un po' il classico `try-catch`, viene eseguita `esp1` e se l'esecuzione va a buon fine viene restituito il valore calcolato dell'espressione.

Se invece viene sollevata un'eccezione che matcha `pattern` allora viene eseguita l'espressione `esp2`.

Se non c'è nessun match per il pattern, oppure `esp2` solleva un'altra eccezione, allora si ricerca un altro handler in un blocco superiore.

Tutto il costrutto è a sua volta un'espressione che deve ritornare sempre lo stesso tipo, di conseguenza `esp1` e `esp2` devono avere lo stesso tipo (oppure non deve esserci un risultato). 

```
exception uno;
exception due;

fun f(x) = if x = 0 then raise uno else raise due;
fun g(y) = f(y) handle uno => 1;
```

Il tipo dedotto (in ML) per `f` è `int -> 'a`, in quanto il sollevamento di un'eccezione non c'entra nulla con il tipo del valore di ritorno, quindi `f` ritorna un risultato qualsiasi.

```
exception E of int;
fun f() = raise E(2);
fun g(y) = (if f() then 1 else 2) handle E(x) => x*y;

val z = g(3)
```

Ha come record di attivazione

```
1[CL=0, AL=0, exc E]
2[CL=1, AL=1, (2,f)]
3[CL=2, AL=2, (3,g)]
4[CL=3, AL=3, z= ]
5[CL=4, AL=3, rit=end, ris=(CL->z), y=3, f()= ] //Blocco per l'invocazione di g
6[CL=5, handle E(x) => x*y] //Blocco segnaposto per l'handler presente dentro g
7[CL=6, AL=2, rit=then, ris=(CL->CL->f())] //Blocco per l'invocazione di f
```

Quando viene eseguito il codice del handler il blocco in cima alla pila è quello che contiene la definizione dell'handler, in questo caso è il blocco 5, con l'aggiunta dei parametri dell'eccezione (in questo caso c'è anche il valore `x`).

Sempre nell'esempio: quando viene invocata `f`:

1. Viene sollevata l'eccezione `E(2)`;
2. Viene fatto il pop del blocco 7;
3. Viene posto `x=2` in `E(x) => x*y`;
4. Viene fatto il pop del blocco 6;
5. Viene eseguito `x*y` con `x=2` e con il blocco 5 in cima alla pila;
6. Viene memorizzato il risultato in `CL->z`.

###Esecirzi sulla gestione delle eccezioni

```
exception A of int;
exception E of int;
val x = 2;
val w = 1;
val y = 3;
fun h(x) = if x=y then y else raise A(y);
val y = 4;
fun f(w) = (if w = h(w) then raise E(w) else y) handle A(x) => x;
val x = f(y);
```

Lo stack è il seguente

```
1[CL=0, AL=0, A of int]
2[CL=1, AL=1, E of int]
3[CL=2, AL=2, x=2]
4[CL=3, AL=3, w=1]
5[CL=4, AL=4, y=3]
6[CL=5, AL=5, (6,h)]
7[CL=6, AL=6, y=4]
8[CL=7, AL=7, (8,f)]
9[CL=8, AL=8, x= ]
10[CL=9, AL=8, rit=end, ris=CL->x, w=4, h(w)= ] //invocazione di f
11[CL=10, AL=10, handle A(x) => x]
12[CL=11, AL=6, rit=(if di f), ris=(CL->CL->h(w)), x=4] //Invocazione di h(w) dentro f
** eseguita raise di A(3), pop(12), pop(11), esegue A(3)=3, scrive risultato 3 in 9->x, pop(10) **
```

Nel caso l'handler `A(x) = x` contenesse un'espressione più complessa, come l'invocazione di una funzione `g(x)`, deve essere previsto uno slot nel record di attivazione dell'esecuzione della funzione per mantenere il risultato parziale:

```
10[CL=9, AL=8, rit=end, ris=CL->x, w=4, h(w)= , g(x)= ]
``` 

###Problemi legati alla gestione delle eccezioni

Se quando si effettua il pop per cercare un handler può capitare che dentro uno dei record tolti ci sia un puntatore verso della memoria nello heap.

In questo caso se il linguaggio non possiede un garbage collector, come il C++, si possono usare due strategie:

- **fregarsene**: le eccezioni sono eccezionali per natura e quindi posso fare garbage perché si verificano poche volte;
- **distruggere**: negli oggetti viene invocato il distruttore in modo da liberare sempre la memoria.

####Handler dentro a funzioni ricorsive

```
fun f(0) = 1
    | f(1) = raise Odd
    | f(3) = f(3-2)
    | f(n) = f(n-2) handle Odd => ~n 
```

Invocando `f(11)` vengono creati 4 handler per la stessa gestione di `Odd`.
Quando viene sollevata l'eccezione viene invocato il primo handler trovato, cioè l'ultimo creato, che è quello che ritorna `-5`.

Il problema si verifica con la gestione ottimizzata per le funzioni ricorsive terminale, in quanto non è più possibile andare a riusare lo stesso record di attivazione per tutte le invocazioni ricorsive.

Le funzioni ricorsive terminali possono essere comunque ottimizzate, tuttavia la presenza di handler complica la cosa.

####Eccezioni ed ordine di valutazione

```
exception A;
exception B;

fun f(0) = raise A
    | f(1) = raise B
    | f(x) = x;

fun g(x,y) = x+y;

g(f(1),f(0)) handle A => 0
                | B => 1;
```

In questo caso l'ordine di sollevazione delle eccezioni dipende dall'ordine di valutazione dei parametri delle funzioni, violando così la dichiaratività del linguaggio.