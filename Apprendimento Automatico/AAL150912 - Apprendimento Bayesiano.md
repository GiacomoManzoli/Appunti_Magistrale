#Lezione 15 - Apprendimento Bayesiano

Si tratta di algoritmi di apprendimento basati sulla probabilità e sul teorema di Bayes.

##Scelta delle ipotesi

Tutto si basa sulla formula di Bayes.

> P(h|D) = P(D|h)P(h)/ P(D)

L'obiettivo è quello di massimizzare *P(h|D)*, sapendo *P(D|h)* che viene fornito dal supervisore e *P(h)* che viene appresa.

Nel massimizzare si può tralasciare il termine *P(D)* dal momento che è sempre costante.

> h<sub>MAP</sub> = argmax<sub>[h ϵ H]</sub> P(h|D)P(D)

Si può inoltre assumere che tutte le ipotesi *h* abbiano la stessa ipotesi e nel mondo reale questa assunzione è tipicamente corretta, il problema di massimizzazione diventa:

> h<sub>ML</sub> = argmax<sub>[h ϵ H]</sub> P(h|D)

A pagina 158 del Mitchel c'è un esempio che mette in evidenza come le probabilità a priori influenzino il risultato.

##Brute Force MAP Learning (interpretazione Find-S)

Si assumono fissate le istanze x1 ... xn.

Si assume D essere lìinsieme dei valori derisderati D 
= {c(x1)...c(xn)}

Considerando tutte le ipotesi equiprobabili: *1/|H|*

> P(D|h) = 1 se h è consistente con gli elementi di D
> 
> P(D|h) = 0 altrimenti 

Supponiamo inoltre che non sia presente del rumore.

In questo modo la probabilità *P(h|D)* si ottiene applicando la regola di Bayes, in particolare:

> P(h|D) = 0 se h è non è consistente con D
> 
> P(h|D) = 1/VS<sub>H,D</sub> se h è consistente con D

Quindi se tutte le ipotesi *h* sono equiprobabili, allora qualsiasi ipotesi presente in *H* va bene con probabilità  *1/VS<sub>H,D</sub>*.

Se vengono cambiate le probabilità in modo che la probabilità di un'ipotesi più specifica sia più alta si ottiene che *P(h|D) = P(h)*.

##Apprendimento di una funzione (ML)

> di = f(xi) + ei

dove Ei è l'errore che segue una probabilità gaussiana con media 0 di cui non si conosce la varianza.

> ei = di - f(xi)

Però si vuole valutare l'errore come se al posto di *f* (che è sconsociuta) ci fosse *h*

> ei = di - h(xi)

La probabilità di *P(di|h)*, cioè che l'ipotesi *h* classifichi correttamente *di* segue la distribuzione guassiana di *ei*.

> h<sub>ML</sub> = argmax<sub>[h ϵ H]</sub> P(D|h)
> 
> h<sub>ML</sub> = argmax<sub>[h ϵ H]</sub> (produttoria) P(di|h)
>
> h<sub>ML</sub> = argmax<sub>[h ϵ H]</sub> (produttoria) gaussiana di (di-h(xi))

Dal momento che la gaussiana contiene un'esponenziale, conviene utilizzare il logaritmo, tanto per il problema di massimizzazione è la stessa cosa.

**fai screen delle slide per i conti**

Segue quindi che

> h<sub>ML</sub> = argmin<sub>[h ϵ H]</sub> (sommatoria)(di-h(xi))<sup>2</sup>

Quindi per trovare l'ipotesi **maximum likelihood** è necessario minimizzare l'errore quadratico, sotto le ipotesi che la probabilità di ogni ipotesi è uniforme e assumendo che non ci sia rumore nei dati di training.

###Classificazione

Finora abbiamo cercato l'ipotesi più probabile per i dati *D* (*h<sub>MAP</sub>*), ma dato un nuovo esempio, qual'è la classificazione più probabile? Non sempre

Supponiamo di avere *P(h1|D)=0.4*,*P(h2|D)=0.3*, *P(h3|D)=0.3*, data una nuova istanza *x* può succedere che *h1(x) = (+)* e *h2(x) = h3(x) = (-)*. Quindi considerando le tre ipotesi, la classificazione più probabile è *(-)* e non *(+)*.

Segue che la **classificazione ottima di Bayes**:

> argmax<sub>[v ϵ vj]</sub> (sommatoria<sub>[h ϵ H]</sub>) P(vj | h)P(h)

Si va cioè a considerare tra tutte le ipotesi, pesate per la loro probabilità, e si considera come classe quella che compare più volte.

####Classificazione di Gibbs

Dal momento che il classificatore ottimo di Bayes potrebbe essere molto costoso da calcolare se ci sono tante impotesi.

Si può tulizzare un'alternativa, scegliendo un ipotesi a caso, secondo la probabilità *P(h|D)* e utilizzando quell'ipotesi per classificare la nuova istanza, si ottiene un errore medio minore del doppio dell'errore medio che si ottiene utilizzando il classificatore ottimo.

> E[errore<sub>Gibbs</sub>] <= E[errore<sub>OttimoBayes</sub>]

Sempre assumendo probabilità uniforme per tutte le ipotesi del version space.