package com.desarrollandojuntos.ecolar.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.desarrollandojuntos.ecolar.domain.EAccount;
import com.desarrollandojuntos.ecolar.repository.EAccountRepository;
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
 * REST controller for managing EAccount.
 */
@RestController
@RequestMapping("/api")
public class EAccountResource {

    private final Logger log = LoggerFactory.getLogger(EAccountResource.class);

    private static final String ENTITY_NAME = "eAccount";

    private EAccountRepository eAccountRepository;

    public EAccountResource(EAccountRepository eAccountRepository) {
        this.eAccountRepository = eAccountRepository;
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
    public ResponseEntity<EAccount> createEAccount(@RequestBody EAccount eAccount) throws URISyntaxException {
        log.debug("REST request to save EAccount : {}", eAccount);
        if (eAccount.getId() != null) {
            throw new BadRequestAlertException("A new eAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EAccount result = eAccountRepository.save(eAccount);
        return ResponseEntity.created(new URI("/api/e-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
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
    public ResponseEntity<EAccount> updateEAccount(@RequestBody EAccount eAccount) throws URISyntaxException {
        log.debug("REST request to update EAccount : {}", eAccount);
        if (eAccount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EAccount result = eAccountRepository.save(eAccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, eAccount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /e-accounts : get all the eAccounts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of eAccounts in body
     */
    @GetMapping("/e-accounts")
    @Timed
    public List<EAccount> getAllEAccounts() {
        log.debug("REST request to get all EAccounts");
        return eAccountRepository.findAll();
    }

    /**
     * GET  /e-accounts/:id : get the "id" eAccount.
     *
     * @param id the id of the eAccount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the eAccount, or with status 404 (Not Found)
     */
    @GetMapping("/e-accounts/{id}")
    @Timed
    public ResponseEntity<EAccount> getEAccount(@PathVariable String id) {
        log.debug("REST request to get EAccount : {}", id);
        Optional<EAccount> eAccount = eAccountRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(eAccount);
    }

    /**
     * DELETE  /e-accounts/:id : delete the "id" eAccount.
     *
     * @param id the id of the eAccount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/e-accounts/{id}")
    @Timed
    public ResponseEntity<Void> deleteEAccount(@PathVariable String id) {
        log.debug("REST request to delete EAccount : {}", id);

        eAccountRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
