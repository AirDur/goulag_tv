# projet_silo
Polytech 5A INSI - par Romain Duret, Thomas Martins &amp; Teddy Poujol


## Silo Historique :

port 3001

/videos/
=> GET & POST
/videos/:videoId
=> GET & PATCH & DELETE
/listvideos/
=> GET & POST
/listvideos/:listVideoId
=> GET & PATCH & DELETE

## Silo Playlist : 

port 3002
/download/
=> GET (télécharger vidéo)
/upload/
=> GET (upload to azure)

## Silo Recherche : 

port 3003

/videos/
=> GET & POST
/videos/:videoId
=> GET & PATCH & DELETE
/listvideos/
=> GET & POST
/listvideos/:listVideoId
=> GET & PATCH & DELETE
/recherche/:filter
=> GET
/recherche/video/:id
=> GET
(récupére une vidéo ?v=ID via youtube dl)

## Silo Utilisateur :

port 3004

/api/login
=> POST (création de compte)
/api/:id
=> DELETE & GET
/api/
=> POST & GET