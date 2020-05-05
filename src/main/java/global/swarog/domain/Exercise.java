package global.swarog.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import global.swarog.domain.enumeration.BodyPart;

/**
 * A Exercise.
 */
@Entity
@Table(name = "exercise")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Exercise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "body_part")
    private BodyPart bodyPart;

    @NotNull
    @Size(max = 50)
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @NotNull
    @Column(name = "series", nullable = false)
    private Integer series;

    @NotNull
    @Column(name = "weight", nullable = false)
    private Float weight;

    @Column(name = "modified")
    private LocalDate modified;

    @OneToMany(mappedBy = "exercise")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Position> positions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BodyPart getBodyPart() {
        return bodyPart;
    }

    public Exercise bodyPart(BodyPart bodyPart) {
        this.bodyPart = bodyPart;
        return this;
    }

    public void setBodyPart(BodyPart bodyPart) {
        this.bodyPart = bodyPart;
    }

    public String getName() {
        return name;
    }

    public Exercise name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSeries() {
        return series;
    }

    public Exercise series(Integer series) {
        this.series = series;
        return this;
    }

    public void setSeries(Integer series) {
        this.series = series;
    }

    public Float getWeight() {
        return weight;
    }

    public Exercise weight(Float weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public LocalDate getModified() {
        return modified;
    }

    public Exercise modified(LocalDate modified) {
        this.modified = modified;
        return this;
    }

    public void setModified(LocalDate modified) {
        this.modified = modified;
    }

    public Set<Position> getPositions() {
        return positions;
    }

    public Exercise positions(Set<Position> positions) {
        this.positions = positions;
        return this;
    }

    public Exercise addPosition(Position position) {
        this.positions.add(position);
        position.setExercise(this);
        return this;
    }

    public Exercise removePosition(Position position) {
        this.positions.remove(position);
        position.setExercise(null);
        return this;
    }

    public void setPositions(Set<Position> positions) {
        this.positions = positions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Exercise)) {
            return false;
        }
        return id != null && id.equals(((Exercise) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Exercise{" +
            "id=" + getId() +
            ", bodyPart='" + getBodyPart() + "'" +
            ", name='" + getName() + "'" +
            ", series=" + getSeries() +
            ", weight=" + getWeight() +
            ", modified='" + getModified() + "'" +
            "}";
    }
}
