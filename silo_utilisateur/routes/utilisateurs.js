"use strict"

const router = require('express').Router();
const Token = require("../models/token");
const Utilisateurs = require("../actions/utilisateurs");

const utilisateurs = new Utilisateurs();
const t = new Token();

function create(req, res) {
    utilisateurs.create(req, res);
};

router.post('/create', (req, res) => utilisateurs.create(req, res));
// router.get('login', (req, res, next) => t.tokenRequired(req, res, next), SendResult);
// router.get('delete', (req, res, next) => t.tokenRequired(req, res, next), SendResult);
// router.get('update', (req, res, next) => t.tokenRequired(req, res, next), SendResult);
// router.get('read', (req, res, next) => t.tokenRequired(req, res, next), SendResult);


module.exports = router;