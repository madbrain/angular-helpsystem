// Karma configuration
// Generated on Sat Aug 20 2016 16:56:17 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['jspm', 'jasmine'],
    plugins: ['karma-jspm', 'karma-jasmine', 'karma-firefox-launcher'],
    
    files: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js'
    ],

    exclude: [
    ],

	jspm: {
		loadFiles:  [ 'src/**/*.test.ts' ],
		serveFiles:  [ 'src/**/*!(*.test).ts' ]
	},

	proxies: {
		'/src/': '/base/src/',
		'/jspm_packages/': '/base/jspm_packages/'
	},

    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
