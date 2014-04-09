module.exports = function() {

    this.Given(/^I am on the active todo page$/, function (callback) {
        var url = 'http://localhost:5000/';
        browser.get(url);
        callback();
    });

    this.Then(/^I should see "$text" on the page$/, function (text, callback) {
      // express the regexp above with the code you wish you had
      callback.pending();
    });
};
