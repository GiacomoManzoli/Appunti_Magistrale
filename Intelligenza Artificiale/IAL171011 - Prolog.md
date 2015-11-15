#Lezione 17

```
tedge(a,X)

findall(X,tedge(a,X), R).

R = [c,d,b]

ledge(A,B) :- edge(A,B)
ledge(A,B) :- edge(A,C), ledge(C,B)

operatore di cut ! per evitare di valutare le clausole successive

```