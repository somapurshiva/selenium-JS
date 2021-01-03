require("chromedriver");
const { Builder, By } = require("selenium-webdriver");
const httpPromise = require('./HttpCallPromise');
const SeleniumUtils = require('./util');

(async function example() {
    let $browser = await new Builder().forBrowser("chrome").build();
    try {
        await $browser.get('https://www.softwaretestingmaterial.com');

        $browser.manage().window().maximize();

        let selUtils = new SeleniumUtils($browser);

        await selUtils.waitForElementToLoad('//*[@id="post-7553"]/div/div/div/div/section[1]/div[2]/div[1]/div/div[4]/div/form/div/div[3]/button/span/span[2]');
        
        let allLinks = await $browser.findElements(By.css('a'));

        for (let i = 0; i < allLinks.length; i++) {
            let anchorLink = allLinks[i];
            let url = await anchorLink.getAttribute('href');
            if (url === null || url === undefined || url.startsWith('javascript:')) {
                continue;
            }
            let respBody = await httpPromise(url);

            if (respBody.statusCode >= 200 && respBody.statusCode <= 299) {
                console.log('URL: %s is accessible with Status Code = %d', url, respBody.statusCode);
            } else {
                console.error('URL: %s is not accessible with Status Code = %d', url, respBody.statusCode);
            }
        }
    } catch (err) {
        console.error('Encountered error:: ', err);
    } finally {
        $browser.quit();
    }
})();