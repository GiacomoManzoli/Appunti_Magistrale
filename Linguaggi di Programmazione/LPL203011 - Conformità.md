#Lezione 20 - Conformità

*gran parte della lezione è stata occupata dalla didscussione riguardo la didattica della laurea magistrale*

**Che influenza ha la calcolabilità nei linguaggi di programmazione?**

Tesi Church fornisce la definizione di funzione calcolabile, cioè tutte le funzioni parziali ricorsive, che possono essere calcolate utilizzando vari approcci. Si tratta di una tesi e non un teorema perché si tratta di una semplice intuizione.

Tutti i linguaggi di programmazione che permettono l’iterazione e/o la ricorsione riescono a calcolare tutte le funzioni parziali ricorsive.

Inoltre, l’esistenza di funzioni non decidibili comporta che non è possibile calcolare alcune proprietà dei programmi, come la terminazione.
Quindi quando si progetta un compilatore c’è da tenere in considerazione che devono essere utilizzate delle approssimazioni di queste proprietà.

Esiste la tecnica di riduzione che permette di stabilire la decidibilità di un problema a partire da un problema che si sa essere non decidibile.



##Conformità

Si dice che due classi in gerarachia tra loro sono **conformi** quando i campi dati della classe derivata sono nello stesso ordine dei campi dati della classe base. 

In Smalltalk non viene forzata la conformità ed è per questo che viene utilizzato il template. 
Se la conformità viene forzata dal compilatore, allora il template non è più necessario.

In Simula i campi dati di un oggetto si trovano nei vari record di attivazione che compongno l'oggetto, garantendo così la conformità.
Un oggetto Smalltalk invece contiene tutti i campi dati, compresi delle classe base, quindi l'ordine con il quale compaiono nella classe derivata può non essere conforme a quello della classe base.

In Smalltalk c'è comunque bisogno di una ricerca a runtime quando viene richiesta l'invocazione di un metodo che non è ridefinito nella classe base. Questo approcccio è costoso, però si possono migliorare le prestazioni tenendo una cache dei metodi invocati di recente (Java adotta questo approccio).

Tornando sul discorso della conformità, se viene imposta la conformità tra classe base e le sue derivate, allora quando viene modificata la classe base, devono essere ricompilate anche tutte le classi derivate.

In Smalltalk il subtyping e l'ereditarietà sono indipendenti.

I tipi sono dati dall'interfaccia delle classi, cioè dai messaggi che possono ricevere, quindi due oggetti che non sono in una relazione di erediterietà possono avere tra loro una relazione di subtyping.

Il legame tra erediterietà e subtyping esiste, ma non è né necessario né sufficente, questo perché in Smalltalk uan classe derivata può evitare di ereditare dei metodi della classe base (**ereditarietà selettiva**).

##Modulatità

Perché un linguaggio orientato agli oggetti sia **puro**, ogni classe deve poter essere sostituita da un suo sottotipo senza che il programma smetta di funzionare. Questa modularità deve essere garantita anche per le classi "standard" come quella degli interi.

Dal momento che Smalltalk è basato sull'invio di messaggi, può essere considerato come un linguaggio puro, ottenendo però un programma più inefficente.

