#Lezione 4

Ancora più haskell.

##Algebric data types

O tipi definiti dall'utente.

```haskell
data Shape = Circle Float Float Float | Rectangle Float Float Float Float
```

Definisco il tipo `Shape` che può essere costituito da valori conformi alla parte `Circle` o `Rectangle`.

Da notare l'utilizzo delle maiuscole per il nome del tipo o dei costruttori

```haskell
Prelude> :t Circle
Circle :: Float -> Float -> Float -> Shape
Prelude> :t Rectangle
Rectangle :: Float -> Float -> Float -> Float -> Shape
```

I due costruttori sono delle normali funzioni che si aspettano dei parametri.

Tuttavia con questa definzione il sistema non sa stampare il tipo `Shape`, è quindi necessario specificare che `Shape` è stampabile:

```haskell
data Shape = Circle Float Float Float | Rectangle Float Float Float Float deriving Show
```
In questo modo si specifica che `Shape` fa parte della classe dei tipi stampabili.

```haskell
Prelude> Circle 2 3 4
Circle 2.0 3.0 4.0
- viene stampata la stringa utilizzata per invocare il costruttore
```

Questa cosa funziona out-of-the-box solo nel caso i valori che costituiscono il tipo derivano anche essi da `Show`.

```haskell
data Point = Point Float Float deriving (Show)
data Shape = Circle Point Float | Rectangle Point Point deriving (Show)
```
`Point` deve derivare da `Show` altrimenti si verifica un errore.

Da notare che il nome del costruttore può o meno matchare il nome del tipo.

```haskell
Prelude> :t Circle
Circle :: Point -> Float -> Shape
Prelude> let p = Point 10 20
Prelude> Circle p 20
Circle (Point 10.0 20.0) 20.0
\- da notare che Circle 2 3 4 non funziona più
Prelude> Circle (Point 10 20) 5
Circle (Point 10.0 20.0) 5.0
```

```haskell
surface :: Shape -> Float
surface (Circle _ _ r) = pi * r ^ 2
surface (Rectangle x1 y1 x2 y2) = (abs $ x2 - x1) - (abs $ y2 - y1)
```

Da notare che quando definisco la funzione per un determinato tipo posso fare il pattern matching sulla tipologia del costruttore.

**LE DUE funzioni funzionano solo con i costruttori senza Point**


##Incapsulamento

```haskell
module Shape
(
	Point(..)
	,Shape(..)
	,surface
) where

-- definzione delle funzioni
```
In questo modo, quando viene fatto l'include si vedono solo le funzioni in lista.

Da notare che il `(..)` permette di esportare anche la definzione dei costruttori.

##Alberi

```haskell
data Tree a = EmptyTree | Node a (Tree a) (Tree a) deriving (Eq, Show, Read)

Prelude> :t Node
Node :: a -> Tree a -> Tree a -> Tree a
```
In questo caso il tipo `a` speficia il tipo del contenuto di un nodo, gli altri `Tree` rappresentano i due sotto alberi. Il tipo `Tree` è quindi parametrico.

Da notare che `a` può non essere derivato da `Show`, in questo caso l'errore può essere rilevato solo a runtime.

```haskell
Prelude> let x = Node 2 (Node 4 EmptyTree EmptyTree) (Node 5 EmptyTree EmptyTree)
Prelude> x
Node 2 (Node 4 EmptyTree EmptyTree) (Node 5 EmptyTree EmptyTree)
Prelude> :t x
x :: Num a => Tree a
```

La stampa di defualt viene quindi fatta in modo _pre-fisso_.

Da notare che in questo caso l'applicazione di una di queste funzioni non è altro che la rappresentazione di se stessa, diventa quindi un'interpretazione libera.

In questo modo si ottiene un simbolismo che permette di calcolare le funzioni per ogni possibile interpretazione.

Ad esempio se ho la funzione `3 + 4` grazie all'interpretazione libera il calcolo della funzione ha come valore `3 + 4`, in questo modo posso usare al posto di `+` una funzione qualsiasi, ottenendo sia `7` se applico il significato classico, oppure potrei ottenere `12` se decido che nel mio programma l'applicazione del `+` coincide con la moltiplicazione classica.

_Nella definzione di `Tree` c'è anche la derivazione da `Read` il quale permette di invocare il costruttore a partire da una stringa._

##Record

```haskell
data Person = Person { firstName :: String
	, lastName :: String
	, age :: Int
	, height :: Float
	, phoneNumber :: String
	, flavor :: String
	} deriving (Show)

Prelude> :t Person
Person
  :: String -> String -> Int -> Float -> String -> String -> Person

let x = Person {firstName=“Gigi“, lastName="Asd", age=12, height=184, phoneNumber="123123", flavor="123123"}
Prelude> :t x
x :: Person
Prelude> firstName x
"Gigi"
```
In questo modo posso usare delle esperssioni come `firstName x` per accedere al primo nome.

Altrimenti avrei dovuto utilizzare la sintassi pattern matching per accedere ai vari campi `(firstName _ _ ...) = x`.

##Qualcosa di strano

```haskell
data Maybe a = Nothing | Just a
```

Questa cosa è importante per riuscire a gestire le eccezioni in modo dichiarativo.

Viene usato `Nothing` per far terminare il calcolo.

Sarà importante per il progetto.

```haskell
Prelude> :t Just "HAHAH"
Just "HAHAH" :: Maybe [Char]
Prelude> :t Just 23
Just 23 :: Num a => Maybe a
Prelude> :t Nothing
Nothing :: Maybe a
```

```haskell
data Either a b = Left a | Right b
Prelude> let z = Left 2
Prelude> :t z
z :: Num a => Either a b
```
`Either` può contenere al suo interno due valori. In questo modo posso fare una funzione che ritorna un valore che può essere di un tipo o di un altro.

Il tutto in un modo sicuro rispetto ai tipi.

##Typeclasses

```haskell
class Eq a where
	(==) :: a -> a --> Bool
	(/=) :: a -> a --> Bool
	x == y = not (x /= y)
	x /= y = not (x == y)
```

Replica della definzione della classe `Eq`, vengono fornite le definzioni delle funzioni che il tipo deve implementare per appartenere alla famiglia di `Eq`.

La seconda parte permette di definire una sola funzione come contrario dell'altra rendendo necessaria l'implementazione di solo una delle due funzioni.

```haskell
data TrafficLight = Red | Yellow | Green

instance Eq TrafficLight where
	Red == Red = Ture
	Yellow == Yellow = Ture
	Green == Green = True
	_ == _ = Flase
```

In questo modo il tipo `TrafficLight` appartiene ad `Eq` con la definizione della funzione `==` secondo pattern matching.

```haskell
istance Show TrafficLight where
	show Red = "Red Light"
	show Yellow = "Yellow Light"
	show Green = "Green Light"
```

In questo modo vado a definire come mostrare i vari tipi dentro una classe di tipi.

```haskell
class YesNo a where
	yesno :: a -> Bool

-- spefico che anche il tipo lista di qualcuno tipo appartiene alla classe YesNo
instance YesNo [a] where
	yesno [] = false
	yesno _ = true
```

##"Spalmare funzioni"

```haskell
Prelude> :t map
map :: (a -> b) -> [a] -> [b]
Prelude> map (++ "!")["hey", "ho"] 
["hey!","ho!"]
```
`map` permette di applicare una funzione a tutti gli elementi di una lista.

```haskell
Prelude> :t filter
filter :: (a -> Bool) -> [a] -> [a]
```
`filter` permette di filtare i dati su una lista

```haskell
Prelude> :t foldl
foldl :: Foldable t => (b -> a -> b) -> b -> t a -> b
Prelude> let sum xs = foldl (+) 0 xs
Prelude> sum [1..5]
15
```
`foldl` permette di trasformare una lista in un valore unico.

Esiste anche `foldr` che esamina la lista a partire da destra.

##Inserimento in un albero

```haskell
data Tree a = EmptyTree | Node a (Tree a) (Tree a) deriving (Eq, Show, Read)

singleton :: a -> Tree a
singleton x = Node x EmptyTree EmptyTree

treeInsert :: (Ord a) => a -> Tree a -> Tree a
treeInsert x EmptyTree = singleton x
treeInsert x (Node a left right)
    | x == a = Node x left right --non inserisco se uguale
    | x < a  = Node a (treeInsert x left) right
    | x > a  = Node a left (treeInsert x right) 
```

In questo modo ho definito sia un albero, sia una funzione che mi permette di creare un albero binario di ricerca con valori tutti diversi.

```haskell
*Main> let nums = [8,6,4,1,7,3,5]
*Main> let numsTree = foldr treeInsert EmptyTree nums
*Main> numsTree
Node 5 (Node 3 (Node 1 EmptyTree EmptyTree) (Node 4 EmptyTree EmptyTree)) (Node 7 (Node 6 EmptyTree EmptyTree) (Node 8 EmptyTree EmptyTree))
```

##Funtori

```haskell
class Functor f where
	fmap :: (a -> b) -> f a -> f b
```

Per essere un funtore il tipo `f` (`f` è un tipo parametrico) deve avere una funzione `fmap` che data una funzione ...

L'idea è che un funtore è una generalizzazione della funzione `map`.

Esempio: `f` = costruttore `[]` dove `[] :: a -> [a]`
```haskell
instance Functor [] where
	fmap = map
```

```haskell
*Main> :t fmap
fmap :: Functor f => (a -> b) -> f a -> f b
*Main> :t map
map :: (a -> b) -> [a] -> [b]
*Main> :t []
[] :: [t]
```

Ovunque ci sia un "involucro" che contiene dei valori deve essere possibile "spalmare" su quei valori una funzione.

###Funtori su Maybe

```haskell
instance Func	tor Maybe where
	fmap f (Just x) = Just (f x)
	fmap f Nothing = Nothing
```
Quando mi trovo un `Just x` devo solo applicare `f` ad `x`.

Se non ho niente (`Nothing`) non faccio niente. Utile in quanto se `Nothing` rappresenta un'errore, questo risulta invariato.

###Funtori su un Tree

```haskell
instance Functor Tree where
	fmap f EmptyTree = EmptyTree
	fmap f (Node x leftsub rightsub) = Node (f x) (fmap f leftsub) (fmap f rightsub)
```
In questo modo riusciamo a spalamre l'esecuzione di una funzione su un albero.

Se l'albero è vuoto non faccio nulla.

Se l'albero ha un nodo, prima applico la funzione al nodo e poi la passo ai vari sotto alberi.

###Funtori su Either

```haskell
instance Functor (Either a) where
	fmap f (Right x) = Right (f x)
	fmap f (Left x) = Left x
```

In questo caso `f` viene spalmata solo su uno dei due tipi.

##Input/output

**L'input è impuro, ma tranquilli che non ci sono roghi.**

```haskell
main = do
	putStrLn "Hello world"
	name <- getLine -- questa è un'assegnazione ad una costante
	putStrLn name
```

Da notare i tipi

```haskell
*Main> :t putStrLn 
putStrLn :: String -> IO ()
*Main> :t getLine
getLine :: IO String
```












