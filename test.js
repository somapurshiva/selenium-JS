require('chromedriver');
let $driver = require('selenium-webdriver');
let $browser = new $driver.Builder()
  .withCapabilities($driver.Capabilities.chrome())
  .build();

let assert = require("assert");
let Key = $driver.Key;
let By = $driver.By;
let Until = $driver.until;
let emailId;
let actionSeq, userIcon;

$browser
  .get("https://ui.cogmento.com/")
  .then(function () {
    return $browser.manage().window().maximize();
  })
  .then(function (test) {
    // Check the H1 title matches "Example Domain"
    return $browser.findElement(By.name('email')).sendKeys('pallavikundagol.b@gmail.com');
  })
  .then(function () {
    return $browser.findElement(By.name('password')).sendKeys('Varada@100');
  })
  .then(function (text) {
    return $browser.findElement(By.xpath('//div[@class="ui fluid large blue submit button"]')).click();
  })
  .then(function () {
    return $browser.getCurrentUrl();
  })
  .then(function (currentUrl) {
    console.log('Current URL::: ', currentUrl);
    assert.strictEqual(currentUrl, 'https://ui.cogmento.com/', 'URL didnt match');
    return $browser.wait(Until.elementLocated(By.xpath('//*[@id="main-nav"]/div[3]/a/i')), 5000);
  })
  .then(function (userIcon) {
    console.log('User Icon::::: ', userIcon);
    return $browser.actions().mouseMove(userIcon).press();
  })
  .then(function (actionSeq) {
    console.log('ActionSeq:::: ', actionSeq);
    actionSeq.perform();
  });
  