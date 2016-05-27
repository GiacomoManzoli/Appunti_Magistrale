### Inserimento del segmento si

1. Cerca le regioni intersecate dal segmento *si*.
2. Suddividi le regioni interessate. Se vengono trovate due regioni che coincidono con lo stesso segmento, uniscele.

La ricerca delle regioni interesecate può essere fatta in *O(log(i))* e può essere fatta in modo analogo alla ricerca di un punto nella regione. In totale per questa fase si ha *O(n log n)*.

...

# Problema del rendering

C'è una serie di segmenti che deve essere proiettata su un altro segmento secondo un determinato punto d'osservazione.

L'idea è quella di effettuare prima la proiezione dei segmenti più lontani, spostandosi via via su quelli più vicini.

Possiamo assumere che effettuare la proiezione di un segmento può essere fatta in tempo costante dalla scheda grafica.

Se ci sono dei segmenti che si intersecano è necessario suddividere uno dei due. Con le coordinate intere non possiamo calcolare il punto di intersezione di un semgento.

Si può quindi supporre di non avere segmenti che si intersecano.

Il test di vicinanza può essere fatto con il prodotto scalare in tempo costante e pertanto l'ordinamento può essere fatto in *O(n log n)* e poi possono essere proiettati dal più lontano al più piccolo.

Se però il punto di osservazione si sposta, sarebbe carino preelaborare la scena in modo da poter fare l'aggiornamento in tempo costante.