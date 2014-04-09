var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

module.exports = function() {

    this.Given(/^I am on the active todo page$/, function (callback) {
        var url = 'http://localhost:5000/';
        browser.get(url);
        callback();
    });

    this.Then(/^I should see "([^"]*)" on the page$/, function (text, callback) {
        var content = $('.container');
        expect(content.getText()).to.eventually.contain(text).and.notify(callback);
    });
};
