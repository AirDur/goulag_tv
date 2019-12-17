const http = require("http");
const port = process.env.PORT || 3000;
const app = require('./app')
//On créer un server http avec app.js
const server = http.createServer(app);

//On ecoute sur le port 3000 ou le un numero de port fourni en variable d'environnement
server.listen(port);