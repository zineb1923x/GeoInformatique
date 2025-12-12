# 📊 Résumé des Données - Projet SADAKA

## Données disponibles pour la démonstration

### 🎁 Annonces de dons (15 annonces)

| ID | Titre | Catégorie | Commune | Statut | Quantité |
|---|---|---|---|---|---|
| 1 | Don de vêtements d'hiver pour enfants | CLOTHES | CASABLANCA | APPROVED | 45 |
| 2 | Panier alimentaire complet | FOOD | RABAT | APPROVED | 1 |
| 3 | Médicaments et produits de première nécessité | MEDICINE | FES | PENDING | 30 |
| 4 | Livres et fournitures scolaires | OTHER | MARRAKECH | APPROVED | 120 |
| 5 | Couvertures et draps | CLOTHES | CASABLANCA | DONATED | 25 |
| 6 | Denrées alimentaires non périssables | FOOD | RABAT | APPROVED | 50 |
| 7 | Jouets et jeux éducatifs | OTHER | FES | APPROVED | 35 |
| 8 | Chaussures pour toute la famille | CLOTHES | MARRAKECH | PENDING | 40 |
| 9 | Produits d'hygiène et de soin | MEDICINE | CASABLANCA | APPROVED | 60 |
| 10 | Matériel de cuisine et vaisselle | OTHER | RABAT | APPROVED | 1 |
| 11 | Fruits et légumes frais | FOOD | FES | PENDING | 20 |
| 12 | Vêtements pour bébés | CLOTHES | MARRAKECH | APPROVED | 30 |
| 13 | Appareils électroménagers | OTHER | CASABLANCA | DONATED | 5 |
| 14 | Vitamines et compléments alimentaires | MEDICINE | RABAT | APPROVED | 25 |
| 15 | Céréales et produits de petit-déjeuner | FOOD | FES | APPROVED | 40 |

**Répartition par catégorie :**
- Vêtements (CLOTHES) : 4 annonces
- Alimentation (FOOD) : 4 annonces
- Médicaments (MEDICINE) : 3 annonces
- Autres (OTHER) : 4 annonces

**Répartition par statut :**
- APPROVED : 11 annonces
- PENDING : 3 annonces
- DONATED : 2 annonces

**Répartition par commune :**
- CASABLANCA : 5 annonces
- RABAT : 4 annonces
- FES : 4 annonces
- MARRAKECH : 2 annonces

---

### 🗺️ Communes marocaines (88 communes)

**Régions principales :**
- Casablanca-Settat : 5 communes
- Rabat-Salé-Kénitra : 5 communes
- Fès-Meknès : 5 communes
- Marrakech-Safi : 5 communes
- Tanger-Tétouan-Al Hoceïma : 5 communes
- Oriental : 5 communes
- Souss-Massa : 5 communes
- Béni Mellal-Khénifra : 5 communes
- Drâa-Tafilalet : 5 communes
- Guelmim-Oued Noun : 4 communes
- Laâyoune-Sakia El Hamra : 4 communes
- Dakhla-Oued Ed-Dahab : 2 communes
- Et plus...

**Chaque commune contient :**
- Nom complet
- Code unique
- Coordonnées GPS (latitude, longitude)
- Région d'appartenance

---

### 👥 Utilisateurs de test (4 utilisateurs)

| Nom | Email | Rôle | Téléphone |
|---|---|---|---|
| Ahmed Alaoui | admin@sadaka.ma | ADMIN | 0612345678 |
| Fatima Benali | moderator@sadaka.ma | MODERATOR | 0612345679 |
| Mohamed Idrissi | user@sadaka.ma | USER | 0612345680 |
| Aicha Tazi | aicha@example.com | USER | 0612345681 |

**Permissions par rôle :**
- **ADMIN** : Accès complet (validation, gestion utilisateurs, newsletter)
- **MODERATOR** : Validation des annonces, gestion utilisateurs
- **USER** : Création d'annonces, consultation, prise d'intérêt

---

### 📧 Abonnés newsletter (3 abonnés)

- subscriber1@example.com
- subscriber2@example.com
- subscriber3@example.com

---

### 🚀 Démarrage rapide

```powershell
cd frontend-web
npm run dev
```

**Comptes de connexion :**
- Admin : `admin@sadaka.ma` (n'importe quel mot de passe)
- Modérateur : `moderator@sadaka.ma` (n'importe quel mot de passe)
- Utilisateur : `user@sadaka.ma` (n'importe quel mot de passe)

---

### 📍 Points à montrer

1. **Page Annonces** : 15 annonces avec filtres
2. **Page Carte** : Carte interactive avec marqueurs géolocalisés
3. **Page Dashboard** : Statistiques et graphiques
4. **Page Admin** : Validation, utilisateurs, newsletter
5. **Création d'annonce** : Formulaire complet avec géolocalisation

---

**Fichiers de données :**
- `src/utils/mock.ts` : Annonces et utilisateurs de test
- `src/data/moroccanCommunes.ts` : Liste des communes avec coordonnées

