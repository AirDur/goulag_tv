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
                console.log(data);
            }
        });
    });
  };

  async readOne(query) {
    var self = this;
    return new Promise(function(resolve, reject) { 
      self.DBModel.findOne(query,function(err, data){
        if(err) {
            reject({"error" : true,"message" : "Error fetching data", "errorMsg" : err});  
        } else {
            data = !!data && !!data._doc ? data._doc : data;
            resolve(data);
        }
      });
    });
  };

  createQuery(data) {
    var newObject = this.sanitizeData(data);

    if(!!data.id) {
      newObject._id = data.id;
      delete newObject.id;
    }

    delete newObject.id;
    return newObject; 
  };

  async read(query) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self.DBModel.find(query,function(err, data) {
            if(err) {
                reject({"error" : true, "message" : "Error fetching data", "errorMsg" : err});  
            } else {
                resolve(data);
            }
        });
    });
  }

  async delete(query, callback) {
    let self = this;
    let response;
    return new Promise(function(resolve, reject) {
        self.DBModel.find(query,function(err, dbModel) {
            if(err) {
                reject({"error" : true, "message" : "Error fetching data", "errMsg" : err});
            } else {
                self.DBModel.deleteMany(query, function(err, res){
                    if(err) {
                        reject({"error" : true, "message" : "Error deleting data", "errorMsg" : err});  
                    } else {
                        resolve(Object.assign(query,{"error" : false, "deleteCount": res.deletedCount, "message" : "Delete success."}));
                    }
                });
            }
        });
    });
  }
};

module.exports = Utilisateur;