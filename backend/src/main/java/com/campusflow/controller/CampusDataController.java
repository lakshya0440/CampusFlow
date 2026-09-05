package com.campusflow.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import com.campusflow.model.*;
import com.campusflow.repository.*;

@RestController
@RequestMapping("/api")
public class CampusDataController {

    private final CourseRepository courses;
    private final AssignmentRepository assignments;
    private final NoticeRepository notices;
    private final EventRepository events;
    private final TimetableRepository timetable;
    private final UserRepository users;

    public CampusDataController(
            CourseRepository courses,
            AssignmentRepository assignments,
            NoticeRepository notices,
            EventRepository events,
            TimetableRepository timetable,
            UserRepository users) {
        this.courses = courses;
        this.assignments = assignments;
        this.notices = notices;
        this.events = events;
        this.timetable = timetable;
        this.users = users;
    }

    private boolean facultyOrAdmin(Authentication a) {
        return a.getAuthorities().stream()
                .anyMatch(x -> x.getAuthority().equals("ROLE_FACULTY")
                        || x.getAuthority().equals("ROLE_ADMIN"));
    }

    private boolean admin(Authentication a) {
        return a.getAuthorities().stream()
                .anyMatch(x -> x.getAuthority().equals("ROLE_ADMIN"));
    }

    @GetMapping("/courses")
    public Object courses() {
        return courses.findAll();
    }

    @PostMapping("/courses")
    public Object addCourse(@RequestBody Course x, Authentication a) {
        if (!facultyOrAdmin(a))
            throw new RuntimeException("Faculty or admin access required");
        return courses.save(x);
    }

    @PutMapping("/courses/{id}")
    public Object editCourse(
            @PathVariable String id,
            @RequestBody Course x,
            Authentication a) {
        if (!facultyOrAdmin(a))
            throw new RuntimeException("Faculty or admin access required");
        x.setId(id);
        return courses.save(x);
    }

    @DeleteMapping("/courses/{id}")
    public void delCourse(@PathVariable String id, Authentication a) {
        if (!facultyOrAdmin(a))
            throw new RuntimeException("Faculty or admin access required");
        if (!courses.existsById(id)) throw new RuntimeException("Course not found");
        courses.deleteById(id);
    }

    @GetMapping("/assignments")
    public Object assignments() {
        return assignments.findAll();
    }

    @PostMapping("/assignments")
    public Object addAssignment(
            @RequestBody Assignment x,
            Authentication a) {
        if (!facultyOrAdmin(a))
            throw new RuntimeException("Faculty or admin access required");
        x.setFacultyId(a.getName());
        return assignments.save(x);
    }

    @PutMapping("/assignments/{id}")
    public Object editAssignment(
            @PathVariable String id,
            @RequestBody Assignment x,
            Authentication a) {
        if (!facultyOrAdmin(a))
            throw new RuntimeException("Faculty or admin access required");
        x.setId(id);
        return assignments.save(x);
    }

    @DeleteMapping("/assignments/{id}")
    public void delAssignment(
            @PathVariable String id,
            Authentication a) {
        if (!facultyOrAdmin(a))
            throw new RuntimeException("Faculty or admin access required");
        if (!assignments.existsById(id)) throw new RuntimeException("Assignment not found");
        assignments.deleteById(id);
    }

    @GetMapping("/notices")
    public Object notices() {
        return notices.findAll();
    }

    @PostMapping("/notices")
    public Object addNotice(
            @RequestBody Notice x,
            Authentication a) {
        if (!facultyOrAdmin(a))
            throw new RuntimeException("Faculty or admin access required");
        x.setCreatedBy(a.getName());
        return notices.save(x);
    }

    @PutMapping("/notices/{id}")
    public Object editNotice(
            @PathVariable String id,
            @RequestBody Notice x,
            Authentication a) {
        if (!facultyOrAdmin(a))
            throw new RuntimeException("Faculty or admin access required");
        x.setId(id);
        return notices.save(x);
    }

    @DeleteMapping("/notices/{id}")
    public void delNotice(
            @PathVariable String id,
            Authentication a) {
        if (!facultyOrAdmin(a))
            throw new RuntimeException("Faculty or admin access required");
        if (!notices.existsById(id)) throw new RuntimeException("Notice not found");
        notices.deleteById(id);
    }

    @GetMapping("/events")
    public Object events() {
        return events.findAll();
    }

    @PostMapping("/events")
    public Object addEvent(
            @RequestBody Event x,
            Authentication a) {
        if (!facultyOrAdmin(a))
            throw new RuntimeException("Faculty or admin access required");
        x.setCreatedBy(a.getName());
        return events.save(x);
    }

    @PutMapping("/events/{id}")
    public Object editEvent(
            @PathVariable String id,
            @RequestBody Event x,
            Authentication a) {
        if (!facultyOrAdmin(a))
            throw new RuntimeException("Faculty or admin access required");
        x.setId(id);
        return events.save(x);
    }

    @DeleteMapping("/events/{id}")
    public void delEvent(
            @PathVariable String id,
            Authentication a) {
        if (!facultyOrAdmin(a))
            throw new RuntimeException("Faculty or admin access required");
        if (!events.existsById(id)) throw new RuntimeException("Event not found");
        events.deleteById(id);
    }

    @GetMapping("/timetable")
    public Object timetable() {
        return timetable.findAll();
    }

    @PostMapping("/timetable")
    public Object addTime(
            @RequestBody TimetableEntry x,
            Authentication a) {
        if (!facultyOrAdmin(a))
            throw new RuntimeException("Faculty or admin access required");
        return timetable.save(x);
    }

    @PutMapping("/timetable/{id}")
    public Object editTime(
            @PathVariable String id,
            @RequestBody TimetableEntry x,
            Authentication a) {
        if (!facultyOrAdmin(a))
            throw new RuntimeException("Faculty or admin access required");
        x.setId(id);
        return timetable.save(x);
    }

    @DeleteMapping("/timetable/{id}")
    public void delTime(
            @PathVariable String id,
            Authentication a) {
        if (!facultyOrAdmin(a))
            throw new RuntimeException("Faculty or admin access required");
        if (!timetable.existsById(id)) throw new RuntimeException("Timetable entry not found");
        timetable.deleteById(id);
    }

    @GetMapping("/admin/users")
    public Object allUsers(Authentication a) {
        if (!admin(a))
            throw new RuntimeException("Admin access required");
        return users.findAll();
    }

    @PutMapping("/admin/users/{id}/active")
    public Object active(
            @PathVariable String id,
            @RequestParam boolean value,
            Authentication a) {
        if (!admin(a))
            throw new RuntimeException("Admin access required");

        User u = users.findById(id).orElseThrow();
        u.setActive(value);
        return users.save(u);
    }
}
