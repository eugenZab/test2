const {After, Before, BeforeAll, AfterAll, setDefaultTimeout, Status} = require("cucumber");
// add a before all feature hook
BeforeAll(async function () {
    await setDefaultTimeout(60 * 1000);
});
// add before scenario hook
Before(async function (scenario) {
    //Write here what you want to do before each scenario
    await browser.driver.manage().window().maximize();
    await browser.driver.manage().deleteAllCookies();
});

After(async function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        // screenShot is a base-64 encoded PNG
        const screenShot = await browser.driver.takeScreenshot();
        return this.attach(screenShot, 'image/png');
    }
});

AfterAll(async function () {
    await browser.driver.quit();
});
