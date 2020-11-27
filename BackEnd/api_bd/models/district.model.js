const mongoose = require('mongoose');

const comment = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	likes: {
		type: Number,
		'default': 0
	},
	createdOn: {
		type: Date,
		'default': Date.now
	},
	userId: {
		type: String,
		required: true
	},
	likesids: [String]
}, { usePushEach: true });


const valuation = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	score: {
		type: Number,
		min: 0,
		max: 5
	},
}, { usePushEach: true });


const district = new mongoose.Schema({
	districtId: {
		type: Number,
		unique: true,
		required: true,
		index: true
	},
	name: {
		type: String,
		required: true,
		unique: true
	},
	subjectScore: {
		type: Number,
		'default': 0,
		min: 0,
		max: 5
	},
	numScores: {
		type: Number,
		'default': 0
	},
	valuations: [valuation],
	comments: [comment],
	numAccess: {
		type: Number,
		'default': 0
	}
},
	{ usePushEach: true });


mongoose.model('District', district);