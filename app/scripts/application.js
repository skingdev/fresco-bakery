'use strict';

require('./lib/sync');
require('./lib/handlebars-helpers');
require('./lib/templates');

var ApplicationRouter = require('./routers/application');

var config = require('./config');

var application = new Backbone.Marionette.Application({
  routers: []
});

application.on('initialize:after', function() {
  this.history.start({
    hashChange: true,
    pushState: false
  });
});

application.addInitializer(function() {
  this.addRegions({
    content: '[data-region=content]',
    footer: '[data-region=footer]',
    header: '[data-region=header]'
  });

  this.history = Backbone.history;
  this.routers.push(new ApplicationRouter());
});

exports.app = application;
exports.config = config;
exports.start = function() {
  $(document).ready(function () {
    application.start();
  });
};
exports.stop = function() {
  Backbone.history.stop();
};
