package com.sadaqah.sadaqah.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.sadaqah.sadaqah.dto.AnnonceRequest;
import com.sadaqah.sadaqah.dto.AnnonceResponse;
import com.sadaqah.sadaqah.model.Annonce;
import com.sadaqah.sadaqah.model.Category;
import com.sadaqah.sadaqah.model.Commune;
import com.sadaqah.sadaqah.model.Utilisateur;
import com.sadaqah.sadaqah.repo.ICategoryRepo;
import com.sadaqah.sadaqah.repo.IAnnonce;
import com.sadaqah.sadaqah.repo.ICommune;
import com.sadaqah.sadaqah.repo.IUtilisateur;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnnonceService {

    @Autowired
    private IAnnonce annonceRepository;

    @Autowired
    private ICategoryRepo categoryRepository;

    @Autowired
    private ICommune communeRepository;

    @Autowired
    private IUtilisateur utilisateurRepository;

    private final GeometryFactory geometryFactory = new GeometryFactory();

    // -------------------- CRUD / Business Logic -------------------- //

    public List<Annonce> findAllApproved() {
        return annonceRepository.findAnnonces(); // méthode existante
    }

    public Optional<Annonce> findById(Long id) {
        return annonceRepository.findById(id);
    }

    public AnnonceResponse createAnnonce(AnnonceRequest request) {

        Annonce annonce = new Annonce();

        // Géométrie
        double lng = request.getCoordinates().get(0);
        double lat = request.getCoordinates().get(1);
        Point point = geometryFactory.createPoint(new Coordinate(lng, lat));
        annonce.setGeom(point);

        // Relations
        Category cat = categoryRepository.findById(request.getCategorieId()).orElseThrow();
        annonce.setCategorie(cat);

        Commune commune = communeRepository.findById(request.getCommuneId()).orElseThrow();
        annonce.setCommune(commune);

        Utilisateur donnateur = utilisateurRepository.findById(request.getDonnateurId()).orElseThrow();
        annonce.setDonnateur(donnateur);

        annonce.setTitre(request.getTitre());
        annonce.setDescription(request.getDescription());
        annonce.setPhoto(request.getPhoto());

        // Date & status
        annonce.setDate(Calendar.getInstance().getTime());
        annonce.setStatus("déclarée");

        annonceRepository.save(annonce);

        return mapToResponse(annonce);
    }

    public boolean updateAnnonce(Long id, AnnonceRequest request) {
        Optional<Annonce> opt = annonceRepository.findById(id);
        if (opt.isEmpty()) return false;

        Annonce annonce = opt.get();

        // Mise à jour coordonnées
        double lng = request.getCoordinates().get(0);
        double lat = request.getCoordinates().get(1);
        Point point = geometryFactory.createPoint(new Coordinate(lng, lat));
        annonce.setGeom(point);

        // Mise à jour relations
        Category cat = categoryRepository.findById(request.getCategorieId()).orElseThrow();
        annonce.setCategorie(cat);

        Commune commune = communeRepository.findById(request.getCommuneId()).orElseThrow();
        annonce.setCommune(commune);

        annonce.setTitre(request.getTitre());
        annonce.setDescription(request.getDescription());
        annonce.setPhoto(request.getPhoto());

        annonceRepository.save(annonce);
        return true;
    }

    public void deleteAnnonce(Long id) {
        annonceRepository.deleteById(id);
    }

    public void approuverAnnonce(Long id) {
        Optional<Annonce> opt = annonceRepository.findById(id);
        if (opt.isPresent()) {
            Annonce a = opt.get();
            a.setStatus("approuvée");
            annonceRepository.save(a);
        }
    }

    public void rejeterAnnonce(Long id) {
        Optional<Annonce> opt = annonceRepository.findById(id);
        if (opt.isPresent()) {
            Annonce a = opt.get();
            a.setStatus("rejetée");
            annonceRepository.save(a);
        }
    }

    // -------------------- Mapping vers DTO -------------------- //
    private AnnonceResponse mapToResponse(Annonce annonce) {
        AnnonceResponse res = new AnnonceResponse();
        res.setId(annonce.getId());
        res.setTitre(annonce.getTitre());
        res.setStatus(annonce.getStatus());
        res.setPhoto(annonce.getPhoto());
        res.setLongitude(annonce.getGeom().getX());
        res.setLatitude(annonce.getGeom().getY());
        res.setCategorieName(annonce.getCategorie().getName());
        res.setCommuneName(annonce.getCommune().getNomCommune());
        res.setDonnateurName(annonce.getDonnateur().getNom()); // Assure-toi que Utilisateur a getNom()
        return res;
    }

}
