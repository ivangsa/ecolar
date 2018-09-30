package com.desarrollandojuntos.ecolar.service;

import com.desarrollandojuntos.ecolar.domain.Movement;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Movement.
 */
public interface MovementService {

    /**
     * Save a movement.
     *
     * @param movement the entity to save
     * @return the persisted entity
     */
    Movement save(Movement movement);

    /**
     * Get all the movements.
     *
     * @return the list of entities
     */
    List<Movement> findAll();

    /**
     * Get all the Movement with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<Movement> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" movement.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Movement> findOne(String id);

    /**
     * Delete the "id" movement.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
