'use strict';

var Application = require('../application');
var BaseController = require('./base');

module.exports = BaseController.extend({

  defaultRoute: function() {
    Backbone.history.navigate(Application.config.defaultRoute);
  }
});
