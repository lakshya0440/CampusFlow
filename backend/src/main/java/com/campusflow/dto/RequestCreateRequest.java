package com.campusflow.dto;

import jakarta.validation.constraints.*;

public record RequestCreateRequest(@NotBlank String department, @NotBlank String location, @NotBlank String category,
    @NotBlank String subject, @NotBlank @Size(min = 5) String description) {
}