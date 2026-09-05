package com.campusflow.repository;
import com.campusflow.model.CampusRequest; import org.springframework.data.mongodb.repository.MongoRepository;
public interface CampusRequestRepository extends MongoRepository<CampusRequest,String> { java.util.List<CampusRequest> findByRequesterId(String requesterId); }