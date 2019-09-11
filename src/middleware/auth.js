const jwt = require('jsonwebtoken');
const config = require('../config');

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

exports.authenticate = (req, res, next) => {
  try {
    // get token
    const token = getTokenInQueryOrHeader(req);
    if (!token) {
      return res.status(401).send({
        message: 'Authentication Failed. Access Denied'
      });
    }
    const decoded = jwt.verify(token, config.JWT_KEY);
    console.log(decoded);
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
