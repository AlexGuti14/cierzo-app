const mongoose = require('mongoose');

var dbURI;
const dbLocal = 'mongodb://localhost/Cierzo';
const dbProd = 'mongodb://guti:guti@cierzo-shard-00-00-kybty.gcp.mongodb.net:27017,cierzo-shard-00-01-kybty.gcp.mongodb.net:27017,cierzo-shard-00-02-kybty.gcp.mongodb.net:27017/Cierzo?ssl=true&replicaSet=Cierzo-shard-0&authSource=admin&retryWrites=true&w=majority';
if (process.env.NODE_ENV === 'production') {
	dbURI = dbProd;
}
else{
	dbURI = dbLocal;
}
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
	console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
	console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
	console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
	mongoose.connection.close(() => {
		console.log(`Mongoose disconnected through ${msg}`);
		callback();
	});
};

// For nodemon restarts                                 
process.once('SIGUSR2', () => {
	gracefulShutdown('nodemon restart', () => {
		process.kill(process.pid, 'SIGUSR2');
	});
});
// For app termination
process.on('SIGINT', () => {
	gracefulShutdown('app termination', () => {
		process.exit(0);
	});
});
// For Heroku app termination
process.on('SIGTERM', () => {
	gracefulShutdown('Heroku app shutdown', () => {
		process.exit(0);
	});
});

//MODELS
require('./user.model');
require('./district.model');
require('./districtDB.model');

module.exports = {
	'secret':'secret',
	'database': 'mongodb://localhost/mean-secure'
  };
