var loader = require("../fixtures/loader");

var hooks = function() {

    this.Before(function(scenario, callback) {
        loader.loadFixture(getFixtureName(scenario.getTags()), callback);
    });

    getFixtureName = function(tags) {
        var fixture;
        tags.forEach(function(tag) {
            if (tag.getName().substring(1, 8) === "fixture") {
                fixture = tag.getName().split('_', 2)[1];
            }
        });
        return fixture;
    };
};

module.exports = hooks;
