const express = require('express');
const morgan = require('morgan');
const Router = express.Router();

const appRoutes = require('./routes');
const errorHandler = require('./errorHandler');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use('/api', appRoutes(Router));

// Api docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//eslint-disable-next-line
app.use((req, res, next) => {
	res.status(404).send({
		message: 'Route Not Found'
	});
});

app.use(errorHandler);

module.exports = app;
