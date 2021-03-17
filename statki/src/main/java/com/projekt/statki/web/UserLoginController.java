package com.projekt.statki.web;

import com.projekt.statki.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserLoginController {

	private UserService userService;

	public UserLoginController(UserService userService) {
		super();
		this.userService = userService;
	}

	@GetMapping("/login")
	public String login() {
		return "login";
	}

	@GetMapping("/")
	public String home() {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		userService.updateLastSessionStart(userDetails.getUsername());
		return "index";
	}
}
