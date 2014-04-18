var tododoApp = angular.module('tododoApp', ['ngRoute', 'tododoControllers', 'tododoDirectives']);

tododoApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/active', {
				templateUrl: 'templates/active.html',
				controller: 'TaskListCtrl'
			}).
			when('/closed', {
				templateUrl: 'templates/closed.html',
				controller: 'ClosedListCtrl'
			}).
			when('/tags/:tag', {
				templateUrl: 'templates/tags.html',
				controller: 'TagListCtrl'
			}).
			otherwise({
				redirectTo: '/active'
			});
	}
]);
