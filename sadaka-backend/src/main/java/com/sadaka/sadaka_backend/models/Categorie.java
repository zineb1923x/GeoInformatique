package com.sadaka.sadaka_backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="categorie")

public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategorie;

    @Column(nullable = false, length = 100)
    private String nomCategorie;

    @Column(columnDefinition = "TEXT") // Correspond à TEXT en SQL
    private String description;
}
