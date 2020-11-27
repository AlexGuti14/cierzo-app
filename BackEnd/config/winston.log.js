const { createLogger, format, transports } = require('winston');
const { combine, printf } = format;
const moment = require('moment');
const level = 'debug';

const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue'
    }
};

const customFormat = printf(info => {
    return moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ` [${info.level}] : ${info.message}`;
});

const logger = createLogger({
    level: level,
    levels: customLevels.levels,
    transports: [
        new transports.Console({
            format: combine(
                format.colorize({ all: true }),
                customFormat
            )
        }),
        new transports.File({
            filename: './logs/app.log',
            maxsize: 1024 * 1024 * 10,
            format: combine(
                customFormat
            ),
		}),
		new transports.File({
			filename: './logs/error.log',
			level: 'error',
            maxsize: 1024 * 1024 * 10,
            format: combine(
                customFormat
			)
		}),
		new transports.File({
			filename: './logs/info.log',
			level: 'info',
            maxsize: 1024 * 1024 * 10,
            format: combine(
                customFormat
			)
        })
    ],

});

module.exports = {
    logger: logger,
    customFormat: customFormat
};