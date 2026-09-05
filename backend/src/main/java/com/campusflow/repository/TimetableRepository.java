package com.campusflow.repository;
import com.campusflow.model.TimetableEntry; import org.springframework.data.mongodb.repository.MongoRepository;
public interface TimetableRepository extends MongoRepository<TimetableEntry,String> {  }