#Lezione 3- Haskell 

##Parte generica

* `:t f` per sapere il tipo della funzione `f`.
* `let` per definire delle costanti, viene usato solo nell'ambiente `ghci`, dentro un file non è necessario
* `it` contiene l'ultimo valore calcolato

##Funzioni

Vengono invocate con il nome, seprato da un spazio, seguito dai parametri, ognuno seprato da uno spazio

```haskell
foo param1 param2
```

Non ci sono le parentesi nell'invocazione, quelle vengono utilizzate solamente per esprimere la priorità d'esecuzione

```haskell
foo (foo 3)
-- in modo imperativo sarebbe
foo(foo(3))
-- e non questo
foo(foo,3)
```

Una funzione si definisce nel seguente modo:

```haskell
doubleUs x y = x*2 + y*2
```

L'apostrofo può comparire nel nome della funzione.

Le funzioni **non** possono iniziare con una lettera maiuscola.

Se una funzione non riceve dei parametri diventa una _definition_ o _name_.

###Funzioni currificate

```haskell
Prelude> let g a b = a+b
Prelude> :t g
g :: Num a => a -> a -> a
```
La funzione `g` dell'esempio è detta _currificata_. Una funzione che può prendere vari parametri ma li elabora uno alla volta.
`a -> a -> a` è il tipo della funzione `g`

```haskell
Prelude> let h x = g x
Prelude> :t h
h :: Num a => a -> a -> a
```

`g` aspetta due parametri per far la somma, se a `g` passo un solo parametro ottengo una funzione che aspetta i restanti parametri, necessari per eseguire `g`.

Una funzione _currificata_ è quindi una funzione a cui non è necessario passare tutti i parametri, ma li aspettano uno alla volta.

_questo dovrebbe essere il significato della ->_


```haskell
Prelude> let q = h 3
```
`q` invoca `h` con `3` e ritorna `g` con già un parametro passato.

```haskell
Prelude> q 4
7
```
Quando esegue `q 4` viene passato il secondo parametro che permette l'esecuzione di `g`, la quale ritorna `7`.

Nella descrizione del tipo di una funzione la prima parte (`Num a`) specifica che c'è un solo tipo, in questo caso numerico.

Mentre la seconda parte, dopo la `=>` specifica il tipo dei parametri e del valore di ritorno.
Quindi `a -> a -> a` specifica che il primo parametro, il secondo parametro e il valore di ritorno hanno tutti lo stesso tipo.

```haskell
Prelude> :t (==)
(==) :: Eq a => a -> a -> Bool
```
`Eq` racchiude tutti i tipi che sono tra loro confrontabili.
`a -> a -> Bool` specifica che vengo presi due parametri dello stesso tipo e viene ritornato un valore booleano.

Quando definisco dei miei tipi, posso specificare che appartengono alla categoria di `Eq`.

Nel caso il tipo di una funzione includa un maggior numero di tipi, questo viene descritto come `Num a, Num b, Num c => a -> b -> c`

```haskell
Prelude> let asd = (==) 2
Prelude> :t asd
asd :: (Eq a, Num a) => a -> Bool
```
In questo caso il tipo `a` deve essere sia numerico, sia confrontabile. La funzione ritorna come valore una funzione currificata, che in questo caso è la funzione `==` che si aspetta un secondo parametro.

```haskell
Prelude> asd 2
True
Prelude> asd 32
False
```

###Funzioni polimorfe

Le funzioni polimorfe sono quelle che accettano variabili di qualsiasi tipo.

```haskell
:t head
head :: [a] -> a
```


##If

* l'`else` è obbligatorio
* c'è anche il `then` da mettere

```haskell
doubleSmallNumber x = if x > 100  
                        then x  
                        else x*2  
```

##List

Nelle liste è possibile tenere solo elementi di uno stesso tipo.

Per concantenare due liste c'è l'operatore ```++```.

Le stringhe vengono considerate come liste di caratteri.

L'operatore ```:``` permette di inserire in testa ad una lista.

```haskell
ghci> 5:[1,2,3,4,5]  
[5,1,2,3,4,5]
```

Si possono definire liste di liste di liste. Hell yeah!

Gli operatori di disuguaglianza ```<,>,<=,>=``` permettono di confrontare delle liste in odrine lessicografico.


###List comprehension

Modo compatto di esprimere liste che deriva dalla notazione matematica.

```haskell
Prelude> [x*2 | x <- [1..10], x*2 >= 12]
[12,14,16,18,20]
```

```haskell
Prelude> let removeNonUppercase st = [c | c <- st, c `elem` ['A'..'Z']]
Prelude> removeNonUppercase "pIPPo"
"IPP"
```

##Tipi predefiniti

Sono presenti delle classi di tipo che raggruppano tipi tra loro simili sui quali è possibile eseguire funzioni simili.
Ad esempio `Num` raggruppa tutti i tipi che si comportano come numeri.


##Pattern Matching

```haskell
Prelude> let head' [] = error "No head for empty list"
Prelude> let head' (x:_) = x
Prelude> :t head'
head' :: [t] -> t
```

Posso definire delle funzioni con lo stesso nome per "matchare" i vari parametri possibili.

`(x:_)` mactha tutti i parametri che sono una lista, `x` è il primo elemento, `_` matcha un valore qualsiasi, `:` concatena `x` con il valore qualsiasi, ottenendo così una lista.

`(x:xs)` in questo caso avviene lo stesso match, solo che con `xs` ho il valore del resto della lista.

Posso anche usare una versione alternativa del pattern matching tra parametri che è equivalente.

```haskell
head'' xs = case xs of [] -> error "no head"
							 (x:_) -> x
```

##Guardie

```haskell
max' :: (Ord a) => a -> a -> a
max' a b
    | a > b     = a
    | otherwise = b
```
Rappresentano una specie di `if-elseif`.

Da notare che nella definzione della funzione non serve usare l'uguale.

##Where

```
initials :: String -> String -> String
initials firstname lastname = [f] ++ ". " ++ [l] ++". "
    where (f:_) = firstname
          (l:_) = lastname  
*Main> initials "giacomo" "manzoli"
"g. m. "
```

##Let it be (in)

```haskell
initials' :: String -> String -> String
initials' firstname lastname = let
                                    (f:_) = firstname
                                    (l:_) = lastname
                                in
                                    [f] ++ ". " ++ [l] ++". "
```

Let-in ritorna un'esperessione, mentre where permette di definire delle costanti all'interno di un'espressioni.

```haskell
f3 :: [a] -> ([a],[a],[a],[a])
f3 l =  let
            aux [] = ([],[])
            aux (x:[]) = ([x],[])
            aux (x:y:xs) = ([x,y],xs)
        in
            let
                (x1,y1) = aux l
                (x2,y2) = aux y1
                (x3,y3) = aux y2
            in
                (x1,x2,x3,y3)
```






























