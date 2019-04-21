package pt.systemChurch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@SpringBootApplication
@PropertySource(ignoreResourceNotFound = false, value = "classpath:application.properties")
@ComponentScan(basePackages= {"pt.systemChurch"})
public class SystemChurchApiApplication {

	  private static Logger logger = LogManager.getLogger(SystemChurchApiApplication.class);

	
	public static void main(String[] args) {
		SpringApplication.run(SystemChurchApiApplication.class, args);
		 logger.info("Starting SystemChurchApiApplication..");
	}


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*");
            }
        };
    }
}
