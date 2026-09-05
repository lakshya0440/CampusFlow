package com.campusflow.repository;
import com.campusflow.model.Assignment; import org.springframework.data.mongodb.repository.MongoRepository;
public interface AssignmentRepository extends MongoRepository<Assignment,String> {  }