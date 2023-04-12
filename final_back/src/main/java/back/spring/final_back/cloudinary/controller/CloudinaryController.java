package back.spring.final_back.cloudinary.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin("http://localhost:3333")
@RequestMapping("/api")
@RequiredArgsConstructor
public class CloudinaryController {

    private final Cloudinary cloudinary;

    @PostMapping("/image-upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        // Map<String, String> config = new HashMap<>();
        // config.put("cloud_name", "djxfvm2ev");
        // config.put("api_key", "299164467664355");
        // config.put("api_secret", "f4oAgwU6CSoOlZ4xA2mTgQNfwVk");
        // Cloudinary cloudinary = new Cloudinary(config);
        // cloudinary

        Map<String, Object> params = new HashMap<>();
        params.put("resource_type", "auto");
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), params);
        return (String) uploadResult.get("url");
    }
}