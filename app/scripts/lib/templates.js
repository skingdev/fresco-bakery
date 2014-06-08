(function(Marionette) {
  'use strict';

  Marionette.View.prototype.getTemplate = function() {
    var template = Marionette.getOption(this, 'template');
    if (template && typeof template === 'string') {
      return window.JST['app/templates/' + template + '.hbs'];
    }
    return template;
  };
})(Marionette);
