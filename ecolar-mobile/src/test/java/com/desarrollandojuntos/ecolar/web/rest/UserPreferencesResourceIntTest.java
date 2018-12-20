package com.desarrollandojuntos.ecolar.web.rest;

import com.desarrollandojuntos.ecolar.EcolarApp;

import com.desarrollandojuntos.ecolar.domain.UserPreferences;
import com.desarrollandojuntos.ecolar.repository.UserPreferencesRepository;
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
import org.springframework.validation.Validator;

import java.util.List;


import static com.desarrollandojuntos.ecolar.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserPreferencesResource REST controller.
 *
 * @see UserPreferencesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EcolarApp.class)
public class UserPreferencesResourceIntTest {

    @Autowired
    private UserPreferencesRepository userPreferencesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restUserPreferencesMockMvc;

    private UserPreferences userPreferences;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserPreferencesResource userPreferencesResource = new UserPreferencesResource(userPreferencesRepository);
        this.restUserPreferencesMockMvc = MockMvcBuilders.standaloneSetup(userPreferencesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserPreferences createEntity() {
        UserPreferences userPreferences = new UserPreferences();
        return userPreferences;
    }

    @Before
    public void initTest() {
        userPreferencesRepository.deleteAll();
        userPreferences = createEntity();
    }

    @Test
    public void createUserPreferences() throws Exception {
        int databaseSizeBeforeCreate = userPreferencesRepository.findAll().size();

        // Create the UserPreferences
        restUserPreferencesMockMvc.perform(post("/api/user-preferences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userPreferences)))
            .andExpect(status().isCreated());

        // Validate the UserPreferences in the database
        List<UserPreferences> userPreferencesList = userPreferencesRepository.findAll();
        assertThat(userPreferencesList).hasSize(databaseSizeBeforeCreate + 1);
        UserPreferences testUserPreferences = userPreferencesList.get(userPreferencesList.size() - 1);
    }

    @Test
    public void createUserPreferencesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userPreferencesRepository.findAll().size();

        // Create the UserPreferences with an existing ID
        userPreferences.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserPreferencesMockMvc.perform(post("/api/user-preferences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userPreferences)))
            .andExpect(status().isBadRequest());

        // Validate the UserPreferences in the database
        List<UserPreferences> userPreferencesList = userPreferencesRepository.findAll();
        assertThat(userPreferencesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllUserPreferences() throws Exception {
        // Initialize the database
        userPreferencesRepository.save(userPreferences);

        // Get all the userPreferencesList
        restUserPreferencesMockMvc.perform(get("/api/user-preferences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userPreferences.getId())));
    }
    
    @Test
    public void getUserPreferences() throws Exception {
        // Initialize the database
        userPreferencesRepository.save(userPreferences);

        // Get the userPreferences
        restUserPreferencesMockMvc.perform(get("/api/user-preferences/{id}", userPreferences.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userPreferences.getId()));
    }

    @Test
    public void getNonExistingUserPreferences() throws Exception {
        // Get the userPreferences
        restUserPreferencesMockMvc.perform(get("/api/user-preferences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateUserPreferences() throws Exception {
        // Initialize the database
        userPreferencesRepository.save(userPreferences);

        int databaseSizeBeforeUpdate = userPreferencesRepository.findAll().size();

        // Update the userPreferences
        UserPreferences updatedUserPreferences = userPreferencesRepository.findById(userPreferences.getId()).get();

        restUserPreferencesMockMvc.perform(put("/api/user-preferences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserPreferences)))
            .andExpect(status().isOk());

        // Validate the UserPreferences in the database
        List<UserPreferences> userPreferencesList = userPreferencesRepository.findAll();
        assertThat(userPreferencesList).hasSize(databaseSizeBeforeUpdate);
        UserPreferences testUserPreferences = userPreferencesList.get(userPreferencesList.size() - 1);
    }

    @Test
    public void updateNonExistingUserPreferences() throws Exception {
        int databaseSizeBeforeUpdate = userPreferencesRepository.findAll().size();

        // Create the UserPreferences

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserPreferencesMockMvc.perform(put("/api/user-preferences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userPreferences)))
            .andExpect(status().isBadRequest());

        // Validate the UserPreferences in the database
        List<UserPreferences> userPreferencesList = userPreferencesRepository.findAll();
        assertThat(userPreferencesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteUserPreferences() throws Exception {
        // Initialize the database
        userPreferencesRepository.save(userPreferences);

        int databaseSizeBeforeDelete = userPreferencesRepository.findAll().size();

        // Get the userPreferences
        restUserPreferencesMockMvc.perform(delete("/api/user-preferences/{id}", userPreferences.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserPreferences> userPreferencesList = userPreferencesRepository.findAll();
        assertThat(userPreferencesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserPreferences.class);
        UserPreferences userPreferences1 = new UserPreferences();
        userPreferences1.setId("id1");
        UserPreferences userPreferences2 = new UserPreferences();
        userPreferences2.setId(userPreferences1.getId());
        assertThat(userPreferences1).isEqualTo(userPreferences2);
        userPreferences2.setId("id2");
        assertThat(userPreferences1).isNotEqualTo(userPreferences2);
        userPreferences1.setId(null);
        assertThat(userPreferences1).isNotEqualTo(userPreferences2);
    }
}
