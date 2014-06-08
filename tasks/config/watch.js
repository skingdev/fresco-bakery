'use strict';

module.exports = function(grunt, options) {
  return {
    options: {
      livereload: options.config.server.liveReloadPort,
      spawn: false
    },

    css: {
      files: ['<%= folders.styles %>/**/*.less'],
      tasks: ['less:<%= taskEnv %>']
    },

    pages: {
      files: [
        '<%= folders.pages %>/**/*.html.template',
        '<%= folders.test %>/index.html.template'
      ],
      tasks: ['html:<%= taskEnv %>', 'html:test']
    },

    javascript: {

      files: [
        '<%= folders.app %>/**/*.js'
      ],
      tasks: ['browserify:<%= taskEnv %>', 'concat', 'uglify:<%= taskEnv %>']
    },

    templates: {
      files: [
        '<%= folders.templates %>/**/*.hbs'
      ],
      tasks: ['browserify:<%= taskEnv %>', 'handlebars', 'concat', 'uglify:<%= taskEnv %>']
    },

    test: {
      files: ['<%= folders.testBuild %>/**/*.js'],
      tasks: ['karma:development:run']
    }
  };
};
