package com.desarrollandojuntos.ecolar.repository;

import com.desarrollandojuntos.ecolar.domain.AccountCategories;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the AccountCategories entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountCategoriesRepository extends MongoRepository<AccountCategories, String> {

}
