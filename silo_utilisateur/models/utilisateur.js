"use strict"

const dataLayer = require("../dataLayer");

class Utilisateur {
  constructor() {
    this.collection = 'utilisateurs';
    this.db = dataLayer;

    this.schema = {
      creationDate: {
        type : Date,
        required: true,
        default: Date.now()
      },
      firstname: {
        type : String,
        required: true
      },
      lastname: {
        type : String,
        required: true
      },
      password: {
        type : String,
        required: true
      },
      email: {
        type : String,
        required: true,
        unique: true
      },
      roles : {
        type: Array,
        required: true,
        default : [ "USER" ]
      }
    };

    this.db.init(this.collection, this.schema);
    this.DBModel = this.db.getModel();
  }

  sanitizeData(data) {
    delete data._id;
    delete data.timestamp
            
    return Object.assign({},data);
  };

  async count(query) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self.DBModel.countDocuments(query, function(err, c){
            if(err) {
                reject({"error" : true, "message" : "Error fetching data", "errorMsg" : err});  
            } else {
                resolve(c);
            }
        });
    });
  }

  async create(data) {
    data = this.sanitizeData(data);
    var self = this;

    return new Promise(function(resolve, reject) {
        var dataToSave = new self.DBModel(data);

        dataToSave.save(function(err, data){
            if(err) {
                reject({"error" : true, "message" : "Error saving data", "errorMsg" : err});  
            } else {
                data =  !!data ? data._doc : data;
                resolve(Object.assign({}, data));
            }
        });
    });
  };
};

module.exports = Utilisateur;