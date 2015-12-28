#Lezione 17 - Ancora Prolog

```
tedge(a,X)

findall(X,tedge(a,X), R).

R = [c,d,b]

ledge(A,B) :- edge(A,B)
ledge(A,B) :- edge(A,C), ledge(C,B)
```

L'and in Prolog viene rappresentato con `,`, mentre l'or con il `;`

## Cut

In Prolog è presente l'operatore di **cut** `!` per limitare il backtracking:

```
not(G) :- call(G), !, fail.
not(_).
```

Senza l'operatore di cut, per calcolare al query `not(woman(jim))`, Prolog prima prova ad soddisfare  `call(G), fail.` ma fallisce, dopodiché prova a soddisfare con `not(_)` e ci riesce, così vacendo come risposta alla query viene fornito vero, anziché falso.

Con l'operatore di cut invece viene bloccato il backtracking, pertanto quando viene fatta  provata la regola `not(G) :- call(G), !, fail.` questa fallisce e dal momento che è stato bloccato il backtracking, la query fallisce, ritornando false.

Lo stesso problema si ha con:

```
different(X, X) :- !, fail.
different(_,_).
```