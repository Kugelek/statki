package com.projekt.statki.service;

import com.projekt.statki.model.User;
import com.projekt.statki.web.dto.UserRegistrationDto;
import org.springframework.security.core.userdetails.UserDetailsService;




public interface UserService extends UserDetailsService {
	User save(UserRegistrationDto registrationDto);

	User updateScore(User user, Long score);
}
