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
