package com.sadaqah.sadaqah.dto;

public class DemandeRequest {

    private Long annonceId;
    private Long userId;

    // optionnel (si tu veux ajouter plus tard)
    // private String message;

    public Long getAnnonceId() {
        return annonceId;
    }

    public void setAnnonceId(Long annonceId) {
        this.annonceId = annonceId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
