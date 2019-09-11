const { createLogger, format, transports } = require('winston');

const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.prettyPrint(),
		format.json(),
		format.colorize()
	),
	transports: [
		// - Write all logs error (and below) to `error.log`.
		//
		new transports.File({ filename: 'error.log', level: 'error' }),
		new transports.Console({
			handleExceptions: true
		})
	],
	exceptionHandlers: [new transports.File({ filename: 'exceptions.log' })]
});
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new transports.Console({
			format: format.simple()
		})
	);
}

module.exports = logger;
