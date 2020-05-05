package global.swarog.service.mapper;


import global.swarog.domain.*;
import global.swarog.service.dto.ExerciseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Exercise} and its DTO {@link ExerciseDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ExerciseMapper extends EntityMapper<ExerciseDTO, Exercise> {


    @Mapping(target = "positions", ignore = true)
    @Mapping(target = "removePosition", ignore = true)
    Exercise toEntity(ExerciseDTO exerciseDTO);

    default Exercise fromId(Long id) {
        if (id == null) {
            return null;
        }
        Exercise exercise = new Exercise();
        exercise.setId(id);
        return exercise;
    }
}
