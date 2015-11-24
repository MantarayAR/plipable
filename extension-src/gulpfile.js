/*
 |----------------------------------------------
 | Gulp
 |----------------------------------------------
 |
 | Add any compile steps here. Always use gulp
 | to make a build
 |
 */

// Core
var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );

// Build
var sass = require('gulp-sass');
var webpack = require( 'webpack' );
var stream = require( 'webpack-stream' );

gulp.task( 'compile', function() {
  return gulp.src( 'index.js' )
    .pipe( stream( {
      entry: __dirname + '/index.js',
      output: {
        path: __dirname + '/../chrome-src/',
        filename: 'index.js'
      },
      resolve: {
        root: __dirname
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
    .pipe( gulp.dest( '../chrome-src/' ) );
} );

gulp.task( 'sass', function() {
  gulp.src('stylesheets/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('../chrome-src'));
} );

gulp.task( 'default', [ 'compile', 'sass' ] );
