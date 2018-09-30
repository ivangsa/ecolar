package com.desarrollandojuntos.ecolar.repository;

import com.desarrollandojuntos.ecolar.domain.Movement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the Movement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovementRepository extends MongoRepository<Movement, String> {
    @Query("{}")
    Page<Movement> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Movement> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Movement> findOneWithEagerRelationships(String id);

}
