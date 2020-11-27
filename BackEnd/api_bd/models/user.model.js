const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const user = new mongoose.Schema({
	name: {
		type: String,
		//required: true
	},
	email: {
		unique: true,
		type: String,
		required: true
	},
	password: {
		type: String
	},
	logins: {
		type: Number,
		'default': 0
	},
	lastLoginOn: {
		type: Date,
		'default': Date.now
	},
	createdOn: {
		type: Date,
		'default': Date.now
	},
	banned:{
		type: Boolean,
		'default': false
	},
	admin:{
		type: Boolean,
		'default': false
	}
});

user.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

user.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

mongoose.model('User', user);