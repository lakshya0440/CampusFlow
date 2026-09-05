package com.campusflow.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.campusflow.dto.FacultyRegistrationRequest;
import com.campusflow.dto.ProfileUpdateRequest;
import com.campusflow.dto.StudentRegistrationRequest;
import com.campusflow.model.Role;
import com.campusflow.model.User;
import com.campusflow.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerStudent(StudentRegistrationRequest request) {
        return saveUser(
                request.name(),
                request.email(),
                request.password(),
                Role.STUDENT,
                request.studentId(),
                null,
                request.department(),
                request.year(),
                null);
    }

    public User registerFaculty(FacultyRegistrationRequest request) {
        return saveUser(
                request.name(),
                request.email(),
                request.password(),
                Role.FACULTY,
                null,
                request.employeeId(),
                request.department(),
                null,
                request.designation());
    }

    private User saveUser(
            String name,
            String email,
            String password,
            Role role,
            String studentId,
            String employeeId,
            String department,
            String year,
            String designation) {

        String normalizedEmail = email.trim().toLowerCase();

        if (repository.findByEmail(normalizedEmail).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();
        user.setName(name.trim());
        user.setEmail(normalizedEmail);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        user.setStudentId(studentId);
        user.setEmployeeId(employeeId);
        user.setDepartment(department);
        user.setYear(year);
        user.setDesignation(designation);
        user.setActive(true);
        user.setEmailVerified(true);

        return repository.save(user);
    }

    public User find(String email) {
        return repository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public boolean matches(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public User update(String email, ProfileUpdateRequest request) {
        User user = find(email);

        if (request.name() != null && !request.name().isBlank()) {
            user.setName(request.name().trim());
        }
        if (request.department() != null && !request.department().isBlank()) {
            user.setDepartment(request.department().trim());
        }
        if (request.year() != null && !request.year().isBlank()) {
            user.setYear(request.year().trim());
        }
        if (request.designation() != null && !request.designation().isBlank()) {
            user.setDesignation(request.designation().trim());
        }

        return repository.save(user);
    }

    public List<User> all() {
        return repository.findAll();
    }

    public long count(Role role) {
        return repository.findAll()
                .stream()
                .filter(user -> user.getRole() == role)
                .count();
    }
}
