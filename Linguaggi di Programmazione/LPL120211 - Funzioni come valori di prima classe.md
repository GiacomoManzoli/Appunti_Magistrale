#Lezione 12

##Funzioni come valori di prima classe

Un linguaggio tratta le funzioni come entità di prima classe se:

1. Una funzione può essere dichiarata in un qualsiasi blocco
2. Una funzione può essere passata come argomento ad un'altra funzione (**downward funarg problem**)
3. Una funzione può essere restituita come risultato di una funzione (**upward funresult problem**)

Il punto **1** implica che la definizione di una funzione crea un record di attivazione che custodisce la chiusura (RA, C) della funzione.

Il punto **2** implica che per passare una funzione F ad un'altra funzione significa passare il valore di F, cioè la sua chiusura.

C'è una differenza tra l'uso di una funzione passata come parametro ad un'altra funzione e l'utilizzo di una funzione globale all'interno di un'altra funzione. 

Nel primo caso il compilatore sa che riceverà una chiusura, mentre nel secondo caso il compilatore sa la funzione esatta che verrà invocata.

Con lo scoping dinamico il compilatore riesce a raggiungere una variabile globale calcolandosi direttamente un offset a partire dalla cima dello stack, questo perché ha un modello preciso della struttura dello stack durante l'esecuzione.

Con lo scoping statico il compilatore non riesce a calcolare un offeset preciso, perché se ci sono invocazioni ricorsive la distanza dal top dello stack al blocco della definizione delle funzioni è variabile.

Il punto **3** crea qualche problema, perché se l'invocazione di una funzione definisce e ritorna una nuova funzione c'è un problema.

Perché il record di attivazione relativo alla nuova funzione si trova "sopra" il record dell'invocazione della prima funzione.

Al termine dell'invocazione il record di attivazione deve essere rimosso dal blocco per fare spazio, tuttavia questo blocco non può essere rimosso, perché sopra ad esso c'è il blocco per la definzione della nuova funzione.

C'è chiaramente un problema e la soluzione tipica è quello di spostare il blocco della definizione della funzione in un'area diversa della memoria (spoiler alert: va a finire nello heap e il puntantore presente nella chiusura deve essere aggiornato).

```
make_counter x =
    let
        count = x
        counter inc = count+inc
    in
        counter
    end
```

In questo caso se rimuovo il blocco relativo all'invocazione di `make_counter` andrei a perdere la locazione di memoria della variabile globale `count` che usa la funzione `counter`.

