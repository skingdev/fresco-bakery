'use strict';

var _ = require('underscore');
var grunt = require('grunt');

grunt.registerTask('dist', 'Create a static distribution of the project files.', function() {
  grunt.task.run('env:dist');

  var tasks = _.map(grunt.config.getRaw('config.sharedTasks'), function(task) {
    return grunt.template.process(task, { data: { env: 'dist' } });
  });

  grunt.task.run(tasks);
});

// task alias
grunt.registerTask('build', 'dist');
