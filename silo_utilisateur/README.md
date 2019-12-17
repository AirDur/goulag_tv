# Back_end : silo Utilisateur

## BDD :

* Installer MongoDB
* Ajouter un utilisateur "adminstrateur" : 
```javascript
use yourDatabase
db.createUser( { user: " TOMODIFY ",
                 pwd: " TOMODIFY ",
                 roles: [ { role: "clusterAdmin", db: "admin" },
                          { role: "readAnyDatabase", db: "admin" },
                          "readWrite"] },
               { w: "majority" , wtimeout: 5000 } )
```
* Les données de la base de donnée sont à modifier dans [le fichier config](./config.json)

## Security :

* Générer les clés :
```bash
cd keys
openssl ecparam -genkey -name prime256v1 -noout -out jwt_priv.pem
openssl ec -in jwt_priv.pem -pubout -out jwt_pub.pem
```

## Launch the server :  

```

```