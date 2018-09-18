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
@Document(collection = "event_category")
public class EventCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("description")
    private String description;

    @DBRef
    @Field("parentCategory")
    private Set<EventCategory> parentCategories = new HashSet<>();
    @DBRef
    @Field("mainCategory")
    @JsonIgnoreProperties("parentCategories")
    private EventCategory mainCategory;

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

    public EventCategory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public EventCategory description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<EventCategory> getParentCategories() {
        return parentCategories;
    }

    public EventCategory parentCategories(Set<EventCategory> eventCategories) {
        this.parentCategories = eventCategories;
        return this;
    }

    public EventCategory addParentCategory(EventCategory eventCategory) {
        this.parentCategories.add(eventCategory);
        eventCategory.setMainCategory(this);
        return this;
    }

    public EventCategory removeParentCategory(EventCategory eventCategory) {
        this.parentCategories.remove(eventCategory);
        eventCategory.setMainCategory(null);
        return this;
    }

    public void setParentCategories(Set<EventCategory> eventCategories) {
        this.parentCategories = eventCategories;
    }

    public EventCategory getMainCategory() {
        return mainCategory;
    }

    public EventCategory mainCategory(EventCategory eventCategory) {
        this.mainCategory = eventCategory;
        return this;
    }

    public void setMainCategory(EventCategory eventCategory) {
        this.mainCategory = eventCategory;
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
        EventCategory eventCategory = (EventCategory) o;
        if (eventCategory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), eventCategory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EventCategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
