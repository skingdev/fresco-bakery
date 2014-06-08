'use strict';

module.exports = {
  development: {
    options: {
      alias: ['./<%= folders.scripts %>/application:app'],
      bundleOptions: {
        debug: false
      }
    },
    dest: '<%= folders.tmp %>/app.js',
    src: '<%= folders.scripts %>/application.js'
  },

  dist: {
    options: {
      alias: ['./<%= folders.scripts %>/application:app']
    },
    dest: '<%= folders.tmp %>/app.js',
    src: '<%= folders.scripts %>/application.js'
  },

  test: {
    options: {
      bundleOptions: {
        debug: true
      },
      external: [
        'app'
        //'./<%= folders.scripts %>/**/*.js'
      ]
    },
    dest: '<%= folders.output %>/tests.js',
    src: 'test/{unit,integration}/**/*.js'
  }
};
