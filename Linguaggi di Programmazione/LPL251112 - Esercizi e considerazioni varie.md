#Lezione 25 - Esercizi e considerazioni varie

Quando una sottoclasse fa l'overriding di un metodo virtuale, la visibilità del metodo deve rimanere la stessa. Se questa viene modificata, il compilatore ignora la modifica.

**Filosofia di programmazione del C++**: nelle sottoclassi si aggiungo metodi con nuovi nomi e al più si fa overriding dei metodi ereditati. Lo stesso approccio vale anche per la visibilità dei metodi che non va cambiata nelle sottoclassi.

##Metodi fantasma (proposta di modifica del c++)

Sono metodi che si comportano come metodi virtuali solo se viene effettuato l'overriding. Sono ereditabili sono se la classe li ridefinisce, altrimenti non vengono ereditate

```c++
class A{
...
    public: phantom void f() {....}
};
class B: public A{
    public: /* no def of f */
};

//---

A* a = new A();
a->f() // ok
B* b = new B();
b->f() // errore, rilevabile a compile time

a = b;
a->f() // non si riesce a rilevare questo errore (almeno a compile time)
```

Inoltre, viene violato il fatto che in C++ l'eredietarietà pubblica soddisfa la definizione di sotto-tipo. 

##Visibilità

```c++
class Base{
public: virtual f(){...}
};
class Derived: public Base{
private: virtual f(){...}
};
```

È ragionevole che l'ereditarietà pubblica implichi il subtyping, perché con l'ereditarietà pubblica viene garantito che l'interfaccia della classe derivata contenga l'interfaccia della classe base.

Per quanto detto all'inzio della lezione, nel programma sopra riportato, il compilatore ignora il fatto che la visibilità del metodo overridden sia stata cambiata.

```c++
int g(Base &x) { return x.f()+1; }
main() {
    Base b; cout<<“g(b)=“<<g(b)<<endl; //Invoca f della classe base
    Derived d; cout<<“g(d)=“<<g(d)<<endl; //Invoca f della classe derivata
}
```

Il codice precedente permette di invocare un metodo privato di un'oggetto, creando un'incoerenza sulla definizione delle interfacce.
Questo perché, il compilatore darebbe un errore sull'invocazione `d->f()` perché privato, ma le istruzioni `Base* b = new Derived(); b->f()` compila ed esegue correttamente, invocando il metodo `D::f`.

##Subtyping e overriding

```c++
class A{
    public:
        A(int x){a=x;}
        void g(int x){f(x);}
    private:
        int a;
        virtual void f(int x){cout<<x<<endl;}
};
class B: public A{
    public:
        B(int x):A(x){}
    private:
        virtual void f(int x){cout<<x+2<<endl;}
};

main() {
    A* a= new A(2);
    B* b=new B(3);
    a->g(1); //1
    a=b;
    a->g(1); //2
}
```

Il C++ permette di avere anche i metodi privati virtuali, e questi sono overriddabili dalle classe basi, pertanto:

1. L'invocazione di `g` esegue `A::f`
2. L'invocazione di `g` esegue `B::f`

Inoltre, se `B::f` non fosse virtuale, il compilatore si comporterebbe allo stesso modo, considerandolo comunque come un override di un metodo virtuale.

Se `B::f` fosse `public`, verrebbe solamente cambiata l'interfaccia di `B`, senza andare ad influire sul subtyping tra `B` e `A`.

##Eiffel 

```
class Point
x:int
method equals (pt: like current): bool return self.x==pt.x

class ColPoint inherits Point
color:string
method equals (cpt: like current): bool return self.x==cpt.x and self.color==cpt.color
```

Eiffel permette di utilizzare il tipo `like current` che rappresenta il tipo dinamico della classe.
L'utilizzo di questo tipo viene utilizzato in Eiffel per effettuare l'overriding dei metodi.

Nell'esempio, la classe `ColPoint` non è sotto tipo di `Point`, perché i parametri della funzione `equals` di `ColPoint` non sono un sovra-tipo di quelli della funzione `equals` di `Point`.

Ad esempio il codice:

```
Point p = new ColPoint()
p.equals(new Point())
```

in questo caso il compilatore non riesce a trovare l'errore, perché i tipi statici coincidono, ma quelli a runtime i no.

Tuttavia Eiffel permette di considerare `ColPoint` come sotto tipo di `Point` anche se questo può portare errori a runtime.
Quando i volponi che hanno fatto il linguaggio si sono accorti che la cosa è sbagliata, hanno aggiunto un sistema di analisi statica per rilevare questi errori.

Il problema è che la ricerca di questo errore è non decidibile, quindi il l'analisi statica introdotta fornisce un'approsimazione, quindi ci sono dei casi in cui l'analisi statica segnala degli errori che in realtà non ci sono (questo perché l'approsimazione deve essere pessimistica).

