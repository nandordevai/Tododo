var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

module.exports = function() {

    this.When(/^I type "([^"]*)" into the edit todo field$/, function (text, callback) {
        
        callback.pending();
    });
};
