var appLauncher = angular.module('app.launchpad', [
	'services.auth'
]);

appLauncher.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/',
	{
		templateUrl: '/templates/launchpad.tpl.html',
		controller: 'LaunchpadCtrl',
		breadcrumb: 'Home'
	});
}]);

appLauncher.controller('LaunchpadCtrl', ['$scope', '$route', 'Auth', function($scope, $route, Auth) {
		$scope.login = function() {
			Auth.login({name: 'Brian Bailey', role: Auth.userRoles.admin });
		};

		$scope.logout = function() {
			Auth.logout();
		};

		$scope.groups = [
		{ 
			category: 'Group 1 Apps',
			apps: [
				{ name: 'App 1', url: '/app1', icon: 'icon-user' },
				{ name: 'App 2', url: '/app2', icon: 'icon-file' },
				{ name: 'App 3', url: '/app3', icon: 'icon-check-sign' },
				{ name: 'App 4', url: '/app4', icon: 'icon-edit' },
				{ name: 'App 5', url: '/app5', icon: 'icon-tasks' },
				{ name: 'App 6', url: '/app6', icon: 'icon-cogs' },
			]
		},
		{
			category: 'Group 2 Apps',
			apps: [
				{ name: 'App 7', url: '/app7', icon: 'icon-user' },
				{ name: 'App 8', url: '/app8', icon: 'icon-hospital' },
				{ name: 'App 9', url: '/app9', icon: 'icon-wrench' },
				{ name: 'App 10', url: '/app10', icon: 'icon-bar-chart' },
				{ name: 'App 11', url: '/app11', icon: 'icon-dashboard' },
			]
		}
	];
}]);