#Compitino 2 - Linguaggi 15-16

##Domanda  1

Inferire il tipo della seguente funzione:

```haskell
f x [] [] = []
f x (a:b) (c:d) = (x a c):(f x b d)f x (a:b) []=(x a a):(f x b [])f x [] (c:d)=(x c c):(f x [] d)
```
Gestire il fatto che si usa il pattern matching con una piccola prova separata dall'inferenza di f. 

Numerare i nodi degli alberi costruiti per l'inferenza e per ogni vincolo mostrare da quale nodo esso proviene.### Soluzione

1. Trovare il tipo per il caso base, è banale.
2. Trovare il tipo per il primo caso e porlo uguale al tipo del caso base
3. Trovare il tipo per uno degli altri casi e porlo uguale agli altri

Non dovrebbe essere necessario valutare anche il quarto caso per arrivare ad avere il tipo completo.

Il tipo finale di `f` è:

```
f :: (t -> t -> t1) -> [t] -> [t] -> [t1]
```##Domanda 2Applicare l'algoritmo di unificazione sull'insieme di vincoli prodotto da uno dei casi della funzione f del punto precedente. 

Non il primo caso. 

Basta fare solo qualche passo. Cercate di mostrare l'applicazione dei passi 1 e 5 dell'algoritmo.

### Soluzione

Riassumento i passi dell'algoritmo:

- **passo 1**: f(t<sub>1</sub>,...,t<sub>n</sub>) = f(s<sub>1</sub>, ... , s<sub>n</sub>) --> {t<sub>1</sub> = s<sub>1</sub>, ... , t<sub>n</sub> = s<sub>n</sub>}
- **passo 2**: fallimento nel caso un'equazione contenga due espressioni diverse f(t<sub>1</sub>, ..., t<sub>n</sub>) = g(s<sub>1</sub>, ..., s<sub>k</sub>)
- **passo 3**: rimozione delle equazioni trivali come `x = x`
- **passo 4**: spostamento delle variabili nella parte sinistra delle equazioni
- **passo 5**: sostituzione delle equazioni: se nel sistema di equazioni c'è l'equazione `x=t` e ci sono delle altre equazioni in cui compare `x`, applicare a queste equazioni la sostituzione `x/t`. Se c'è un equazione del tipo `x = t(x)`, l'algoritmo fallisce.

Un possibile insieme di equazioni derivate dalla domanda 1 è:

```
1) F = X->P
2) P = [A]->Q
3) Q = [B]->R
4) G = U->R
5) T = B->S
6) X = A->T
7) V = [B]->U
8) Z = [A]->V
9) F = X->Z
10) K->[K]->[K] = S->G 
```
Ad esempio è possibile applicare il passo 5 alle equazioni 1 e 9, sostituendo `F` con `X->P` alla seconda equazione:

```
X->P = X->Z
```
Ottenendo così una nuova equazione alla quale è possibile applciare il passo 1 sostituendola con le due equazioni:

```
X = X
P = Z
```
`X = X` può essere eliminata per il passo 3.

Dopo aver eseguito questi passi l'insieme delle equazioni è diventato il seguente

```
1) F = X->P
2) P = [A]->Q
3) Q = [B]->R
4) G = U->R
5) T = B->S
6) X = A->T
7) V = [B]->U
8) Z = [A]->V
10) K->[K]->[K] = S->G
11) P = Z
```
L'esecuzione dell'algoritmo non è ancora terminata inquanto il sistema non è ancora in forma risolta, ad esempio è possibile applicare il passo 5 sostituendo nelle varie equazioni `P=Z`:

```
1) F = X->Z
2) Z = [A]->Q
3) Q = [B]->R
4) G = U->R
5) T = B->S
6) X = A->T
7) V = [B]->U
8) Z = [A]->V
10) K->[K]->[K] = S->G
11) P = Z
```

In modo analogo è ora possibile applicare il passo 5 alle equazioni 2 e 8:

```
[A]->Q = [A]->V
```
Applicando i passi 1 e 3 si ottiene una nuova equazione `Q = V`.
```
1) F = X->Z
2) Z = [A]->Q
3) Q = [B]->R
4) G = U->R
5) T = B->S
6) X = A->T
7) V = [B]->U
10) K->[K]->[K] = S->G
11) P = Z
12) Q = V
```

Ora è possibile applicare il passo 5 con `Z = [A]->Q`, ottenendo

```
1) F = X->[A]->Q
2) Z = [A]->Q
3) Q = [B]->R
4) G = U->R
5) T = B->S
6) X = A->T
7) V = [B]->U
10) K->[K]->[K] = S->G
11) P = [A]->Q
12) Q = V
```

Continuando ad applicare l'algoritmo prima o poi si arriverà ad un punto fisso, ottenendo così il sistema di equazioni in forma risolta.
##Domanda 3Spiegare (brevemente) la dimostrazione di correttezza dell'algoritmo di unificazione.###SoluzioneLa correttezza dell'algoritmo si dimostra in 3 parti:

1. L'algoritmo termina sempre
2. Se termina senza fallire si ottiene un sistema in forma risolta
3. Se fallisce allora il sistema è irrisolvibile

####1. Terminazione

Ogni applicazione dei passi 1,3 e 4 dell'algoritmo diminusice strettamente il numero di simboli nelle parti sinistre delle equazioni del sistema.

Quindi è possibile ripetere per un numero finito di volte questi passi finché non si verifichi una di queste condizioni:

- Non è più possibile applicare questi passi perché tutte le equazioni hanno una sola variabile nella parte sinistra. Questo vuol dire che il sistema è in forma risolta ed è corretto che l'algortimo termini.
- Si verifica un fallimento per il passo 2 (correttezza discussa dopo)
- Si può applicare il passo 5, il quale va a eliminare dal sistema tutte le occorrenze di una variabile in modo che rimanga una sola occorrenza di quella variabile. Di conseguenza questo passo può essere applicato tante volte quante sono le variabili del sistema. Il passo 5 può fallire e la correttezza di ciò viene trattata dopo).

Segue che l'algoritmo termina sempre dopo un numero finito di passi.

####2. Sistema in forma risolta

Se l'algoritmo termina senza fallire viene prodotto un nuovo insieme `E'`, in forma risolta e risolvibile, con `Grosol(E) = Grosol(E')`.

I passi dell'algoritmo che possono andare a modificare le soluzioni del sistema sono 1, 3 e 5.

#####Passo 1

Se σ è una soluzione per il sistema iniziale, questa può essere applicata all'equazione f(u<sub>1</sub>,..., u<sub>n</sub>) = f(v<sub>1</sub>,..., v<sub>n</sub>), ottenendo così f(u<sub>1</sub>,..., u<sub>n</sub>) σ = f(v<sub>1</sub>,..., v<sub>n</sub>) σ. 

Perché questo sia vero è necessario che σ renda i vari u<sub>i</sub> e v<sub>i</sub> uguali.

Il che vuol dire che per ogni *i*, u<sub>i</sub> σ = v<sub>i</sub> σ.

Ma se questo accade allora σ è anche una soluzione per l'equazione u<sub>i</sub> = v<sub>i</sub> e dal momento che il passo 1 sostituisce f(u<sub>1</sub>,..., u<sub>n</sub>) = f(v<sub>1</sub>,..., v<sub>n</sub>) con u<sub>1</sub> = v<sub>1</sub> ... u<sub>n</sub> = v<sub>n</sub>, se σ è una soluzione per la prima equazione allora è anche una soluzione per tutte le nuove equazioni.

#####Passo 3

Banalmente il passo 3 rovescia un equazione, quindi se σ è una soluzione per l'equazione originale lo è anche per quella ottenuta applicando il passo 3.

#####Passo 5

Se l'esecuzione del passo ha successo, per ogni soluzione σ di E deve essere che `x σ = t σ` quindi, per ogni equazione in E contentente `x` possiamo sostituire `x` con `t` mantenendo la soluzione σ.

Bisogna comunque dimostrare che le soluzioni ground rimangono.
Se applico σ al risultato dell'esecuzione del passo, se una soluzione è ground per il risultato, questa deve essere una soluzione valida anche per il sistema di equazioni originario.

####3. Correttezza dei fallimenti

##### Passo 2

Se si verifica un fallimento a causa del passo 2 vuol dire che c'è un'equazione nel sistema del tipo: f(t<sub>1</sub>, ..., t<sub>n</sub>) = g(s<sub>1</sub>, ..., s<sub>k</sub>).

Questa equazione non ha soluzioni, pertanto neanche il sistema che la contiene può averne, la terminazione dell'algoritmo con fallimento è corretta. ##### Passo 5

Se il passo 5 fallisce vuol dire che il sistema contiene un'equazione del tipo `x = t(x)`, questa equazione non ha soluzione e quindi è corretto che l'algoritmo termini con un fallimento.##Domanda 4Dato il tipo: 

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