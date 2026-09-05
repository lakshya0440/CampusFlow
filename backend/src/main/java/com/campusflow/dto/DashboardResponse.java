package com.campusflow.dto;

import java.util.*;
import com.campusflow.model.*;

public record DashboardResponse(Map<String, Object> statistics, List<CampusRequest> requests, List<Notice> notices,
    List<Event> events, List<Assignment> assignments) {
}