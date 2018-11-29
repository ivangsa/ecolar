package com.desarrollandojuntos.ecolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.desarrollandojuntos.ecolar.domain.AccountCategories;
import com.desarrollandojuntos.ecolar.repository.AccountCategoriesRepository;
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
 * REST controller for managing AccountCategories.
 */
@RestController
@RequestMapping("/api")
public class AccountCategoriesResource {

    private final Logger log = LoggerFactory.getLogger(AccountCategoriesResource.class);

    private static final String ENTITY_NAME = "accountCategories";

    private final AccountCategoriesRepository accountCategoriesRepository;

    public AccountCategoriesResource(AccountCategoriesRepository accountCategoriesRepository) {
        this.accountCategoriesRepository = accountCategoriesRepository;
    }

    /**
     * POST  /account-categories : Create a new accountCategories.
     *
     * @param accountCategories the accountCategories to create
     * @return the ResponseEntity with status 201 (Created) and with body the new accountCategories, or with status 400 (Bad Request) if the accountCategories has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/account-categories")
    @Timed
    public ResponseEntity<AccountCategories> createAccountCategories(@RequestBody AccountCategories accountCategories) throws URISyntaxException {
        log.debug("REST request to save AccountCategories : {}", accountCategories);
        if (accountCategories.getId() != null) {
            throw new BadRequestAlertException("A new accountCategories cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccountCategories result = accountCategoriesRepository.save(accountCategories);
        return ResponseEntity.created(new URI("/api/account-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /account-categories : Updates an existing accountCategories.
     *
     * @param accountCategories the accountCategories to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated accountCategories,
     * or with status 400 (Bad Request) if the accountCategories is not valid,
     * or with status 500 (Internal Server Error) if the accountCategories couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/account-categories")
    @Timed
    public ResponseEntity<AccountCategories> updateAccountCategories(@RequestBody AccountCategories accountCategories) throws URISyntaxException {
        log.debug("REST request to update AccountCategories : {}", accountCategories);
        if (accountCategories.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AccountCategories result = accountCategoriesRepository.save(accountCategories);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, accountCategories.getId().toString()))
            .body(result);
    }

    /**
     * GET  /account-categories : get all the accountCategories.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of accountCategories in body
     */
    @GetMapping("/account-categories")
    @Timed
    public List<AccountCategories> getAllAccountCategories(@RequestParam(required = false) String filter) {
        if ("household-is-null".equals(filter)) {
            log.debug("REST request to get all AccountCategoriess where household is null");
            return StreamSupport
                .stream(accountCategoriesRepository.findAll().spliterator(), false)
                .filter(accountCategories -> accountCategories.getHousehold() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all AccountCategories");
        return accountCategoriesRepository.findAll();
    }

    /**
     * GET  /account-categories/:id : get the "id" accountCategories.
     *
     * @param id the id of the accountCategories to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the accountCategories, or with status 404 (Not Found)
     */
    @GetMapping("/account-categories/{id}")
    @Timed
    public ResponseEntity<AccountCategories> getAccountCategories(@PathVariable String id) {
        log.debug("REST request to get AccountCategories : {}", id);
        Optional<AccountCategories> accountCategories = accountCategoriesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(accountCategories);
    }

    /**
     * DELETE  /account-categories/:id : delete the "id" accountCategories.
     *
     * @param id the id of the accountCategories to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/account-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteAccountCategories(@PathVariable String id) {
        log.debug("REST request to delete AccountCategories : {}", id);

        accountCategoriesRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
