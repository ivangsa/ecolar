package com.desarrollandojuntos.ecolar.domain;

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
 * Unidad econmica
 */
@ApiModel(description = "Unidad econmica")
@Document(collection = "house_hold")
public class HouseHold implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @DBRef
    @Field("accountCategories")
    private AccountCategories accountCategories;

    @DBRef
    @Field("members")
    private Set<User> members = new HashSet<>();

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

    public HouseHold name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AccountCategories getAccountCategories() {
        return accountCategories;
    }

    public HouseHold accountCategories(AccountCategories accountCategories) {
        this.accountCategories = accountCategories;
        return this;
    }

    public void setAccountCategories(AccountCategories accountCategories) {
        this.accountCategories = accountCategories;
    }

    public Set<User> getMembers() {
        return members;
    }

    public HouseHold members(Set<User> users) {
        this.members = users;
        return this;
    }

    public HouseHold addMembers(User user) {
        this.members.add(user);
        user.getHouseholds().add(this);
        return this;
    }

    public HouseHold removeMembers(User user) {
        this.members.remove(user);
        user.getHouseholds().remove(this);
        return this;
    }

    public void setMembers(Set<User> users) {
        this.members = users;
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
        HouseHold houseHold = (HouseHold) o;
        if (houseHold.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), houseHold.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HouseHold{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
