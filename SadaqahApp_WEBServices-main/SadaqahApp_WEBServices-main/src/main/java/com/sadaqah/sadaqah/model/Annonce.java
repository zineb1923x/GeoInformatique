package com.sadaqah.sadaqah.model;

import java.util.Date;
import javax.persistence.*;

import org.locationtech.jts.geom.Point;
import org.n52.jackson.datatype.jts.GeometryDeserializer;
import org.n52.jackson.datatype.jts.GeometrySerializer;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@Table(name = "Annonce")
public class Annonce {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "geom")
    @JsonSerialize(using = GeometrySerializer.class)
    @JsonDeserialize(using = GeometryDeserializer.class)
    private Point geom;

    @ManyToOne
    private Utilisateur donnateur;

    @Column(name = "titre")
    private String titre;

    @Column(name = "description")
    private String description;

    @Column(name = "quantite")
    private Long quantite;

    @Column(name = "date")
    private Date date;

    @Column(name = "photo")
    private String photo;

    @Column(name = "status", columnDefinition = "varchar(100) default 'déclarée'")
    private String status;

    @ManyToOne
    private Commune commune;

    @ManyToOne
    private Category categorie;

    // ---------- Getters & Setters ----------

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Point getGeom() { return geom; }
    public void setGeom(Point geom) { this.geom = geom; }

    public Utilisateur getDonnateur() { return donnateur; }
    @JsonSetter
    public void setDonnateur(Utilisateur donnateur) { this.donnateur = donnateur; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getQuantite() { return quantite; }
    public void setQuantite(Long quantite) { this.quantite = quantite; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public String getPhoto() { return photo; }
    public void setPhoto(String photo) { this.photo = photo; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Commune getCommune() { return commune; }
    @JsonSetter
    public void setCommune(Commune commune) { this.commune = commune; }

    public Category getCategorie() { return categorie; }
    @JsonSetter
    public void setCategorie(Category categorie) { this.categorie = categorie; }

    // ---------- Constructors ----------
    public Annonce() {}

    public Annonce(Long id, Point geom, Utilisateur donnateur, String titre, String description, Long quantite,
                   Date date, String photo, Category categorie, String status, Commune commune) {
        this.id = id;
        this.geom = geom;
        this.donnateur = donnateur;
        this.titre = titre;
        this.description = description;
        this.quantite = quantite;
        this.date = date;
        this.photo = photo;
        this.categorie = categorie;
        this.status = status;
        this.commune = commune;
    }
}
