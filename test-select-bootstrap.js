require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");
const SeleniumUtils = require('./util');

(async function example() {
    let $browser = await new Builder().forBrowser("chrome").build();
    try {
        await $browser.get('http://seleniumpractise.blogspot.com/2016/08/bootstrap-dropdown-example-for-selenium.html');

        let selUtils = new SeleniumUtils($browser);

        selUtils.selectBootstrapDropDownOptionByText('.//*[@id="menu1"]', 'JavaScript');
    } finally {
        $browser.quit();
    }
})();
