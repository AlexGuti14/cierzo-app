const mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jsonwebtoken');
require('../../config/passport')(passport);
var config = require('../models/db');
const District = mongoose.model('District');
const DistrictDB = mongoose.model('DistrictDB');
const logger = require('../../config/winston.log').logger;


/*
 * 
 */
const getDistrict = function (req, res) {
	if (req.params && req.params.districtid) {
		District
			.findOne({
				districtId: req.params.districtid
			}
			)
			.exec((err, district) => {
				if (!district) {
					res
						.status(404)
						.json({
							"message": "districtId not found"
						});
					return;
				} else if (err) {
					res
						.status(404)
						.json(err);
					return;
				}
				district.numAccess = district.numAccess + 1;
				district.save(async (err, district) => {
					if (err) {
						res
							.status(404)
							.json(err);
					} else {
						res
							.status(200)
							.json(district);
					}
				});
			});
	} else {
		res
			.status(404)
			.json({
				"message": "No districtId in request"
			});
	}
}

const getDistrictDB = function (req, res) {
	console.log("aupaaa");
	if (req.params && req.params.districtid) {
		DistrictDB
			.findOne({
				districtId: req.params.districtid
			}
			)
			.exec((err, district) => {
				if (!district) {
					console.log(req.params.districtid);
					console.log("jodo");
					res
						.status(404)
						.json({
							"message": "districtId not found"
						});
					return;
				} else if (err) {
					console.log("auddpaaa");
					res
						.status(404)
						.json(err);
					return;
				}
				console.log("jVVVAMOOOOSSSSodo");
				res
					.status(200)
					.json(district);
			});
	} else {
		console.log("auxxxxpaaa");
		res
			.status(404)
			.json({
				"message": "No districtId in request"
			});
	}
}

/*
 * 
 */
const getRankingDB = function (req, res) {
	DistrictDB
		.find()
		.exec((err, districts) => {
			if (err) {
				res
					.status(404)
					.json(err);
				return;
			}
			res
				.status(200)
				.json(districts);
		});
}

/*
 * 
 */
const getRanking = function (req, res) {
	District
		.find()
		.sort({ subjectScore: -1 })
		.exec((err, districts) => {
			if (err) {
				res
					.status(404)
					.json(err);
				return;
			}
			res
				.status(200)
				.json(districts);
		});
}

/*
 * 
 */
const addValuation = function (req, res) {
	const districtid = req.params.districtid;
	if (districtid) {
		District
			.findOne({
				districtId: req.params.districtid
			}
			)
			.exec((err, district) => {
				if (err) {
					res
						.status(400)
						.json(err);
				} else {
					_doAddValuation(req, res, district);
				}
			}
			);
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
const updateValuation = function (req, res) {
	if (!req.params.districtid) {
		res
			.status(404)
			.json({
				"message": "Not found, districtid and valuationid are both required"
			});
		return;
	}
	District
		.findOne({
			districtId: req.params.districtid
		}
		)
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
			if (district.valuations && district.valuations.length > 0) {

				var valuation = district.valuations.filter(function(item) {
					return item.userId == req.body.userId
				});

				console.log(valuation[0]._doc.userId);

				let thisValuations = district.valuations.id(valuation[0]._doc._id);
				if (!thisValuations) {
					res
						.status(404)
						.json({
							"message": "valuationid not found"
						});
				} else {
					thisValuations.score = req.body.score;

					let sumaScore = 0;
					for (let i of district.valuations) sumaScore += i.score;

					district.subjectScore = sumaScore / district.numScores;

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
				.json({
					"message": "No review to update"
				});
			}
		}
		);
}

const getmyValuation = function (req, res) {
	if (!req.params.districtid) {
		res
			.status(404)
			.json({
				"message": "Not found, districtid is required"
			});
		return;
	}
	District
		.findOne({
			districtId: req.params.districtid
		}
		)
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
			var valuation = district.valuations.filter(function(item) {
				return item.userId == req.body.userId
			});

			if(Array.isArray(valuation) && valuation.length){
				res
				.status(200)
				.json(valuation[0].score);
			}
			else{
				res
				.status(200)
				.json(-1);
			}
			

			
		}
		);
}

const getValuations = function (req, res) {
	if (!req.params.districtid) {
		res
			.status(404)
			.json({
				"message": "Not found, districtid is required"
			});
		return;
	}
	District
		.findOne({
			districtId: req.params.districtid
		}
		)
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
			res
					.status(200)
					.json(district.valuations);
		}
		);
}

const saveData = function (req, res) {
	req.body.barrios.forEach(function(barrio) {
		DistrictDB.save(barrio, (err, d) => {
			if (err) {
				logger.error(err);
			} else {
				logger.info("add info barrio in db OK");
			}
		});
	});
};

const districCreate = function (req, res) {
	District.create({
		districtId: req.body.id,
		name: req.body.name,
		valuations: req.body.valuations,
		comments: req.body.comments
	}, (err, d) => {
		if (err) {
			res
				.status(400)
				.json(err);
		} else {
			res
				.status(201)
				.json(d);
		}
	});
};

/*
 * 
 */
const stats = function (req, res) {
	District
		.find()
		.exec((err, districts) => {
			if (err) {
				res
					.status(404)
					.json(err);
				return;
			}
			res
				.status(200)
				.json(districts);
		});
}




// PRIVATE HELPER METHODS

const _doAddValuation = function (req, res, district) {
	if (!district) {
		res
			.status(404)
			.json({
				"message": "district not found"
			});
	} else {
		district.valuations.push({
			score: req.body.score,
			userId: req.body.userId,
		});

		let numScoresD = district.numScores;
		let sumaScore = 0;

		for (let i of district.valuations) sumaScore += i.score;

		district.numScores = numScoresD + 1;
		district.subjectScore = sumaScore / district.numScores;

		district.save((err, district) => {
			if (err) {
				console.error(err);
				res
					.status(400)
					.json(err);
			} else {
				let thisValuation = district.valuations[district.valuations.length - 1];
				res
					.status(201)
					.json(thisValuation);
			}
		});
	}
};


module.exports = {
	getDistrict,
	getDistrictDB,
	getRankingDB,
	getRanking,
	addValuation,
	updateValuation,
	getmyValuation,
	getValuations,
	saveData,
	districCreate,
	stats
};