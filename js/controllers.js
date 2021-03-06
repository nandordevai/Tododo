var tododoControllers = angular.module('tododoControllers', []);

tododoControllers.controller('TaskListCtrl', ['$scope', '$http', '$sce',
    function($scope, $http, $sce) {
        $scope.completed = false;
        $http.get('/tasks').success(function(data) {
            $scope.tasks = [];
            data.tasks.forEach(function(task) {
                task.completed = false;
                task.originalText = task.text;
                $scope.tasks.push(task);
            });
        });

        $scope.addTask = function() {
            if ($scope.task === '') {
                return;
            }
            $http.put('/tasks', { text: $scope.task }).success(function(data) {
                $scope.tasks.push(data.task);
                $scope.task = '';
            });
        };

        $scope.close = function(task) {
            $http.post('/tasks/' + task._id.$oid + '/close', { completed: task.completed });
        };

        $scope.updateTask = function(task, event) {
            if (task.text === '') {
                return;
            }
            if (event === undefined || event.keyCode === 13) {
                task.editing = false;
                if (task.text === task.originalText) {
                    return;
                }
                $http.post('/tasks/' + task._id.$oid, { text: task.text }).success(function(data) {
                    task.originalText = task.text;
                    task.due_on = data.task.due_on;
                });
            }
        };

        $scope.startEditing = function(task) {
            task.editing = true;
        };

        $scope.taglinks = function(input) {
            var output = input;
            angular.forEach(input.match(/\B\#[\S]+/g), function(tag) {
                console.log(tag);
                output = output.replace(tag, '<a href="#/tags/' + tag.substring(1) + '">' + tag.substring(1) + '</a>');
            });
            return $sce.trustAsHtml(output);
        };
    }
]);

tododoControllers.controller('ClosedListCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/closed').success(function(data) {
            $scope.tasks = data.tasks;
        });
    }
]);

tododoControllers.controller('TagListCtrl', ['$scope', '$http', '$routeParams', '$controller',
    function($scope, $http, $routeParams, $controller) {
        $controller('TaskListCtrl', {$scope: $scope});
        $http.get('/tags/' + $routeParams.tag).success(function(data) {
            $scope.tasks = data.tasks;
        });
    }
]);
