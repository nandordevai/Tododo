var moment = require("moment");
var chrono = require("chrono-node");

module.exports = {
    on: function(date) {
       return moment.utc(chrono.parse(date)[0].startDate).format();
    }
};
