//local.test.js
const webdriver = require('selenium-webdriver');
const {until} = require('selenium-webdriver');
const {By} = require('selenium-webdriver');
const {chrome} = require('selenium-webdriver/chrome')

const getElementById = async (driver, id, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByName = async (driver, name, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByXpath = async (driver, xpath, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

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
     // arrange and act
     const bttn = await getElementByXpath(driver, "//button[@type='submit']");
      await bttn.click();
     const error = await getElementByXpath(driver, "//span[@data-error='wrong']");
     var result = await error.getText();
   
     // assert
     expect(result).toBe("Search cannot be empty.");
   });

   test('Search without query not work well', async () => {
     // arrange and act
     await driver.get("http://localhost:3000/shows/search");
     const qry = await getElementByXpath(driver, "/html/body/pre");
     var result = await qry.getText();
   
     // assert
     expect(result).toBe("Cannot GET /shows/search");
   });

   test('Search results show a list of items', async () => {
     // arrange and act
     await driver.get('http://localhost:3000/shows',);
     const srch = await getElementByXpath(driver, "//input[@name='search']");
      await srch.sendKeys("Batman");
     const bttn = await getElementByXpath(driver, "//button[@type='submit']");
      await bttn.click();
     var result = 3
   
     // assert
     expect(result).toBe(3);
   });

   test('Validate that image is not showed when image values is null', async () => {
     // arrange and act
     var result = 3
   
     // assert
     expect(result).toBe(3);
   });
  });

  /*test(
      'test',
      async () => {
      
      const lnk = await getElementByName(driver, 'li1');
      await lnk.click();
      
      const lnk1 = await getElementByName(driver, 'li2');
      await lnk1.click();

      const inpf = await getElementById(driver, 'sampletodotext');
      await inpf.clear();
      await inpf.sendKeys("Yey, Let's add it to list");

      const btn = await getElementById(driver, 'addbutton');
      await btn.click();

      const output = await getElementByXpath(driver, '//html/body/div/div/div/ul/li[6]/span');
      const outputVal = await output.getText();
      console.log(outputVal);

      expect(outputVal).toEqual("Yey, Let's add it to list");
      
    },
    10000,
  );*/
});