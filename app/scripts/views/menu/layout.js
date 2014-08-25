'use strict';

module.exports = Backbone.Marionette.LayoutView.extend({
  template: 'menu/layout',

  regions: {
    menuItems: '[data-view=menu-items]'
  }
});
