#Lezione 28 - JVM 2 (metodi) e polimorfismo


Le istruzioni da eseguire per invocare un metodo cambiano in base al tipo statico.

Se il tipo statico è una classe, l'invocazione viene convertita con `invokevirtual`, altrimenti se è un'interfaccia viene utilizzato `invokeinterface`.

##Invokevirtual

```java
Object x;
x.equals("test");
```

In bytecode viene convertita con:

```
aload 1 //push x assumendo che sia la prima variabile locale
invokevirtual #23
```

dove `#23` riferisce l'entrata della constant pool e deve essere una struttura di tipo `methodref_info` e che contiene il nome della classe dell'oggetto e il nome e i tipo del metodo invocato.

L'esecuzione di invokevirtual si basa sull'oggeto d'invocazione `x` e accede alla tabella dei metodi della classi di `x` cercando un metodo con specifica uguale a quella trovata nell'entrata `#23` della constant pool.
Se questo viene trovato, il compilatore riesce a trovare l'indirizzo della method area con il codice da invocare per il metodo.

Se non viene trovato, la ricerca continua tra i metodi delle superclass e nel caso peggiore solleva un'eccezione.

Per aumentare l'efficenza, una volta trovato il metodo da invocare, l'istruzione `invokevirtual #23` viene sostituita con `invokevirtual_quick d`, dove `d` è la posizione del metodo nella tabella dei metodi della classe.
Questo codice rende possibile il dynamic lookup perché in Java le classi in gerarchia hanno le tabelle dei metodi conformi.

##Invokeinterface

Se il tipo statico è un'interfaccia, per invocare il metodo viene utilizzato `invokeinterface` perché non si può più sfruttare la conformità tra le tabelle dei metodi.
Ad esempio `invokeinterface #24`.

All'esecuzione dell'istruzione, viene cercata nell'entrata `24` della constant pool una struttura `interfaceMethod_ref` che specifica il metodo che si vuole invocare.

La classe dell'oggetto in cima alla pila deve implementare quell'interfaccia ed avere il metodo trovato.

La differenza principale sta nel fatto che **non** si può sostituire l'istruzione con la versione quick, perché non è detto che tutte le classi che implementano l'interfaccia abbiano il metodo sempre nella stessa poszione delle tabella dei metodi.

Si può comunque ottimizzare la cosa tenendo una cache. 
Infatti, una volta risolto il metodo, è nota sia la classe dell'oggetto dinamico, sia l'offeset nella tabella dei metodi. 
In questo modo, la prima volta che viene eseguita l'invocazione del metodo con un oggetto di una determinata classe viene fatta la ricerca e salvato il risultato nella cache. 
Così facendo, se l'esecuzione successiva ha lo stesso tipo dinamico è possibile recuperare il valore dalla cache, evitando la ricerca. Se invece il tipo dinamico non compare in cache è necessario fare una nuova ricerca.

## Polimorfismo

(Sezione 6.4 e 6.5 nel libro)

Esistono più tipi di polimorfismo:

- **Polimorfismo parametrico**: riguarda il tipo delle funzioni, ovvero funzioni che possono prendere parametri di tipi diversi, ad esempio `sort: (‘a * ‘a -> bool)*’a list -> ‘a list`. In ML e Haskell il polimorfismo di tipo è implicito e viene inferito automaticamente, mentre in C++ è necessario utilizzare i template.
- **Polimorfismo ad hoc**: riguarda l'overloading delle funzioni, lo stesso nome di funzione può essere usato con parametri di tipo diverso.
- **Polimorfismo di sotto tipo**: legato al dynamic lookup e dynamic binding, deriva dal fatto che quando ci si aspetta un oggetto di un determinato tipo, questo può essere di un altro sotto tipo.

Rimane da affrontare quello parametrico.

### Polimoformismo parametrico in C++

In C++ è possibile utilizzare i template per definire delle variabili di tipo in modo da scrivere del codice generico. Prende il nome di polimorfismo esplicito perché deve essere presente una keyword.

```c++
void swap (int &x, int &y)
{
    int tmp=x; x=y; y=tmp; 
}

template<typename T>
void swap(T & x, T & y)
{
    T tmp=x; x=y; y=tmp;
}
// ...

int i, j; swap(i,j); // T = int
string x,y; swap(x,y); // T = string
```

Il polimorfismo parametrico è utile quando si vuole che un algoritmo generico funzioni utilizzando variabili di tipo diverso.

Per quanto riguarda ML e Haskell, il polimorfismo è implicito, ci pensa l'algortimo di inferenza automatica a rilevare se la funzione è polimorfa o meno. E anche in questo caso le variabili di tipo vengono istanziate all'invocazione della funzione. Questo avviene anche in C++.

L'implementazione del polimorfismo è diversa tra Haskell e C++, questo perché in C++ l'implementazione dei valori dei diversi tipi è diversa, pertando il codice che manipola questi valori è specifico per ciascun tipo.
Mentre in ML/Haskell l'impementazione dei valori di tipi diversi è **uniforme** e quinti la manipolazione dei valori è uniforme per tutti i tipi.

Long story short: in C++ serve del codice ad hoc per ogni instanziazione del template, in Haskell/ML no (lo stesso codice va bene per tutti i tipi).

In C++, quando e da chi vengono prodotte le diverse istanze di una funzione template `F(T x)`? Considerando il caso in cui un programma è costruito da più unità di compilazioni (programma diviso su più moduli).

Ci sono due modelli di risuluzione:

- **inlcusione**: le istenze vengono realizzate durante la compilazione di ciascun pezzo del programma. Ad esempio se il programma è diviso in 3 pezzi, la compilazione di uno di questi, produce anche il codice per le varie `F(T x)`, istanziata per i vari tipi con i quali viene invocata. È necessario però che ogni parte del programma abbia tutto il codice della funzione template in modo che riesca a compilare il template, non basta la firma del metodo, pertanto è necessario che il template sia ripetuto in ogni parte del programma con il rischio che questi siano diversi.
- **separazione**: le istanze dei template vengono generate quando i diversi componenti del programma vengono linkati tra di loro. In questo modo la compilazione di una singola parte non produce nessuna istanza dei template, ma vengono prodotti solamente quando tutto il codice è disponibile.

La prima soluzione richiede che ogni utinità abbia a disposizione il codice di template. 
La stessa istanza può essere prodotta da più parti distinte, pertanto durante il link devono essere rimosse le copie multiple dello stesso template.

Inoltre il template può richiedere altre definzioni gloabali, ad esempio:

```c++
//file3.h
#include<iostream>
using namespace std;
template <class T> void f(T);
#include "file3.C"

//file3.C
void g(int x){cout<<"di file3.C "<<x<<endl;}
template <class T> void f(T t) { g(0); }

//caller3.C
#include "file3.h"
void g(double x){cout<<"di caller "<<x<<endl;}
void h() { f(3.14); g(2);}
main(){ h();} // "di file3.C 0" "di file3.C 2"
```

In questo caso l'inclusione del template porta con se anche la definzione di `g(int)`, che viene resa disponibile anche dentro il file `caller3.C`. Questo fenomeno prende il nome di **name hijack** o cattura dei nomi globali.

Il vantaggio dell'**inclusione** è che è semplice da implementare, ma ci sono dei problemi con i nomi globali e nella gestione dei duplicati durante la fase di link.

Utilizzando l'approccio di **separazione**, esiste una sola definizione del template e tutte le unità hanno solo il prototipo.
Quindi la compilazione delle singole unità non genera istanze del templalte.

Solo in fase di link la definzione del templeate e tutte le sue possibili istanzazioni vengono "accoppiate" e pertanto diventa possibile compilare le istanze necessarie.

Il problema in questo caso è che la fase di link è una fase avanzata della compilazione, pertanto certi errori possono essere rilevati solo quando si è arrivati a questa fase.
Inoltre, si deve aggiungere la responsabilità di compilare i template al linker.

### Polimorfismo di tipo in ML

In ML il discorso è più semplice, dal momento che viene prodotta una sola versione del codice della funzione polimorfa, questo perché i tipi sono implementati in modo uniforme.

Il che significa che il passaggio dei parametnri avviene attraverso dei puntatori e generlamente tutto il calcolo della funzione avviene tramite assegnamenti tra puntatori.

```
fun swap (x,y) = (y,x);
swap :: (t1, t) -> (t, t1)
```

```
fun K nil L = true |
    K L nil = false |
    K (a::L) (b::N) = if a > b then false
                      else if a < b then true else K L N;
```

Il tipo calcolato dall'inferenza è `K:: int list -> int list -> boolean`, questo perché non è possibile eseguire in modo generico il confronto `>`, pertanto deve essere specificato.
Se si vogliono utilizzare altri tipi, questi devono essere specificati, perdendo comunque il polimorfismo.

Per risolvere questo problema si può "nascondere" il confronto dei parametri:

```
fun K nil L confg =false|
    K L nil confg =true|
    K (a::L) (b::N) confg = if confg(a, b) then false 
                            else if confg(b,a) then true 
                            else K L N confg ;
```

così facendo viene inferito il tipo `K ::'a list -> 'b list -> ('a * 'b -> bool) -> bool` e viene mantenuto il polimorfismo, è però necessario passare come parametro anche l'operatore di confronto.

Il core business della situazione è che la maggior parte degli algortimi hanno una parte naturalmente polimorfa e delle parti più specifiche, pertanto per mantenere il polimorfismo implicito è necessario astrarre le operazioni specifiche.

In ML la maggior parte delle operazioni sono uniformi rispetto ai tipi, quindi si riesce ad avere un codice uniforme, in C++ invece la maggior parte di codice è specifico per il tipo e pertanto è necessario produrre più versioni dello stesso codice.

### Polimorfismo parametrico in Haskell

In Haskell è ancora più semplice dal momento che ci sono le classi di tipo che permettono di definire un'insieme di tipi sui quali è possibile utilizzare delle funzioni.
Il codice dell'esempio precedente diventa:

```haskell
k l [] = False
k [] l= True
k (a:b) (c:d) = if(a<c) then True
                else if(c<a) then False
                else (k b d)
```

e il tipo inferito automaticamente è `k::(Ord a)=> [a]->[a]->Bool`, dove `Ord` è la classe di tipo che raggruppa i tipi sui quali sono definite le operazioni di ordinamento.
Così facendo le istruzioni che *mettono in pericolo* il polimorfismo, vengono astratte dalle classi di tipo.
Si può osservare che c'è una certa similarità tra le classi di tipo Haskell e le inferfacce del Java.

### Tirando le somme

- La rappresentazione non uniforme porta ad avere un codice più lungo (molte istanze) ma il codice prodotto è ottimizzato e pertanto più efficente. Gli errori però vengono rilevati a link-time.
- La rappresentazione uniforme produce meno codice ma meno ottimizzato a causa della dereferenziazione dei puntatori, sia in tempo che in spazio. Gli errori vengono rilevati a compile-time. C'è da dire che i problemi di efficienza sono tipici dei linguaggi funzionali.
- In C++ l'utilizzo dei template viene favorito dalla possibilità di estendere gli operatori standard `==`, `>=`, ecc.
- In ML l'overloading esistente è limitato dagli operatori per i tipi predefiniti che non sono estendibili. È possibile con un barbatrucco raggirare questa limitazione ma questo approccio non scala con la dimensione del programma, perché è necessario andare a definire tante funzioni polimorfe da passare come parametri.
- In Haskell esiste l'overloading degli operatori ed è possibile utilizzare le classi di tipo, rendendo più semplice utilizzare il polimorfismo parametrico.


### Java Generics

Prima dell'introduzione dei Generics in Java c'era il **generic idiom**:

```java
List list = new ArrayList(); //raw type
list.add("hello");
String s = (String) list.get(0);
list.add(1); //Nessun errore
```

con l'introduzione dei generics (Java 5) il codice diventa:

```java
List<String> list = new ArrayList<String>(); //Aggiunge l'informazione riguardo al tipo degli oggetti contenuti nella lista
list.add("hello");
String s = list.get(0); //Non serve il cast
list.add(1); //Errore segnalato dal compilatore
```

Per mantenere la retro compatibilità con le versioni precedenti, il compilatore produce lo stesso bytecode omettendo il check sui parametri di tipo. Questo ha permesso di non modificare la JVM e non porta problemi perché i tipi vengono controllati staticamente prima di produrre il bytecode, quindi gli errori di tipo vengono comunque rivelati.

Entrambi i frammenti sopra producono lo stesso codice:

```java
List list = new ArrayList();
list.add("hello");
String s = list.get(0);
``` 

Questo è vero fino ad un certo punto, perché se vengono mescolate versioni diverse di Java < 5 con Java > 5, i controlli vengono mantenuti.