var tododoApp = angular.module('tododoApp', ['ngRoute', 'tododoControllers']);

tododoApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/active', {
				templateUrl: 'templates/tasklist.html',
				controller: 'TaskListCtrl'
			}).
			when('/archived', {
				templateUrl: 'templates/tasklist.html',
				controller: 'ArchivedListCtrl'
			}).
			otherwise({
				redirectTo: '/active'
			});
	}
]);
