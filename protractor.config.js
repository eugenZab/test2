const {createReportFolders, createReport} = require('./features/support/reporter.js');

exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    SELENIUM_PROMISE_MANAGER: false,

    onPrepare: () => {
        createReportFolders();
    },

    ignoreUncaughtExceptions: true,


    capabilities: {
        shardTestFiles: true,
        maxInstances: 3,
        'browserName': 'chrome',
        'chromeOptions': {
            args: ["--window-size=1280,1024"],
            prefs: {"profile.default_content_setting_values.notifications": 2}
        }
    },
    specs: [
        'features/001.login.feature'
    ],

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    cucumberOpts: {
        strict: false,
        require: [
            'features/step_definitions/*.js',
            'features/support/*.js'
        ],
        format: ['json:report/jsonReport/report.json']
    },

    onComplete: () => {
        createReport();
    }
};
