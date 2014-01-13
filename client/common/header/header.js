var header = angular.module('services.header', []);

header.service('header', function() {
	var self = this;
	self.isLoggedIn = false;
	self.user = null;

	self.getRouteBreadcrumb = function(routes, href) {
		var breadcrumb = "", found = false;
		angular.forEach(routes, function(config, route) {
			if (!found) {
				if (config.regexp !== undefined) {
					if (config.regexp.test(href)) {
						breadcrumb = config.breadcrumb;
						found = true;
					}
				}
			}
		});
		return breadcrumb;
	};

	self.getBackLink = function(pathElements) {
		var href = "/";
		if (pathElements.length > 1) {
			for (var i = 0; i < pathElements.length - 1; i++) {
				href = href + pathElements[i];
				if (i !== pathElements.length - 2) { 
					href = href + '/';
				}
			}
		}
		return href;
	};

	self.showLoggedIn = function(user) {
		self.isLoggedIn = true;
		self.user = user;
	};

	self.showLoggedOut = function() {
		self.isLoggedIn = false;
		self.user = null;
	};
});

header.directive('scHeader', ['$route', '$location', 'header', function($route, $location, header) {
	return {
		restrict: 'A',
		templateUrl: '/templates/header.tpl.html',
		link: function(scope, element, attrs) {
			scope.header = header;
			scope.$on('$routeChangeSuccess', function(event, current, previous) {
				var pathElements = $location.path().split('/'); // Split the location url
				pathElements.shift(); // Discard the first part of the path, representing the server address (i.e., www.mysdc3.com)

				if (pathElements[0] === "") {
					scope.navigation = { isLogo: true, button: null };
					return;
				}

				var backLink = header.getBackLink(pathElements);
				scope.navigation = { isLogo: false, button: { 
						icon: 'icon-chevron-sign-left',
						href: backLink,
						text: header.getRouteBreadcrumb($route.routes, backLink)
					}
				};
			});
		}
	};
}]);