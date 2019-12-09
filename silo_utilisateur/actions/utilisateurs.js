"use strict"

const ModeleUtilisateur = require('../models/utilisateur.js');
const Action = require('./action');
const argon2 = require('argon2');

class Utilisateurs extends Action {
    constructor() {
        super()
        this.model = new ModeleUtilisateur();

        this.unknowObjectError = "Utilisateur inconnu";
    }

    cleanResult(result) {
        delete result.password;

        return result;    
    }

    // async authenticate(req, res) {
    //     let user, reason, passwordIsValid, token;

    //     try {
    //         user = await this.model.readOne({ email: req.body.email });
    //         if (!!user) {
    //             try {
    //                 passwordIsValid = await this.auth.comparePasswords(req.body.password, user.password);
    //             } catch(err) {
    //                 throw err;
    //             }
    //             if (passwordIsValid) {
    //                 token = this.auth.create24hToken(user._id, user.roles)
    //             }
    //         }
    //     } catch (err) {
    //         reason = err;
    //     }

    //     this.authenticateResponse(res, reason, token, passwordIsValid);
    // }

    // authenticateResponse(res, reason, token, passwordIsValid) {
    //     let code = null,
    //         result = null;

    //     if (reason) {
    //         code = RESPONSES.HTTP_STATUS.INTERNAL_SERVER_ERROR;
    //         result = RESPONSES.UNKNOW_ERROR;
    //     } else if (!passwordIsValid) {
    //         code = RESPONSES.HTTP_STATUS.UNAUTHORIZED;
    //         result = RESPONSES.INVALID_CREDENTIAL;
    //     } else if(!!token) {
    //         code = RESPONSES.HTTP_STATUS.OK;
    //         result = { token: token };
    //     }

    //     this.sendAnswer(res, code, result);
    // }

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