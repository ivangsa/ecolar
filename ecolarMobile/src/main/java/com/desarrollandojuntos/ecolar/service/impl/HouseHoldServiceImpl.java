package com.desarrollandojuntos.ecolar.service.impl;

import com.desarrollandojuntos.ecolar.service.HouseHoldService;
import com.desarrollandojuntos.ecolar.domain.HouseHold;
import com.desarrollandojuntos.ecolar.repository.HouseHoldRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing HouseHold.
 */
@Service
public class HouseHoldServiceImpl implements HouseHoldService {

    private final Logger log = LoggerFactory.getLogger(HouseHoldServiceImpl.class);

    private HouseHoldRepository houseHoldRepository;

    public HouseHoldServiceImpl(HouseHoldRepository houseHoldRepository) {
        this.houseHoldRepository = houseHoldRepository;
    }

    /**
     * Save a houseHold.
     *
     * @param houseHold the entity to save
     * @return the persisted entity
     */
    @Override
    public HouseHold save(HouseHold houseHold) {
        log.debug("Request to save HouseHold : {}", houseHold);
        return houseHoldRepository.save(houseHold);
    }

    /**
     * Get all the houseHolds.
     *
     * @return the list of entities
     */
    @Override
    public List<HouseHold> findAll() {
        log.debug("Request to get all HouseHolds");
        return houseHoldRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the HouseHold with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<HouseHold> findAllWithEagerRelationships(Pageable pageable) {
        return houseHoldRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one houseHold by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<HouseHold> findOne(String id) {
        log.debug("Request to get HouseHold : {}", id);
        return houseHoldRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the houseHold by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete HouseHold : {}", id);
        houseHoldRepository.deleteById(id);
    }
}
