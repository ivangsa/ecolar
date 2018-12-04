package com.desarrollandojuntos.ecolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.desarrollandojuntos.ecolar.domain.HouseHold;
import com.desarrollandojuntos.ecolar.service.HouseHoldService;
import com.desarrollandojuntos.ecolar.web.rest.errors.BadRequestAlertException;
import com.desarrollandojuntos.ecolar.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing HouseHold.
 */
@RestController
@RequestMapping("/api")
public class HouseHoldResource {

    private final Logger log = LoggerFactory.getLogger(HouseHoldResource.class);

    private static final String ENTITY_NAME = "houseHold";

    private HouseHoldService houseHoldService;

    public HouseHoldResource(HouseHoldService houseHoldService) {
        this.houseHoldService = houseHoldService;
    }

    /**
     * POST  /house-holds : Create a new houseHold.
     *
     * @param houseHold the houseHold to create
     * @return the ResponseEntity with status 201 (Created) and with body the new houseHold, or with status 400 (Bad Request) if the houseHold has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/house-holds")
    @Timed
    public ResponseEntity<HouseHold> createHouseHold(@RequestBody HouseHold houseHold) throws URISyntaxException {
        log.debug("REST request to save HouseHold : {}", houseHold);
        if (houseHold.getId() != null) {
            throw new BadRequestAlertException("A new houseHold cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HouseHold result = houseHoldService.save(houseHold);
        return ResponseEntity.created(new URI("/api/house-holds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /house-holds : Updates an existing houseHold.
     *
     * @param houseHold the houseHold to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated houseHold,
     * or with status 400 (Bad Request) if the houseHold is not valid,
     * or with status 500 (Internal Server Error) if the houseHold couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/house-holds")
    @Timed
    public ResponseEntity<HouseHold> updateHouseHold(@RequestBody HouseHold houseHold) throws URISyntaxException {
        log.debug("REST request to update HouseHold : {}", houseHold);
        if (houseHold.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HouseHold result = houseHoldService.save(houseHold);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, houseHold.getId().toString()))
            .body(result);
    }

    /**
     * GET  /house-holds : get all the houseHolds.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of houseHolds in body
     */
    @GetMapping("/house-holds")
    @Timed
    public List<HouseHold> getAllHouseHolds(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all HouseHolds");
        return houseHoldService.findAll();
    }

    /**
     * GET  /house-holds/:id : get the "id" houseHold.
     *
     * @param id the id of the houseHold to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the houseHold, or with status 404 (Not Found)
     */
    @GetMapping("/house-holds/{id}")
    @Timed
    public ResponseEntity<HouseHold> getHouseHold(@PathVariable String id) {
        log.debug("REST request to get HouseHold : {}", id);
        Optional<HouseHold> houseHold = houseHoldService.findOne(id);
        return ResponseUtil.wrapOrNotFound(houseHold);
    }

    /**
     * DELETE  /house-holds/:id : delete the "id" houseHold.
     *
     * @param id the id of the houseHold to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/house-holds/{id}")
    @Timed
    public ResponseEntity<Void> deleteHouseHold(@PathVariable String id) {
        log.debug("REST request to delete HouseHold : {}", id);
        houseHoldService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
