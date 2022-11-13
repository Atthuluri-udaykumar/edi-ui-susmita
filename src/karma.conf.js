// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-coverage'),
      require('karma-sonarqube-unit-reporter')
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser,
      // jasmine: {
      //   random: false,
      // }
    },
    reporters: ['progress', 'kjhtml', 'sonarqubeUnit', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      testPaths: ['./src/app'],
      outputDir: './coverage',
      outputFile: 'ut_report.xml',
      useBrowserName: false
    },
    preprocessors: {
      'src/**/*.ts': ['coverage'],
      'test/**/*.ts': ['coverage']
    },
    coverageReporter: {
      type: 'cobertura',
      dir: require('path').join(__dirname, '../coverage'),
      subdir: '.'
    },
    singleRun: false
  });
};
