package com.desarrollandojuntos.ecolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.desarrollandojuntos.ecolar.domain.EventCategory;
import com.desarrollandojuntos.ecolar.repository.EventCategoryRepository;
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
 * REST controller for managing EventCategory.
 */
@RestController
@RequestMapping("/api")
public class EventCategoryResource {

    private final Logger log = LoggerFactory.getLogger(EventCategoryResource.class);

    private static final String ENTITY_NAME = "eventCategory";

    private final EventCategoryRepository eventCategoryRepository;

    public EventCategoryResource(EventCategoryRepository eventCategoryRepository) {
        this.eventCategoryRepository = eventCategoryRepository;
    }

    /**
     * POST  /event-categories : Create a new eventCategory.
     *
     * @param eventCategory the eventCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new eventCategory, or with status 400 (Bad Request) if the eventCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/event-categories")
    @Timed
    public ResponseEntity<EventCategory> createEventCategory(@RequestBody EventCategory eventCategory) throws URISyntaxException {
        log.debug("REST request to save EventCategory : {}", eventCategory);
        if (eventCategory.getId() != null) {
            throw new BadRequestAlertException("A new eventCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EventCategory result = eventCategoryRepository.save(eventCategory);
        return ResponseEntity.created(new URI("/api/event-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /event-categories : Updates an existing eventCategory.
     *
     * @param eventCategory the eventCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated eventCategory,
     * or with status 400 (Bad Request) if the eventCategory is not valid,
     * or with status 500 (Internal Server Error) if the eventCategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/event-categories")
    @Timed
    public ResponseEntity<EventCategory> updateEventCategory(@RequestBody EventCategory eventCategory) throws URISyntaxException {
        log.debug("REST request to update EventCategory : {}", eventCategory);
        if (eventCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EventCategory result = eventCategoryRepository.save(eventCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, eventCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /event-categories : get all the eventCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of eventCategories in body
     */
    @GetMapping("/event-categories")
    @Timed
    public List<EventCategory> getAllEventCategories() {
        log.debug("REST request to get all EventCategories");
        return eventCategoryRepository.findAll();
    }

    /**
     * GET  /event-categories/:id : get the "id" eventCategory.
     *
     * @param id the id of the eventCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the eventCategory, or with status 404 (Not Found)
     */
    @GetMapping("/event-categories/{id}")
    @Timed
    public ResponseEntity<EventCategory> getEventCategory(@PathVariable String id) {
        log.debug("REST request to get EventCategory : {}", id);
        Optional<EventCategory> eventCategory = eventCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(eventCategory);
    }

    /**
     * DELETE  /event-categories/:id : delete the "id" eventCategory.
     *
     * @param id the id of the eventCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/event-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteEventCategory(@PathVariable String id) {
        log.debug("REST request to delete EventCategory : {}", id);

        eventCategoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
