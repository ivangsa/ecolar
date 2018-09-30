package com.desarrollandojuntos.ecolar.repository;

import com.desarrollandojuntos.ecolar.domain.EAccount;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the EAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EAccountRepository extends MongoRepository<EAccount, String> {

}
