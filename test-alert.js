require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");
const SeleniumUtils = require('./util');

(async function example() {
    let $browser = await new Builder().forBrowser("chrome").build();
    try {
        await $browser.get('http://demo.guru99.com/test/delete_customer.php');

        let selUtils = new SeleniumUtils($browser);

        await $browser.findElement(By.name('cusid')).sendKeys('12345');
        await $browser.findElement(By.name('submit')).click();

        let alert = selUtils.switchToAlert();

        console.log('Alert Message::: ', (await alert.getText()));

        await alert.accept();

        alert = selUtils.switchToAlert();

        await alert.accept();

        await selUtils.waitForElementToLoadByName('cusid');

        await $browser.findElement(By.name('cusid')).sendKeys('12345');
        await $browser.findElement(By.name('submit')).click();

        alert = selUtils.switchToAlert();

        await alert.dismiss();
    } finally {
        $browser.quit();
    }
})();
