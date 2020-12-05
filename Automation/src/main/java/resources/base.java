package resources;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class base {
	
	public WebDriver driver;
	public WebDriverWait wait;
	public Properties prop;
	
	public WebDriver startDriver() throws IOException {
		prop = new Properties();
		String fis_path = System.getProperty("user.dir");
		FileInputStream fis = new FileInputStream(fis_path + "\\src\\main\\java\\resources\\data.properties");
		
		prop.load(fis);
		String browser = prop.getProperty("browser");
		
		if(browser.equals("chrome")) {
			driver = new ChromeDriver();
		} else if(browser.equals("firefox")) {
			//Set properties for firefox
		} else if(browser.equals("ie")) {
			//Set properties for IE
		}
		
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
		driver.manage().window().maximize();
		
		return driver;
	}
	
	public WebDriverWait startWait(WebDriver driver) {
		wait = new WebDriverWait(driver, 5);
		return wait;
	}

}
