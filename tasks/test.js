'use strict';

var _ = require('underscore');
var grunt = require('grunt');
var testServerRunning = false;

grunt.registerTask('test', function(target) {
  var taskEnv = target || 'development';
  if (_.isUndefined(target)) {
    taskEnv = 'ci';
  }

  grunt.task.run('env:test');

  var tasks = _.map(grunt.config.getRaw('config.sharedTasks'), function(task) {
    if (task === 'browserify:<%= env %>') {
      return ['browserify:development', 'browserify:test'];
    }
    return grunt.template.process(task, { data: { env: 'test' } });
  });

  if (taskEnv === 'serve') {
    tasks.push('connect:test:keepalive');
  } else {
    if (testServerRunning) {
      tasks.push('karma:' + taskEnv + ':run');
    } else {
      tasks.push('connect:test', 'karma:' + taskEnv);
    }

    testServerRunning = true;
  }

  grunt.option('force', true); // do not quit grunt if it encounters errors in tasks
  grunt.task.run(_.flatten(tasks));
});
