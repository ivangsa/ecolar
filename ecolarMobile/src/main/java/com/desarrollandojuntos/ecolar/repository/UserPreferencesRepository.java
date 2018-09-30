package com.desarrollandojuntos.ecolar.repository;

import com.desarrollandojuntos.ecolar.domain.UserPreferences;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the UserPreferences entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserPreferencesRepository extends MongoRepository<UserPreferences, String> {

}
