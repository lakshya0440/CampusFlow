package com.campusflow.dto;

import jakarta.validation.constraints.*;
import com.campusflow.model.RequestStatus;

public record RequestStatusUpdate(@NotNull RequestStatus status, @Size(max = 500) String adminComment) {
}