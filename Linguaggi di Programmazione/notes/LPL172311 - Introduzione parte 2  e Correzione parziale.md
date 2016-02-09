#Lezione 17 - Introduzione parte 2 + Correzione parziale

Nelle prossime puntante:

- I linguaggi OO
- Il lato oscuro del C++
- Il lato positivo di Java
- Il lato oscuro di Java (Generics)
- Lazy evalation di Haskell
- (an c'è anche il progetto)

Con i linguaggi funzionali è possibile "imitare" il concetto di oggetti sfruttando il l'upward fun result che copia nello heap un record di attivazione che può contenere dei valori, i quali possono essere considerati sia come attributi che come metodi dell'oggetto.

Si riesce così ad ottenere sia un sistema di incapsulamento (o astrazione) e anche il polimorfismo parametrico.

Perché un linguaggio sia considerato OO deve avere le seguenti caratteristiche:

- dynamic lookup
- astrazione
- sottotipaggio
- ereditarietà

---
#Correzione primo paziale

##Domanda 1

```
 1 [0, 0, E]
 2 [1, 1, A]
 3 [2, 2, x=2]
 4 [3, 3, y=3]
 5 [4, 4, h = (5,h)]
 6 [5, 5, f0 = (6,f0)]
 7 [6, 6, r = 2]
 8 [7, 7, q = (8,q)]
 9 [8, 8, w1 = _]
10 [9, 8, rit="prox istruzione", rit=CL->w1, f0y=_] //Invocazione di q
11 [10, 10, handle A(x)=>x]
12 [11, 6, rit="handle di q", ris=CL->CL->f0y, x=3, z=5, f1=(12,f1)] //invocazione di f0(3)
```

Viene eseguita `f0` che ritorna `(12,f1).`
Dovrebbe essere tolto il record 12 dalla pila, ma contiene la definizione di una funzione, quindi deve essere spostato nello heap.

```
12* [11, 6, rit="handle di q", ris=CL->CL->f0y, x=3, z=5, f1=(12*,f1)] //invocazione di f0(3)
```

Viene fatto il pop di 12 e 11.
Continua l'esecuzione di q con il record 10 in cima.

```
10 [9, 8, rit="prox istruzione", rit=CL->w1, f0y=(12*)] //Invocazione di q
```

L'esecuzione di `q` termina, ritornando il valore `(12*,f1)`, dopodiché viene fatto il pop di 10.

L'esecuzione del programma riparte con il record 9 in cima.

```
 9 [8, 8, w1 = (12*,f1)]
10 [9, 9, p=(10,p)]
11 [10, 10, w2= _]
12 [11, 10, rit="fine programma", ris=CL->w2, w1x=_, xr=_] //p()
13 [12, 12, handle E(x) = x*y | A(x)=> x(r)]
14 [13, 12*, rit="handle di p", ris=CL->CL->w1x, z1=2, f2=(14,f2), hf2=_]//w1(x)
15 [14, 5, rit="fine di f1", ris=CL->hf2, a=(14,f2), ax=_, ay2=_] //h(f2)
16 [15, 14, rit="condizione di h", ris=CL->ax, z2=2, xy=_]//a(x)
17 [16, 16, handle E(x) => x+2 | A(x) => x(y)]
```

Esegue il corpo di `f2` che fa il test `x+z2 = z`, `z2` vale 2, `x` vale 3, `z` vale 5 (parametro formale di `f0`).
Viene quindi eseguito il primo ramo dell'if, che ritorna `z2`.

Viene quindi fatto il pop di 17 e 16.
Continua quindi l'esecuzione del corpo di h con il record 15 in cima.

```
15 [14, 5, rit="fine di f1", ris=CL->hf2, a=(14,f2), ax=2, ay2=_] //h(f2)
```

Il test dell'if di `h` viene valutato vero, viene quindi eseguito il raise di `A(a)`.

Viene fatto il pop di 15 e 14, tuttavia il record 14 contiene la definzione di a quindi deve essere copiato nello heap.

```
14* [13, 12*, rit="handle di p", ris=CL->CL->w1x, z1=2, f2=(14*,f2), hf2=_]//w1(x)
```

Viene trovato un handler nel record 13, di conseguenza viene eseguito il pop di 13 ed eseguito l'handler con il record 12 in cima alla pila.

```
12 [11, 10, rit="fine programma", ris=CL->w2, w1x=_, xr=_] //p()
13 [12, 14*, rit="fine di p", ris=CL->xr, z2=2, xy=_] //x(r)
14 [13, 13, handle E(x) = x+y | A(x)=> x(r)]
```

Si esegue il corpo di `f2` con `x+z2=z`, `x=3`, `z=5`, `z2=2`, il test viene valutato vero, viene quindi ritornato `z2=2`.

Viene quindi fatto il pop di 14 e 13. Con 12 in cima alla pila viene riprende l'esecuzione di p.

```
12 [11, 10, rit="fine programma", ris=CL->w2, w1x=_, xr=2] //p()
```

L'esecuzione di `p` termina ritornano il valore 2, portando anche alla terminazione del programma.
Inoltre è possibile rimuovere il record `14*` dallo heap.

I valori di `w1` e `w2` sono:

- `w1 = (12*,f1)`
- `w2 = 2`

Dentro f2 vengono utilizzati gli indirizzi:

- x: AL->AL->x
- y: AL->AL->AL->CL->CL->y
- z: AL->AL->z
- z2: EP->z2

(La mancanza di EP per x, y e z è dovuta al fatto che i record per gli handle sono "farlocchi" quindi conviene ometterli, in ogni caso se li mettiamo cambia poco).

Il codice che esegue la prima parte di h:

```
//Costruzione del RA per l'esecuzione di h
1. metti EP->CL->CL->x in r0
2. sia (c,d) il valore del parametro formale a.
3. push RA di 6 posizioni sulla pila e ci scriviamo:
    - 0: EP
    - 1: AL = c
    - 2: istruzione K di questo codice.
    - 3: in *EP->a(x) (dereferenzio EP, cioè prendo il valore del campo CL del record e poi vado su a(x))
    - 4: load r0
    - 5: x(y)=_
4. EP=EP+6
5. jump d //invocazione di a
K. ...
K+1. esegue il confronto tra a(x) e la variabile globale x.
```

##Domanda 2

```
f g 1 = 1
f g x = x * (g (x - 1))
```

`1` ha come tipo Num non Int.

Il tipo finale viene quindi `(Num -> Num) -> Num -> Num`.

##Domanda 3

Funtori applicativi in haskell

```haskell
class (Functor f) => Applicative f where    
    pure :: a -> f a
    (<*>) :: f (a -> b) -> f a -> f b 
    (<$>) :: (a -> b) -> f a -> f b -- non obbligatoria
```

## Domanda 4

```haskell
instance Applicative [] where
    pure x = [x]
    fs <*> xs = [f x | f <- fs, x <- xs]
```

## Domanda 5

- Göedel: solo alcune funzioni sono calcolabili (terminazione della macchina di turing)
- Tesi di Church: tutte le funzioni parziali ricorsive sono calcolabili
- I linguaggi moderni calcolano tutte le funzioni calcolabili e quindi questo non può essere utilizzato come criterio di confronto
- Le proprietà "interessanti" dei linguaggi di programmazione non sono calcolabili, bisogna quindi apporsimarle con tecniche di analisi statica.
