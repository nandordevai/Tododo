var tododoApp = angular.module('tododoApp', ['ngRoute', 'tododoControllers', 'tododoDirectives']);

tododoApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/active', {
				templateUrl: 'templates/active.html',
				controller: 'TaskListCtrl'
			}).
			when('/archived', {
				templateUrl: 'templates/archived.html',
				controller: 'ArchivedListCtrl'
			}).
			otherwise({
				redirectTo: '/active'
			});
	}
]);
