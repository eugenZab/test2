let page = function () {

    this.openPage = (url) => {
        return browser.driver.get(url);
    };

    this.getTitle = () => {
        return browser.driver.getTitle();
    };

};

module.exports = new page();
