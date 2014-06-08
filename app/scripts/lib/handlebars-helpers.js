'use strict';

var Application = require('../application');

Handlebars.registerHelper('capitalize', function(value) {
  var response = Handlebars.Utils.escapeExpression(value);
  response = response.replace(/\w\S*/g, function(word) {
    return word.charAt(0).toUpperCase() + word.substr(1);
  });
  return new Handlebars.SafeString(response);
});

Handlebars.registerHelper('timeFromSeconds', function(value) {
  var escaped = Handlebars.Utils.escapeExpression(value);
  var seconds = parseInt(escaped, 10);
  var hours   = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - (hours * 3600)) / 60);
  var response;
  seconds = seconds - (hours * 3600) - (minutes * 60);

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  response = seconds;
  if (minutes !== '00') {
    response = minutes + ':' + seconds;
  }
  if (hours !== '00') {
    response = hours + ':' + minutes + ':' + seconds;
  }

  return new Handlebars.SafeString(response);
});

Handlebars.registerHelper('queueLabelName', function(label) {
  var escaped = Handlebars.Utils.escapeExpression(label);
  return new Handlebars.SafeString(Application.stats.get(escaped).get('displayName'));
});
