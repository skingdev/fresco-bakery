'use strict';

module.exports = {
  bootstrapFonts: {
    files: [{
      expand: true,
      cwd: '<%= folders.bower %>/bootstrap',
      dest: '<%= folders.output %>',
      src: 'fonts/**'
    }]
  },

  static: {
    files: [{
      expand: true,
      cwd: '<%= folders.static %>',
      dest: '<%= folders.output %>',
      src: '**'
    }]
  },

  data: {
    src: 'data/menu.json',
    dest: '<%= folders.output %>' + '/'
  }
};
