var auth = angular.module('services.auth', [
	'services.header'
]);

auth.service('Auth', ['$http', 'header', function($http, header) {
	function buildRoles(roles) {
		var bitMask = "01";
		var userRoles = {};

		for (var i = 0; i < roles.length; i++) {
			var intCode = parseInt(bitMask, 2);
			userRoles[roles[i]] = {
				bitMask: intCode, title: roles[i]
			};
			bitMask = (intCode << 1).toString(2);
		}
		return userRoles;
	}

	function buildAccessLevels(levels, userRoles) {
		var accessLevels = {};
		angular.forEach(levels, function(roles, level) {
			var resultMask;
			if (roles === '*') {
				resultMask = '';
				angular.forEach(userRoles, function(role, key) {
					resultMask += '1';
				});

				accessLevels[level] = { 
					bitMask: parseInt(resultMask, 2), 
					title: roles 
				};
			} else {
				resultMask = '0';
				angular.forEach(roles, function(role, key) {
					if (userRoles.hasOwnProperty(role)) {
						resultMask = resultMask | userRoles[role].bitMask;
					}
				});

				accessLevels[level] = {
					bitMask: resultMask,
					title: roles
				};
			}
		});
		return accessLevels;
	}

	function switchUser(user) {
		angular.extend(currentUser, user);
		if (currentUser.name === '') {
			header.showLoggedOut();
		} else {
			header.showLoggedIn(currentUser);
		}
	}

	var userRoles = buildRoles([
		'public', 
		'user', 
		'admin'
	]);
	
	var accessLevels = buildAccessLevels({
		'public': '*',
		'user': ['admin', 'user'],
		'admin': ['admin'],
	}, userRoles);
	
	var currentUser = { 
		name: '', 
		role: userRoles.public
	};

	return {
		accessLevels: accessLevels,
		userRoles: userRoles,
		user: currentUser,

		authorize: function(accessLevel, role) {
			if (role === undefined) {
				role = currentUser.role;
			}
			return (accessLevel.bitMask & role.bitMask);
		},

		isLoggedIn: function(user) {
			if (user === undefined) {
				user = currentUser;
			}
			return ((user.role.title === userRoles.user.title) || (user.role.title === userRoles.admin.title));
		},

		login: function(user, success, error) {
			switchUser(user);
		},

		logout: function(success, error) {
			switchUser({ name: '', role: userRoles.public });
		}
	};
}]);