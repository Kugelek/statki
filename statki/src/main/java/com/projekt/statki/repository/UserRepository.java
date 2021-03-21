package com.projekt.statki.repository;

import com.projekt.statki.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email);

	Optional<User> getUserById(Long id);

	void deleteUserById(Long id);

	Optional<User> findById(Long id);

	List<User> findAllByOrderByIdAsc();

	List<User> findTop5ByOrderByHighScoreDesc();
	List<User> findTop10ByOrderByHighScoreDesc();
	List<User> findTop20ByOrderByHighScoreDesc();
	List<User> findTop100ByOrderByHighScoreDesc();

	List<User> findTop5ByOrderByDeathsCountDesc();
	List<User> findTop10ByOrderByDeathsCountDesc();
	List<User> findTop20ByOrderByDeathsCountDesc();
	List<User> findTop100ByOrderByDeathsCountDesc();

	List<User> findTop5ByOrderByPlayTimeDesc();
	List<User> findTop10ByOrderByPlayTimeDesc();
	List<User> findTop20ByOrderByPlayTimeDesc();
	List<User> findTop100ByOrderByPlayTimeDesc();
}
