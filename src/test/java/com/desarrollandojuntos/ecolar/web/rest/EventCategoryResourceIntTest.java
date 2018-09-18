package com.desarrollandojuntos.ecolar.web.rest;

import com.desarrollandojuntos.ecolar.EcolarApp;

import com.desarrollandojuntos.ecolar.domain.EventCategory;
import com.desarrollandojuntos.ecolar.repository.EventCategoryRepository;
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
 * Test class for the EventCategoryResource REST controller.
 *
 * @see EventCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EcolarApp.class)
public class EventCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private EventCategoryRepository eventCategoryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restEventCategoryMockMvc;

    private EventCategory eventCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EventCategoryResource eventCategoryResource = new EventCategoryResource(eventCategoryRepository);
        this.restEventCategoryMockMvc = MockMvcBuilders.standaloneSetup(eventCategoryResource)
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
    public static EventCategory createEntity() {
        EventCategory eventCategory = new EventCategory()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return eventCategory;
    }

    @Before
    public void initTest() {
        eventCategoryRepository.deleteAll();
        eventCategory = createEntity();
    }

    @Test
    public void createEventCategory() throws Exception {
        int databaseSizeBeforeCreate = eventCategoryRepository.findAll().size();

        // Create the EventCategory
        restEventCategoryMockMvc.perform(post("/api/event-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventCategory)))
            .andExpect(status().isCreated());

        // Validate the EventCategory in the database
        List<EventCategory> eventCategoryList = eventCategoryRepository.findAll();
        assertThat(eventCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        EventCategory testEventCategory = eventCategoryList.get(eventCategoryList.size() - 1);
        assertThat(testEventCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEventCategory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    public void createEventCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eventCategoryRepository.findAll().size();

        // Create the EventCategory with an existing ID
        eventCategory.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restEventCategoryMockMvc.perform(post("/api/event-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventCategory)))
            .andExpect(status().isBadRequest());

        // Validate the EventCategory in the database
        List<EventCategory> eventCategoryList = eventCategoryRepository.findAll();
        assertThat(eventCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllEventCategories() throws Exception {
        // Initialize the database
        eventCategoryRepository.save(eventCategory);

        // Get all the eventCategoryList
        restEventCategoryMockMvc.perform(get("/api/event-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eventCategory.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    public void getEventCategory() throws Exception {
        // Initialize the database
        eventCategoryRepository.save(eventCategory);

        // Get the eventCategory
        restEventCategoryMockMvc.perform(get("/api/event-categories/{id}", eventCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(eventCategory.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    public void getNonExistingEventCategory() throws Exception {
        // Get the eventCategory
        restEventCategoryMockMvc.perform(get("/api/event-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateEventCategory() throws Exception {
        // Initialize the database
        eventCategoryRepository.save(eventCategory);

        int databaseSizeBeforeUpdate = eventCategoryRepository.findAll().size();

        // Update the eventCategory
        EventCategory updatedEventCategory = eventCategoryRepository.findById(eventCategory.getId()).get();
        updatedEventCategory
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restEventCategoryMockMvc.perform(put("/api/event-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEventCategory)))
            .andExpect(status().isOk());

        // Validate the EventCategory in the database
        List<EventCategory> eventCategoryList = eventCategoryRepository.findAll();
        assertThat(eventCategoryList).hasSize(databaseSizeBeforeUpdate);
        EventCategory testEventCategory = eventCategoryList.get(eventCategoryList.size() - 1);
        assertThat(testEventCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEventCategory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    public void updateNonExistingEventCategory() throws Exception {
        int databaseSizeBeforeUpdate = eventCategoryRepository.findAll().size();

        // Create the EventCategory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEventCategoryMockMvc.perform(put("/api/event-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventCategory)))
            .andExpect(status().isBadRequest());

        // Validate the EventCategory in the database
        List<EventCategory> eventCategoryList = eventCategoryRepository.findAll();
        assertThat(eventCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteEventCategory() throws Exception {
        // Initialize the database
        eventCategoryRepository.save(eventCategory);

        int databaseSizeBeforeDelete = eventCategoryRepository.findAll().size();

        // Get the eventCategory
        restEventCategoryMockMvc.perform(delete("/api/event-categories/{id}", eventCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EventCategory> eventCategoryList = eventCategoryRepository.findAll();
        assertThat(eventCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EventCategory.class);
        EventCategory eventCategory1 = new EventCategory();
        eventCategory1.setId("id1");
        EventCategory eventCategory2 = new EventCategory();
        eventCategory2.setId(eventCategory1.getId());
        assertThat(eventCategory1).isEqualTo(eventCategory2);
        eventCategory2.setId("id2");
        assertThat(eventCategory1).isNotEqualTo(eventCategory2);
        eventCategory1.setId(null);
        assertThat(eventCategory1).isNotEqualTo(eventCategory2);
    }
}
