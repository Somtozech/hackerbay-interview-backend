const router = require('express').Router();
const Validator = require('../middleware/validation');
const Controller = require('../controllers');
const { authenticate } = require('../middleware/auth');

router.post('/user/login', Validator.validateLogin, Controller.login);

router.post(
  '/patch-json',
  authenticate,
  Validator.validateJsonPatch,
  Controller.patchJSON
);

router.post(
  '/create-thumbnail',
  Validator.validateImage,
  Controller.createThumbnail
);

module.exports = router;
