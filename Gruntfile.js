'use strict';
/* jshint node: true */

var _ = require('underscore');
var path = require('path');

// Gruntfile configuration
var config = {
  filenames: {
    css: '<%= package.name%>-<%= package.version %>.css',
    js: '<%= package.name%>-<%= package.version %>.js',
    templates: 'templates.js'
  },

  folders: {
    app: 'app',
    bower: 'app/bower_components',
    devBuild: '.dev',
    dist: 'dist',
    pages: 'app/pages',
    scripts: 'app/scripts',
    static: 'app/static',
    styles: 'app/styles',
    tasks: 'tasks',
    templates: 'app/templates',
    test: 'test',
    testBuild: '.test',
    tmp: '.tmp'
  },

  server: {
    // change to '0.0.0.0' to access the server from outside
    hostname: 'localhost',
    liveReloadPort: 35729,
    port: 9000,
    testPort: 9001
  },

  sharedTasks: [
    'output',
    'clean',
    'copy',

    'browserify:<%= env %>',
    'handlebars',
    'concat',
    'uglify:<%= env %>',

    'less:<%= env %>',

    'html:<%= env %>'
  ]
};

module.exports = function (grunt) {

  // load project tasks from tasks/ folder
  grunt.loadTasks('tasks');

  // autoload grunt tasks from package.json and their configurations
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'tasks/config'),
    data: _.extend({
      env: null,
      config: config,
      filenames: config.filenames,
      folders: config.folders
    })
  });
};
