package com.desarrollandojuntos.ecolar.service.impl;

import com.desarrollandojuntos.ecolar.service.AccountCategoryService;
import com.desarrollandojuntos.ecolar.domain.AccountCategory;
import com.desarrollandojuntos.ecolar.repository.AccountCategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing AccountCategory.
 */
@Service
public class AccountCategoryServiceImpl implements AccountCategoryService {

    private final Logger log = LoggerFactory.getLogger(AccountCategoryServiceImpl.class);

    private final AccountCategoryRepository accountCategoryRepository;

    public AccountCategoryServiceImpl(AccountCategoryRepository accountCategoryRepository) {
        this.accountCategoryRepository = accountCategoryRepository;
    }

    /**
     * Save a accountCategory.
     *
     * @param accountCategory the entity to save
     * @return the persisted entity
     */
    @Override
    public AccountCategory save(AccountCategory accountCategory) {
        log.debug("Request to save AccountCategory : {}", accountCategory);        return accountCategoryRepository.save(accountCategory);
    }

    /**
     * Get all the accountCategories.
     *
     * @return the list of entities
     */
    @Override
    public List<AccountCategory> findAll() {
        log.debug("Request to get all AccountCategories");
        return accountCategoryRepository.findAll();
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
        return accountCategoryRepository.findById(id);
    }

    /**
     * Delete the accountCategory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete AccountCategory : {}", id);
        accountCategoryRepository.deleteById(id);
    }
}
