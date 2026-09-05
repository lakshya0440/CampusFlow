package com.campusflow.service;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.campusflow.dto.DashboardResponse;
import com.campusflow.model.RequestStatus;
import com.campusflow.model.Role;
import com.campusflow.model.User;
import com.campusflow.repository.AssignmentRepository;
import com.campusflow.repository.CourseRepository;
import com.campusflow.repository.EventRepository;
import com.campusflow.repository.NoticeRepository;

@Service
public class DashboardService {

    private final UserService userService;
    private final RequestService requestService;
    private final CourseRepository courseRepository;
    private final AssignmentRepository assignmentRepository;
    private final NoticeRepository noticeRepository;
    private final EventRepository eventRepository;

    public DashboardService(
            UserService userService,
            RequestService requestService,
            CourseRepository courseRepository,
            AssignmentRepository assignmentRepository,
            NoticeRepository noticeRepository,
            EventRepository eventRepository) {
        this.userService = userService;
        this.requestService = requestService;
        this.courseRepository = courseRepository;
        this.assignmentRepository = assignmentRepository;
        this.noticeRepository = noticeRepository;
        this.eventRepository = eventRepository;
    }

    public DashboardResponse getDashboard(String email) {
        User user = userService.find(email);

        Map<String, Object> statistics = new LinkedHashMap<>();
        statistics.put("students", userService.count(Role.STUDENT));
        statistics.put("faculty", userService.count(Role.FACULTY));
        statistics.put("admins", userService.count(Role.ADMIN));
        statistics.put("courses", courseRepository.count());
        statistics.put("assignments", assignmentRepository.count());
        statistics.put("notices", noticeRepository.count());
        statistics.put("events", eventRepository.count());
        statistics.put("pendingRequests", requestService.count(RequestStatus.PENDING));
        statistics.put("resolvedRequests", requestService.count(RequestStatus.RESOLVED));
        statistics.put("declinedRequests", requestService.count(RequestStatus.DECLINED));

        var requests = user.getRole() == Role.ADMIN
                ? requestService.all()
                : requestService.mine(email);

        return new DashboardResponse(
                statistics,
                requests,
                noticeRepository.findAll(),
                eventRepository.findAll(),
                assignmentRepository.findAll());
    }
}
