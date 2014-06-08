'use strict';

var grunt = require('grunt');
grunt.registerTask('output', 'Sets output folder based on current env', function() {
  grunt.config.requires('env', 'folders');
  var env = grunt.config.get('env');
  var folders = grunt.config.get('folders');
  if (env === 'dist') {
    folders.output = folders.dist;
  } else if (env === 'test') {
    folders.output = folders.testBuild;
  } else {
    folders.output = folders.devBuild;
  }
  grunt.log.writeln('Setting output folder to: ' + folders.output);
  grunt.config.set('folders', folders);
});
