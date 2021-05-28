package com.projekt.statki.service;

import com.projekt.statki.model.Role;
import com.projekt.statki.model.User;
import com.projekt.statki.repository.RoleRepository;
import com.projekt.statki.repository.UserRepository;
import com.projekt.statki.web.dto.UserRegistrationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;
	private RoleRepository roleRepository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
		super();
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
	}

	@Override
	public User save(UserRegistrationDto registrationDto) {
		Role roleTosave = roleRepository.findRoleById(1L);
		User user = new User(registrationDto.getFirstName(),
				registrationDto.getLastName(), registrationDto.getEmail(), registrationDto.getNick(),
				passwordEncoder.encode(registrationDto.getPassword()), Arrays.asList(roleTosave));
		return userRepository.save(user);
	}

	@Override
	public User updateScore(User user, Long actualScore) {
		if (user.getHighScore() < actualScore)
			user.setHighScore(actualScore);
		user.increasePlayTime();
		user.increaseDeathCount();
		return userRepository.save(user);
	}

	@Override
	public User updateLastSessionStart(String email) {
		User user = userRepository.findByEmail(email);
		user.setLastSessionStart(System.currentTimeMillis());
		return userRepository.save(user);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username);
		if (user == null)
			throw new UsernameNotFoundException("Invalid username or password.");
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), mapRolesToAuthorities(user.getRoles()));
	}
	
	private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles){
		return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
	}

	@Override
	public User saveAdmin(UserRegistrationDto registrationDto) {
		Role roleTosave = roleRepository.findRoleById(2L);
		System.out.println(roleTosave);
		User user = new User(registrationDto.getFirstName(),
				registrationDto.getLastName(), registrationDto.getEmail(), registrationDto.getNick(),
				passwordEncoder.encode(registrationDto.getPassword()), Arrays.asList(roleTosave));
		return userRepository.save(user);
	}
}
