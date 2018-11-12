package com.desarrollandojuntos.ecolar.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.desarrollandojuntos.ecolar.domain.Category;
import com.desarrollandojuntos.ecolar.domain.EAccount;
import com.desarrollandojuntos.ecolar.domain.HouseHold;

/**
 * Service Interface for managing HouseHold.
 */
public interface HouseHoldService {

    /**
     * Save a houseHold.
     *
     * @param houseHold the entity to save
     * @return the persisted entity
     */
    HouseHold save(HouseHold houseHold);

    /**
     * Get all the houseHolds.
     *
     * @return the list of entities
     */
    List<HouseHold> findAll();

    /**
     * Get all the HouseHold with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<HouseHold> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" houseHold.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<HouseHold> findOne(String id);

    /**
     * Delete the "id" houseHold.
     *
     * @param id the id of the entity
     */
    void delete(String id);

    /**
     *
     * @param houseHold
     * @param category
     * @return
     */
    Optional<Category> findCategory(HouseHold houseHold, String categoryId);

    /**
     *
     * @param houseHoldId
     * @return
     */
    List<Category> getCategoriesAsList(String houseHoldId);

    /**
     *
     * @param houseHold
     * @param category
     * @return
     */
    HouseHold saveCategory(HouseHold houseHold, Category category);

    /**
     *
     * @param houseHold
     * @param categoryId
     * @return
     */
    HouseHold removeCategory(HouseHold houseHold, String categoryId);

        /**
     *
     * @param houseHold
     * @param account
     * @return
     */
    Optional<EAccount> findEAccount(HouseHold houseHold, String accountId);

    /**
     *
     * @param houseHoldId
     * @return
     */
    List<EAccount> getEAccountsAsList(String houseHoldId);

    /**
     *
     * @param houseHold
     * @param account
     * @return
     */
    HouseHold saveEAccount(HouseHold houseHold, EAccount account);

    /**
     *
     * @param houseHold
     * @param accountId
     * @return
     */
    HouseHold removeEAccount(HouseHold houseHold, String accountId);

}
