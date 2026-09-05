package com.campusflow.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.campusflow.model.Assignment;
import com.campusflow.model.Course;
import com.campusflow.model.Event;
import com.campusflow.model.Notice;
import com.campusflow.model.Role;
import com.campusflow.model.TimetableEntry;
import com.campusflow.model.User;
import com.campusflow.repository.AssignmentRepository;
import com.campusflow.repository.CourseRepository;
import com.campusflow.repository.EventRepository;
import com.campusflow.repository.NoticeRepository;
import com.campusflow.repository.TimetableRepository;
import com.campusflow.repository.UserRepository;

@Configuration
public class DataSeeder {
  @Bean
  CommandLineRunner seed(UserRepository users, CourseRepository courses, AssignmentRepository assignments,
      NoticeRepository notices, EventRepository events, TimetableRepository timetable, PasswordEncoder encoder) {
    return args -> {
      if (users.findByEmail("admin@campusflow.local").isEmpty()) {
        User u = new User();
        u.setName("CampusFlow Admin");
        u.setEmail("admin@campusflow.local");
        u.setPassword(encoder.encode("Admin@123"));
        u.setRole(Role.ADMIN);
        u.setActive(true);
        u.setEmailVerified(true);
        users.save(u);
      }
      if (courses.count() == 0) {
        Course a = new Course();
        a.setCode("CS401");
        a.setName("Database Management Systems");
        a.setDepartment("CSE");
        a.setSemester("4");
        a.setCredits(4);
        a.setFacultyName("Dr. Mehta");
        courses.save(a);
        Course b = new Course();
        b.setCode("CS402");
        b.setName("Data Communication & Networks");
        b.setDepartment("CSE");
        b.setSemester("4");
        b.setCredits(4);
        b.setFacultyName("Prof. Sharma");
        courses.save(b);
      }
      if (assignments.count() == 0) {
        Assignment a = new Assignment();
        a.setCourseId("CS401");
        a.setCourseName("DBMS");
        a.setTitle("MongoDB CampusFlow Schema");
        a.setDescription("Design collections and explain document relationships.");
        a.setDueDate("2026-08-28");
        a.setFacultyId("FAC001");
        assignments.save(a);
        Assignment b = new Assignment();
        b.setCourseId("CS402");
        b.setCourseName("DCN");
        b.setTitle("OSI Model Case Study");
        b.setDescription("Prepare a short case study on layered network communication.");
        b.setDueDate("2026-09-03");
        b.setFacultyId("FAC001");
        assignments.save(b);
      }
      if (notices.count() == 0) {
        Notice a = new Notice();
        a.setTitle("CampusFlow is live");
        a.setContent("Use the portal for academic updates and campus service requests.");
        a.setCategory("General");
        a.setAudience("ALL");
        a.setCreatedBy("Campus Administration");
        notices.save(a);
        Notice b = new Notice();
        b.setTitle("Upcoming Holiday");
        b.setContent("Independence Day holiday: campus offices remain closed on 15 August.");
        b.setCategory("Holiday");
        b.setAudience("ALL");
        b.setCreatedBy("Campus Administration");
        notices.save(b);
      }
      if (events.count() == 0) {
        String[][] es = {
            { "Sports Day", "Annual inter-department sports activities.", "Main Ground", "2026-08-22", "Sports" },
            { "Tech Fest", "Student technology showcase and competitions.", "Innovation Block", "2026-09-05",
                "Technical" },
            { "Freshers Orientation", "Orientation for newly admitted students.", "Auditorium", "2026-09-12",
                "Campus" } };
        for (String[] x : es) {
          Event e = new Event();
          e.setTitle(x[0]);
          e.setDescription(x[1]);
          e.setVenue(x[2]);
          e.setEventDate(x[3]);
          e.setCategory(x[4]);
          e.setCreatedBy("Campus Administration");
          events.save(e);
        }
      }
      if (timetable.count() == 0) {
        TimetableEntry t = new TimetableEntry();
        t.setDay("Monday");
        t.setStartTime("10:00");
        t.setEndTime("11:00");
        t.setCourseId("CS401");
        t.setCourseName("DBMS");
        t.setRoom("Lab 2");
        t.setFacultyName("Dr. Mehta");
        t.setDepartment("CSE");
        t.setYear("2nd Year");
        timetable.save(t);
      }
    };
  }
}
