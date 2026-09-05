package com.campusflow.controller;

import com.campusflow.dto.RequestCreateRequest;
import com.campusflow.dto.RequestStatusUpdate;
import com.campusflow.service.RequestService;

import jakarta.validation.Valid;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @PostMapping
    public Object create(
            @Valid @RequestBody RequestCreateRequest request,
            Authentication authentication) {
        requireNotAdmin(authentication);
        return requestService.create(authentication.getName(), request);
    }

    @GetMapping("/mine")
    public Object mine(Authentication authentication) {
        return requestService.mine(authentication.getName());
    }

    @GetMapping
    public Object all(Authentication authentication) {
        requireAdmin(authentication);
        return requestService.all();
    }

    @PutMapping("/{id}/status")
    public Object updateStatus(
            @PathVariable String id,
            @Valid @RequestBody RequestStatusUpdate request,
            Authentication authentication) {
        requireAdmin(authentication);
        return requestService.status(id, request, authentication.getName());
    }

    private void requireNotAdmin(Authentication authentication) {
        boolean admin = authentication.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (admin) {
            throw new IllegalStateException(
                    "Administrators cannot raise service requests");
        }
    }

    private void requireAdmin(Authentication authentication) {
        boolean admin = authentication.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!admin) {
            throw new IllegalStateException("Admin access required");
        }
    }
}
