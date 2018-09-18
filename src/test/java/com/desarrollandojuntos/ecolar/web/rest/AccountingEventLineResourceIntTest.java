package com.desarrollandojuntos.ecolar.web.rest;

import com.desarrollandojuntos.ecolar.EcolarApp;

import com.desarrollandojuntos.ecolar.domain.AccountingEventLine;
import com.desarrollandojuntos.ecolar.repository.AccountingEventLineRepository;
import com.desarrollandojuntos.ecolar.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.List;


import static com.desarrollandojuntos.ecolar.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.desarrollandojuntos.ecolar.domain.enumeration.AccountingEventType;
/**
 * Test class for the AccountingEventLineResource REST controller.
 *
 * @see AccountingEventLineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EcolarApp.class)
public class AccountingEventLineResourceIntTest {

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final AccountingEventType DEFAULT_EVENT_TYPE = AccountingEventType.CREDIT;
    private static final AccountingEventType UPDATED_EVENT_TYPE = AccountingEventType.DEBIT;

    @Autowired
    private AccountingEventLineRepository accountingEventLineRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restAccountingEventLineMockMvc;

    private AccountingEventLine accountingEventLine;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AccountingEventLineResource accountingEventLineResource = new AccountingEventLineResource(accountingEventLineRepository);
        this.restAccountingEventLineMockMvc = MockMvcBuilders.standaloneSetup(accountingEventLineResource)
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
    public static AccountingEventLine createEntity() {
        AccountingEventLine accountingEventLine = new AccountingEventLine()
            .amount(DEFAULT_AMOUNT)
            .eventType(DEFAULT_EVENT_TYPE);
        return accountingEventLine;
    }

    @Before
    public void initTest() {
        accountingEventLineRepository.deleteAll();
        accountingEventLine = createEntity();
    }

    @Test
    public void createAccountingEventLine() throws Exception {
        int databaseSizeBeforeCreate = accountingEventLineRepository.findAll().size();

        // Create the AccountingEventLine
        restAccountingEventLineMockMvc.perform(post("/api/accounting-event-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountingEventLine)))
            .andExpect(status().isCreated());

        // Validate the AccountingEventLine in the database
        List<AccountingEventLine> accountingEventLineList = accountingEventLineRepository.findAll();
        assertThat(accountingEventLineList).hasSize(databaseSizeBeforeCreate + 1);
        AccountingEventLine testAccountingEventLine = accountingEventLineList.get(accountingEventLineList.size() - 1);
        assertThat(testAccountingEventLine.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testAccountingEventLine.getEventType()).isEqualTo(DEFAULT_EVENT_TYPE);
    }

    @Test
    public void createAccountingEventLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accountingEventLineRepository.findAll().size();

        // Create the AccountingEventLine with an existing ID
        accountingEventLine.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountingEventLineMockMvc.perform(post("/api/accounting-event-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountingEventLine)))
            .andExpect(status().isBadRequest());

        // Validate the AccountingEventLine in the database
        List<AccountingEventLine> accountingEventLineList = accountingEventLineRepository.findAll();
        assertThat(accountingEventLineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllAccountingEventLines() throws Exception {
        // Initialize the database
        accountingEventLineRepository.save(accountingEventLine);

        // Get all the accountingEventLineList
        restAccountingEventLineMockMvc.perform(get("/api/accounting-event-lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountingEventLine.getId())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].eventType").value(hasItem(DEFAULT_EVENT_TYPE.toString())));
    }
    
    @Test
    public void getAccountingEventLine() throws Exception {
        // Initialize the database
        accountingEventLineRepository.save(accountingEventLine);

        // Get the accountingEventLine
        restAccountingEventLineMockMvc.perform(get("/api/accounting-event-lines/{id}", accountingEventLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(accountingEventLine.getId()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.eventType").value(DEFAULT_EVENT_TYPE.toString()));
    }

    @Test
    public void getNonExistingAccountingEventLine() throws Exception {
        // Get the accountingEventLine
        restAccountingEventLineMockMvc.perform(get("/api/accounting-event-lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAccountingEventLine() throws Exception {
        // Initialize the database
        accountingEventLineRepository.save(accountingEventLine);

        int databaseSizeBeforeUpdate = accountingEventLineRepository.findAll().size();

        // Update the accountingEventLine
        AccountingEventLine updatedAccountingEventLine = accountingEventLineRepository.findById(accountingEventLine.getId()).get();
        updatedAccountingEventLine
            .amount(UPDATED_AMOUNT)
            .eventType(UPDATED_EVENT_TYPE);

        restAccountingEventLineMockMvc.perform(put("/api/accounting-event-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAccountingEventLine)))
            .andExpect(status().isOk());

        // Validate the AccountingEventLine in the database
        List<AccountingEventLine> accountingEventLineList = accountingEventLineRepository.findAll();
        assertThat(accountingEventLineList).hasSize(databaseSizeBeforeUpdate);
        AccountingEventLine testAccountingEventLine = accountingEventLineList.get(accountingEventLineList.size() - 1);
        assertThat(testAccountingEventLine.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testAccountingEventLine.getEventType()).isEqualTo(UPDATED_EVENT_TYPE);
    }

    @Test
    public void updateNonExistingAccountingEventLine() throws Exception {
        int databaseSizeBeforeUpdate = accountingEventLineRepository.findAll().size();

        // Create the AccountingEventLine

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountingEventLineMockMvc.perform(put("/api/accounting-event-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountingEventLine)))
            .andExpect(status().isBadRequest());

        // Validate the AccountingEventLine in the database
        List<AccountingEventLine> accountingEventLineList = accountingEventLineRepository.findAll();
        assertThat(accountingEventLineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteAccountingEventLine() throws Exception {
        // Initialize the database
        accountingEventLineRepository.save(accountingEventLine);

        int databaseSizeBeforeDelete = accountingEventLineRepository.findAll().size();

        // Get the accountingEventLine
        restAccountingEventLineMockMvc.perform(delete("/api/accounting-event-lines/{id}", accountingEventLine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AccountingEventLine> accountingEventLineList = accountingEventLineRepository.findAll();
        assertThat(accountingEventLineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountingEventLine.class);
        AccountingEventLine accountingEventLine1 = new AccountingEventLine();
        accountingEventLine1.setId("id1");
        AccountingEventLine accountingEventLine2 = new AccountingEventLine();
        accountingEventLine2.setId(accountingEventLine1.getId());
        assertThat(accountingEventLine1).isEqualTo(accountingEventLine2);
        accountingEventLine2.setId("id2");
        assertThat(accountingEventLine1).isNotEqualTo(accountingEventLine2);
        accountingEventLine1.setId(null);
        assertThat(accountingEventLine1).isNotEqualTo(accountingEventLine2);
    }
}
