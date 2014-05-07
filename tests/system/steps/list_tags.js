var assert = require('assert');

module.exports = function() {

    this.Then(/^I should see (\d+) tasks on the page$/, function (num, callback) {
        element.all(by.repeater('task in tasks')).then(function(tasks) {
            assert(tasks.length == num);
            callback();
        });
    });

    this.When(/^I click on link "([^"]*)"$/, function (text, callback) {
        element(by.linkText(text)).click().then(callback);
    });

};
