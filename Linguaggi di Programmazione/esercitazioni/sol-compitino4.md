#Compitino 4 - Eccezioni e Upward result

##Domanda1

###Soluzione

```
1  [0, 0, E of int]
2  [1, 1, A of int -> int]
3  [2, 2, x = 2]
4  [3, 3, y = 3]
5  [4, 4, h = (5,h)]
6  [5, 5, f0 = (6,f0)]
7  [6, 6, r = 6]
8  [7, 7, q = (8,q)]
9  [8, 8, w1= _]
10 [9,8 , rit="dopo q()", ris=EP->CL->w1, f0y= _] //invocazione di q
11 [10, 10, handle A(x) => x]
12 [11, 6, rit="handle q", ris=EP->CL->CL->f0y; x = 3, z = 6, f1=(12,f1)] //Invocazione di f0(y)
```

Termina f0, EP->CL->CL->f0y = (12,f1), si tratta di un problema di upward funresult, il record 12 viene sposato nello heap, ridirigento 12 in 12*.

```
12* [11, 6, rit="handle q", ris=EP->CL->CL->f0y; x = 3, z = 6, f1=(12*,f1)] --> Heap
```

Viene quindi fatto il pop del record 11, mettendo (12*, f1) in w1 e si conclude facendo il pop di 10.

L'esecuzione del codice continua quindi con:

```
1  [0, 0, E of int]
2  [1, 1, A of int -> int]
3  [2, 2, x = 2]
4  [3, 3, y = 3]
5  [4, 4, h = (5,h)]
6  [5, 5, f0 = (6,f0)]
7  [6, 6, r = 6]
8  [7, 7, q = (8,q)]
9  [8, 8, w1= (12*,f1)]
10 [9, 9, p=(10,p)] //Dichiarazione di p
11 [10, 10, w2= _] 
12 [11, 10, rit="fine", res=EP->CL->w2, w1(x) = _, x(r) = _] //Invocazione di p
13 [12, 12, handle E(x) => x*y | A(x) => x(r)] //Handler dichiarati dentro p
14 [13, 12*, rit="handle di p", ris=EP->CL->CL->w1(x), z1 = 2, f2 = (14,f2), h(f2) = _] //Invocazione di w1(y)
15 [14, 5, rit="fine di f1", ris=EP->CL->h(f2), a=(14,f2), a(x) = _, a(y*2) = _] //Invocazione di h(f2)
```

// Esecuzione del corpo di h, viene invocata a(x)

```
16 [15, 14, rit="if di h", ris=EP->CL->a(x), z2 = 2, x(y) = _] //Invocazione di a(x), a=f2, x è globale
17 [16, 16, handle E(x) => x+z | A(x)=>x(y)] //Handler di f2
```

Esecuzione del corpo di f2

x+y=z2 -> 3 + 3 = 2 -> false

x è definita in 12\*.

y è quella globale

Viene eseguito raise E(3)

Pop di 17 che restituisce x + z = 3 + 6 = 9

x è il parametro ricevuto dall'handler

z è quella definita in 12*

Il valore calcolato dall'handler viene usato come valore di ritorno di f2 quindi viene salvato in EP->CL->a(x)

Viene fatto anche il pop del 16 e si ritorna il controllo all'if di h

In cima alla pila c'è

```
15 [14, 5, rit="fine di f1", ris=EP->CL->h(f2), a=(14,f2), a(x) = 9, a(y*2) = _] //Invocazione di h(f2)
```

a(x) = y -> 9 = 3 -> false, viene eseguita a(y*2)

```
16 [15, 14, rit="fine di h", ris=EP->CL->a(y*2), z2=6, x(y) = _] //Invocazione di a(y*2)
17 [16, 16, handle E(x) => x+z | A(x)]=>x(y)] //Hander di f2
```

Esecuzione del corpo di f2

x+y = z2 -> 3 + 3 = 6 -> true

x è definita in 12\*.

y è quella globale

L'esecuzione di f2 termina normalmente e viene ritornato il valore di z2 in EP->CL->CL->a(y*2)

Viene fatto il pop di 17 e 16

In cima alla pila c'è:

```
15 [14, 5, rit="fine di f1", ris=EP->CL->h(f2), a=(14,f2), a(x) = 9, a(y*2) = 6] //Invocazione di h(f2)
```

h termina e si passa alla fine di f1, viene posto EP->CL->h(f2) = 6 e fatto il pop di 15

```
14 [13, 12*, rit="handle di p", ris=EP->CL->CL->w1(x), z1 = 2, f2 = (14,f2), h(f2) = 6] //Invocazione di w1(y)
```

w1(y) continua la sua esecuzione e ritorna h(f2) in EP->CL->CL->w1(x), viene poi fatto il pop di 14 e anche di 13, perché la parte sinistra non ha dato problemi.

Continua l'esecuzione di p con in cima i record

```
12 [11, 10, rit="fine", res=EP->CL->w2, w1(x) = 6, x(r) = _] //Invocazione di p
```

Viene infine memorizzato il risutlato di w1(x) in EP->CL->w2 e fatto il pop di 12

Il programma quindi termina con w2 = 6

```
11 [10, 10, w2= 6] 
```

Alla fine dell'esecuzione `w1=(12*,f1)` e `w2=6`.

Le variabili di f2 hanno indirizzo:

- z2 = EP->z2
- x = EP->AL->AL->x
- y = EP->AL->AL (12*)->AL (6) ->CL->CL->y
- z = EP->AL->AL->z

Codice per h: (si intende il codice per creare il record di attivazione per h)

```
...
```
