'use strict';

// override Backbone.sync so we can transform data before use
var _sync = Backbone.sync;
Backbone.sync = function(method, model, options) {
  if (_.isFunction(model.onData)) {
    var _success = options.success;
    options.success = function(data) {
      _success(this.onData(data));
    }.bind(this);
  }
  return _sync(method, model, options);
};
