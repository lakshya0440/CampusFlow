package com.campusflow.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("assignments")
public class Assignment {
  @Id
  private String id;
  private String courseId;
  private String courseName;
  private String title;
  private String description;
  private String dueDate;
  private String facultyId;
  private LocalDateTime createdAt = LocalDateTime.now();

  public String getId() {
    return id;
  }

  public void setId(String v) {
    id = v;
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

  public String getTitle() {
    return title;
  }

  public void setTitle(String v) {
    title = v;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String v) {
    description = v;
  }

  public String getDueDate() {
    return dueDate;
  }

  public void setDueDate(String v) {
    dueDate = v;
  }

  public String getFacultyId() {
    return facultyId;
  }

  public void setFacultyId(String v) {
    facultyId = v;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime v) {
    createdAt = v;
  }
}
