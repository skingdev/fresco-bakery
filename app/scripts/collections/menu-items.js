'use strict';

module.exports = Backbone.Collection.extend({
  url: function() {
    return 'data/menu.json';
  }
});
