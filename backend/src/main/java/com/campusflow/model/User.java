package com.campusflow.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Document("users")
public class User {
  @Id
  private String id;
  private String name;
  @Indexed(unique = true)
  private String email;
  @JsonIgnore
  private String password;
  private Role role;
  private String studentId, employeeId, department, year, designation;
  private boolean active = true, emailVerified = true;
  private LocalDateTime createdAt = LocalDateTime.now();

  public String getId() {
    return id;
  }

  public void setId(String v) {
    id = v;
  }

  public String getName() {
    return name;
  }

  public void setName(String v) {
    name = v;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String v) {
    email = v;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String v) {
    password = v;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role v) {
    role = v;
  }

  public String getStudentId() {
    return studentId;
  }

  public void setStudentId(String v) {
    studentId = v;
  }

  public String getEmployeeId() {
    return employeeId;
  }

  public void setEmployeeId(String v) {
    employeeId = v;
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

  public String getDesignation() {
    return designation;
  }

  public void setDesignation(String v) {
    designation = v;
  }

  public boolean isActive() {
    return active;
  }

  public void setActive(boolean v) {
    active = v;
  }

  public boolean isEmailVerified() {
    return emailVerified;
  }

  public void setEmailVerified(boolean v) {
    emailVerified = v;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime v) {
    createdAt = v;
  }
}