'use strict';

var Application = require('../application');
var BaseController = require('./base');

module.exports = BaseController.extend({

  defaultRoute: function() {
    Backbone.history.navigate(Application.config.defaultRoute);
  },

  directions: function() {
    Backbone.history.navigate('#/directions');
  },

  menu: function() {
    Backbone.history.navigate('#/menu');
  },

  photos: function() {
    Backbone.history.navigate('#/photos');
  }
});
