#Lezione 14 - Richiami ed esercizi

Alcuni linguaggi funzionli come List e ML non sono linguaggi completamente dichiarativi in qunaot permettono di eseguire delle assegnazioni.

Haskell invece è dichiarativo (funzionale puro).

Nei linguaggi dichiarativi l'essenza del calcolo consiste nel valutare delle funzioni.

Le invocazioni di queste funzioni non producono dei side effects.

##Referential transparency

In linguistica si una per ildnciare il denomeno in cui un termine può essere sostituito con un altro mantenendo inalterato il significato della frase.

I linguaggi funzionali puri supportano (maggiromente) la referential transparency, mentre quelli imperativi no (o meno).

Nei linguaggi funzionali puri se `x` e `y` anno lo stesso valore, allora `f x` è equivalente a `f y`. Nei linguaggi imperativi questo è vero solo se `x` e `y` sono alias.

Nei linguaggi funzionali puri una variabile è solo un nome associato ad un valore costante.

Nei linguaggi funzionali due funzioni sono equivalenti se hanno lo stesso grafo, mentre in quelle funzionali ci sono da considerare anche i side effects.

##Esercizio sulla gestione dello stack

```
exception E of int;
val x=2;
val z=3;
fun f(a)=if a(x)+1 =2 then raise E(x) else x;
val x=4;
fun q()=z*x;
val y=5;
fun g(z)=let fun h()=f(z)+x in h end;
fun p(a)=a() handle E(w)=> q()+w;
fun p1(a)=if a=x then x else raise E(a);
fun p2(a)=if a=y then y+x else raise E(y);
fun k()= g(p1) handle E(w)=> g(p2);
fun s()=k() handle E(w)=> q;
val r=s();
val t=p(r);
```

Stack:

```
 1 [0, 0, E of int]
 2 [1, 1, x =2]
 3 [2, 2, z = 5]
 4 [3, 3, f = (4,f)]
 5 [4, 4, x = 4]
 6 [5, 5, q = (6,q)]
 7 [6, 6, y = 5]
 8 [7, 7, g = (8,g)]
 9 [8, 8, p = (9,p)]
10 [9, 9, p1 = (10,p1)]
11 [10, 10, p2 = (11,p2)]
12 [11, 11, k = (12,k)]
13 [12, 12, s = (13,s)]
14 [13, 13, r = _]
15 [14, 13, rit="fine di r", res=EP->CL->r, k() = ] //invocazione di s
16 [15, 15, handle E(w) => q]
17 [16, 12, rit="handler di s", res = CL->CL->k(), g(p1) = _, g(p2) = _] //invocazione di k
18 [17, 17, handle E(w) => g(p2)]
19 [18, 8, rit="handler di k", ris=CL->CL->g(p1), z = (10,p1), h = (19,h)] // Invocazione di g(p1)
```

L'esecuzione di `g(p1)` termina, ma il record di attivazione deve essere portato nello heap perché contiene la definizione di `h`.

```
19* [18, 8, rit="handler di k", ris=CL->CL->g(p1), z = (10,p1), h = (19*,h)]
```

Una volta copiato il record è possibile fare il pop del record 19 e 18.

```
14 [13, 13, r = _]
15 [14, 13, rit="fine di r", res=EP->CL->r, k() = ] //invocazione di s
16 [15, 15, handle E(w) => q]
17 [16, 12, rit="handler di s", res = CL->CL->k(), g(p1) = (19*,h), g(p2) = _] //invocazione di k
```

L'invocazione di `k` termina e viene fatto il pop di 17, 16, fatto questo termina anche `s`, causando il pop di 15.

```
14 [13,13, r = (19*,h)]
15 [14,14, t = _]
16 [15, 9, rit="fine", ris=CL->t, a = (19*,h), a() = _, q = _] //invocazione di p(r)
17 [16, 16, handle E(w) => q() + w]
18 [17, 19*, rit="handle di p", ris=CL->CL->a(), f(z)] //invocazione di h
19 [18, 4, rit="+ di h", ris=CL->f(z), a = (10,p1), a(x) = _] //invocazione di f(z)
20 [19, 10, rit="+ di f", ris=CL->a(x), a = 2, ] //invocazione di p1(x)
```

Esegue `if a=x`, con a=2 e x=4, viene quindi eseguito il ramo else che solleva l'eccezione E(2).
Viene fatto il pop di 20, 19 e 18.
Viene trovato un handler in 17, con il conseguente pop del record.
Viene eseguito il corpo dell'handler `q()+w` con il record 16 in cima e `w=2`.

```
15 [14,14, t = _]
16 [15, 9, rit="fine", ris=CL->t, a = (19*,h), a() = _, q = _] //invocazione di p(r)
17 [16, 6, rit="+ di handle di p", ris=CL->q()] //invocazione di q
```

Viene eseguito `z*x` con `z=3` e `x=4`.
L'esecuzione di `q()` termina con il conseguente pop di 17.

```
15 [14,14, t = _]
16 [15, 9, rit="fine", ris=CL->t, a = (19*,h), a() = _, q() = 12] //invocazione di p(r)
```

L'esecuzione di `p(r)` termina ritornando 14.

```
15 [14,14, t = 14]
```

Inoltre il record 19* può essere rimosso dallo heap dal momento che non c'è più nessun riferimento verso tale blocco.

Variabili di `h`

- `z = EP->AL->z`
- `x = EP->AL->AL->CL->CL->CL->x`

**Da notare**: il record 19 quando viene messo nello heap ha un CL verso il record 18 dello heap, che però non esiste più. Questa cosa non da problemi, in quanto il record 19* è il record di attivazione dell'invocazione di una funzione e quindi per recuperare il contesto di quel record è necessario seguire l'AL e non il CL. 
Se il record di attivazione puntato da AL deve uscire dallo stack è necessario copiarlo nello heap e aggiornare i vari riferimenti.

##Punto fisso di una funzione

```
y f = f (y f)
:t y
((a->b)->(a->b))->(a->b)
```

`y` calcola il punto fisso di `f`, cioè qunado `f(g) = g`.

`f` sarebbe una funzione che esegue un passo di un algoritmo che funziona a punto fisso, mentre `y` è la funzione che esegue il calcolo dell'algoritmo.

Se

```
f g x = if x = 1 then 1 else x*g(x-1)
```

In questo caso se `g` è la funzione fattoriale, il punto fisso di `f` è il fattoriale.

Se applico `y` a `f`, ottengo qualcosa di simile a

```
y f x = if x = 1 then 1 else x*(Y f(x-1))
```

È possibile andare a ripertere lo stesso ragionamento per vedere che viene calcolato il fattoriale di `x`.








