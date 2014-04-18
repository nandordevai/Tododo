var tododoFilters = angular.module('tododoFilters', []);

tododoFilters.filter('taglinks', function() {
    return function(input) {
        output = input;
        angular.forEach(input.match(/\#[\w]+/g), function(tag) {
            output = output.replace(tag, '<b>' + tag.substring(1) + '</b>');
        });
        return output;
    };
});
