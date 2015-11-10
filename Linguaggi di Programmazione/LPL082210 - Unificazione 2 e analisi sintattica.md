#Lezione 8 - Unificazione 2 e Analisi Sintattica

##Unificazione (cont'd)

*Dimostrazione della correttezza dell'algoritmo di unione*

###Dimostrazione del punto (2)
Per ogni passo E<sub>1</sub> -> E<sub>2</sub> che ha successo vale che i due insiemi hanno le stesse soluzioni ground.

**Passo (1)**: f(u<sub>1</sub>,..., u<sub>n</sub>) = f(v<sub>1</sub>,..., v<sub>n</sub>) --> u<sub>1</sub> = v<sub>1</sub> ... u<sub>n</sub> = v<sub>n</sub>

Prendendo una soluzione σ e applicandola u<sub>1</sub> σ, questo deve essere uguale a v<sub>1</sub> σ, il che applicato a tutte le varie equazioni le rende trivialmente verificiate.

**Passo (3)**: `t = x` --> `x = t`, questo perché è un'equazione.

**Passo (5)**: applicazione delle uguaglianze `x = t`.

Se l'applicazione ha successo, per ogni soluzione σ di E<sub>1</sub> deve essere che `x σ = t σ` quindi per ogni equazione in E<sub>1</sub> contentente `x` possiamo sostiturla con `t` mantenendo la soluzione σ.
Bisogna comunque dimostrare che le soluzioni ground rimangono, ma se applico σ al risultato, se una soluzione è ground per il risultato, questa deve essere una soluzione valida anche per il sistema di equazioni originario.

Alla fine del processo, se non c'è un fallimento, si raggiunge E<sub>2</sub> che è in forma risolta, questo perché se non fosse vero potrei applicare delle altre regole e quindi non avrei terminato.

**Forma risolta**: sistema composto da equazioni che nella parte sinistra hanno solo una variabile. Quando un sistema è espresso in questa forma diventa una rappresentazione compatta di tutte le sue possibili soluzioni.

*dimostrazione in qualche modo di quello che c'è scritto sopra*

{x<sub>1</sub>, ..., x<sub>n</sub>} sono tutte distinte e {x<sub>1</sub>,..,x<sub>n</sub>} ∩ l'unione di Var(t<sub>i</sub>) = ∅:

1. parte a destra non variabile --> non può essere, potrei applicare il passo 1 e quindi non ho terminato
2. le x<sub>i</sub> non sono tutte diverse --> ci sono due x<sub>i</sub> uguali, posso ancora applicare il passo (5) quindi non ho terminato
3. una x<sub>i</sub> compare in qualche t<sub>j</sub> (compare a destra di una equazione) --> posso ancora applicare (5). 

Se va tutto bene, l'algoritmo termina e il sistema di equazioni è già in forma risolta e consiste anche in una possibile soluzione generale per il sistema di equazioni di partenza.

###Dimostrazione dei casi di fallimento dell'algoritmo

**Fallimento dovuto al caso (2)**: è ovvio che non ci sono soluzioni per `f(...) = g(...)` non ci sono neanche soluzione per il sistema.

**Fallimento dovuto al caso (5)**: E<sub>1</sub> contiene `x = t` con `t` non vuoto e che contiene `x`, questa equazione quindi non ha soluzione, pertanto anche E<sub>1</sub> non ha soluzione.

###Considerazioni finali

In caso di successo E' è in forma risolta e quindi lo possiamo vedere come una soluzione σ<sub>E'</sub> e funziona sia come soluzione di E' (banalmente perché è in forma risolta e istanziando ulteriormente σ<sub>E'</sub> otteniamo tutte le soluzioni ground di E') sia come soluzione di E, perché tutte le soluzioni ground di E' sono anche soluzioni di E (per costruzione di E').

Inoltre, σ<sub>E'</sub> è una soluzione più generale di E, perché per ogni altra soluzione σ di E, σ<sub>E'</sub> >= σ. (**most general unifier**) 

Possono esistere diversi unificatori più generali, ma sono sempre un numero finito e sono tutti "quasi uguali".

Ad esempio { w/f(v), x/u, y/u, z/v } e { w/f(z), x/y, u/y, v/z} sono equivalenti.

Infatti in entrambe {x=u=y} e {z=v} ma sono sostituzioni che rappresentano questo in modo diferso.

Sono quindi delle variabili di tipo che restano libere e scegliere un nome al posto di un altro per una variabile è indifferente.

{y/u, z/v} e {u/y, v/z} rappresentano la stessa classe di variabili.

Per la cronaca: le cose si complicano se si considerano sostituzioni non idempotenti, in questo caso esisstono un'infinità di unificatori più generali.

Cosa abbiamo dimostrato sulla type inference di Haskell?

- È sempre decidibile;
- Come derivare il tipo principale (che coincide con l'unificatore più generale).

##Analisi sintattica

Grammatica libera da contesto per le espressioni:
> e ::= n | e + e | e - e
> n ::= d | nd
> d ::= 0 | 1 | 2 | ...

Vengono fatte delle derivazioni che generano forme sentenziali, fino ad arrivare a stringhe terminali che rappresentano il linguaggio generato dalla grammatica.

Ogni derivazione di una grammatica può essere rappresentata come un albero.

> e -> e - e -> n - e -> n - e + e -> ... -> 10 - 15 + 12

```
        e
    /   |   \
   e    -    e
   |     /   |   \
   n    e    +   e
   |    |        |
   10   n        n
        |        |
        15       12
```

L'albero oltre che a specificare la stringa visualizzata, specifica anche l'ordine in cui la stringa deve essere valutata, che in questo caso è `10 - (15 + 12)`.

Questo albero per noi è fondamentale in quanto lo usiamo per generare codice.

La generazione dell'albero però può essere ambigua, in quanto la stessa espressione `10 - 15 + 12` può essere generata da due alberi dirversi che specificano un ordine di valutazione dell'espressione in modo diverso, che portano a risultati diverse.

Una grammatica alternativa che permette di generare le stesse espressioni in modo non ambiguo è data da:

> e    ::= num | e <op> num
> <op> ::= + | -

In questo modo viene vincolata la precedenza a sinistra tipica delle espressioni algebriche.

Però questa grammatica non permette la parentesizzazione delle espressioni.

> e    ::= o | e <op> o
> o    ::= num | (e)
> <op> ::= + | -

La grammatica rimane comunque non ambigua.

Ci sono però dei linguaggi che sono interamente ambigui, però per quello che riguarda i linguaggi di programmazione è facile creare delle grammatiche non ambigue.