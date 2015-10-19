#Lezione 7

In haskell non è necessario andare a specificare i tipi, si occupa il compilatore di fare *inferenza* di tipo.

##Inferenza di tipo

```haskell
let f x = 2 + x
f :: Num -> Num
```

In questo caso il compilatore inferisce che `x` è di tipo `Num` in quanto `2` è una costatnte di tipo `Num`.

Il compilatore traforma `fun f x = 2 + x` in `*lamba*x.((+2)x)` e crea una specie di albero.

Vengono poi valutati i tipi delle foglie, che in questo caso sono `Num -> Num -> Num` per l'operatore `+` e `Num` per la costante `2`.

L'albero è composto da due tipi di nodi: `lambda` o vincoli per astrazione e `@` per i vincoli applicazione.

Vincolo per astrazione: `(lambda x.y)` se `x` è di tipo `a` e `y` è di tipo `b`, allora il tipo è `a -> b`.

Vincolo per applicazione: se `f` ha tipo `a`, il suo argomento `e` ha tipo `b` e `(f e)` ha tipo `c` allora: `a = b -> c`.

Il nodo `labmda` è associato alla funzione anonima e genera un vincolo `r = u -> s`, con `u` che è una variabile di tipo per `x` e `s` è il tipo del valore di ritorno.

Quando viene valutato il nodo `@` per `+` e `2` il compilatore genera il vincolo `Num -> Num -> Num = Num -> t`. Perché il vincolo sia soddisfatto `t` deve essere uguale a `Num -> Num`

Per l'altro nodo `@` tra `+2` e `x` viene generator il vincolo `t = u -> s`.

Infine, sapendo che `t = Num -> Num` allora `t = u -> s ==> u = Num, s = Num`.

Possono verificarsi delle situazioni *circolari* in cui non si riesce ad inferire in modo automatico i tipo. Questo perché una variabile di tipo può dipendere da un'altra variabile di tipo che a sua volta dipende dalla prima.

---

Immagine desktop

---

_La profondità dell'albero viene influenzata dal fatto che le funzioni sono currificate_.

##Inferenza di tipo per funzioni ricorsive

In questo caso si aggiunge il vincolo che il tipo della funzione deve essere uguale a quello presente come nodo dell'albero.

In modo simile per le funzioni con definizioni multiple deve avere il vincolo il tipo di tutte le funzioni coincida.

**vedi esercizio quaderno**





















