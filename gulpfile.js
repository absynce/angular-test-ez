const argv = require('yargs').argv;
const gulp = require('gulp');
const karma = require('karma').Server;

gulp.task('test', [], function testTask(done) {
  var reporter = argv.reporter || 'spec';
  runUnitTests(reporter, done);
});

var runUnitTests = function runUnitTests(reporter, done) {
  var server = new karma({
    configFile:  __dirname + '/test/karma.conf.js',
    // TODO: Change to config file and use config log level.
    logLevel: argv.debug ? 'DEBUG' : 'INFO',
    reporters : [reporter]
  }, done);

  server.start();
};
