(function() {
  'use strict';

  var intervalTime = 50;
  var maxAttempts = 100;

  window.currentPath = function() {
    var deferred = $.Deferred();

    _.defer(function() {
      deferred.resolve(window.location.hash);
    });

    return deferred.promise();
  };

  window.find = function(selector, callCount, deferred) {
    callCount = callCount || 0;
    deferred = deferred || $.Deferred();

    var $fixtures = $('#fixtures');
    var $query = $fixtures.find(selector);

    if ($query.length > 0 || callCount > maxAttempts) {
      return deferred.resolve($query);
    } else {
      setTimeout(function() {
        find(selector, callCount + 1, deferred);
      }, intervalTime);
    }
    return deferred.promise();
  };

  window.setupForTesting = function() {
  };

  window.visit = function(url) {
    window.location = url;
  };
})();
