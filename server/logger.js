var winston = require('winston')
	, fs = require('fs')
	, path = require('path');
	
var padRight = function(str, width, margin, padValue) {
	if (str.length > (width - margin)) {
		str = str.substring(0, (width - margin));
	}	
	while (str.length < width) {
		str = str + padValue;
	} 
	return str;
};
	
module.exports.initialize = function(app) {
	app.set('logger', new (winston.Logger)({
		transports: [
			new winston.transports.Console({ level: 'boot' })
		],
		levels: {
			boot: 0,		
			info: 1,
			warn: 2,
			error: 3,
		}
	}));
};

module.exports.startupItem = function(app, description, status) {
	var logger = app.get('logger');
	var prettyDescription = padRight(description, 50, 4, ' ');
		
	if (status) {
		logger.boot(prettyDescription, '[ OK ]');
	} else {
		logger.boot(prettyDescription, '[ FAILED ]');
	}
};

module.exports.startupMessage = function(app) {
	var pkgJson = require(path.join(app.get('APP_ROOT'), 'package.json'));	
	var logger = app.get('logger');
	logger.boot(padRight('', 65, 0, '-'));
	logger.boot(app.get('APP_NAME'));
	logger.boot('>> version: ' + pkgJson.version);
	logger.boot('>> mode: ' + app.get('env'));
	logger.boot(padRight('', 65, 0, '-'));
};

module.exports.readyMessage = function(app, port) {
	var logger = app.get('logger');
	logger.boot('');
	logger.boot('Server ready and listening on port ' + port + '...');
	logger.boot('Press Ctrl-C to exit...');
	console.log('');
};

module.exports.bootFailureMessage = function(app, err) {
	var logger = app.get('logger');
	logger.boot(err);
	console.log('');
};
