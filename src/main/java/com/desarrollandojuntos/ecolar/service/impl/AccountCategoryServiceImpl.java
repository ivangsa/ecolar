package com.desarrollandojuntos.ecolar.service.impl;

import com.desarrollandojuntos.ecolar.service.AccountCategoryService;

import net.logstash.logback.encoder.org.apache.commons.lang.StringUtils;

import com.desarrollandojuntos.ecolar.domain.AccountCategory;
import com.desarrollandojuntos.ecolar.repository.AccountCategoryRepository;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing AccountCategory.
 */
@Service
public class AccountCategoryServiceImpl implements AccountCategoryService {

    private final Logger log = LoggerFactory.getLogger(AccountCategoryServiceImpl.class);

    private final AccountCategoryRepository accountCategoryRepository;

    public AccountCategoryServiceImpl(AccountCategoryRepository accountCategoryRepository) {
        this.accountCategoryRepository = accountCategoryRepository;
    }
    
    @Override
    public AccountCategory getRootCategory() {
    	log.info("getRootAccountCategory");
    	Optional<AccountCategory> root =accountCategoryRepository.getRootCategory();
    	if(root.isPresent()) {
    		return root.get();
    	} else {
        	log.info("persisint new RootAccountCategory");
    		return accountCategoryRepository.save(new AccountCategory().name("root").description("Root"));
    	}
    }

    @Override
    public AccountCategory findChildInRootCategory(AccountCategory root, String id) {
    	AccountCategory parent = findParentInRootCategory(root, id);
    	if(parent != null) {
    		return parent.getCategories().stream().filter(a -> StringUtils.equals(id, a.getId())).findFirst().get();
    	}
    	return null;
    }

    @Override
    public AccountCategory findParentInRootCategory(AccountCategory root, String id) {
    	if(root != null && root.getCategories() != null) {
    		AccountCategory child = root.getCategories().stream().filter(a -> StringUtils.equals(id, a.getId())).findFirst().orElse(null);
    		if(child != null) {
    			return root;
    		} else {
    			for(AccountCategory child2 : root.getCategories()) {
    				AccountCategory child3 = findChildInRootCategory(child2, id);
    				if(child3 != null) {
    					return child2;
    				}
    			}
    		}
    	}
    	return null;
    }
    
    /**
     * Save a accountCategory.
     *
     * @param accountCategory the entity to save
     * @return the persisted entity
     */
    @Override
    public AccountCategory save(AccountCategory accountCategory) {
        log.debug("Request to save AccountCategory : {}", accountCategory);
        AccountCategory root = getRootCategory();
        if(accountCategory.getId() != null) {
        	AccountCategory oldParent = findParentInRootCategory(root, accountCategory.getId());
        	if(oldParent != null) {
        		oldParent.getCategories().remove(accountCategory);
        	}
        }
        if(accountCategory.getParent() != null && accountCategory.getParent().getId() != null) {
        	AccountCategory newParent = findChildInRootCategory(root, accountCategory.getParent().getId());
        	if(newParent != null) {
        		newParent.getCategories().add(accountCategory);
        	}
        } 
        if(accountCategory.getParent() == null || accountCategory.getParent().getId() == null) {
        	AccountCategory detachedRoot = new AccountCategory().name(root.getName()).description(root.getDescription());
        	detachedRoot.setId(root.getId());
        	accountCategory.parent(detachedRoot);
        	root.getCategories().add(accountCategory);
    	}
        
        accountCategory = accountCategoryRepository.save(accountCategory);
        accountCategoryRepository.save(root);
        return accountCategory;
    }

    /**
     * Get all the accountCategories.
     *
     * @return the list of entities
     */
    @Override
    public List<AccountCategory> findAll() {
        log.debug("Request to get all AccountCategories");
        return accountCategoryRepository.findAll();
    }


    /**
     * Get one accountCategory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<AccountCategory> findOne(String id) {
        log.debug("Request to get AccountCategory : {}", id);
        return accountCategoryRepository.findById(id);
    }

    /**
     * Delete the accountCategory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete AccountCategory : {}", id);
        accountCategoryRepository.deleteById(id);
    }
}
