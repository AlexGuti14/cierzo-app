const request = require('request');
var jwt = require('jsonwebtoken');
const logger = require('../../config/winston.log').logger;
var config = require('../../api_bd/models/db');


const apiOptions = {
	server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://cierzo.herokuapp.com';
}

// PUBLIC EXPOSED METHODS

/*
 *	Verifica usuario y genera token
 */
const login = function (req, res){
	const path = '/api/user/login';
	const postdata = {
		email: req.body.email,
		password: req.body.password
	};
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'POST',
		json: postdata
	};
	request(
		requestOptions,
		(err, response, body) => {
			let data = body;
			if (response.statusCode === 200) {
				// if user is found and password is right create a token
				var token = jwt.sign(data.user, config.secret);
				console.log(token);
				logger.info("User login OK");
				res.statusCode = 200;
				res.json({
					token: token,
					admin: data.user.admin,
					banned: data.user.banned,
					id: data.user._id
				})
			}
			else if (response.statusCode === 400) {
				logger.error("Login error");
				res.statusCode = 400;
				res.send("Error");
			}
		}
	);
}

const loginGoogle = function (req, res){
	res.redirect(apiOptions.server + '/api/user/loginGoogle');
}

/*
 *	Registra nuevo usuario
 */
const signup = function (req, res){
	const path = '/api/user';
	const postdata = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	};
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'POST',
		json: postdata
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 201) {
				logger.info("User created");
				res.statusCode = 201;
				res.send("Created");
			}
			else if (response.statusCode === 400) {
				logger.error("Create user error");
				res.statusCode = 400;
				res.send("Error");
			}
		}
	);
}

/*
 *	Registra usuario con cuenta google
 */
const createUserGoogle = function (userGoogle, res) {
	const path = '/api/user';
	const postdata = {
		name: userGoogle.name,
		email: userGoogle.email,
		password: userGoogle.password
	};
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'POST',
		json: postdata
	};
	request(
		requestOptions
	);
};

/*
 *	Devuelve todos los usuarios
 */
const getUsers = function (req, res) {
	const path = `/api/user`;
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {}
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				res.statusCode = 200;
				res.send(body);
			}
			else if (response.statusCode === 404) {
				logger.error("Get users error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}

/*
 *	Devuelve info de un usuario
 */
const readUser = function (req, res) {
	const btoken = req.headers.authorization;
	const token = btoken.replace("Bearer ", "");
	var user = jwt.decode(token);
	const userid = user._id;
	const path = `/api/user/${userid}`;
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {}
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				res.statusCode = 200;
				res.send(body);
			}
			else if (response.statusCode === 404) {
				logger.error("Read user error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
};

/*
 *	Elimina un usuario
 */
const deleteUser = function (req, res) {
	const userid = req.params.userid;
	const path = `/api/user/${userid}`;
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'DELETE',
		json: {}
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 204) {
				res.statusCode = 204;
				res.send("Deleted");
			}
			else if (response.statusCode === 404) {
				logger.error("Delete user error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
};

/*
 *	Actualiza info de un usuario
 */
const updateUser = function (req, res) {
	const userid = req.params.userid;
	const path = `/api/user/${userid}`;
	const putdata = {
		name: req.body.name,
		password: req.body.password
	};

	const requestOptions = {
		url: apiOptions.server + path,
		method: 'PUT',
		json: putdata
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				res.statusCode = 200;
				res.send("Updated");
			}
			else if (response.statusCode === 404) {
				logger.error("Update user error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}

/*
 *	Banea a un usuario
 */
const banearUser = function (req, res) {
	const userid = req.params.userid;
	const path = `/api/user/ban/${userid}`;
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'PUT',
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				res.statusCode = 200;
				res.send("Baneado");
			}
			else if (response.statusCode === 404) {
				logger.error("Banned user error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}

/*
 *	Desbanea a un usuario
 */
const unbanearUser = function (req, res) {
	const userid = req.params.userid;
	const path = `/api/user/unban/${userid}`;
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'PUT',
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				res.statusCode = 200;
				res.send("Desbaneado");
			}
			else if (response.statusCode === 404) {
				logger.error("Desbanned user error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}


/*
 *	Devuelve los usuarios baneados
 */
const getUsersBanned = function (req, res) {
	const path = `/api/user/ban`;
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {}
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				res.statusCode = 200;
				res.send(body);
			}
			else if (response.statusCode === 404) {
				//logger.error("Get users error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}


/*
 *	Devuelve estadisticas de usuarios
 */
const numUsers = function (req, res) {
	const path = `/api/user/stats`;
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {}
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				var users = body;

				var usersBanned = users.filter(function(item) {
					return item.banned == true
				});
				var admins = users.filter(function(item) {
					return item.admin == true
				});
				var logins = 0;
				users.forEach(function(user) {
					logins += user.logins;
				});
				res.statusCode = 200;
				res.send({usuarios:users.length, admins: admins.length, banned: usersBanned.length, logins: logins});
			}
			else if (response.statusCode === 404) {
				//logger.error("Get users error");
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}



module.exports = {
	login,
	loginGoogle,
	signup,
	createUserGoogle,
	readUser,
	getUsers,
	deleteUser,
	updateUser,
	banearUser,
	unbanearUser,
	getUsersBanned,
	numUsers
};