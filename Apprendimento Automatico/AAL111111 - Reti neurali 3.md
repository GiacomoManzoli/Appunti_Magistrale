#Lezione 11 - Reti neurali 3

Pipeline di apprendimento supervisionato per una rete.

##Oggetti

In natura possono essere presenti varie tipologie di oggetti:

- **vettori**: come il valore di pressione del sangue, il battito cardiacoo, altezza e peso, (Un vettore con dei numeri.
- **stringhe**: Una serie di caratteri che rappresentano un documento o la struttura del DN
- **insiemi**: ad esempio l'insieme di termini che compare in un documento
- **array multidimensionali**: come immagini e video
- **albero o grafi**: un documento XML 
- **strutture composte**: ottenute combinando tra loro le precedenti.

Nel corso ci concentriamo principamente nei vettori.

Per ogni oggetto possiamo avere a disponsizione delle **feature categoriche**, che rappresentano delle caratteristiche nominali dell'oggetto (marca di un auto, paese di origine), alcune di queste possono essere anche **ordinali**, cioè che impongno un ordine (gradi militari: soldato, caporale,...) ma la distanza tra un valore e un altro non è quantificabile.

Possono essere definite delle **feature quantitative**, cioè delle caratteristiche che sono **enumerabili** (livello di apprezzamento di un prodotto) oppure **ratio**, ovvero dei numeri reali (peso di una persona).

###Mapping Feature categoriche

Le feature categoriche si possono mappare in un vettore con tante componenti quanti sono i possibili valori della variabile (**one-hot**).

Esempio: possibili valori delle variabili:

- Marca: Fiat [c1], Toyota [c2], Ford [c3]
- Colore: Bianco [c4], Nero [c5], Rosso [c6],
- Tipo: Economica [c7], Sportiva [c8]

Un oggetto con le caratteristiche (Toyota, Rossa, Economica) viene rappresentato con un vettore `[0,1,0,0,0,1,1,0]`

###Mapping per feature continue

Tipicamente le feature continue vengono trasformate per ottenere dei valori comparabili con le altre feature.

Per ottenere ciò è possibile applicare una delle seguenti traformazioni:

- **Centramento**: *f(x) = x - E(x)*
- **Normalizzazione STD**: *f(x) = (x - E(x))/σ(x)*
- **Rescaling**: *f(x) = (x - xmin)/(xmax-xmin)*

###Similarità e Distanza

Distanza tra vettori: se i vettori hanno stessa norma, la disntaza è equivalente alla similarità indotta dal prodotto scalare.

Altrimenti anche la lunghezza dei due vettori conta.

Se i vettori sono normalizzati, allora la distanza e la similarità coindicono, sennò distanza e similiarità non sono lo stesso valore.

###Algoritmo k-nn

**K-Nearest-Neighbors**: è un algoritmo di classificazione in cui un esempio di test è classificato come la classe di maggioranza dei sui k-vicini nel training set.

Si vanno a scegliere i k elementi più vicini ad un dato elemento, e l'elemento viene classificato come la maggioranza dei sui k-vicini.

Volendo si può normalizzare per perdere volontariamente delle informazioni, in modo da togliere del rumore.

##Scelta degli iper-parametri

I parametri sono i valori che influiscono nell'apprendimento (i pesi w). Gli iper-parametri sono tutti gli altri parametri che non influiscono con l'apprendimento, come il numero di unità nascoste o il k per l'algoritmo k-nn.

**Model selection**: fase di una piple di apprendimento dove si vanno a individuare gli iper-parametri che ...

###Bias e varianzaa

Il bias misura la distorsione di una stima (quanto lo stimatore è corretto), mentre la varianza misura la dispersione di una stima.

𝜃 è la cosa corretta, 𝜃' è quella calcolata dallo stimatore.

b = E[𝜃'] - 𝜃 

v = E[(𝜃' - E[𝜃'])<sup>2</sup>]

###Hold out

Ovvero la ricerca del valore per un determinato iper-parametro.

1. Si sceglie un piccolo sottoinsieme Tr del training-set che viene utilizzato come set di validazione Va.
2. Il classificatore (algoritmo) apprende utilizzando gli esempi in Tr ma senza usare quelli che compaiono in Va.
3. Osservo poi come si comporta il classificatore con un determinato valore dell'iper-parametro, e ripeto a partire dal punto 2 per tutti i possibili valori dell'iper-parametro.

In questo modo riesco a calcolare l'*accuracy* per ogni valore del iper-parametro e di conseguenza posso scegliere il valore migliore.

Una volta scelto il valore, rieffetto l'apprendimento utilizzando però il training set completo.

###K-fold Cross Validation

Alternativa all'hold-out, cioè permette anche questo di scegliere il valore migliore per un dato iper-parametro.

Si partizione in modo casuale l'insieme di apprendimento in k parti.

Viene poi fissata una partzione da usare come Va e le restanti come insieme di apprendimento.
Si ripete questo procedimento per ogni partzione.

Per ogni valore dell'iper-parametro si ottengono così k valori di accuracy, in questo modo è possibile fare la media di questi valori ed ottenere così un valore di accuracy più accurato.

Il valore di k influisce la dimensione del training set, utilizzando un k piccolo, si ottiene un training set più piccolo e il bias induttivo aumenta e la varianza della stima ottenuta diminuisce.

Viceversa, se k è grande, il training set è più grande e si ottiene un minor bias induttivo.

Tipicamente si usa k=5 o k=10.

##Valutazione per dati non bilanciati

Cioè quando nel training set c'è una classe che domanina sulle altre.

L'accuracy in questo caso non è una misura adatta.

Vengono quindi utilizzate **precision**, **recall** e **F-Measure**.

**Precision** misura quante volte, quanti tra quelli classificati positivi sono effettivamente positivi, mentre la **recall** misura quanti che sono effettivamente positivi sono stati classificati come positivi.

**Precioson**: quanti tra quelli che ho detto essere positivi sono effettivamente positivi.

> π  = true positive / (true positive + false positive)

**Recall**: quanti tra quelli che so essere positivi sono riuscito a classificare correttamente (ovvero li ho calcolati positivi).

> p = true positive / (true positive + false negative)

**F-measure**: combina tra loro precision e recall.

> F<sub>1</sub> = 2 πp / (π + p)
> 
> F<sub>𝜷</sub> = (1+𝜷<sup>2</sup>)πp / (𝜷<sup>2</sup> +....)