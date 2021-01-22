package com.projekt.statki.web;

import com.projekt.statki.service.UserService;
import com.projekt.statki.web.dto.UserRegistrationDto;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/registration")
public class UserRegistrationController {

	private UserService userService;

	public UserRegistrationController(UserService userService) {
		super();
		this.userService = userService;
	}
	
	@ModelAttribute("user")
    public UserRegistrationDto userRegistrationDto() {
        return new UserRegistrationDto();
    }
	
	@GetMapping
	public String showRegistrationForm() {
		return "registration";
	}

	@PostMapping("/check")
	public String registerUserAccountCheck(@ModelAttribute("user") UserRegistrationDto registrationDto, Errors errors) {
		if (errors.hasErrors())
			return "/registration";
		userService.save(registrationDto);
		return "redirect:/registration?success";
	}
}
