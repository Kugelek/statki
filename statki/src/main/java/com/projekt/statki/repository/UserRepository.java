package com.projekt.statki.repository;

import com.projekt.statki.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email);

	Optional<User> getUserById(Long id);

	void deleteUserById(Long id);

	Optional<User> findById(Long id);
}
