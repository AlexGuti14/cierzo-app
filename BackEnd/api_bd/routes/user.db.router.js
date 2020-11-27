const express = require('express');
const passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../../api_bd/models/db');
const router = express.Router();
const ctrlUsers = require('../controllers/user.db.controller');
const mongoose = require('mongoose');
const User = mongoose.model('User');


const apiOptions = {
	front: 'http://localhost:4200'
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.front = 'https://cierzo.herokuapp.com';
}


// user
router.route('/login').post(ctrlUsers.login);

router.get('/loginGoogle/redirect', passport.authenticate('google', { session: false }), (req, res) => {
	User.findById(req.user._id).exec((err, user) => {
		var token = jwt.sign(req.user._doc, config.secret);
		res.redirect(apiOptions.front + '/#/land-page-google/' + token + '/' + user.admin + '/' + user.banned + '/' + user._id);
	})

});

/* router.get('/loginGoogle', passport.authenticate('google', { scope: ['profile', 'email'] })); */
router.get('/loginGoogle', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/ban', ctrlUsers.getUsersBanned);
router.put('/ban/:userid', ctrlUsers.banearUser);
router.put('/unban/:userid', ctrlUsers.unbanearUser);

router.get('/stats', ctrlUsers.numUsers);


router.post('/', ctrlUsers.signup);
router.get('/:userid', ctrlUsers.userReadOne);
router.get('/', ctrlUsers.getUsers);
router.delete('/:userid', ctrlUsers.userDeleteOne);
router.put('/:userid', ctrlUsers.updateUser);


module.exports = router;
