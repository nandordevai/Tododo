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
};
