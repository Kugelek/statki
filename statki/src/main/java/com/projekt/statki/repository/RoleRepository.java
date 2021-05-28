package com.projekt.statki.repository;

import com.projekt.statki.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findRoleById(Long id);
}
