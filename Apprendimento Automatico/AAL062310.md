#Lezione 6 - Apprendimento di concetti

**concetto**: in uno spazio delle istanze X, un concetto è una funzione booleana su X, cioè una funzione che prende in input un oggetto dello spazio X e ritorna un booleano che specifica se l'elemento appartiene a quel concetto o meno.

**esempio di concetto**: l'esempio di un concetto *c* su uno spazio delle istanze X è definito come una coppia *(x,c(x))* con x € X, e *c(x)* è la funzione concetto applicata ad x.

**soddsfacimento**: sia h un ipotesi booleana definita per lo spazio delle istanze X, si dice che h soddisfa x € X se h(x) = 1 (è vera)

**consistenza**: sempre la stessa h di prima, si dice che h è consistente con un esempio se, dato un esempio *(x,c(x))* allora *h(x) == c(x)*. La stessa definizione può essere generalizzata anche con un insieme di esempi.

##Ordine parziale

Siano h_i e h_j due funzioni booleane definite su uno spazio delle istanze X, diciamo che h_i è più generale o equivalente di h_j (h_i >=_g h_j) se:

> per ogni x € X | h_j(x) == 1 --> h_i(x) == 1

Il che vuol dire che per tutti gli esempio soddisfatti dall'ipotesi più specifica sono sempre soddisfatti anche dall'ipotesi più generale.

Può essere che due ipotesi possono non essere comparabili tra loro.

##Find-S

Algoritmo che permette di trovare tra tutte le ipotesi, quella più specifica ma che è consistente con l'insieme di apprendimento.

Si parte da un training set *Tr*.

Si inizializza *h* con l'ipotesi più specifica di tutte.

Per ogni istanza positiva del training set, cioè per tutti gli esempi che appartengono al concetto, si rimuovono da *h* tutti i letterali che non sono soddisfatti da *x*.

L'algoritmo parte dall'ipotesi più specifica possibile e va a generalizzare, in modo da trovare la prima ipotesi consistente con il training set in modo che sia il più specifica possibile.

L'ipotesi più specifica di tutte è quella che rifiuta tutti i valori, poi per ogni istanza del training set positiva, vado a generalizzare il meno possibile l'ipotesi più specifica in modo che venga soddisfatta la data istanza.

L'ipotesi più specifica non è sempre la migliore, inoltre per funzionare bene il training set dovrebbe essere molto grande.

**version space**: sottoinsieme dello spazio H consistente con gli esempi del training set.

Per essere contenuta nel version space, un'ipotesi deve essere più generale o equivalente a quella ottenuta con Find-S.

##Candidate Elimination

Algoritmo che permette dei bound per il version space.

**Confine più specifico**: S, insieme delle ipotesi s in H, consistenti nel traingin set e tali che non esistano altre ipotesi consistenti e più specifiche.

**Confine più generale**: G, insieme delle ipotesi g in H, consistenti nel training set e tali che non esistano altre ipotesi più generali che siano consistenti con il trainging set.

Il version space è quindi contenuto tra i due confini, cioè contiene tutte quelle ipotesi più generali di quelle contenute in S e meno generali di quelle contenute in G, S e G inclusi.

###Algoritmo

Si inizializzano gli insiemi G e S.

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
