const mongoose = require('mongoose');
const config = require("./config.json");

let dataLayer = {

    init : (collection, schema) => {
        const someModelSchema = new mongoose.Schema(schema);
        const mongo_ip = "mongodb://" + config.admin_username + ":" + config.admin_password
            + "@" + config.database_ip + ":" + config.database_port + "/" + config.collection;

        mongoose.connect(mongo_ip, { useNewUrlParser: true, useUnifiedTopology: true });

        let db = mongoose.connection; 
        this.model = db.model(collection, someModelSchema);
        db.on('error', console.error.bind(console, config.database_connexion_error));
        db.once('open', function (){
            console.log(config.database_connexion_ok);
        });
    },

    getModel : () => {
        return this.model;
    },

    getSchema : () => {
        return mongoose.Schema;
    },

    close : () => {
        return mongoose.connection.close();
    }
};

module.exports = dataLayer;