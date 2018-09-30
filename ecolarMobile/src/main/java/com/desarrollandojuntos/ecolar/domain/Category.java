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

import com.desarrollandojuntos.ecolar.domain.enumeration.AccountType;

/**
 * Categoria
 */
@ApiModel(description = "Categoria")
@Document(collection = "category")
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("description")
    private String description;

    @Field("path")
    private String path;

    @Field("parent_id")
    private String parentId;

    @Field("account_type")
    private AccountType accountType;

    @DBRef
    @Field("accounts")
    private Set<EAccount> accounts = new HashSet<>();
    @DBRef
    @Field("parent")
    @JsonIgnoreProperties("categories")
    private Category parent;

    @DBRef
    @Field("document")
    @JsonIgnoreProperties("categories")
    private AccountsDocument document;

    @DBRef
    @Field("categories")
    private Set<Category> categories = new HashSet<>();
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

    public Category name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Category description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPath() {
        return path;
    }

    public Category path(String path) {
        this.path = path;
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getParentId() {
        return parentId;
    }

    public Category parentId(String parentId) {
        this.parentId = parentId;
        return this;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public Category accountType(AccountType accountType) {
        this.accountType = accountType;
        return this;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public Set<EAccount> getAccounts() {
        return accounts;
    }

    public Category accounts(Set<EAccount> eAccounts) {
        this.accounts = eAccounts;
        return this;
    }

    public Category addAccounts(EAccount eAccount) {
        this.accounts.add(eAccount);
        eAccount.setCategory(this);
        return this;
    }

    public Category removeAccounts(EAccount eAccount) {
        this.accounts.remove(eAccount);
        eAccount.setCategory(null);
        return this;
    }

    public void setAccounts(Set<EAccount> eAccounts) {
        this.accounts = eAccounts;
    }

    public Category getParent() {
        return parent;
    }

    public Category parent(Category category) {
        this.parent = category;
        return this;
    }

    public void setParent(Category category) {
        this.parent = category;
    }

    public AccountsDocument getDocument() {
        return document;
    }

    public Category document(AccountsDocument accountsDocument) {
        this.document = accountsDocument;
        return this;
    }

    public void setDocument(AccountsDocument accountsDocument) {
        this.document = accountsDocument;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public Category categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public Category addCategories(Category category) {
        this.categories.add(category);
        category.setParent(this);
        return this;
    }

    public Category removeCategories(Category category) {
        this.categories.remove(category);
        category.setParent(null);
        return this;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
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
        Category category = (Category) o;
        if (category.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), category.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Category{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", path='" + getPath() + "'" +
            ", parentId='" + getParentId() + "'" +
            ", accountType='" + getAccountType() + "'" +
            "}";
    }
}
