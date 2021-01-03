require("chromedriver");
const { Builder, By } = require("selenium-webdriver");
const SeleniumUtils = require('./util');

(async function example() {
    let $browser = await new Builder().forBrowser("chrome").build();
    try {
        await $browser.get('https://www.spicejet.com/');

        let selUtils = new SeleniumUtils($browser);

        await selUtils.waitForElementToLoadById('ctl00_mainContent_view_date1');

        let dateEle = await $browser.findElement(By.id('ctl00_mainContent_view_date1'));

        let dateVal = '30-03-2021';

        $browser.executeScript('arguments[0].value = arguments[1];', dateEle, dateVal);
    } finally {
        $browser.quit();
    }
})();