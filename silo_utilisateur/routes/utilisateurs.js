"use strict"

const router = require('express').Router();
const Token = require("../models/token");
const Utilisateurs = require("../actions/utilisateurs");

const utilisateurs = new Utilisateurs();
const t = new Token();

router.post('/login', (req, res) => utilisateurs.login(req, res));
router.delete('/:id', (req, res, next) => utilisateurs.tokenRequiredAndVerifyID(req, res, next), (req, res) => utilisateurs.delete(req, res));
router.get('/:id', (req, res, next) => utilisateurs.tokenRequired(req, res, next), (req, res) => utilisateurs.read(req, res));
router.post('/', (req, res) => utilisateurs.create(req, res));
router.get('/', (req, res, next) => utilisateurs.tokenRequired(req, res, next), (req, res) => utilisateurs.read(req, res));
// router.put('/', (req, res, next) => t.tokenRequired(req, res, next), SendResult);

module.exports = router;