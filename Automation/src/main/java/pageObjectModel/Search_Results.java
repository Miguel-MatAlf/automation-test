package pageObjectModel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class Search_Results {
	
	public WebDriver driver;
	By button_back = By.xpath("//a[@class='btn btn-primary']");
	
	public Search_Results(WebDriver driver) {
		// TODO Auto-generated constructor stub
		this.driver = driver;
	}
	
	public WebElement getButtonBack() {
		return driver.findElement(button_back);
	}
	
	public WebElement getURLinCard(int i) {
		return driver.findElement(By.xpath("//div[@class='container']/div[" + i + "]/div/div/div[2]/a"));
	}

}
