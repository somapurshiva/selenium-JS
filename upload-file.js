require("chromedriver");
const { Builder, By } = require("selenium-webdriver");
const SeleniumUtils = require('./util');

(async function example() {
    let $browser = await new Builder().forBrowser("chrome").build();
    try {
        await $browser.get('http://softwaretestingplace.blogspot.com/2015/10/sample-web-page-to-test.html');

        $browser.manage().window().maximize();

        let browseEle = await $browser.findElement(By.id('uploadfile'));

        browseEle.sendKeys('/Users/ssomapur/Desktop/Holiday\ Calendar.png');
    } finally {
        $browser.quit();
    }
})();