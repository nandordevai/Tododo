var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

module.exports = function() {

    this.When(/^I close todo "([^"]*)"$/, function (text, callback) {
        element(by.xpath('//input[@type="checkbox" and following-sibling::label[contains(., "' + text + '")]]')).click().then(callback);
    });

    this.When(/^I click on "([^"]*)"$/, function (text, callback) {
        element(by.xpath('//*[contains(text(), "' + text + '")]')).click().then(callback);
    });

};