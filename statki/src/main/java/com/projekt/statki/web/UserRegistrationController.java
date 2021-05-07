package com.projekt.statki.web;

import com.projekt.statki.repository.UserRepository;
import com.projekt.statki.service.UserService;
import com.projekt.statki.web.dto.UserRegistrationDto;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/registration")
public class UserRegistrationController {

	private UserService userService;
	private UserRepository userRepository;

	public UserRegistrationController(UserService userService, UserRepository userRepository) {
		super();
		this.userService = userService;
		this.userRepository = userRepository;
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
		if (errors.hasErrors()) {
			return "/registration";
		}
		if ((userRepository.findByEmail(registrationDto.getEmail()) != null) || (userRepository.findByNick(registrationDto.getNick()) != null)) {
			return "/registration";
		}
		userService.save(registrationDto);
		return "redirect:/registration?success";
	}
}
