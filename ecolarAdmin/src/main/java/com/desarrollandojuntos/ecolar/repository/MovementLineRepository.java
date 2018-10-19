package com.desarrollandojuntos.ecolar.repository;

import com.desarrollandojuntos.ecolar.domain.MovementLine;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the MovementLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovementLineRepository extends MongoRepository<MovementLine, String> {

}
