const Reporter = function () {

    this.createReportFolders = async function () {
        // Creating the directory for the reports
        const fs = require('fs');

        const d = new Date();
        const date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        const rmDir = async function (dirPath, removeSelf) {
            if (removeSelf === undefined)
                removeSelf = true;
            try {
                var files = await fs.readdirSync(dirPath);
            }
            catch (e) {
                return e;
            }
            if (files.length > 0)
                for (let i = 0; i < files.length; i++) {
                    let filePath = dirPath + '/' + files[i];
                    if (fs.statSync(filePath).isFile())
                        await fs.unlinkSync(filePath);
                    else
                        await rmDir(filePath);
                }
            if (removeSelf)
                await fs.rmdirSync(dirPath);
        };

        if (!fs.existsSync('report')) {
            await fs.mkdirSync('report')
        }
        if (!fs.existsSync('report/htmlReport')) {
            await fs.mkdirSync('report/htmlReport')
        }
        if (!fs.existsSync('report/jsonReport')) {
            await fs.mkdirSync('report/jsonReport')
        }
        if (!fs.existsSync('report/htmlReport/' + date)) {
            await fs.mkdirSync('report/htmlReport/' + date)
        }
        //clean up old reports
        await rmDir('./report/jsonReport', false);
    };


    this.createReport = async function () {
        const d = new Date();
        const date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
        // Report generation code
        const createHtmlReport = async function () {
            const report = require('multiple-cucumber-html-reporter');
            report.generate({
                jsonDir: './report/jsonReport',
                reportPath: './report/htmlReport/' + date,
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
            await createHtmlReport();
        }
        catch (error) {
            console.log("Error in generating reports ", error);
        }
    }

};

module.exports = new Reporter();

