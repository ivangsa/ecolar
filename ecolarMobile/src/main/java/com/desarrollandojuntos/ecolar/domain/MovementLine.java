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

import com.desarrollandojuntos.ecolar.domain.enumeration.LineType;

/**
 * Linea de asiento.
 */
@ApiModel(description = "Linea de asiento.")
@Document(collection = "movement_line")
public class MovementLine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("amount")
    private BigDecimal amount;

    @Field("event_type")
    private LineType eventType;

    /**
     * cuenta de una linea de asiento
     */
    @ApiModelProperty(value = "cuenta de una linea de asiento")
    @DBRef
    @Field("account")
    @JsonIgnoreProperties("")
    private EAccount account;

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

    public MovementLine amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LineType getEventType() {
        return eventType;
    }

    public MovementLine eventType(LineType eventType) {
        this.eventType = eventType;
        return this;
    }

    public void setEventType(LineType eventType) {
        this.eventType = eventType;
    }

    public EAccount getAccount() {
        return account;
    }

    public MovementLine account(EAccount eAccount) {
        this.account = eAccount;
        return this;
    }

    public void setAccount(EAccount eAccount) {
        this.account = eAccount;
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
        MovementLine movementLine = (MovementLine) o;
        if (movementLine.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), movementLine.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MovementLine{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", eventType='" + getEventType() + "'" +
            "}";
    }
}
