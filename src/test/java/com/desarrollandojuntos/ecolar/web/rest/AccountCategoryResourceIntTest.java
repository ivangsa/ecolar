package com.desarrollandojuntos.ecolar.web.rest;

import com.desarrollandojuntos.ecolar.EcolarApp;

import com.desarrollandojuntos.ecolar.domain.AccountCategory;
import com.desarrollandojuntos.ecolar.repository.AccountCategoryDocumentRepository;
import com.desarrollandojuntos.ecolar.service.AccountCategoryService;
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
 * Test class for the AccountCategoryResource REST controller.
 *
 * @see AccountCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EcolarApp.class)
public class AccountCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private AccountCategoryDocumentRepository accountCategoryRepository;
    
    @Autowired
    private AccountCategoryService accountCategoryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restAccountCategoryMockMvc;

    private AccountCategory accountCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AccountCategoryResource accountCategoryResource = new AccountCategoryResource(accountCategoryService);
        this.restAccountCategoryMockMvc = MockMvcBuilders.standaloneSetup(accountCategoryResource)
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
    public static AccountCategory createEntity() {
        AccountCategory accountCategory = new AccountCategory()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return accountCategory;
    }

    @Before
    public void initTest() {
        accountCategoryRepository.deleteAll();
        accountCategory = createEntity();
    }

    @Test
    public void createAccountCategory() throws Exception {
        int databaseSizeBeforeCreate = accountCategoryRepository.findAll().size();

        // Create the AccountCategory
        restAccountCategoryMockMvc.perform(post("/api/account-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountCategory)))
            .andExpect(status().isCreated());

        // Validate the AccountCategory in the database
        List<AccountCategory> accountCategoryList = accountCategoryRepository.findAll();
        assertThat(accountCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        AccountCategory testAccountCategory = accountCategoryList.get(accountCategoryList.size() - 1);
        assertThat(testAccountCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAccountCategory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    public void createAccountCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accountCategoryRepository.findAll().size();

        // Create the AccountCategory with an existing ID
        accountCategory.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountCategoryMockMvc.perform(post("/api/account-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountCategory)))
            .andExpect(status().isBadRequest());

        // Validate the AccountCategory in the database
        List<AccountCategory> accountCategoryList = accountCategoryRepository.findAll();
        assertThat(accountCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllAccountCategories() throws Exception {
        // Initialize the database
        accountCategoryRepository.save(accountCategory);

        // Get all the accountCategoryList
        restAccountCategoryMockMvc.perform(get("/api/account-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountCategory.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    public void getAccountCategory() throws Exception {
        // Initialize the database
        accountCategoryRepository.save(accountCategory);

        // Get the accountCategory
        restAccountCategoryMockMvc.perform(get("/api/account-categories/{id}", accountCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(accountCategory.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    public void getNonExistingAccountCategory() throws Exception {
        // Get the accountCategory
        restAccountCategoryMockMvc.perform(get("/api/account-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAccountCategory() throws Exception {
        // Initialize the database
        accountCategoryService.save(accountCategory);

        int databaseSizeBeforeUpdate = accountCategoryRepository.findAll().size();

        // Update the accountCategory
        AccountCategory updatedAccountCategory = accountCategoryRepository.findById(accountCategory.getId()).get();
        updatedAccountCategory
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restAccountCategoryMockMvc.perform(put("/api/account-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAccountCategory)))
            .andExpect(status().isOk());

        // Validate the AccountCategory in the database
        List<AccountCategory> accountCategoryList = accountCategoryRepository.findAll();
        assertThat(accountCategoryList).hasSize(databaseSizeBeforeUpdate);
        AccountCategory testAccountCategory = accountCategoryList.get(accountCategoryList.size() - 1);
        assertThat(testAccountCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAccountCategory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    public void updateNonExistingAccountCategory() throws Exception {
        int databaseSizeBeforeUpdate = accountCategoryRepository.findAll().size();

        // Create the AccountCategory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountCategoryMockMvc.perform(put("/api/account-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountCategory)))
            .andExpect(status().isBadRequest());

        // Validate the AccountCategory in the database
        List<AccountCategory> accountCategoryList = accountCategoryRepository.findAll();
        assertThat(accountCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteAccountCategory() throws Exception {
        // Initialize the database
        accountCategoryService.save(accountCategory);

        int databaseSizeBeforeDelete = accountCategoryRepository.findAll().size();

        // Get the accountCategory
        restAccountCategoryMockMvc.perform(delete("/api/account-categories/{id}", accountCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AccountCategory> accountCategoryList = accountCategoryRepository.findAll();
        assertThat(accountCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountCategory.class);
        AccountCategory accountCategory1 = new AccountCategory();
        accountCategory1.setId("id1");
        AccountCategory accountCategory2 = new AccountCategory();
        accountCategory2.setId(accountCategory1.getId());
        assertThat(accountCategory1).isEqualTo(accountCategory2);
        accountCategory2.setId("id2");
        assertThat(accountCategory1).isNotEqualTo(accountCategory2);
        accountCategory1.setId(null);
        assertThat(accountCategory1).isNotEqualTo(accountCategory2);
    }
}
