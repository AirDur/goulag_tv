"use strict"

const router = require('express').Router();
const Token = require("../token");

const t = new Token();


function SendResult(req, response) {

};

router.get('create', (req, res, next) => t.tokenRequired(req, res, next), SendResult);


module.exports = router;