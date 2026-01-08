package com.sadaqah.sadaqah.dto;

import java.util.List;

public class AnnonceRequest {

    private List<Double> coordinates;
    private String titre;
    private String description;
    private Long categorieId;
    private Long communeId;
    private Long donnateurId;
    private String photo;

    public List<Double> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<Double> coordinates) {
        this.coordinates = coordinates;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCategorieId() {
        return categorieId;
    }

    public void setCategorieId(Long categorieId) {
        this.categorieId = categorieId;
    }

    public Long getCommuneId() {
        return communeId;
    }

    public void setCommuneId(Long communeId) {
        this.communeId = communeId;
    }

    public Long getDonnateurId() {
        return donnateurId;
    }

    public void setDonnateurId(Long donnateurId) {
        this.donnateurId = donnateurId;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}
