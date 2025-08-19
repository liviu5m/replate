package com.replate.backend.service;

import com.replate.backend.dto.UserRoleDto;
import com.replate.backend.enums.UserRole;
import com.replate.backend.model.User;
import com.replate.backend.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final EmailService emailService;

    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public User setUpUserRole(UserRoleDto userRoleDto) {
        Optional<User> optionalUser = userRepository.findById(userRoleDto.getUserId());
        if (!optionalUser.isPresent()) throw new RuntimeException("User not found");
        User user = optionalUser.get();
        switch (userRoleDto.getRole()) {
            case "DONOR":
                user.setRole(UserRole.DONOR);
                break;
            case "NGO":
                user.setRole(UserRole.NGO);
                break;
            case "DRIVER":
                user.setRole(UserRole.DRIVER);
                break;
        }
        user.setAddress(userRoleDto.getAddress());
        user.setPhone(userRoleDto.getPhone());
        if(userRoleDto.getType().equals("creating-account")) {
            emailService.sendVerificationEmailTemplate(user);
        }
        return userRepository.save(user);
    }


}
