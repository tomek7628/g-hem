package global.swarog.web.rest;

import global.swarog.GhemApp;
import global.swarog.domain.Exercise;
import global.swarog.repository.ExerciseRepository;
import global.swarog.service.ExerciseService;
import global.swarog.service.dto.ExerciseDTO;
import global.swarog.service.mapper.ExerciseMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import global.swarog.domain.enumeration.BodyPart;
/**
 * Integration tests for the {@link ExerciseResource} REST controller.
 */
@SpringBootTest(classes = GhemApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ExerciseResourceIT {

    private static final BodyPart DEFAULT_BODY_PART = BodyPart.CHEST;
    private static final BodyPart UPDATED_BODY_PART = BodyPart.BACK;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_SERIES = 1;
    private static final Integer UPDATED_SERIES = 2;

    private static final Float DEFAULT_WEIGHT = 1F;
    private static final Float UPDATED_WEIGHT = 2F;

    private static final LocalDate DEFAULT_MODIFIED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_MODIFIED = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private ExerciseMapper exerciseMapper;

    @Autowired
    private ExerciseService exerciseService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExerciseMockMvc;

    private Exercise exercise;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Exercise createEntity(EntityManager em) {
        Exercise exercise = new Exercise()
            .bodyPart(DEFAULT_BODY_PART)
            .name(DEFAULT_NAME)
            .series(DEFAULT_SERIES)
            .weight(DEFAULT_WEIGHT)
            .modified(DEFAULT_MODIFIED);
        return exercise;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Exercise createUpdatedEntity(EntityManager em) {
        Exercise exercise = new Exercise()
            .bodyPart(UPDATED_BODY_PART)
            .name(UPDATED_NAME)
            .series(UPDATED_SERIES)
            .weight(UPDATED_WEIGHT)
            .modified(UPDATED_MODIFIED);
        return exercise;
    }

    @BeforeEach
    public void initTest() {
        exercise = createEntity(em);
    }

    @Test
    @Transactional
    public void createExercise() throws Exception {
        int databaseSizeBeforeCreate = exerciseRepository.findAll().size();

        // Create the Exercise
        ExerciseDTO exerciseDTO = exerciseMapper.toDto(exercise);
        restExerciseMockMvc.perform(post("/api/exercises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exerciseDTO)))
            .andExpect(status().isCreated());

        // Validate the Exercise in the database
        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeCreate + 1);
        Exercise testExercise = exerciseList.get(exerciseList.size() - 1);
        assertThat(testExercise.getBodyPart()).isEqualTo(DEFAULT_BODY_PART);
        assertThat(testExercise.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testExercise.getSeries()).isEqualTo(DEFAULT_SERIES);
        assertThat(testExercise.getWeight()).isEqualTo(DEFAULT_WEIGHT);
        assertThat(testExercise.getModified()).isEqualTo(DEFAULT_MODIFIED);
    }

    @Test
    @Transactional
    public void createExerciseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = exerciseRepository.findAll().size();

        // Create the Exercise with an existing ID
        exercise.setId(1L);
        ExerciseDTO exerciseDTO = exerciseMapper.toDto(exercise);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExerciseMockMvc.perform(post("/api/exercises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exerciseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Exercise in the database
        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = exerciseRepository.findAll().size();
        // set the field null
        exercise.setName(null);

        // Create the Exercise, which fails.
        ExerciseDTO exerciseDTO = exerciseMapper.toDto(exercise);

        restExerciseMockMvc.perform(post("/api/exercises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exerciseDTO)))
            .andExpect(status().isBadRequest());

        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSeriesIsRequired() throws Exception {
        int databaseSizeBeforeTest = exerciseRepository.findAll().size();
        // set the field null
        exercise.setSeries(null);

        // Create the Exercise, which fails.
        ExerciseDTO exerciseDTO = exerciseMapper.toDto(exercise);

        restExerciseMockMvc.perform(post("/api/exercises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exerciseDTO)))
            .andExpect(status().isBadRequest());

        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWeightIsRequired() throws Exception {
        int databaseSizeBeforeTest = exerciseRepository.findAll().size();
        // set the field null
        exercise.setWeight(null);

        // Create the Exercise, which fails.
        ExerciseDTO exerciseDTO = exerciseMapper.toDto(exercise);

        restExerciseMockMvc.perform(post("/api/exercises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exerciseDTO)))
            .andExpect(status().isBadRequest());

        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExercises() throws Exception {
        // Initialize the database
        exerciseRepository.saveAndFlush(exercise);

        // Get all the exerciseList
        restExerciseMockMvc.perform(get("/api/exercises?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exercise.getId().intValue())))
            .andExpect(jsonPath("$.[*].bodyPart").value(hasItem(DEFAULT_BODY_PART.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].series").value(hasItem(DEFAULT_SERIES)))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].modified").value(hasItem(DEFAULT_MODIFIED.toString())));
    }
    
    @Test
    @Transactional
    public void getExercise() throws Exception {
        // Initialize the database
        exerciseRepository.saveAndFlush(exercise);

        // Get the exercise
        restExerciseMockMvc.perform(get("/api/exercises/{id}", exercise.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(exercise.getId().intValue()))
            .andExpect(jsonPath("$.bodyPart").value(DEFAULT_BODY_PART.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.series").value(DEFAULT_SERIES))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT.doubleValue()))
            .andExpect(jsonPath("$.modified").value(DEFAULT_MODIFIED.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExercise() throws Exception {
        // Get the exercise
        restExerciseMockMvc.perform(get("/api/exercises/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExercise() throws Exception {
        // Initialize the database
        exerciseRepository.saveAndFlush(exercise);

        int databaseSizeBeforeUpdate = exerciseRepository.findAll().size();

        // Update the exercise
        Exercise updatedExercise = exerciseRepository.findById(exercise.getId()).get();
        // Disconnect from session so that the updates on updatedExercise are not directly saved in db
        em.detach(updatedExercise);
        updatedExercise
            .bodyPart(UPDATED_BODY_PART)
            .name(UPDATED_NAME)
            .series(UPDATED_SERIES)
            .weight(UPDATED_WEIGHT)
            .modified(UPDATED_MODIFIED);
        ExerciseDTO exerciseDTO = exerciseMapper.toDto(updatedExercise);

        restExerciseMockMvc.perform(put("/api/exercises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exerciseDTO)))
            .andExpect(status().isOk());

        // Validate the Exercise in the database
        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeUpdate);
        Exercise testExercise = exerciseList.get(exerciseList.size() - 1);
        assertThat(testExercise.getBodyPart()).isEqualTo(UPDATED_BODY_PART);
        assertThat(testExercise.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testExercise.getSeries()).isEqualTo(UPDATED_SERIES);
        assertThat(testExercise.getWeight()).isEqualTo(UPDATED_WEIGHT);
        assertThat(testExercise.getModified()).isEqualTo(UPDATED_MODIFIED);
    }

    @Test
    @Transactional
    public void updateNonExistingExercise() throws Exception {
        int databaseSizeBeforeUpdate = exerciseRepository.findAll().size();

        // Create the Exercise
        ExerciseDTO exerciseDTO = exerciseMapper.toDto(exercise);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExerciseMockMvc.perform(put("/api/exercises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exerciseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Exercise in the database
        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExercise() throws Exception {
        // Initialize the database
        exerciseRepository.saveAndFlush(exercise);

        int databaseSizeBeforeDelete = exerciseRepository.findAll().size();

        // Delete the exercise
        restExerciseMockMvc.perform(delete("/api/exercises/{id}", exercise.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
