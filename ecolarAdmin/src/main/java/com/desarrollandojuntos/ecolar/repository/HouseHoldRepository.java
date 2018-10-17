package com.desarrollandojuntos.ecolar.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.desarrollandojuntos.ecolar.domain.HouseHold;

/**
 * Spring Data MongoDB repository for the HouseHold entity.
 */
@Repository
public interface HouseHoldRepository extends MongoRepository<HouseHold, String> {

    Optional<HouseHold> findOneByName(String name);

    @Query("{'members.username' : ?0}")
    Optional<HouseHold> findOneByUsername(String username);

}
