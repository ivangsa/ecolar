package com.desarrollandojuntos.ecolar.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.desarrollandojuntos.ecolar.domain.enumeration.AccountType;

/**
 * A AccountCategories.
 */
@Document(collection = "account_categories")
public class AccountCategories implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;

    @Field("categories")
    private Set<Category> categories = new HashSet<>();


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    public Category getRootCategory(AccountType type) {
        for (Category category : categories) {
            if(category.getAccountType().equals(type)) {
                return category;
            }
        }
        return null;
    }

    public List<Category> buildCategoriesList(List<Category> result, Set<Category> categories){
        if(categories != null) {
            for (Category category : categories) {
                result.add(category.flatCopy());
                buildCategoriesList(result, category.getCategories());
            }
        }
        return result;
    }

    public void rebuildCategoriesPath() {
        for (Category category : categories) {
            rebuildCategoriesPath("", category);
        }
    }

    private void rebuildCategoriesPath(String parentPath, Category category){
        category.setPath(parentPath + "/" + category.getName());
        if(category.getCategories() != null && !category.getCategories().isEmpty()) {
            for (Category child : category.getCategories()) {
                child.setParentId(category.getId());
                rebuildCategoriesPath(category.getPath(), child);
            }
        } else {
            category.setPath(category.getPath() + "/");
        }
    }



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public AccountCategories categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public AccountCategories addCategories(Category category) {
        this.categories.add(category);
        return this;
    }

    public AccountCategories removeCategories(Category category) {
        this.categories.remove(category);
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
        AccountCategories accountCategories = (AccountCategories) o;
        if (accountCategories.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accountCategories.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AccountCategories{" +
            "id=" + getId() +
            "}";
    }
}
