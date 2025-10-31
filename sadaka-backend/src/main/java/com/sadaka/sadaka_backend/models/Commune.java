package com.sadaka.sadaka_backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import org.locationtech.jts.geom.Point;

@Data
@Entity
@Table(name="commune")
public class Commune {
    @Id
    private Long idCommune;

    private String nomCommune;

    private String province;

    // Hibernate Spatial va gérer la conversion
    private Point centroide;
}
