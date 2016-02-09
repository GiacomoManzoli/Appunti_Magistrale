#Lezione 15 - Funtori e Funtori Applicativi

```haskell
class Functor f where
    fmap :: (a->b) -> f a -> f b
```

`f` è un tipo parametrico (*type constructor*) quindi `(f a)` indica il tipo `f` instanziato con `a`.

I funtori devono avere solo un tipo parametrico.

```haskell
instance Functor Maybe where
    fmap f (Just x) = Just (f x)
    fmap f Nothing = Nothing 

instance Functor Tree where
    fmap f EmptyTree = EmptyTree
    fmap f (Node x leftsub rightsub) = Node (f x) (fmap f leftsub) (fmap f rightsub) 

instance Functor (Either a) where
    fmap f (Right x) = Right (f x)
    fmap f (Left x) = Left x -- La parte left è fissa.
```

##Funtori Applicativi

I funtori permettono di spalmare una funzione su un oggetto "scatola" e che ritorna un altro oggetto scatola.

```haskell
class (Functor f) => Applicative f where
    pure :: a -> f a
    (<*>) :: f (a -> b) -> f a -> f b

(<$>) :: (Functor f) => (a -> b) -> f a -> f b
f <$> x = fmap f x
```

`pure :: a -> f a` da un tipo qualsiasi ritorna un funtore istanziato a quel tipo.

Le `( )` nella definizione del tipo rappresentano una funzione infissa.

```haskell
instance Applicative Maybe where
    pure = Just
    Nothing <*> _ = Nothing
    (Just f) <*> something = fmap f something

f <$> something = fmap f something

```

```haskell
ghci> :t pure (+)
pure (+) :: (Num a, Applicative f) => f (a -> a -> a)
ghci> :t pure (+) <*> Just 3
pure (+) <*> Just 3 :: Num a => Maybe (a -> a)
ghci> pure (+) <*> Just 3 <*> Just 5
Just 8
ghci> (+) <$> Just 3 <*> Just 5
Just 8
ghci> (+) <$> Just 3 <*> Nothing
Nothing
ghci> (+) <$> Nothing <*> Just 5
Nothing
```

Un funtore applicativo viene quindi utilizzato per eseguire una funzione all'interno di altri alcuni funtori.

```haskell
instance Applicative [] where
    pure = [x]
    fs <*> xs = [f x | f <- fs, x <- xs] 
```

```
ghci> [(*0),(+100),(^2)] <*> [1,2,3]
[0,0,0,101,102,103,1,4,9]
ghci> [(+),(*)] <*> [1,2] <*> [3,4]
[4,5,5,6,3,4,6,8]
ghci> filter (>50) $ pure (*) <*> [2,5,10] <*> [8,10,11]
[55,80,100,110]
```

Da notare che il numero di `<*>` deve coincidere con tutti il numero dei parametri delle funzione che viene "*purificata*".

```
pure (,,):: Applicative f => f (a->b->c->(a,b,c))
```
Il “resto” determina il funtore f: guarda gli esempi seguenti

```
-- f=Maybe
ghci> k = pure (,,)<*> Just "pippo"<*> Just "pluto"<*> Just "pappa”
Just ("pippo","pluto","pappa")
-- f=list
ghci> z = pure (,,) <*> ["pure","dopo"] <*> ["pippo","pluto"] <*> [3]
[("pure","pippo",3),("pure","pluto",3),("dopo","pippo",3),("dopo","plu
to",3)]
```

Da notare che non posso mettere `3` al posto di `[3]` perché serve un funtore e `3` non lo è.

Giocando con le liste sarebbe bello poter arrivare ad avere la possibilità di fare questo:

```
[(+), (*), (/)] <*> [1,2,3] <*> [2,3,4] =[1+2,2*3,3/4]
```

Per fare ciò è possibile definire il tipo `ZipList`, che è un funtore applicativo definito come:

```haskell
instance Applicative ZipList where
    pure x = ZipList (repeat x) --Serve per limitare il numero di elemeni alla lunghezza della prima lista
    ZipList fs <*> ZipList xs = ZipList (zipWith (\f x -> f x) fs xs)
```

Anche `r -> a` è un funtore applicativo.

```haskell
instance Applicative ((->) r) where
    pure x = (\_ -> x)
    f <*> g = \x -> f x (g x) 
```

```
ghci> :t pure (+) <*> (+3) <*> (*100)
pure (+) <*> (+3) <*> (*100) :: (Num a) => a -> a
ghci> pure (+) <*> (+3) <*> (*100) $ 5
508
```

`5` viene usato prima come operando di `(*100)` e poi viene usato come operando per `(+3)`, dopodiché ai due risultati viene applicata la funzione `(+)`, ottenendo così `508`.

```
ghci> pure (\x y z -> [x,y,z]) <*> (+3) <*> (*2) <*> (/2) $ 5
[8.0,10.0,2.5]
```

```haskell
sequenceA :: (Applicative f) => [f a] -> f [a]
sequenceA [] = pure []
sequenceA (x:xs) = (:) <$> x <*> sequenceA xs
```

```haskell
ghci> sequenceA [Just 3, Just 2, Just 1]
Just [3,2,1]
ghci> sequenceA [Just 3, Nothing, Just 1]
Nothing
ghci> sequenceA [(+3),(+2),(+1)] 3
[6,5,4]
{-
    f = a->b
    sequenceA ::[a->b] -> a->[b]
-}
ghci> sequenceA [[1,2,3],[4,5,6]]
[[1,4],[1,5],[1,6],[2,4],[2,5],[2,6],[3,4],[3,5],[3,6]]
```


