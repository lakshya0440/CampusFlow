package com.campusflow.repository;
import com.campusflow.model.Event; import org.springframework.data.mongodb.repository.MongoRepository;
public interface EventRepository extends MongoRepository<Event,String> {  }