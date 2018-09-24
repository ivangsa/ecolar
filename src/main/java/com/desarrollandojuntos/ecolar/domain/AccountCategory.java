package com.desarrollandojuntos.ecolar.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Field;

import io.swagger.annotations.ApiModel;

/**
 * Categoria
 */
@ApiModel(description = "Categoria")
public class AccountCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Field("id")
    private String id;

    @Field("path")
    private String path;

    @Field("name")
    private String name;

    @Field("description")
    private String description;

    @DBRef
    @Field("accounts")
    private Set<Accounts> accounts = new HashSet<>();
    
    @Field("parentId")
    private String parentId;

    @Field("categories")
    private Set<AccountCategory> categories = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    
    public String getId() {
    	return id;
    }
    
    public void setId(String id) {
    	this.id = id;
    }

    public String getPath() {
		return path;
	}
    

	public AccountCategory path(String path) {
		this.path = path;
		return this;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getName() {
        return name;
    }

    public AccountCategory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public AccountCategory description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Accounts> getAccounts() {
        return accounts;
    }

    public AccountCategory accounts(Set<Accounts> accounts) {
        this.accounts = accounts;
        return this;
    }

    public AccountCategory addAccounts(Accounts accounts) {
        this.accounts.add(accounts);
        accounts.setCategory(this);
        return this;
    }

    public AccountCategory removeAccounts(Accounts accounts) {
        this.accounts.remove(accounts);
        accounts.setCategory(null);
        return this;
    }

    public void setAccounts(Set<Accounts> accounts) {
        this.accounts = accounts;
    }

    public String getParentId() {
        return parentId;
    }

    public AccountCategory parentId(String parentId) {
        this.parentId = parentId;
        return this;
    }

    public void setParentId(String accountCategory) {
        this.parentId = accountCategory;
    }

    public Set<AccountCategory> getCategories() {
        return categories;
    }

    public AccountCategory categories(Set<AccountCategory> accountCategories) {
        this.categories = accountCategories;
        return this;
    }

    public AccountCategory findCategory(String id) {
    	if(StringUtils.equals(id, getId())) {
    		return this;
    	} else {
    		for (AccountCategory accountCategory : categories) {
				AccountCategory match = accountCategory.findCategory(id);
				if(match != null) {
					return match;
				}
			}
    	}
    	return null;
    }
    
    public AccountCategory addCategory(AccountCategory accountCategory) {
        this.categories.add(accountCategory);
        accountCategory.setParentId(this.getId());
        accountCategory.setPath(this.getPath() + accountCategory.getName() + "/");
        return this;
    }

    public AccountCategory removeCategory(AccountCategory accountCategory) {
        this.categories.remove(accountCategory);
        accountCategory.setParentId(null);
        accountCategory.setPath(null);
        return this;
    }

    public void setCategories(Set<AccountCategory> accountCategories) {
        this.categories = accountCategories;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AccountCategory accountCategory = (AccountCategory) o;
        if (accountCategory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accountCategory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AccountCategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
