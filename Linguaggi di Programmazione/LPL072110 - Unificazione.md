#Lezione 7 - Unificazione

Il significato della `->` in haskell:

```
tipo di una funzione f: a -> b -> c

            (->)
           /    \
         a      (->)
               /    \
              b      c

Rappresentato come stringa: 
->(a, ->(b,c))
```
Questo perché, essendo currificate, f è una funzione che dato un parametro `a` ritorna una funzione di tipo `b -> c`.

Se c'è un tipo funzione in mezzo, la cosa è la stessa:

```
tipo di una funzione f: a -> (b -> c) -> d

            (->)
           /    \
         a      (->)
               /     \
             (->)     d
            /    \
           b      c

Rappresentato come stringa:
->(a, ->((b->c), d)
```

Gli alberi di questo tipo possono essere confrontati a partire dalla radice e matchando le varie freccie, in questo modo è possibile definire delle equazioni tra i tipi delle foglie.

```
Alb1
            (->)
           /    \
         a      (->)
               /     \
             (->)     a
            /    \
           c     [a]
Alb2
            (->)
           /    \
         d      (->)
               /     \
              e       f

Alb2 = Alb1:
- d = a
- e = ->(c,[a])
- f = a               
```
In questo caso è preferibile utilizzare `/` come notazione al posto dell'`=`. Questo perché l'operazione che si fa è una sostituzione piuttosto che un'uguaglianza.

Nell'esempio di prima si ha:

```
a/d
a/f
e/->(c,[a])
```

In questo caso è necessario propagare il valore di `a`:

```
a/f
d/f
e/->(c,[f])

può essere espresso anche come (insieme di binding):
{a/f, e/->(c,[f]), d/f}
```

In questo caso non cambia nulla, ma è sempre preferibile tenere sempre lo stesso valore a destra, in questo caso `f`.

Una volta trovato un *binding* si devono fare le sostituzioni nei due alberi, se dopo le sostituzioni i due alberi sono uguali, allora ho trovato una soluzione.

Nelle esperessioni di binding, alla sinistra devono comparire solo variabili distince non non compaiono mai a destra.

Per indicare che si applica una sostituzione ad un albero si usa la notazione `T σ`.

L'applicazione di una sostituzione è idempotente:

```
(T σ) σ = T σ 
```

Tipicamente nella notazione non viene utilizzata la `->`, di solito si associa un'arietà ad ogni simbolo.

```
{f/3, f/4, g/2, a/0} + eventuali variabili
                
                f/4
           /    /  \   \
        /      /    \     \
       f/3    g/2    a     a
    /   | \    / \ 
    a   g  a  a  a
       / \
      a   a
```

Se un termine non ha variabili si dice *ground*.

## Composizione di sostituzioni

> σ<sub>1</sub> = {x<sub>1</sub>/t<sub>1</sub>, ..., x<sub>n</sub>/t<sub>n</sub>}
> σ<sub>2</sub> = {y<sub>1</sub>/s<sub>1</sub>, ..., y<sub>n</sub>/s<sub>n</sub>}

La composizione di queste due soluzioni è data da 

> σ<sub>1</sub> 𝜸 σ<sub>2</sub> = {x<sub>1</sub>/(t<sub>1</sub> σ<sub>2</sub>), ..., x<sub>n</sub>/(t<sub>n</sub> σ<sub>2</sub>)} ∪ {y<sub>j</sub>/s<sub>j</sub> | y<sub>j</sub> non è in {x<sub>1</sub> ... x<sub>n</sub>}}.

Anche se l'applicazione di una sostituzione è idempotente, la composizione non lo è.


##Preordine delle sostituzioni

Si dice che σ<sub>1</sub> >= σ<sub>2</sub> se esiste σ<sub>3</sub> tale che σ<sub>1</sub>𝜸σ<sub>3</sub> = σ<sub>2</sub>.

Questo vuol dire che per ottenere lo stesso effetto di σ<sub>2</sub> devo comporre σ<sub>1</sub> con un'altra sostituzione σ<sub>3</sub>.

Questo vuol dire che σ<sub>1</sub> è **più generale** di σ<sub>2</sub>, allo stesso modo, σ<sub>2</sub> è **più istanziata** di σ<sub>1</sub>

Ad esempio:

```
σ_1 = {x/y}
σ_2 = {x/[Int]}

allora 
σ_1 >= σ_2

e 
σ_3 = {y/[Int]}
σ_1 𝜸 σ_3 = σ_2
(anche se Filè dice che non è del tutto vero)
```

Se `σ_1 𝜸 σ_2 = σ_2` e `σ_2 𝜸 σ_1 = σ_1` allora si dice che le due sostituzioni sono equivalenti.

Una sostituzione è **ground** se non ha variabili nelle parti destre dei binding.

##Sistema di equazioni

Dato un sistema di equazioni `E`, si indica con `Gsol(E) o Grosol(E)` l'insieme delle sostituzioni che sono soluzioni ground di E.

Se `Gsol(E)` non è vuoto allora `E` è **risolvibile**, mentre se `Gsol(E) == Gsol(E')` allora si dice che `E` è **equivalente** ad `E'`.

Sistema di equazioni in forma risolta: `E = {x = f(y), z = f(g(y))}`, questo sistema è idempotente e le parti sinistre delle equazioni sono solo variabili.

σ<sub>E</sub> = {x/f(y), z/f(g(y))} è una soluzione di `E`, quindi `E` è una rappresentazione compatta di tutte le sue soluzioni, comprese quelle ground.

Se σ è una soluzione di ground di `E` allora σ <= σ<sub>E</sub>, cioè esiste una soluzione σ' tale che σ = σ<sub>E</sub> 𝜸 σ.

Questo vuol dire che σ<sub>E</sub> è la soluzione più generale di tutte e di conseguenza espire tutto `Grosol(E)`.

##Unificazione

Si parte da due insiemi di equazioni e si cerca di andare a fare delle sostituziomi e si cerca di arrivare ad un unico insieme di equazioni in forma risolta, facendo in modo che il numero di soluzioni ground non cambi.

1. f(t<sub>1</sub>,...,t<sub>n</sub>) = f(s<sub>1</sub>, ... , s<sub>n</sub>) --> {t<sub>1</sub> = s<sub>1</sub>, ... , t<sub>n</sub> = s<sub>n</sub>} : *pealing*: si passa da due termini con arietà *n* e si costruiscono *n* nuove equazioni per i tipi figli.
2. f(t<sub>1</sub>, ..., t<sub>n</sub>) = g(s<sub>1</sub>, ..., s<sub>k</sub>) --> stop con fallimento, perché ci sono dei termini che devono essere ground (???).
3. `x = x` --> vengono eliminate tutte le equazioni di questo tipo.
4. `t = x` con `t` non variabile viene trasformato in `x = t`. Trasformo le varie equazioni in modo che siano già in forma risolta.
5. Per tutte le equazioni del tipo `x = t`, con `t` diverso da `x` e `x` ha altre occorrenze in `E`, allora se `x` compare in `t` ho un fallimento (ovvero esiste un'equazione `x = t(x)`, questo tipo di equazione non può essere trattato), altrimenti sostituisco ogni occorrenza di `x` in `t` (Faccio la propagazione delle equazioni risolte).

###Esempio
```
{g(x)=g(g(z)), f(a,z)=f(a,y)}

    g   =   g 
    |       |
    x       g
            |
            z
        e
     
    f   =   f
   / \     / \
  a   z   a   y
  
passo alla notazione lineare

{ 
    x = g(z),
    a = a, //Può essere scartata (passo 3 dell'algoritmo)
    z = y
}

applico il passo 5 dell'algoritmo

{
    x = g(y) //Sostituisco z con y
    z = y
}

posso riespandere la notazione per ottenere i due alberi

    g   =   g 
    |       |
    g       g
    |       |
    y       y
     
        e
     
    f   =   f
   / \     / \
  a   y   a   y

```

###Correttezza dell'algoritmo

1. Dato un insieme di equazioni `E`, l'algoritmo termina sempre, perché ad ogni iterazione diminuisce il numero di equazioni.
2. Se termina senza fallire viene prodotto un nuovo insieme `E'`, in forma risolta e risolvibile, con `Grosol(E) = Grosol(E')`
3. Se l'algoritmo fallisce allora `E` non è risolvibile.

Dimostrazione:

1. Ogni trasformazione (1), (3) e (4) diminusice strettamente il numero di simboli nelle parti sinistre delle equazioni, quindi dopo un numero finito di applicazione di questi passi, o si termina o si applica il passo (5). Il che vuol dire che o si fallisce oppure vengono eliminate tutte le occorrenze di una variabile, meno una (ne viene lasciata una sola). Di conseguenza, il passo (5) si può applicare solo una volta per ogni variabile, da cui segue che il passo (5) può essere applicato al massimo tante volte quante sono le variabili distinte in `E`.
2. Per ogni passo E<sub>1</sub> --> E<sub>2</sub> che ha successo vale che hanno le stesse soluzioni.
    - (1): `f(u) = f(v) --> u = v`, questo perché una soluzione ground per la prima equazione porrebbe le variabili `u` e `v` ad uno stesso tipo, soddisfando anche la seconda equazione. Se le due equazioni sono più complesse, si applica lo stesso ragiornamento, ricorsivamente tra i vari sotto-termini.
    - (3): `t = x` --> `x = t`, questo perché è un'equazione.
    - (5): se viene applicato con successo con `x = t`, per ogni soluzione σ di E<sub>1</sub> deve essere che `(x) σ = (t) σ`, quindi dovunque in E<sub>1</sub> si trova `x`, questa può essere sostituita con `t`, mantenendo comunque la soluzione σ. (Manca la dimostrazione del fallimento, sarà nella prossima lezione).