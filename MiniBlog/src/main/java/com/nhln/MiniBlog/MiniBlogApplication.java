package com.nhln.MiniBlog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class MiniBlogApplication {

	public static void main(String[] args) {
		SpringApplication.run(MiniBlogApplication.class, args);
	}

}
