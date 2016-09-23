const argv = require('yargs').argv;
const bump = require('gulp-bump');
const concat = require('gulp-concat');
const fs = require('fs');
const git = require('gulp-git');
const gulp = require('gulp');
const gutil = require('gulp-util');
const inquirer = require('inquirer');
const karma = require('karma').Server;
const prompt = require('gulp-prompt');
const semver = require('semver');

const paths = {
  src: [
    './src/**/*.js'
  ]
};

gulp.task('build', ['test'], function buildTask() {
  gulp.src(paths.src)
    .pipe(concat('angular-test-ez.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('bump', function bumpTask() {

  var currentVersion = getPackageJson().version;

  var bumpChoice = function bumpChoice(type) {
    const newVersion = semver.inc(currentVersion, type);
    return {
      name: type + ' (' + newVersion + ')',
      value: {
        type: type,
        oldVersion: currentVersion,
        newVersion: newVersion
      }
    };
  };

  var bumpVersion;

  gulp.src(['./package.json', './bower.json'])
    .pipe(prompt.prompt({
        type: 'list',
        name: 'bump',
        message: 'What type of bump would you like to do? Now at ' + currentVersion,
        choices: ['patch', 'minor', 'major'].map(bumpChoice)
    }, function(res){
      console.log(res.bump);
      bumpVersion = res.bump.newVersion;
    }))
    .pipe(bump({ version: bumpVersion }))
    .pipe(gulp.dest('./'));
});

gulp.task('tag', function tagTask(done) {
  var version = getPackageJson().version;
  var tagMessage = argv.m || "Release " + version;

  inquirer.prompt({
    type: 'confirm',
    name: 'shouldTagVersion',
    message: 'Tag version ' + version + ' with message "' + tagMessage + '"?',
    when: !argv.f
  }).then(function confirmTag(res) {
    if(res.shouldTagVersion === false) return done();

    git.tag(version, tagMessage, function tagCallback(tagError) {
      if (tagError) return done(tagError);

      git.push('origin', version, function pushTagCallback(pushTagError) {
        return done(pushTagError);
      });
    });
  });
});

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

var getPackageJson = function getPackageJson() {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};
