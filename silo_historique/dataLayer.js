const client = require('mongoose');

let dataLayer = {

    // init : function(cb){

    //   client.connect(VARIABLES.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  
    //   let db = client.connection; 
    //   db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
    //   db.once('open', function (){
    //     console.log("Connexion à la base OK");
    //   });
    //   cb();
    // }
};

module.exports = dataLayer;