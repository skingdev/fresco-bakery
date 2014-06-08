'use strict';

var _ = require('underscore');
var grunt = require('grunt');

//
// Examples:
//
//   grunt serve
//   grunt serve:dist
//   grunt serve:goblin
//
grunt.registerTask('serve', 'Serve files using local web server', function(target) {
  var env = target || 'development';
  var taskSuffix = env === 'dist' ? 'dist' : 'development';
  grunt.config.set('taskEnv', taskSuffix);

  var tasks = _.map(grunt.config.getRaw('config.sharedTasks'), function(task) {
    if (env === 'dist' && task === 'config') {
      return 'config:development';
    }

    if (task === 'browserify:<%= env %>') {
      return ['browserify:' + taskSuffix, 'browserify:test'];
    }

    if (task === 'html:<%= env %>') {
      return ['html:' + taskSuffix, 'html:test'];
    }

    return grunt.template.process(task, { data: { env: taskSuffix } });
  });

  tasks.unshift('env:' + env);
  tasks.push('connect:' + taskSuffix, 'connect:test');
  tasks.push('karma:development');
  tasks.push('watch');

  grunt.log.writeln('Your tests will run automatically as files are saved.');
  grunt.log.writeln('You can also view them in a browser at http://' +
    grunt.config.get('config.server.hostname') + ':' +
    grunt.config.get('config.server.testPort') + '/test.html');

  grunt.task.run(_.flatten(tasks));
});
