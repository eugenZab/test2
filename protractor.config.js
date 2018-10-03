exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    SELENIUM_PROMISE_MANAGER: false,

    //BeforeLaunch will create report directories if not exist
    // or if exist will clean up old reports
    beforeLaunch: function () {
        // Creating the directory for the reports
        const fs = require('fs');

        var d = new Date();
        var date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        var rmDir = function (dirPath, removeSelf) {
            if (removeSelf === undefined)
                removeSelf = true;
            try {
                var files = fs.readdirSync(dirPath);
            }
            catch (e) {
                return;
            }
            if (files.length > 0)
                for (var i = 0; i < files.length; i++) {
                    var filePath = dirPath + '/' + files[i];
                    if (fs.statSync(filePath).isFile())
                        fs.unlinkSync(filePath);
                    else
                        rmDir(filePath);
                }
            if (removeSelf)
                fs.rmdirSync(dirPath);
        };

        if (!fs.existsSync('reportFinal')) {
            fs.mkdirSync('reportFinal')
        }
        if (!fs.existsSync('reportFinal/' + date)) {
            fs.mkdirSync('reportFinal/' + date)
        }
        if (!fs.existsSync('report')) {
            fs.mkdirSync('report')
        }
        //clean up old reports
        rmDir('./report', false);
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
        format: ['json:report/report.json']
    },

    //Report will be generated onComplete action
    onComplete: function () {
        var d = new Date();
        var date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
        // Report generation code
        var createHtmlReport = function () {
            const report = require('multiple-cucumber-html-reporter');
            report.generate({
                jsonDir: './report',
                reportPath: './reportFinal/' + date,
                displayDuration: true,
                pageTitle: 'BB Hub Automation test run',
                reportName: date + ' BBHub Automation test run',
                metadata: {
                    browser: {
                        name: 'Chrome',
                        version: '2.40'
                    },
                    device: 'Local',
                    platform: {
                        name: 'Windows',
                        version: '10 Home'
                    }
                }
            });
        };
        try {
            createHtmlReport();
        }
        catch (error) {
            console.log("Error in generating reports ", error);
        }
        console.log("Tests completed");
    }
};
