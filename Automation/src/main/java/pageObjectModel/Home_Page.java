package pageObjectModel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Home_Page {
	
	public WebDriver driver;
	public WebDriverWait wait;
	By input_search = By.xpath("//input[@name='search']");
	By button_search = By.xpath("//button[@type='submit']");
	
	public Home_Page(WebDriver driver, WebDriverWait wait) {
		// TODO Auto-generated constructor stub
		this.driver = driver;
		this.wait = wait;
	}

	public WebElement getInputSearch() {
		WebElement element = driver.findElement(input_search);
		elementLocatedAndVisible(element, input_search);
		return element;
	}
	
	public WebElement getButtonSearch() {
		WebElement element = driver.findElement(button_search);
		elementLocatedAndVisible(element, button_search);
		return element;
	}
	
	public void elementLocatedAndVisible(WebElement element, By elem) {
		wait.until(ExpectedConditions.presenceOfElementLocated(elem));
		wait.until(ExpectedConditions.visibilityOf(element));
	}

}
