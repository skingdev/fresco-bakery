'use strict';

module.exports = {
  development: ['<%= folders.tmp %>/*', '<%= folders.devBuild %>/*'],
  dist: ['<%= folders.tmp %>/*', '<%= folders.dist %>/*'],
  test: ['<%= folders.tmp %>/*', '<%= folders.testBuild %>/*']
};
