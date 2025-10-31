package com.sadaka.sadaka_backend.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import java.time.LocalDateTime;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
@Table(name="notification")

public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idNotification;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @CreationTimestamp // Gère automatiquement DEFAULT NOW()
    private LocalDateTime dateEnvoi;

    // --- Relation Clé Étrangère ---
    // "Plusieurs" notifications pour "Un" utilisateur
    @ManyToOne
    @JoinColumn(name = "idUtilisateur") // Le nom de la colonne de la clé étrangère
    @OnDelete(action = OnDeleteAction.CASCADE) // Correspond à ON DELETE CASCADE
    private Utilisateur utilisateur;
}
