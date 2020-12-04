package resources;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class base {
	
	public WebDriver driver;
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
		
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS); //wait 10 secs before send error
		driver.manage().window().maximize();
		
		return driver;
		
	}

}
