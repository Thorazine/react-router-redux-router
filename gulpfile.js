var gulp = require('gulp');
var webpack = require('gulp-webpack');
var noprotocol = require('gulp-noprotocol');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');


// crunch the sass to css
gulp.task('css', function() {
  return gulp.src('sass/**/*.{scss,sass}')
      .pipe(noprotocol.css())
      .on('error', noprotocol.notify)
      .pipe(gulp.dest('public/dist'));
});


// Run the dev webpack configuration
gulp.task('webpack', function() {
    return gulp.src('jsx/index.jsx')
        .pipe(webpack({
            output: {
                path: __dirname + '/public/js',
                filename: "bundle.js"
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel-loader'
                    }
                ]
            }
        }))
        .pipe(gulp.dest('public/dist/'));
});


// run the webpack deployment minifier
gulp.task('webpack-min', function() {
    return gulp.src('jsx/index.jsx')
        .pipe(webpack({
            output: {
                path: __dirname + '/public/js',
                filename: "bundle.js"
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel-loader'
                    }
                ]
            },
            plugins: [
                new webpack.optimize.UglifyJsPlugin({minimize: true})
            ]
        }))
        .pipe(gulp.dest('public/dist/'));
});


// bundle all the other libs (already should be minified)
gulp.task('bundle-libs', function() {
    return gulp.src([
        'js/crossbrowser.js',
        'public/vendor/es5-shim.min.js',
        'public/vendor/jquery/dist/jquery.min.js',
        'public/vendor/q/q.js',
        'js/main.js', // should be last
    ])
    .pipe(noprotocol.bundle('libs.bundle.js'))
    .on('error', noprotocol.notify)
    .pipe(gulp.dest('public/dist'));
});


// tasks
gulp.task('watch', ['css','webpack', 'bundle-libs'], function() {

    livereload.listen();
    gulp.watch('sass/**/*.{scss,sass}', ['css']);
    gulp.watch('jsx/**/*.{jsx,js}', ['webpack']);
    gulp.watch('modules/**/*.{jsx,js}', ['webpack']);
    gulp.watch('js/**/*.js', ['bundle-libs']);
    gulp.watch([
        'public/dist/*.css',
        'public/dist/*.js',
        'public/dist/libs.bundle.js',
        'app/views/**/*.blade.php',
        'public/**/*.html'
    ]).on('change', livereload.changed);
});

gulp.task('minify', ['css', 'webpack-min', 'bundle-libs'])

gulp.task('deploy', ['css', 'webpack', 'bundle-libs']);

gulp.task('default', ['watch']);