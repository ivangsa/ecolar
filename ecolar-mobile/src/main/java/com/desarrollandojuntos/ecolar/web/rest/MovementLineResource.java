package com.desarrollandojuntos.ecolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.desarrollandojuntos.ecolar.domain.MovementLine;
import com.desarrollandojuntos.ecolar.repository.MovementLineRepository;
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
 * REST controller for managing MovementLine.
 */
@RestController
@RequestMapping("/api")
public class MovementLineResource {

    private final Logger log = LoggerFactory.getLogger(MovementLineResource.class);

    private static final String ENTITY_NAME = "movementLine";

    private final MovementLineRepository movementLineRepository;

    public MovementLineResource(MovementLineRepository movementLineRepository) {
        this.movementLineRepository = movementLineRepository;
    }

    /**
     * POST  /movement-lines : Create a new movementLine.
     *
     * @param movementLine the movementLine to create
     * @return the ResponseEntity with status 201 (Created) and with body the new movementLine, or with status 400 (Bad Request) if the movementLine has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/movement-lines")
    @Timed
    public ResponseEntity<MovementLine> createMovementLine(@RequestBody MovementLine movementLine) throws URISyntaxException {
        log.debug("REST request to save MovementLine : {}", movementLine);
        if (movementLine.getId() != null) {
            throw new BadRequestAlertException("A new movementLine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MovementLine result = movementLineRepository.save(movementLine);
        return ResponseEntity.created(new URI("/api/movement-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /movement-lines : Updates an existing movementLine.
     *
     * @param movementLine the movementLine to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated movementLine,
     * or with status 400 (Bad Request) if the movementLine is not valid,
     * or with status 500 (Internal Server Error) if the movementLine couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/movement-lines")
    @Timed
    public ResponseEntity<MovementLine> updateMovementLine(@RequestBody MovementLine movementLine) throws URISyntaxException {
        log.debug("REST request to update MovementLine : {}", movementLine);
        if (movementLine.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MovementLine result = movementLineRepository.save(movementLine);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, movementLine.getId().toString()))
            .body(result);
    }

    /**
     * GET  /movement-lines : get all the movementLines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of movementLines in body
     */
    @GetMapping("/movement-lines")
    @Timed
    public List<MovementLine> getAllMovementLines() {
        log.debug("REST request to get all MovementLines");
        return movementLineRepository.findAll();
    }

    /**
     * GET  /movement-lines/:id : get the "id" movementLine.
     *
     * @param id the id of the movementLine to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the movementLine, or with status 404 (Not Found)
     */
    @GetMapping("/movement-lines/{id}")
    @Timed
    public ResponseEntity<MovementLine> getMovementLine(@PathVariable String id) {
        log.debug("REST request to get MovementLine : {}", id);
        Optional<MovementLine> movementLine = movementLineRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(movementLine);
    }

    /**
     * DELETE  /movement-lines/:id : delete the "id" movementLine.
     *
     * @param id the id of the movementLine to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/movement-lines/{id}")
    @Timed
    public ResponseEntity<Void> deleteMovementLine(@PathVariable String id) {
        log.debug("REST request to delete MovementLine : {}", id);

        movementLineRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
