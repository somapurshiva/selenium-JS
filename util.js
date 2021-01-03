const { until, By } = require("selenium-webdriver");
const WAIT_TIME_IN_MS = 5000;

class SeleniumUtils {
  constructor($browser) {
    this.$browser = $browser;
  }

  clickWebElement = function (xpath) {
    return this.$browser.findElement(By.xpath(xpath)).click();
  };

  moveToWebElement = function (xpath) {
    return this.$browser
      .wait(until.elementLocated(By.xpath(xpath)), WAIT_TIME_IN_MS)
      .then((webElement) => {
        return this._getBrowserAction().move({ origin: webElement }).perform();
      });
  };

  pressMouseBtn = function (btn) {
    return this._getBrowserAction().press(btn).perform();
  };

  clickMouseBtn = function (opt_elementOrButton, opt_button) {
    return this._getBrowserAction()
      .click(opt_elementOrButton, opt_button)
      .perform();
  };

  waitForElementToLoad = function (xpath) {
    return this.$browser.wait(
      until.elementLocated(By.xpath(xpath)),
      WAIT_TIME_IN_MS
    );
  };

  waitForElementToLoadByName = function (name) {
    return this.$browser.wait(
      until.elementLocated(By.name(name)),
      WAIT_TIME_IN_MS
    );
  };

  _getBrowserAction = function () {
    //   return this.$browser.getSession()
    // .then(session => {
    // let bridge, session = await this.$browser.getSession();
    // if (session.getCapability('browserName') === 'chrome') {
    //   bridge = { bridge: true };
    // }
    // return this.$browser.actions(bridge);
    // });
    return this.$browser.actions({ bridge: true });
  };

  setSelectOptionByIndex = function (selectDropDownXPath, optionIdx) {
    this.$browser
      .findElement(By.xpath(`${selectDropDownXPath}/option[${optionIdx}]`))
      .click();
  };

  setSelectOptionByVisibleText = function (
    selectDropDownXPath,
    optionVisibleText
  ) {
    this.$browser
      .findElement(
        By.xpath(
          `${selectDropDownXPath}/option[normalize-space(text()) = "${optionVisibleText}"]`
        )
      )
      .click();
  };

  getAllSelectOptions = function (selectDropDownXPath) {
    return this.$browser.findElements(
      By.xpath(`${selectDropDownXPath}/option`)
    );
  };

  selectBootstrapDropDownOptionByText = function (dropdownXPath, text) {
    this.clickWebElement(dropdownXPath).then(() => {
      this.moveToWebElement(
        `//ul[@class='dropdown-menu']//li/a[normalize-space(text()) = '${text}']`
      ).then(() => {
        this.clickMouseBtn();
      });
    });
  };

  switchToIFrame = function (xpath) {
    this.waitForElementToLoad(xpath);
    return this.$browser.findElement(By.xpath(xpath)).then((iFrameEle) => {
      return this.$browser.switchTo().frame(iFrameEle);
    });
  };

  switchToAlert = function () {
    return this.$browser.switchTo().alert();
  };

  switchToWindow = function (name) {
    return this.$browser.switchTo().window(name);
  };
}

module.exports = SeleniumUtils;
