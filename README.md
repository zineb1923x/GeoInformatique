# GeoInformatique

# Sadaka Backend API

## Description
API REST pour la plateforme de dons Sadaka.

## Prérequis
- Java 17+
- Maven 3.6+
- PostgreSQL 14+
- PostGIS (extension)

## Installation
1. Cloner le projet
2. Créer la base de données `sadaka_db`
3. Activer PostGIS : `CREATE EXTENSION postgis;`
4. Configurer `application.properties`
5. Lancer : `mvn spring-boot:run`

## API Documentation
Voir `/documentation/routes.md`

## Endpoints principaux
- `GET /api/utilisateurs` - Liste des utilisateurs
- `POST /api/annonces` - Créer une annonce

## Auteurs
- Bentahir Nihal
