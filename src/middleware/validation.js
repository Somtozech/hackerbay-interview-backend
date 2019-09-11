const { loginSchema, jsonpatchSchema, imageurlSchema } = require('./schema');
const path = require('path');

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

  next();
};

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
