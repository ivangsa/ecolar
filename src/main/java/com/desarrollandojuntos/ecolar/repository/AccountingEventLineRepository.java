package com.desarrollandojuntos.ecolar.repository;

import com.desarrollandojuntos.ecolar.domain.AccountingEventLine;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the AccountingEventLine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountingEventLineRepository extends MongoRepository<AccountingEventLine, String> {

}
