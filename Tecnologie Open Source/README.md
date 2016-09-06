Tecnologie Open Source
======================

Questo repository conterrà tutti gli appunti relativi al corso di Tecnologie open-source frequentato all'università di Padova e tenuto dal Professor Francesco Tapparo.

Gli appunti sono stati realizzati in LaTeX e sono il prodotto dell'unione degli appunti presi a lezione e la trascrizione delle registrazioni nell'A.A. 2013/2014. 
Il contenuto degli appunti potrebbe non coprire eventuali aspetti ed argomenti tenuti negli anni accademici successivi, Il registro utilizzato è simile a quello tenuto a lezione.


Si invita chiunque volesse contribuire con correzioni, incrementi o proposte di miglioramento a scrivere personalmente a uno dei contributori del progetto. In alternativa si può forkare il repository ed eseguire una pull request o richiedere di essere inserito tra i collaboratori.

Non è ancora stato istituito un'insieme di etichette per le issue ma chiunque volesse aprirne una farebbe solo che piacere.

## Argomenti affrontati

* Introduzione al corso
* La storia del copyright
* La storia del software libero
* L'ultimo degli hackers
* Il movimento open-source
* Licenze software
* Open Content
* SVN

## Da sviluppare

* RDF
* Mercurial

## Come ottenere l'output in pdf

Il documento finale è stato realizzato unendo diversi capitolo scritti in LaTeX. Per ottenere il pdf è necessario dotarsi di un compilatore LaTeX con i pacchetti indicati sotto. 

(images/cc_by.png) Il PDF ottenuto, eventuali stampe e altre opere derivate da questo sorgente sono da intendersi come rilasciate sotto licenza CC-BY-SA 4.0 https://creativecommons.org/licenses/by-sa/4.0/

### Linux

Per comodità è stata scritta una regola nel Makefile per la compilazione. Vi basta, da terminale, clonare il repository, accedere alla cartella e avviare il Makefile digitando:

`make document`

### Step by step on Windows

* Scaricare MiKTeX da [qui](http://miktex.org/portable)
* Dal package manager installare i pacchetti indicati sotto ( [qui](http://docs.miktex.org/manual/pkgmgt.html) una breve guida per usare il package manager)
* Lanciare TeXworks, per compilare il file TecnologieOpenSource.tex un click sulla freccia verde, accettare l'installazione di ulteriori altri pacchetti, fine.

Se per qualche ragione non si riuscisse a compilare i sorgenti contattate uno dei collaboratori di persona per avere il pdf già compilato. In ogni caso, appena raggiunta una major release, il documento sarà pubblicato su un sito di scambio.

## Pacchetti LaTeX necessari

Allo stato attuale è risultato necessario utilizzare i seguenti pacchetti:

* `inputenc`;
* `hyperref`;
* `titlesec`;
* `amssymb,amsmath`;
* `babel`;
* `tocloft`;
* `appendix`;
* `graphicx`;
* `wrapfig`;
* `xcolor`;
* `eurosym`;
* `listings`;
* `fancyhdr`;
* `lastpage`;
* `ragged2e`.
* `xmpincl`.

## Autori

* Luca De Franceschi - <luca.defranceschi.91@gmail.com>;
* Federico Silvio Busetto - <fedsib@hotmail.it>;
* Giacomo Manzoli

## Ulteriori informazioni

* [Sito web del corso](http://www.math.unipd.it/~tapparo/TOS/index.html)

