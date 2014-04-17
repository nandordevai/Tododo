var tododoControllers = angular.module('tododoControllers', []);

tododoControllers.controller('TaskListCtrl', ['$scope', '$http',
	function($scope, $http) {
		$scope.completed = false;
		$scope.editedText = undefined;
		$http.get('/tasks').success(function(data) {
			$scope.tasks = [];
			data.tasks.forEach(function(task) {
				task.completed = false;
				$scope.tasks.push(task);
			});
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

		$scope.close = function(task) {
			$http.post('/tasks/' + task._id.$oid + '/close', { completed: task.completed });
		};

		$scope.updateText = function(task, event) {
			if (event === undefined || event.keyCode === 13) {
				task.editing = false;
				$http.post('/tasks/' + task._id.$oid + '/update', { text: task.text });
				$scope.editedText = undefined;
			}
		};

		$scope.startEditing = function(task) {
			task.editing = true;
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
