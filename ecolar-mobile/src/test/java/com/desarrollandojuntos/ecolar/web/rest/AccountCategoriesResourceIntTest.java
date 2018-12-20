package com.desarrollandojuntos.ecolar.web.rest;

import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.desarrollandojuntos.ecolar.EcolarApp;

/**
 * Test class for the AccountCategoriesResource REST controller.
 *
 * @see AccountCategoriesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EcolarApp.class)
public class AccountCategoriesResourceIntTest {

//    @Autowired
//    private AccountCategoriesRepository accountCategoriesRepository;
//
//    @Autowired
//    private MappingJackson2HttpMessageConverter jacksonMessageConverter;
//
//    @Autowired
//    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;
//
//    @Autowired
//    private ExceptionTranslator exceptionTranslator;
//
//    @Autowired
//    private Validator validator;
//
//    private MockMvc restAccountCategoriesMockMvc;
//
//    private AccountCategories accountCategories;
//
//    @Before
//    public void setup() {
//        MockitoAnnotations.initMocks(this);
//        final AccountCategoriesResource accountCategoriesResource = new AccountCategoriesResource(accountCategoriesRepository);
//        this.restAccountCategoriesMockMvc = MockMvcBuilders.standaloneSetup(accountCategoriesResource)
//            .setCustomArgumentResolvers(pageableArgumentResolver)
//            .setControllerAdvice(exceptionTranslator)
//            .setConversionService(createFormattingConversionService())
//            .setMessageConverters(jacksonMessageConverter)
//            .setValidator(validator).build();
//    }
//
//    /**
//     * Create an entity for this test.
//     *
//     * This is a static method, as tests for other entities might also need it,
//     * if they test an entity which requires the current entity.
//     */
//    public static AccountCategories createEntity() {
//        AccountCategories accountCategories = new AccountCategories();
//        return accountCategories;
//    }
//
//    @Before
//    public void initTest() {
//        accountCategoriesRepository.deleteAll();
//        accountCategories = createEntity();
//    }
//
//    @Test
//    public void createAccountCategories() throws Exception {
//        int databaseSizeBeforeCreate = accountCategoriesRepository.findAll().size();
//
//        // Create the AccountCategories
//        restAccountCategoriesMockMvc.perform(post("/api/account-categories")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(accountCategories)))
//            .andExpect(status().isCreated());
//
//        // Validate the AccountCategories in the database
//        List<AccountCategories> accountCategoriesList = accountCategoriesRepository.findAll();
//        assertThat(accountCategoriesList).hasSize(databaseSizeBeforeCreate + 1);
//        AccountCategories testAccountCategories = accountCategoriesList.get(accountCategoriesList.size() - 1);
//    }
//
//    @Test
//    public void createAccountCategoriesWithExistingId() throws Exception {
//        int databaseSizeBeforeCreate = accountCategoriesRepository.findAll().size();
//
//        // Create the AccountCategories with an existing ID
//        accountCategories.setId("existing_id");
//
//        // An entity with an existing ID cannot be created, so this API call must fail
//        restAccountCategoriesMockMvc.perform(post("/api/account-categories")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(accountCategories)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the AccountCategories in the database
//        List<AccountCategories> accountCategoriesList = accountCategoriesRepository.findAll();
//        assertThat(accountCategoriesList).hasSize(databaseSizeBeforeCreate);
//    }
//
//    @Test
//    public void getAllAccountCategories() throws Exception {
//        // Initialize the database
//        accountCategoriesRepository.save(accountCategories);
//
//        // Get all the accountCategoriesList
//        restAccountCategoriesMockMvc.perform(get("/api/account-categories?sort=id,desc"))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
//            .andExpect(jsonPath("$.[*].id").value(hasItem(accountCategories.getId())));
//    }
//    
//    @Test
//    public void getAccountCategories() throws Exception {
//        // Initialize the database
//        accountCategoriesRepository.save(accountCategories);
//
//        // Get the accountCategories
//        restAccountCategoriesMockMvc.perform(get("/api/account-categories/{id}", accountCategories.getId()))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
//            .andExpect(jsonPath("$.id").value(accountCategories.getId()));
//    }
//
//    @Test
//    public void getNonExistingAccountCategories() throws Exception {
//        // Get the accountCategories
//        restAccountCategoriesMockMvc.perform(get("/api/account-categories/{id}", Long.MAX_VALUE))
//            .andExpect(status().isNotFound());
//    }
//
//    @Test
//    public void updateAccountCategories() throws Exception {
//        // Initialize the database
//        accountCategoriesRepository.save(accountCategories);
//
//        int databaseSizeBeforeUpdate = accountCategoriesRepository.findAll().size();
//
//        // Update the accountCategories
//        AccountCategories updatedAccountCategories = accountCategoriesRepository.findById(accountCategories.getId()).get();
//
//        restAccountCategoriesMockMvc.perform(put("/api/account-categories")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(updatedAccountCategories)))
//            .andExpect(status().isOk());
//
//        // Validate the AccountCategories in the database
//        List<AccountCategories> accountCategoriesList = accountCategoriesRepository.findAll();
//        assertThat(accountCategoriesList).hasSize(databaseSizeBeforeUpdate);
//        AccountCategories testAccountCategories = accountCategoriesList.get(accountCategoriesList.size() - 1);
//    }
//
//    @Test
//    public void updateNonExistingAccountCategories() throws Exception {
//        int databaseSizeBeforeUpdate = accountCategoriesRepository.findAll().size();
//
//        // Create the AccountCategories
//
//        // If the entity doesn't have an ID, it will throw BadRequestAlertException
//        restAccountCategoriesMockMvc.perform(put("/api/account-categories")
//            .contentType(TestUtil.APPLICATION_JSON_UTF8)
//            .content(TestUtil.convertObjectToJsonBytes(accountCategories)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the AccountCategories in the database
//        List<AccountCategories> accountCategoriesList = accountCategoriesRepository.findAll();
//        assertThat(accountCategoriesList).hasSize(databaseSizeBeforeUpdate);
//    }
//
//    @Test
//    public void deleteAccountCategories() throws Exception {
//        // Initialize the database
//        accountCategoriesRepository.save(accountCategories);
//
//        int databaseSizeBeforeDelete = accountCategoriesRepository.findAll().size();
//
//        // Get the accountCategories
//        restAccountCategoriesMockMvc.perform(delete("/api/account-categories/{id}", accountCategories.getId())
//            .accept(TestUtil.APPLICATION_JSON_UTF8))
//            .andExpect(status().isOk());
//
//        // Validate the database is empty
//        List<AccountCategories> accountCategoriesList = accountCategoriesRepository.findAll();
//        assertThat(accountCategoriesList).hasSize(databaseSizeBeforeDelete - 1);
//    }
//
//    @Test
//    public void equalsVerifier() throws Exception {
//        TestUtil.equalsVerifier(AccountCategories.class);
//        AccountCategories accountCategories1 = new AccountCategories();
//        accountCategories1.setId("id1");
//        AccountCategories accountCategories2 = new AccountCategories();
//        accountCategories2.setId(accountCategories1.getId());
//        assertThat(accountCategories1).isEqualTo(accountCategories2);
//        accountCategories2.setId("id2");
//        assertThat(accountCategories1).isNotEqualTo(accountCategories2);
//        accountCategories1.setId(null);
//        assertThat(accountCategories1).isNotEqualTo(accountCategories2);
//    }
}
