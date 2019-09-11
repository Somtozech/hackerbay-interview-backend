const config = {};
const JWT_KEY = 'randomtokenkey';

const env = process.env.NODE_ENV;

config.development = {
  JWT_KEY,
  PORT: 3000
};

config.production = {
  JWT_KEY: process.env.JWT_KEY || JWT_KEY,
  PORT: process.env.PORT || 8080
};

module.exports = config[env] ? config[env] : config['development'];
