package com.campusflow.repository;
import com.campusflow.model.User; import org.springframework.data.mongodb.repository.MongoRepository;
public interface UserRepository extends MongoRepository<User,String> { java.util.Optional<User> findByEmail(String email); }