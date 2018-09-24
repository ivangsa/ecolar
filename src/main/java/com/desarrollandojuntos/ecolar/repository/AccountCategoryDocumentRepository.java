package com.desarrollandojuntos.ecolar.repository;

import com.desarrollandojuntos.ecolar.domain.AccountCategory;
import com.desarrollandojuntos.ecolar.domain.AccountCategoryDocument;

import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the AccountCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountCategoryDocumentRepository extends MongoRepository<AccountCategoryDocument, String> {

	Optional<AccountCategoryDocument> findOneByUsername(String username);
}
