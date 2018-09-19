package com.desarrollandojuntos.ecolar.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

import com.desarrollandojuntos.ecolar.domain.enumeration.AccountingEventType;

/**
 * Linea de asiento
 */
@ApiModel(description = "Linea de asiento")
@Document(collection = "accounting_event_line")
public class AccountingEventLine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("amount")
    private BigDecimal amount;

    @Field("event_type")
    private AccountingEventType eventType;

    /**
     * cuenta de una linea de asiento
     */
    @ApiModelProperty(value = "cuenta de una linea de asiento")
    @DBRef
    @Field("account")
    @JsonIgnoreProperties("")
    private Accounts account;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public AccountingEventLine amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public AccountingEventType getEventType() {
        return eventType;
    }

    public AccountingEventLine eventType(AccountingEventType eventType) {
        this.eventType = eventType;
        return this;
    }

    public void setEventType(AccountingEventType eventType) {
        this.eventType = eventType;
    }

    public Accounts getAccount() {
        return account;
    }

    public AccountingEventLine account(Accounts accounts) {
        this.account = accounts;
        return this;
    }

    public void setAccount(Accounts accounts) {
        this.account = accounts;
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
        AccountingEventLine accountingEventLine = (AccountingEventLine) o;
        if (accountingEventLine.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accountingEventLine.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AccountingEventLine{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", eventType='" + getEventType() + "'" +
            "}";
    }
}
