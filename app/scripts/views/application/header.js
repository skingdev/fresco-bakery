'use strict';

module.exports = Backbone.Marionette.ItemView.extend({
  template: 'application/header',

  ui: {
    nav: '.nav-pills'
  },

  initialize: function() {
    this.listenTo(Application.app.history, 'all', this.updateNavigation);
  },

  onClose: function() {
    this.stopListening(Application.app.history);
  },

  routeMatches: function(fragment) {
    var route = Application.app.history.fragment;
    return (fragment === route.substring(1, fragment.length + 1));
  },

  updateNavigation: function() {
    this.ui.nav.find('li').removeClass('active');

    if (this.routeMatches('menu')) {
      this.$el.find('a[href="#/menu"]').parent().addClass('active');
    } else if (this.routeMatches('photos')) {
      this.$el.find('a[href="#/photos"]').parent().addClass('active');
    } else if (this.routeMatches('directions')) {
      this.$el.find('a[href="#/directions"]').parent().addClass('active');
    } else if (this.routeMatches('')) {
      this.$el.find('a[href="#"]').parent().addClass('active');
    }
  }
});
