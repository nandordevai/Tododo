var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

module.exports = function() {

    this.Then(/^I should see (\d+) tasks on the page$/, function (num, callback) {
        expect(element.all(by.repeater('task in tasks'))).to.eventually.have.length(num).and.notify(callback);
    });

    this.When(/^I click on link "([^"]*)"$/, function (text, callback) {
        element(by.linkText(text)).click().then(callback);
    });

};
