const request = require('request');
const logger = require('../../config/winston.log').logger;

const apiOptions = {
	server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://cierzo.herokuapp.com';
}

// PUBLIC EXPOSED METHODS
const loginGoogle = function (req, res) {
	res.redirect(apiOptions.server + '/api/auth/loginGoogle');
};


module.exports = {
	loginGoogle
};