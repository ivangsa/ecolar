package com.desarrollandojuntos.ecolar.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.desarrollandojuntos.ecolar.domain.AccountCategories;
import com.desarrollandojuntos.ecolar.domain.Category;
import com.desarrollandojuntos.ecolar.domain.EAccount;
import com.desarrollandojuntos.ecolar.domain.HouseHold;
import com.desarrollandojuntos.ecolar.domain.enumeration.AccountType;
import com.desarrollandojuntos.ecolar.repository.HouseHoldRepository;
import com.desarrollandojuntos.ecolar.service.HouseHoldService;

/**
 * Service Implementation for managing HouseHold.
 */
@Service
public class HouseHoldServiceImpl implements HouseHoldService {

    private final Logger log = LoggerFactory.getLogger(HouseHoldServiceImpl.class);

    private HouseHoldRepository houseHoldRepository;

    public HouseHoldServiceImpl(HouseHoldRepository houseHoldRepository) {
        this.houseHoldRepository = houseHoldRepository;
    }

    /**
     * Save a houseHold.
     *
     * @param houseHold the entity to save
     * @return the persisted entity
     */
    @Override
    public HouseHold save(HouseHold houseHold) {
        log.debug("Request to save HouseHold : {}", houseHold);
        if(houseHold.getId() == null) {
            houseHold = buildNewHouseHold(houseHold);
        }
        return houseHoldRepository.save(houseHold);
    }

    public HouseHold buildNewHouseHold(HouseHold houseHold) {
        long id = System.currentTimeMillis();
        houseHold.accountCategories(new AccountCategories())
            .getAccountCategories()
                .addCategories(new Category().id(id++).name("Ingresos").path("/Ingresos/").accountType(AccountType.REVENUE))
                .addCategories(new Category().id(id++).name("Gastos").path("/Gastos/").accountType(AccountType.EXPENSE))
                .addCategories(new Category().id(id++).name("Activos").path("/Activos/").accountType(AccountType.ASSETS))
                .addCategories(new Category().id(id++).name("Deudas").path("/Deudas/").accountType(AccountType.LIABILITIES));

        return houseHold;
    }

    private HouseHold rebuildCategoryPaths(HouseHold houseHold) {
        houseHold.getAccountCategories().rebuildCategoriesPath();
        return houseHold;
    }

    @Override
    public List<Category> getCategoriesAsList(String houseHoldId){
        HouseHold houseHold = findOne(houseHoldId).get();
        return houseHold.getAccountCategories()
                .buildCategoriesList(new ArrayList<>(), houseHold.getAccountCategories().getCategories());
    }

    @Override
    public Optional<Category> findCategory(HouseHold houseHold, String id) {
        for (Category root : houseHold.getAccountCategories().getCategories()) {
            Category category = root.findCategory(id);
            if(category != null) {
                return Optional.of(category);
            }
        }
        return Optional.empty();
    }

    @Override
    public HouseHold saveCategory(HouseHold houseHold, Category category) {
        if(category.getId() == null) {
            category.id(System.currentTimeMillis());
            addCategory(houseHold, category);
        } else {
            updateCategory(houseHold, category);
        }
        rebuildCategoryPaths(houseHold);
        return houseHoldRepository.save(houseHold);
    }

    public HouseHold addCategory(HouseHold houseHold, Category category) {
        Category root = houseHold.getAccountCategories().getRootCategory(category.getAccountType());
        Category parent = root.findCategory(category.getParentId());
        ObjectUtils.firstNonNull(parent, root).addCategories(category);
        return houseHold;
    }

    public HouseHold updateCategory(HouseHold houseHold, Category category) {
        Category original = null;
        for (Category root : houseHold.getAccountCategories().getCategories()) {
            original = root.findCategory(category.getId());
            if(original != null) {
                Category oldParent = root.findCategory(original.getParentId());
                if(oldParent != null) {
                    oldParent.removeCategories(category);
                }
                break;
            }
        }
        Category root = houseHold.getAccountCategories().getRootCategory(category.getAccountType());
        if(!StringUtils.equals(category.getParentId(), original.getParentId())) {
            Category newParent = root.findCategory(category.getParentId());
            if(newParent != null) {
                newParent.addCategories(category);
            }
        }
        original.copy(category);
        return houseHold;
    }

    @Override
    public HouseHold removeCategory(HouseHold houseHold, String categoryId) {
        Category category = null;
        Category root = null;
        for (Category cat : houseHold.getAccountCategories().getCategories()) {
            category = cat.findCategory(categoryId);
            if(category != null) {
                root = cat;
                break;
            }
        }
        Category parent = root.findCategory(category.getParentId());
        Category newParent = root.findCategory(parent.getParentId());
        parent.removeCategories(category);
        Set<EAccount> accounts = category.getAccounts();
        ObjectUtils.firstNonNull(newParent, root).getAccounts().addAll(accounts);
        return houseHoldRepository.save(houseHold);
    }

    /**
     * Get all the houseHolds.
     *
     * @return the list of entities
     */
    @Override
    public List<HouseHold> findAll() {
        log.debug("Request to get all HouseHolds");
        return houseHoldRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the HouseHold with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    @Override
    public Page<HouseHold> findAllWithEagerRelationships(Pageable pageable) {
        return houseHoldRepository.findAllWithEagerRelationships(pageable);
    }


    /**
     * Get one houseHold by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<HouseHold> findOne(String id) {
        log.debug("Request to get HouseHold : {}", id);
        return houseHoldRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the houseHold by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete HouseHold : {}", id);
        houseHoldRepository.deleteById(id);
    }
}
