package global.swarog.service.mapper;


import global.swarog.domain.*;
import global.swarog.service.dto.PositionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Position} and its DTO {@link PositionDTO}.
 */
@Mapper(componentModel = "spring", uses = {ScheduleMapper.class, ExerciseMapper.class})
public interface PositionMapper extends EntityMapper<PositionDTO, Position> {

    @Mapping(source = "schedule.id", target = "scheduleId")
    @Mapping(source = "exercise.id", target = "exerciseId")
    PositionDTO toDto(Position position);

    @Mapping(source = "scheduleId", target = "schedule")
    @Mapping(source = "exerciseId", target = "exercise")
    Position toEntity(PositionDTO positionDTO);

    default Position fromId(Long id) {
        if (id == null) {
            return null;
        }
        Position position = new Position();
        position.setId(id);
        return position;
    }
}
