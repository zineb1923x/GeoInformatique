# 📊 Jeu de Données Complet - SADAKA

## ✅ Données disponibles

### 1. Annonces de dons (15 annonces initiales)

**Fichier** : `src/utils/mock.ts` (ligne 31)

#### Répartition par catégorie :
- **Vêtements (CLOTHES)** : 4 annonces
- **Alimentation (FOOD)** : 4 annonces
- **Médicaments (MEDICINE)** : 3 annonces
- **Autres (OTHER)** : 4 annonces

#### Répartition par statut :
- **APPROVED** : 11 annonces (approuvées et visibles)
- **PENDING** : 3 annonces (en attente de validation)
- **DONATED** : 2 annonces (déjà données)

#### Répartition par commune :
- **CASABLANCA** : 5 annonces
- **RABAT** : 4 annonces
- **FES** : 4 annonces
- **MARRAKECH** : 2 annonces

#### Exemples d'annonces :

1. **Don de vêtements d'hiver pour enfants** (Casablanca)
   - Catégorie : CLOTHES
   - Quantité : 45
   - Statut : APPROVED
   - Coordonnées : 33.5731, -7.5898

2. **Panier alimentaire complet** (Rabat)
   - Catégorie : FOOD
   - Quantité : 1
   - Statut : APPROVED
   - Coordonnées : 34.0209, -6.8416

3. **Médicaments et produits de première nécessité** (Fès)
   - Catégorie : MEDICINE
   - Quantité : 30
   - Statut : PENDING
   - Coordonnées : 34.0333, -5.0000

4. **Livres et fournitures scolaires** (Marrakech)
   - Catégorie : OTHER
   - Quantité : 120
   - Statut : APPROVED
   - Coordonnées : 31.6295, -7.9811

... et 11 autres annonces

---

### 2. Communes marocaines (88 communes)

**Fichier** : `src/data/moroccanCommunes.ts`

#### Structure :
```typescript
{
  label: 'Casablanca',
  value: 'CASABLANCA',
  centroid: [33.5731, -7.5898],  // [latitude, longitude]
  region: 'Casablanca-Settat'
}
```

#### Répartition par région :

| Région | Nombre de communes |
|--------|-------------------|
| Casablanca-Settat | 5 |
| Rabat-Salé-Kénitra | 5 |
| Fès-Meknès | 5 |
| Marrakech-Safi | 5 |
| Tanger-Tétouan-Al Hoceïma | 5 |
| Oriental | 5 |
| Souss-Massa | 5 |
| Béni Mellal-Khénifra | 5 |
| Drâa-Tafilalet | 5 |
| Guelmim-Oued Noun | 4 |
| Laâyoune-Sakia El Hamra | 4 |
| Dakhla-Oued Ed-Dahab | 2 |
| **Total** | **88** |

#### Chaque commune contient :
- ✅ Nom complet (label)
- ✅ Code unique (value)
- ✅ Coordonnées GPS du centroïde (centroid)
- ✅ Région d'appartenance (region)

---

### 3. Utilisateurs de test (4 utilisateurs)

**Fichier** : `src/utils/mock.ts` (ligne 308)

| Email | Mot de passe | Rôle | Annonces |
|-------|--------------|------|----------|
| `admin@sadaka.ma` | `admin123` | ADMIN | 0 |
| `moderator@sadaka.ma` | `mod123` | MODERATOR | 0 |
| `user@sadaka.ma` | `user123` | USER | 0 |
| `demo@sadaka.ma` | `demo123` | USER | **3** |

#### Compte de démonstration (demo@sadaka.ma) :
- **3 annonces pré-créées** :
  1. Don de vêtements d'hiver (Casablanca) - APPROVED
  2. Panier alimentaire complet (Rabat) - APPROVED
  3. Livres et fournitures scolaires (Marrakech) - PENDING

---

### 4. Abonnés newsletter (3 abonnés)

**Fichier** : `src/utils/mock.ts` (ligne 576)

- subscriber1@example.com
- subscriber2@example.com
- subscriber3@example.com

---

## 💾 Stockage des données

### localStorage (persistance)

#### Clés utilisées :

1. **`sadaka_donations`**
   - Toutes les annonces (initiales + créées)
   - Format : JSON array
   - Mise à jour : À chaque création d'annonce

2. **`sadaka_users`**
   - Tous les utilisateurs (initiaux + créés)
   - Format : JSON object
   - Mise à jour : À chaque création de compte

3. **`sadaka_user_donations`**
   - Annonces par utilisateur
   - Format : JSON object `{ userId: [annonces] }`
   - Mise à jour : À chaque création d'annonce

4. **`sadaka_web_token`**
   - Token d'authentification
   - Format : String
   - Mise à jour : À chaque connexion/déconnexion

---

## 📤 Export/Import des données

### Export JSON

**Page** : Admin → Onglet "Données JSON"

**Format exporté** :
```json
{
  "donations": [...],           // Toutes les annonces
  "users": {...},               // Tous les utilisateurs
  "userDonations": {...},       // Annonces par utilisateur
  "exportedAt": "2024-01-15T10:30:00.000Z",
  "version": "1.0"
}
```

**Utilisation** :
- Sauvegarde des données
- Partage entre sessions
- Backup avant réinitialisation

### Import JSON

**Page** : Admin → Onglet "Données JSON"

**Fonctionnalité** :
- Import depuis un fichier JSON
- Remplace les données actuelles
- Recharge automatique de la page

---

## 🎯 Utilisation pour la présentation

### Scénario recommandé :

1. **Afficher les données initiales**
   - Page "Annonces" → 15 annonces
   - Page "Carte" → 15 marqueurs
   - Page "Dashboard" → Statistiques

2. **Montrer le compte de démonstration**
   - Se connecter : `demo@sadaka.ma` / `demo123`
   - Page "Mes annonces" → 3 annonces

3. **Créer de nouvelles données**
   - Créer un nouveau compte
   - Créer une nouvelle annonce
   - Vérifier qu'elle apparaît dans la liste et sur la carte

4. **Exporter les données**
   - Admin → Données JSON → Exporter
   - Montrer le fichier JSON au professeur

---

## 📊 Statistiques du jeu de données

| Type | Nombre | Détails |
|------|--------|---------|
| **Annonces initiales** | 15 | 4 catégories, 4 communes, 3 statuts |
| **Communes** | 88 | 12 régions, avec centroïdes GPS |
| **Utilisateurs** | 4 | Admin, Modérateur, User, Démo |
| **Annonces démo** | 3 | Compte demo@sadaka.ma |
| **Abonnés newsletter** | 3 | Exemples |

---

## ✅ Conformité au cahier des charges

### Exigences :
- ✅ Fonds cartographiques (Web) : ESRI World Street Map
- ✅ Couches de base : Communes avec centroïdes
- ✅ Données réalistes pour la démonstration
- ✅ Export/Import des données

---

## 🎯 Résumé

**Le jeu de données est complet et prêt pour la présentation !**

- ✅ 15 annonces initiales réalistes
- ✅ 88 communes avec centroïdes GPS
- ✅ 4 utilisateurs de test
- ✅ 3 annonces de démonstration
- ✅ Persistance dans localStorage
- ✅ Export/Import JSON

**Tout est prêt ! 🎉**

