'use strict';

module.exports = {
  options: {
    banner: '/*! <%= package.name %> - <%= package.version %> - ' +
      'built <%= grunt.template.today() %> */\n'
  },

  js: {
    src: [
      '<%= folders.bower %>/jquery/dist/jquery.js',
      '<%= folders.bower %>/jquery-migrate/jquery-migrate.js',
      '<%= folders.bower %>/underscore/underscore.js',
      '<%= folders.bower %>/backbone/backbone.js',
      '<%= folders.bower %>/marionette/lib/backbone.marionette.js',
      '<%= folders.bower %>/backbone.marionette.zombies/backbone.marionette.zombies.js',
      '<%= folders.bower %>/handlebars/handlebars.js',
      '<%= folders.bower %>/dimple/dist/dimple.v1.1.5.js',
      '<%= folders.bower %>/html5sortable/jquery.sortable.js',
      '<%= folders.bower %>/moment/moment.js',
      '<%= folders.bower %>/bootstrap/js/alert.js',
      '<%= folders.tmp %>/templates.js',
      '<%= folders.tmp %>/app.js'
    ],
    dest: '<%= folders.output %>/<%= filenames.js %>'
  }
};
