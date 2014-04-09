var tododoApp = angular.module('tododoApp', []);

tododoApp.controller('TaskCtrl', function($scope) {
	$scope.tasks = [];
});
