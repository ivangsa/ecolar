package com.desarrollandojuntos.ecolar.service;

import com.desarrollandojuntos.ecolar.domain.HouseHold;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

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
}
