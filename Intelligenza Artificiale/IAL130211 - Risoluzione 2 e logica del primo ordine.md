#Lezione 13 - Riduzione 2 e logica del primo ordine

La complessità dell'algoritmo di risoluzione è esponenziale per il numero di simboli nella base di conoscenza e in 𝜶.

##Completezza della Risoluzione

**Completezza**: riesce a dedurre tutto quello che può essere dedotto dalla base di conoscenza.

Il teorema di completezza per la risoluzione nella logica proposizionale è chiamato **ground resolution theorem**: se un insieme di clausole S è insoddisfacibile, allora la chiusura della risoluzione di tali clausole RC(S) contiene la clausola vuota.

Nel nostro caso S è la base di conoscenza in ⋀ con la negazione di 𝜶.

**insoddisfacible**: non esite un modello per l'insieme di clausole, ovvero non esiste una combinazione dei letterali che rende vero l'insieme delle clausole.

La dimostrazione di questo teorema si ottiene dimostrando (per assurdo) che se la chiusura RC(S) non contiene la clausola vuota, allora S è soddisfacibile.

Se la chiusura di S **non contiene** la clasusola vuota si può costruire un modello per S, perché se c'è una clausola vuota vuol dire che c'è una contrattiddizione e quindi non è possibile costruire un modello.

Si può provare quindi a costruire un modello a partire dai vari letterali P<sub>1</sub>, ..., P<sub>k</sub> che compaiono in S.

Quindi, per ogni P<sub>i</sub>:

- Se esiste una clausola in RC(S) contiene not(P<sub>i</sub>) e tale che tutti gli altri letterali della clausola sono falsi a causa dei valori di verità già assegnati ai P precedendi, allora assegna il valore di verità falso a P<sub>i</sub>.
- altrimenti assegna a P<sub>i</sub> vero.

Questo perché sto cercando di creare un modello per RC(S) e ad ogni passo cerco un valore per P<sub>i</sub> in modo che non ci siano clausole che non sono soddisfatte.

Tenendo presente che in RC(S) non c'è la clausola vuota per ipotesi, rimane da dimostrare che tale procedura termina sempre e produce un modello per S.

Questo si dimostra per induzione su i: supponiamo che sia possibile costruire il modello parziale per i simboli fino a P<sub>i-1</sub> e mostriamo che tale modello può essere esteso fino a P<sub>i</sub>.

**Caso base: i = 1**

In questo caso, in RC(S) non possono essere presenti sia P<sub>1</sub> sia not(P<sub>1</sub>), perché altrimenti l'applicazione dell'algoritmo di risuluzione non sarebbe terminata, questo perché le due clausole P<sub>1</sub> e not(P<sub>1</sub>) possono essere risolte con la clausola vuota. Quindi è presente solo o P<sub>1</sub> o not(P<sub>1</sub>) e di conseguenza P<sub>1</sub> vale falso se è presente not(P<sub>i</sub>), altrimenti vero. 

Questa scelta è vincolata perché stiamo cercando di costruire un modello per S. 

**Caso induttivo:**

Consideriamo una clausola C in RC(S) che contiene P<sub>i</sub>, si hanno dei problemi ad assegnare un valore di verità a P<sub>i</sub> solo se C equivale a B ⋁ not(P<sub>i</sub>), con B clausola che contiene solo simboli P<sub>j</sub> con *j < i*, cioè simboli ai quali ho già fissato un valore di verità, ed esiste C' in RC(S) ed equivalente a B' ⋁ P<sub>i</sub> con B' clausola che contiene solamente simboli P<sub>j</sub> con *j < i*.

Il problema della scelta del valore è che, per rendere vera sia C che C', P<sub>i</sub> dovrebbe essere sia vero sia falso, e quindi non si sa cosa scegliere.

Ma, se esistono queste due clasuole, in RC(S) deve essere presente anche la clausola B ⋁ B' altrimenti RC(S) non è la chiusura, questo perché se riduco C con C' ottengo B ⋁ B'.

Per l'ipotesi induttiva, l'assegnamento parziale fino a P<sub>i-1</sub> non può rendere falsa sia B che B' (questo per come sono stati scelti i valori).

Quindi, se B è falsa allora P<sub>i</sub> è falso e se invece B' è falso allora P<sub>i</sub> è vero, ottenendo così un modello parziale fino all'indice *i*.

Quando *i* coincdice con *k* si ottiene un modello completo per *S* e di conseguenza *S* è soddisfacibile.

##Riassunto

Gli agenti logici applicano l'inferenza ad una base di conoscenza per derivare nuova informazione e prendere decisioni.

Forward e Backward chaining sono lineari, completi e corretti per le clausole di Horn, mentre la Risoluzione è completa e corretta, ma nel caso pessimo ha una complessità esponenziale.

Manca però del potere espressivo.

## Pro e contro della logica proposizionale

La logica proposizionale è dichiarativa e i pezzi di sintassi corrispondono a fatti.

Permette anche di esprimere infomrazione parziale/disgiuntiva/negata, al contrario di basi di dati o strutture dati dove vengon utilizzati solo i fatti.

La logica Proposizionale è composizionale, il significato di B ⋀ P è conseguenza del significato di B e P, non ci sono valori di contesto che influenzano il valore di verità.

Il significato di questa logica è **indipendente dal contesto**, al contrario del linguaggio naturale dove il significato dipende dal contesto.

Tuttavia la potenza espressiva di questa logica è molto limitata.
Ad esempio non si può esprimere "le trappole causano la brezza in quadrati adiacenti se non scrivendo" una sentenza per quadrato.

##Logica del primo ordine

In quasta logica, come nel linguaggio naturale, si assume che il mondo contenga:

- **Oggetti**: persone, case, ecc...
- **Relazioni**: predicati che mettono in relazione gli oggetti tra di loro. Pssono essere unarie (proprietà) o n-arie. Es: è ventosa, è andiacente a, ...
- **Funzioni**: relazioni particolari che hanno un solo valore per ogni input. Es: miglior amico di, padre di, ...

###Sintassi

- **Costanti**: rappresentano gli oggetti come: ReGiacomo, 2, UP...
- **Predicati**: rappresentano le varie relazioni: Fratello, >,...
- **Funzioni**: Sqrt, GambaSinistraDi, ...
- **Variabili**: x,y,a...
- **Connettivi**: ⋁, ⋀
- **Ugualianza**: =
- **Quantificatori**: ∀, ∃

Ogni simbolo di funzione e di predicato ha una sua specifica arietà che specficia il numero di parametri che riceve

###Sentenze atomiche e complesse

**Termine**: *funzione(termine<sub>1</sub>,...)* o costante o variabile, cioè un'espressione logica che si riferisce ad un oggetto.

Un termine complesso è un modo di dare un nome ad un oggetto combinando uno o più termini semplici utilizzando una funzione.

Consideriamo un termine *f(t<sub>1</sub>, ..., t<sub>n</sub>)*, il simbolo di funzione *f* si riferisce ad una qualche funzione del modello che chiameremo *F*. I termini usati come argomento danno un riferimento agli oggetti del dominio che indicheremo con *d<sub>1</sub> ... d<sub>n</sub>*, nella sua interezza il termine indica quindi l’oggetto che corrisponde al valore della funzione *F* applicata a *d<sub>1</sub> ... d<sub>n</sub>*.

**Sentenza (formula) atomica**: *predicato(termine<sub>1</sub>, termine<sub>2</sub>, ...)* o *termine<sub>1</sub> = termine<sub>2</sub>*. Permettono di asserire dei fatti.

Una formula atomica è vera in un dato modello sotto una determinata interpretazione se la relazione a cui far riferimento il simbolo di predicato è verificata tra gli oggetti a cui fanno riferimento gli argomenti.

Le **sentenze complesse** sono delle combinazioni di sentenze atomiche create utilizzando i connettivi logici.

###Verità nella logica del primo ordine

Le sentenze sono vere rispetto ad un **modello** e ad una **interpretazione**.

Il **modello** contiene degli oggetti (elementi di dominio), delle relazioni definite tra loro e delle funzioni che possono esservi applicate.

L'**interpretazione** invece specifica i referenti per le costanti (oggetti), i predicati (relazioni) e le funzioni (relazioni funzionali). Forniscono cioè le informazioni di contesto. L'interpretazione specifica quindi una corrispondenza tra i simboli e il modello.

Una sentenza atomica *predicato(termine<sub>1</sub>, ..., termine<sub>n</sub>)* è vera se e solo se gli oggetti riferiti da *termine<sub>1</sub>, ..., termine<sub>n</sub>* sono nella relazione definita dal predicato. 

Segue che non è possibile andare a calcolare le conseguenze logiche enumerando tutti i modelli possibili, perché ci sono troppe combinazioni possibili.

###Quatificatori universali e esistenziali

Con il quantificatore ∀ è possibile definrire il concetto che un predicato P è vero per ogni *x* in un modello *m* se e sole se P è vero  per ogni possibile valore di *x*.

> Chiunque è a Padova è intelligente
> 
> ∀x Luogo(x,Padova) => Intelligente(x)

In prima apporsimazione l'esistenza è equivalente alla congiunzione di istanziazioni di P. (Tutti devono essere veri)

Se nel modello è presente anche un solo simbolo di funzione, l'enumerazione delle possibili istanziazioni di P è infinita.

Tipicamente => è il connettivo principale utilizzato con i ∀, l'uso di ⋀ è tipicamente sbagliato:

> ∀x Luogo(x,Padova) ⋀ Intelligente(x)

vuol dire che chiunque è a Padova e chiunque è intelligente, che non è la stessa cosa che si voleva dire.

Diverso è il discorso per il quantificatore esistenziale ∃.

*∃x P* è vero in un modello *m* se e solo se P è vero essendo *x* un qualche possibile valore di un oggetto nel modello.

> Qualcuno a Bologna è intelligente
>
> ∃x Luogo(x,Bologna) ⋀ Intelligente(x)

In prima apporsimazione l'esistenza è equivalente alla disgiunzione di istanziazioni di P. (Basta che ce ne sia uno di vero).

Anche in questo caso l'enumerazione con una funzione è infinita.

Il connettivo principale da usare con l'esistenza è ⋀ e tipicamente utilizzare => è sbagliato.

####Proprietà dei quantificatori:

- ∀x ∀y è commutativo, così come ∃x ∃y;
- ∃x ∀y non è la stessa cosa di ∀y ∃x.

**Dualità**: ogni quantificatore può essere espresso usando la negazione dell'altro.

> ∀x Piace(x,Gelato) == ¬∃x ¬Piace(x,Gelato)

###Uguaglianza

Una sentenza atomica può essere anche un'uguaglianza tra due termini.

*termine<sub>1</sub> = termine<sub>2</sub>* è vero per una data interpretazione se e solo se *termine<sub>1</sub>* e *termine<sub>2</sub>* si riferiscono allo stesso oggetto.

