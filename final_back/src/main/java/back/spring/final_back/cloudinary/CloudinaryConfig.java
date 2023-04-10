package back.spring.final_back.cloudinary;


import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.cloudinary.Cloudinary;

@Configuration
public class CloudinaryConfig {

	@Bean
	public Cloudinary cloudinary() {
	    Map<String, String> config = new HashMap<>();
	    config.put("cloud_name", "djxfvm2ev");
	    config.put("api_key", "299164467664355");
	    config.put("api_secret", "f4oAgwU6CSoOlZ4xA2mTgQNfwVk");
	    Cloudinary cloudinary = new Cloudinary(config);
	    return cloudinary;
	}
}

