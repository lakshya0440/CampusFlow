package com.campusflow.controller;

import com.campusflow.dto.FacultyRegistrationRequest;
import com.campusflow.dto.LoginRequest;
import com.campusflow.dto.LoginResponse;
import com.campusflow.dto.StudentRegistrationRequest;
import com.campusflow.model.User;
import com.campusflow.security.JwtService;
import com.campusflow.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register/student")
    public ResponseEntity<User> registerStudent(
            @Valid @RequestBody StudentRegistrationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.registerStudent(request));
    }

    @PostMapping("/register/faculty")
    public ResponseEntity<User> registerFaculty(
            @Valid @RequestBody FacultyRegistrationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.registerFaculty(request));
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        User user = userService.find(request.email());

        if (!user.isActive()) {
            throw new IllegalStateException("This account has been disabled by the administrator");
        }

        if (!userService.matches(request.password(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = jwtService.generate(user.getEmail(), user.getRole().name());

        return new LoginResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getStudentId(),
                user.getEmployeeId(),
                user.getDepartment(),
                user.getYear(),
                user.getDesignation());
    }
}
