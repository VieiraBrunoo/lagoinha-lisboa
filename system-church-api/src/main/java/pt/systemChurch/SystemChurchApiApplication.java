package pt.systemChurch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource(ignoreResourceNotFound = false, value = "classpath:application.properties")
@ComponentScan(basePackages= {"pt.systemChurch.controller"})
public class SystemChurchApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SystemChurchApiApplication.class, args);
	}

}
