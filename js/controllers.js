var tododoControllers = angular.module('tododoControllers', []);

tododoControllers.controller('TaskListCtrl', ['$scope', '$http', '$sce',
    function($scope, $http, $sce) {
        $scope.completed = false;
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
            $http.put('/tasks', { text: $scope.task }).success(function(data) {
                $scope.tasks.push(data.task);
                $scope.task = '';
            });
        };

        $scope.close = function(task) {
            $http.post('/tasks/' + task._id.$oid + '/close', { completed: task.completed });
        };

        $scope.updateText = function(task, event) {
            if (task.text === '') {
                return;
            }
            if (event === undefined || event.keyCode === 13) {
                task.editing = false;
                $http.post('/tasks/' + task._id.$oid + '/update', { text: task.text });
            }
        };

        $scope.startEditing = function(task) {
            task.editing = true;
        };

        $scope.taglinks = function(input) {
            var output = input;
            angular.forEach(input.match(/\#[\S]+/g), function(tag) {
                output = output.replace(tag, '<a href="#/tags/' + tag.substring(1) + '">' + tag.substring(1) + '</a>');
            });
            return $sce.trustAsHtml(output);
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
