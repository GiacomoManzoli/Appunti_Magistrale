#Compitino 3 - Linguaggi 2015-16

## Domanda 1
Si consideri il seguente programma Haskell: 

```
x=2f y=(yx)+xg z= (fz)+xx=3f z = z+xy= g f
```Assumendo che ogni linea di codice apra un nuovo blocco e adottando lo static scope:
- si mostri lo sviluppo dello stack dei record di attivazione durante la sua esecuzione;- che valore assume y alla fine?- si specifichi gli indirizzi che il compilatore calcola per le occorrenze della variabile x nella prima f, in g e nella seconda f;- descrivere il codice che il compilatore produce per il corpo della prima funzione f.Adottando il dynamic scope, mostrare lo sviluppo dello stack dei record d'attivazione durante l'esecuzione.###Soluzione

Notazione per i record di attivazione:

```
1[CL=,AL=,Rit=,Ris=,Par=,Parz=]
```

L'evoluzione dello stack è la seguente:

```
1[CL=0; AL=0; X=2] - Dichiarazione di X
2[CL=1; AL=1; F1=(2,f1)] - Dichiarazione di F1
3[CL=2; AL=2; G=(3,g)] - Dichiarazione di G
4[CL=3; AL=3; X=3] - Dichiarazione di X
5[CL=4; AL=4; F2=(5,f2)] - Dichiarazione di F2
6[CL=5; AL=5; Y=] - Dichiarazione di Y
7[CL=6; AL=3; Rit=end; Res=EP->CL->Y; Z=(5,f2); f x= ] - Invocazione di G
8[CL=7; AL=2, Rit="+g"; Res=EP->CL->(f x); y=(5,f2); y x =] - Invocazione di f1
9[CL=8; AL=5; Rit="+f1"; Res=EP->CL->(y x); z=2] - Invocazione di f2
```Viene poi completata l'esecuzione di `f2`, eseguito il pop del record 9 ed effettauto l'aggiornamento del valore di ritorno:

```
...
7[CL=6; AL=3; Rit=end; Res=EP->CL->Y; Z=(5,f2); f x= ]
8[CL=7; AL=2, Rit="+g"; Res=EP->CL->(f x); y=(5,f2); y x = 5]
```Viene poi completata `f1` con il pop del record 8 e l'aggiornamento del valore di ritorno:

```
...
6[CL=5; AL=5; Y=] 
7[CL=6; AL=3; Rit=end; Res=EP->CL->Y; Z=(5,f2); f x = 7]
```

Infine viene completata G, con il pop del record 7:

```
...
5[CL=4; AL=4; F2=(5,f2)]
6[CL=5; AL=5; Y= 9]
```

Alla fine si ottiene `y=9`.

Durante l'esecuzione vengono calcolati i seguenti indirizzi:

```
f1  x = EP->AL->CL->x
g   x = EP->AL->CL->CL->x
    f = EP->AL->CL->f
    z = EP->z
f2  x = EP->AL->CL->x
```

Mentre il codice prodotto dal compilatore per il corpo di `f1` sarà qualcosa di simile a:

```
//Preparo il blocco per l'esecuzione di f2
EP+6 = EP	//CL
EP+7 = first(EP->Y)	///AL
EP+8 = *	//Indirizzo di ritorno
EP+9 = EP+5	//Indirizzo valore di ritorno
EP+10 = EP->AL->CL->X	//Valore per il parametro
EP = EP+6	//Aggiorno EP
JUMP code_f2	//Eseguo il codice di f2
*	//Indirizzo di ritorno
R0 = EP->(y x) + EP->Al->CL->x //calcolo del ritorno
MOVE R0 EP->CL->(f z)	//Ritorno il valore calcolato
EP = CL //Eseguo il POP
JUMP "+g"	//Ritorno al codice di g.
```
##Domanda 2Si consideri la seguente definizione Haskell:

```
y f x = f (y f) x```
Si osservi che, nel corpo della funzione ricorsiva `y`, l'ultimo `x` è il secondo parametro dell'applicazione di `f` il cui primo parametro è `(y f)`.Descrivere come viene fatta l'inferenza del tipo di `y`.

### Soluzione

