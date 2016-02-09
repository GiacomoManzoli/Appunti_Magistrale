##Lezione 3 - Bound Checking

Applicando la bound consistency si cambia il problema di filtering, in quanto non si va a controllare il supporto dei valori uno a uno, ma si controllano solamente i valori dei domini, ottentendo un sistema più efficente.
Così facendo bound consistency è più debole di GAC, specialmente nel caso in cui il dominio ha dei buchi, i quali non vengono considerati da BC.

##AC/BC

Entrambi gli algoritmi di filtering sono incompleti.

AC risulta più efficace il che risulta in un tempo di ricerca minore, tuttavia risulta più costoso fare propagazione.

BC risulta meno efficace e la ricerca rimane costosa, tuttavia è molto veloce da propagare.

Tipicamente la maggior parte dei solver utilizzano BC al posto di AC, questo perché nei problemi reali tipicamente vengono utilizzati domini continui determinati da un intervallo.

##BC per il vincolo della somma

Filtering su *z*

> z = x + y
> 
> ub<sub>z</sub> = Min(Max(x) + Max(y), Max(z))
> 
> lb<sub>z</sub> = Max(Min(x) + Min(y), Min(z))

Filtering su *x* (analogo per *y*)

> z = x + y
> 
> ub<sub>x</sub> = Min(Max(z) - Min(y), Max(x))
> 
> lb<sub>x</sub> = Max(Min(z) - Max(z), Min(x))

##BC per il vincolo della moltiplicazione

Filtering su *z*

> z = x * y
> 
> ub = Max(Max(x)Max(y),Max(x)Min(y),Min(x)Max(y),Min(x)Min(y))--> Max(z) = ub
> 
> lb = Min(Max(x)Max(y),Max(x)Min(y),Min(x)Max(y),Min(x)Min(y))--> Min(z) = lb

La formula sembra è contorta, l'idea di base però è semplice, si cerca il massimo (o minimo) tra tutte le posssibili combinazioni dei bound dei due domini.

Filtrare su *x* è più complicato.

##BC per il vincolo del valore assoluto

Filtering su *z*

> z = |x|
> 
> ub = Max( |Max(x)|, |Min(x)| ) --> Max(z) = ub
> 
> lb = |Max( Min(x), Min(0, Max(x)) )| --> Min(z) = lb

Filtering su *x*

> z = |x|
> 
> \# Filter based on Max(z)
> 
> if Max(x) > Max(z): Max(x) = Max(z)
> 
> if Min(x) < -Max(z): Min(x) = -Max(z)
> 
> \# Filter based on Min(z)
> 
> if Min(x) ≥ 0: 
> 
> \# x cannot be negative
> 
>   if Min(x) < Min(z): Min(x) = Min(z)
> 
> if Max(z) < 0: 
> 
> \# x cannot be positive
> 
>   if Max(x) > -Min(z): Max(x) = -Min(z)

##BC per il vincolo del minimo

Filtering su *z*

> z = Min(x,y)
> 
> ub = Min(Max(x), Max(y)) --> Max(z) = ub
> 
> lb = Min(Min(x), Min(y)) --> Min(z) = lb

Filtering su *x* (analogo per *y*)

> z = Min(x,y)
> 
> Max(x) > Max(z), Min(y) > Max(z) --> Max(x) = Max(z)
> 
> Min(x) < Min(z) --> Min(x) = Min(z)

##Considerazioni sul BC-filtering

Con BC, tipicamente non si reisce a tagliare entrambi i domini, o si taglia quello di *z* o quello di *x* e *y*.

Pertanto la condizione minima per cui un algoritmo di filtering sia utile è che vada a fare il test di accettabilità dei buond dei domini.






















