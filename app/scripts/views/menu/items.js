'use strict';

var ItemView = require('./item');

module.exports = Backbone.Marionette.CompositeView.extend({
  template: 'menu/items',
  childView: ItemView,
  childViewContainer: '[data-view-container]'
});
