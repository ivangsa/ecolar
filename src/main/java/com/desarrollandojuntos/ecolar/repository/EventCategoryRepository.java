package com.desarrollandojuntos.ecolar.repository;

import com.desarrollandojuntos.ecolar.domain.EventCategory;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the EventCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventCategoryRepository extends MongoRepository<EventCategory, String> {

}
