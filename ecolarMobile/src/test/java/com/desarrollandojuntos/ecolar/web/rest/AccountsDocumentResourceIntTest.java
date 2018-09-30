package com.desarrollandojuntos.ecolar.web.rest;

import com.desarrollandojuntos.ecolar.EcolarMobileApp;

import com.desarrollandojuntos.ecolar.domain.AccountsDocument;
import com.desarrollandojuntos.ecolar.repository.AccountsDocumentRepository;
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

import java.util.List;


import static com.desarrollandojuntos.ecolar.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AccountsDocumentResource REST controller.
 *
 * @see AccountsDocumentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EcolarMobileApp.class)
public class AccountsDocumentResourceIntTest {

    @Autowired
    private AccountsDocumentRepository accountsDocumentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restAccountsDocumentMockMvc;

    private AccountsDocument accountsDocument;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AccountsDocumentResource accountsDocumentResource = new AccountsDocumentResource(accountsDocumentRepository);
        this.restAccountsDocumentMockMvc = MockMvcBuilders.standaloneSetup(accountsDocumentResource)
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
    public static AccountsDocument createEntity() {
        AccountsDocument accountsDocument = new AccountsDocument();
        return accountsDocument;
    }

    @Before
    public void initTest() {
        accountsDocumentRepository.deleteAll();
        accountsDocument = createEntity();
    }

    @Test
    public void createAccountsDocument() throws Exception {
        int databaseSizeBeforeCreate = accountsDocumentRepository.findAll().size();

        // Create the AccountsDocument
        restAccountsDocumentMockMvc.perform(post("/api/accounts-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountsDocument)))
            .andExpect(status().isCreated());

        // Validate the AccountsDocument in the database
        List<AccountsDocument> accountsDocumentList = accountsDocumentRepository.findAll();
        assertThat(accountsDocumentList).hasSize(databaseSizeBeforeCreate + 1);
        AccountsDocument testAccountsDocument = accountsDocumentList.get(accountsDocumentList.size() - 1);
    }

    @Test
    public void createAccountsDocumentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accountsDocumentRepository.findAll().size();

        // Create the AccountsDocument with an existing ID
        accountsDocument.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountsDocumentMockMvc.perform(post("/api/accounts-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountsDocument)))
            .andExpect(status().isBadRequest());

        // Validate the AccountsDocument in the database
        List<AccountsDocument> accountsDocumentList = accountsDocumentRepository.findAll();
        assertThat(accountsDocumentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllAccountsDocuments() throws Exception {
        // Initialize the database
        accountsDocumentRepository.save(accountsDocument);

        // Get all the accountsDocumentList
        restAccountsDocumentMockMvc.perform(get("/api/accounts-documents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountsDocument.getId())));
    }
    
    @Test
    public void getAccountsDocument() throws Exception {
        // Initialize the database
        accountsDocumentRepository.save(accountsDocument);

        // Get the accountsDocument
        restAccountsDocumentMockMvc.perform(get("/api/accounts-documents/{id}", accountsDocument.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(accountsDocument.getId()));
    }

    @Test
    public void getNonExistingAccountsDocument() throws Exception {
        // Get the accountsDocument
        restAccountsDocumentMockMvc.perform(get("/api/accounts-documents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAccountsDocument() throws Exception {
        // Initialize the database
        accountsDocumentRepository.save(accountsDocument);

        int databaseSizeBeforeUpdate = accountsDocumentRepository.findAll().size();

        // Update the accountsDocument
        AccountsDocument updatedAccountsDocument = accountsDocumentRepository.findById(accountsDocument.getId()).get();

        restAccountsDocumentMockMvc.perform(put("/api/accounts-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAccountsDocument)))
            .andExpect(status().isOk());

        // Validate the AccountsDocument in the database
        List<AccountsDocument> accountsDocumentList = accountsDocumentRepository.findAll();
        assertThat(accountsDocumentList).hasSize(databaseSizeBeforeUpdate);
        AccountsDocument testAccountsDocument = accountsDocumentList.get(accountsDocumentList.size() - 1);
    }

    @Test
    public void updateNonExistingAccountsDocument() throws Exception {
        int databaseSizeBeforeUpdate = accountsDocumentRepository.findAll().size();

        // Create the AccountsDocument

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountsDocumentMockMvc.perform(put("/api/accounts-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountsDocument)))
            .andExpect(status().isBadRequest());

        // Validate the AccountsDocument in the database
        List<AccountsDocument> accountsDocumentList = accountsDocumentRepository.findAll();
        assertThat(accountsDocumentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteAccountsDocument() throws Exception {
        // Initialize the database
        accountsDocumentRepository.save(accountsDocument);

        int databaseSizeBeforeDelete = accountsDocumentRepository.findAll().size();

        // Get the accountsDocument
        restAccountsDocumentMockMvc.perform(delete("/api/accounts-documents/{id}", accountsDocument.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AccountsDocument> accountsDocumentList = accountsDocumentRepository.findAll();
        assertThat(accountsDocumentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountsDocument.class);
        AccountsDocument accountsDocument1 = new AccountsDocument();
        accountsDocument1.setId("id1");
        AccountsDocument accountsDocument2 = new AccountsDocument();
        accountsDocument2.setId(accountsDocument1.getId());
        assertThat(accountsDocument1).isEqualTo(accountsDocument2);
        accountsDocument2.setId("id2");
        assertThat(accountsDocument1).isNotEqualTo(accountsDocument2);
        accountsDocument1.setId(null);
        assertThat(accountsDocument1).isNotEqualTo(accountsDocument2);
    }
}
