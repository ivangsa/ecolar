package com.desarrollandojuntos.ecolar.web.rest;

import com.desarrollandojuntos.ecolar.EcolarAdminApp;

import com.desarrollandojuntos.ecolar.domain.EAccount;
import com.desarrollandojuntos.ecolar.repository.EAccountRepository;
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

import com.desarrollandojuntos.ecolar.domain.enumeration.AccountType;
/**
 * Test class for the EAccountResource REST controller.
 *
 * @see EAccountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EcolarAdminApp.class)
public class EAccountResourceIntTest {

    private static final String DEFAULT_ACCOUNT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_ACCOUNT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NAME = "BBBBBBBBBB";

    private static final AccountType DEFAULT_TYPE = AccountType.ASSETS;
    private static final AccountType UPDATED_TYPE = AccountType.LIABILITIES;

    @Autowired
    private EAccountRepository eAccountRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restEAccountMockMvc;

    private EAccount eAccount;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EAccountResource eAccountResource = new EAccountResource(eAccountRepository);
        this.restEAccountMockMvc = MockMvcBuilders.standaloneSetup(eAccountResource)
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
    public static EAccount createEntity() {
        EAccount eAccount = new EAccount()
            .accountCode(DEFAULT_ACCOUNT_CODE)
            .accountName(DEFAULT_ACCOUNT_NAME)
            .type(DEFAULT_TYPE);
        return eAccount;
    }

    @Before
    public void initTest() {
        eAccountRepository.deleteAll();
        eAccount = createEntity();
    }

    @Test
    public void createEAccount() throws Exception {
        int databaseSizeBeforeCreate = eAccountRepository.findAll().size();

        // Create the EAccount
        restEAccountMockMvc.perform(post("/api/e-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eAccount)))
            .andExpect(status().isCreated());

        // Validate the EAccount in the database
        List<EAccount> eAccountList = eAccountRepository.findAll();
        assertThat(eAccountList).hasSize(databaseSizeBeforeCreate + 1);
        EAccount testEAccount = eAccountList.get(eAccountList.size() - 1);
        assertThat(testEAccount.getAccountCode()).isEqualTo(DEFAULT_ACCOUNT_CODE);
        assertThat(testEAccount.getAccountName()).isEqualTo(DEFAULT_ACCOUNT_NAME);
        assertThat(testEAccount.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    public void createEAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eAccountRepository.findAll().size();

        // Create the EAccount with an existing ID
        eAccount.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restEAccountMockMvc.perform(post("/api/e-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eAccount)))
            .andExpect(status().isBadRequest());

        // Validate the EAccount in the database
        List<EAccount> eAccountList = eAccountRepository.findAll();
        assertThat(eAccountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllEAccounts() throws Exception {
        // Initialize the database
        eAccountRepository.save(eAccount);

        // Get all the eAccountList
        restEAccountMockMvc.perform(get("/api/e-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eAccount.getId())))
            .andExpect(jsonPath("$.[*].accountCode").value(hasItem(DEFAULT_ACCOUNT_CODE.toString())))
            .andExpect(jsonPath("$.[*].accountName").value(hasItem(DEFAULT_ACCOUNT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    public void getEAccount() throws Exception {
        // Initialize the database
        eAccountRepository.save(eAccount);

        // Get the eAccount
        restEAccountMockMvc.perform(get("/api/e-accounts/{id}", eAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(eAccount.getId()))
            .andExpect(jsonPath("$.accountCode").value(DEFAULT_ACCOUNT_CODE.toString()))
            .andExpect(jsonPath("$.accountName").value(DEFAULT_ACCOUNT_NAME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    public void getNonExistingEAccount() throws Exception {
        // Get the eAccount
        restEAccountMockMvc.perform(get("/api/e-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateEAccount() throws Exception {
        // Initialize the database
        eAccountRepository.save(eAccount);

        int databaseSizeBeforeUpdate = eAccountRepository.findAll().size();

        // Update the eAccount
        EAccount updatedEAccount = eAccountRepository.findById(eAccount.getId()).get();
        updatedEAccount
            .accountCode(UPDATED_ACCOUNT_CODE)
            .accountName(UPDATED_ACCOUNT_NAME)
            .type(UPDATED_TYPE);

        restEAccountMockMvc.perform(put("/api/e-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEAccount)))
            .andExpect(status().isOk());

        // Validate the EAccount in the database
        List<EAccount> eAccountList = eAccountRepository.findAll();
        assertThat(eAccountList).hasSize(databaseSizeBeforeUpdate);
        EAccount testEAccount = eAccountList.get(eAccountList.size() - 1);
        assertThat(testEAccount.getAccountCode()).isEqualTo(UPDATED_ACCOUNT_CODE);
        assertThat(testEAccount.getAccountName()).isEqualTo(UPDATED_ACCOUNT_NAME);
        assertThat(testEAccount.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    public void updateNonExistingEAccount() throws Exception {
        int databaseSizeBeforeUpdate = eAccountRepository.findAll().size();

        // Create the EAccount

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEAccountMockMvc.perform(put("/api/e-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eAccount)))
            .andExpect(status().isBadRequest());

        // Validate the EAccount in the database
        List<EAccount> eAccountList = eAccountRepository.findAll();
        assertThat(eAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteEAccount() throws Exception {
        // Initialize the database
        eAccountRepository.save(eAccount);

        int databaseSizeBeforeDelete = eAccountRepository.findAll().size();

        // Get the eAccount
        restEAccountMockMvc.perform(delete("/api/e-accounts/{id}", eAccount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EAccount> eAccountList = eAccountRepository.findAll();
        assertThat(eAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EAccount.class);
        EAccount eAccount1 = new EAccount();
        eAccount1.setId("id1");
        EAccount eAccount2 = new EAccount();
        eAccount2.setId(eAccount1.getId());
        assertThat(eAccount1).isEqualTo(eAccount2);
        eAccount2.setId("id2");
        assertThat(eAccount1).isNotEqualTo(eAccount2);
        eAccount1.setId(null);
        assertThat(eAccount1).isNotEqualTo(eAccount2);
    }
}
