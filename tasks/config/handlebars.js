'use strict';

module.exports = {
  compile: {
    files: [{
      dest: '<%= folders.tmp %>/<%= filenames.templates %>',
      src: '<%= folders.templates %>/**/*.hbs'
    }]
  }
};
