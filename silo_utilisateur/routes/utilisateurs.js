"use strict"

const router = require('express').Router();
const Token = require("../models/token");
const Utilisateurs = require("../actions/utilisateurs");

const utilisateurs = new Utilisateurs();
const t = new Token();

router.post('/login', (req, res) => utilisateurs.login(req, res));
router.post('/', (req, res) => utilisateurs.create(req, res));
// router.delete('/', (req, res, next) => t.tokenRequired(req, res, next), SendResult);
// router.put('/', (req, res, next) => t.tokenRequired(req, res, next), SendResult);
// router.get('/', (req, res, next) => t.tokenRequired(req, res, next), SendResult);

module.exports = router;