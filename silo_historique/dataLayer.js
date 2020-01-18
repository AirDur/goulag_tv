const mongoose = require('mongoose');

let dataLayer = {

    init : (collection, schema) => {
        const someModelSchema = new mongoose.Schema(schema);
        const mongo_ip = "mongodb+srv://teddy:GOULAGTV@cluster0-2heou.mongodb.net/goulagtv?retryWrites=true&w=majority";

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