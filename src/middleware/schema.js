const joi = require('@hapi/joi');

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

exports.jsonpatchSchema = joi.object().keys({
  json: [joi.object().required(), joi.array().required()],
  patch: [joi.object().required(), joi.array().required()]
});

exports.imageurlSchema = joi.object().keys({
  imageUrl: joi.string().required()
});
