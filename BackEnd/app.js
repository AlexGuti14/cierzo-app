const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var passport = require('passport');
const logger = require('./config/winston.log').logger;
require('./api_bd/models/db');
var CronJob = require('cron').CronJob;
const ctrlDistrict = require('./api_server/controllers/district.server.controller');


const apiOptions = {
	server: 'localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = 'cierzo.herokuapp.com';
}

//API SERVER
const usersServerRouter = require('./api_server/routes/user.server.router');
/* const authServerRouter = require('./api_server/routes/auth.server.router'); */
const districtServerRouter = require('./api_server/routes/district.server.router');
const commentServerRouter = require('./api_server/routes/comment.server.router');


//API DB
const usersApiRoutes = require('./api_bd/routes/user.db.router');
/* const authApiRoutes = require('./api_bd/routes/auth.db.router'); */
const districtApiRoutes  = require('./api_bd/routes/district.db.router');
const commentApiRoutes  = require('./api_bd/routes/comment.db.router');


const passportSetup = require('./api_bd/config/passport-setup');
var swaggerJSDoc = require('swagger-jsdoc');

const app = express();
//0 0 4 * * MON
var job = new CronJob('0 0 4 * * MON', function() {
    
    const d = new Date();
    console.log('Job in Date:', d);
	ctrlDistrict.getAllData();

}, null, true, 'Europe/Madrid');


///////////////SWAGGER///////////////
var swaggerDefinition = {
	openapi: '3.0.1',
	info: {
		title: 'API app Cierzo',
		version: '1.0.0',
		description: 'Descripción del API del servicio de Cierzo'
	},
	host: apiOptions.server,
	basePath: '/',
	schemes: ['http', 'https'],
	components: {
		securitySchemes: {
		bearerAuth: {
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT',
		  }
		}
	},
	security: [{
		bearerAuth: []
	}]
};
// options for the swagger docs

var options = {
	// import swaggerDefinitions
	swaggerDefinition: swaggerDefinition,
	// path to the API docs
	apis: ['./api_server/routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize()); //aqui coco
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	console.log("CORS");
	next();
});

// Create link to Angular build directory
app.use(express.static(path.join(__dirname, 'public')));
//API REST
app.use('/user', usersServerRouter);
/* app.use('/auth', authServerRouter); */
app.use('/district', districtServerRouter);
app.use('/comment', commentServerRouter);


//API DB
app.use('/api/user', usersApiRoutes);
/* app.use('/api/auth', authApiRoutes); */
app.use('/api/district', districtApiRoutes);
app.use('/api/comment', commentApiRoutes);


app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send('error');
});

module.exports = app;
