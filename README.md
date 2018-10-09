# JigR
Jigsaw Web Manager


Idei:
- snap dupa procent suprafata - epsilon / centru (greutate - epsilon) si (unghi - epsilon)
- afisare aleatoriu piese pe ecran dupa 2 criterii: locatie si unghi
- slider dificultate: influenteaza epsilon
- web sochets pt transmitere de informatie colaborativa (multiplayer)
- ? stocare stare joc local / pe server
- endpoint-uri:
  - /puzzles/id (GET) 
  - /puzzles (GET -> all puzzles)
  -/puzzles?search=term (GET -> all puzzles for witch the term matches)
  -/puzzles (POST : url sau imagine propriu zisa si intoarce id-ul puzzle-ului generat)
