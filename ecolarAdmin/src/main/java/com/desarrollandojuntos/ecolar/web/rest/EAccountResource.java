package com.desarrollandojuntos.ecolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.desarrollandojuntos.ecolar.domain.EAccount;
import com.desarrollandojuntos.ecolar.domain.HouseHold;
import com.desarrollandojuntos.ecolar.web.rest.errors.BadRequestAlertException;
import com.desarrollandojuntos.ecolar.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.desarrollandojuntos.ecolar.service.HouseHoldService;


import java.net.URI;
import java.net.URISyntaxException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EAccount.
 */
@RestController
@RequestMapping("/api/house-holds/{houseHoldId}")
public class EAccountResource {

    private final Logger log = LoggerFactory.getLogger(EAccountResource.class);

    private static final String EACCOUNT_ENTITY_NAME = "eAccount";

    private HouseHoldService houseHoldService;

    public EAccountResource(HouseHoldService houseHoldService) {
        super();
        this.houseHoldService = houseHoldService;
    }

    /**
     * POST  /e-accounts : Create a new eAccount.
     *
     * @param eAccount the eAccount to create
     * @return the ResponseEntity with status 201 (Created) and with body the new eAccount, or with status 400 (Bad Request) if the eAccount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/e-accounts")
    @Timed
    public ResponseEntity<HouseHold> createEAccount(@PathVariable("houseHoldId") String houseHoldId, @RequestBody EAccount eAccount) throws URISyntaxException {
        log.debug("REST request to save EAccount : {} {}", houseHoldId, eAccount);
        Optional<HouseHold> houseHold = houseHoldService.findOne(houseHoldId);
        if(!houseHold.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (eAccount.getId() != null) {
            throw new BadRequestAlertException("A new eAccount cannot already have an ID", EACCOUNT_ENTITY_NAME, "idexists");
        }
        HouseHold result = houseHoldService.saveEAccount(houseHold.get(), eAccount);
        return ResponseEntity.created(new URI("/api/e-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(EACCOUNT_ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /e-accounts : Updates an existing eAccount.
     *
     * @param eAccount the eAccount to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated eAccount,
     * or with status 400 (Bad Request) if the eAccount is not valid,
     * or with status 500 (Internal Server Error) if the eAccount couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/e-accounts")
    @Timed
    public ResponseEntity<HouseHold> updateEAccount(@PathVariable("houseHoldId") String houseHoldId, @RequestBody EAccount eAccount) throws URISyntaxException {
        log.debug("REST request to update EAccount : {}", eAccount);
        Optional<HouseHold> houseHold = houseHoldService.findOne(houseHoldId);
        if(!houseHold.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (eAccount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", EACCOUNT_ENTITY_NAME, "idnull");
        }
        HouseHold result = houseHoldService.saveEAccount(houseHold.get(), eAccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(EACCOUNT_ENTITY_NAME, eAccount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /e-accounts : get all the categories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of categories in body
     */
    @GetMapping("/e-accounts")
    @Timed
    public List<EAccount> getAllEAccounts(@PathVariable("houseHoldId") String houseHoldId) {
        log.debug("REST request to get all EAccounts for {}");
        Optional<HouseHold> houseHold = houseHoldService.findOne(houseHoldId);
        if(!houseHold.isPresent()) {
            return Collections.emptyList();
        }
        return houseHoldService.getEAccountsAsList(houseHoldId);
    }

    /**
     * GET  /e-accounts/:id : get the "id" eAccount.
     *
     * @param id the id of the eAccount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the eAccount, or with status 404 (Not Found)
     */
    @GetMapping("/e-accounts/{id}")
    @Timed
    public ResponseEntity<EAccount> getEAccount(@PathVariable("houseHoldId") String houseHoldId, @PathVariable String id) {
        log.debug("REST request to get EAccount : {}", id);
        Optional<HouseHold> houseHold = houseHoldService.findOne(houseHoldId);
        if(!houseHold.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Optional<EAccount> eAccount = houseHoldService.findEAccount(houseHold.get(), id);
        return ResponseUtil.wrapOrNotFound(eAccount);
    }

    /**
     * DELETE  /e-accounts/:id : delete the "id" eAccount.
     *
     * @param id the id of the eAccount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/e-accounts/{eAccountId}")
    @Timed
    public ResponseEntity<HouseHold> deleteEAccount(@PathVariable("houseHoldId") String houseHoldId, @PathVariable String eAccountId) {
        log.debug("REST request to delete EAccount : {} {}", houseHoldId, eAccountId);
        Optional<HouseHold> houseHold = houseHoldService.findOne(houseHoldId);
        if(!houseHold.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (eAccountId == null) {
            throw new BadRequestAlertException("Invalid id", EACCOUNT_ENTITY_NAME, "idnull");
        }
        HouseHold result = houseHoldService.removeEAccount(houseHold.get(), eAccountId);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityDeletionAlert(EACCOUNT_ENTITY_NAME, eAccountId))
                .body(result);
    }
}
