const joi = require('@hapi/joi');

//schema for validating payload during login
exports.loginSchema = joi.object().keys({
	username: joi
		.string()
		.min(4)
		.required(),
	password: joi
		.string()
		.min(4)
		.required()
});

// schema for validating json patch payload
exports.jsonpatchSchema = joi.object().keys({
	json: joi.object().required(),
	patch: joi.array().required()
});

// schema for validating image generation thumbnail payload
exports.imageurlSchema = joi.object().keys({
	imageUrl: joi.string().required()
});
