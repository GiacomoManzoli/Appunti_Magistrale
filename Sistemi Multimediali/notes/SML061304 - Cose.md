# Gestione delle luci 2

Utilizzando un sistema di gestione delle luci la terna RGB specifica come il materiale riflette la luce.
Nel caso la luce sia perfettamente bianca, la terna RGB rapprensenta la codifica RGB del colore.

Il colore finale dell'oggetto sarà quindi il prodotto membro a membro della terna RBG con la luce che colpisce l'oggetto.

Serve quindi una funzione che data una terna RGB rappresentante la luce che colpisce l'oggetto, restituisca la terna RGB che rappresenta il colore dell'oggetto una volta colpito dalla luce.

C'è poi da regolare l'intensità luminosa in base alla distanza della fonte, la quale decresce con quadrato della distanza dell'oggetto dalla sorgente.


La sorgente di luce può essere anche mandata all'infinito, la quale illumina tutti gli oggetti allo stesso modo, indipendemente dalla distanza.

In ogni caso l'intensità luminosa varia anche in base all'inclinazione della superfice dell'oggetto e la direzione della luce. Lo scaling dell'intensità viene fatta con il prodotto scalare tra la direzione della luce e la perpendicolare del piano.
Se questo prodotto è 0 il piano è parallelo alla luce e quindi non viene colpito. Se invece è maggiore di 0 l'intensità viene opportunamente scalata. Se il prodotto scalare risulta minore di 0, questo viene fissato a 0.

Dal momento che una superfice ha due normali, una primaria e una secondaria. La normale primaria è quella che si ottiene seguendo l'ordine di definizione dei vertici in senso orario. 

```
    2------3                   /|\  normale secondaria       
   /      /                     |       
  /   |  /                    2-|----3   
 1------4                    /  |   /    
      |                     /      /                
     \|/ normale primaria  1------4   

```

Il processo per calcolare il colore di un oggetto è quindi:

```
[RGB Luce * RGB Oggetto] => [Scaling distanza] => [Scaling inclinazione] = Colore finale
```

C'è però un problema! L'ambiente riflette la luce, quindi per rappresentare in modo realistico un'oggetto è necessario tenere conto anche di ciò.
È quindi necessario impostare una luce ambientale, il cui calcolo è molto complicato, pertanto viene calcolata una restituzione media degli oggetti la quale viene impostata della stessa terna RGB della luce originale, ma di intensità minore e che arriva un po' da tutte le direzioni e quindi illumina un po' tutti gli oggetti.

```
[RGB Luce * RGB Oggetto] => [Scaling distanza] => [Scaling inclinazione] => [+ Luce ambinetale] = Colore finale
```

// Pippone sulla rugosità di una superfice e su come questa influenza la luce riflessa dalla superfice.

Per le superfici curve le normali venogno messe diverse da quelle che dovrebbero essere, andando a settare per ogni singolo vertice una normale che segue l'andamento della superfice. Sarà poi il motore di rendering quando calcola i colori ad effettuare le dovute interpolazioni per ottenere l'effetto sfumato.

Normalmente è lo strumento di modellazione che effettua il calcolo delle normali, altrimenti c'è da diventare matti.

// Discorso sulle texture che definiscono come viene riflessa la luce

Se la texture è di dimensione diversa rispetto alla dimensione della figura è possibile specificare mediante dei vertici quale porzione della texture deve essere mappata su quale parte del poligono.

C'è un problema nella rappresentazione dei dettagli della texture:

- se l'immagine viene ingrandita la texture diventa sfocata
- se l'immagine viene rimpicciolita, il campionamento dell'immagine può portare alla perdita dei dettagli.

Il problema maggiore si ha quando la texture viene rimpicciolita, ad esempio delle linee bianche di un pixel su sfondo rosso potrebbero scomparire, pertanto l'idea è quella di rendere l'idea del rimpicciolimento tracciando la linea bianca anziché rosa e questo può essere utilizzando vari livelli di texture (**mipmap**-ing), uno per ogni metà della risoluzione, così facendo per ogni dimensione, l'insieme di 4 pixel da il colore del singolo pixel che verrà mostrato a video.

Tipicamente basta dare in pasto alla libreria grafica le varie risoluzioni della texture, ci penserà lei ad applicarla correttamente.

Se il pologono texturato è storto, è necessario che l'algoritmo di scaling della texture tenga conto di ciò e che usi la texture a più alta risoluzione per la parte vicina all'osservatore, andando via via a scegliere quella di risoluzione inferiore per le parti sempre più lontane, ottenendo un effetto sfocato in lontanaza. 

Si può risolvere questo problema con un **filtro antisotropico** il quale carica sempre tutte le texture disponibili e le combina oppurtanamente le varie risoluzioni delle texture per contrastare l'effetto sfocato. Questo filtraggio è computazionalmente pesante, quindi spesso viene lasciata la scelta all'utente il quale può limitare  il numero di texture utilizzate dal filtro.

## Shader

Utilizzare gli algoritmi definiti dalla scheda video può limitare le capacità "artistiche" della rappresentazione renderizzata.

L'idea degli shader è quella di definire un protocollo per programmare la GPU in modo da definire una gestione personalizzata delle luci.

