package com.campusflow.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("events")
public class Event {
  @Id
  private String id;
  private String title;
  private String description;
  private String venue;
  private String eventDate;
  private String category;
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

  public String getDescription() {
    return description;
  }

  public void setDescription(String v) {
    description = v;
  }

  public String getVenue() {
    return venue;
  }

  public void setVenue(String v) {
    venue = v;
  }

  public String getEventDate() {
    return eventDate;
  }

  public void setEventDate(String v) {
    eventDate = v;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String v) {
    category = v;
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
