# Ordinamento topologico

Un **ordinamento topologico** definito su un grafo orientato aciclico (**DAG**) è un ordinamento dei suoi vetici tale che per ogni arco *uv in E*, il vertice *u* precede il vertice *v*.

![Esempio di DAG](./immagini/l7-fig1.png)

L'algoritmo effettua una ricerca in profondità e una volta completata la visita di un nodo, lo inserisce in cima alla pila, ottenendo così una pila ordinata per tempo di finitura decresente.

```
TS: ordinamento topologico di un grafo
TS(G)
    for ogni v in G.V
        v.color = bianco
    P = ∅
    for ogni v in G.V
        if v.color == bianco
            TS-Visit(G,v,P)
    return P

TS-Visit(G,u,P)
    u.color = grigio
    for ogni v in Adj[u]
        if v.color = bianco
            TS-Visit(G,v,P)
    u.color = nero
    Push(P,u)
```

La complessità dell'algoritmo è la stessa della visita in profondità, ovvero *O(n+m)*.

##Correttezza di TS

Per dimostrare la correttezza di `TS` è necessario dimostrare che per ogni arco *uv* il vertice *v* viene finito prima del vertice *u*, ovvero *u* si trova più in alto nella pila rispetto a *v*.

Prima di tutto è necessario dimostrare che un grafo è un **DAG** se e solo se nella visita in profondità non si trova nessun arco all'indietro e questo può essere fatto in modo analogo a come avviene per un grafo non orientato.

```
TODO: integrare:
Se in una visita in profondità si trova un arco all’indietro vu allora tale arco aggiunto al cammino da u a v (che esiste in quanto v è discendente di u) forma un ciclo.
Se in una visita in profondità si trova un arco all’indietro vu allora tale arco aggiunto al cammino da u a v (che esiste in quanto v è discendente di u) forma un ciclo.
```

Tornando alla correttezza di `TS`, quando viene esplorato l'arco *uv*, il vertice *u* è grigio e il vertice *v* non può essere grigio, altrimenti *uv* sarebbe un arco all'indietro.

Se *v* è nero, vuol dire che è già stato finito, mentre *u* non lo è, quindi *u* viene inserito più in alto nella pila rispetto a *v*.

Se *v* è bianco, per il teorema del cammino bianco, è anche un discendente di *u* e quindi viene finito prima di *u* e di conseguenza *v* si trova più in basso nella pila rispetto a *u*.

# Componenti fortemente connesse

La visita in profondità può essere utilizzata per individuare le componenti fortemente connesse, ovvero i gruppi di nodi del grafico che sono mutualmente raggiungibili tra di loro.

L'algortimo che calcola le componenti fortemente connesse lavora in 3 passi:

1. Visita in profondità del grafo *G* per ordinare i vertici in ordine di finitura decrescente, un po' come avviene nell'ordinamento topologico, con la differenza che non è garantita l'assenza di cicli.
2. Calcola il grafo trasposto *G^T*.
3. Visita in profondità il grafo trasposto *G^T* usando l'ordine dei vertici nell'ordine calcolato al punto 1.

Gli alberi della foresta così calcolata rappresentano le componenti fortemente connesse.

La complessità dell'algoritmo è sempre *O(n+m)*, perché tutti e 3 i passi hanno complessità *O(n+m)*.

![Ricerca in profondità sul grafo di partenza e su quello di trasposto. In verde la relazione padre-figlio. I numeri dei nodi nel grafo trasposto indicano l'ordine di visita.](./immagini/l7-fig2.png)

La dimostrazione di correttezza dell'algoritmo viene dopo perché si basa su determinate proprietà che devono essere dimostrate.

## Proprietà dei cammini

Siano *C* e *C'* due **CFC** distinte. Se esiste un cammino *P_uu'* da un vertice *u* di *C* ad un vertice di *u'* di *C'*, non esiste nessun cammino *P_vv'* da un vertice di *v'* di *C'* a un vertice *v* di *C*.

La dimostrazione è banale, perché se ci fosse il cammino *P_vv'* ci sarebbe un ciclo tra le due **CFC** e quindi queste non sarebbero distinte, il che contraddice l'ipotesi.

## Prorpietà dei tempi di fine

```
Notazione
Dato un insieme di vertici U 􏰘 V indichiamo con d(U) il tempo in cui viene scoperto il primo vertice in U e con f(U) il tempo in cui viene finito l’ultimo vertice in U durante la prima visita in profondità.d(U) 􏰙 min(u.d) f (U) 􏰙 max(u. f ) u􏰖U u􏰖U
```

Siano *C* e *C'* due **CFC** distinte.
Se esiste un arco *uv* da *u in C* a *v in C'*, allora *f(C)>f(C')*, ovvero tutti i vertici di *C* vengono finiti prima dei vertici di *C'*.

Possono quindi verificarsi due casi, ovvero che viene prima scoperto un vertice di *C* o di *C'*.

Se *d(C) < d(C')*, qunado viene scoperto il primo vertice *x* tutti i vertici, sia di *C* che di *C'* sono bianchi.
Quindi c'è un cammino bianco da *x* a tutti i vertici di *C* e, a causa dell'arco *uv*, c'è anche un cammino bianco da *x* a tutti i vertici di *C'*.
Per il teorema del cammino bianco, tutti i vertici di *C* e *C'* diventeranno discendenti di *x* e quindi *x.f = f(C) > f(C')*.

```
Se d(C) > d(C'), quando viene scoperto il primo vertice y di C' tutti i vertici di C e di C' sono bianchi. Vi è un cammino bianco da y ad ogni vertice di C' e quindi y.f = f(C').Siccome esiste l’arco uv non può esistere nessun cammino da un vertice di C' ad un vertice di C. Quindi C non è raggiungibile da y. Dunque d(C) > f(C') ed a maggior ragione f(C) > f(C').

Conseguenza. Siano C e C' due cfc distinte.Se nel grafo trasposto GT esiste un arco uv da u 􏰖 Ca v 􏰖 C' allora f(C) < f(C'). Dimostrazione.I grafi G e GT hanno le stesse cfc ed uv è un arco di GT se e solo se vu è un arco di G.
```

## Correttezza dell'algoritmo

La visita in profondità di *G^T* parte dal vertice *x1* termianto per ultimo dalla visita in profondità di *G*.
Questo vertice farà parte di una certa componente connessa *C1*.

Per ogni altra **cfc** *C* si ha, per la proprietà dei tempi di fine, *x_1.f = f(C_1) > f(C)* perché non esiste nessun arco *vu* in *G^T* da *v in C_1* a *u in C* e quindi l'albero costruito a partire da *x_1* conterrà tutti e soli i verti di *C_1*.

Dopodiché l'algoritmo continua da *x_2* tra quelli terminati per ultimi e che non sono in *C_1*, sul quale è possibile fare lo stesso ragionamento.

Questo continua fino a che non vengono visitati tutti i nodi, ottenendo così una foresta di alberi che sono componenti fortemente connesse.

## (Esericizio) Componenti fortemente connesse e modifiche agli archi

Come variano le componenti fortemente connesse aggiungendo un arco?
Trovare un esempio in cui il numero di **cfc** non cambia e un esempio in cui il numero di **cfc** diminuisce di 1 ed un esempio in cui il numero di **cfc** da 10 diventa 1.

## Grafo delle componenti fortemente connesse

Sia *G* un grafo orientato per il quale sono state calcolate le componenti fortemente connesse, indicate con *C_i*.

Si può definire il grafo delle componenti fortemente connesse, il quale ha come nodi i vari *C_i* e c'è un arco tra due vertici solo se c'è almeno un arco che collega le due **CFC**.

Il grafo così ottenuto astrae i cicli del grafo di partenza e risulta anche essere un **DAG**.

### Esercizio - Grafi semiconnessi

Un grafo orientato è semiconnesso se per ogni due vertici *u* e *v* esiste o un cammino da *u* a *v* oppure un cammino da *v* a *u*.Trovare un algoritmo efficiente per verificare se un grafo è semiconnesso.

Questo può essere fatto costruendo il grafo delle componenti fortemente connesse e poi ordinarlo topologicamente.

Se tra due nodi del grafo c'è sempre un arco, il grafo è semplicemente connesso.