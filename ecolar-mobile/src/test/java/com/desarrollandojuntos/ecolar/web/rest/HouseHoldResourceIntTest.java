package com.desarrollandojuntos.ecolar.web.rest;

import com.desarrollandojuntos.ecolar.EcolarApp;

import com.desarrollandojuntos.ecolar.domain.HouseHold;
import com.desarrollandojuntos.ecolar.repository.HouseHoldRepository;
import com.desarrollandojuntos.ecolar.service.HouseHoldService;
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
import org.springframework.validation.Validator;

import java.util.ArrayList;
import java.util.List;


import static com.desarrollandojuntos.ecolar.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HouseHoldResource REST controller.
 *
 * @see HouseHoldResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EcolarApp.class)
public class HouseHoldResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private HouseHoldRepository houseHoldRepository;

    @Mock
    private HouseHoldRepository houseHoldRepositoryMock;

    @Mock
    private HouseHoldService houseHoldServiceMock;

    @Autowired
    private HouseHoldService houseHoldService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restHouseHoldMockMvc;

    private HouseHold houseHold;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HouseHoldResource houseHoldResource = new HouseHoldResource(houseHoldService);
        this.restHouseHoldMockMvc = MockMvcBuilders.standaloneSetup(houseHoldResource)
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
    public static HouseHold createEntity() {
        HouseHold houseHold = new HouseHold()
            .name(DEFAULT_NAME);
        return houseHold;
    }

    @Before
    public void initTest() {
        houseHoldRepository.deleteAll();
        houseHold = createEntity();
    }

    @Test
    public void createHouseHold() throws Exception {
        int databaseSizeBeforeCreate = houseHoldRepository.findAll().size();

        // Create the HouseHold
        restHouseHoldMockMvc.perform(post("/api/house-holds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(houseHold)))
            .andExpect(status().isCreated());

        // Validate the HouseHold in the database
        List<HouseHold> houseHoldList = houseHoldRepository.findAll();
        assertThat(houseHoldList).hasSize(databaseSizeBeforeCreate + 1);
        HouseHold testHouseHold = houseHoldList.get(houseHoldList.size() - 1);
        assertThat(testHouseHold.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    public void createHouseHoldWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = houseHoldRepository.findAll().size();

        // Create the HouseHold with an existing ID
        houseHold.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restHouseHoldMockMvc.perform(post("/api/house-holds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(houseHold)))
            .andExpect(status().isBadRequest());

        // Validate the HouseHold in the database
        List<HouseHold> houseHoldList = houseHoldRepository.findAll();
        assertThat(houseHoldList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllHouseHolds() throws Exception {
        // Initialize the database
        houseHoldRepository.save(houseHold);

        // Get all the houseHoldList
        restHouseHoldMockMvc.perform(get("/api/house-holds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(houseHold.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllHouseHoldsWithEagerRelationshipsIsEnabled() throws Exception {
        HouseHoldResource houseHoldResource = new HouseHoldResource(houseHoldServiceMock);
        when(houseHoldServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restHouseHoldMockMvc = MockMvcBuilders.standaloneSetup(houseHoldResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restHouseHoldMockMvc.perform(get("/api/house-holds?eagerload=true"))
        .andExpect(status().isOk());

        verify(houseHoldServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllHouseHoldsWithEagerRelationshipsIsNotEnabled() throws Exception {
        HouseHoldResource houseHoldResource = new HouseHoldResource(houseHoldServiceMock);
            when(houseHoldServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restHouseHoldMockMvc = MockMvcBuilders.standaloneSetup(houseHoldResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restHouseHoldMockMvc.perform(get("/api/house-holds?eagerload=true"))
        .andExpect(status().isOk());

            verify(houseHoldServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    public void getHouseHold() throws Exception {
        // Initialize the database
        houseHoldRepository.save(houseHold);

        // Get the houseHold
        restHouseHoldMockMvc.perform(get("/api/house-holds/{id}", houseHold.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(houseHold.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    public void getNonExistingHouseHold() throws Exception {
        // Get the houseHold
        restHouseHoldMockMvc.perform(get("/api/house-holds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateHouseHold() throws Exception {
        // Initialize the database
        houseHoldService.save(houseHold);

        int databaseSizeBeforeUpdate = houseHoldRepository.findAll().size();

        // Update the houseHold
        HouseHold updatedHouseHold = houseHoldRepository.findById(houseHold.getId()).get();
        updatedHouseHold
            .name(UPDATED_NAME);

        restHouseHoldMockMvc.perform(put("/api/house-holds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHouseHold)))
            .andExpect(status().isOk());

        // Validate the HouseHold in the database
        List<HouseHold> houseHoldList = houseHoldRepository.findAll();
        assertThat(houseHoldList).hasSize(databaseSizeBeforeUpdate);
        HouseHold testHouseHold = houseHoldList.get(houseHoldList.size() - 1);
        assertThat(testHouseHold.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    public void updateNonExistingHouseHold() throws Exception {
        int databaseSizeBeforeUpdate = houseHoldRepository.findAll().size();

        // Create the HouseHold

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHouseHoldMockMvc.perform(put("/api/house-holds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(houseHold)))
            .andExpect(status().isBadRequest());

        // Validate the HouseHold in the database
        List<HouseHold> houseHoldList = houseHoldRepository.findAll();
        assertThat(houseHoldList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteHouseHold() throws Exception {
        // Initialize the database
        houseHoldService.save(houseHold);

        int databaseSizeBeforeDelete = houseHoldRepository.findAll().size();

        // Get the houseHold
        restHouseHoldMockMvc.perform(delete("/api/house-holds/{id}", houseHold.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HouseHold> houseHoldList = houseHoldRepository.findAll();
        assertThat(houseHoldList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HouseHold.class);
        HouseHold houseHold1 = new HouseHold();
        houseHold1.setId("id1");
        HouseHold houseHold2 = new HouseHold();
        houseHold2.setId(houseHold1.getId());
        assertThat(houseHold1).isEqualTo(houseHold2);
        houseHold2.setId("id2");
        assertThat(houseHold1).isNotEqualTo(houseHold2);
        houseHold1.setId(null);
        assertThat(houseHold1).isNotEqualTo(houseHold2);
    }
}
