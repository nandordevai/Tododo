var assert = require('assert');

String.prototype.contains = function(str) {
    return this.indexOf(str) !== -1;
};

module.exports = function() {

    this.Given(/^I am on the active todo page$/, function (callback) {
        var url = 'http://localhost:5000/';
        browser.get(url).then(function() {
            callback();
        });
    });

    this.Then(/^I should see "([^"]*)" on the page$/, function (text, callback) {
        $('.container').getText().then(function(content) {
            assert(content.contains(text));
            callback();
        });
    });

    this.Then(/^I should see "([^"]*)" in position \#(\d+)$/, function (text, position, callback) {
        element(by.repeater('task in tasks').row(position-1)).getText().then(function(task) {
            assert(task.contains(text));
            callback();
        });
	});

	this.Then(/^I should not see "([^"]*)" in the list$/, function (text, callback) {
        $('.container').getText().then(function(content) {
            assert(!content.contains(text));
            callback();
        });
	});

};
