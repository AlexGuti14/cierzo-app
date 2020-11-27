const request = require('request');
const logger = require('../../config/winston.log').logger;
var jwt = require('jsonwebtoken');

const apiOptions = {
	server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://cierzo.herokuapp.com';
}

// PUBLIC EXPOSED METHODS

/*
 * 
 */
const createComment = function (req, res){
	const btoken = req.headers.authorization;
	const token = btoken.replace("Bearer ", "");
	console.log(token);
	var user = jwt.decode(token);
	const userid = user._id;
	const districtid = req.params.districtid;
	const path = `/api/comment/${districtid}/comment`;
	const postdata = {
		text: req.body.text,
		userId: userid
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
				res.statusCode = 201;
				res.send(body);
			}
			else if (response.statusCode === 404) {
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}

/*
 * 
 */
const getComments = function (req, res){
	const districtid = req.params.districtid;
	const sort = req.params.sort;
	const path = `/api/comment/${districtid}/comment/${sort}`;
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
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}

/*
 * 
 */
const valorateComment = function (req, res){
	const districtid = req.params.districtid;
	const commentid = req.params.commentid;
	const path = `/api/comment/${districtid}/comment/${commentid}`;
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'PUT',
		json: {}
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				res.statusCode = 200;
				res.send("Updated");
			}
			else if (response.statusCode === 404) {
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}

const addLike = function (req, res){
	const btoken = req.headers.authorization;
	const token = btoken.replace("Bearer ", "");
	var user = jwt.decode(token);
	const userid = user._id;
	const districtid = req.params.districtid;
	const commentid = req.params.commentid;
	const path = `/api/comment/${districtid}/comment/${commentid}/1`;
	const postdata = {
		userId: userid
	};
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'PUT',
		json: postdata
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				res.statusCode = 200;
				res.send("Updated");
			}
			else if (response.statusCode === 404) {
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}

const removeLike = function (req, res){
	const btoken = req.headers.authorization;
	const token = btoken.replace("Bearer ", "");
	var user = jwt.decode(token);
	const userid = user._id;
	const districtid = req.params.districtid;
	const commentid = req.params.commentid;
	const path = `/api/comment/${districtid}/comment/${commentid}/0`;
	const postdata = {
		userId: userid
	};
	const requestOptions = {
		url: apiOptions.server + path,
		method: 'PUT',
		json: postdata
	};
	request(
		requestOptions,
		(err, response, body) => {
			if (response.statusCode === 200) {
				res.statusCode = 200;
				res.send("Updated");
			}
			else if (response.statusCode === 404) {
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}
/*
 * 
 */
const deleteComment = function (req, res){
	const districtid = req.params.districtid;
	const commentid = req.params.commentid;
	const path = `/api/comment/${districtid}/comment/${commentid}`;
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
				res.statusCode = 404;
				res.send("Error");
			}
		}
	);
}

module.exports = {
	createComment,
	getComments,
	valorateComment,
	deleteComment,
	addLike,
	removeLike
};