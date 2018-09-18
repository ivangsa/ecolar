package com.desarrollandojuntos.ecolar.repository;

import com.desarrollandojuntos.ecolar.domain.AccountingEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the AccountingEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountingEventRepository extends MongoRepository<AccountingEvent, String> {
    @Query("{}")
    Page<AccountingEvent> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<AccountingEvent> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<AccountingEvent> findOneWithEagerRelationships(String id);

}
