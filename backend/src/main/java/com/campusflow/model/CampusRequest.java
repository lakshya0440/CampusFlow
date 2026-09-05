package com.campusflow.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("campus_requests")
public class CampusRequest {
  @Id
  private String id;
  private String requesterId;
  private String requesterName;
  private String requesterEmail;
  private Role requesterRole;
  private String department;
  private String location;
  private String category;
  private String subject;
  private String description;
  private RequestStatus status;
  private String adminComment;
  private String resolvedBy;
  private LocalDateTime createdAt = LocalDateTime.now();

  public String getId() {
    return id;
  }

  public void setId(String v) {
    id = v;
  }

  public String getRequesterId() {
    return requesterId;
  }

  public void setRequesterId(String v) {
    requesterId = v;
  }

  public String getRequesterName() {
    return requesterName;
  }

  public void setRequesterName(String v) {
    requesterName = v;
  }

  public String getRequesterEmail() {
    return requesterEmail;
  }

  public void setRequesterEmail(String v) {
    requesterEmail = v;
  }

  public Role getRequesterRole() {
    return requesterRole;
  }

  public void setRequesterRole(Role v) {
    requesterRole = v;
  }

  public String getDepartment() {
    return department;
  }

  public void setDepartment(String v) {
    department = v;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String v) {
    location = v;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String v) {
    category = v;
  }

  public String getSubject() {
    return subject;
  }

  public void setSubject(String v) {
    subject = v;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String v) {
    description = v;
  }

  public RequestStatus getStatus() {
    return status;
  }

  public void setStatus(RequestStatus v) {
    status = v;
  }

  public String getAdminComment() {
    return adminComment;
  }

  public void setAdminComment(String v) {
    adminComment = v;
  }

  public String getResolvedBy() {
    return resolvedBy;
  }

  public void setResolvedBy(String v) {
    resolvedBy = v;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime v) {
    createdAt = v;
  }
}
