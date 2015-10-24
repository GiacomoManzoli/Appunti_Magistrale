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