package com.desarrollandojuntos.ecolar.service.impl;

import com.desarrollandojuntos.ecolar.service.MovementService;
import com.desarrollandojuntos.ecolar.domain.Movement;
import com.desarrollandojuntos.ecolar.repository.MovementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Movement.
 */
@Service
public class MovementServiceImpl implements MovementService {

    private final Logger log = LoggerFactory.getLogger(MovementServiceImpl.class);

    private final MovementRepository movementRepository;

    public MovementServiceImpl(MovementRepository movementRepository) {
        this.movementRepository = movementRepository;
    }

    /**
     * Save a movement.
     *
     * @param movement the entity to save
     * @return the persisted entity
     */
    @Override
    public Movement save(Movement movement) {
        log.debug("Request to save Movement : {}", movement);
        return movementRepository.save(movement);
    }

    /**
     * Get all the movements.
     *
     * @return the list of entities
     */
    @Override
    public List<Movement> findAll() {
        log.debug("Request to get all Movements");
        return movementRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the Movement with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<Movement> findAllWithEagerRelationships(Pageable pageable) {
        return movementRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one movement by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<Movement> findOne(String id) {
        log.debug("Request to get Movement : {}", id);
        return movementRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the movement by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Movement : {}", id);
        movementRepository.deleteById(id);
    }
}
