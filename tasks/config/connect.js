'use strict';

module.exports = function(grunt, options) {
  // connect middleware for auto-inserting livereload snippet
  var lrSnippet = require('connect-livereload')({
    port: options.config.server.liveReloadPort
  });

  // connect middleware helper for adding static assets folder
  var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
  };

  return {
    options: {
      hostname: options.config.server.hostname,
      port: options.config.server.port
    },

    dist: {
      options: {
        middleware: function (connect) {
          return [
            mountFolder(connect, options.folders.dist)
          ];
        }
      }
    },

    development: {
      options: {
        middleware: function (connect) {
          return [
            lrSnippet,
            mountFolder(connect, options.folders.devBuild),
            mountFolder(connect, options.folders.static)
          ];
        }
      }
    },

    test: {
      options: {
        port: options.config.server.testPort,
        middleware: function (connect) {
          return [
            lrSnippet,
            mountFolder(connect, grunt.config.get('folders.output')),
            mountFolder(connect, options.folders.testBuild),
            mountFolder(connect, options.folders.test + '/support'),
            mountFolder(connect, options.folders.static),
            mountFolder(connect, options.folders.bower)
          ];
        }
      }
    }
  };
};
