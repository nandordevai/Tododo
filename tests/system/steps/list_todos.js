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

    this.Then(/^I should see "([^"]*)" in position \#(\d+)$/, function (text, position, callback) {
        var task = element(by.repeater('task in tasks').row(position-1));
        expect(task.getText()).to.eventually.contain(text).and.notify(callback);
	});

	this.Then(/^I should not see "([^"]*)" in the list$/, function (text, callback) {
        var content = $('.container');
        expect(task.getText()).to.eventually.not.contain(text).and.notify(callback);
	});

};
