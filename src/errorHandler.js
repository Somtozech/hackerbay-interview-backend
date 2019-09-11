const logger = require('./logger');
/**
 * Centralized error handler
 * @param {Error} error
 * @param {Request} req
 * @param {Response} res
 * @param {Middleware} next
 */
function errorHandler(error, req, res, next) {
	logger.error(error);
	const status = error.status || 500;
	res.status(status).send({
		message: error.message || 'Internal Server Error',
		data: null,
		error: error
	});
}

module.exports = errorHandler;
