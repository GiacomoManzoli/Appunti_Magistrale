# Sweeping

C'è un insieme di segmenti nel piano e ci chiediamo se tra questi ce ne sono almeno due che si intersecano. Non interessa sapere quanti o quali sono, basta poter dire che ci sono o non ci sono.

L'approccio naive che prova a due a due i segmenti si ottiene una complessità pari a *O(n^2)*, mentre con opportuni accorgimenti è possibile rispondere in *O(n log n)*. 

Da notare che per trovare **tutte** le intersezioni non si può scendere sotto *n^2* perché è necessario provare tutte le coppie di segmenti.

L'algoritmo si basa sull'utilizzo di una retta che funziona da spazzola e che viene utilizzata per scansionare i vari segmenti.

Dato che la retta si sposta da sinistra a destra, questa retta incontrerà per primo l'estremo sinistro e lascerà il segmento tramite l'estremo destro.

La prima operazione da fare è quindi l'ordinamento dell'array contenente tutti i segmenti, in modo che il primo elemento sia quello con l'estremo sinistro più a sinistra. Come tie-breaking per i segmenti con l'estremo sinistro e quello destro uguali, viene messo per primo quello con coordinata *y* minore. Lo stesso vale anche se due segmenti hanno l'estremo sinistro con la stessa *x*.

Lo spostamento della retta non deve essere necessariamente continuo, basta che si sposti sui vari estremi dei segmenti. Quando la retta si sposta su un estremo prende il nome di **evento** pertanto, durante l'esecuzione dell'algoritmo ci sono *2n* eventi.

Ogni evento può essere rappresentato da una coppia contenente le informazioni riguardante il segmento e un booleano che specifica se è l'estremo destro o l'estremo sinistro.

Tutti gli eventi vengono poi raccolti in un array ordinato. In modo che ci siano ordinati per *x* crescente, facendo in modo che gli eventi relativi agli estremi sinistri vengano prima di quelli relativi agli estremi destri. Questo per gestire le situazioni in cui l'estremo sinistro di un segmento coincida con un estremo destro di un altro segmento.

```
e_1 \leq e_2
se x_1 < x_2
oppure
x_1 = x_2 e e_1.left = true e e_2.left = false
oppure
e_1.left = e_2.left e y_1 \leq y_2
```

La cosa importante è che l'ordinamento definito sugli eventi sia totale perché questi devono essere poi ordinati utilizzando un algoritmo di ordinamento. Dal momento che il test dell'ordine, il tempo necessario all'ordinamento degli eventi può essere fatto in *O(n log n)*.

Per mantere le informazioni riguardanti i segmenti intersecati dalla spazzola viene utilizzata una stuttura dati *T* che prende il nome di **stato della spazzola** la quale contiene tutti i segmenti interecati da essa.

Lo stato della spazzola tiene i segmenti ordinati secondo la coordinata *y* con la quale intersecano la spazzola. Per i segmenti verticali viene scelto l'estremo inferiore.

Quando la spazzola viene spostata l'ordine dei segmenti presenti nello stato potrebbe cambiare, ma questo può succedere solamente se tra un evento e l'altro c'è un'intersezione, pertanto l'algoritmo deve evitare di fare spostamenti della spazzola oltre il punto di intersezione.

Per modificare lo stato della spazzola è possibile utilizzare:

- `Insert(T,s)` che aggiunge un segmento *s* alla struttura dati, rispettando l'ordinamento.
- `Delete(T,s)` che rigumuove il segmento *s* dalla strutta dati.
- `Below(T,s)` che restituisce il segmento *s'* che precede *s* nell'ordinamento considerato e che ritorna `nil` quanto *s* è il primo
- `Above(T,s)` che restituisce il segmento *s'* che segue *s* nell'ordinamento considerato e che ritorna `nil` se *s* è l'ultimo.

Per implementare *T* è possibile utilizzare un albero rosso-nero il quale permette di effettuare tutte le operazioni in tempo *O(log n)*.

Se due segmenti si intersecano si troveranno per forza contemporaneamente nello stato della spazzola. Però comunque controllar e tutte le coppie di segmenti richiederebbe *O(n^2)* pertanto l'algoritmo si limita a controllare ogni segmento con quello precedente e quello successivo.

Assumendo che non siano ancora stati trovati dei segmenti che si intersecano, quanto si verifica un nuovo evento questo può essere associato ad un estremo sinistro o destro.

Se l'evento è sinistro, basta controllare che il nuovo segmento non si intersechi con il precedente e successivo. Se invece è un evento destro basta controllare che i due segmenti che diventano consecutivi non si intersechino. Il controllo dell'intersezione è già stato affrontato e viene fatto in tempo costante.

```
\Function{Any-Segment-Intersect}{$S$} 
    \State // $S$ insieme di $n$ segmenti
    \State // Ordina gli estrei dei segmenti $s_i = (p_i,qi_)$ in modo che $p_i$ sia l'estremo sinistro
    \State // Costruisci la sequenza degli eventi $e_1 \ldots e_{2n}$
    \State // Ordina la sequenza di eventi come precedentemente definito
    \For{$i = 1 \textbf{ to } 2n$}
        \State $s \gets e_1.s$
        \If{$e_i.left$}
            \State \textsc{Insert}$(T,s)$
            \State $s' \gets \textsc{Above}(T,s)$
            \If{$s' \neq \textsc{ Nil } \textbf{ and } \textsc{Segment-Intersect}(s,s')$}
                \State \Return \textsc{True}
            \EndIf
            \State $s'' \gets \textsc{Below}(T,s)$
            \If{$s'' \neq \textsc{ Nil } \textbf{ and } \textsc{Segment-Intersect}(s,s'')$}
                \State \Return \textsc{True}
            \EndIf
        \Else \Comment{Estremo destro}
            \State $s' \gets \textsc{Above}(T,s)$ \Commnet{prima li cerco e poi tolgo $s$}
            \State $s'' \gets \textsc{Below}(T,s)$
            \If{$s' \neq \textsc{Nil} \textbf{ and } s'' \neq \textsc{Nil} \textbf{ and } \textsc{Segment-Intersect}(s',s'')$}
                \State \Return \textsc{True}
            \EndIf
            \State \textsc{Delete}$(T,s)$
        \EndIf
    \EndFor
\State \Return \textsc{False}
\EndFunction
```

È semplice dimostrare che l'algorimto ritorna `True` se ci sono due segmenti che si intersecano.

Risulta però più difficile dimostrare che quando l'algoritmo ritorna `False` nessun segmento si intersechi. Ovvero che se c'è un'intersezione allora l'algoritmo ritorna `True`.

Assumendo quindi che ci sia una o più intersezioni e tra tutte quelle presenti prendiamo quella con la coordinata del punto d'intersezione *x_p* più a sinistra con tie-break *y_p* più basso.

Consideriamo qundi l'evento in cui viene inserito l'ultimo segmento che si interseca nel punto *x_p*. Sia *s* il segmento che viene inserito e *s'* il segmento con cui *s* si interseca. Se *s* e *s'* sono consecutivi, viene fatto il test e l'intersezione viene correttamente rilevata. Se invece non sono consecutivi esiste un segmento *s''* che, nello stato della spazzola, si trova tra *s* e *s'*. Questo segmento deve terminare prima di incontrare il punto di intersezione, perché altrimenti dovrebbe intersecare *s* o *s'* prima di *x_p* e questo è assurdo per ipotesi. Si ha quindi che prima di trvoare *x_p* si verificherà l'evento destro di *s''* che renderà consecutivi *s* e *s'* e anche in questo caso l'intersezione viene rilevata. Lo stesso discorso vale se ci sono più segmenti tra *s* e *s'*.

Da notare che quando viene inserito *s* all'interno della spazzola possono essere già presenti altri segmenti che si intersecano tra loro, ma che hanno un punto di intersezione maggiore di *x_p*.

(C'è anche da dimostrare che la spazzola non supera mai un'intersezione, ma questo segue da quanto appena dimostrato.)


Per quanto riguarda la **complessità**:

```
Il tempo di esecuzione dell’algoritmo e` O(n) per costruire la sequenza degli eventi, O(n log n) per ordinarli e infine O(n) log n per esaminarli nel ciclo for. In totale tempo O(n log n).
```

**Esercizio 9** (da sistemare e da verificare correttezza)

ritorna true se viene prima (p1,p2)

```
Segments-Prec(p1,p2,p3,p4) (estremi dei due segmenti (p1,p2) e (p3,p4)
    if (x1 = x3)
        return y1 \leq y3 (stessa x, viene prima quello più basso)
    
    if (x1 > x3)
        d1 = AngleLeft(p3,p4,p1)
        return d1 \leq 0
    else //x1 < x3
        d2 = AngleLeft(p1,p2,p3)
        return d2 \geq 0
```

Se p1 coincide con p3 l'ordine perde di importanza perché è un punto di intersezione e all'algoritmo della spazzola non interessa quello che succede dopo un punto di intersezione.

Se invece x1 viene dopo di x3 mi basta osservare se p1 si trova a destra o a sinsitra del segmento (p3,p4). Da notare che se l'angolo è 0, si ha che p1 appartiene al segmento (p3,p4) e quindi è un punto di intersezione, quindi posso considerare i due segmenti coincidenti e ritornare 0 va bene.
L'altro caso è simmetrico.

Il tutto funziona perché vengono sempre testati due segmenti comparabili, ovvero che vengono intersecati contemporaneamente dalla spazzola e perché dopo il punto di intersezione l'ordinamento perde di importanza.

**Esercizio 10** trovare un algoritmo per decidere in tempo *O(n log n)* se un poligono di *n* vertici è semplice.

Quando in AnySegmentIntersect vado a controllare, quando trovo un'intersezione verifico che questa sia tra estremi gli estremi del segmento e se questo è vero non la segnalo.
C'è un possibile problema perché l'algoritmo continua dopo un punto di intersezione.

Se ealmeno uno dei due è un estremo destro, un segmento viene tolto e quindi non ci sono problemi. Se invece sono entrambi estremi sinistri è necessario garantire che l'odine della spazzola rimanga corretto, ovvero è necessario modificare `SegmentPrec` in modo che se x1=x3 e y1=y3 tanga in considerazione anche la posizione degli estremi destri per stabilire quale dei due segmenti sta sotto.

Questa modifica può essere estesa anche alla verifica se due poligoni semplici si intersecano tra loro.

**Esercizio 12** Dati n cerchi c1 ... cn nel piano. Per ognuno dei quali sono note le coordinate del centro e la dimensione del raggio.
Stabilire in *O(n log n)* se ci sono dei cerchi che si intersecano.

Due cerchi si intersecano se la distanza tra i due raggi è minore della somma dei due raggi, la quale può essere calcolata anche senza ricorrere alla radice quadrata.

Se per ogni cerchio viene preso in considerazione il diametro orizzontale, si può riutilizzare lo stesso algoritmo con un test d'intersezione diverso.