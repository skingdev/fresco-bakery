'use strict';

var ApplicationController = require('../controllers/application');

module.exports = Marionette.AppRouter.extend({
  controller: new ApplicationController(),
  appRoutes: {
    '': 'defaultRoute',
    'menu': 'menu',
    'photos': 'photos',
    'directions': 'directions'
  }
});
