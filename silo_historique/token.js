"use strict"

const jwt = require('jsonwebtoken');
const fs = require('fs');

class Token {
    constructor() {
        this.seed = "82389144785086171941035868418638";
        this.headerTokenName = "token";

        this.privateKey = fs.readFileSync("./keys/jwt_priv.pem");
        this.publicKey = fs.readFileSync("./keys/jwt_pub.pem");
    }

    hasToken(req) {
        return !!req.headers[this.headerTokenName];
    };

    async decryptToken(token) {
        let decryptedToken = {};

        try {
            decryptedToken = await jwt.verify(token, this.privateKey, {
                algorithms: ['ES256']
            });
        } catch (err) {
            throw err;
        }
        
        return decryptedToken;
    }

    create24hToken(id) {
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
            next()
        }
    };
}

module.exports = Token;