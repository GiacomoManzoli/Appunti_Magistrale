#Intellegenza Artificiale

##Introduzione

__Intelligenza artificiale forte__: si vuole sostituire all'uomo la macchina. IBM Watson si avvicina molto a questo ambito.

__Intelligenza artificiale debole__: abilità particolari che una macchina può riprodurre (robot, auto che si guidano da sole).
Attività che possono anche essere semplici da fare ma che sono difficili da eseguire con algoritmi stabiliti a priori.

##Agente Intelligente

Un agente è una entità che percepisce un certo input e riesce a generare un certo output (agisce).

Un agente razionale (o intelligente) cerca di raggiungere i suoi obiettivi data l'informazione disponibile. Non è detto che nel raggiungere il suo obiettivo, l'agente esegua sempre l'azione migliore, in quanto potrebbe non avere una certa conoscenza.

Un agente può essere considerato come una funzione che da tutte le possibili sequenze di percezzioni estrae delle azioni ammissibili.

Sequenza di percezioni --> conoscenza a disposizione dell'agente.

Tra tutte le classi di ambienti e compiti si va a cercare sempre l'agente che offre le prestazioni migliri, tenendo in considerazione anche tutte le limitazioni computazionali che impediscono la realizzazione di una razionalità parfetta.

Bisogna quindi cercare di progettare il miglior programma date le risorse disponibili.

###Agente e ambiente

L'agente riceve delle percezioni dall'ambiente delle informazioni mediante dei sensori, e in base a queste percezioni esegue delle azioni con degli attuatori.

La funzione agente mappa quindi tutte le possibili sequenze di percezioni ad un insieme di azioni.

E' sempre possibile fare assunzioni sull'ambiente in modo da semplificare l'agente, ma questo non sempre è conventiente in quanto l'agente diventa più fragile.

###Razionlità

Fissata una misura per la presetazione che valuta la sequenza di percezioni, un agente razionale cerca di massimizzare il valore della misura delle prestazioni.

La misura delle prestazioni deve essere effettauta sulla sequenza delle percezioni ottenute, questo perché l'agente deve essere valutato in basa alla sua conoscenza (non è omniscente/chiaroveggente).

Per lo stesso motivo la razionalità e le prestazioni non sono influenzate dal successo.

###Peas - Performance Enviroment Actuatos Sensors

Sono le caratteristiche da tenere a mente quanto ci si trova a progettare un'ambiente intelligente.

__Pensando ad un taxi automatizzato__
* Misura delle prestazioni? _sicurezza, destinazione, profitto_
* Ambiente operativo? _strade, traffico, pedoni, condizioni meteo_
* Attuatori? _volante, acceleratore, freni, ..._
* Sensori? _telecamera, accelerometro, GPS, ..._






















