package com.desarrollandojuntos.ecolar.repository;

import com.desarrollandojuntos.ecolar.domain.HouseHold;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the HouseHold entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HouseHoldRepository extends MongoRepository<HouseHold, String> {
    @Query("{}")
    Page<HouseHold> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<HouseHold> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<HouseHold> findOneWithEagerRelationships(String id);

}
