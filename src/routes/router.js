const router = require('express').Router();
const Validator = require('../middleware/validation');
const Controller = require('../controllers');
const { checkAuthorization } = require('../middleware/auth');

router.post('/user/login', Validator.validateLogin, Controller.login);

router.post(
	'/patch-json',
	checkAuthorization,
	Validator.validateJsonPatch,
	Controller.patchJSON
);

router.post(
	'/create-thumbnail',
	checkAuthorization,
	Validator.validateImage,
	Controller.createThumbnail
);

module.exports = router;
