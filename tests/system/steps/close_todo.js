module.exports = function() {

    this.When(/^I close todo "([^"]*)"$/, function (text, callback) {
        element(by.xpath('//input[@type="checkbox" and following-sibling::label[contains(., "' + text + '")]]')).click().then(callback);
    });

    this.When(/^I click on "([^"]*)"$/, function (text, callback) {
        element(by.xpath('//label[contains(., "' + text + '")]')).click().then(callback);
    });

};
