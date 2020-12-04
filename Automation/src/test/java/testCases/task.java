package testCases;

import static org.testng.Assert.assertEquals;

import java.io.IOException;

import org.openqa.selenium.JavascriptExecutor;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import pageObjectModel.Home_Page;
import pageObjectModel.Search_Results;
import resources.base;

public class task extends base {
	
	@BeforeTest
	public void Setup() throws IOException {
		driver = startDriver();
	}
	@AfterTest
	public void Teardown() {
		driver.quit();
	}
	
	@Test
	public void AutomationTest() throws IOException, InterruptedException {
		
		Home_Page home = new Home_Page(driver);
		Search_Results result = new Search_Results(driver);
		JavascriptExecutor js = (JavascriptExecutor) driver;
		String url = prop.getProperty("url");
		
//		* Open browser in http://localhost:3000/shows
		driver.get(url);
		
//		* Enter a text in search box with text **batman**
		home.getInputSearch().sendKeys("Batman");
		
//		* Press button search
		home.getButtonSearch().click();
		
//		* Navigate to the url that is show in second card of results
		result.getURLinCard(2).click();
		
//		* Navigate back using browser features
		driver.navigate().back();
		
//		* Change css background color to **#4a148c** to card with title **Batman Unlimited**
		js.executeScript("document.getElementsByClassName(\"card\")[1].className='card'");
		js.executeScript("document.getElementsByClassName(\"card\")[1].style.backgroundColor='#4a148c'");
		js.executeScript("document.getElementsByClassName(\"card-title\")[1].innerText='Batman Unlimited'");
		Thread.sleep(3000);
		
//		* Press back button
		result.getButtonBack().click();
		
//		* Make sure that input for search is empty
		String actual = home.getInputSearch().getText();
		String expected = ""; 
		assertEquals(actual, expected);
		Thread.sleep(3000);
	}

}
