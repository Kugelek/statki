package com.projekt.statki;

import com.projekt.statki.service.UserServiceImpl;
import com.projekt.statki.web.dto.UserRegistrationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;

@SpringBootApplication
@RestController
public class StatkiApplication {
	@Autowired
	UserServiceImpl userService;

	public static void main(String[] args) {
		SpringApplication.run(StatkiApplication.class, args);
	}

	@GetMapping("/hello")
	public String hello() {
		return String.format("Kapitan bomba gotowy do akcji");
	}
	@EventListener(ApplicationReadyEvent.class)
	public void Init() {
//		userService.saveAdmin(new UserRegistrationDto("admin", "admin", "admin@admin.com", "admin", "Admin123"));
	}
}