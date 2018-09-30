package com.desarrollandojuntos.ecolar.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A AccountsDocument.
 */
@Document(collection = "accounts_document")
public class AccountsDocument implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef
    @Field("categories")
    private Set<Category> categories = new HashSet<>();
    @DBRef
    @Field("household")
    @com.fasterxml.jackson.annotation.JsonBackReference
    private HouseHold household;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public AccountsDocument categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public AccountsDocument addCategories(Category category) {
        this.categories.add(category);
        category.setDocument(this);
        return this;
    }

    public AccountsDocument removeCategories(Category category) {
        this.categories.remove(category);
        category.setDocument(null);
        return this;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public HouseHold getHousehold() {
        return household;
    }

    public AccountsDocument household(HouseHold houseHold) {
        this.household = houseHold;
        return this;
    }

    public void setHousehold(HouseHold houseHold) {
        this.household = houseHold;
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
        AccountsDocument accountsDocument = (AccountsDocument) o;
        if (accountsDocument.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accountsDocument.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AccountsDocument{" +
            "id=" + getId() +
            "}";
    }
}
