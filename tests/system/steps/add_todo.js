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
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        callback();
    });
};
