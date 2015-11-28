/*
 |----------------------------------------------
 | Gulp
 |----------------------------------------------
 |
 | Add any compile steps here. Always use gulp
 | to make a build
 |
 */
var path = require('path');

// Core
var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );

// Build
var sass = require('gulp-sass');
var webpack = require( 'webpack' );
var stream = require( 'webpack-stream' );

gulp.task( 'compile-app', function() {
  return gulp.src( 'extension-src/index.js' )
    .pipe( stream( {
      entry: path.join(__dirname, 'extension-src', 'index.js'),
      output: {
        path: path.join(__dirname, 'chrome-src/', 'index.js'),
        filename: 'index.js'
      },
      resolve: {
        root: path.join(__dirname, 'extension-src'),
        alias: {
          shared: path.join(__dirname, 'src/client/shared/'),
          'shared-lib': path.join(__dirname, 'src/lib/shared/')
        }
      },
      resolveLoader: {
        root: path.join(__dirname, "node_modules")
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
              presets: ['react', 'es2015']
            }
          }
        ]
      }
    } ) )
    .pipe( gulp.dest( 'chrome-src/' ) );
} );

gulp.task( 'compile-background', function() {
  return gulp.src( 'extension-src/background.js' )
    .pipe( stream( {
      entry: path.join(__dirname, 'extension-src', 'background.js'),
      output: {
        path: path.join(__dirname, 'chrome-src/', 'background.js'),
        filename: 'background.js'
      },
      resolve: {
        root: path.join(__dirname, 'extension-src'),
        alias: {
          shared: path.join(__dirname, 'src/client/shared/'),
          'shared-lib': path.join(__dirname, 'src/lib/shared/')
        }
      },
      resolveLoader: {
        root: path.join(__dirname, "node_modules")
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
              presets: ['react', 'es2015']
            }
          }
        ]
      }
    } ) )
    .pipe( gulp.dest( 'chrome-src/' ) );
} );

gulp.task( 'compile-inject', function() {
  return gulp.src( 'extension-src/inject.js' )
    .pipe( stream( {
      entry: path.join(__dirname, 'extension-src', 'inject.js'),
      output: {
        path: path.join(__dirname, 'chrome-src/', 'inject.js'),
        filename: 'inject.js'
      },
      resolve: {
        root: path.join(__dirname, 'extension-src'),
        alias: {
          shared: path.join(__dirname, 'src/client/shared/'),
          'shared-lib': path.join(__dirname, 'src/lib/shared/')
        }
      },
      resolveLoader: {
        root: path.join(__dirname, "node_modules")
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
              presets: ['react', 'es2015']
            }
          }
        ]
      }
    } ) )
    .pipe( gulp.dest( 'chrome-src/' ) );
} );

gulp.task( 'sass', function() {
  gulp.src('extension-src/stylesheets/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('chrome-src'));
} );

gulp.task( 'default', [ 'compile-app', 'compile-background', 'compile-inject', 'sass' ] );
