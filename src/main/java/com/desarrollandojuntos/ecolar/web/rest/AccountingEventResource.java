package com.desarrollandojuntos.ecolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.desarrollandojuntos.ecolar.domain.AccountingEvent;
import com.desarrollandojuntos.ecolar.repository.AccountingEventRepository;
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
 * REST controller for managing AccountingEvent.
 */
@RestController
@RequestMapping("/api")
public class AccountingEventResource {

    private final Logger log = LoggerFactory.getLogger(AccountingEventResource.class);

    private static final String ENTITY_NAME = "accountingEvent";

    private final AccountingEventRepository accountingEventRepository;

    public AccountingEventResource(AccountingEventRepository accountingEventRepository) {
        this.accountingEventRepository = accountingEventRepository;
    }

    /**
     * POST  /accounting-events : Create a new accountingEvent.
     *
     * @param accountingEvent the accountingEvent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new accountingEvent, or with status 400 (Bad Request) if the accountingEvent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/accounting-events")
    @Timed
    public ResponseEntity<AccountingEvent> createAccountingEvent(@RequestBody AccountingEvent accountingEvent) throws URISyntaxException {
        log.debug("REST request to save AccountingEvent : {}", accountingEvent);
        if (accountingEvent.getId() != null) {
            throw new BadRequestAlertException("A new accountingEvent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccountingEvent result = accountingEventRepository.save(accountingEvent);
        return ResponseEntity.created(new URI("/api/accounting-events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /accounting-events : Updates an existing accountingEvent.
     *
     * @param accountingEvent the accountingEvent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated accountingEvent,
     * or with status 400 (Bad Request) if the accountingEvent is not valid,
     * or with status 500 (Internal Server Error) if the accountingEvent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/accounting-events")
    @Timed
    public ResponseEntity<AccountingEvent> updateAccountingEvent(@RequestBody AccountingEvent accountingEvent) throws URISyntaxException {
        log.debug("REST request to update AccountingEvent : {}", accountingEvent);
        if (accountingEvent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AccountingEvent result = accountingEventRepository.save(accountingEvent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, accountingEvent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /accounting-events : get all the accountingEvents.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of accountingEvents in body
     */
    @GetMapping("/accounting-events")
    @Timed
    public List<AccountingEvent> getAllAccountingEvents(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all AccountingEvents");
        return accountingEventRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /accounting-events/:id : get the "id" accountingEvent.
     *
     * @param id the id of the accountingEvent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the accountingEvent, or with status 404 (Not Found)
     */
    @GetMapping("/accounting-events/{id}")
    @Timed
    public ResponseEntity<AccountingEvent> getAccountingEvent(@PathVariable String id) {
        log.debug("REST request to get AccountingEvent : {}", id);
        Optional<AccountingEvent> accountingEvent = accountingEventRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(accountingEvent);
    }

    /**
     * DELETE  /accounting-events/:id : delete the "id" accountingEvent.
     *
     * @param id the id of the accountingEvent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/accounting-events/{id}")
    @Timed
    public ResponseEntity<Void> deleteAccountingEvent(@PathVariable String id) {
        log.debug("REST request to delete AccountingEvent : {}", id);

        accountingEventRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
