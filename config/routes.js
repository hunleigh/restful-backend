'use strict';

module.exports.init = function(app) {
  var routesPath = app.get('root') + '/routes';

  app.use('/', require(routesPath + '/index'));
  app.use('/users', require(routesPath + '/users'));
  app.use('/deviceData', require(routesPath + '/deviceData'));
  app.use('/devices', require(routesPath + '/device'));
  app.use('/auth', require(routesPath + '/loginUser'));
};
