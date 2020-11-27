const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
var config = require('../models/db');


router.get('/loginGoogle/redirect', passport.authenticate('google', {session: false}), (req, res) => {
	token = jwt.sign(req.user, config.secret);
	res.status(200).json({token : token});
});

router.get('/loginGoogle', passport.authenticate('google', { scope: ['profile', 'email'] }));

module.exports = router;
