package com.campusflow.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("notices")
public class Notice {
  @Id
  private String id;
  private String title;
  private String content;
  private String category;
  private String audience;
  private String createdBy;
  private LocalDateTime createdAt = LocalDateTime.now();

  public String getId() {
    return id;
  }

  public void setId(String v) {
    id = v;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String v) {
    title = v;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String v) {
    content = v;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String v) {
    category = v;
  }

  public String getAudience() {
    return audience;
  }

  public void setAudience(String v) {
    audience = v;
  }

  public String getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(String v) {
    createdBy = v;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime v) {
    createdAt = v;
  }
}
