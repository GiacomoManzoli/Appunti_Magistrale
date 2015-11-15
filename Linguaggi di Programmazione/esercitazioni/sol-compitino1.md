#Compitino 1

##Domanda 1

Con HALT indichiamo il problema della terminazione delle macchine di Turing con un certo input e con Halt\_Ø quello della terminazione delle macchine di Turing con nastro vuoto. 

Mostrare come sia possibile sia ridurre HALT a HALT\_Ø che ridurre HALT\_Ø a HALT.### Soluzione
Il
HALT è il problema:

> HALT(P, x) = SI --> P(x) termina
> 
> HALP(P, x) = NO --> P(x) non termina

È noto che questo problema è indecidibile.

Il problema HALT\_Ø può essere visto come un caso particolare di HALT con x = Ø.

> HALT --> HALT\_Ø
> 
> \<P, x\> --> \<P, Ø\>

Adesso basta trovare una macchina di turing che si comporta come P(x), questa macchina può essere definita come

> P<sub>Ø</sub> = P' : P

Dove P' è un programma che cancella il nastro di P.

Per definizione P' termina sempre, quindi la terminazione di P<sub>Ø</sub> dipende dalla terminazione di P, la quale non è decidibile, quindi anche la terminazione di P<sub>Ø</sub> non è decidibile.

In modo analogo è possibile ridurre HALT\_Ø a HALT.

In questo caso l'ipotesi è che la terminazione del programma P<sub>Ø</sub> non è decibile e la si vuole utilizzare per dimostrare che la terminazione di una macchina generica P su una stringa qualsiasi x non è decidibile.

> HALT\_Ø --> HALT  
> 
> \<P, Ø\> --> \<P, x\>  

L'idea è quella di trovare una macchina di turing Q che con qualsiasi stringa x in input si comporti come P(Ø).

> Q = P':P

Dove P' è una macchina che cancella il pulisce il nastro in input di P.

In questo caso, per qualsiasi input x, Q(x) si comporta come P(Ø), quindi la decidibilità della terminazione di Q dipende dalla decidibilità di P(Ø), che sappiamo non essere decidibile.

P' non influenza la decidibilità di Q in quanto, per come è definito, termina sempre.
##Domanda 2La garbage collection si basa sulla seguente proprietà dei dati di un programma: questo dato servirà/non servirà nel futuro del calcolo del programma. 

Questa proprietà è decidibile? Sostenere la risposta con qualche argomento.
##Domanda 3Nel caso la proprietà (2) fosse non decidibile, proporre un’approssimazione utile per realizzare la garbage collection in modo corretto.##Domanda 4
Scrivere una funzione Haskell `f l`, dove `l` è di tipo polimorfo `[a]` (lista di tipo base `a`), e tale che restituisca una quadrupla i cui elementi sono di tipo `[a]` e tali che il primo elemento sia la lista contenente i primi due elementi di `l`, il secondo elemento sia la lista contenente i successivi 2 elementi di `l` (cioè il terzo e quarto della lista originale), il terzo elemento sia la lista con i successivi 2 elementi (il quinto e sesto) e infine il quarto ed ultimo elemento sia il resto di `l` (dal settimo in poi).

In caso `l` non abbia almeno 6 elementi, le componenti della quadrupla conterranno gli elementi presenti dopo di che diventeranno la lista vuota. Per esempio, se `l` contiene 4 elementi, il terzo e il quarto elemento della quadrupla saranno la lista vuota. Se l contiene 5 elementi, il terzo elemento della quadrupla conterrà la lista con l'ultimo elemento di `l`, mentre il quarto elemento della quadrupla sarà la lista vuota.

###Soluzione

Versione con tanto pattern matching

```haskell
f :: [a] -> ([a],[a],[a],[a])
f [] = ([],[],[],[])
f (a:[]) = ([a],[],[],[])
f (a:b:[]) = ([a,b],[],[],[])
f (a:b:c:[]) = ([a,b],[c],[],[])
f (a:b:c:d:[]) = ([a,b],[c,d],[],[])
f (a:b:c:d:e:[]) = ([a,b],[c,d],[e],[])
f (a:b:c:d:e:f:[]) = ([a,b],[c,d],[e,f],[])
f (a:b:c:d:e:f:r) = ([a,b],[c,d],[e,f],r)
```

Versione migliore

```haskell
f :: [a] -> ([a],[a],[a],[a])
f l =  let
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
##Domanda 5Compilazione ed interpretazione sono 2 tecniche per arrivare ad eseguire i programmi. Confrontarle spiegando quali vantaggi/svantaggi sono offerti da ciascuna tecnica.##Domanda 6
Rispetto a quali proprietà ha senso confrontare i linguaggi di programmazione e rispetto a quali altre proprietà non ha senso questo confronto?##Domanda 7La tesi di Church è un teorema ? Spiegare.

##Domanda 8Cosa sono le classi di tipo in Haskell?##Domanda 9Che differenza c'è tra i linguaggi imperativi e quelli dichiarativi? 

##Domanda 10

Cos'è una macchina virtuale?

