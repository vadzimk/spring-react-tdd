package com.hoxify.hoxify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class) // exclude while security is not configured for requests
public class HoxifyApplication {

    public static void main(String[] args) {
        SpringApplication.run(HoxifyApplication.class, args);
    }

}
