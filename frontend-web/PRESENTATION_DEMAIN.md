# 🎯 Guide Rapide - Présentation Demain

> **📚 Pour une présentation complète et détaillée, consultez :**
> - **`PRÉSENTATION_PROFESSEUR.md`** ⭐ - Document complet pour le professeur
> - **`OÙ_LES_DONNÉES_S_AJOUTENT.md`** ⭐ - Où exactement les données s'ajoutent
> - **`INDEX_DOCUMENTS.md`** - Index de tous les documents

## ⚡ Démarrage en 3 étapes

```powershell
cd frontend-web
npm run dev
```

Ouvrez **http://localhost:5173** dans votre navigateur.

> **⚠️ IMPORTANT :** 
> - Le backend n'est **PAS nécessaire** ! Le frontend fonctionne complètement seul grâce aux mocks.
> - **Ne PAS utiliser "Go Live"** de VS Code ! Cette application nécessite Vite (`npm run dev`).
> - Si "Go Live" ne fonctionne pas, c'est normal → Utilisez `npm run dev` dans le terminal.

---

## 🔑 Comptes de test

| Rôle | Email | Mot de passe | Annonces |
|------|-------|--------------|----------|
| **Admin** | `admin@sadaka.ma` | `admin123` | 0 |
| **Modérateur** | `moderator@sadaka.ma` | `mod123` | 0 |
| **Utilisateur** | `user@sadaka.ma` | `user123` | 0 |
| **Démo (avec annonces)** ⭐ | `demo@sadaka.ma` | `demo123` | **3** |

> **Note :** Le compte `demo@sadaka.ma` a 3 annonces pré-créées pour la démonstration. Les nouveaux comptes commencent avec 0 annonces.

---

## 📊 Données disponibles

### ✅ 15 annonces de dons
- 4 catégories : Vêtements, Alimentation, Médicaments, Autres
- 4 communes : Casablanca, Rabat, Fès, Marrakech
- 3 statuts : Approuvé, En attente, Donné

### ✅ 88 communes marocaines
- Avec coordonnées GPS
- Réparties sur 12 régions

### ✅ 4 utilisateurs de test
- 1 Admin, 1 Modérateur, 2 Utilisateurs

### ✅ 3 abonnés newsletter

---

## 🎬 Scénario de démonstration (15 min)

### 1. Page d'accueil (1 min)
- Statistiques : 15 dons, 12 communes, 128 familles

### 2. Page Annonces (3 min)
- Tableau avec 15 annonces
- **Démontrer les filtres** : catégorie, commune, statut, recherche
- Ouvrir une annonce pour voir les détails

### 3. Page Carte (3 min)
- Carte interactive avec marqueurs
- **Filtres synchronisés** avec la page Annonces
- Cliquer sur un marqueur → popup avec détails

### 4. Géolocalisation par centroïde (3 min)
- **Créer une nouvelle annonce**
- **Sélectionner une commune** → Montrer que les coordonnées sont remplies automatiquement (centroïde)
- **Cliquer sur GPS** → Montrer que ça trouve la commune la plus proche et utilise son centroïde
- **Expliquer** : "La géolocalisation utilise le centroïde de la commune, pas la position GPS exacte"

### 5. Mes annonces (2 min)
- Voir les annonces créées
- Demandes d'intérêt
- Assignation partielle

### 6. Dashboard (2 min)
- Graphiques par catégorie
- Graphiques par commune
- Statistiques globales

### 7. Admin (3 min)
- Se connecter : `admin@sadaka.ma`
- **Validation** : approuver/rejeter
- **Utilisateurs** : liste et gestion
- **Newsletter** : abonnés

---

## 💡 Points clés à mentionner

1. **Géolocalisation par centroïde de commune** : Récupération automatique des coordonnées GPS du centroïde
2. **88 communes** avec centroïdes GPS précis
3. **Filtres synchronisés** : Les filtres appliqués impactent automatiquement la carte
4. **Jeu de données complet** : 15 annonces, 88 communes, export/import JSON
5. **Frontend indépendant** : Fonctionne sans backend grâce aux mocks
6. **Carte interactive** avec Leaflet (SIG) - Maroc complet
7. **Système de rôles** (Admin, Modérateur, Utilisateur)
8. **Conformité au cahier des charges** : 95%+ implémenté

---

## ⚠️ En cas de problème

1. **Port occupé ?** → Vérifier le port dans le terminal (peut être 5174, 5175...)
2. **Carte ne charge pas ?** → Vérifier la connexion internet
3. **Données absentes ?** → Vérifier la console (F12)

---

## 📁 Fichiers importants

- **Données annonces** : `src/utils/mock.ts`
- **Données communes** : `src/data/moroccanCommunes.ts`
- **Géolocalisation centroïde** : `src/pages/CreateAnnouncement.tsx` (fonction `onCommuneChange`)
- **Guide complet** : `GUIDE_PRESENTATION.md`
- **Conformité cahier des charges** : `CONFORMITE_CAHIER_CHARGES.md`
- **Géolocalisation** : `GÉOLOCALISATION_CENTROÏDE.md`
- **Jeu de données** : `JEU_DONNEES_COMPLET.md`

---

**✅ Checklist avant la présentation :**
- [ ] Application lancée
- [ ] Tous les comptes testés
- [ ] Carte fonctionnelle
- [ ] Données visibles
- [ ] Filtres testés

**Bonne chance ! 🍀**

