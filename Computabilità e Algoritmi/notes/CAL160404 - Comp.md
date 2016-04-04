### Calcolabitlià della minimalizzazione

Se f : N^k+1 -> n è in C-figa, allora anche μy.f(vec{x},y) è in C-figa.

#### Dimostrazione

Sia f : N^k+1 -> N in C-figa e sia P il programma in forma normale che calcola f.

L'idea è quella di eseguire *P* incrementando via via un contantore, quando viene trovato un valore del contatore che azzera la funzione, questo viene ritornato.

```
 1       k         m+1          m+k|m+k+1|m+k+2|
|\vec{x} | .....  |x_1|x_2|....|x_k|  0  |  0  |
```

Sia *m = max{rho(P), K }*, il programma che calcola la minimalizzazione  illimitata è:

```
T([1..k], [m+1..m+k]) //Copio l'input
P[m+1, ..., m+k+1 -> 1]
J(1, m+k+2, END) #LOOP
S(m+k+1)
J(1,1,LOOP)
#END
```

Dal momento che è possibile trovare un programma che calcola la minimalizzazione illimita, questa è calcolabile.

### Hot-fix delle funzioni

```
\label{hotfix}
```

Data una funzione f: N-> N tale che esiste g: N->N calcolabile e tale che 

```
delta = { x | f(x) != g(x)}
```

e finito.

Allora *f* è calcolabile e può essere modificata in modo da coincidere con *g*.

### Funizioni finite

**Funzione finita** Theta: N^k -> N è una funzioe finita quando è definita come:

```
\Theta(\vec{x}) = y1 se x = x_1, yn se x = xn \uparrow altrimenti
```

Tutte le funzioni di questo tipo sono calcolabili


#### Dimostrazione

(per semplicità è ridotta a funzione unarie)

```
\Theta = y_1 se x = x_1, y_n se x = x_n
```

```
= y_1 \cdot \bar{sg}(|x - x_1|) + ... + y_n \cdot \bar{sg}(|x - x_n|) +  \underbrace{\mu z.\prod\limits_{i=1}^{n}|x - x_i|}_{\text{funzione indipendente da } z}
```

La minimalizzazione su *z* è calcolabile ma risulta indefinita, perché non è possibile minimizzarla rispetto a *z*, quindi anche la Theta risulta essere indefinita se tutti i valori sono diversi da x_1 ... x_n.

# Tesi di Church

Ogni funzione è calcolabile tramite un procedimento effettivo se e solo se è URM calcolabile.

Church non ha proprio detto questo, perché non c'era URM quando è stata enunciata e ha utilizzato un modello alternativo: le funzioni parziali ricorsive R-Figa (Goedel).

La classe R-Figa delle **funzioni parziali ricorsive** è la **minima** classe di funzioni che contiene:

1. zero: z(\vec{x}) = 0 per ogni x
2. successore: S(x) = x+1
3. proeizioni: U_i^k(x_1 ... x_k) = x_i

ed è chiusa riespetto:

- composzione generalizzata
- ricorsione primitiva
- minimalizzazione illlimitata


Una classe di funzioni *X* è **ricca** se contiene le funzioni di base ed è chiusa rispetto alle 3 operazioni classiche.

C'è almeno una classe ricca, perché anche la classe "tutte le funzioni" è ricca, anche se ha poco senso considerarla.

Si vuole quindi che R-Figa sia contentua in *X* ricca e che anche R-Figa sia ricca.

Questo è possibile perché l'intersezione di due classi ricche è ovviamente anch'essa ricca.

R-Figa può essere definita come l'intersezione di tutte le classi di funzioni ricche.

```
\mathcal{R} = \intersect_{X \text{ ricca}} X
```

anche se precedentemente R-Figa è stata definita come

```
\mathcal{R} = \{ (a), (b), (c) con tutte le funzioni che si ottengono da queste utilizzando 1,2,3 \}
```

È dimostrabile che le due definizioni sono equivalenti, anche se non lo dimostriamo.

Si può anche definire la classe P-FigaR-figa delle **funzioni primitive ricorsive**: la minima classe che contine solamente le funzioni di base chiusa rispetto la composizione e la ricorsione primitiva. Ovviamente P-figaR-figa è più piccola di R-Figa.

## C-Figa = R-Figa

È già stato dimostrato che C-Figa è una classe ricca, quindi sicuramente R-Figa ⊆ C-Figa.

Resta da dimostare che C-Figa ⊆ R-Figa.

Sia f in C-Figa, ovvero esiste un programma *P* in forma normale che la calcola f = f_p^(k).

```
P= I_1 ... I_s

|x_1 ... x_k| 0 ... 0
```

Supponiamo di avere le funzioni: 

```
C_{p}^1(\vec{x},y) = contenuto di R1 dopo t passi del programma se non è terminato, altrimenti ritorna il valore finale del registro
```

```
J_p(\vec{x},t) = la prossima istruzione da eseguire all'istante t di P(\vec{x}) se non è terminato, oppure ritorna 0
```

Si ha che entrambe le funzioni sono del tipo N^k+1 -> N e totali.

Se f(x)downarrow allora *P* termina su vec{x} in un qualche numero di passi 

```
t_0 = \mu t.J_p(\vec{x}, t)
```

e 

```
f(\vec{x}) = C_{p}^1(\vec{x}, t_0) =  C_{p}^1(\vec{x}, \mu t.J_p(\vec{x}, t))
```

Se invece f(\vec{x})uparrow si ha che

```
\mu t.J_p(\vec{x}, t) = \uparrow
```

e

```
f(\vec{x}) = C_{p}^1(\vec{x}, t_0) =  C_{p}^1(\vec{x}, \mu t.J_p(\vec{x}, t))
```

Ovvero la combinazione di queste funzioni riesce a descrivere un programma URM.

Resta da dimostrare che queste due funzioni sono contenute in R-Figa e pertanto, dato che f è la combinazione di queste funzioni, anche f è in R-Figa.