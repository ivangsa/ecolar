package com.desarrollandojuntos.ecolar.repository;

import com.desarrollandojuntos.ecolar.domain.AccountsDocument;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the AccountsDocument entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountsDocumentRepository extends MongoRepository<AccountsDocument, String> {

}
