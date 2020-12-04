package pageObjectModel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class Home_Page {
	
	public WebDriver driver;
	By input_search = By.xpath("//input[@name='search']");
	By button_search = By.xpath("//button[@type='submit']");
	
	public Home_Page(WebDriver driver) {
		// TODO Auto-generated constructor stub
		this.driver = driver;
	}

	public WebElement getInputSearch() {
		return driver.findElement(input_search);
	}
	
	public WebElement getButtonSearch() {
		return driver.findElement(button_search);
	}

}
