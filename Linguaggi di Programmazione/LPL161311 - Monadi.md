#Lezione 16 - Monadi

-- Assente --

[Funtori, applicativi e monadi](http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html)

```haskell
data Maybe a = Nothing | Just a
```

`Maybe` è un datatype di default che è sia un funtore, sia un applicativo che una monade e verrà utilizzato per fare i vari esempi. 

##Funtori

Permettono di esegurie delle funzioni su valori che sono raccolti all'interno di un contesto.

Perché un tipo si comporti come funtore, deve istanziare la typeclass `Functor` fornendo una definizione per la funzione `fmap`:

```haskell
instance Functor Maybe where
    fmap func (Just val) = Just (func val)
    fmap func Nothing = Nothing
```

Un esempio di utilizzo è dato da

```haskell
> fmap (+3) (Just 2)
Just 5
```

che è equivalente a scrivere

```haskell
> (+3) <$> Just 2
Just 5
```

Le funzioni in Haskell sono a loro volta dei funtori, così come le liste.

##Applicativi

Funtori particolare che possono racchiudere anche delle funzioni.

```haskell
> (+) <$> (Just 5)
Just (+5)
> Just (+5) <*> (Just 3)
Just 8
> (*) <$> Just 5 <*> Just 3
Just 15
```

Perché un tipo di comporti come applicativo deve istanziale la typeclass `Applicative`

```haskell
class (Functor f) => Applicative f where  
    pure :: a -> f a  
    (<*>) :: f (a -> b) -> f a -> f b  
```

Ad esempio `Maybe` è definito in questo modo

```haskell
instance Applicative Maybe where  
    pure = Just  
    Nothing <*> _ = Nothing  
    (Just f) <*> something = fmap f something 
```

##Monadi

Le monadi permetto di estrarre il valore da un contesto e di applicarci una funzione che ritorna una monade contenente il risultato dell'applicazione della funzione.

Data la funzione `half` che dato un intero restituisce un valore `Maybe` contenente la metà del valore dato.

```haskell
half x = if even x
           then Just (x `div` 2)
           else Nothing
```

Non è possibile invocare `half (Just 2)`.

Tuttavia usando le monadi si riesce ad eseguire le seguenti operazioni:

```haskell
> Just 3 >>= half
Nothing
> Just 4 >>= half
Just 2
> Nothing >>= half
Nothing
```

Una monade è quindi una typeclass che richiede la definzione della funzione `>>=`:

```haskell
class Monad m where
    (>>=) :: m a -> (a -> m b) -> m b
```

Una funzione che data una monade e una funzione applicabile al contenuto della monade, ritorna una nuova monade conentene la funzione applicata al valore iniziale.

`Maybe` definisce la funzione in questo modo

```haskell
instance Monad Maybe where
    Nothing >>= func = Nothing
    Just val >>= func  = func val
```

In questo modo è possibile concatenare l'esecuzione delle funioni:

```haskell
> Just 20 >>= half >>= half >>= half
Nothing
```

###Typeclass Monad

La typeclass precedenemente riportata non è completa.

La versione corretta è:

```haskell
class Monad m where  
    return :: a -> m a  
  
    (>>=) :: m a -> (a -> m b) -> m b  
  
    (>>) :: m a -> m b -> m b  
    x >> y = x >>= \_ -> y  
  
    fail :: String -> m a  
    fail msg = error msg  
```

`return` permette di creare una monade a partire da un valore.

`>>` è una cosa strana e poco usata, viene implementata di default.


###Esempio d'uso delle monadi

```haskell
type Birds = Int
type Pole = (Birds, Birds)


landLeft :: Birds -> Pole -> Maybe Pole
landLeft n (left,right)
    | abs ((left + n) - right) < 4 = Just (left +n , right)
    | otherwise                    = Nothing 

landRight :: Birds -> Pole -> Maybe Pole
landRight n (left, right)
    | abs ((right + n) - left) < 4 = Just (left, right + n)
    | otherwise                    = Nothing 
```

È possibile concatenare l'esecuzione di queste funzioni utilizzando le monadi:

```haskell
Main> return (0,0) >>= landLeft 2
Just (2,0)
Main> return (0,0) >>= landLeft 2 >>= landRight 2
Just (2,2)
Main> return (0,0) >>= landLeft 2 >>= landRight 2 >>= landRight 4
Nothing
Main> return (0,0) >>= landLeft 2 >>= landRight 2 >>= landRight 4 >>= landLeft 2
Nothing
```