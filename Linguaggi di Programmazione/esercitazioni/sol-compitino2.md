#Compitino 2 - Linguaggi 15-16

##Domanda  1

Inferire il tipo della seguente funzione:

```haskell
f x [] [] = []
f x(a:b)(c:d)=(xac):(f xbd)f x(a:b)[]=(xaa):(f xb[])f x[] (c:d)=(xcc):(f x[]d)
```
Gestire il fatto che si usa il pattern matching con una piccola prova separata dall'inferenza di f. 

Numerare i nodi degli alberi costruiti per l'inferenza e per ogni vincolo mostrare da quale nodo esso proviene.##Domanda 2Applicare l'algoritmo di unificazione sull'insieme di vincoli prodotto da uno dei casi della funzione f del punto precedente. 

Non il primo caso. 

Basta fare solo qualche passo. Cercate di mostrare l'applicazione dei passi 1 e 5 dell'algoritmo.

##Domanda 3Spiegare (brevemente) la dimostrazione di correttezza dell'algoritmo di unificazione.##Domanda 4Dato il tipo: 

```
data Tree a = EmptyTree | Node a (Tree a ) (Tree a ) deriving (Eq,Show);
```Definire una funzione `treeinsert` (con tipo `Ord a=>a->Tree a -> Tree a`) capace di costruire un albero Binario di Ricerca di tipo `Tree a`.Usare `foldr` per costruire un albero binario di ricerca che abbia nei nodi interni delle liste `[Int]` e che usa una lista di liste `[[Int]]`.Definire `Tree` come un'istanza di `Functor` e quindi definire la funzione `fmap` caratteristica di `Functor` in modo da poter "spalmare" sull'albero precedentemente prodotto funzioni adatte a venire applicate su liste di `Int`, come `(1:)` oppure `(map (1+))`

###Soluzione

```haskell
data Tree a = EmptyTree | Node a (Tree a) (Tree a) deriving (Eq, Show, Read)

-- Esercizio 4.a

tree1 = Node 12 EmptyTree EmptyTree

-- Inserisce x in un albero binario di ricerca
treeInsert x EmptyTree = Node x EmptyTree EmptyTree
treeInsert x (Node n l r) -- NB: Quando si usano le guardie non bisogna mettere l'uguale
    | x == n = error "Valore già presente"
    -- Inserisco a sinistra
    | x < n = Node n (treeInsert x l) r
    -- Inserisco a destra
    | x > n = Node n l (treeInsert x r)

-- provami con:
-- treeInsert 1 tree1

-- Per accedere ai vari valori di un tipo ricevuto come parametro conviene utilizzare il pattern matching


-- Esercizio 4.b

listoflist = [[1..3], [1..5], [1..4]]

-- foldr :: Foldable t => (a -> b -> b) -> b -> t a -> b
listTree l = foldr treeInsert EmptyTree l

-- Provami con:
-- listTree listoflist

-- Esercizio 4.C

instance Functor Tree where
    -- Caso base: La funzione invocata su un albero vuoto è l'albero vuoto
    fmap f EmptyTree = EmptyTree 
    fmap f (Node a l r) = Node (f a) (fmap f l) (fmap f r)

let x2 x  = x * 2

-- Provami con:
-- fmap x2 tree1
```