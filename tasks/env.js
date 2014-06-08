'use strict';

var grunt = require('grunt');
grunt.registerTask('env', 'Sets environment to use for future tasks', function(target) {
  var env = grunt.config.get('env');
  if (env) {
    grunt.log.errorlns('Environment already set to "' + env + '", not changing it to "' + target + '"');
  } else {
    grunt.config.set('env', target);
    grunt.log.oklns('Changed environment to "' + target + '"');
  }
});
