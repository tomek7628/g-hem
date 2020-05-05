package global.swarog.service.mapper;


import global.swarog.domain.*;
import global.swarog.service.dto.ScheduleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Schedule} and its DTO {@link ScheduleDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ScheduleMapper extends EntityMapper<ScheduleDTO, Schedule> {


    @Mapping(target = "positions", ignore = true)
    @Mapping(target = "removePosition", ignore = true)
    Schedule toEntity(ScheduleDTO scheduleDTO);

    default Schedule fromId(Long id) {
        if (id == null) {
            return null;
        }
        Schedule schedule = new Schedule();
        schedule.setId(id);
        return schedule;
    }
}
