package pageObjectModel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Search_Results {
	
	public WebDriver driver;
	public WebDriverWait wait;
	By button_back = By.xpath("//a[@class='btn btn-primary']");
	
	public Search_Results(WebDriver driver, WebDriverWait wait) {
		// TODO Auto-generated constructor stub
		this.driver = driver;
		this.wait = wait;
	}
	
	public WebElement getButtonBack() {
		WebElement element = driver.findElement(button_back);
		elementLocatedAndClickable(element, button_back);
		return element;
	}
	
	public WebElement getURLofCard(int i) {
		By elem = By.xpath("//div[@class='container']/div[" + i + "]/div/div/div[2]/a");
		WebElement element = driver.findElement(elem);
		elementLocatedAndClickable(element, elem);
		return element;
	}
	
	public void elementLocatedAndClickable(WebElement element, By elem) {
		wait.until(ExpectedConditions.presenceOfElementLocated(elem));
		wait.until(ExpectedConditions.elementToBeClickable(element));
	}

}
