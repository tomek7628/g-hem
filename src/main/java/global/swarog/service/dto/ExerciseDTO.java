package global.swarog.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import global.swarog.domain.enumeration.BodyPart;

/**
 * A DTO for the {@link global.swarog.domain.Exercise} entity.
 */
public class ExerciseDTO implements Serializable {
    
    private Long id;

    private BodyPart bodyPart;

    @NotNull
    @Size(max = 50)
    private String name;

    @NotNull
    private Integer series;

    @NotNull
    private Float weight;

    private LocalDate modified;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BodyPart getBodyPart() {
        return bodyPart;
    }

    public void setBodyPart(BodyPart bodyPart) {
        this.bodyPart = bodyPart;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSeries() {
        return series;
    }

    public void setSeries(Integer series) {
        this.series = series;
    }

    public Float getWeight() {
        return weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public LocalDate getModified() {
        return modified;
    }

    public void setModified(LocalDate modified) {
        this.modified = modified;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ExerciseDTO exerciseDTO = (ExerciseDTO) o;
        if (exerciseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), exerciseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExerciseDTO{" +
            "id=" + getId() +
            ", bodyPart='" + getBodyPart() + "'" +
            ", name='" + getName() + "'" +
            ", series=" + getSeries() +
            ", weight=" + getWeight() +
            ", modified='" + getModified() + "'" +
            "}";
    }
}
