require("chromedriver");
const { Builder, By } = require("selenium-webdriver");
const SeleniumUtils = require("./util");

(async function example() {
  let $browser = await new Builder().forBrowser("chrome").build();
  try {
    await $browser.get("http://demo.guru99.com/popup.php");

    let selUtils = new SeleniumUtils($browser);

    await $browser.manage().window().maximize();

    await $browser
      .findElement(By.xpath('//a[contains(text(),"Click Here")]'))
      .click();

    let parentWindow = await $browser.getWindowHandle();

    let allWindows = await $browser.getAllWindowHandles();

    for (let i = 0; i < allWindows.length; i++) {
      let win = allWindows[i];
      if (parentWindow !== win) {
        await selUtils.switchToWindow(win);
        await $browser.findElement(By.name("emailid")).click();
        await $browser
          .findElement(By.name("emailid"))
          .sendKeys("gaurav.3n@gmail.com");
        await $browser.findElement(By.name("btnLogin")).click();
      }
    }

    await selUtils.switchToWindow(parentWindow);
  } finally {
    $browser.quit();
  }
})();
