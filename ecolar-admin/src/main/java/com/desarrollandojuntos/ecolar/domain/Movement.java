package com.desarrollandojuntos.ecolar.domain;

import io.swagger.annotations.ApiModel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.desarrollandojuntos.ecolar.domain.enumeration.AccountType;

/**
 * Movimiento contable
 */
@ApiModel(description = "Movimiento contable")
@Document(collection = "movement")
public class Movement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("house_hold_id")
    private String houseHoldId;

    @NotNull
    @Field("type")
    private AccountType type;

    @Field("event_time")
    private Instant eventTime;

    @Field("registration_time")
    private Instant registrationTime;

    @Field("amount")
    private BigDecimal amount;

    @Field("location")
    private String location;

    @DBRef
    @Field("movementLines")
    private Set<MovementLine> movementLines = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getEventTime() {
        return eventTime;
    }

    public Movement eventTime(Instant eventTime) {
        this.eventTime = eventTime;
        return this;
    }

    public void setEventTime(Instant eventTime) {
        this.eventTime = eventTime;
    }

    public Instant getRegistrationTime() {
        return registrationTime;
    }

    public Movement registrationTime(Instant registrationTime) {
        this.registrationTime = registrationTime;
        return this;
    }

    public void setRegistrationTime(Instant registrationTime) {
        this.registrationTime = registrationTime;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Movement amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getLocation() {
        return location;
    }

    public Movement location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getHouseHoldId() {
        return houseHoldId;
    }

    public Movement houseHoldId(String houseHoldId) {
        this.houseHoldId = houseHoldId;
        return this;
    }

    public void setHouseHoldId(String houseHoldId) {
        this.houseHoldId = houseHoldId;
    }

    public AccountType getType() {
        return type;
    }

    public Movement type(AccountType type) {
        this.type = type;
        return this;
    }

    public void setType(AccountType type) {
        this.type = type;
    }

    public Set<MovementLine> getMovementLines() {
        return movementLines;
    }

    public Movement movementLines(Set<MovementLine> movementLines) {
        this.movementLines = movementLines;
        return this;
    }

    public Movement addMovementLines(MovementLine movementLine) {
        this.movementLines.add(movementLine);
        return this;
    }

    public Movement removeMovementLines(MovementLine movementLine) {
        this.movementLines.remove(movementLine);
        return this;
    }

    public void setMovementLines(Set<MovementLine> movementLines) {
        this.movementLines = movementLines;
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
        Movement movement = (Movement) o;
        if (movement.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), movement.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Movement{" +
            "id=" + getId() +
            ", eventTime='" + getEventTime() + "'" +
            ", registrationTime='" + getRegistrationTime() + "'" +
            ", amount=" + getAmount() +
            ", location='" + getLocation() + "'" +
            ", houseHoldId='" + getHouseHoldId() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
