require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");
const SeleniumUtils = require('./util');

(async function example() {
    let $browser = await new Builder().forBrowser("chrome").build();
    try {
        await $browser.get('http://demo.guru99.com/test/guru99home/');

        let selUtils = new SeleniumUtils($browser);

        await selUtils.switchToIFrame('//iframe[@id="a077aa5e"]');

        // selUtils.waitForElementToLoad('/html/body/a');
        $browser.findElement(By.xpath('/html/body/a'))
            .then(anchor => {
                anchor.isDisplayed()
                    .then(disp => console.log('Anchor tag is displayed ? ', disp));
            });
    } finally {
        $browser.quit();
    }
})();
