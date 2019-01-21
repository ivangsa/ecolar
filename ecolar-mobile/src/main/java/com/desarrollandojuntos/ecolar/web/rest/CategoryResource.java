package com.desarrollandojuntos.ecolar.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.desarrollandojuntos.ecolar.domain.Category;
import com.desarrollandojuntos.ecolar.domain.HouseHold;
import com.desarrollandojuntos.ecolar.service.HouseHoldService;
import com.desarrollandojuntos.ecolar.web.rest.errors.BadRequestAlertException;
import com.desarrollandojuntos.ecolar.web.rest.util.HeaderUtil;

import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing Category.
 */
@RestController
@RequestMapping("/api/house-holds/{houseHoldId}")
public class CategoryResource {

    private final Logger log = LoggerFactory.getLogger(CategoryResource.class);

    private static final String CATEGORY_ENTITY_NAME = "category";

    private HouseHoldService houseHoldService;

    public CategoryResource(HouseHoldService houseHoldService) {
        super();
        this.houseHoldService = houseHoldService;
    }

    /**
     * POST  /categories : Create a new category.
     *
     * @param category the category to create
     * @return the ResponseEntity with status 201 (Created) and with body the new category, or with status 400 (Bad Request) if the category has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/categories")
    @Timed
    public ResponseEntity<HouseHold> createCategory(@PathVariable("houseHoldId") String houseHoldId, @RequestBody Category category) throws URISyntaxException {
        log.debug("REST request to save Category : {} {}", houseHoldId, category);
        Optional<HouseHold> houseHold = houseHoldService.findOne(houseHoldId);
        if(!houseHold.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (category.getId() != null) {
            throw new BadRequestAlertException("A new category cannot already have an ID", CATEGORY_ENTITY_NAME, "idexists");
        }
        HouseHold result = houseHoldService.saveCategory(houseHold.get(), category);
        return ResponseEntity.created(new URI("/api/categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(CATEGORY_ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /categories : Updates an existing category.
     *
     * @param category the category to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated category,
     * or with status 400 (Bad Request) if the category is not valid,
     * or with status 500 (Internal Server Error) if the category couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/categories")
    @Timed
    public ResponseEntity<HouseHold> updateCategory(@PathVariable("houseHoldId") String houseHoldId, @RequestBody Category category) throws URISyntaxException {
        log.debug("REST request to update Category : {}", category);
        Optional<HouseHold> houseHold = houseHoldService.findOne(houseHoldId);
        if(!houseHold.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (category.getId() == null) {
            throw new BadRequestAlertException("Invalid id", CATEGORY_ENTITY_NAME, "idnull");
        }
        HouseHold result = houseHoldService.saveCategory(houseHold.get(), category);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(CATEGORY_ENTITY_NAME, category.getId().toString()))
            .body(result);
    }

    /**
     * GET  /categories : get all the categories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of categories in body
     */
    @GetMapping("/categories")
    @Timed
    public List<Category> getAllCategories(@PathVariable("houseHoldId") String houseHoldId) {
        log.debug("REST request to get all Categories for {}");
        Optional<HouseHold> houseHold = houseHoldService.findOne(houseHoldId);
        if(!houseHold.isPresent()) {
            return Collections.emptyList();
        }
        return houseHoldService.getCategoriesAsList(houseHold.get());
    }

    /**
     * GET  /categories/:id : get the "id" category.
     *
     * @param id the id of the category to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the category, or with status 404 (Not Found)
     */
    @GetMapping("/categories/{id}")
    @Timed
    public ResponseEntity<Category> getCategory(@PathVariable("houseHoldId") String houseHoldId, @PathVariable String id) {
        log.debug("REST request to get Category : {}", id);
        Optional<HouseHold> houseHold = houseHoldService.findOne(houseHoldId);
        if(!houseHold.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Optional<Category> category = houseHoldService.findCategory(houseHold.get(), id);
        return ResponseUtil.wrapOrNotFound(category);
    }

    /**
     * DELETE  /categories/:id : delete the "id" category.
     *
     * @param id the id of the category to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/categories/{categoryId}")
    @Timed
    public ResponseEntity<HouseHold> deleteCategory(@PathVariable("houseHoldId") String houseHoldId, @PathVariable String categoryId) {
        log.debug("REST request to delete Category : {} {}", houseHoldId, categoryId);
        Optional<HouseHold> houseHold = houseHoldService.findOne(houseHoldId);
        if(!houseHold.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (categoryId == null) {
            throw new BadRequestAlertException("Invalid id", CATEGORY_ENTITY_NAME, "idnull");
        }
        HouseHold result = houseHoldService.removeCategory(houseHold.get(), categoryId);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityDeletionAlert(CATEGORY_ENTITY_NAME, categoryId))
                .body(result);
    }
}
