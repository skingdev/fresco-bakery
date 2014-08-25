'use strict';

var Application = require('../application');
var BaseController = require('./base');
var HomeView = require('../views/home/layout');
var MenuItemsCollection = require('../collections/menu-items');
var MenuItemsView = require('../views/menu/items');
var MenuView = require('../views/menu/layout');


module.exports = BaseController.extend({

  defaultRoute: function() {
    Backbone.history.navigate(Application.config.defaultRoute);
    Application.app.content.show(new HomeView());
  },

  directions: function() {
    Backbone.history.navigate('#/directions');
  },

  menu: function() {
    Backbone.history.navigate('#/menu');

    var layout = new MenuView();
    Application.app.content.show(layout);

    var menuItems = new MenuItemsCollection();
    menuItems.fetch().done(function() {

      layout.menuItems.show(new MenuItemsView({
        collection: menuItems
      }));
    });
  },

  photos: function() {
    Backbone.history.navigate('#/photos');
  }
});
