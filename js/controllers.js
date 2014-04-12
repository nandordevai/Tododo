var tododoControllers = angular.module('tododoControllers', []);

tododoControllers.controller('TaskListCtrl', ['$scope', '$http',
	function($scope, $http) {
		$http.get('/tasks').success(function(data) {
			$scope.tasks = data.tasks;
		});

		$scope.addTask = function() {
			if ($scope.task === '') {
				return;
			}
			$http.put('/tasks', { task: $scope.task }).success(function(data) {
				$scope.tasks.push(data.task);
				$scope.task = '';
			});
		};
	}
]);

tododoControllers.controller('ArchivedListCtrl', ['$scope', '$http',
	function($scope, $http) {
		$http.get('/archived').success(function(data) {
			$scope.tasks = data.tasks;
		});
	}
]);
