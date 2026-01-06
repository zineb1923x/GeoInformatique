package com.sadaqah.sadaqah.controller;

import java.util.List;
import java.util.Optional;

import com.sadaqah.sadaqah.dto.AnnonceRequest;
import com.sadaqah.sadaqah.dto.AnnonceResponse;
import com.sadaqah.sadaqah.model.Annonce;
import com.sadaqah.sadaqah.service.AnnonceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class AnnonceController {

    @Autowired
    private AnnonceService annonceService;

    @GetMapping("/annonces")
    public List<Annonce> getAllApproved() {
        return annonceService.findAllApproved();
    }

    @GetMapping("/annonces/{id}")
    public ResponseEntity<AnnonceResponse> getAnnonceById(@PathVariable Long id) {
        Optional<Annonce> annonce = annonceService.findById(id);
        if (annonce.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(annonceService.createAnnonce(mapToRequest(annonce.get())));
    }


    @PostMapping("/annonces")
    public ResponseEntity<AnnonceResponse> createAnnonce(@RequestBody AnnonceRequest request) {
        AnnonceResponse response = annonceService.createAnnonce(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/annonces/{id}")
    public ResponseEntity<AnnonceResponse> updateAnnonce(@PathVariable Long id, @RequestBody AnnonceRequest request) {
        boolean updated = annonceService.updateAnnonce(id, request);
        if (!updated) return ResponseEntity.notFound().build();
        Optional<Annonce> annonce = annonceService.findById(id);
        return ResponseEntity.ok(annonceService.createAnnonce(mapToRequest(annonce.get())));
    }

    @DeleteMapping("/annonces/{id}")
    public ResponseEntity<Void> deleteAnnonce(@PathVariable Long id) {
        annonceService.deleteAnnonce(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/annonces/{id}/approve")
    public ResponseEntity<Void> approveAnnonce(@PathVariable Long id) {
        annonceService.approuverAnnonce(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/annonces/{id}/reject")
    public ResponseEntity<Void> rejectAnnonce(@PathVariable Long id) {
        annonceService.rejeterAnnonce(id);
        return ResponseEntity.ok().build();
    }

    // -------------------- Mapping utilitaire -------------------- //
    private AnnonceRequest mapToRequest(Annonce annonce) {
        AnnonceRequest req = new AnnonceRequest();
        req.setTitre(annonce.getTitre());
        req.setDescription(annonce.getDescription());
        req.setCategorieId(annonce.getCategorie().getId());
        req.setCommuneId(annonce.getCommune().getGid());
        req.setDonnateurId(annonce.getDonnateur().getId());
        req.setPhoto(annonce.getPhoto());
        req.setCoordinates(List.of(annonce.getGeom().getX(), annonce.getGeom().getY()));
        return req;
    }
}
