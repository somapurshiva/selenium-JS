require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");

const assert = require("assert");

(async function example() {
  let $browser = await new Builder().forBrowser("chrome").build();

  try {
    await $browser.get("https://ui.cogmento.com/");

    await $browser.manage().window().maximize();

    await $browser
      .findElement(By.name("email"))
      .sendKeys("pallavikundagol.b@gmail.com");

    await $browser.findElement(By.name("password")).sendKeys("Varada@100");

    await $browser
      .findElement(
        By.xpath('//div[@class="ui fluid large blue submit button"]')
      )
      .click();

    let currentUrl = await $browser.getCurrentUrl();

    console.log("Current URL::: ", currentUrl);
    assert.strictEqual(
      currentUrl,
      "https://ui.cogmento.com/",
      "URL didnt match"
    );
    let userIcon = await $browser.wait(
      until.elementLocated(By.xpath('//*[@id="main-nav"]/div[3]/a/i')),
      5000
    );

    console.log("User Icon::::: ", userIcon);

    const actions = $browser.actions({ bridge: true });
    console.log('Actions:::: ',actions);
    await actions.move({ origin: userIcon }).press().perform();

    // Right Click
    const rightClickAction = $browser.actions({ bridge: true });
    await rightClickAction.contextClick().perform();

    // Text in Search Bar
    const searchBarAction = $browser.actions({ bridge: true });
    let searchBarEle = await $browser.wait(
        until.elementLocated(By.xpath('//*[@id="top-header-menu"]/div[3]/div[1]/input')),
        5000
      );
    await searchBarAction.click(searchBarEle).sendKeys('Dumb Pallavi').perform();

    // Find elements
    let allMenuItems = await $browser.wait(
        until.elementsLocated(By.xpath('//*[@id="main-nav"]/div/a/i')),
        5000
    );
    console.log('All Menu Items:::: ', allMenuItems);
  } finally {
    // await $browser.quit();
  }
})();
