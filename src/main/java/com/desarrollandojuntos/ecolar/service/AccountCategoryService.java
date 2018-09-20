package com.desarrollandojuntos.ecolar.service;

import com.desarrollandojuntos.ecolar.domain.AccountCategory;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing AccountCategory.
 */
public interface AccountCategoryService {

	/**
	 * 
	 * @return
	 */
	AccountCategory getRootCategory();

	/**
	 * 
	 * @param root
	 * @param id
	 * @return
	 */
	AccountCategory findChildInRootCategory(AccountCategory root, String id);

	/**
	 * 
	 * @param root
	 * @param id
	 * @return
	 */
	AccountCategory findParentInRootCategory(AccountCategory root, String id);

	/**
     * Save a accountCategory.
     *
     * @param accountCategory the entity to save
     * @return the persisted entity
     */
    AccountCategory save(AccountCategory accountCategory);

    /**
     * Get all the accountCategories.
     *
     * @return the list of entities
     */
    List<AccountCategory> findAll();


    /**
     * Get the "id" accountCategory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<AccountCategory> findOne(String id);

    /**
     * Delete the "id" accountCategory.
     *
     * @param id the id of the entity
     */
    void delete(String id);



}
