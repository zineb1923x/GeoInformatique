package com.sadaka.sadaka_backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="utilisateur")
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idUtilisateur;
    private String email;
    private String motDePasse;
    private boolean role; // true = admin, false = autre
}
