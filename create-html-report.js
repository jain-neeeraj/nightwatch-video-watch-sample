var reporter = require('cucumber-html-reporter');
const {client} = require('nightwatch-cucumber');
const {defineSupportCode} = require('cucumber');
var options = {
        theme: 'bootstrap',
        jsonFile: 'reports/cucumber.json',
        output: 'reports/cucumber_report.html',
        screenshotsDirectory: 'screenshots/',
        storeScreenshots: true,
        reportSuiteAsScenarios: true,
        launchReport: true,
        brandTitle: "Test Video",
        metadata: {
            "Browser": "Chrome",
        }
    };

    reporter.generate(options);