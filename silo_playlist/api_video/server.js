const http = require("http");
const port = process.env.PORT || 3002;
const app = require('./app')
//On créer un server http avec app.js
const server = http.createServer(app);

//On ecoute sur le port 3000 ou le un numero de port fourni en variable d'environnement
server.listen(port, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});