'use strict';

module.exports = {
  options: {
    autoWatch: false,
    browsers: ['Chrome', 'PhantomJS'],
    files: [
      '<%= folders.test %>/templates/*.html',
      '<%= folders.test %>/support/polyfills.js',
      '<%= folders.bower %>/chai/chai.js',

      '<%= folders.testBuild %>/<%= filenames.css %>',
      '<%= folders.testBuild %>/<%= filenames.js %>',

      '<%= folders.test %>/support/specHelper.js',
      '<%= folders.testBuild %>/tests.js'
    ],
    frameworks: ['mocha'],
    plugins: [
      'karma-chrome-launcher',
      'karma-html2js-preprocessor',
      'karma-mocha',
      'karma-phantomjs-launcher'
    ],
    preprocessors: {
      '**/*.html': ['html2js']
    },
    proxies: {
      '/base/.test/images/': 'http://<%= config.server.hostname %>:<%= config.server.testPort %>/images/',
      '/images/': 'http://<%= config.server.hostname %>:<%= config.server.testPort %>/images/'
    }
  },

  ci: {
    options: {
      singleRun: true
    }
  },

  development: {
    options: {
      background: true,
      singleRun: false
    }
  }
};
