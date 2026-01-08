package com.sadaqah.sadaqah.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sadaqah.sadaqah.dto.DemandeRequest;
import com.sadaqah.sadaqah.model.Demande;
import com.sadaqah.sadaqah.service.DemandeService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class DemandeController {

    @Autowired
    private DemandeService demandeService;

    // ==============================
    // ===== VERSION CLASSIQUE =====
    // ==============================

    // Demandes par utilisateur
    @GetMapping("/demandes/user/{id}")
    public List<Demande> demandesParUser(@PathVariable Long id) {
        return demandeService.demandesParUser(id);
    }

    // Demandes par annonce
    @GetMapping("/demandes/annonce/{id}")
    public List<Demande> demandesParAnnonce(@PathVariable Long id) {
        return demandeService.demandesParAnnonce(id);
    }

    // Créer une demande (ancienne version)
    @PostMapping("/demandes")
    public ResponseEntity<?> createDemandeLegacy(
            @RequestParam("id_annonce") Long idAnnonce,
            @RequestParam("id_user") Long idUser) {

        boolean saved = demandeService.save_annonce(idAnnonce, idUser);
        if (!saved) {
            return ResponseEntity.badRequest().body("Erreur lors de la création de la demande");
        }
        return ResponseEntity.ok("Demande créée avec succès");
    }

    // Supprimer une demande
    @DeleteMapping("/demandes/{id}")
    public void delete(@PathVariable Long id) {
        demandeService.delete(id);
    }

    // ==============================
    // ===== VERSION MOBILE ✅ =====
    // ==============================

    // 🔹 POST /interests
    @PostMapping("/interests")
    public ResponseEntity<?> createInterest(@RequestBody DemandeRequest request) {

        boolean saved = demandeService.save_annonce(
                request.getAnnonceId(),
                request.getUserId()
        );

        if (!saved) {
            return ResponseEntity.badRequest().body("Erreur lors de la création de l'intérêt");
        }

        return ResponseEntity.ok("Intérêt créé avec succès");
    }

    // 🔹 GET /interests/annonce/{id}
    @GetMapping("/interests/annonce/{annonceId}")
    public List<Demande> getInterestsByAnnonce(@PathVariable Long annonceId) {
        return demandeService.demandesParAnnonce(annonceId);
    }

    // 🔹 GET /interests/mes/{userId}
    @GetMapping("/interests/mes/{userId}")
    public List<Demande> getMyInterests(@PathVariable Long userId) {
        return demandeService.demandesParUser(userId);
    }
}
