package com.desarrollandojuntos.ecolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.desarrollandojuntos.ecolar.domain.UserPreferences;
import com.desarrollandojuntos.ecolar.repository.UserPreferencesRepository;
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
 * REST controller for managing UserPreferences.
 */
@RestController
@RequestMapping("/api")
public class UserPreferencesResource {

    private final Logger log = LoggerFactory.getLogger(UserPreferencesResource.class);

    private static final String ENTITY_NAME = "userPreferences";

    private UserPreferencesRepository userPreferencesRepository;

    public UserPreferencesResource(UserPreferencesRepository userPreferencesRepository) {
        this.userPreferencesRepository = userPreferencesRepository;
    }

    /**
     * POST  /user-preferences : Create a new userPreferences.
     *
     * @param userPreferences the userPreferences to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userPreferences, or with status 400 (Bad Request) if the userPreferences has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-preferences")
    @Timed
    public ResponseEntity<UserPreferences> createUserPreferences(@RequestBody UserPreferences userPreferences) throws URISyntaxException {
        log.debug("REST request to save UserPreferences : {}", userPreferences);
        if (userPreferences.getId() != null) {
            throw new BadRequestAlertException("A new userPreferences cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserPreferences result = userPreferencesRepository.save(userPreferences);
        return ResponseEntity.created(new URI("/api/user-preferences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-preferences : Updates an existing userPreferences.
     *
     * @param userPreferences the userPreferences to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userPreferences,
     * or with status 400 (Bad Request) if the userPreferences is not valid,
     * or with status 500 (Internal Server Error) if the userPreferences couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-preferences")
    @Timed
    public ResponseEntity<UserPreferences> updateUserPreferences(@RequestBody UserPreferences userPreferences) throws URISyntaxException {
        log.debug("REST request to update UserPreferences : {}", userPreferences);
        if (userPreferences.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserPreferences result = userPreferencesRepository.save(userPreferences);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userPreferences.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-preferences : get all the userPreferences.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userPreferences in body
     */
    @GetMapping("/user-preferences")
    @Timed
    public List<UserPreferences> getAllUserPreferences() {
        log.debug("REST request to get all UserPreferences");
        return userPreferencesRepository.findAll();
    }

    /**
     * GET  /user-preferences/:id : get the "id" userPreferences.
     *
     * @param id the id of the userPreferences to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userPreferences, or with status 404 (Not Found)
     */
    @GetMapping("/user-preferences/{id}")
    @Timed
    public ResponseEntity<UserPreferences> getUserPreferences(@PathVariable String id) {
        log.debug("REST request to get UserPreferences : {}", id);
        Optional<UserPreferences> userPreferences = userPreferencesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userPreferences);
    }

    /**
     * DELETE  /user-preferences/:id : delete the "id" userPreferences.
     *
     * @param id the id of the userPreferences to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-preferences/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserPreferences(@PathVariable String id) {
        log.debug("REST request to delete UserPreferences : {}", id);

        userPreferencesRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
