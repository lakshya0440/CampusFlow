package com.campusflow.dto;

import jakarta.validation.constraints.*;

public record FacultyRegistrationRequest(@NotBlank String name, @Email @NotBlank String email,
    @Size(min = 6) String password, @NotBlank String employeeId, @NotBlank String department,
    @NotBlank String designation) {
}