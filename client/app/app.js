var app = angular.module('app', [
	'ngRoute',
	'app.authentication',
	'app.launchpad',
]);

// Main App Configuration - enables HTML5 and redirects to Launchpad
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.otherwise({redirectTo: '/'});
}]);

// Main App Controller - handles global errors
app.controller('AppCtrl', ['$scope', function($scope) {
	$scope.$on('$routeChangeStart', function(event, next, current) {
	});

	$scope.$on('$routeChangeError', function(event, current, previous, rejection) {

	});
}]);