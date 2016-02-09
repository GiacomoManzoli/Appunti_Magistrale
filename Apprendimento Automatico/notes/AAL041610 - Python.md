#Lezione 4 - Laboratorio

Durante il corso useremo Python 2.7.x

Python è un linguaggio orientato agli oggetti.

Ogni oggetto è caratterizzato da:

- identità: è un identificativo dell'oggetto (!= puntatore).
- tipo: rappresenta le operazioni che si possono fare con un oggetto, python è un linguaggio a tipizzazione dinamica e il tipo viene determinato a runtime.
- valore: rappresenta il valore effettivo contenuto nell'oggetto.

In python non c'è il concetto classico di variabile, ma vengono usati dei riferimenti.

```python
x = 2
y = 3
y = x //y e x puntano allo stesso oggetto
```

La funzione `id()` permette di sapere l'identificatore di un oggetto.

Gli oggetti in Python sono immutabili.

Contenitori:

- liste
- set (insiemi)
- tuple
- dizionari

Tutti questi contenitori possono essere eterogenei, una lista può tenere sia numeri che stringhe contemporaneamente.

Le liste in python sono mutabili.

Un contenitore si dice iterabile se gli elementi possono essere iterati.

Un contenitore si dice sequenziale se è definita una sequenza di elementi e può essere acceduto mediante indice (liste e tuple).

Un contenitere si dice associativo quando si comporta come un dizionario, quindi solo i dizionari.  

In python non esitono i caratteri, esistono solo stringhe di lunghezza uno.

Gli indici per accedere ad una collezione con le `[]` possono anche essere negativi, in questo caso si procede all'indietro.

```python
>>> s = "Giacomo"
>>> s[3]
'c'
>>> s[-3]
'o'
>>> s[1:-3] #slicing
'iac'
```

**List comprehension**

```python
>>> [x**2 for x in range(1,10)]
[1, 4, 9, 16, 25, 36, 49, 64, 81]
```

**operatore in**
```python
if k in dictiornary:
	# something
```

**copy()**

```python
a = [1,2,3,4]
b = a			# b riferisce a 
c = a.copy()	# c è una copia di a (oggetto diverso)
```
##numpy

```python
>>> import numpy as np

>>> a = np.array([1,4,5,8], float)
>>> a
array([ 1.,  4.,  5.,  8.])
```

Questo modulo contiene alcuni metodi utili per la creazioni di matrici o array.

`a` matrice
- `a.transpose()`
- `a + b`, `a - b`, `a * b`, `b / a` sono tutte operazioni tra matrici _entry wise_, cioè elemento per elemento 

##scipy

```python
import scipy
```

Libreria per la risolzione dei sistemi.

Anche questa ha un suo tipo per le matrici che è diverso da quello di `numpy`.

Tra tipi `matrix` di `scipy` l'operazione `\*` effettua il prodotto tra matrici.



















