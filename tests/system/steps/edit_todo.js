module.exports = function() {

    this.When(/^I type "([^"]*)" into the edit todo field$/, function (text, callback) {
        $('.taskedit').sendKeys(text);
        callback();
    });
};
