# jigr
Jigsaw Web Manager


Idei:
- snap dupa procent suprafata - epsilon / centru (greutate - epsilon) si (unghi - epsilon)
- afisare aleatoriu piese pe ecran dupa 2 criterii: locatie si unghi
- slider dificultate: influenteaza epsilon
- web sochets pt transmitere de informatie colaborativa (multiplayer)
- ? stocare stare joc local / pe server
- ? de utilizat canvas pentru rotatie (biblioteci)
- ? fragmentare puzzle per sesiune sau static (de preferat static)
- endpoint-uri:
  - /puzzles/id (GET) 
  - /puzzles (GET -> all puzzles)
  - /puzzles?search=term (GET -> all puzzles for witch the term matches)
  - /puzzles (POST : url sau imagine propriu zisa si intoarce id-ul puzzle-ului generat)

  TODO:
  - Difficulty button with options:
    - Game difficulty slider
    -Puzze generation difficulty slider
  - Compact menu on the right side
  - Add icons for menu items
  - Gradient for game progress
  - Solve piece with options:
    - Currently selected
    - Random
 
