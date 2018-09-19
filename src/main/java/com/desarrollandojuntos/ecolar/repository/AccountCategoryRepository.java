package com.desarrollandojuntos.ecolar.repository;

import com.desarrollandojuntos.ecolar.domain.AccountCategory;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the AccountCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountCategoryRepository extends MongoRepository<AccountCategory, String> {

}
