var tododoDirectives = angular.module('tododoDirectives', []);

tododoDirectives.directive('tdFocus', function($timeout) {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(attrs.tdFocus, function(value) {
                if (attrs.tdFocus) {
                    window.setTimeout(function() {
                        element[0].focus();
                    }, 10);
                }
            }, true);
        }
    };
});

tododoDirectives.directive('tdActive', ['$location', function(location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var path = attrs.href.substring(1);
            scope.location = location;
            scope.$watch('location.path()', function(newPath) {
                if (path === newPath) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });
        }
    };
}]);
