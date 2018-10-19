package com.desarrollandojuntos.ecolar.domain;

import io.swagger.annotations.ApiModel;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Movimiento contable
 */
@ApiModel(description = "Movimiento contable")
@Document(collection = "movement")
public class Movement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("event_time")
    private Instant eventTime;

    @Field("registration_time")
    private Instant registrationTime;

    @Field("amount")
    private BigDecimal amount;

    @Field("location")
    private String location;

    @DBRef
    @Field("eventLines")
    private Set<MovementLine> eventLines = new HashSet<>();

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

    public Set<MovementLine> getEventLines() {
        return eventLines;
    }

    public Movement eventLines(Set<MovementLine> movementLines) {
        this.eventLines = movementLines;
        return this;
    }

    public Movement addEventLines(MovementLine movementLine) {
        this.eventLines.add(movementLine);
        return this;
    }

    public Movement removeEventLines(MovementLine movementLine) {
        this.eventLines.remove(movementLine);
        return this;
    }

    public void setEventLines(Set<MovementLine> movementLines) {
        this.eventLines = movementLines;
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
            "}";
    }
}
