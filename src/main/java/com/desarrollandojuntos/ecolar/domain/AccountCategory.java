package com.desarrollandojuntos.ecolar.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Categoria
 */
@ApiModel(description = "Categoria")
@Document(collection = "account_category")
public class AccountCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("description")
    private String description;

    @DBRef
    @Field("accounts")
    private Set<Accounts> accounts = new HashSet<>();
    
    //@DBRef
    @Field("parent")
    @JsonIgnoreProperties("categories")
    private AccountCategory parent;

    //@DBRef
    @Field("categories")
    private Set<AccountCategory> categories = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public AccountCategory getParent() {
        return parent;
    }

    public AccountCategory parent(AccountCategory accountCategory) {
        this.parent = accountCategory;
        return this;
    }

    public void setParent(AccountCategory accountCategory) {
        this.parent = accountCategory;
    }

    public Set<AccountCategory> getCategories() {
        return categories;
    }

    public AccountCategory categories(Set<AccountCategory> accountCategories) {
        this.categories = accountCategories;
        return this;
    }

    public AccountCategory addCategories(AccountCategory accountCategory) {
        this.categories.add(accountCategory);
        accountCategory.setParent(this);
        return this;
    }

    public AccountCategory removeCategories(AccountCategory accountCategory) {
        this.categories.remove(accountCategory);
        accountCategory.setParent(null);
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
