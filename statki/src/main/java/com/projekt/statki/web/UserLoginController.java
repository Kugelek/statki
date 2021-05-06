package com.projekt.statki.web;

import com.projekt.statki.repository.UserRepository;
import com.projekt.statki.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserLoginController {
	private UserService userService;
	private UserRepository userRepository;

	public UserLoginController(UserService userService, UserRepository userRepository) {
		super();
		this.userService = userService;
		this.userRepository = userRepository;
	}

	@GetMapping("/login")
	public String login() {
		return "login";
	}

	@GetMapping("/")
	public String home(Model model) {
		//Model model ^
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		userService.updateLastSessionStart(userDetails.getUsername());
		model.addAttribute("nick", userRepository.findByEmail(userDetails.getUsername()).getNick());
		return "index";
	}
}
