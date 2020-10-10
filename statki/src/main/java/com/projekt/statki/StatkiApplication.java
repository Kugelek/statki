package com.projekt.statki;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class StatkiApplication {

	public static void main(String[] args) {
		SpringApplication.run(StatkiApplication.class, args);
	}

	@GetMapping("/hello")
	public String hello() {
		return String.format("Kapitan bomba gotowy do akcji");
	}
}