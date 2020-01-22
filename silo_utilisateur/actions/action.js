"use strict"

class Action {
    constructor() {
    }

    prepareBodyToUpdate(body) {
        return { ...body}
    }

    cleanResult(result) {
        return result;
    }

    deleteAllOccurencies(query) {
        
    }

    getMissingFieldName(error) {
        let pathName = "";

        for(let key in error) {
            pathName = error[key].path;
        }

        return pathName;
    }
    
    async read(req, res) {
        let query = Object.keys(req.params).length != 0 ? req.params : req.query;
        let result = null,
            errorCaught = false,
            errorName = null,
            code = 200;

        query = this.model.createQuery(query);

        try {
            result = await this.model.read(query);
        } catch (err) {
            errorCaught = true;
            errorName = err.errorMsg.name;
        }

        if(!errorCaught) {
            if (!result || result.length < 1) {
                code = 404;
                result = this.unknowObjectError;
            } else if(result.length == 1) {
                result = this.cleanResult(result[0]);
            } else {
                result = this.cleanResult(result);
            }
        } else if(errorName === "CastError") {
            code = 401;
            result = this.unknowObjectError;
        } else {
            code = "Erreur interne au serveur";
            result = 500;
        }

        this.sendAnswer(res, code, result);
    }

    // async update(req, res) {
    //     let readOneQuery = { _id: req.params.id },
    //         updateQuery = this.model.createQuery(req.params),
    //         body = this.prepareBodyToUpdate(req.body),
    //         update_result = null,
    //         result = null,
    //         code = null;

    //     try {
    //         update_result = await this.model.update(updateQuery, body);
    //     } catch (err) {
    //         update_result = err;
    //     }

    //     if (!!update_result.data && update_result.data.nModified > 0) {
    //         try {
    //             result = await this.model.readOne(readOneQuery);
    //             result = this.cleanResult(result);
    //             code = RESPONSES.HTTP_STATUS.OK;
    //         } catch (err) {
    //             code = RESPONSES.HTTP_STATUS.INTERNAL_SERVER_ERROR;
    //             result = RESPONSES.DATABASE_ERROR;
    //         }
    //     } else if(update_result.type && update_result.type === ERROR.MONGO.CAST) {
    //         if(update_result.path === "_id") {
    //             code = RESPONSES.HTTP_STATUS.NOT_FOUND;
    //             result = this.unknowObjectError;
    //         } else {
    //             code = RESPONSES.HTTP_STATUS.CONFLICT;
    //             result = RESPONSES.INVALID_CHARACTER;
    //         }
    //     } else if(update_result.error && update_result.error == true) {
    //         code = RESPONSES.HTTP_STATUS.INTERNAL_SERVER_ERROR;
    //         result = RESPONSES.UNKNOW_ERROR;
    //     } else {
    //         code = RESPONSES.HTTP_STATUS.NOT_FOUND;
    //         result = this.unknowObjectError;
    //     }

    //     this.sendAnswer(res, code, result);
    // }

    async delete(req, res) {
        let query = { _id: req.params.id },
            code = 200,
            result = null,
            error = null,
            errorCaught = false;

        try {
            result = await this.model.delete(query);
            this.deleteAllOccurencies(query);
        } catch (err) {
            errorCaught = true;
            error = err.errMsg;
        }
        
        if(errorCaught) {
            if(error.name && error.name === "CastError" && error.path === "_id") {
                code = 404;
                result = this.unknowObjectError;
            } else {
                code = 500;
                result = "Erreur interne de la BDD"
            }
        } else if(result.deleteCount < 1) {
            code = 404;
            result = this.unknowObjectError;
        }

        this.sendAnswer(res, code, result);
    }

    sendAnswer(res, code, message, missingField) {
        let result;

        if(missingField) {
            result = {
                res : message,
                missing : missingField
            }
        } else {
            result = message;
        }

        res.status(code).send(result);
    }
};

module.exports = Action;