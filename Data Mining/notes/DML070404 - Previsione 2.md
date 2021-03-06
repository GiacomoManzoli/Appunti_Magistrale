```
\chapter{Il modello lineare nei parametri}
```

**Problema di riferimento:** come il prezzo influenza il consumo di gas? Si hanno a disposizione le informazioni relative alla domanda di gas e al prezzo dello stesso per 20 città in Texas.

Si vuole riuscire a capire se c'è una correlazione tra le due cose.

# Un primo modello lineare

Ipotizzando che ci sia una relazione lineare è possibile utilizzare il modello del capitolo precedente:

```
y = ↵ +  x + "I sappiamo in questo caso come effettuare le stime ^ = cov(X,Y) = -588.95 = -1.104 Var(X ) 533.4↵^ = y ̄ -  ^x ̄ = 69 + 1.104 · 63 = 138.561
```

Utilizzando l'ambiente R si ottengono delle informazioni relative all modello ottenuto:

```
Call:          lm(formula = gas ~ prezzo)          Residuals:              Min      1Q  Median      3Q     Max          -40.625 -10.719  -1.136  14.073  38.292          Coefficients:                      Estimate Std. Error t value Pr(>|t|)          (Intercept)  138.561     13.552  10.225 6.34e-09 ***          prezzo        -1.104      0.202  -5.467 3.42e-05 ***          ---          Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1          Residual standard error: 20.86 on 18 degrees of freedom          Multiple R-Squared: 0.6241,     Adjusted R-squared: 0.6033          F-statistic: 29.89 on 1 and 18 DF,  p-value: 3.417e-05
```

Tracciando un po' di grafici (slide 22) è possibile osservare dal tracciamento dei residui che c'è una componente indipendente che non è lineare.

# Considerazioni sul problema e un secondo modello

Slide 24

```
(x-7)(y-gamma) = kappa
```

...

**modelli lineari nei parametri**

# Modello lineare con trasformate

Presentazione del nuovo dataset