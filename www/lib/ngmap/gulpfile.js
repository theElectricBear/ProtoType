'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');
var rename = require('gulp-rename');
var stripDebug = require('gulp-strip-debug');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var through = require('through2');
var replace = require('gulp-replace');
var tap = require('gulp-tap');
var bump = require('gulp-bump');
var shell = require('gulp-shell');
var karma = require('karma').server;
var connect = require('gulp-connect');
var gulpProtractor = require("gulp-protractor").protractor;
var angularJsdoc = require('angular-jsdoc');
var bumpVersion = function(type) {
  type = type || 'patch';
  var version = '';
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type: type}))
    .pipe(gulp.dest('./'))
    .pipe(tap(function(file, t) {
      version = JSON.parse(file.contents.toString()).version;
    })).on('end', function() {
      var color = gutil.colors;
      gulp.src('')
        .pipe(shell([
          'git commit --all --message "Version ' + version + '"',
          (type != 'patch' ? 'git tag --annotate "v' + version + '" --message "Version ' + version + '"' : 'true')
        ], {ignoreErrors: false}))
        .pipe(tap(function() {
          gutil.log(color.green("Version bumped to ") + color.yellow(version) + color.green(", don't forget to push!"));
        }));
    });

};

gulp.task('clean', function() {
  return gulp.src('build')
    .pipe(clean({force: true}));
});

gulp.task('build-js', function() {
  return gulp.src([
      'app.js',
      'services/*.js',
      'directives/*.js'
    ])
    .pipe(concat('ng-map.debug.js'))
    .pipe(gulp.dest('build/scripts'))
    .pipe(stripDebug())
    .pipe(concat('ng-map.js'))
    .pipe(gulp.dest('build/scripts'))
    .pipe(uglify())
    .pipe(rename('ng-map.min.js'))
    .pipe(gulp.dest('build/scripts'))
    .on('error', gutil.log);
});

gulp.task('docs', function() {
  angularJsdoc(['directives', 'services'], {destination: 'build/docs'});
});

gulp.task('bump', function() { bumpVersion('patch'); });
gulp.task('bump:patch', function() { bumpVersion('patch'); });
gulp.task('bump:minor', function() { bumpVersion('minor'); });
gulp.task('bump:major', function() { bumpVersion('major'); });

gulp.task('build', function(callback) {
  runSequence('clean', 'build-js', 'test', 'docs', callback);
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/config/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('testapp-server',  function() {
  connect.server({
    root: __dirname + '/testapp',
    port: 8888
  });
});

gulp.task('test-e2e', ['testapp-server'], function() {
  gulp.src([__dirname + "/spec/e2e/*_spec.js"])  
    .pipe(gulpProtractor({
      configFile: __dirname + "/config/protractor.conf.js",
      args: [
        '--baseUrl', 'http://localhost:8888'
      ]
    })) 
    .on('error', function(e) { 
      console.log([
        '------------------------------------------------------------------------------------',
        'For first-time user, we need to update webdrivers', 
        '$ node_modules/gulp-protractor/node_modules/protractor/bin/webdriver-manager update',
        '------------------------------------------------------------------------------------'
      ].join('\n'));
      throw e;
    })
    .on('end', function() { // when process exits:
      connect.serverClose();
    });
});

