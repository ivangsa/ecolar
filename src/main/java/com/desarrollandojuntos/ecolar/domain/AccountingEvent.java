package com.desarrollandojuntos.ecolar.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

import com.desarrollandojuntos.ecolar.domain.enumeration.AccountingEventType;

/**
 * Movimiento contable
 */
@ApiModel(description = "Movimiento contable")
@Document(collection = "accounting_event")
public class AccountingEvent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("event_time")
    private Instant eventTime;

    @Field("registration_time")
    private Instant registrationTime;

    @Field("event_type")
    private AccountingEventType eventType;

    @Field("amount")
    private BigDecimal amount;

    @Field("location")
    private String location;

    //@DBRef
    @Field("mainCategory")
    @JsonIgnoreProperties("")
    private EventCategory mainCategory;

    //@DBRef
    @Field("eventLines")
    private Set<AccountingEventLine> eventLines = new HashSet<>();

    //@DBRef
    @Field("categories")
    private Set<EventCategory> categories = new HashSet<>();

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

    public AccountingEvent eventTime(Instant eventTime) {
        this.eventTime = eventTime;
        return this;
    }

    public void setEventTime(Instant eventTime) {
        this.eventTime = eventTime;
    }

    public Instant getRegistrationTime() {
        return registrationTime;
    }

    public AccountingEvent registrationTime(Instant registrationTime) {
        this.registrationTime = registrationTime;
        return this;
    }

    public void setRegistrationTime(Instant registrationTime) {
        this.registrationTime = registrationTime;
    }

    public AccountingEventType getEventType() {
        return eventType;
    }

    public AccountingEvent eventType(AccountingEventType eventType) {
        this.eventType = eventType;
        return this;
    }

    public void setEventType(AccountingEventType eventType) {
        this.eventType = eventType;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public AccountingEvent amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getLocation() {
        return location;
    }

    public AccountingEvent location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public EventCategory getMainCategory() {
        return mainCategory;
    }

    public AccountingEvent mainCategory(EventCategory eventCategory) {
        this.mainCategory = eventCategory;
        return this;
    }

    public void setMainCategory(EventCategory eventCategory) {
        this.mainCategory = eventCategory;
    }

    public Set<AccountingEventLine> getEventLines() {
        return eventLines;
    }

    public AccountingEvent eventLines(Set<AccountingEventLine> accountingEventLines) {
        this.eventLines = accountingEventLines;
        return this;
    }

    public AccountingEvent addEventLines(AccountingEventLine accountingEventLine) {
        this.eventLines.add(accountingEventLine);
        return this;
    }

    public AccountingEvent removeEventLines(AccountingEventLine accountingEventLine) {
        this.eventLines.remove(accountingEventLine);
        return this;
    }

    public void setEventLines(Set<AccountingEventLine> accountingEventLines) {
        this.eventLines = accountingEventLines;
    }

    public Set<EventCategory> getCategories() {
        return categories;
    }

    public AccountingEvent categories(Set<EventCategory> eventCategories) {
        this.categories = eventCategories;
        return this;
    }

    public AccountingEvent addCategories(EventCategory eventCategory) {
        this.categories.add(eventCategory);
        return this;
    }

    public AccountingEvent removeCategories(EventCategory eventCategory) {
        this.categories.remove(eventCategory);
        return this;
    }

    public void setCategories(Set<EventCategory> eventCategories) {
        this.categories = eventCategories;
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
        AccountingEvent accountingEvent = (AccountingEvent) o;
        if (accountingEvent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accountingEvent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AccountingEvent{" +
            "id=" + getId() +
            ", eventTime='" + getEventTime() + "'" +
            ", registrationTime='" + getRegistrationTime() + "'" +
            ", eventType='" + getEventType() + "'" +
            ", amount=" + getAmount() +
            ", location='" + getLocation() + "'" +
            "}";
    }
}
