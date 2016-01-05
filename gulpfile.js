'use strict';

var gulp = require('gulp');
var del = require('del');
var minimist = require('minimist');
var resolve = require('path').resolve;

var logger = console.log;

var knownOptions = {
    string: 'api',
    default: {
        api: 'http://127.0.0.1:3000/'
    }
};

var options = minimist(process.argv.slice(2), knownOptions);

var getTime = function() {
    var d = new Date();
    return d.getHours() + ':' + d.getMinutes() + ' ' + d.getSeconds() + '-' + d.getMilliseconds();
};

var handleStatsError = function(stats) {
    var info = stats.toJson();
    if (info.errors.length > 0) {
        logger('[webpack]', stats.toString({colors: true}));
        logger('\n [ ' + getTime() + ' ]   webpack: bundle is now INVALID.');
        return;
    }
    logger('\n [ ' + getTime() + ' ]   webpack: bundle is now VALID!');
};

var compile = function(isDev, cb) {
    var webpack = require('webpack');
    var config;

    if (isDev) {
        config = require(resolve(__dirname, 'webpack.config.dev'));
    } else {
        config = require(resolve(__dirname, 'webpack.config.prod'));
    }

    var runtimeOpts = JSON.stringify({api: options.api});

    config.module.loaders[0].loader = config.module.loaders[0].loader + new Buffer(runtimeOpts).toString('base64');

    var compiler = webpack(config);

    if (isDev) {
        compiler.watch({aggregateTimeout: 500, poll: true}, function(err, stats) {
            if (err) {
                logger('[ERROR]: ', err);
                return;
            }
            handleStatsError(stats);
        });
        return;
    }

    compiler.run(function(err, stats) {
        if (err) {
            cb(err);
            return;
        }
        cb();
    });
};

gulp.task('clean-dist', function() {
    return del(['./dist/**/*']);
});

gulp.task('clean-build', function() {
    return del(['./src/build/**/*']);
});

gulp.task('copy-index', ['clean-build', 'clean-dist'], function() {
    return gulp
        .src(['./src/index.html'])
        .pipe(gulp.dest('./src/build'));
});

gulp.task('copy-package.json', ['clean-build', 'clean-dist'], function() {
    return gulp
        .src(['./package.json'])
        .pipe(gulp.dest('./src/build'));
});

gulp.task('watch', ['copy-index', 'copy-package.json'], function(cb) {
    compile(true, cb);
});

gulp.task('compile-release', ['copy-index', 'copy-package.json'], function(cb) {
    compile(false, cb);
});

gulp.task('release', ['compile-release'], function() {

    var electron = require('gulp-electron');
    var packageJson = require('./package.json');
    return gulp.src('')
        .pipe(electron({
            src: './src/build/',
            packageJson: packageJson,
            release: './dist',
            cache: './cache',
            version: 'v0.36.2',
            packaging: true,
            asar: true,
            platforms: [
                'darwin-x64',
                'win32-x64'
            ],
            platformResources: {
                darwin: {
                    CFBundleDisplayName: packageJson.name,
                    CFBundleIdentifier: packageJson.name,
                    CFBundleName: packageJson.name,
                    CFBundleVersion: packageJson.version,
                    icon: 'icon/wetalk.icns'
                },
                win: {
                    'version-string': packageJson.version,
                    'file-version': packageJson.version,
                    'product-version': packageJson.version,
                    'icon': 'icon/wetalk.ico'
                }
            }
        }))
        .pipe(gulp.dest(''));
});

gulp.task('dev', function(cb) {
    var isWin = /^win/.test(process.platform);
    require('child_process')
        .exec((isWin ? 'sh' : 'node') + ' ./node_modules/.bin/electron --debug=5858 ./src/build/', {
            cwd: __dirname,
            env: {
                NODE_ENV: 'dev'
            }
        }, cb);
});

gulp.task('fix', function() {
    return gulp
        .src('./fix/WebpackOptionsApply.js')
        .pipe(gulp.dest('./node_modules/webpack/lib'));
});
