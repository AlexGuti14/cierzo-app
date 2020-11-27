var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
const ctrlAuth = require('../controllers/auth.server.controller');
const logger = require('../../config/winston.log').logger;
var config = require('../../api_bd/models/db');


router.get('/loginGoogle', ctrlAuth.loginGoogle);

module.exports = router;
