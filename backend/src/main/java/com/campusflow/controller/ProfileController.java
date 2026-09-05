package com.campusflow.controller;

import com.campusflow.dto.ProfileUpdateRequest;
import com.campusflow.service.UserService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserService userService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public Object me(Authentication authentication) {
        return userService.find(authentication.getName());
    }

    @PutMapping("/me")
    public Object update(
            @RequestBody ProfileUpdateRequest request,
            Authentication authentication) {
        return userService.update(authentication.getName(), request);
    }
}
