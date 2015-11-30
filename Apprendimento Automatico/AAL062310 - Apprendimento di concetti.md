#Lezione 6 - Apprendimento di concetti

##Il concetto di Concetto

In uno spazio delle istanze *X*, un **concetto** è una funzione booleana su *X*, cioè una funzione che prende in input un oggetto dello spazio *X* e ritorna un booleano che specifica se l'elemento appartiene a quel concetto o meno.

Un concetto *C* su uno spazio delle istanze *X* viene definito come una coppia *(x,C(x))* con *x ϵ X*, e *C(x)* è la funzione concetto applicata ad *x*.

Si dice che un ipotesi booleana *h* per lo spazio delle istanze *X* **soddisfa** *x ϵ X* se *h(x) == 1*.

La stessa ipotesi *h* si dice che è **consistente** con un esempio *(x,C(x))* se *h(x) == C(x)*.

La definizione di consistenza può essere poi estesa ad in insieme se l'ipotesi *h* è consistente con tutti gli elementi presenti nell'insieme.

##Ordine parziale

Siano *h<sub>i</sub>* e *h<sub>j</sub>* due funzioni booleane definite su uno spazio delle istanze *X*, diciamo che *h<sub>i</sub>* è **più generale** o equivalente di *h<sub>j</sub>* (*h<sub>i</sub> >=<sub>g</sub> h<sub>j</sub>*) se:

> ∀x ϵ X | h<sub>j</sub>(x) == 1 --> h<sub>i</sub>(x) == 1

Cioè tutti gli esempi che sono soddisfatti dall'ipotesi più specifica sono sempre soddisfatti anche dall'ipotesi più generale.

Può essere che due ipotesi possono non essere comparabili tra loro.

##Find-S

Algoritmo che permette di trovare tra tutte le ipotesi, quella più specifica e consistente con l'insieme di apprendimento.

Si parte da un training set *Tr* e si inizializza *h* con l'ipotesi più specifica di tutte.

Per ogni istanza positiva *x* del training set, cioè per tutti gli esempi che appartengono al concetto, si modifica *h* in modo che riesca a soddisfare l'esempio *x*.

Una volta terminate le istanze presenti nel training set viene ritornata *h*.

L'algoritmo parte dall'ipotesi più specifica possibile e man mano che procede nell'analisi del training set la generalizzarla, in modo da trovare la prima ipotesi consistente con il training set che sia il più specifica possibile.

L'ipotesi più specifica di tutte è quella che rifiuta tutti i valori, poi per ogni istanza del training set positiva, questa viene generalizzata il meno possibile in modo che venga soddisfatta l'istanza che si sta esaminando.

Bisogna notare che l'ipotesi più specifica non è sempre la migliore, inoltre per funzionare bene il training set dovrebbe essere molto grande.

##Candidate Elimination

**Version space**: sottoinsieme dello spazio *H* contenete solo ipotesi che sono consistenti con gli esempi del training set.
Per essere contenuta nel version space, un'ipotesi deve essere più generale o equivalente a quella ottenuta con Find-S.

Dal momento che Find-S ritorna solamente un ipotesi e non è detto che quella ritornata sia l'ipotesi migliore per il training set è stato proposto l'algoritmo Candidate Elimination che ritorna tutte le ipotesi contenute nel version space.

**Confine più specifico**: *S*, insieme delle ipotesi *s* in *H*, consistenti con il traingin set e tali che non esistano altre ipotesi consistenti e più specifiche.

**Confine più generale**: *G*, insieme delle ipotesi *g* in *H*, consistenti nel training set e tali che non esistano altre ipotesi più generali che siano consistenti con il trainging set.

Il version space è quindi contenuto tra i due confini, cioè contiene tutte quelle ipotesi più generali di quelle contenute in *S* e meno generali di quelle contenute in *G*, *S* e *G* inclusi.

###Algoritmo

Si inizializzano gli insiemi *G* e *S* in modo che conengano rispettivamente le ipotesi più generali e più specifiche.

```
foreach d == (x,c(x)) in Tr do
    if c(x) = 1
        rimuovi da G ogni ipotesi inconsistente con d
        per ogni ipotesi s in S e inconsistente con d
            rimuovi s da S.
            aggiungi ad S tutte le generalizzazioni minime h di s tali che sono consistenti con d ed esiste un altra ipotesi g in G più generale di h.
            rimuovi da S tutte le ipotesi s' che sono più generali di altre ipotesi in S.
    if c(x) == 0
        rimuovi da S tutte le ipotesi inconsistenti con d
        per ogni ipotesi g in G inconsistente con d
            rimuovi g da G
            aggiungi a G tutte le specificazioni (?) minime h di g tali che siano consistenti con d e che esiste un'altra ipotesi s in S più specifica di h.
            rimuovi da G tutte le ipotesi g' che sono più specifiche di altre ipotesi in G.
```

Quando viene trovato un esempio *d* nel training set che soddisfa il concetto che si cerca di apprendere:

- Vengono rimosse da *G* e da *S* tutte le ipotesi che sono inconsistenti con *d*, questo perché il version space deve contenere solo ipotesi consistenti con il traingin set.
- Per ogni ipotesi *s* rimossa da *S* viengono aggiunte tutte le generalizzazioni minime di *s* che sono in grado di soddisfare *d*, questo per andare a definire delle nuove ipotesi specifiche e consistenti con il Tr.
- Vengono poi rimosse tutte le ipotesi *s'* da *S* che sono più generali di altre ipotesi presenti in *S*, così facendo *S* conterrà sempre e solo le ipotesi più specifiche.

Se *d* non soddisfa il concetto viene applicato lo stesso scambiando i due insiemi.