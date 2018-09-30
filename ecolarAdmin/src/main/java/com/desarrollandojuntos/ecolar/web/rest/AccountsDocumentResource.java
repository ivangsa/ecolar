package com.desarrollandojuntos.ecolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.desarrollandojuntos.ecolar.domain.AccountsDocument;
import com.desarrollandojuntos.ecolar.repository.AccountsDocumentRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing AccountsDocument.
 */
@RestController
@RequestMapping("/api")
public class AccountsDocumentResource {

    private final Logger log = LoggerFactory.getLogger(AccountsDocumentResource.class);

    private static final String ENTITY_NAME = "accountsDocument";

    private final AccountsDocumentRepository accountsDocumentRepository;

    public AccountsDocumentResource(AccountsDocumentRepository accountsDocumentRepository) {
        this.accountsDocumentRepository = accountsDocumentRepository;
    }

    /**
     * POST  /accounts-documents : Create a new accountsDocument.
     *
     * @param accountsDocument the accountsDocument to create
     * @return the ResponseEntity with status 201 (Created) and with body the new accountsDocument, or with status 400 (Bad Request) if the accountsDocument has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/accounts-documents")
    @Timed
    public ResponseEntity<AccountsDocument> createAccountsDocument(@RequestBody AccountsDocument accountsDocument) throws URISyntaxException {
        log.debug("REST request to save AccountsDocument : {}", accountsDocument);
        if (accountsDocument.getId() != null) {
            throw new BadRequestAlertException("A new accountsDocument cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccountsDocument result = accountsDocumentRepository.save(accountsDocument);
        return ResponseEntity.created(new URI("/api/accounts-documents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /accounts-documents : Updates an existing accountsDocument.
     *
     * @param accountsDocument the accountsDocument to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated accountsDocument,
     * or with status 400 (Bad Request) if the accountsDocument is not valid,
     * or with status 500 (Internal Server Error) if the accountsDocument couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/accounts-documents")
    @Timed
    public ResponseEntity<AccountsDocument> updateAccountsDocument(@RequestBody AccountsDocument accountsDocument) throws URISyntaxException {
        log.debug("REST request to update AccountsDocument : {}", accountsDocument);
        if (accountsDocument.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AccountsDocument result = accountsDocumentRepository.save(accountsDocument);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, accountsDocument.getId().toString()))
            .body(result);
    }

    /**
     * GET  /accounts-documents : get all the accountsDocuments.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of accountsDocuments in body
     */
    @GetMapping("/accounts-documents")
    @Timed
    public List<AccountsDocument> getAllAccountsDocuments(@RequestParam(required = false) String filter) {
        if ("household-is-null".equals(filter)) {
            log.debug("REST request to get all AccountsDocuments where household is null");
            return StreamSupport
                .stream(accountsDocumentRepository.findAll().spliterator(), false)
                .filter(accountsDocument -> accountsDocument.getHousehold() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all AccountsDocuments");
        return accountsDocumentRepository.findAll();
    }

    /**
     * GET  /accounts-documents/:id : get the "id" accountsDocument.
     *
     * @param id the id of the accountsDocument to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the accountsDocument, or with status 404 (Not Found)
     */
    @GetMapping("/accounts-documents/{id}")
    @Timed
    public ResponseEntity<AccountsDocument> getAccountsDocument(@PathVariable String id) {
        log.debug("REST request to get AccountsDocument : {}", id);
        Optional<AccountsDocument> accountsDocument = accountsDocumentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(accountsDocument);
    }

    /**
     * DELETE  /accounts-documents/:id : delete the "id" accountsDocument.
     *
     * @param id the id of the accountsDocument to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/accounts-documents/{id}")
    @Timed
    public ResponseEntity<Void> deleteAccountsDocument(@PathVariable String id) {
        log.debug("REST request to delete AccountsDocument : {}", id);

        accountsDocumentRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
