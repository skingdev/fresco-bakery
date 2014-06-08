'use strict';

var Application = require('../application');
var FooterView = require('../views/application/footer');
var HeaderView = require('../views/application/header');

module.exports = Marionette.Controller.extend({
  constructor: function() {
    Marionette.Controller.prototype.constructor.apply(this, arguments);

    // get list of methods that are on the current controller that are not
    // automatically added by any super classes
    var marionetteMethods = ['constructor', 'initialize', 'triggerMethod'];
    var myMethods = _.difference(_.functions(this), _.functions(Marionette.Controller.prototype), marionetteMethods);

    // for each controller method, call our own code, then the original method
    _.each(myMethods, function(methodName) {
      var oldMethod = this[methodName];
      this[methodName] = function() {
        Application.app.footer.show(new FooterView());
        Application.app.header.show(new HeaderView());

        return oldMethod.apply(this, arguments);
      }.bind(this);
    }, this);
  }
});
