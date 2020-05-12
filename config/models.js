'use strict';

module.exports.init = function(app) {
  var modelsPath = app.get('root') + '/app/models/';

  ['deviceData','device', 'user', 'UserToken'].forEach(function(model) {
    require(modelsPath + model);
  });
};
