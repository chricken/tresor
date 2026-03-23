# Summary
Dies ist ein Framework, um Daten sicher und unveränderlich abzuspeichern.

## XSS
Um die Möglichkeit von XSS zu unterbinden, werden die Daten in einem Webworker abgelegt.

## Reducers
Die Daten werden über Reducer in Anlehnung an den useReducer-Hook in React behandelt.

## Logging
Jede Operation wird in einem Log abgelegt. Evtl. soll der Log nur eine bestimmte Zahl von Log-Einträgen enthalten.

## Multipler Import
Die Tresor-Klasse wird im Frontend ebenso wie im Worker eingebunden. 
Da beide ohnehin logisch getrennt sind, kann man das machen.

Beim Aufruf der Klasse wird der Parameter "role" übergeben. 
Hier wird unter "client" und "server" unterschieden.

Beim Import in den Client übernimmt die Klasse die Kommunikation mit dem Worker.
Beim Import in den Worker bereitet die Klasse die Eventlistener vor, um auf die Nachrichten zu reagieren.

## Datenhandling
Im Tresor wird der State durch den Worker angelegt werden.

Wenn dieses Daten verändert werden, muss überprüft werden, ob die neuen Daten dem Schema im State entsprehcne.

Das Schema wird beim Anlegen durch den Worker definiert.