package com.campusflow.repository;
import com.campusflow.model.Notice; import org.springframework.data.mongodb.repository.MongoRepository;
public interface NoticeRepository extends MongoRepository<Notice,String> {  }