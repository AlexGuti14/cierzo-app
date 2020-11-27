const mongoose = require('mongoose');
var passport = require('passport');
require('../../config/passport')(passport);
const User = mongoose.model('User');
const logger = require('../../config/winston.log').logger;


const login = function (req, res) {
	User.findOneAndUpdate({
		email: req.body.email
	  }, {$inc : {'logins' : 1}}, function(err, user) {
		if (err) throw err;
	
		if (!user) {
		  res.status(400).send({success: false, msg: 'Authentication failed. User not found.'});
		} else {
		  // check if password matches
		  user.comparePassword(req.body.password, function (err, isMatch) {
			if (isMatch && !err) {
			  // return the information
			  res
				  .status(200)
				  .json({success: true, user: user});
			} else {
			  	res
				  .status(400)
				  .json({success: false, msg: 'Authentication failed. Wrong password.'});
			}
		  });
		}
	  });
};

const signup = function (req, res) {
	if (!req.body.username || !req.body.password || !req.body.email) {
		res.json({success: false, msg: 'Please pass username and password.'});
	  } else {
		var newUser = new User({
		  name: req.body.username,
		  email: req.body.email,
		  password: req.body.password
		});
		// save the user
		newUser.save(function(err) {
		  if (err) {
			  res
			  	.status(400)
			  	.json({success: false, msg: 'Username already exists.'});
		  }
		  else{
			logger.info("usuario bien creado");
			  res
				  .status(201)
				  .json({success: true, msg: 'Successful created new user.'});
		  }
		});
	  }
};

const userCreate = function (req, res) {
	User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	}, (err, user) => {
		if (err) {
			res
				.status(400)
				.json(err);
		} else {
			res
				.status(201)
				.json(user);
		}
	});
};

const userReadOne = function (req, res) {
	if (req.params && req.params.userid) {
		User
			.findById(req.params.userid)
			.exec((err, user) => {
				if (!user) {
					res
						.status(404)
						.json({
							"message": "userid not found"
						});
					return;
				} else if (err) {
					res
						.status(404)
						.json(err);
					return;
				}
				res
					.status(200)
					.json(user);
			});
	} else {
		res
			.status(404)
			.json({
				"message": "No userid in request"
			});
	}
};

const getUsers = function(req, res) {
	User.find().exec((err, users) => {
		if (err) {
			res
				.status(404)
				.json(err);
			return;
		}
		res
			.status(200)
			.json(users);
		});
}


const userDeleteOne = function (req, res) {
	const userid = req.params.userid;
	if (userid) {
		User
			.findByIdAndRemove(userid)
			.exec((err, user) => {
				if (err) {
					res
						.status(404)
						.json(err);
					return;
				}
				res
					.status(204)
					.json(null);
			}
			);
	} else {
		res
			.status(404)
			.json({
				"message": "No userid"
			});
	}
};

const updateUser = function (req, res) {
	if (!req.params.userid) {
		res
		  .status(404)
		  .json({
			"message": "Not found, userid is required"
		  });
		return;
	  }
	  User
	  .findById(req.params.userid)
	  .select('-email -logins -lastLoginOn -createdOn')
	  .exec((err, user) => {
		if (!user) {
		  res
			.json(404)
			.status({
			  "message": "userid not found"
			});
		  return;
		} else if (err) {
		  res
			.status(400)
			.json(err);
		  return;
		}
		// En principio solo se cambian uno o mas entre estos parametros
		user.name = req.body.name;
		user.password = req.body.password;

		user.save((err, user) => {
			if (err) {
			  res
				.status(404)
				.json(err);
			} else {
			  res
				.status(200)
				.json(user);
			}
		});
	});
}

const banearUser = function (req, res) {
	console.log("LLEGA A BANEAR USER");
	if (!req.params.userid) {
		res
		  .status(404)
		  .json({
			"message": "Not found, userid is required"
		  });
		return;
	  }
	  User
	  .findByIdAndUpdate(req.params.userid,
		{ $set:{banned: true }}, function(err) {
			if(err){
				res.status(404)
				.json(err);
				return;
			}
			else {
				res.status(200)
				.json(null);
				return;
			}
		});
}

const unbanearUser = function (req, res) {
	if (!req.params.userid) {
		res
		  .status(404)
		  .json({
			"message": "Not found, userid is required"
		  });
		return;
	  }
	  User
	  .findByIdAndUpdate(req.params.userid,
		{ $set:{banned: false }}, function(err) {
			if(err){
				res.status(404)
				.json(err);
				return;
			}
			else {
				res.status(200)
				.json(null);
				return;
			}
		});
}

const getUsersBanned = function(req, res) {
	User
	.find({ banned: true })
	.exec((err, users) => {
		if (err) {
			res
				.status(404)
				.json(err);
			return;
		}
		res
			.status(200)
			.json(users);
		});
}

const numUsers = function(req, res) {
	User
	.find()
	.exec((err, users) => {
		if (err) {
			res
				.status(404)
				.json(err);
			return;
		}		
		res
			.status(200)
			.json(users);
		});
}

module.exports = {
	login,
	signup,
	userCreate,
	userReadOne,
	getUsers,
	userDeleteOne,
	updateUser,
	banearUser,
	unbanearUser,
	getUsersBanned,
	numUsers
};