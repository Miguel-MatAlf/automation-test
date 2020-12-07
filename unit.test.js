const webdriver = require('selenium-webdriver');
const {until} = require('selenium-webdriver');
const {By} = require('selenium-webdriver');

const getElementByXpath = async (driver, xpath, timeout = 2000) => {
	const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
	return await driver.wait(until.elementIsVisible(el), timeout);
};

const elementLocated = async (driver, xpath, timeout = 2000) => {
	try {
		await driver.findElement(By.xpath(xpath), timeout);
		return true;
  	} catch (error) {
		return false;
  	}
};

const isImageDisplayed = async (driver, xpath, image) => {
	if (elementLocated(driver, xpath)){
		var imgPath = document.getElementsByTagName("img")[image];
		imgPath.src = "";
		if (imgPath.naturalHeight > 0) {
			return true;
		} else {
			return false;
		}
	} else {
		return "xpath not located";
	}
};

describe('Unit Testing', () => {
	let driver;
	
	beforeAll(async () => {
		driver = new webdriver.Builder().forBrowser('chrome').build();
    	await driver.manage().window().maximize();
  	}, 10000);

	afterAll(async () => {
		await driver.quit();
  	}, 10000);

	test('Search box is empty and button search is pressed', async () => {
		await driver.get('http://localhost:3000/shows');
		const field = await getElementByXpath(driver, "//input[@name='search']");
		var input = await field.getAttribute("value");
		if(input != ""){
			await field.clear();
		}
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
    	await srch.sendKeys("spider man");
    	const bttn = await getElementByXpath(driver, "//button[@type='submit']");
    	await bttn.click();
		//working only with first image in html
    	var result = await isImageDisplayed(driver, "(//div[@class='card-content white-text']//div[1]//img)[1]", 0);
		// assert
    	expect(result).toBe(false);
   	});

});