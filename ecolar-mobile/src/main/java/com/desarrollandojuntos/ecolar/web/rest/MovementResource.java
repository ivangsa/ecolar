package com.desarrollandojuntos.ecolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.desarrollandojuntos.ecolar.domain.Movement;
import com.desarrollandojuntos.ecolar.service.MovementService;
import com.desarrollandojuntos.ecolar.web.rest.errors.BadRequestAlertException;
import com.desarrollandojuntos.ecolar.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Movement.
 */
@RestController
@RequestMapping("/api")
public class MovementResource {

    private final Logger log = LoggerFactory.getLogger(MovementResource.class);

    private static final String ENTITY_NAME = "movement";

    private final MovementService movementService;

    public MovementResource(MovementService movementService) {
        this.movementService = movementService;
    }

    /**
     * POST  /movements : Create a new movement.
     *
     * @param movement the movement to create
     * @return the ResponseEntity with status 201 (Created) and with body the new movement, or with status 400 (Bad Request) if the movement has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/movements")
    @Timed
    public ResponseEntity<Movement> createMovement(@Valid @RequestBody Movement movement) throws URISyntaxException {
        log.debug("REST request to save Movement : {}", movement);
        if (movement.getId() != null) {
            throw new BadRequestAlertException("A new movement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Movement result = movementService.save(movement);
        return ResponseEntity.created(new URI("/api/movements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /movements : Updates an existing movement.
     *
     * @param movement the movement to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated movement,
     * or with status 400 (Bad Request) if the movement is not valid,
     * or with status 500 (Internal Server Error) if the movement couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/movements")
    @Timed
    public ResponseEntity<Movement> updateMovement(@Valid @RequestBody Movement movement) throws URISyntaxException {
        log.debug("REST request to update Movement : {}", movement);
        if (movement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Movement result = movementService.save(movement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, movement.getId().toString()))
            .body(result);
    }

    /**
     * GET  /movements : get all the movements.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of movements in body
     */
    @GetMapping("/movements")
    @Timed
    public List<Movement> getAllMovements(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Movements");
        return movementService.findAll();
    }

    /**
     * GET  /movements/:id : get the "id" movement.
     *
     * @param id the id of the movement to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the movement, or with status 404 (Not Found)
     */
    @GetMapping("/movements/{id}")
    @Timed
    public ResponseEntity<Movement> getMovement(@PathVariable String id) {
        log.debug("REST request to get Movement : {}", id);
        Optional<Movement> movement = movementService.findOne(id);
        return ResponseUtil.wrapOrNotFound(movement);
    }

    /**
     * DELETE  /movements/:id : delete the "id" movement.
     *
     * @param id the id of the movement to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/movements/{id}")
    @Timed
    public ResponseEntity<Void> deleteMovement(@PathVariable String id) {
        log.debug("REST request to delete Movement : {}", id);
        movementService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
