var gulp     = require('gulp'),
	lazypipe = require('lazypipe'),
	plugins  = {},
	list     = {
		docs: {
			src: ['./source/*.js', './source/**/*.js'],
			pipe: lazypipe()
					.pipe(plugin('yuidoc'), {
							project: {name: 'UI Library', description: 'Simple library for everyday UI components', version: '0.0.1'}
						}, {
							themedir: './node_modules/yuidoc-bootstrap-theme', helpers: ['./node_modules/yuidoc-bootstrap-theme/helpers/helpers.js']
						}
					)
					.pipe(gulp.dest, './docs'),
			skip: true
		},
		script: {
			src: ['./source/*.js', './source/**/*.js'],
			pipe: lazypipe()
					.pipe(plugin('jshint'))
					.pipe(plugin('jshint').reporter, 'jshint-stylish')
					.pipe(gulp.dest, './build/normal')
					.pipe(plugin('uglify'))
					.pipe(plugin('rename'), function(path) { path.basename += '.min'; })
					.pipe(gulp.dest, './build/minified')
		}
	},
	keys = Object.keys(list);

function plugin(name) {
	if (!(name in plugins))
		plugins[name] = require('gulp-' + name);

	return plugins[name];
}

keys.map(function(type) {
	gulp.task(type, function() {
		gulp.src(list[type].src).pipe(list[type].pipe());
	});
});

gulp.task('watch', function() {
	keys.map(function(type) {
		if (!list[type].skip)
			gulp.watch(list[type].src, [type]);
	});
});

gulp.task('default', ['watch'].concat(keys.filter(function(type) {
	return !list[type].skip;
})));
