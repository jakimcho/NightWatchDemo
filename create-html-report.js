var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber.json',
    output: 'reports/index.html',
    reportSuiteAsScenarios: true,
    launchReport: false
};

reporter.generate(options);
