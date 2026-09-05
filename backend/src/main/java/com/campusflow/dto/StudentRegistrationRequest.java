package com.campusflow.dto;

import jakarta.validation.constraints.*;

public record StudentRegistrationRequest(@NotBlank String name, @Email @NotBlank String email,
    @Size(min = 6) String password, @NotBlank String studentId, @NotBlank String department, @NotBlank String year) {
}