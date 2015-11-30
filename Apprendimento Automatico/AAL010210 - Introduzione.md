#Apprendimento automatico

Non sempre è possibile utilizzare degli algoritmi per risolvere un problema.

Per vari motivi:

* non sempre si può formalizzare un determinato problema
* ci sono delle situazioni di incertezza
* risulta troppo complesso trovare una soluzione oppure sono richieste troppe risorse


Alcuni esempi sono: riconoscimento facciale, filtro anti-spam.

In questi casi gli algoritmi (sequenza finita di passi che portano ad un risultato determinato in un tempo finito) non funzionano ed è quindi preferibile fornire una soluzione "*imperfetta*".

In apprendimento automatico si studiano i metodi per trasformare l'infomrazione empirica (dati del problema) in conoscenza.

Questo approccio è diventato possibile grazie al fatto che grazie ad Internet sono diventati disponibili molti dati.

##Le basi

Perché il machine leargning funzioni deve esserci un processo (stocastico o deterministico) che spiega i dati che osserviamo, in modo da riuscire a costruire un approssimazione di tale processo che può anche risultare imperfetta dal momento che il processo che si vuole approssimare non è noto.

*Stocastico*: random a probabilità

L'obiettivo finale del machine learning è quello di definire dei criteri da ottimizzare in modo che sia possibile andare a migliorare dei modelli definiti su certi parametri.

Questi modelli possono essere:

* **Preditivi**: per fare previsioni sul futuro (es: filtro anti-spam)
* **Descrittivi**: utilizzare dei dati per ottenere maggiori informazioni (data mining)

Esempi applicativi:

* Software OCR
* Estrapolazione di dati a partire dal linguaggio naturale
* Riconoscimento facciale
* Giochi con informazione incompleta (Gaist? gioco con fantasmi rosso/blu, tedesco)

##Problemi tipici dell'apprendimento automatico

* **Classificazione binaria**: dato un input dire se appartiene ad una determinata classe o meno. Esempio: data una cifre dire se è uno 0 o meno.
* **Classificazione multiclasse**: dato un input lo assegno ad una determianta categoria. Es: identificare una cifra manoscritta.
* **Regressione**: dato un insieme di valori, trovare una funzione che li approssimi.
* **Ranking di classi** (non sarà affrontato): data una serie di dati, dire quali sono più rilevanti, ovvero, data una serie di documenti ordinarli nel modo migliore secondo una determinata preferenza, es: motore di ricerca.
* **Novelty detection**: riconoscimento delle irregolarità a partire da una serie di dati. es: frode bancaria su una serie di transazioni, controllo degli accessi, ecc.
* **Clustering**: raggruppamento di dati in modo gerarchico, basandosi su alcune caratteristiche che li accomunano o meno.
* **Associazioni**: quello che fa Amazon con "altri utenti hanno comprato"
* **Reinforcement Learning**: valutazioni di strategie, quando si ha una serie di stati e possibili azioni, si vuole valutare la qualità complessiva, es: movimenti di un robot.


