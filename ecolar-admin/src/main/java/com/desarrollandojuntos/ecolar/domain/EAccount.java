package com.desarrollandojuntos.ecolar.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;

import org.mapstruct.ap.shaded.freemarker.template.utility.StringUtil;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.Objects;

import com.desarrollandojuntos.ecolar.domain.enumeration.AccountType;

/**
 * Cuenta contable.
 */
@ApiModel(description = "Cuenta contable.")
@Document(collection = "e_account")
public class EAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Field
    private String id;

    @Field("account_code")
    private String accountCode;

    @Field("account_name")
    private String accountName;

    @Field("type")
    private AccountType type;

    @Field("categoryId")
    private String categoryId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(Long id) {
        if(id != null) {
            this.id = String.valueOf(id);
        } else {
            this.id = null;
        }
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAccountCode() {
        return accountCode;
    }

    public EAccount accountCode(String accountCode) {
        this.accountCode = accountCode;
        return this;
    }

    public void setAccountCode(String accountCode) {
        this.accountCode = accountCode;
    }

    public String getAccountName() {
        return accountName;
    }

    public EAccount accountName(String accountName) {
        this.accountName = accountName;
        return this;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public AccountType getType() {
        return type;
    }

    public EAccount type(AccountType type) {
        this.type = type;
        return this;
    }

    public void setType(AccountType type) {
        this.type = type;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public EAccount categoryId(String categoryId) {
        this.categoryId = categoryId;
        return this;
    }

    public void setCategory(String categoryId) {
        this.categoryId = categoryId;
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
        EAccount eAccount = (EAccount) o;
        if (eAccount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), eAccount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EAccount{" +
            "id=" + getId() +
            ", accountCode='" + getAccountCode() + "'" +
            ", accountName='" + getAccountName() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
