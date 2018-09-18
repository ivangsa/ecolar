package com.desarrollandojuntos.ecolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.desarrollandojuntos.ecolar.domain.AccountingEventLine;
import com.desarrollandojuntos.ecolar.repository.AccountingEventLineRepository;
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
 * REST controller for managing AccountingEventLine.
 */
@RestController
@RequestMapping("/api")
public class AccountingEventLineResource {

    private final Logger log = LoggerFactory.getLogger(AccountingEventLineResource.class);

    private static final String ENTITY_NAME = "accountingEventLine";

    private final AccountingEventLineRepository accountingEventLineRepository;

    public AccountingEventLineResource(AccountingEventLineRepository accountingEventLineRepository) {
        this.accountingEventLineRepository = accountingEventLineRepository;
    }

    /**
     * POST  /accounting-event-lines : Create a new accountingEventLine.
     *
     * @param accountingEventLine the accountingEventLine to create
     * @return the ResponseEntity with status 201 (Created) and with body the new accountingEventLine, or with status 400 (Bad Request) if the accountingEventLine has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/accounting-event-lines")
    @Timed
    public ResponseEntity<AccountingEventLine> createAccountingEventLine(@RequestBody AccountingEventLine accountingEventLine) throws URISyntaxException {
        log.debug("REST request to save AccountingEventLine : {}", accountingEventLine);
        if (accountingEventLine.getId() != null) {
            throw new BadRequestAlertException("A new accountingEventLine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccountingEventLine result = accountingEventLineRepository.save(accountingEventLine);
        return ResponseEntity.created(new URI("/api/accounting-event-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /accounting-event-lines : Updates an existing accountingEventLine.
     *
     * @param accountingEventLine the accountingEventLine to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated accountingEventLine,
     * or with status 400 (Bad Request) if the accountingEventLine is not valid,
     * or with status 500 (Internal Server Error) if the accountingEventLine couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/accounting-event-lines")
    @Timed
    public ResponseEntity<AccountingEventLine> updateAccountingEventLine(@RequestBody AccountingEventLine accountingEventLine) throws URISyntaxException {
        log.debug("REST request to update AccountingEventLine : {}", accountingEventLine);
        if (accountingEventLine.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AccountingEventLine result = accountingEventLineRepository.save(accountingEventLine);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, accountingEventLine.getId().toString()))
            .body(result);
    }

    /**
     * GET  /accounting-event-lines : get all the accountingEventLines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of accountingEventLines in body
     */
    @GetMapping("/accounting-event-lines")
    @Timed
    public List<AccountingEventLine> getAllAccountingEventLines() {
        log.debug("REST request to get all AccountingEventLines");
        return accountingEventLineRepository.findAll();
    }

    /**
     * GET  /accounting-event-lines/:id : get the "id" accountingEventLine.
     *
     * @param id the id of the accountingEventLine to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the accountingEventLine, or with status 404 (Not Found)
     */
    @GetMapping("/accounting-event-lines/{id}")
    @Timed
    public ResponseEntity<AccountingEventLine> getAccountingEventLine(@PathVariable String id) {
        log.debug("REST request to get AccountingEventLine : {}", id);
        Optional<AccountingEventLine> accountingEventLine = accountingEventLineRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(accountingEventLine);
    }

    /**
     * DELETE  /accounting-event-lines/:id : delete the "id" accountingEventLine.
     *
     * @param id the id of the accountingEventLine to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/accounting-event-lines/{id}")
    @Timed
    public ResponseEntity<Void> deleteAccountingEventLine(@PathVariable String id) {
        log.debug("REST request to delete AccountingEventLine : {}", id);

        accountingEventLineRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
