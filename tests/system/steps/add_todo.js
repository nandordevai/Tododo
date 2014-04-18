var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

module.exports = function() {

    this.When(/^I type "([^"]*)" into the new todo field$/, function (text, callback) {
        element(by.model('task')).sendKeys(text);
        callback();
    });

    this.When(/^I press enter$/, function (callback) {
        browser.actions().sendKeys(protractor.Key.ENTER).perform().then(callback);
    });

    this.Then(/^I should see a link with text "([^"]*)"$/, function (text, callback) {
        expect(element(by.linkText(text)).isPresent()).to.eventually.be.true.and.notify(callback);
    });

    this.Then(/^I should see due date "([^"]*)" in position \#(\d+)$/, function (due_date, position, callback) {
        var due_text = element(by.repeater('task in tasks').row(position-1)).$('.due_text');
        expect(due_text.getText()).to.eventually.contain(due_date).and.notify(callback);
    });
};
