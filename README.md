
# AREA

Le but de l'area est de reprendre le modèle de Zappier ou IFTTT en mettant en relation des actions avec des réactions (ex: Si je reçoit un mail, alors je créer un document google doc)

# Liste des routes
## Authentification 

GET     /about.json         --> Renvoie un fichier json contenant toutes les actions / réactions.

POST    /auth/register     --> Permet la création d'un compte utilisateur

POST    /auth/login         --> Permet à l'utilisateur de se connecter

POST    /auth/logout        --> Permet à l'utilisateur de se déconnecter

GET     /auth/google         --> Authentification OAuth2 avec Google

GET     /redirect/google     --> Route de redirection pour OAuth2 Google

GET     /auth/twitter        --> Authentification OAuth2 avec twitter

GET     /redirect/twitter    --> Route de redirection pour OAuth2 twitter

GET     /auth/github         --> Authentification OAuth2 avec github

GET     /redirect/github     --> Route de redirection pour OAuth2 github

GET     /auth/twitch         --> Authentification OAuth2 avec twitch

GET     /redirect/twitch     --> Route de redirection pour OAuth2 twitch

## Utilisateurs

POST    /users             --> Crée un utilisateur en BDD (base de donnée)

GET     /users/:email       --> Récupérer un utilisateur en fonction de son email


## Actions / REactions

POST    /area              --> Crée une action / réaction

GET     /area               --> Récupère toutes les actions / réactions

DELETE  /area/:id        --> Supprime une action /réaction en fonction de son ID 

