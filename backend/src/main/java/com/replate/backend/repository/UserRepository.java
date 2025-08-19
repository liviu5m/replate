package com.replate.backend.repository;

import com.replate.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String username);
    Optional<User> findByVerificationCode(String verificationCode);
}
