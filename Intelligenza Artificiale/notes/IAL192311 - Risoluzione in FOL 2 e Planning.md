#Lezione 19 - Risoluzione in FOL 2

##Esempio di base di conoscenza

```
Chiunque ami tutti gli animali è amato da qualcuno
Chiunque uccida un animale non è amato da nessuno
Jack ama tutti gli animali
O Jack o la curiosità hanno uciso il gatto, che si chiama tonno.

Query: La curiosità ha uccisolo il gatto?
```

Rappresentazione in FOL:

```
A. ∀x [∀y Animale(y) => Ama(x,y)] => [∃y Ama(y,x)]
B. ∀x [∃y Animale(y) ⋀ Uccide(x,y)] => [∀z ¬Ama(z,x)]
C. ∀x Animale(x) => Ama(Jack, x)
D. Uccide(Jack,Tonno) ⋁ Uccide(Curiosità, Tonno)
E. Gatto(Tonno)
F. ∀x Gatto(x) => Animale(x)

G: Uccide(Curiosità, Tonno)?
```

Bisogna passare in CNF

```
A. ∀x [∀y Animale(y) => Ama(x,y)] => [∃y Ama(y,x)]

(Animale(F(x)) ⋁ Ama(G(x),x)) ⋀ (¬Ama(x,F(x)) ⋁ Ama(G(x),x))
---
B. ∀x [∃y Animale(y) ⋀ Uccide(x,y)] => [∀z ¬Ama(z,x)]

¬Animale(y) ⋁ ¬Uccide(x,y) ⋁ ¬Ama(z,x)
---
C. ∀x Animale(x) => Ama(Jack, x)

¬Animale(x) ⋁ Ama(Jack,x)
---
D. Uccide(Jack,Tonno) ⋁ Uccide(Curiosità, Tonno)
----
E. Gatto(Tonno)
----
F. ∀x Gatto(x) => Animale(x)

¬Gatto(x) ⋁ Animale(x)
---

¬G: ¬Uccide(Curiosità, Tonno)
```

Si può così applicare la risoluzione

```
Gatto(Tonno), ¬Gatto(x) ⋁ Animale(x)
------------------------------------ {x/Tonno}
         Animale(Tonno)

(Uccide(Jack,Tonno) ⋁ Uccide(Curiosità, Tonno)), ¬Uccide(Curiosità, Tonno)
--------------------------------------------------------------------------
                               Uccide(Jack,Tonno)

(¬Animale(y) ⋁ ¬Uccide(x,y) ⋁ ¬Ama(z,x)), Animale(Tonno)
-------------------------------------------------------- {y/Tonno}
               ¬Uccide(x,Tonno) ⋁ ¬Ama(z,x)

(¬Uccide(x,Tonno) ⋁ ¬Ama(z,x)), Uccide(Jack,Tonno)
-------------------------------------------------- {x/Jack}
                     ¬Ama(z,Jack)

(¬Ama(x,F(x)) ⋁ Ama(G(x),x)), (¬Animale(x') ⋁ Ama(Jack,x'))
--------------------------------------------------------- {x/Jack, x'/F(X)}
         ¬Animale(F(Jack)) ⋁ Ama(G(Jack),Jack)

(Animale(F(x)) ⋁ Ama(G(x),x)), ¬Animale(F(Jack)) ⋁ Ama(G(Jack),Jack)
--------------------------------------------------------------- {x/Jack}
                       Ama(G(Jack),Jack) 

¬Ama(z,Jack), Ama(G(Jack),Jack)
------------------------------- {z/G(Jack)}
               ∅
```

È stata trovata la clausola vuota quindi è stata la curiosità ad uccidere il tonno.

Utilizzando delle query esistenziali non sempre si riesce ad ottenere una risposta corretta, ad esempio `∃w Uccide(w,Tonno)` porta ad un risultato se si usa l'ordine di risoluzione precedente, mentre se si effettua il passaggio:

```
¬Uccide(w, Tonno), (Uccide(Jack,Tonno) ⋁ Uccide(Curiosità, Tonno))
----------------------------------------------------------------  {w/Jack}
                    Uccide(Curiosità, Tonno), ¬Uccide(w, Tonno)
                    ------------------------------------------- {w/Curiosità}
                                        ∅
```
Ottenendo come soluzione `{w/Jack, w/Curiosità}` che non è la risposta corretta.

Infatti la semantica della query è "*Esiste qualcuno che ha ucciso Tonno?*" e la risposta fornita dalla risoluzione è "*Jack o Curiosità*".

##Planning

**Problema**: trovare una sequenza di azioni (piano) che raggiunge un dato goal quando eseguita a partire da un dato stato iniziale del mondo.

I goal sono usualmente specificati come una congiunzione di (sotto)goal da raggiungere.

Ci sono varie strategia per generare un piano:

- **Generative Planning**: utilizza dei principi primi legati alla conoscenza delle azioni per generare un piano, è necessario avere dei modelli formali delle azioni.
- **Case-based planning**: l'agente recupera un piano già prodotto per una soluzione simile e lo modifica per adattarlo al problema che sta affrontando.
- **Reinforcement Learning**: vengono eseguite delle azioni a caso, tenendo traccia dei risultati che si ottengono. Questi risultati vengono poi valutati per creare dei modelli di azioni da adottare in futuro.

###Assunzioni tipiche

- Il tempo è **atomico**, ogni azione può essere considerata indivisibile.
- Non sono ammesse azioni concorrenti anche se la azioni non hanno bisogno di essere eseguite in un determinato ordine. Viene sempre eseguita un'azione alla volta.
- Azioni deterministiche, il risultato delle azioni è completamente determinato e non c'è incertezza nel loro effetto (le azioni non possono fallire).
- L'agente è l'unica causa di cambiamento nel mondo.
- L'agente è omniscente, ha conoscenza completa dello stato del mondo (si assumene un mondo completamente osservabile, ovvero l'agente ha tutti i sensori che gli permettono di recuperare tutte le informazioni che gli interessano).
- **Closed world assumption**: tutte le informazioni a disposizione vengono assunte come vere, tutto quello che non si conosce è falso.

###Differenze con il problem solving

Il problema di pianificazione sembra simile ai problemi di ricerca predenemente afforntati, c'è però una grande differenza: nei problemi di ricerca non si entra mai nei dettagli del problema (stati, successori), mentre gli algoritmi di planning tengono in considerazione anche i dettagli del problema.
Questo dovrebbe renderli più efficenti, anche se al momento non lo sono.

Tipicamente in un problema di planning, gli stati, il goal e le azioni vengono decomposte in insiemi di sentenze (usualmente espresse in FOL).
Inoltre, il problem solving lavora "a stati" mentre con il planning si procede nello spazio dei piani, si parte da un piano vuoto e lo si va via via a popolare con le varie azioni.

In questo modo la ricerca procede lungo lo spazio dei piani e, ad ogni passaggio, si costruisce un piano parziale, permettendo così di creare dei sotto goal che possono essere pianificati indipendemente, riducendo la complessità del problema di pianificazione.

Ad esempio la funzione successore di un problema di ricerca andrebbe a generare tutti gli stati che possono essere raggiunti a partire da un dato stato mentre nella pianificazione vengono utilizzati i dettagli delle azioni per selezionare solo le azioni utili che permettono di avvicinarsi ad un goal.

Allo stesso modo, la descrizione a "black-box" del goal nasconde dei dettagli per il goal, i quali possono permettere di scomporre il goal in sotto-goal risolvibili a parte oppure possono essere utilizzati per valutare meglio la bontà di uno stato.

Quindi se il goal è composto da una serie di sotto goal tra loro indipendenti si può pianificare indipendentemente per ogni sotto-goal ottenendo così una pianificazione più semplice.

###Rappresentazione

Ogni stato viene rappresentato come una serie di congiunzione di fatti veri in quel determinato stato e conseguentemente un goal specifica quali fatti vengono richiesti che siano veri.

Tutte queste informazioni vengono rappresentati con sentenze logiche del primo ordine, pertanto il planning può essere visto come la combinazione della ricerca con la rappresentazione logica.

