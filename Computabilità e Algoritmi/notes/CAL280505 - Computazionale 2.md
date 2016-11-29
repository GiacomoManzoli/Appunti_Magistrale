Il vettore *v* di coordiante *(vx, vy)* viene rappresentato con uno qualsiasi dei segmenti orientati *pq->* tali che *vx = xq-xp* ecc.

**Vettore posizione** vettore che collega l'origine ad un dato punto nel piano.


Il **prodotto vettoriale** di due vettori *v1 = (x1,y1)* e *v2 = (x2,y2)* e definito come

v1 x v2 = (x1+x2, y1+y2)

ovvero l'area orientata del parallegolgramma di vertici *o, p1, q, p2*,  l'orientamento è positivo se l'angolo da v1 a v2 è orientato in senso antiorario, con segno negativo altrimenti.

L'area orientata può essere calcolata come il determinate della matrice

v1 x v2 = det [ [x1 x2] [y1 y2]] = x1y2 - x2y1

questo perché l'area del trapezio è uguale a

A = (x2y2)/2 + x1(y2+(y1+y2))/2 - (x2y2)/2 - x2(y2+ (y1+y2))/2 = x1y2 - x2y1

Se cambio l'ordine dei punti, il segno dell'area cambia.

# La soluzione ai semplici problemi

## Rotazione in senso orario o antiorario

In questo caso basta calcolare il prodotto vettoriale

```
AngleLeft(p0,p1,p2) //Di coordinate x0y0, x1y1, x2,y2
d = (x1-x0)(y2-y0) - (x2-x0)(y1-y0)
return d
```

*d* risulta essere maggiore di 0 se l'angolo tra i segmenti p0p1 e p0p2 è orientato in senso antiorario, se invece è minore di 0 l'angolo è ruotato in senso orario e se è uguale a 0 l'angolo è 0 oppure uno dei due segmenti è degenere.

## Il giro del volante

Devo girare a sinistra se tra p0p1 e p0p2 c'è una rotazione in senso antioraria. (Da notare che in questo caso i segmenti di interesse sono p0p1 e p1p2).

```
TurnLeft(p0,p1,p2)
d = AngleLeft(p0,p1,p2)
return d
```

Se d > 0 c'è una svolta a sinsitra, se invece è minore di 0 la svolta è a destra e se è 0 si prosegue nella stessa direzione o si fa un'inversione ad U.

## Intersezione di due segmenti

Si vuole sapere se i due segmenti p1p2 e p3p4 si intersecano o meno.

Ci sono due possibili casi:

1. I due segmenti stanno sulla stessa retta (collineari). In questo caso si interesacono solo se uno dei due estremi p3 o p4 appartiene al segmento p1p2 oppure uno dei due segmenti contiene l'altro.
2. I due segmenti non sono sulla stessa retta. In questo caso bisogna vedere se p1 e p2 stanno dalla parte opposta della retta p3p4 e se p3 e p4 stanno dalla parte opposta della retta p1p2.

Per verifica che due segmenti siano collineari basta calcolare il prodotto vettoriale

d1 = (p1-p3) x (p4-p3) // p1 rispetto p3p4

Se uno dei due segmenti è degenere si ottiene sempre un d1 = 0, è necessario quindi verificare che non ci siano segmenti degeneri.

d2 = (p2-p3) x (p4-p3) // p2 rispetto p3p4

d3 = (p3-p1) x (p2-p1) //p3 rispetto p1p2

d4 = (p4-p1) x (p2-p1) // p4 rispetto p1p2

Se d1 = d2 = 0 o i due segmenti sono sulla stessa retta o p3p4 è degenere.
Se d3=d4=0 o i due segmenti sono sulla stessa retta o p1p2 è degenere.

Basta quindi calcolare i 4 prodotto scalari e controllare se sono tutti 0, questo è corretto perché se entrambi i segmenti sono degeneri questi sono anche collineari.

```
SegmentIntersect(p1,p2,p3,p4)
    d1 = AngleLeft(p3,p4,p1)
    d2 = AngleLeft(p3,p4,p2)
    d3 = AngleLeft(p1,p2,p3)
    d4 = AngleLeft(p1,p2,p4)
    if d1 = d2 = d3 = d4 = 0
        return ((x2 - x3)(x1 - x3) \leq 0 and (y2 - y3)(y1 - y3)) or //p3 in p1p2
               ((x2 - x4)(x1 - x4) \leq 0 and (y2 - y4)(y1 - y4)) or //p4 in p1p2
               ((x4 - x1)(x3 - x1) \leq 0 and (y4 - y1)(y3 - y4)) //p1 in p3p4 (serve perché p1p2 potrebbe essere contenuto in p3p4)
    else
        return ((d1 \leq 0 and d2 \geq 0) or (d1 \geq 0 and d2 \leq 0)) and
               ((d3 \leq 0 and d4 \geq 0) or (d3 \geq 0 and d4 \leq 0)) 
        
```

Nel primo caso non viene fatta la moltiplicazione tra le x e le y per evitare la moltiplicazione tra due aree e quindi un probabile overflow (lo stesso vale per i prodotti tra i *di*).

Nel secondo caso se p1p2 è degenere si ha d3=d4=0 e d1=d2!=0 quindi viene ritornato correttamente false (il caso con p3p4 è analogo).

## Esercizio 1 - Calcolare l'area di un triangolo

Dimostrare che l'area orientata del triangolo di vertici p0, p1, p2 è data dallaformula
A= 1/2[(x0 −x1)(y0 +y1)+(x1 −x2)(y1 +y2)+(x2 −x0)(y2 +y0)]

Verificare che A è positiva se i vertici p0, p1, p2 sono presi nel verso antiorario ed è negativa se vengono presi nel verso orario.```
y
^
|     p2
|    /  \
|   /    \
|  /      \ 
| p0 ----- p1
|
|--------------->x
```

## Esercizio 3 - Calcolare l'area di un poligono

Usare il risultato dell'Esercizio 1 per dimostrare per induzione su n che l'area orientata di un poligono di n vertici p0, p1, . . . , pn−1 che sia semplice ma non necessariamente convesso si può calcolare in tempo lineare O(n) mediante la formula
A = 1/2 sum yi(xi-1 -xi+1)dove i vertici si intendono ordinati circolarmente in senso antiorario e quindi xi−1 = xn−1 quando i=0 e xi+1=x0 quando i=n−1.

## Esercizio 4

Da ricopiare

## Esercizio 5

## Esercizio 6 e 7 e 8