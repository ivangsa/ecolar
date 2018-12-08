package com.desarrollandojuntos.ecolar.web.rest;

import static com.desarrollandojuntos.ecolar.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;

import com.desarrollandojuntos.ecolar.EcolarApp;
import com.desarrollandojuntos.ecolar.domain.Category;
import com.desarrollandojuntos.ecolar.domain.enumeration.AccountType;
import com.desarrollandojuntos.ecolar.service.HouseHoldService;
import com.desarrollandojuntos.ecolar.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

/**
 * Test class for the CategoryResource REST controller.
 *
 * @see CategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EcolarApp.class)
public class CategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_PATH = "AAAAAAAAAA";
    private static final String UPDATED_PATH = "BBBBBBBBBB";

    private static final String DEFAULT_PARENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_PARENT_ID = "BBBBBBBBBB";

    private static final AccountType DEFAULT_ACCOUNT_TYPE = AccountType.ASSETS;
    private static final AccountType UPDATED_ACCOUNT_TYPE = AccountType.LIABILITIES;

    @Autowired
    private HouseHoldService houseHoldService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restCategoryMockMvc;

    private Category category;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CategoryResource categoryResource = new CategoryResource(houseHoldService);
        this.restCategoryMockMvc = MockMvcBuilders.standaloneSetup(categoryResource)
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
    public static Category createEntity() {
        Category category = new Category()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .path(DEFAULT_PATH)
            .parentId(DEFAULT_PARENT_ID)
            .accountType(DEFAULT_ACCOUNT_TYPE);
        return category;
    }

    @Before
    public void initTest() {
        //houseHoldService.deleteAllCategories();
        category = createEntity();
    }

    @Test
    public void createCategory() throws Exception {
        // int databaseSizeBeforeCreate = houseHoldService.findAll().size();

        // // Create the Category
        // restCategoryMockMvc.perform(post("/api/categories")
        //     .contentType(TestUtil.APPLICATION_JSON_UTF8)
        //     .content(TestUtil.convertObjectToJsonBytes(category)))
        //     .andExpect(status().isCreated());

        // Validate the Category in the database
        // List<Category> categoryList = houseHoldService.findAll();
        // assertThat(categoryList).hasSize(databaseSizeBeforeCreate + 1);
        // Category testCategory = categoryList.get(categoryList.size() - 1);
        // assertThat(testCategory.getName()).isEqualTo(DEFAULT_NAME);
        // assertThat(testCategory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        // assertThat(testCategory.getPath()).isEqualTo(DEFAULT_PATH);
        // assertThat(testCategory.getParentId()).isEqualTo(DEFAULT_PARENT_ID);
        // assertThat(testCategory.getAccountType()).isEqualTo(DEFAULT_ACCOUNT_TYPE);
    }

    @Test
    public void createCategoryWithExistingId() throws Exception {
        // int databaseSizeBeforeCreate = houseHoldService.findAll().size();

        // // Create the Category with an existing ID
        // category.setId("existing_id");

        // // An entity with an existing ID cannot be created, so this API call must fail
        // restCategoryMockMvc.perform(post("/api/categories")
        //     .contentType(TestUtil.APPLICATION_JSON_UTF8)
        //     .content(TestUtil.convertObjectToJsonBytes(category)))
        //     .andExpect(status().isBadRequest());

        // // Validate the Category in the database
        // List<Category> categoryList = houseHoldService.findAll();
        // assertThat(categoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllCategories() throws Exception {
        // // Initialize the database
        // houseHoldService.save(category);

        // // Get all the categoryList
        // restCategoryMockMvc.perform(get("/api/categories?sort=id,desc"))
        //     .andExpect(status().isOk())
        //     .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
        //     .andExpect(jsonPath("$.[*].id").value(hasItem(category.getId())))
        //     .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
        //     .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
        //     .andExpect(jsonPath("$.[*].path").value(hasItem(DEFAULT_PATH.toString())))
        //     .andExpect(jsonPath("$.[*].parentId").value(hasItem(DEFAULT_PARENT_ID.toString())))
        //     .andExpect(jsonPath("$.[*].accountType").value(hasItem(DEFAULT_ACCOUNT_TYPE.toString())));
    }
    
    @Test
    public void getCategory() throws Exception {
        // // Initialize the database
        // houseHoldService.save(category);

        // // Get the category
        // restCategoryMockMvc.perform(get("/api/categories/{id}", category.getId()))
        //     .andExpect(status().isOk())
        //     .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
        //     .andExpect(jsonPath("$.id").value(category.getId()))
        //     .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
        //     .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
        //     .andExpect(jsonPath("$.path").value(DEFAULT_PATH.toString()))
        //     .andExpect(jsonPath("$.parentId").value(DEFAULT_PARENT_ID.toString()))
        //     .andExpect(jsonPath("$.accountType").value(DEFAULT_ACCOUNT_TYPE.toString()));
    }

    @Test
    public void getNonExistingCategory() throws Exception {
        // // Get the category
        // restCategoryMockMvc.perform(get("/api/categories/{id}", Long.MAX_VALUE))
        //     .andExpect(status().isNotFound());
    }

    @Test
    public void updateCategory() throws Exception {
        // // Initialize the database
        // houseHoldService.save(category);

        // int databaseSizeBeforeUpdate = houseHoldService.findAll().size();

        // // Update the category
        // Category updatedCategory = houseHoldService.findById(category.getId()).get();
        // updatedCategory
        //     .name(UPDATED_NAME)
        //     .description(UPDATED_DESCRIPTION)
        //     .path(UPDATED_PATH)
        //     .parentId(UPDATED_PARENT_ID)
        //     .accountType(UPDATED_ACCOUNT_TYPE);

        // restCategoryMockMvc.perform(put("/api/categories")
        //     .contentType(TestUtil.APPLICATION_JSON_UTF8)
        //     .content(TestUtil.convertObjectToJsonBytes(updatedCategory)))
        //     .andExpect(status().isOk());

        // // Validate the Category in the database
        // List<Category> categoryList = houseHoldService.findAll();
        // assertThat(categoryList).hasSize(databaseSizeBeforeUpdate);
        // Category testCategory = categoryList.get(categoryList.size() - 1);
        // assertThat(testCategory.getName()).isEqualTo(UPDATED_NAME);
        // assertThat(testCategory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        // assertThat(testCategory.getPath()).isEqualTo(UPDATED_PATH);
        // assertThat(testCategory.getParentId()).isEqualTo(UPDATED_PARENT_ID);
        // assertThat(testCategory.getAccountType()).isEqualTo(UPDATED_ACCOUNT_TYPE);
    }

    @Test
    public void updateNonExistingCategory() throws Exception {
        // int databaseSizeBeforeUpdate = houseHoldService.findAll().size();

        // // Create the Category

        // // If the entity doesn't have an ID, it will throw BadRequestAlertException
        // restCategoryMockMvc.perform(put("/api/categories")
        //     .contentType(TestUtil.APPLICATION_JSON_UTF8)
        //     .content(TestUtil.convertObjectToJsonBytes(category)))
        //     .andExpect(status().isBadRequest());

        // // Validate the Category in the database
        // List<Category> categoryList = houseHoldService.findAll();
        // assertThat(categoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteCategory() throws Exception {
        // // Initialize the database
        // houseHoldService.save(category);

        // int databaseSizeBeforeDelete = houseHoldService.findAll().size();

        // // Get the category
        // restCategoryMockMvc.perform(delete("/api/categories/{id}", category.getId())
        //     .accept(TestUtil.APPLICATION_JSON_UTF8))
        //     .andExpect(status().isOk());

        // // Validate the database is empty
        // List<Category> categoryList = houseHoldService.findAll();
        // assertThat(categoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Category.class);
        Category category1 = new Category();
        category1.setId("id1");
        Category category2 = new Category();
        category2.setId(category1.getId());
        assertThat(category1).isEqualTo(category2);
        category2.setId("id2");
        assertThat(category1).isNotEqualTo(category2);
        category1.setId(null);
        assertThat(category1).isNotEqualTo(category2);
    }
}
