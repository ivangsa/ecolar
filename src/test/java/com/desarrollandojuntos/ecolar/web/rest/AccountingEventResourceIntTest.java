package com.desarrollandojuntos.ecolar.web.rest;

import com.desarrollandojuntos.ecolar.EcolarApp;

import com.desarrollandojuntos.ecolar.domain.AccountingEvent;
import com.desarrollandojuntos.ecolar.repository.AccountingEventRepository;
import com.desarrollandojuntos.ecolar.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;


import static com.desarrollandojuntos.ecolar.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.desarrollandojuntos.ecolar.domain.enumeration.AccountingEventType;
/**
 * Test class for the AccountingEventResource REST controller.
 *
 * @see AccountingEventResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EcolarApp.class)
public class AccountingEventResourceIntTest {

    private static final Instant DEFAULT_EVENT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_EVENT_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_REGISTRATION_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_REGISTRATION_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final AccountingEventType DEFAULT_EVENT_TYPE = AccountingEventType.CREDIT;
    private static final AccountingEventType UPDATED_EVENT_TYPE = AccountingEventType.DEBIT;

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    @Autowired
    private AccountingEventRepository accountingEventRepository;

    @Mock
    private AccountingEventRepository accountingEventRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restAccountingEventMockMvc;

    private AccountingEvent accountingEvent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AccountingEventResource accountingEventResource = new AccountingEventResource(accountingEventRepository);
        this.restAccountingEventMockMvc = MockMvcBuilders.standaloneSetup(accountingEventResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountingEvent createEntity() {
        AccountingEvent accountingEvent = new AccountingEvent()
            .eventTime(DEFAULT_EVENT_TIME)
            .registrationTime(DEFAULT_REGISTRATION_TIME)
            .eventType(DEFAULT_EVENT_TYPE)
            .amount(DEFAULT_AMOUNT)
            .location(DEFAULT_LOCATION);
        return accountingEvent;
    }

    @Before
    public void initTest() {
        accountingEventRepository.deleteAll();
        accountingEvent = createEntity();
    }

    @Test
    public void createAccountingEvent() throws Exception {
        int databaseSizeBeforeCreate = accountingEventRepository.findAll().size();

        // Create the AccountingEvent
        restAccountingEventMockMvc.perform(post("/api/accounting-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountingEvent)))
            .andExpect(status().isCreated());

        // Validate the AccountingEvent in the database
        List<AccountingEvent> accountingEventList = accountingEventRepository.findAll();
        assertThat(accountingEventList).hasSize(databaseSizeBeforeCreate + 1);
        AccountingEvent testAccountingEvent = accountingEventList.get(accountingEventList.size() - 1);
        assertThat(testAccountingEvent.getEventTime()).isEqualTo(DEFAULT_EVENT_TIME);
        assertThat(testAccountingEvent.getRegistrationTime()).isEqualTo(DEFAULT_REGISTRATION_TIME);
        assertThat(testAccountingEvent.getEventType()).isEqualTo(DEFAULT_EVENT_TYPE);
        assertThat(testAccountingEvent.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testAccountingEvent.getLocation()).isEqualTo(DEFAULT_LOCATION);
    }

    @Test
    public void createAccountingEventWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accountingEventRepository.findAll().size();

        // Create the AccountingEvent with an existing ID
        accountingEvent.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountingEventMockMvc.perform(post("/api/accounting-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountingEvent)))
            .andExpect(status().isBadRequest());

        // Validate the AccountingEvent in the database
        List<AccountingEvent> accountingEventList = accountingEventRepository.findAll();
        assertThat(accountingEventList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllAccountingEvents() throws Exception {
        // Initialize the database
        accountingEventRepository.save(accountingEvent);

        // Get all the accountingEventList
        restAccountingEventMockMvc.perform(get("/api/accounting-events?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountingEvent.getId())))
            .andExpect(jsonPath("$.[*].eventTime").value(hasItem(DEFAULT_EVENT_TIME.toString())))
            .andExpect(jsonPath("$.[*].registrationTime").value(hasItem(DEFAULT_REGISTRATION_TIME.toString())))
            .andExpect(jsonPath("$.[*].eventType").value(hasItem(DEFAULT_EVENT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())));
    }
    
    public void getAllAccountingEventsWithEagerRelationshipsIsEnabled() throws Exception {
        AccountingEventResource accountingEventResource = new AccountingEventResource(accountingEventRepositoryMock);
        when(accountingEventRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restAccountingEventMockMvc = MockMvcBuilders.standaloneSetup(accountingEventResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAccountingEventMockMvc.perform(get("/api/accounting-events?eagerload=true"))
        .andExpect(status().isOk());

        verify(accountingEventRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllAccountingEventsWithEagerRelationshipsIsNotEnabled() throws Exception {
        AccountingEventResource accountingEventResource = new AccountingEventResource(accountingEventRepositoryMock);
            when(accountingEventRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restAccountingEventMockMvc = MockMvcBuilders.standaloneSetup(accountingEventResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAccountingEventMockMvc.perform(get("/api/accounting-events?eagerload=true"))
        .andExpect(status().isOk());

            verify(accountingEventRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    public void getAccountingEvent() throws Exception {
        // Initialize the database
        accountingEventRepository.save(accountingEvent);

        // Get the accountingEvent
        restAccountingEventMockMvc.perform(get("/api/accounting-events/{id}", accountingEvent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(accountingEvent.getId()))
            .andExpect(jsonPath("$.eventTime").value(DEFAULT_EVENT_TIME.toString()))
            .andExpect(jsonPath("$.registrationTime").value(DEFAULT_REGISTRATION_TIME.toString()))
            .andExpect(jsonPath("$.eventType").value(DEFAULT_EVENT_TYPE.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()));
    }

    @Test
    public void getNonExistingAccountingEvent() throws Exception {
        // Get the accountingEvent
        restAccountingEventMockMvc.perform(get("/api/accounting-events/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAccountingEvent() throws Exception {
        // Initialize the database
        accountingEventRepository.save(accountingEvent);

        int databaseSizeBeforeUpdate = accountingEventRepository.findAll().size();

        // Update the accountingEvent
        AccountingEvent updatedAccountingEvent = accountingEventRepository.findById(accountingEvent.getId()).get();
        updatedAccountingEvent
            .eventTime(UPDATED_EVENT_TIME)
            .registrationTime(UPDATED_REGISTRATION_TIME)
            .eventType(UPDATED_EVENT_TYPE)
            .amount(UPDATED_AMOUNT)
            .location(UPDATED_LOCATION);

        restAccountingEventMockMvc.perform(put("/api/accounting-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAccountingEvent)))
            .andExpect(status().isOk());

        // Validate the AccountingEvent in the database
        List<AccountingEvent> accountingEventList = accountingEventRepository.findAll();
        assertThat(accountingEventList).hasSize(databaseSizeBeforeUpdate);
        AccountingEvent testAccountingEvent = accountingEventList.get(accountingEventList.size() - 1);
        assertThat(testAccountingEvent.getEventTime()).isEqualTo(UPDATED_EVENT_TIME);
        assertThat(testAccountingEvent.getRegistrationTime()).isEqualTo(UPDATED_REGISTRATION_TIME);
        assertThat(testAccountingEvent.getEventType()).isEqualTo(UPDATED_EVENT_TYPE);
        assertThat(testAccountingEvent.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testAccountingEvent.getLocation()).isEqualTo(UPDATED_LOCATION);
    }

    @Test
    public void updateNonExistingAccountingEvent() throws Exception {
        int databaseSizeBeforeUpdate = accountingEventRepository.findAll().size();

        // Create the AccountingEvent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountingEventMockMvc.perform(put("/api/accounting-events")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountingEvent)))
            .andExpect(status().isBadRequest());

        // Validate the AccountingEvent in the database
        List<AccountingEvent> accountingEventList = accountingEventRepository.findAll();
        assertThat(accountingEventList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteAccountingEvent() throws Exception {
        // Initialize the database
        accountingEventRepository.save(accountingEvent);

        int databaseSizeBeforeDelete = accountingEventRepository.findAll().size();

        // Get the accountingEvent
        restAccountingEventMockMvc.perform(delete("/api/accounting-events/{id}", accountingEvent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AccountingEvent> accountingEventList = accountingEventRepository.findAll();
        assertThat(accountingEventList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountingEvent.class);
        AccountingEvent accountingEvent1 = new AccountingEvent();
        accountingEvent1.setId("id1");
        AccountingEvent accountingEvent2 = new AccountingEvent();
        accountingEvent2.setId(accountingEvent1.getId());
        assertThat(accountingEvent1).isEqualTo(accountingEvent2);
        accountingEvent2.setId("id2");
        assertThat(accountingEvent1).isNotEqualTo(accountingEvent2);
        accountingEvent1.setId(null);
        assertThat(accountingEvent1).isNotEqualTo(accountingEvent2);
    }
}
