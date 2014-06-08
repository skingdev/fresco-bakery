'use strict';

module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },

  app: '<%= folders.scripts %>/{,*/}*.js',

  node: {
    options: {
      jshintrc: '<%= folders.tasks %>/.jshintrc'
    },
    files: {
      src: ['Gruntfile.js', '<%= folders.tasks %>/{,*/}*.js']
    }
  },

  test: {
    options: {
      jshintrc: 'test/.jshintrc'
    },
    files: {
      src: '<%= folders.test %>/{unit,integration}/{,*/}*.js'
    }
  }
};
