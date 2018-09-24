package com.desarrollandojuntos.ecolar.service.impl;

import com.desarrollandojuntos.ecolar.service.AccountCategoryService;

import org.apache.commons.lang3.StringUtils;

import com.desarrollandojuntos.ecolar.domain.AccountCategory;
import com.desarrollandojuntos.ecolar.domain.AccountCategoryDocument;
import com.desarrollandojuntos.ecolar.repository.AccountCategoryDocumentRepository;
import com.desarrollandojuntos.ecolar.security.SecurityUtils;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing AccountCategory.
 */
@Service
public class AccountCategoryServiceImpl implements AccountCategoryService {

    private final Logger log = LoggerFactory.getLogger(AccountCategoryServiceImpl.class);

    private final AccountCategoryDocumentRepository repository;

    public AccountCategoryServiceImpl(AccountCategoryDocumentRepository accountCategoryRepository) {
        this.repository = accountCategoryRepository;
    }
    
    @Override
    public AccountCategoryDocument getRootAccountCategoryDocument() {
    	log.info("getRootAccountCategory");
    	String username = SecurityUtils.getCurrentUserJWT().orElse("default");
    	Optional<AccountCategoryDocument> root = repository.findOneByUsername(username);
    	if(root.isPresent()) {
    		return root.get();
    	} else {
        	log.info("persisint new AccountCategoryDocument");
    		return repository.save(new AccountCategoryDocument().username(username));
    	}
    }
    
    private List<AccountCategory> getAllCategoriesAsList(Collection<AccountCategory> categories, List<AccountCategory> results) {
    	if(categories != null) {
    		for (AccountCategory accountCategory : categories) {
    			results.add(accountCategory);
				getAllCategoriesAsList(accountCategory.getCategories(), results);
			}
    	}
    	return results;
    }

    /**
     * Save a accountCategory.
     *
     * @param accountCategory the entity to save
     * @return the persisted entity
     */
    @Override
    public AccountCategory save(AccountCategory accountCategory) {
        log.debug("Request to save AccountCategory : {}", accountCategory);
        AccountCategoryDocument root = getRootAccountCategoryDocument();
        if(accountCategory.getId() != null) {

        } else {
        	String id = String.valueOf(System.currentTimeMillis());
        	accountCategory.setId(id);
    	}

        repository.save(root);
        return accountCategory;
    }

    /**
     * Get all the accountCategories.
     *
     * @return the list of entities
     */
    @Override
    public List<AccountCategory> findAll() {
        log.debug("Request to get all AccountCategories");
        AccountCategoryDocument root = getRootAccountCategoryDocument();
        return getAllCategoriesAsList(root.getCategories(), new ArrayList<>());
    }
    

    /**
     * Get one accountCategory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<AccountCategory> findOne(String id) {
        log.debug("Request to get AccountCategory : {}", id);
        AccountCategoryDocument root = getRootAccountCategoryDocument();
        return Optional.ofNullable(root.findAccountCategory(id));
    }

    /**
     * Delete the accountCategory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete AccountCategory : {}", id);
        AccountCategoryDocument root = getRootAccountCategoryDocument();
        removeAccountCategory(root, id);
        repository.save(root);
    }
}
