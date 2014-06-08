'use strict';

module.exports = function(obj) {
  _.each(_.toArray(arguments).slice(1), function(source) {
    if (source) {
      for (var prop in source) {
        if (_.isObject(source) && _.isObject(source[prop])) {
          obj[prop] = _.extend(obj[prop] || {}, source[prop]);
        } else {
          obj[prop] = source[prop];
        }
      }
    }
  });
  return obj;
};
