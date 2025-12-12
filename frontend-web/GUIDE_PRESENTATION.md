# Guide de Présentation - Projet SADAKA

## 📋 Guide pour présenter le jeu de données au professeur

### 🚀 Démarrage rapide

#### 1. Lancer l'application
```powershell
cd frontend-web
npm run dev
```

L'application s'ouvrira automatiquement dans votre navigateur sur **http://localhost:5173** (ou un autre port si celui-ci est occupé).

---

### 👤 Comptes de test disponibles

#### Compte Administrateur
- **Email :** `admin@sadaka.ma`
- **Mot de passe :** (n'importe quel mot de passe fonctionne avec les mocks)
- **Rôle :** ADMIN
- **Accès :** Toutes les fonctionnalités, y compris le panneau d'administration

#### Compte Modérateur
- **Email :** `moderator@sadaka.ma`
- **Mot de passe :** (n'importe quel mot de passe fonctionne avec les mocks)
- **Rôle :** MODERATOR
- **Accès :** Validation des annonces, gestion des utilisateurs

#### Compte Utilisateur standard
- **Email :** `user@sadaka.ma`
- **Mot de passe :** (n'importe quel mot de passe fonctionne avec les mocks)
- **Rôle :** USER
- **Accès :** Création d'annonces, consultation, prise d'intérêt

---

### 📊 Jeu de données disponible

#### 1. Annonces de dons (15 annonces pré-chargées)

**Catégories disponibles :**
- **Vêtements (CLOTHES)** : 4 annonces
- **Alimentation (FOOD)** : 4 annonces
- **Médicaments (MEDICINE)** : 3 annonces
- **Autres (OTHER)** : 4 annonces

**Statuts :**
- **APPROVED** : Annonces validées et visibles
- **PENDING** : En attente de validation
- **DONATED** : Déjà données

**Communes couvertes :**
- Casablanca
- Rabat
- Fès
- Marrakech

**Exemples d'annonces :**
1. Don de vêtements d'hiver pour enfants (Casablanca)
2. Panier alimentaire complet (Rabat)
3. Médicaments et produits de première nécessité (Fès)
4. Livres et fournitures scolaires (Marrakech)
5. Couvertures et draps (Casablanca)
6. Denrées alimentaires non périssables (Rabat)
7. Jouets et jeux éducatifs (Fès)
8. Chaussures pour toute la famille (Marrakech)
9. Produits d'hygiène et de soin (Casablanca)
10. Matériel de cuisine et vaisselle (Rabat)
11. Fruits et légumes frais (Fès)
12. Vêtements pour bébés (Marrakech)
13. Appareils électroménagers (Casablanca)
14. Vitamines et compléments alimentaires (Rabat)
15. Céréales et produits de petit-déjeuner (Fès)

#### 2. Communes marocaines (88 communes)

**Régions couvertes :**
- Casablanca-Settat (5 communes)
- Rabat-Salé-Kénitra (5 communes)
- Fès-Meknès (5 communes)
- Marrakech-Safi (5 communes)
- Tanger-Tétouan-Al Hoceïma (5 communes)
- Oriental (5 communes)
- Souss-Massa (5 communes)
- Béni Mellal-Khénifra (5 communes)
- Drâa-Tafilalet (5 communes)
- Guelmim-Oued Noun (4 communes)
- Laâyoune-Sakia El Hamra (4 communes)
- Dakhla-Oued Ed-Dahab (2 communes)
- Et plus...

Chaque commune a :
- Nom complet
- Code (valeur)
- Coordonnées géographiques (latitude, longitude)
- Région d'appartenance

#### 3. Utilisateurs de test (4 utilisateurs)

1. **Ahmed Alaoui** - Admin (admin@sadaka.ma)
2. **Fatima Benali** - Modérateur (moderator@sadaka.ma)
3. **Mohamed Idrissi** - Utilisateur (user@sadaka.ma)
4. **Aicha Tazi** - Utilisateur (aicha@example.com)

#### 4. Abonnés newsletter (3 abonnés)

- subscriber1@example.com
- subscriber2@example.com
- subscriber3@example.com

---

### 🎯 Scénario de démonstration recommandé

#### Étape 1 : Vue d'ensemble (2 minutes)
1. **Page d'accueil** : Montrer les statistiques
   - 15 dons actifs
   - 12 communes couvertes
   - 128 familles aidées
   - 4 catégories

#### Étape 2 : Consultation des annonces (3 minutes)
1. **Page "Annonces"** :
   - Montrer le tableau avec les 15 annonces
   - Démontrer les filtres :
     - Par catégorie (Vêtements, Alimentation, etc.)
     - Par commune (Casablanca, Rabat, etc.)
     - Par statut (Approuvé, En attente)
     - Recherche textuelle
   - Ouvrir une annonce pour voir les détails

#### Étape 3 : Carte SIG (3 minutes)
1. **Page "Carte"** :
   - Montrer la carte interactive avec les marqueurs
   - Démontrer les filtres synchronisés avec la page Annonces
   - Cliquer sur un marqueur pour voir le popup avec les détails
   - Montrer les différentes icônes par catégorie

#### Étape 4 : Connexion et création (3 minutes)
1. **Se connecter** avec le compte utilisateur (`user@sadaka.ma`)
2. **Créer une nouvelle annonce** :
   - Remplir le formulaire complet
   - Sélectionner une catégorie
   - Choisir une commune
   - Ajouter une description
   - Montrer la géolocalisation automatique

#### Étape 5 : Gestion des annonces (2 minutes)
1. **Page "Mes annonces"** :
   - Voir les annonces créées par l'utilisateur
   - Montrer les demandes d'intérêt
   - Démontrer l'assignation partielle

#### Étape 6 : Dashboard et statistiques (2 minutes)
1. **Page "Dashboard"** :
   - Graphiques par catégorie
   - Graphiques par commune
   - Statistiques globales
   - Filtres temporels

#### Étape 7 : Panneau d'administration (3 minutes)
1. **Se connecter** avec le compte admin (`admin@sadaka.ma`)
2. **Page "Admin"** :
   - **Onglet "Validation"** :
     - Voir les annonces en attente
     - Approuver/Rejeter une annonce
   - **Onglet "Utilisateurs"** :
     - Liste des utilisateurs
     - Gestion des rôles
   - **Onglet "Newsletter"** :
     - Liste des abonnés
     - Gestion des abonnements

---

### 📍 Points clés à mettre en avant

#### 1. Données géographiques
- **88 communes marocaines** avec coordonnées GPS précises
- **Carte interactive** avec Leaflet
- **Géolocalisation automatique** lors de la création d'annonces
- **Filtres géographiques** synchronisés entre la liste et la carte

#### 2. Données réalistes
- **15 annonces** avec descriptions détaillées
- **4 catégories** de dons (Vêtements, Alimentation, Médicaments, Autres)
- **3 statuts** (Approuvé, En attente, Donné)
- **Données temporelles** (dates de création réalistes)

#### 3. Gestion des utilisateurs
- **3 rôles** (Admin, Modérateur, Utilisateur)
- **Permissions** basées sur les rôles
- **4 utilisateurs de test** pré-configurés

#### 4. Fonctionnalités SIG
- **Carte interactive** avec zoom et navigation
- **Marqueurs** par catégorie avec icônes différentes
- **Popups** avec détails complets
- **Filtres synchronisés** entre liste et carte

---

### 🔧 En cas de problème

#### Le serveur ne démarre pas
1. Vérifier que Node.js est installé : `node --version`
2. Installer les dépendances : `npm install`
3. Vérifier le port (peut être 5174, 5175, etc.)

#### Les données ne s'affichent pas
1. Vérifier la console du navigateur (F12)
2. Les mocks sont activés par défaut
3. Vérifier que vous êtes bien connecté

#### La carte ne s'affiche pas
1. Vérifier la connexion internet (Leaflet charge les tuiles depuis internet)
2. Vérifier la console pour les erreurs

---

### 📝 Notes pour la présentation

1. **Temps total recommandé :** 15-20 minutes
2. **Préparer à l'avance :**
   - Lancer l'application avant la présentation
   - Tester tous les comptes
   - Vérifier que la carte fonctionne
3. **Points à expliquer :**
   - Le système utilise des **mocks** pour simuler le backend
   - Les données sont **pré-chargées** pour la démonstration
   - Le système est **prêt à être connecté** à un backend réel
   - Les **88 communes** couvrent tout le Maroc
   - Le système de **géolocalisation** est fonctionnel

---

### 🎓 Questions possibles du professeur

**Q : D'où viennent les données ?**
R : Les données sont générées dans le fichier `src/utils/mock.ts`. Il y a 15 annonces pré-définies et 88 communes marocaines avec leurs coordonnées GPS dans `src/data/moroccanCommunes.ts`.

**Q : Comment sont gérées les données géographiques ?**
R : Les communes ont des coordonnées GPS (latitude, longitude) stockées dans le fichier `moroccanCommunes.ts`. La carte utilise Leaflet pour afficher les marqueurs.

**Q : Peut-on ajouter de nouvelles données ?**
R : Oui, on peut créer de nouvelles annonces via l'interface. Les communes sont définies dans le fichier de données.

**Q : Comment fonctionne le système de mocks ?**
R : Le système intercepte les requêtes API et retourne des données simulées. Cela permet de tester l'application sans backend réel.

---

### ✅ Checklist avant la présentation

- [ ] Application lancée et fonctionnelle
- [ ] Tous les comptes testés
- [ ] Carte affichée correctement
- [ ] Données visibles dans les listes
- [ ] Filtres fonctionnels
- [ ] Navigation entre les pages testée
- [ ] Console du navigateur sans erreurs critiques

---

**Bonne présentation ! 🎉**

