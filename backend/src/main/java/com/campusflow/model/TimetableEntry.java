package com.campusflow.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("timetable")
public class TimetableEntry {
  @Id
  private String id;
  private String day;
  private String startTime;
  private String endTime;
  private String courseId;
  private String courseName;
  private String room;
  private String facultyName;
  private String department;
  private String year;
  private LocalDateTime createdAt = LocalDateTime.now();

  public String getId() {
    return id;
  }

  public void setId(String v) {
    id = v;
  }

  public String getDay() {
    return day;
  }

  public void setDay(String v) {
    day = v;
  }

  public String getStartTime() {
    return startTime;
  }

  public void setStartTime(String v) {
    startTime = v;
  }

  public String getEndTime() {
    return endTime;
  }

  public void setEndTime(String v) {
    endTime = v;
  }

  public String getCourseId() {
    return courseId;
  }

  public void setCourseId(String v) {
    courseId = v;
  }

  public String getCourseName() {
    return courseName;
  }

  public void setCourseName(String v) {
    courseName = v;
  }

  public String getRoom() {
    return room;
  }

  public void setRoom(String v) {
    room = v;
  }

  public String getFacultyName() {
    return facultyName;
  }

  public void setFacultyName(String v) {
    facultyName = v;
  }

  public String getDepartment() {
    return department;
  }

  public void setDepartment(String v) {
    department = v;
  }

  public String getYear() {
    return year;
  }

  public void setYear(String v) {
    year = v;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime v) {
    createdAt = v;
  }
}
