require("chromedriver");
const { Builder, By } = require("selenium-webdriver");
const SeleniumUtils = require('./util');


(async function example() {
    let $browser = await new Builder().forBrowser("chrome").build();

    console.log('Capabilities=== ', (await $browser.getSession()).getCapability('browserName'));

    try {
      await $browser.get("https://ui.cogmento.com/");

      await $browser.manage().window().maximize();

      await $browser
        .findElement(By.name("email"))
        .sendKeys("pallavikundagol.b@gmail.com");

      await $browser.findElement(By.name("password")).sendKeys("Varada@100");

      let selUtils = new SeleniumUtils($browser);

      await selUtils.clickWebElement('//div[@class="ui fluid large blue submit button"]');

      await selUtils.waitForElementToLoad('//*[@id="top-header-menu"]/div[2]/span[1]')

      await selUtils.moveToWebElement('//*[@id="main-nav"]/div[12]/a');

      await selUtils.clickMouseBtn();

      await selUtils.clickWebElement('//*[@id="dashboard-toolbar"]/div[2]/div/a/button');

      await selUtils.clickWebElement('//*[@id="dashboard-toolbar"]/div[2]/div/button[1]');
    } finally {
      await $browser.quit();
    }
})();
