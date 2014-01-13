var auth = angular.module('app.authentication', [
	'services.header'
]);

auth.config(['$routeProvider', function($routeProvider) {	
	$routeProvider
		.when('/login', { templateUrl: '/templates/login.tpl.html', controller: 'LoginCtrl', breadcrumb: 'Login' });
}]);

auth.controller('LoginCtrl', ['$scope', function($scope) {
}]);