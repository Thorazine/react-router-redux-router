'use strict';
/* jshint node: true */

var PLUGIN_NAME = 'gulp-templateCache',

	through = require('through'),
	htmlMin = require('html-minifier').minify,
	path = require('path'),
	gutil = require('gulp-util'),
	PluginError = gutil.PluginError,
	File = gutil.File,

	reQuote = /'/g,
	escapedQuote = '\\\'',
	reNewLine = /\r?\n/g,
	escapedNewLine = '\\n\' +\n    \'';

function escapeHtmlContent(content) {
	return content.replace(reQuote, escapedQuote).replace(reNewLine, escapedNewLine);
}

function escapeTags(content) {
	return content.replace(/</mg, '&lt;').replace(/>/mg, '&gt;');
}

function angularModuleTemplate(moduleName, templateCode, options) {
	var output = 'angular.module(';

	if (options.singleQuotes) {
		output += "'" + moduleName + "'";
	} else {
		output += '"' + moduleName + '"';
	}

	return output + ').run([\'$templateCache\', function(a) { ' + templateCode + ' }]);';
}

function transformTemplates(templates, strip, prepend, minify) {
	var cacheOutput = '',
		i = templates.length;

	while (i--) {
		cacheOutput += transformTemplateEntry(templates[i], strip, prepend, minify);
	}

	return cacheOutput;
}

function transformTemplateEntry(entry, strip, prepend, minify) {
	var path = entry.path,
		content = entry.content,
		parseError;

	if (strip) {
		path = path.split(strip);
		path.shift();
		path = path.join(strip).replace(/\\/g, '/');
	}

	if (prepend) {
		path = prepend + path;
	}

	if (minify !== false) {
		try {
			content = htmlMin(content, minify);
		} catch (e) {
			parseError = String(e);

			content = '<h1>Invalid template: ' + entry.path + '</h1>' +
				'<pre>' + escapeTags(parseError) + '</pre>';
		}
	}

	content = escapeHtmlContent(content);

	return 'a.put(\'' + path + '\', \'' + content + '\');\n\t';
}

module.exports = function(options) {
	options = options || {};

	var fileName = options.output,
		moduleName = options.moduleName,
		strip = options.strip || false,
		prepend = options.prepend || false,
		minify = options.minify || false,
		templates = [],
		firstFile = null;

	if (!fileName) {
		throw new PluginError(PLUGIN_NAME, PLUGIN_NAME + ': Missing output parameter');
	}

	if (!moduleName) {
		throw new PluginError(PLUGIN_NAME, PLUGIN_NAME + ': Missing moduleName parameter');
	}

	if (minify === true) {
		minify = {};
	}

	function processFile(file) {
		if (file.isNull()) {
			return this.queue(file);
		}

		if (file.isStream()) {
			return this.emit('error', new PluginError(PLUGIN_NAME, PLUGIN_NAME + ': Streaming not supported'));
		}

		if (!firstFile) {
			firstFile = file;
		}

		templates.push({
			path: file.path,
			content: file.contents.toString('utf8')
		});
	}

	function endStream() {
		if (templates.length === 0) {
			return this.emit('end');
		}

		var joinedContents = transformTemplates(templates, strip, prepend, minify),
			joinedPath = path.join(firstFile.base, fileName),

			joinedFile = new File({
				cwd: firstFile.cwd,
				base: firstFile.base,
				path: joinedPath,
				contents: new Buffer(angularModuleTemplate(moduleName, joinedContents, options))
			});

		this.emit('data', joinedFile);
		this.emit('end');
	}

	return through(processFile, endStream);
};