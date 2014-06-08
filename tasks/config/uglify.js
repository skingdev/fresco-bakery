'use strict';

module.exports = {
  development: {
    files: []
  },

  dist: {
    files: [{
      dest: '<%= folders.output %>/<%= filenames.js %>',
      src: '<%= folders.output %>/<%= filenames.js %>'
    }]
  },

  test: {
    files: []
  }
};
