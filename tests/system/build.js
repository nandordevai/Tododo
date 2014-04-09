exports.config = {
    chromeOnly: true,
    chromeDriver: "/usr/local/bin/chromedriver",
    framework: "cucumber",
    specs: ["*.feature"],
    cucumberOpts: {
        format: "json",
        tags: ['~@pending']
    }
};
