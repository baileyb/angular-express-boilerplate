var express = require('express')
	, logger = require('./logger')
	, passport = require('passport')
  , path = require('path');
//  , security = require('./security');

// Initialize the express application
var app = express(); // TODO: Switch to an https server

// Set a few environment variables on the app for use in other libraries
app.set('APP_ROOT', path.join(__dirname, '..'));
app.set('APP_NAME', require('../package.json').description);

// Load the logging library and start logging
logger.initialize(app);

// Log the startup message
logger.startupMessage(app);

// Setup static routing
logger.startupItem(app, 'Setting up static routing...', true);
app.use(express.favicon(path.join(app.get('APP_ROOT'), 'public', 'images', 'favicon.ico')));
app.use('/static', express.static(path.join(app.get('APP_ROOT'), 'public')));
app.use('/static', function(req, res, next) {
	res.send(404);
});

logger.startupItem(app, 'Setting up template routing...', true);
app.use('/templates', express.static(path.join(app.get('APP_ROOT'), 'public', 'templates')));
app.use('/templates', function(req, res, next) {
	res.send(404);
});

logger.startupItem(app, 'Setting up vendor routing...', true);
app.use('/vendor', express.static(path.join(app.get('APP_ROOT'), 'public', 'vendor')));
app.use('/vendor', function(req, res, next) {
	res.send(404);
});

// Setup security
//security.initialize();
//security.setupRouting(app);

// Setup the server's basic middleware
logger.startupItem(app, 'Configuring express/connect middleware...', true );
app.use(express.logger());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser('[COOKIE-SECRET]'));
app.use(express.cookieSession());
app.use(passport.initialize());
app.use(passport.session());

// Setup session routing
//app.post('/login', security.login);
//app.post('/logout', security.logout);
//app.get('/current-user', security.getCurrentUser);

// Setup application routes
logger.startupItem(app, 'Enabling AngularJS HTML5 routing mode..', true);
app.all('/*', function(req, res, next) {
	res.sendfile('index.html', { root: path.join(app.get('APP_ROOT'), 'public', 'views') });
});

// Default error handlers - returns 500 Server Error with more info if we're in 
// development mode
logger.startupItem(app, 'Setting up error handling...', true);
app.configure('development', function() {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

// Start the express server and begin listening for requests
try {
	var port = (process.env.PORT || 3000);
	app.listen(port);
	logger.startupItem(app, 'Starting server...', true);
	logger.readyMessage(app, port);
} catch(e) {
	logger.startupItem(app, 'Starting server...', false);
	logger.bootFailureMessage(app, e.message);
	process.exit(1);
}



