package com.desarrollandojuntos.ecolar.web.rest;

import com.desarrollandojuntos.ecolar.EcolarMobileApp;

import com.desarrollandojuntos.ecolar.domain.MovementLine;
import com.desarrollandojuntos.ecolar.repository.MovementLineRepository;
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

import com.desarrollandojuntos.ecolar.domain.enumeration.LineType;
/**
 * Test class for the MovementLineResource REST controller.
 *
 * @see MovementLineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EcolarMobileApp.class)
public class MovementLineResourceIntTest {

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final LineType DEFAULT_EVENT_TYPE = LineType.CREDIT;
    private static final LineType UPDATED_EVENT_TYPE = LineType.DEBIT;

    @Autowired
    private MovementLineRepository movementLineRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restMovementLineMockMvc;

    private MovementLine movementLine;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MovementLineResource movementLineResource = new MovementLineResource(movementLineRepository);
        this.restMovementLineMockMvc = MockMvcBuilders.standaloneSetup(movementLineResource)
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
    public static MovementLine createEntity() {
        MovementLine movementLine = new MovementLine()
            .amount(DEFAULT_AMOUNT)
            .eventType(DEFAULT_EVENT_TYPE);
        return movementLine;
    }

    @Before
    public void initTest() {
        movementLineRepository.deleteAll();
        movementLine = createEntity();
    }

    @Test
    public void createMovementLine() throws Exception {
        int databaseSizeBeforeCreate = movementLineRepository.findAll().size();

        // Create the MovementLine
        restMovementLineMockMvc.perform(post("/api/movement-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movementLine)))
            .andExpect(status().isCreated());

        // Validate the MovementLine in the database
        List<MovementLine> movementLineList = movementLineRepository.findAll();
        assertThat(movementLineList).hasSize(databaseSizeBeforeCreate + 1);
        MovementLine testMovementLine = movementLineList.get(movementLineList.size() - 1);
        assertThat(testMovementLine.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testMovementLine.getEventType()).isEqualTo(DEFAULT_EVENT_TYPE);
    }

    @Test
    public void createMovementLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = movementLineRepository.findAll().size();

        // Create the MovementLine with an existing ID
        movementLine.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovementLineMockMvc.perform(post("/api/movement-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movementLine)))
            .andExpect(status().isBadRequest());

        // Validate the MovementLine in the database
        List<MovementLine> movementLineList = movementLineRepository.findAll();
        assertThat(movementLineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllMovementLines() throws Exception {
        // Initialize the database
        movementLineRepository.save(movementLine);

        // Get all the movementLineList
        restMovementLineMockMvc.perform(get("/api/movement-lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movementLine.getId())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].eventType").value(hasItem(DEFAULT_EVENT_TYPE.toString())));
    }
    
    @Test
    public void getMovementLine() throws Exception {
        // Initialize the database
        movementLineRepository.save(movementLine);

        // Get the movementLine
        restMovementLineMockMvc.perform(get("/api/movement-lines/{id}", movementLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(movementLine.getId()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.eventType").value(DEFAULT_EVENT_TYPE.toString()));
    }

    @Test
    public void getNonExistingMovementLine() throws Exception {
        // Get the movementLine
        restMovementLineMockMvc.perform(get("/api/movement-lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateMovementLine() throws Exception {
        // Initialize the database
        movementLineRepository.save(movementLine);

        int databaseSizeBeforeUpdate = movementLineRepository.findAll().size();

        // Update the movementLine
        MovementLine updatedMovementLine = movementLineRepository.findById(movementLine.getId()).get();
        updatedMovementLine
            .amount(UPDATED_AMOUNT)
            .eventType(UPDATED_EVENT_TYPE);

        restMovementLineMockMvc.perform(put("/api/movement-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMovementLine)))
            .andExpect(status().isOk());

        // Validate the MovementLine in the database
        List<MovementLine> movementLineList = movementLineRepository.findAll();
        assertThat(movementLineList).hasSize(databaseSizeBeforeUpdate);
        MovementLine testMovementLine = movementLineList.get(movementLineList.size() - 1);
        assertThat(testMovementLine.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testMovementLine.getEventType()).isEqualTo(UPDATED_EVENT_TYPE);
    }

    @Test
    public void updateNonExistingMovementLine() throws Exception {
        int databaseSizeBeforeUpdate = movementLineRepository.findAll().size();

        // Create the MovementLine

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovementLineMockMvc.perform(put("/api/movement-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movementLine)))
            .andExpect(status().isBadRequest());

        // Validate the MovementLine in the database
        List<MovementLine> movementLineList = movementLineRepository.findAll();
        assertThat(movementLineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteMovementLine() throws Exception {
        // Initialize the database
        movementLineRepository.save(movementLine);

        int databaseSizeBeforeDelete = movementLineRepository.findAll().size();

        // Get the movementLine
        restMovementLineMockMvc.perform(delete("/api/movement-lines/{id}", movementLine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MovementLine> movementLineList = movementLineRepository.findAll();
        assertThat(movementLineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MovementLine.class);
        MovementLine movementLine1 = new MovementLine();
        movementLine1.setId("id1");
        MovementLine movementLine2 = new MovementLine();
        movementLine2.setId(movementLine1.getId());
        assertThat(movementLine1).isEqualTo(movementLine2);
        movementLine2.setId("id2");
        assertThat(movementLine1).isNotEqualTo(movementLine2);
        movementLine1.setId(null);
        assertThat(movementLine1).isNotEqualTo(movementLine2);
    }
}
