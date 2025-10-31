package com.sadaka.sadaka_backend.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;

@Data
@Entity
@Table(name="annonce")
public class Annonce {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAnnonce;

    @Column(nullable = false, length = 150)
    private String titre;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 50)
    private String quantite;

    @Column(length = 255)
    private String photo; // Souvent, c'est un lien (URL) vers la photo

    @CreationTimestamp // Gère DEFAULT CURRENT_DATE
    private LocalDate datePublication;

    // Gère le CHECK ('en_attente', 'valide', 'rejete')
    @Column(length = 20)
    private String statut;

    // --- Relations Clé Étrangère ---

    @ManyToOne
    @JoinColumn(name = "idUtilisateur")
    // Note: ON DELETE SET NULL est le comportement par défaut de JPA
    // si l'entité est supprimée via le code.
    // Pour la contrainte BDD, c'est plus complexe, mais cela fonctionnera.
    private Utilisateur utilisateur;

    @ManyToOne
    @JoinColumn(name = "idCategorie")
    private Categorie categorie;

    @ManyToOne
    @JoinColumn(name = "idCommune")
    private Commune commune;
    }


