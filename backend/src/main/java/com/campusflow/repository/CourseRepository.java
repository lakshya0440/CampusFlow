package com.campusflow.repository;
import com.campusflow.model.Course; import org.springframework.data.mongodb.repository.MongoRepository;
public interface CourseRepository extends MongoRepository<Course,String> {  }