# 🗺️ Configuration de la Carte - Maroc uniquement

## ✅ Modifications effectuées

La carte a été configurée pour afficher **uniquement le territoire marocain reconnu internationalement**, sans le Sahara occidental.

---

## 📍 Limites géographiques

### Coordonnées des limites :
- **Nord** : ~35.8°N (Tanger)
- **Sud** : ~27.9°N (Tarfaya - limite sud officielle)
- **Ouest** : ~13.2°W (côte atlantique)
- **Est** : ~1.1°W (frontière avec l'Algérie)

### Centre de la carte :
- **Latitude** : 32.5°N
- **Longitude** : -6.0°W
- **Zoom initial** : 6

---

## 🔒 Restrictions appliquées

### 1. Limites maximales (maxBounds)
La carte ne peut pas être déplacée en dehors des limites du Maroc :
```typescript
const moroccoBounds = L.latLngBounds(
  [27.9, -13.2], // Sud-Ouest
  [35.8, -1.1]   // Nord-Est
);
```

### 2. Viscosité des limites
- `maxBoundsViscosity: 1.0` → Empêche complètement de sortir des limites
- La carte rebondit si on essaie de naviguer en dehors

### 3. Zoom limité
- **Zoom minimum** : 5 (vue d'ensemble du Maroc)
- **Zoom maximum** : 18 (détails locaux)

---

## 🗑️ Communes exclues

Les communes suivantes ont été retirées des données car elles sont situées dans le Sahara occidental :

- ❌ Laâyoune
- ❌ Boujdour
- ❌ Es-Semara
- ❌ Dakhla
- ❌ Aousserd

**✅ Tarfaya est conservée** car elle marque la limite sud officielle du Maroc.

---

## 📊 Fichiers modifiés

### 1. `src/components/MapView.tsx`
- Ajout des limites `maxBounds`
- Configuration du centre et du zoom
- Filtrage des points en dehors des limites

### 2. `src/data/moroccanCommunes.ts`
- Suppression des communes du Sahara occidental
- Conservation de Tarfaya comme limite sud

---

## 🎯 Comportement de la carte

### Vue par défaut (sans annonces)
- Centre : 32.5°N, -6.0°W
- Zoom : 6
- Affiche le Maroc en entier (sans le Sahara occidental)

### Avec des annonces
- La carte s'ajuste automatiquement pour montrer toutes les annonces
- **Mais** reste limitée aux frontières du Maroc
- Les annonces en dehors des limites ne sont pas affichées

### Navigation
- Impossible de naviguer vers le Sahara occidental
- La carte rebondit si on essaie de sortir des limites
- Zoom limité entre 5 et 18

---

## ✅ Résultat

La carte affiche maintenant **uniquement le territoire marocain reconnu internationalement**, avec :
- ✅ Limites strictes empêchant la navigation vers le Sahara occidental
- ✅ Communes du Sahara occidental retirées des données
- ✅ Vue centrée sur le Maroc uniquement
- ✅ Filtrage automatique des points en dehors des limites

---

**La carte respecte maintenant les frontières officielles du Maroc ! 🎉**

