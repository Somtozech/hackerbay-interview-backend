const { createServer } = require('http');
const logger = require('./src/logger');

const app = require('./src/app');
const config = require('./src/config');
const server = createServer(app);

server.listen(config.PORT);

server.on('listening', () => {
  logger.info(`Server listening at port ${config.PORT}`);
});

server.on('error', err => {
  logger.error(err);
});
