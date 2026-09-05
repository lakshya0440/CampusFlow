package com.campusflow.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoDatabaseInitializer {

    @Bean
    CommandLineRunner initializeCampusFlowCollections(MongoTemplate mongoTemplate) {
        return args -> {
            List<String> collections = List.of(
                    "users",
                    "courses",
                    "assignments",
                    "notices",
                    "events",
                    "timetable",
                    "campus_requests"
            );

            for (String collection : collections) {
                if (!mongoTemplate.collectionExists(collection)) {
                    mongoTemplate.createCollection(collection);
                }
            }
        };
    }
}
