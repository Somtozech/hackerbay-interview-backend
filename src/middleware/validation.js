const { loginSchema, jsonpatchSchema, imageurlSchema } = require('./schema');
const path = require('path');

// validates req body to make sure it contains valid login fields
exports.validateLogin = (req, res, next) => {
	const body = req.body || {};
	const { error } = loginSchema.validate(body);
	//if loginbody is not valid
	if (error) {
		return res.status(400).send({
			message: 'Bad Request',
			error: {
				name: error.name,
				message: error.details[0].message
			}
		});
	}

	const { json, patch } = req.body;

	if (!json || !patch || typeof json !== 'object' || !Array.isArray(patch)) {
		return res.status(400).send({
			message: 'Bad Request',
			error: {
				name: 'Invalid Field',
				message: 'Either json or patch field is invalid'
			}
		});
	}

	next();
};

//validate req body to make sure it contains required fields
exports.validateJsonPatch = (req, res, next) => {
	const body = req.body || {};
	const { error } = jsonpatchSchema.validate(body);
	if (error) {
		return res.status(400).send({
			message: 'Bad Request',
			error: {
				name: error.name,
				message: error.details[0].message
			}
		});
	}

	next();
};

/**
 * Validates req body to make sure it contains the imageUrl Field
 * Checks if the imageUrl field contains a valid image url
 */
exports.validateImage = (req, res, next) => {
	const body = req.body || {};
	const { error } = imageurlSchema.validate(body);
	if (error) {
		return res.status(400).send({
			message: 'Bad Request',
			error: {
				name: error.name,
				message: error.details[0].message
			}
		});
	}

	const extname = path.extname(req.body.imageUrl).toLocaleLowerCase();
	const fileTypes = /jpg|jpeg|png|svg|gif/;

	if (!fileTypes.test(extname)) {
		return res.status(400).send({
			message: ' Bad Request',
			error: {
				name: 'InvalidImageExtension',
				message:
					'Please make sure image url provided is of a valid type (jpeg, jpg, png, svg, gif)'
			}
		});
	}
	next();
};
