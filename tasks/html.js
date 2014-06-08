'use strict';

var chalk = require('chalk');
var grunt = require('grunt');

grunt.registerTask('html', function(target) {
  var input = grunt.template.process('<%= folders.pages %>/index.html.template');
  if (target === 'test') {
    input = grunt.template.process('<%= folders.test %>/index.html.template');
  }

  var output = grunt.template.process('<%= folders.output %>/index.html');
  if (target === 'test') {
    output = grunt.template.process('<%= folders.output %>/test.html');
  }

  grunt.log.writeln('Reading ' + chalk.cyan(input) + ' file...');
  var htmlContent = grunt.template.process(grunt.file.read(input));

  grunt.log.writeln('Outputting generated html to ' + chalk.cyan(output));
  grunt.file.write(output, htmlContent);
});
