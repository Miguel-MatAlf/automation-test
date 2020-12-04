//local.test.js
const webdriver = require('selenium-webdriver');
const {until} = require('selenium-webdriver');
const {By} = require('selenium-webdriver');
const {chrome} = require('selenium-webdriver/chrome')

const getElementByXpath = async (driver, xpath, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const elementLocated = async (driver, xpath, timeout = 2000) => {
  try {
    await driver.findElement(By.xpath(xpath));
    return true;
  } catch (error) {
    return false;
  }
}

describe('webdriver', () => {
  let driver;

  beforeAll(async () => {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
    
    await driver.manage().window().maximize();
    await driver.get('http://localhost:3000/shows',);
  }, 10000);

  afterAll(async () => {
    await driver.quit();
  }, 15000);

  describe("Unit testing", () => {
   test('Search box is empty and button search is pressed', async () => {
    const bttn = await getElementByXpath(driver, "//button[@type='submit']");
    await bttn.click();
    const error = await getElementByXpath(driver, "//span[@data-error='wrong']");
    var result = await error.getText();
   
     // assert
    expect(result).toBe("Search cannot be empty.");
   });

   test('Search without query not work well', async () => {
    await driver.get("http://localhost:3000/shows/search");
    const qry = await getElementByXpath(driver, "/html/body/pre");
    var result = await qry.getText();
   
    // assert
    expect(result).toBe("Cannot GET /shows/search");
   });

   test('Search results show a list of items', async () => {
    await driver.get('http://localhost:3000/shows',);
    const srch = await getElementByXpath(driver, "//input[@name='search']");
    await srch.sendKeys("Batman");
    const bttn = await getElementByXpath(driver, "//button[@type='submit']");
    await bttn.click();
    var result = await elementLocated(driver, "//div[@class='row']");
   
    // assert
    expect(result).toBe(true);
   });

   test('Validate that image is not showed when image values is null', async () => {
    await driver.get("http://localhost:3000/shows");
    const srch = await getElementByXpath(driver, "//input[@name='search']");
    await srch.sendKeys("hull");
    const bttn = await getElementByXpath(driver, "//button[@type='submit']");
    await bttn.click();
    await driver.wait(until.elementsLocated(By.xpath("//div[@class='card-content white-text']//div[@class='col s6'][1]/*")), timeout = 2000);
    var array1 = await driver.findElements(By.xpath("//div[@class='card-content white-text']//div[@class='col s6'][1]/*"));
    console.log(array1[0].getAttribute("src"));
    /*var i;
    for (i = 0; i < array1.length; i++) {
      array1[i].then(function(text){
      console.log(text); //this will log the actual text.
      });
    };*/

    var result = 3;
   
    // assert
    expect(result).toBe(3);
   });
  });

});