package com.projekt.statki.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Collection;

@Setter
@Getter
@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {
	
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "First name cannot be empty!")
	@Pattern(regexp = "[A-Z][A-z]+", message = "Invalid first name!")
	@Column(name = "first_name")
	private String firstName;

	@NotNull(message = "Last name cannot be empty!")
	@Pattern(regexp = "[A-Z][A-z]+", message = "Invalid last name!")
	@Column(name = "last_name")
	private String lastName;

	@NotNull(message = "Email cannot be empty!")
	@Pattern(regexp = "^([a-zA-Z0-9_\\-.]+)@([a-zA-Z0-9_\\-.]+)\\.([a-zA-Z]{2,5})$", message = "Invalid email!")
	private String email;

	@NotNull(message = "Password cannot be empty!")
	@Min(7)
	@Pattern(regexp = "^[A-z]*[0-9]+[A-z]*$", message = "Invalid Password!")
	private String password;

	@JsonProperty("highScore")
	private Long highScore;

	@JsonProperty("actualScore")
	private Long actualScore;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(
			name = "users_roles",
			joinColumns = @JoinColumn(
					name = "user_id", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(
					name = "role_id", referencedColumnName = "id"))

	private Collection<Role> roles;

	public User() {}

	public User(String firstName, String lastName, String email, String password, @JsonProperty("highScore") Long highScore, @JsonProperty("actualScore") Long actualScore, Collection<Role> roles) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.highScore = highScore;
		this.actualScore = actualScore;
		this.roles = roles;
	}

	public User(String firstName, String lastName, String email, String password, Collection<Role> roles) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.roles = roles;
		this.highScore = 0L;
		this.actualScore = 0L;
	}
}
