const mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jsonwebtoken');
require('../../config/passport')(passport);
var config = require('../models/db');
const District = mongoose.model('District');
const User = mongoose.model('User');
const logger = require('../../config/winston.log').logger;


/*
 * 
 */
const createComment = async function (req, res) {
	const districtid = req.params.districtid;
	if (districtid) {
		console.log("OJO que estoy al lado meinin " + req.body.userId)
		if (await userIsBanned(req.body.userId)) {
			res
				.status(404)
				.json({
					"message": "Not possible, the user is banned"
				});
		}
		else {
			District
				.findOne({
					districtId: req.params.districtid
				})
				.select('comments')
				.exec((err, district) => {
					if (err) {
						res
							.status(400)
							.json(err);
					} else {
						_doAddComment(req, res, district);
					}
				});
		}
	} else {
		res
			.status(404)
			.json({
				"message": "Not found, districtid required"
			});
	}
}

/*
 * 
 */
const getComments = function (req, res) {
	const sort = req.params.sort;
	if (req.params && req.params.districtid) {
		District
			.findOne({
				districtId: req.params.districtid
			})
			.select('comments')
			.exec(async (err, district) => {
				if (!district) {
					res
						.status(404)
						.json({
							"message": "district not found"
						});
					return;
				} else if (err) {
					res
						.status(404)
						.json(err);
					return;
				} else {

					if (sort == 0) {
						district.comments.sort(function (a, b) {
							// Turn your strings into dates, and then subtract them
							// to get a value that is either negative, positive, or zero.
							return new Date(b.createdOn) - new Date(a.createdOn);
						});
					}
					else if (sort == 1) {
						district.comments.sort(function (a, b) {
							// Turn your strings into dates, and then subtract them
							// to get a value that is either negative, positive, or zero.
							return b.likes - a.likes;
						});
					}
					var districtModified = await modifyCommentsDistrict(district);
					res
						.status(200)
						.json(districtModified._doc.modifiedComments);
				}
			});
	} else {
		res
			.status(404)
			.json({
				"message": "Not found, district is both required"
			});
	}
}

const modifyCommentsDistrict = async function (district) {
	var commentsList = [];
	var modifiedDistrict = district;
	for (comment of district.comments) {
		var user = User.findById(comment.userId).exec();
		await user.then(user => {
			if (user) {
				commentsList.push({
					text: comment.text,
					username: user.name,
					userId: comment.userId,
					email: user.email,
					commentId: comment._id,
					likesids : comment.likesids,
					likes : comment.likes
				})
			}
			else {
				commentsList.push({
					text: comment.text,
					username: "Anónimo",
					userId: comment.userId,
					email: "-",
					commentId: comment._id,
					likesids : comment.likesids,
					likes : comment.likes
				})
			}
		},
			err => {
				console.error(err);
			})
	}
	modifiedDistrict._doc.modifiedComments = commentsList;
	return modifiedDistrict;
}

/*
 * 
 */
const addLike = function (req, res){
	console.log("oh yeah");
	if (!req.params.districtid || !req.params.commentid) {
		res
			.status(404)
			.json({
				"message": "Not found, districtid and commentid are both required"
			});
		return;
	}
	District
		.findOne({
			districtId: req.params.districtid
		}
		)
		.select('comments')
		.exec((err, district) => {
			if (!district) {
				res
					.status(404)
					.json({
						"message": "districtid not found"
					});
				return;
			} else if (err) {
				res
					.status(400)
					.json(err);
				return;
			}
			if (district.comments && district.comments.length > 0) {
				let thisComment = district.comments.id(req.params.commentid);
				if (!thisComment) {
					res
						.status(404)
						.json({
							"message": "commentid not found"
						});
				} else {
					console.log("aqui manin " + req.body.userId);
					thisComment.likesids.push(req.body.userId);
					thisComment.likes = thisComment.likes + 1;
					district.save((err, district) => {
						if (err) {
							res
								.status(404)
								.json(err);
						} else {
							res
								.status(200)
								.json(null);
						}
					});
				}
			} else {
				res
					.status(404)
				json({
					"message": "No comment to update"
				});
			}
		}
		);
}

const removeLike = function (req, res){
	console.log("oh yeah");
	if (!req.params.districtid || !req.params.commentid) {
		res
			.status(404)
			.json({
				"message": "Not found, districtid and commentid are both required"
			});
		return;
	}
	District
		.findOne({
			districtId: req.params.districtid
		}
		)
		.select('comments')
		.exec((err, district) => {
			if (!district) {
				res
					.status(404)
					.json({
						"message": "districtid not found"
					});
				return;
			} else if (err) {
				res
					.status(400)
					.json(err);
				return;
			}
			if (district.comments && district.comments.length > 0) {
				let thisComment = district.comments.id(req.params.commentid);
				if (!thisComment) {
					res
						.status(404)
						.json({
							"message": "commentid not found"
						});
				} else {
					console.log("--------------");
					console.log(thisComment.likesids.length);
					console.log(req.body.userId);
					console.log("-------------------------------");
					var index = thisComment.likesids.indexOf(req.body.userId);
  					if (index !== -1) {
						console.log("esta contenido");
    					thisComment.likesids.splice(index, 1);
					}
					else{
						console.log("no esta contenido")
					}
					//console.log(thisComment.likesids);
					/*
					console.log
					for (let c of thisComment.likesids){
						console.log("comparo " + c + " vs " + req.body.userId.value);
						if (c == req.body.userId.value){
							console.log("ES IGUAL MANIN")
						}
						else{
							console.log("NO ES IGUAL");
						}
						console.log(c);
						console.log("-----");
					}*/

					//thisComment.likesids.pop(req.body.userId);
					thisComment.likes = thisComment.likes - 1;
					district.save((err, district) => {
						if (err) {
							res
								.status(404)
								.json(err);
						} else {
							res
								.status(200)
								.json(null);
						}
					});
				}
			} else {
				res
					.status(404)
				json({
					"message": "No comment to update"
				});
			}
		}
		);
}

const valorateComment = function (req, res) {
	if (!req.params.districtid || !req.params.commentid) {
		res
			.status(404)
			.json({
				"message": "Not found, districtid and commentid are both required"
			});
		return;
	}
	District
		.findOne({
			districtId: req.params.districtid
		}
		)
		.select('comments')
		.exec((err, district) => {
			if (!district) {
				res
					.status(404)
					.json({
						"message": "districtid not found"
					});
				return;
			} else if (err) {
				res
					.status(400)
					.json(err);
				return;
			}
			if (district.comments && district.comments.length > 0) {
				let thisComment = district.comments.id(req.params.commentid);
				if (!thisComment) {
					res
						.status(404)
						.json({
							"message": "commentid not found"
						});
				} else {
					thisComment.likes = thisComment.likes + 1;
					district.save((err, district) => {
						if (err) {
							res
								.status(404)
								.json(err);
						} else {
							res
								.status(200)
								.json(null);
						}
					});
				}
			} else {
				res
					.status(404)
				json({
					"message": "No comment to update"
				});
			}
		}
		);
}

/*
 * 
 */
const deleteComment = function (req, res) {
	if (!req.params.districtid || !req.params.commentid) {
		res
			.status(404)
			.json({
				"message": "Not found, districtid and commentid are both required"
			});
		return;
	}
	District
		.findOne({
			districtId: req.params.districtid
		}
		)
		.select('comments')
		.exec((err, district) => {
			if (!district) {
				res
					.status(404)
					.json({
						"message": "district not found"
					});
				return;
			} else if (err) {
				res
					.status(400)
					.json(err);
				return;
			}
			if (district.comments && district.comments.length > 0) {
				if (!district.comments.id(req.params.commentid)) {
					res
						.status(404)
						.json({
							"message": "commentid not found"
						});
				} else {
					district.comments.id(req.params.commentid).remove();
					district.save((err) => {
						if (err) {
							res
								.status(404)
								.json(err);
						} else {
							res
								.status(204)
								.json(null);
						}
					});
				}
			} else {
				res
					.status(404)
					.json({
						"message": "No comment to delete"
					});
			}
		}
		);
}

// PRIVATE HELPER METHODS

const _doAddComment = function (req, res, district) {
	if (!district) {
		res
			.status(404)
			.json({
				"message": "district not found"
			});
	} else {
		
		district.comments.push({
			text: req.body.text,
			userId: req.body.userId,
			//likesids:"Fernando"
		});
		district.save((err, district) => {
			if (err) {
				console.error(err);
				res
					.status(400)
					.json(err);
			} else {
				let thisComment = district.comments[district.comments.length - 1];
				res
					.status(201)
					.json(thisComment);
			}
		});
	}
};

const userIsBanned = function (userId) {
	User.findById(userId).exec((err, user) => {
		if (err) {
			return true;
		} else {
			return user.banned;
		}
	})
}

module.exports = {
	createComment,
	getComments,
	valorateComment,
	deleteComment,
	addLike,
	removeLike
};