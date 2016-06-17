# Reti neurali §4.9

panoramica generale che non serve a molto.

# Funzioni a gradini (alberi di regressione) §4.8

Ovvero una versione diversa degli alberi di classificazione.

L'idea è di prendere una funzione liscia e faccio dei tagli per discretizzarla.

Devo scegliere dove tagliare e come tagliare. Un'idea può essere di prendere la media in vari punti della funzione.

La stessa cosa può essere fatta anche se ci sono più variabili.

Rappresentazione del coso come un albero.

La funzione obiettivo è sempre la minimizzazione della devianza.

L'algoritmo di apprendimento/adattamento si chiama CART.

Discorso sulla potatura.

# Classificazione (previsione di variabili qualitative) §5.1

C'è un insieme di unità e K possibili gruppi ai quali l'unità può essere assegnata.

Si hanno a disposizone n osservazioni di cui è nota la corretta classificazione.

## Classificazione tramite regressione linare (K = 2)

Si effettua una classificazione lineare e se in predizione si ottiene un valore per y maggiore di una soglia si assegna una classe, altrimenti si assegna l'altra.

Possono anche essere usate funzioni non lineari.

Se K > 2 c'è un problema perché la regressione pone un ordinamento tra le classi che in realtà non c'è.

Si codifica quindi la variabile rispsta multi-class y attraberso delle variabili indicatrici (dummy) in modo da ottenere una matrice di variabili indicatrici.
Assegno la classe con la variabile indicatrice più alta.

C'è poi un problema di mascheramento se si utilizza il mdoello lineare.

Funzione logit al posto della retta --> **Regressione logistica**

La stima della regressione logistica non viene fatta ai minimi quadrati, ma viene utilizzata la funzione di verosimiglianza.

L'osservazione z viene collegata alla probabilità di una binomiale.

C'è anche un modello probit che al posto del logartimo utilizza l'inversa della normale.

Se K>2 prende il nome di regressione logistica multinomiale.