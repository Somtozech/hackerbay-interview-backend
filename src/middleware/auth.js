const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Checks if a token is present in the authorization header
 * returns token if present else returns null
 * @param {Request} req
 */
function getTokenInQueryOrHeader(req) {
	let token = null;
	if (
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === 'Bearer'
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.query && req.query.token) {
		token = req.query.token;
	}

	return token ? token : null;
}

/**
 * Checks if token in header is from a valid user
 * @param {Request} req - Client Request
 * @param {Response} res - Server Response
 * @param {Middleware} next
 */
exports.checkAuthorization = (req, res, next) => {
	try {
		// get token
		const token = getTokenInQueryOrHeader(req);
		if (!token) {
			return res.status(401).send({
				message: 'Authentication Failed. Access Denied'
			});
		}
		const decoded = jwt.verify(token, config.JWT_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		if (error.name === 'JsonWebTokenError') {
			return res.status(401).send({
				message: 'Invalid Token. Access Denied',
				data: null,
				error: error
			});
		}
		next(error);
	}
};
