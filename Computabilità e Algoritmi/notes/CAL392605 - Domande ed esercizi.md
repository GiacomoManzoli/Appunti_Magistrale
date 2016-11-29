# Poligono convesso

dato un poligono P = p0p1...pn-1, decidere se si tratta di un poligono convesso o meno.

L'idea di base è quella che si parte dal segmento p0p1 e si controlla di girare sempre a sinistra.

Restano però dei casi particolari in cui girando sempre a sinsitra alcuni segmenti si intrecciano (stile logo di airbnb).


```
Controllare per ogni i (a partire da i = 2 fino a n-1).
    TurnLeft(pi-2 pi-1,pi) >= 0 
```

Dopodiché per verificare se si c'è l'effetto airbnb bisogna andare a controllare che l'angolo che c'è tra p0 e due punti consecutivi non torni mai indietro

```
    AngleLeft(p0, pi-1, pi) >= 0
```

Se questo non si verifica, vuol dire che c'è un segmento che gira troppo a sinistra.

Infine c'è da controllare che tutti i punti del poligono si trovino dalla stessa parte del segmento p0p1

```
    AngleLeft(p0,p1,pi) >= 0
```

Seguono cose poco interessanti e che non saranno chieste all'esame