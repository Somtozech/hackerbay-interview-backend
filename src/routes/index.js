const userRoute = require('./user');

module.exports = function(router) {
  router.use('/user', userRoute);
  return router;
};
