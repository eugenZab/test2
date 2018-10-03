const {Given, Then, When} = require('cucumber');
const {expect, assert} = require('chai');
const page = require('./../../features/pages/login_page.js');


When(/^I should be able to open google page$/, async function () {
    return page.openPage("http://www.google.com");
});

Then(/^Page title should equal to: "([^"]*)"$/, async function (title) {
    let result = await page.getTitle();
    return expect(result).to.be.equal(title);
});
