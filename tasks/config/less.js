'use strict';

module.exports = {
  options: {
    paths: [
      '<%= folders.bower %>/'
    ]
  },

  development: {
    files: [{
      dest: '<%= folders.output %>/<%= filenames.css %>',
      src: '<%= folders.styles %>/app.less'
    }]
  },

  dist: {
    files: [{
      dest: '<%= folders.output %>/<%= filenames.css %>',
      src: '<%= folders.styles %>/app.less'
    }]
  },

  test: {
    files: [{
      dest: '<%= folders.output %>/<%= filenames.css %>',
      src: '<%= folders.styles %>/app.less'
    }]
  }
};
