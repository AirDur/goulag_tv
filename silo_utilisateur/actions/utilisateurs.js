"use strict"

const ModeleUtilisateur = require('../models/utilisateur.js');
const Action = require('./action');
const argon2 = require('argon2');
const fs = require("fs");
const jwt = require("jsonwebtoken");

class Utilisateurs extends Action {
    constructor() {
        super()
        this.model = new ModeleUtilisateur();

        this.unknowObjectError = "Utilisateur inconnu";
        this.privateKey = fs.readFileSync("./keys/jwt_priv.pem");
        this.publicKey = fs.readFileSync("./keys/jwt_pub.pem");

        this.headerTokenName = "token";
    }

    hasToken(req) {
        return !!req.headers[this.headerTokenName];
    };
    
    cleanResult(res) {
        var result = res.toObject();
        delete result['password'];

        return result;    
    }

    async login(req, res) {
        let user, reason, passwordIsValid, token;

        try {
            user = await this.model.readOne({ email: req.body.email });
            if (!!user) {
                try {
                    passwordIsValid = await this.comparePasswords(req.body.password, user.password);
                } catch(err) {
                    throw err;
                }
                if (passwordIsValid) {
                    token = this.create24hToken(user._id, user.roles)
                }
            }
        } catch (err) {
            reason = err;
        }

        this.loginResponse(res, reason, token, passwordIsValid);
    }

    async comparePasswords(password, stockedPassword) {
        try {
            if (await argon2.verify(stockedPassword, password)) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw err;
        }
    }

    create24hToken(id, roleArray) {
        var returnValue = null;
        var content = {
            _id: id,
            access: true
        };

        try {
            returnValue = jwt.sign(content, this.privateKey, {
                algorithm: 'ES256',
                expiresIn: 86400
            });
        } catch (err) {
            throw err;
        }

        return returnValue;
    };

    async verifyToken(token) {
        let hasAccess = false;
        
        try {
            token = await jwt.verify(token, this.publicKey, { 
                algorithms: ['ES256']
            });
        } catch(err) {
            return hasAccess;
        }

        if(token.access) {
            hasAccess = token.access;
        }
        
        return hasAccess;
    }

    async getIdInToken(token) {
        let id = false;
        
        try {
            token = await jwt.verify(token, this.publicKey, { 
                algorithms: ['ES256']
            });
        } catch(err) {
            return id;
        }

        if(!!token._id) {
            id = token._id;
        }
        
        return id;
    }

    async tokenRequired(req, res, next) {
        let isValid = false,
            token = null;

        if (this.hasToken(req)) {
            token = req.headers[this.headerTokenName];
            isValid = await this.verifyToken(token);
        }

        if (!this.hasToken(req)) {
            res.status(409).send("token pas fourni")
        } else if (!isValid) {
            res.status(409).send("beurk le token")
        } else {
            next();
        }
    };

    async tokenRequiredAndVerifyID(req, res, next) {
        let idInToken = false,
            token = null;

        if (this.hasToken(req)) {
            token = req.headers[this.headerTokenName];
            idInToken = await this.getIdInToken(token);
        }

        if (!this.hasToken(req)) {
            res.status(409).send("token pas fourni")
        } else if (!(idInToken === req.params.id)) {
            console.log(req);
            console.log(idInToken);
            console.log(req.params.id);
            res.status(409).send("beurk le token")
        } else {
            next();
        }
    }

    loginResponse(res, reason, token, passwordIsValid) {
        let code = null,
            result = null;

        if (reason) {
            code = 500;
            result = "Erreur serveur";
        } else if (!passwordIsValid) {
            code = 401;
            result = "Problèmes";
        } else if(!!token) {
            code = 200;
            result = { token: token };
        }

        this.sendAnswer(res, code, result);
    }

    async encapsulateUserInformation(newUser) {
        let countNumberUser = await this.model.count({});

        if(countNumberUser < 1) {
            newUser.roles = [ "ADMIN" ];
        }
        try {
            newUser.password = await this.encryptPassword(newUser.password);
        } catch(err) {
            throw { "error" : true, "errorMsg" : {
                    "err" : err,
                    "name" : "Mot de passe manquant"
                }
            };
        }

        return newUser;
    }

    async encryptPassword(password) {
        let hashedPassword = "";
        
        try {
            hashedPassword = await argon2.hash(password);
        } catch (err) {
            throw err;
        }
        
        return hashedPassword;
    };

    async create(req, res) {
        let code = 200,
            missingField = null,
            answerSent = false,
            result = null,
            newUser = null;

        try  {
            newUser = await this.encapsulateUserInformation(req.body);
            newUser = await this.model.create({ ...newUser});
            result = this.cleanResult(newUser);
        } catch(err) {
            code = 500;
            result = "Erreur de base de donnée";
            
            if(err.errorMsg && err.errorMsg.name && 
            (err.errorMsg.name === "ValidationError") ||
            (err.errorMsg.name === "MissingPassword") ) {
                code = 400;
                result = "Erreur de la part de l'utilisateur";
                missingField = this.getMissingFieldName(err.errorMsg.errors);
                answerSent = true;

                this.sendAnswer(res, code, result, missingField);
            }
        }
        
        if(!answerSent) {
            this.sendAnswer(res, code, result);
        }
    }
    
};

module.exports = Utilisateurs;