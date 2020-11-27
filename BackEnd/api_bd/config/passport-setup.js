const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const credentials = require('./credentials');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = '*****'; //put password

passport.use(
	new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

// load up the user model
const mongoose = require('mongoose');
const User = mongoose.model('User');
var config = require('../models/db.js'); // get db config file


const apiOptions = {
	server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://cierzo.herokuapp.com';
}


//Google strategy
passport.use(
	new GoogleStrategy({
		callbackURL: apiOptions.server + '/api/user/loginGoogle/redirect',
		clientID: credentials.google.clientID,
		clientSecret: credentials.google.clientSecret
	}, (accessToken, refreshToken, profile, done) => {
		User.findOne({ "email": profile.emails[0].value }).then((currentUser) => {
			if (currentUser) {
				done(null, currentUser);
			} else {
				new User({
					name: profile.emails[0].value,
					email: profile.emails[0].value,
					password: "googlepass"
				}).save().then((newUser) => {
					console.log("New User created: " + newUser);
					done(null, newUser);
				});
			}
		})
	})
);
