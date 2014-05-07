var assert = require('assert');

module.exports = function() {

    this.When(/^I type "([^"]*)" into the new todo field$/, function (text, callback) {
        element(by.model('task')).sendKeys(text);
        callback();
    });

    this.When(/^I press enter$/, function (callback) {
        browser.actions().sendKeys(protractor.Key.ENTER).perform().then(callback);
    });

    this.Then(/^I should see a link with text "([^"]*)"$/, function (text, callback) {
        element(by.linkText(text)).then(function(el) {
            assert(el.isPresent());
            callback();
        });
    });

    this.Then(/^I should see a due date in position \#(\d+)$/, function (position, callback) {
        var el = element(by.repeater('task in tasks').row(position-1)).$('.due_on');
        assert(el.isDisplayed());
        callback();
    });

    this.Then(/^I should not see a due date in position \#(\d+)$/, function (position, callback) {
        var el = element(by.repeater('task in tasks').row(position-1)).$('.due_on');
        assert(el.isDisplayed());
        callback();
    });
};
