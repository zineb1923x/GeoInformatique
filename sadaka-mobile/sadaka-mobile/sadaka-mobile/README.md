# SADAKA - Application Mobile de Gestion des Dons

Application mobile React Native pour la gestion collaborative de dons avec géolocalisation.

## 🚀 Installation

### Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn
- Expo CLI

### Étapes d'installation

1. Installer les dépendances :
```bash
npm install
```

2. Lancer l'application :
```bash
npm start
```

3. Scanner le QR code avec l'application Expo Go sur votre téléphone

## 📱 Fonctionnalités

### Authentification
- ✅ Inscription avec photo personnelle
- ✅ Connexion sécurisée
- ✅ Identification de l'appareil (IMEI)

### Gestion des annonces
- ✅ Créer une annonce de don avec photos
- ✅ Sélection de la commune (liste déroulante)
- ✅ Géolocalisation automatique
- ✅ Catégorisation des dons
- ✅ Gestion de la quantité

### Recherche et filtres
- ✅ Filtrer par catégorie
- ✅ Filtrer par distance (5, 10, 20, 50 km)
- ✅ Filtrer par date de publication
- ✅ Recherche textuelle
- ✅ Tri par date ou distance

### Demandes d'intérêt
- ✅ Demander un don
- ✅ Annuler une demande
- ✅ Voir les demandeurs (pour le donateur)
- ✅ Contacter les demandeurs

### Attribution des dons
- ✅ Attribuer une quantité partielle ou totale
- ✅ Décompte automatique de la quantité
- ✅ Affichage des coordonnées des demandeurs

### Carte interactive
- ✅ Visualisation des dons sur une carte
- ✅ Géolocalisation de l'utilisateur
- ✅ Filtres appliqués sur la carte

### Newsletter
- ✅ Abonnement à la newsletter
- ✅ Désabonnement

## 🔧 Configuration

### API Backend
Modifiez l'URL de l'API dans `src/services/api.js` :
```javascript
const API_URL = 'https://votre-api.com/api';
```

### Communes
Ajoutez ou modifiez les communes dans `src/data/communes.js`

## 📂 Structure du projet

```
sadaka-mobile/
├── App.js                          # Point d'entrée
├── src/
│   ├── screens/                    # Écrans de l'application
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── HomeScreen.js
│   │   ├── MapScreen.js
│   │   ├── AddAnnouncementScreen.js
│   │   ├── MyAnnouncementsScreen.js
│   │   ├── AnnouncementDetailsScreen.js
│   │   ├── ProfileScreen.js
│   │   └── NewsletterScreen.js
│   ├── context/                    # Contextes React
│   │   └── AuthContext.js
│   ├── services/                   # Services et API
│   │   ├── api.js
│   │   └── deviceInfo.js
│   ├── data/                       # Données statiques
│   │   └── communes.js
│   └── assets/                     # Images et ressources
├── package.json
├── app.json
└── README.md
```

## 🛠️ Technologies utilisées

- **React Native** - Framework mobile
- **Expo** - Plateforme de développement
- **React Navigation** - Navigation
- **React Native Maps** - Cartes interactives
- **Expo Location** - Géolocalisation
- **Expo Image Picker** - Sélection d'images

## 📝 API Endpoints requis

L'application nécessite les endpoints suivants :

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription

### Annonces
- `GET /api/announcements` - Liste des annonces
- `GET /api/announcements/my` - Mes annonces
- `POST /api/announcements` - Créer une annonce
- `DELETE /api/announcements/:id` - Supprimer une annonce

### Demandes
- `GET /api/announcements/:id/requests` - Demandes d'une annonce
- `POST /api/requests` - Créer une demande
- `GET /api/requests/my` - Mes demandes
- `DELETE /api/requests/:id` - Supprimer une demande
- `POST /api/announcements/:id/assign` - Attribuer un don

### Newsletter
- `POST /api/newsletter/subscribe` - S'abonner
- `POST /api/newsletter/unsubscribe` - Se désabonner

## 👥 Équipe

Projet développé dans le cadre du Mini PFE - EHTP 3ème SIG

## 📄 Licence

Ce projet est développé à des fins éducatives.
