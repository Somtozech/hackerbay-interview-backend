const userRoute = require('./router');

module.exports = function(router) {
  router.use('/', userRoute);
  return router;
};
