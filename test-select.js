require("chromedriver");
const { Builder } = require("selenium-webdriver");
const SeleniumUtils = require('./util');

(async function example() {
    let $browser = await new Builder().forBrowser("chrome").build();
    try {
        await $browser.get('http://localhost:8080/html-select.html');

        let selUtils = new SeleniumUtils($browser);

        // Print All Select Options
        let optionsArr = await selUtils.getAllSelectOptions('//*[@id="select"]');

        for (let i = 0; i < optionsArr.length; i++) {
            console.log((await optionsArr[i].getText()));
        }

        selUtils.setSelectOptionByIndex('//*[@id="select"]', 4);

        selUtils.setSelectOptionByVisibleText('//*[@id="select"]', 'Six');
    } finally {
        // $browser.quit();
    }
})();