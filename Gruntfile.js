'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      file: 'https-redirect',
      banner: '/* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy/m/d") %>\n' +
              '   <%= pkg.homepage %>\n' +
              '   Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
              ' - Licensed <%= _.pluck(pkg.license, "type").join(", ") %> */\n',
      specs: 'specs',
      reports: 'reports'
    },

    source: {
      files: 'src/**/*.js',
      specs: 'specs/**/*.js'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      files: {
        src: '<%= source.files %>'
      },
      specs: {
        src: '<%= source.specs %>'
      }
    },

    jasmine_node: {
      coverage: {
        savePath : "./<%=meta.reports%>/"
      },
      options: {
        specNameMatcher: "spec",
        projectRoot: "specs",
        requirejs: false,
        forceExit: true,
        junitreport: {
          report: false,
          savePath : "./<%=meta.reports%>/",
          useDotNotation: true,
          consolidate: true
        }
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      files: {
        files: '<%= files.src %>',
        tasks: ['jshint:files', 'jasmine']
      },
      specs: {
        files: '<%= files.specs %>',
        tasks: ['jshint:specs', 'jasmine']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node-coverage');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'jasmine_node']);

};
