var tododoControllers = angular.module('tododoControllers', []);

tododoControllers.controller('TaskListCtrl', ['$scope', '$http',
	function($scope, $http) {
		$http.get('/tasks').success(function(data) {
			$scope.tasks = data.tasks;
		});
	}
]);

tododoControllers.controller('ArchivedListCtrl', ['$scope', '$http',
	function($scope, $http) {
		$http.get('/archived').success(function(data) {
			$scope.tasks = data.tasks;
		});
	}
]);
